/**
 * Calculates Codeforces tags analytics dynamically discovering tags from problem data.
 * 
 * Deduplication rules:
 * - A problem is uniquely identified by `${contestId}-${problem.index}`.
 * - Attempted count tracks unique attempted problems.
 * - Solved count tracks unique solved problems (OK verdict).
 * - A problem contributes at most once to each of its tags.
 * 
 * Formula:
 * Topic Rating = MeanSolvedRating - 0.3 * StandardDeviation + 50 * log2(Solved + 1)
 * 
 * @param {Array} submissions Codeforces submissions array
 * @returns {Array} List of tag analytics objects
 */
export const calculateCfTagsAnalytics = (submissions = [], currentRating = 800) => {
  // 1. Group submissions by unique problem ID (contestId-index)
  const uniqueProblems = {};
  const tagSubmissionsCount = {};
  const tagAcceptedCount = {};

  submissions.forEach((sub) => {
    const verdict = sub.verdict;
    const problem = sub.problem;
    if (!problem) return;

    const rating = problem.rating;
    const tags = problem.tags || [];

    // Track raw submission attempts and accepted counts per tag
    tags.forEach((tag) => {
      const cleanTag = tag.trim().toLowerCase();
      if (!cleanTag) return;
      tagSubmissionsCount[cleanTag] = (tagSubmissionsCount[cleanTag] || 0) + 1;
      if (verdict === "OK") {
        tagAcceptedCount[cleanTag] = (tagAcceptedCount[cleanTag] || 0) + 1;
      }
    });

    if (!problem.contestId || !problem.index) return;
    const problemId = `${problem.contestId}-${problem.index}`;

    if (!uniqueProblems[problemId]) {
      uniqueProblems[problemId] = {
        contestId: problem.contestId,
        index: problem.index,
        name: problem.name || "",
        rating: (rating !== undefined && rating !== null) ? rating : null,
        tags: tags.map((t) => t.toLowerCase()),
        solved: false,
        attempted: true,
      };
    }

    if (verdict === "OK") {
      uniqueProblems[problemId].solved = true;
    }
  });

  // Calculate overallMeanRating of all unique solved problems
  const uniqueSolvedMap = {};
  submissions.forEach((sub) => {
    if (sub.verdict === 'OK' && sub.problem) {
      const problemId = `${sub.problem.contestId || 0}-${sub.problem.index || ''}`;
      const rating = sub.problem.rating;
      if (rating !== undefined && rating !== null && typeof rating === 'number') {
        uniqueSolvedMap[problemId] = rating;
      }
    }
  });

  const allRatings = Object.values(uniqueSolvedMap);
  const overallMeanRating = allRatings.length > 0 ? (allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length) : 0;
  const normalizationFactor = overallMeanRating > 0 ? (currentRating / overallMeanRating) : 1.0;

  // 2. Group unique problems by tags dynamically
  const tagGroups = {}; // tag -> { tag, attemptedProblems: Set, solvedProblems: Set, solvedRatingsList: Array, problemsList: Array }

  Object.values(uniqueProblems).forEach((prob) => {
    prob.tags.forEach((tag) => {
      // Clean up tag string formatting
      const cleanTag = tag.trim().toLowerCase();
      if (!cleanTag) return;

      if (!tagGroups[cleanTag]) {
        tagGroups[cleanTag] = {
          tag: cleanTag,
          attemptedProblems: new Set(),
          solvedProblems: new Set(),
          solvedRatingsList: [],
          problemsList: [],
        };
      }

      tagGroups[cleanTag].attemptedProblems.add(`${prob.contestId}-${prob.index}`);
      tagGroups[cleanTag].problemsList.push(prob);

      if (prob.solved) {
        tagGroups[cleanTag].solvedProblems.add(`${prob.contestId}-${prob.index}`);
        if (prob.rating !== null) {
          tagGroups[cleanTag].solvedRatingsList.push(prob.rating);
        }
      }
    });
  });

  // 3. Compile statistics for each discovered tag
  return Object.values(tagGroups).map((group) => {
    const uniqueAttempted = group.attemptedProblems.size;
    const uniqueSolved = group.solvedProblems.size;
    
    const totalAttempts = tagSubmissionsCount[group.tag] || 0;
    const totalAccepted = tagAcceptedCount[group.tag] || 0;

    // Acceptance rate is Accepted Problems (uniqueSolved) / Total Attempts (totalAttempts)
    const acceptanceRate = totalAttempts > 0 ? (uniqueSolved / totalAttempts) * 100 : 0;
    const successRate = acceptanceRate;

    let averageSolvedRating = 0;
    if (group.solvedRatingsList.length > 0) {
      const sum = group.solvedRatingsList.reduce((acc, curr) => acc + curr, 0);
      averageSolvedRating = sum / group.solvedRatingsList.length;
    }

    // Calculate Standard Deviation (σ)
    let stdDev = 0;
    if (group.solvedRatingsList.length > 1) {
      const variance = group.solvedRatingsList.reduce((sum, val) => sum + Math.pow(val - averageSolvedRating, 2), 0) / group.solvedRatingsList.length;
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
    const p75 = group.solvedRatingsList.length > 0 ? Math.round(get75thPercentile(group.solvedRatingsList)) : 0;

    let highestSolvedRating = 0;
    if (group.solvedRatingsList.length > 0) {
      highestSolvedRating = Math.max(...group.solvedRatingsList);
    }

    // Calculate Final Topic Rating
    let topicRating = 0;
    if (uniqueSolved > 0) {
      const rawRating = Math.round((0.7 * averageSolvedRating + 0.3 * p75) * normalizationFactor);
      topicRating = Math.max(0, Math.min(highestSolvedRating + 300, rawRating));
    }

    const avgAttemptsPerQuestion = uniqueAttempted > 0 ? totalAttempts / uniqueAttempted : 0;

    return {
      tag: group.tag,
      attempts: uniqueAttempted, // unique attempted problems count
      accepted: uniqueSolved, // unique solved problems count
      uniqueAttempted,
      uniqueSolved,
      successRate,
      acceptanceRate,
      averageSolvedRating,
      stdDev,
      p75,
      highestSolvedRating,
      topicRating,
      totalAttempts,
      totalAccepted,
      avgAttemptsPerQuestion,
      problems: group.problemsList, // used for expandable debug verification mode
    };
  });
};
