// Association between Knowledge Graph topics and Codeforces tags
const TOPIC_TAG_MAPPING = {
  "recursion": ["dfs and similar", "brute force"],
  "memoization": ["dp"],
  "dp": ["dp"],
  "knapsack": ["dp"],
  "dp-on-trees": ["dp", "trees", "dfs and similar"],
  "bitmask-dp": ["bitmasks", "dp"],
  "arrays": ["implementation", "data structures"],
  "sorting": ["sortings"],
  "binary-search": ["binary search"],
  "two-pointers": ["two pointers"],
  "sliding-window": ["two pointers"],
  "graphs": ["graphs", "trees", "dfs and similar", "shortest paths", "graph matchings"],
  "greedy": ["greedy"],
  "observation": ["math", "games", "interactive"],
  "constructive": ["constructive algorithms"]
};

/**
 * Calculates topic analytics from Codeforces user submissions list.
 * Handles duplicate solutions, filters by tags, calculates average solved ratings
 * and peak difficulties while avoiding inflating statistics.
 * 
 * @param {Array} submissions Codeforces submissions array
 * @returns {Object} Grouped stats per topic ID
 */
export const calculateTopicAnalytics = (submissions = []) => {
  const analytics = {};

  // Initialize data structures for each topic
  Object.keys(TOPIC_TAG_MAPPING).forEach((id) => {
    analytics[id] = {
      attemptedProblems: new Set(),
      solvedProblems: new Set(),
      solvedRatingsMap: {}, // deduplicate rating records by problem key
      problemsMap: {}, // problemId -> problem object
      totalAttempts: 0,
    };
  });

  // Process every submission
  submissions.forEach((sub) => {
    const verdict = sub.verdict;
    const problem = sub.problem;
    if (!problem) return;

    // A Codeforces problem must be uniquely identified using: contestId + "-" + problem.index
    const problemId = `${problem.contestId || 0}-${problem.index || ""}`;

    const rating = problem.rating; // handle missing ratings safely
    const tags = problem.tags || [];

    // Check overlaps
    Object.entries(TOPIC_TAG_MAPPING).forEach(([id, cfTags]) => {
      const isMatch = tags.some((tag) => cfTags.includes(tag.toLowerCase()));
      if (isMatch) {
        analytics[id].totalAttempts += 1;
        // Count each attempted problem only once regardless of number of submissions
        analytics[id].attemptedProblems.add(problemId);

        if (!analytics[id].problemsMap[problemId]) {
          analytics[id].problemsMap[problemId] = {
            contestId: problem.contestId,
            index: problem.index,
            name: problem.name || "",
            rating: (rating !== undefined && rating !== null) ? rating : null,
            tags: tags.map((t) => t.toLowerCase()),
            solved: false,
            attempted: true,
          };
        }

        if (verdict === 'OK') {
          // Count each solved problem only once
          analytics[id].solvedProblems.add(problemId);
          analytics[id].problemsMap[problemId].solved = true;
          if (rating !== undefined && rating !== null) {
            analytics[id].solvedRatingsMap[problemId] = rating;
          }
        }
      }
    });
  });

  // Finalize computations
  const result = {};
  Object.entries(analytics).forEach(([id, data]) => {
    const uniqueAttempted = data.attemptedProblems.size;
    const uniqueSolved = data.solvedProblems.size;
    
    // Acceptance rate is Accepted Problems / Total Attempts
    const acceptanceRate = data.totalAttempts > 0 ? (uniqueSolved / data.totalAttempts) * 100 : 0;
    // Keep successRate as decimal for potential backward compatibility, but update to use new formula
    const successRate = data.totalAttempts > 0 ? uniqueSolved / data.totalAttempts : 0;

    // Collect list of unique ratings of solved problems
    const solvedRatingsList = Object.values(data.solvedRatingsMap);

    // Compute average solved rating safely
    let averageSolvedRating = 0;
    if (solvedRatingsList.length > 0) {
      const sum = solvedRatingsList.reduce((acc, curr) => acc + curr, 0);
      averageSolvedRating = sum / solvedRatingsList.length;
    }

    // Compute peak rating solved safely
    let highestSolvedRating = 0;
    if (solvedRatingsList.length > 0) {
      highestSolvedRating = Math.max(...solvedRatingsList);
    }

    result[id] = {
      topicId: id,
      attempts: uniqueAttempted, // Count each attempted problem only once
      accepted: uniqueSolved, // Count each solved problem only once
      uniqueAttempted,
      uniqueSolved,
      totalAttempts: data.totalAttempts,
      acceptanceRate,
      successRate,
      averageSolvedRating,
      highestSolvedRating,
      solvedRatingsList,
      problems: Object.values(data.problemsMap),
    };
  });

  return result;
};
