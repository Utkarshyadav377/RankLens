/**
 * Calculates user topic rating estimations using the new statistical model.
 * 
 * Formula:
 * Topic Rating = MeanSolvedRating - 0.3 * StandardDeviation + 50 * log2(Solved + 1)
 * 
 * @param {Object} topicStats Grouped stats returned by calculateTopicAnalytics
 * @returns {Object} Estimated ratings and confidence values for each topic ID
 */
export const calculateTopicRatings = (topicStats = {}, currentRating = 800, rawSubmissions = []) => {
  // Calculate overallMeanRating of all unique solved problems
  const uniqueSolvedMap = {};
  rawSubmissions.forEach((sub) => {
    if (sub.verdict === 'OK' && sub.problem) {
      const problemId = `${sub.problem.contestId || 0}-${sub.problem.index || ''}`;
      const rating = sub.problem.rating;
      if (rating !== undefined && rating !== null && typeof rating === 'number') {
        uniqueSolvedMap[problemId] = rating;
      }
    }
  });

  const ratings = Object.values(uniqueSolvedMap);
  const overallMeanRating = ratings.length > 0 ? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length) : 0;
  const normalizationFactor = overallMeanRating > 0 ? (currentRating / overallMeanRating) : 1.0;

  const result = {};

  Object.entries(topicStats).forEach(([id, stats]) => {
    const {
      attempts,
      accepted,
      uniqueAttempted,
      uniqueSolved,
      successRate,
      averageSolvedRating,
      highestSolvedRating,
      solvedRatingsList = [],
    } = stats;

    const mean = averageSolvedRating;

    // Calculate Standard Deviation (σ)
    let stdDev = 0;
    if (solvedRatingsList.length > 1) {
      const variance = solvedRatingsList.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / solvedRatingsList.length;
      stdDev = Math.sqrt(variance);
    }

    // Calculate 75th Percentile of Solved Ratings
    const get75thPercentile = (arr) => {
      if (!arr || arr.length === 0) return 0;
      const sorted = [...arr].sort((a, b) => a - b);
      const index = (sorted.length - 1) * 0.75;
      const lower = Math.floor(index);
      const upper = Math.ceil(index);
      const weight = index - lower;
      return sorted[lower] * (1 - weight) + sorted[upper] * weight;
    };
    const p75 = solvedRatingsList.length > 0 ? Math.round(get75thPercentile(solvedRatingsList)) : 0;

    // Calculate Final Topic Rating
    let topicRating = 0;
    if (uniqueSolved > 0) {
      const rawRating = Math.round((0.7 * mean + 0.3 * p75) * normalizationFactor);
      topicRating = Math.max(0, Math.min(highestSolvedRating + 300, rawRating));
    }

    result[id] = {
      topic: id,
      topicRating,
      solved: uniqueSolved,
      successRate,
      averageSolvedRating: mean,
      stdDev,
      p75,
      highestSolvedRating,
    };
  });

  return result;
};
