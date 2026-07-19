export const knowledgeGraph = {
  topics: {
    "recursion": {
      name: "Recursion",
      description: "Understanding base cases, recursive call stacks, recursion trees, and backtracking techniques. Essential for tree traversals and dynamic programming.",
      difficulty: "Easy",
      prerequisites: [],
      nextTopics: ["memoization", "sorting"],
      globalAverageRating: 1000,
      userStats: {
        rating: 1150,
        solved: 25,
        attempted: 28,
        avgSolvedRating: 1050,
        maxSolvedRating: 1300,
        status: "strong",
        distribution: [
          { rating: 800, solved: 10 },
          { rating: 1000, solved: 12 },
          { rating: 1200, solved: 3 }
        ]
      }
    },
    "memoization": {
      name: "Memoization",
      description: "Optimizing recursive algorithms by caching results of redundant states. Transitions simple recursion into Top-Down Dynamic Programming.",
      difficulty: "Easy",
      prerequisites: ["recursion"],
      nextTopics: ["dp"],
      globalAverageRating: 1200,
      userStats: {
        rating: 1250,
        solved: 18,
        attempted: 20,
        avgSolvedRating: 1180,
        maxSolvedRating: 1400,
        status: "strong",
        distribution: [
          { rating: 1000, solved: 8 },
          { rating: 1200, solved: 8 },
          { rating: 1400, solved: 2 }
        ]
      }
    },
    "dp": {
      name: "DP",
      description: "Breaking down complex optimization problems into overlapping subproblems, computing solutions iteratively, and utilizing state transition equations.",
      difficulty: "Medium",
      prerequisites: ["memoization"],
      nextTopics: ["knapsack", "dp-on-trees", "bitmask-dp"],
      globalAverageRating: 1500,
      userStats: {
        rating: 1420,
        solved: 48,
        attempted: 65,
        avgSolvedRating: 1350,
        maxSolvedRating: 1800,
        status: "medium",
        distribution: [
          { rating: 1000, solved: 15 },
          { rating: 1200, solved: 18 },
          { rating: 1400, solved: 10 },
          { rating: 1600, solved: 4 },
          { rating: 1800, solved: 1 }
        ]
      }
    },
    "knapsack": {
      name: "Knapsack DP",
      description: "Core combinatorial optimization technique involving subset choice optimization under a weight constraint. Covers 0/1 knapsack, unbounded knapsack, and bounded items.",
      difficulty: "Medium",
      prerequisites: ["dp"],
      nextTopics: [],
      globalAverageRating: 1600,
      userStats: {
        rating: 1380,
        solved: 12,
        attempted: 22,
        avgSolvedRating: 1320,
        maxSolvedRating: 1500,
        status: "weak",
        distribution: [
          { rating: 1200, solved: 6 },
          { rating: 1400, solved: 5 },
          { rating: 1600, solved: 1 }
        ]
      }
    },
    "dp-on-trees": {
      name: "DP on Trees",
      description: "Performing dynamic programming calculations over tree structures, formulating transitions from children nodes to parents using DFS traversals.",
      difficulty: "Hard",
      prerequisites: ["dp", "graphs"],
      nextTopics: [],
      globalAverageRating: 1800,
      userStats: {
        rating: 1250,
        solved: 5,
        attempted: 16,
        avgSolvedRating: 1400,
        maxSolvedRating: 1600,
        status: "weak",
        distribution: [
          { rating: 1400, solved: 3 },
          { rating: 1600, solved: 2 }
        ]
      }
    },
    "bitmask-dp": {
      name: "Bitmask DP",
      description: "Representing set subsets as binary numbers (integers) to solve exponential state-space problems (e.g., Travelling Salesperson Problem) efficiently.",
      difficulty: "Hard",
      prerequisites: ["dp"],
      nextTopics: [],
      globalAverageRating: 1900,
      userStats: {
        rating: 1100,
        solved: 2,
        attempted: 10,
        avgSolvedRating: 1500,
        maxSolvedRating: 1600,
        status: "weak",
        distribution: [
          { rating: 1400, solved: 1 },
          { rating: 1600, solved: 1 }
        ]
      }
    },
    "arrays": {
      name: "Implementation",
      description: "Linear sequence structures. Focuses on array transformations, prefix sums, difference arrays, and suffix calculations.",
      difficulty: "Easy",
      prerequisites: [],
      nextTopics: ["sorting"],
      globalAverageRating: 800,
      userStats: {
        rating: 1650,
        solved: 120,
        attempted: 125,
        avgSolvedRating: 1300,
        maxSolvedRating: 1900,
        status: "strong",
        distribution: [
          { rating: 800, solved: 50 },
          { rating: 1000, solved: 40 },
          { rating: 1200, solved: 20 },
          { rating: 1500, solved: 8 },
          { rating: 1800, solved: 2 }
        ]
      }
    },
    "sorting": {
      name: "Sorting",
      description: "Reordering elements using comparison or non-comparison keys. Extends to coordinate compression, custom sorting orders, and line-sweep techniques.",
      difficulty: "Easy",
      prerequisites: ["arrays", "recursion"],
      nextTopics: ["binary-search", "two-pointers"],
      globalAverageRating: 1100,
      userStats: {
        rating: 1580,
        solved: 85,
        attempted: 90,
        avgSolvedRating: 1250,
        maxSolvedRating: 1700,
        status: "strong",
        distribution: [
          { rating: 800, solved: 30 },
          { rating: 1000, solved: 35 },
          { rating: 1200, solved: 15 },
          { rating: 1500, solved: 5 }
        ]
      }
    },
    "binary-search": {
      name: "Binary Search",
      description: "Logarithmic interval reduction over monotonic spaces. Used to locate values or optimize decision functions ('binary search on answer').",
      difficulty: "Easy",
      prerequisites: ["sorting"],
      nextTopics: [],
      globalAverageRating: 1200,
      userStats: {
        rating: 1510,
        solved: 65,
        attempted: 70,
        avgSolvedRating: 1300,
        maxSolvedRating: 1800,
        status: "strong",
        distribution: [
          { rating: 1000, solved: 25 },
          { rating: 1200, solved: 25 },
          { rating: 1400, solved: 10 },
          { rating: 1600, solved: 4 },
          { rating: 1800, solved: 1 }
        ]
      }
    },
    "two-pointers": {
      name: "Two Pointers",
      description: "Maintaining two cursor positions traversing linear sequences in tandem to search subsets or ranges in O(N) instead of O(N^2).",
      difficulty: "Easy",
      prerequisites: ["sorting"],
      nextTopics: ["sliding-window"],
      globalAverageRating: 1200,
      userStats: {
        rating: 1450,
        solved: 40,
        attempted: 44,
        avgSolvedRating: 1280,
        maxSolvedRating: 1600,
        status: "strong",
        distribution: [
          { rating: 1000, solved: 18 },
          { rating: 1200, solved: 15 },
          { rating: 1400, solved: 5 },
          { rating: 1600, solved: 2 }
        ]
      }
    },
    "sliding-window": {
      name: "Sliding Window",
      description: "Extending Two Pointers to track dynamic subsegments matching local constraints. Useful for subarray counts, minimum size, or maximum uniqueness.",
      difficulty: "Medium",
      prerequisites: ["two-pointers"],
      nextTopics: [],
      globalAverageRating: 1300,
      userStats: {
        rating: 1390,
        solved: 22,
        attempted: 28,
        avgSolvedRating: 1250,
        maxSolvedRating: 1500,
        status: "medium",
        distribution: [
          { rating: 1000, solved: 10 },
          { rating: 1200, solved: 8 },
          { rating: 1400, solved: 4 }
        ]
      }
    },
    "graphs": {
      name: "Graphs",
      description: "Representing relationships and nodes. Covers storage types (adjacency lists), basic traversals (BFS/DFS), connected components, and bipartite checks.",
      difficulty: "Medium",
      prerequisites: [],
      nextTopics: ["dp-on-trees"],
      globalAverageRating: 1400,
      userStats: {
        rating: 1310,
        solved: 35,
        attempted: 48,
        avgSolvedRating: 1240,
        maxSolvedRating: 1600,
        status: "medium",
        distribution: [
          { rating: 1000, solved: 15 },
          { rating: 1200, solved: 14 },
          { rating: 1400, solved: 5 },
          { rating: 1600, solved: 1 }
        ]
      }
    },
    "greedy": {
      name: "Greedy",
      description: "Making locally optimal steps at every state to achieve the globally optimal result. Requires mathematical proofs, sorting, or priority queues.",
      difficulty: "Medium",
      prerequisites: [],
      nextTopics: [],
      globalAverageRating: 1300,
      userStats: {
        rating: 1480,
        solved: 75,
        attempted: 88,
        avgSolvedRating: 1350,
        maxSolvedRating: 1800,
        status: "strong",
        distribution: [
          { rating: 800, solved: 15 },
          { rating: 1000, solved: 25 },
          { rating: 1200, solved: 20 },
          { rating: 1400, solved: 10 },
          { rating: 1600, solved: 4 },
          { rating: 1800, solved: 1 }
        ]
      }
    },
    "observation": {
      name: "Observation",
      description: "Deducing underlying mathematical behaviors, patterns, periodicity, or invariance from problem statements or small case scenarios.",
      difficulty: "Medium",
      prerequisites: [],
      nextTopics: [],
      globalAverageRating: 1400,
      userStats: {
        rating: 1320,
        solved: 30,
        attempted: 52,
        avgSolvedRating: 1280,
        maxSolvedRating: 1700,
        status: "medium",
        distribution: [
          { rating: 1000, solved: 12 },
          { rating: 1200, solved: 12 },
          { rating: 1400, solved: 4 },
          { rating: 1600, solved: 1 },
          { rating: 1700, solved: 1 }
        ]
      }
    },
    "constructive": {
      name: "Constructive",
      description: "Devising explicit solutions, matrices, or sequence assignments that satisfy given constraints. Relies on pattern generation and edge-case handling.",
      difficulty: "Medium",
      prerequisites: [],
      nextTopics: [],
      globalAverageRating: 1400,
      userStats: {
        rating: 1290,
        solved: 28,
        attempted: 45,
        avgSolvedRating: 1220,
        maxSolvedRating: 1650,
        status: "medium",
        distribution: [
          { rating: 1000, solved: 12 },
          { rating: 1200, solved: 10 },
          { rating: 1400, solved: 5 },
          { rating: 1600, solved: 1 }
        ]
      }
    }
  },
  overallUserStats: {
    currentRating: 1532,
    maxRating: 1645,
    problemsSolved: 645,
    problemsAttempted: 768
  }
};
