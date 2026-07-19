export const dsaExplorerData = {
  topics: [
    // ─── FUNDAMENTALS ───────────────────────────────────────────────
    {
      id: "programming-basics",
      name: "Programming Basics",
      category: "Fundamentals",
      description: "Core programming constructs: variables, loops, conditionals, functions, and I/O — the foundation for all competitive programming.",
      prerequisites: [],
      unlocks: ["complexity-analysis", "arrays", "recursion", "sorting", "string-basics"]
    },
    {
      id: "complexity-analysis",
      name: "Complexity Analysis",
      category: "Fundamentals",
      description: "Big-O notation for time and space complexity. Essential for judging whether a solution will pass within constraints.",
      prerequisites: ["programming-basics"],
      unlocks: ["binary-search", "sorting", "dynamic-programming"]
    },
    {
      id: "bit-manipulation",
      name: "Bit Manipulation",
      category: "Fundamentals",
      description: "Using bitwise operators (AND, OR, XOR, shifts) to manipulate individual bits. Enables efficient solutions for subset enumeration, parity checks, and more.",
      prerequisites: ["programming-basics"],
      unlocks: ["bitmask-dp", "binary-trie", "meet-in-the-middle", "game-theory"]
    },
    {
      id: "mathematics-fundamentals",
      name: "Mathematics Fundamentals",
      category: "Fundamentals",
      description: "Basic math: divisibility, primes, integer arithmetic, and floor/ceiling operations that recur throughout competitive programming.",
      prerequisites: ["programming-basics"],
      unlocks: ["gcd-lcm", "number-theory", "modular-arithmetic", "basic-probability", "ncr"]
    },

    // ─── ARRAYS ─────────────────────────────────────────────────────
    {
      id: "arrays",
      name: "Arrays",
      category: "Arrays",
      description: "Static and dynamic arrays, indexing, traversal, and common array patterns used as building blocks for almost every algorithm.",
      prerequisites: ["programming-basics"],
      unlocks: ["prefix-sum", "difference-array", "sorting", "two-pointers", "sliding-window", "frequency-counting"]
    },
    {
      id: "prefix-sum",
      name: "Prefix Sum",
      category: "Arrays",
      description: "Precompute cumulative sums to answer range sum queries in O(1) after O(n) preprocessing.",
      prerequisites: ["arrays"],
      unlocks: ["difference-array", "2d-prefix-sum", "range-queries", "offline-queries"]
    },
    {
      id: "difference-array",
      name: "Difference Array",
      category: "Arrays",
      description: "Apply range increment/decrement updates in O(1) and reconstruct the array in O(n) using the inverse of prefix sums.",
      prerequisites: ["prefix-sum"],
      unlocks: ["range-queries"]
    },
    {
      id: "2d-prefix-sum",
      name: "2D Prefix Sum",
      category: "Arrays",
      description: "Extend prefix sums to two dimensions to answer rectangular subarray sum queries in O(1).",
      prerequisites: ["prefix-sum"],
      unlocks: ["range-queries"]
    },
    {
      id: "range-queries",
      name: "Range Queries",
      category: "Arrays",
      description: "General family of problems requiring fast answers over subarrays — min, max, sum, GCD, etc. Bridges array techniques with advanced data structures.",
      prerequisites: ["prefix-sum", "difference-array"],
      unlocks: ["sparse-table", "fenwick-tree", "segment-tree", "offline-queries"]
    },
    {
      id: "coordinate-compression",
      name: "Coordinate Compression",
      category: "Arrays",
      description: "Map large or sparse value ranges to a compact index space, enabling use of array-indexed data structures.",
      prerequisites: ["sorting", "arrays"],
      unlocks: ["offline-queries", "fenwick-tree", "segment-tree"]
    },
    {
      id: "offline-queries",
      name: "Offline Queries",
      category: "Arrays",
      description: "Reorder or batch queries to process them more efficiently than online (left-to-right) processing allows.",
      prerequisites: ["sorting", "prefix-sum", "coordinate-compression"],
      unlocks: ["mos-algorithm", "parallel-binary-search"]
    },

    // ─── SORTING ────────────────────────────────────────────────────
    {
      id: "sorting",
      name: "Sorting",
      category: "Sorting",
      description: "Comparison-based and non-comparison-based sorting algorithms (merge sort, quicksort, counting sort). Foundation for many greedy and search techniques.",
      prerequisites: ["arrays"],
      unlocks: ["binary-search", "custom-sorting", "coordinate-compression", "greedy", "two-pointers", "interval-problems"]
    },
    {
      id: "custom-sorting",
      name: "Custom Sorting",
      category: "Sorting",
      description: "Define comparators for non-trivial orderings, including multi-key sorts and problem-specific comparison functions used in greedy algorithms.",
      prerequisites: ["sorting"],
      unlocks: ["greedy", "exchange-arguments", "scheduling"]
    },

    // ─── SEARCHING ──────────────────────────────────────────────────
    {
      id: "binary-search",
      name: "Binary Search",
      category: "Searching",
      description: "Find elements or boundaries in sorted arrays in O(log n) by repeatedly halving the search space.",
      prerequisites: ["sorting", "complexity-analysis"],
      unlocks: ["binary-search-on-answer", "parallel-binary-search", "ternary-search"]
    },
    {
      id: "binary-search-on-answer",
      name: "Binary Search On Answer",
      category: "Searching",
      description: "Binary search over the answer space rather than an array — applicable when the feasibility function is monotone.",
      prerequisites: ["binary-search"],
      unlocks: ["parallel-binary-search"]
    },
    {
      id: "parallel-binary-search",
      name: "Parallel Binary Search",
      category: "Searching",
      description: "Run multiple binary searches simultaneously to amortize the cost of expensive feasibility checks across many queries.",
      prerequisites: ["binary-search-on-answer", "offline-queries"],
      unlocks: []
    },
    {
      id: "ternary-search",
      name: "Ternary Search",
      category: "Searching",
      description: "Find the minimum or maximum of a unimodal function in O(log n) by eliminating one-third of the search space per step.",
      prerequisites: ["binary-search"],
      unlocks: ["convex-hull-trick"]
    },

    // ─── POINTERS ───────────────────────────────────────────────────
    {
      id: "two-pointers",
      name: "Two Pointers",
      category: "Pointers",
      description: "Use two indices moving toward or away from each other to solve subarray or pair problems in O(n) instead of O(n²).",
      prerequisites: ["arrays", "sorting"],
      unlocks: ["sliding-window", "interval-problems"]
    },
    {
      id: "sliding-window",
      name: "Sliding Window",
      category: "Pointers",
      description: "Maintain a window of fixed or variable size over an array, adding/removing elements at both ends to compute properties efficiently.",
      prerequisites: ["two-pointers"],
      unlocks: ["monotonic-queue", "mos-algorithm"]
    },
    {
      id: "meet-in-the-middle",
      name: "Meet In The Middle",
      category: "Pointers",
      description: "Split the problem into two halves, enumerate each independently, then combine — reducing O(2^n) to O(2^(n/2)).",
      prerequisites: ["recursion", "sorting", "bit-manipulation"],
      unlocks: []
    },

    // ─── GREEDY ─────────────────────────────────────────────────────
    {
      id: "observation",
      name: "Observation",
      category: "Greedy",
      description: "The meta-skill of spotting key structural properties in a problem that enable simple or clever solutions. Prerequisite mindset for greedy design.",
      prerequisites: ["programming-basics"],
      unlocks: ["greedy", "constructive-algorithms"]
    },
    {
      id: "greedy",
      name: "Greedy",
      category: "Greedy",
      description: "Build the solution incrementally by always choosing the locally optimal option, provably yielding a global optimum for specific problem classes.",
      prerequisites: ["sorting", "observation"],
      unlocks: ["scheduling", "interval-problems", "exchange-arguments", "priority-queue-greedy", "constructive-algorithms", "kruskal", "dijkstra", "prim"]
    },
    {
      id: "constructive-algorithms",
      name: "Constructive Algorithms",
      category: "Greedy",
      description: "Explicitly construct a valid answer rather than searching — requires insight into the problem's structure to guarantee correctness.",
      prerequisites: ["greedy", "observation"],
      unlocks: []
    },
    {
      id: "scheduling",
      name: "Scheduling",
      category: "Greedy",
      description: "Assign tasks to time slots optimally — classic greedy problems like earliest deadline first and minimizing total lateness.",
      prerequisites: ["greedy", "custom-sorting"],
      unlocks: []
    },
    {
      id: "interval-problems",
      name: "Interval Problems",
      category: "Greedy",
      description: "Problems on intervals: activity selection, interval covering, merging overlapping intervals. Often solved with sorting + greedy.",
      prerequisites: ["greedy", "sorting", "two-pointers"],
      unlocks: []
    },
    {
      id: "exchange-arguments",
      name: "Exchange Arguments",
      category: "Greedy",
      description: "Prove greedy optimality by showing that swapping any two adjacent elements in a candidate solution cannot improve the result.",
      prerequisites: ["greedy", "custom-sorting"],
      unlocks: []
    },
    {
      id: "priority-queue-greedy",
      name: "Priority Queue Greedy",
      category: "Greedy",
      description: "Use a heap to efficiently extract the current best choice at each greedy step.",
      prerequisites: ["greedy", "heap"],
      unlocks: ["dijkstra", "prim"]
    },

    // ─── RECURSION ──────────────────────────────────────────────────
    {
      id: "recursion",
      name: "Recursion",
      category: "Recursion",
      description: "Solving problems by breaking them into smaller instances of themselves. Foundation for divide-and-conquer, backtracking, and tree algorithms.",
      prerequisites: ["programming-basics"],
      unlocks: ["backtracking", "memoization", "tree-dfs", "divide-and-conquer-dp", "merge-sort-tree"]
    },
    {
      id: "backtracking",
      name: "Backtracking",
      category: "Recursion",
      description: "Explore all potential solutions via recursion, pruning branches that can't lead to valid results.",
      prerequisites: ["recursion"],
      unlocks: ["branch-and-bound", "bitmask-dp"]
    },
    {
      id: "branch-and-bound",
      name: "Branch And Bound",
      category: "Recursion",
      description: "Backtracking enhanced with upper/lower bound estimates to prune provably suboptimal branches earlier.",
      prerequisites: ["backtracking"],
      unlocks: []
    },

    // ─── DYNAMIC PROGRAMMING ────────────────────────────────────────
    {
      id: "memoization",
      name: "Memoization",
      category: "Dynamic Programming",
      description: "Cache recursive subproblem results to avoid redundant computation — the top-down form of dynamic programming.",
      prerequisites: ["recursion"],
      unlocks: ["dynamic-programming"]
    },
    {
      id: "dynamic-programming",
      name: "Dynamic Programming",
      category: "Dynamic Programming",
      description: "Solve problems by breaking them into overlapping subproblems and storing results. Covers bottom-up tabulation and top-down memoization.",
      prerequisites: ["memoization", "complexity-analysis"],
      unlocks: ["knapsack", "lis", "lcs", "interval-dp", "bitmask-dp", "digit-dp", "tree-dp", "dp-on-dag", "probability-dp", "dp-optimizations", "matrix-exponentiation"]
    },
    {
      id: "knapsack",
      name: "Knapsack",
      category: "Dynamic Programming",
      description: "Classic DP for selecting items under a capacity constraint — 0/1, unbounded, and bounded variants.",
      prerequisites: ["dynamic-programming"],
      unlocks: ["dp-optimizations"]
    },
    {
      id: "lis",
      name: "LIS",
      category: "Dynamic Programming",
      description: "Longest Increasing Subsequence — find the longest strictly increasing subsequence in O(n log n) using patience sorting or DP.",
      prerequisites: ["dynamic-programming", "binary-search"],
      unlocks: ["dp-optimizations"]
    },
    {
      id: "lcs",
      name: "LCS",
      category: "Dynamic Programming",
      description: "Longest Common Subsequence — classic 2D DP measuring similarity between two sequences.",
      prerequisites: ["dynamic-programming"],
      unlocks: []
    },
    {
      id: "interval-dp",
      name: "Interval DP",
      category: "Dynamic Programming",
      description: "DP over all intervals [l, r] of a sequence, typically by splitting at an optimal pivot k. Used for matrix chain, optimal BST, and burst balloons.",
      prerequisites: ["dynamic-programming"],
      unlocks: ["divide-and-conquer-dp"]
    },
    {
      id: "probability-dp",
      name: "Probability DP",
      category: "Dynamic Programming",
      description: "DP where state values represent probabilities or expected values over random processes.",
      prerequisites: ["dynamic-programming", "basic-probability", "expected-value"],
      unlocks: []
    },
    {
      id: "bitmask-dp",
      name: "Bitmask DP",
      category: "Dynamic Programming",
      description: "DP where the state encodes a subset as a bitmask — classic for TSP and assignment problems over small sets.",
      prerequisites: ["dynamic-programming", "bit-manipulation", "backtracking"],
      unlocks: []
    },
    {
      id: "digit-dp",
      name: "Digit DP",
      category: "Dynamic Programming",
      description: "Count numbers in a range satisfying digit-level constraints by processing digits one by one with DP.",
      prerequisites: ["dynamic-programming"],
      unlocks: []
    },
    {
      id: "tree-dp",
      name: "Tree DP",
      category: "Dynamic Programming",
      description: "DP on rooted trees, combining results from children to compute properties like subtree sizes, diameters, or optimal selections.",
      prerequisites: ["dynamic-programming", "trees"],
      unlocks: ["rerooting-dp", "dsu-on-tree"]
    },
    {
      id: "dp-on-dag",
      name: "DP On DAG",
      category: "Dynamic Programming",
      description: "DP on directed acyclic graphs — requires topological order to ensure subproblems are solved before they are needed.",
      prerequisites: ["dynamic-programming", "topological-sort"],
      unlocks: []
    },
    {
      id: "profile-dp",
      name: "Profile DP",
      category: "Dynamic Programming",
      description: "DP that processes a grid column-by-column (or row-by-row), encoding the current column boundary as the state profile.",
      prerequisites: ["dynamic-programming", "bitmask-dp"],
      unlocks: ["broken-profile-dp"]
    },
    {
      id: "broken-profile-dp",
      name: "Broken Profile DP",
      category: "Dynamic Programming",
      description: "Cell-by-cell profile DP that maintains a partial column boundary, used for tiling problems like counting domino coverings.",
      prerequisites: ["profile-dp"],
      unlocks: []
    },
    {
      id: "divide-and-conquer-dp",
      name: "Divide And Conquer DP",
      category: "Dynamic Programming",
      description: "Optimize O(n²) DP transitions to O(n log n) when the optimal split point is monotone in the state index.",
      prerequisites: ["interval-dp", "recursion"],
      unlocks: ["convex-hull-dp"]
    },
    {
      id: "dp-optimizations",
      name: "DP Optimizations",
      category: "Dynamic Programming",
      description: "Broad category of techniques to reduce DP complexity: monotone queue, convex hull trick, divide and conquer, and Knuth's optimization.",
      prerequisites: ["dynamic-programming", "knapsack", "lis"],
      unlocks: ["convex-hull-dp", "divide-and-conquer-dp"]
    },
    {
      id: "convex-hull-dp",
      name: "Convex Hull DP",
      category: "Dynamic Programming",
      description: "Also called the Convex Hull Trick — reduce O(n²) DP to O(n) or O(n log n) by maintaining a convex hull of linear functions.",
      prerequisites: ["dp-optimizations", "divide-and-conquer-dp", "ternary-search"],
      unlocks: []
    },

    // ─── STRINGS ────────────────────────────────────────────────────
    {
      id: "string-basics",
      name: "String Basics",
      category: "Strings",
      description: "String representation, traversal, substring extraction, and common built-in operations.",
      prerequisites: ["programming-basics"],
      unlocks: ["frequency-counting", "hashing", "trie", "kmp"]
    },
    {
      id: "frequency-counting",
      name: "Frequency Counting",
      category: "Strings",
      description: "Use hash maps or frequency arrays to count character or element occurrences — prerequisite for anagram checks, histograms, and more.",
      prerequisites: ["arrays", "string-basics"],
      unlocks: ["hashing", "sliding-window"]
    },
    {
      id: "hashing",
      name: "Hashing",
      category: "Strings",
      description: "Polynomial rolling hash for O(1) substring comparison after O(n) preprocessing — used for pattern matching and duplicate detection.",
      prerequisites: ["string-basics", "modular-arithmetic"],
      unlocks: ["double-hashing", "suffix-array", "mos-algorithm"]
    },
    {
      id: "double-hashing",
      name: "Double Hashing",
      category: "Strings",
      description: "Use two independent hash functions to reduce collision probability to near zero in string matching.",
      prerequisites: ["hashing"],
      unlocks: []
    },
    {
      id: "trie",
      name: "Trie",
      category: "Strings",
      description: "Prefix tree for O(L) insertion and lookup of strings. Supports prefix queries and dictionary-based problems.",
      prerequisites: ["string-basics"],
      unlocks: ["binary-trie", "aho-corasick"]
    },
    {
      id: "binary-trie",
      name: "Binary Trie",
      category: "Strings",
      description: "Trie over bits of integers — used for maximizing XOR of pairs or finding the largest XOR reachable from a value.",
      prerequisites: ["trie", "bit-manipulation"],
      unlocks: []
    },
    {
      id: "kmp",
      name: "KMP",
      category: "Strings",
      description: "Knuth-Morris-Pratt O(n+m) string pattern matching using the failure function to avoid redundant comparisons.",
      prerequisites: ["string-basics", "prefix-function"],
      unlocks: ["aho-corasick"]
    },
    {
      id: "prefix-function",
      name: "Prefix Function",
      category: "Strings",
      description: "For each position i, the length of the longest proper prefix of s[0..i] that is also a suffix. Core of KMP.",
      prerequisites: ["string-basics"],
      unlocks: ["kmp", "z-algorithm"]
    },
    {
      id: "z-algorithm",
      name: "Z Algorithm",
      category: "Strings",
      description: "Compute the Z-array where Z[i] is the length of the longest substring starting at i that matches a prefix of the string — O(n) pattern matching.",
      prerequisites: ["prefix-function"],
      unlocks: ["manacher"]
    },
    {
      id: "manacher",
      name: "Manacher",
      category: "Strings",
      description: "Find all palindromic substrings in O(n) by reusing previously computed palindrome radii.",
      prerequisites: ["z-algorithm"],
      unlocks: []
    },
    {
      id: "suffix-array",
      name: "Suffix Array",
      category: "Strings",
      description: "Sorted array of all suffixes of a string, built in O(n log n). Combined with LCP array enables powerful substring queries.",
      prerequisites: ["hashing", "sorting"],
      unlocks: ["suffix-automaton"]
    },
    {
      id: "suffix-automaton",
      name: "Suffix Automaton",
      category: "Strings",
      description: "Minimal DFA recognizing all substrings of a string — built in O(n), supports counting distinct substrings and matching.",
      prerequisites: ["suffix-array"],
      unlocks: []
    },
    {
      id: "aho-corasick",
      name: "Aho Corasick",
      category: "Strings",
      description: "Multi-pattern string matching in O(n + m + matches) by building a failure-linked trie automaton.",
      prerequisites: ["trie", "kmp"],
      unlocks: []
    },

    // ─── MATHEMATICS ────────────────────────────────────────────────
    {
      id: "gcd-lcm",
      name: "GCD LCM",
      category: "Mathematics",
      description: "Euclidean algorithm for GCD in O(log n) and LCM via the identity lcm(a,b) = a*b/gcd(a,b).",
      prerequisites: ["mathematics-fundamentals"],
      unlocks: ["modular-inverse", "number-theory", "chinese-remainder-theorem"]
    },
    {
      id: "fast-exponentiation",
      name: "Fast Exponentiation",
      category: "Mathematics",
      description: "Compute a^n mod m in O(log n) using repeated squaring. Essential for modular arithmetic and matrix exponentiation.",
      prerequisites: ["modular-arithmetic"],
      unlocks: ["modular-inverse", "matrix-exponentiation"]
    },
    {
      id: "modular-arithmetic",
      name: "Modular Arithmetic",
      category: "Mathematics",
      description: "Arithmetic under a modulus: addition, subtraction, multiplication mod p. Prevents overflow in combinatorial and number-theoretic computations.",
      prerequisites: ["mathematics-fundamentals"],
      unlocks: ["fast-exponentiation", "modular-inverse", "hashing", "ncr"]
    },
    {
      id: "modular-inverse",
      name: "Modular Inverse",
      category: "Mathematics",
      description: "Compute the multiplicative inverse mod p using Fermat's little theorem (p prime) or the extended Euclidean algorithm.",
      prerequisites: ["fast-exponentiation", "gcd-lcm", "modular-arithmetic"],
      unlocks: ["ncr", "chinese-remainder-theorem"]
    },
    {
      id: "chinese-remainder-theorem",
      name: "Chinese Remainder Theorem",
      category: "Mathematics",
      description: "Reconstruct a number from its residues modulo pairwise coprime moduli. Used in number theory and some DP optimizations.",
      prerequisites: ["modular-inverse", "gcd-lcm"],
      unlocks: []
    },
    {
      id: "number-theory",
      name: "Number Theory",
      category: "Mathematics",
      description: "Primes, divisibility, prime factorization, Euler's theorem, and multiplicative functions.",
      prerequisites: ["gcd-lcm", "mathematics-fundamentals"],
      unlocks: ["sieve", "euler-totient", "mobius", "prime-factorization", "divisors"]
    },
    {
      id: "sieve",
      name: "Sieve",
      category: "Mathematics",
      description: "Sieve of Eratosthenes to compute all primes up to N in O(N log log N).",
      prerequisites: ["number-theory"],
      unlocks: ["linear-sieve", "prime-factorization"]
    },
    {
      id: "linear-sieve",
      name: "Linear Sieve",
      category: "Mathematics",
      description: "Compute primes and multiplicative functions (e.g. Euler totient, Mobius) for all n up to N in strict O(N) time.",
      prerequisites: ["sieve"],
      unlocks: ["euler-totient", "mobius"]
    },
    {
      id: "prime-factorization",
      name: "Prime Factorization",
      category: "Mathematics",
      description: "Factorize a number in O(√n) by trial division, or O(log n) per query using a smallest-prime-factor sieve.",
      prerequisites: ["sieve"],
      unlocks: ["divisors", "euler-totient"]
    },
    {
      id: "divisors",
      name: "Divisors",
      category: "Mathematics",
      description: "Enumerate all divisors of n from its prime factorization. Count and sum divisors using multiplicative function formulas.",
      prerequisites: ["prime-factorization"],
      unlocks: ["mobius"]
    },
    {
      id: "euler-totient",
      name: "Euler Totient",
      category: "Mathematics",
      description: "φ(n): count of integers in [1,n] coprime to n. Key in Euler's theorem and RSA-style problems.",
      prerequisites: ["prime-factorization", "linear-sieve"],
      unlocks: ["mobius"]
    },
    {
      id: "mobius",
      name: "Mobius",
      category: "Mathematics",
      description: "Möbius function μ(n) and Möbius inversion for inclusion-exclusion on multiplicative functions.",
      prerequisites: ["euler-totient", "divisors", "linear-sieve"],
      unlocks: ["inclusion-exclusion"]
    },

    // ─── COMBINATORICS ──────────────────────────────────────────────
    {
      id: "ncr",
      name: "nCr",
      category: "Combinatorics",
      description: "Binomial coefficient C(n,r) computed via Pascal's triangle or modular inverse factorials.",
      prerequisites: ["modular-arithmetic", "modular-inverse"],
      unlocks: ["pascal-triangle", "stars-and-bars", "inclusion-exclusion", "burnside"]
    },
    {
      id: "pascal-triangle",
      name: "Pascal Triangle",
      category: "Combinatorics",
      description: "Precompute binomial coefficients iteratively using Pascal's recurrence — efficient for multiple queries with small n.",
      prerequisites: ["ncr"],
      unlocks: []
    },
    {
      id: "inclusion-exclusion",
      name: "Inclusion Exclusion",
      category: "Combinatorics",
      description: "Count elements in a union by alternating addition and subtraction of intersections — core principle in combinatorial counting.",
      prerequisites: ["ncr", "mobius"],
      unlocks: ["burnside"]
    },
    {
      id: "stars-and-bars",
      name: "Stars And Bars",
      category: "Combinatorics",
      description: "Count the number of ways to distribute n identical items into k distinct bins using the combinatorial stars-and-bars identity.",
      prerequisites: ["ncr"],
      unlocks: []
    },
    {
      id: "burnside",
      name: "Burnside",
      category: "Combinatorics",
      description: "Count distinct objects under group symmetry using Burnside's lemma (cycle index theorem).",
      prerequisites: ["inclusion-exclusion", "ncr"],
      unlocks: []
    },

    // ─── PROBABILITY ────────────────────────────────────────────────
    {
      id: "basic-probability",
      name: "Basic Probability",
      category: "Probability",
      description: "Probability spaces, independent events, conditional probability, and Bayes' theorem.",
      prerequisites: ["mathematics-fundamentals"],
      unlocks: ["expected-value", "probability-dp"]
    },
    {
      id: "expected-value",
      name: "Expected Value",
      category: "Probability",
      description: "Linearity of expectation and expected value over random variables — frequently combined with DP for probabilistic problems.",
      prerequisites: ["basic-probability"],
      unlocks: ["probability-dp"]
    },

    // ─── DATA STRUCTURES ────────────────────────────────────────────
    {
      id: "stack",
      name: "Stack",
      category: "Data Structures",
      description: "LIFO data structure supporting push/pop in O(1). Used for parsing, DFS simulation, and history tracking.",
      prerequisites: ["arrays"],
      unlocks: ["monotonic-stack", "dfs"]
    },
    {
      id: "monotonic-stack",
      name: "Monotonic Stack",
      category: "Data Structures",
      description: "A stack maintaining a monotone (increasing or decreasing) sequence, enabling O(n) solutions for next greater element and histogram problems.",
      prerequisites: ["stack"],
      unlocks: ["convex-hull-dp"]
    },
    {
      id: "queue",
      name: "Queue",
      category: "Data Structures",
      description: "FIFO data structure used in BFS, level-order traversal, and sliding window algorithms.",
      prerequisites: ["arrays"],
      unlocks: ["deque", "bfs", "monotonic-queue"]
    },
    {
      id: "deque",
      name: "Deque",
      category: "Data Structures",
      description: "Double-ended queue supporting O(1) push/pop at both ends — used in sliding window maximum and BFS-based tricks.",
      prerequisites: ["queue"],
      unlocks: ["monotonic-queue", "0-1-bfs"]
    },
    {
      id: "monotonic-queue",
      name: "Monotonic Queue",
      category: "Data Structures",
      description: "A deque maintaining a monotone sequence for O(n) sliding window minimum/maximum.",
      prerequisites: ["deque", "sliding-window"],
      unlocks: ["dp-optimizations"]
    },
    {
      id: "heap",
      name: "Heap",
      category: "Data Structures",
      description: "Binary heap supporting O(log n) insert and extract-min/max. Backbone of priority queues and many greedy algorithms.",
      prerequisites: ["arrays"],
      unlocks: ["priority-queue", "priority-queue-greedy", "dijkstra", "prim"]
    },
    {
      id: "priority-queue",
      name: "Priority Queue",
      category: "Data Structures",
      description: "Abstract data structure providing efficient access to the minimum or maximum element, typically implemented with a binary heap.",
      prerequisites: ["heap"],
      unlocks: ["priority-queue-greedy", "dijkstra", "prim"]
    },
    {
      id: "ordered-set",
      name: "Ordered Set",
      category: "Data Structures",
      description: "Balanced BST-based set (e.g. std::set/policy-based tree) supporting O(log n) insert, delete, and order-statistic queries.",
      prerequisites: ["sorting"],
      unlocks: ["mos-algorithm"]
    },
    {
      id: "fenwick-tree",
      name: "Fenwick Tree",
      category: "Data Structures",
      description: "Binary Indexed Tree supporting prefix sum queries and point updates in O(log n) with minimal implementation overhead.",
      prerequisites: ["prefix-sum", "range-queries", "coordinate-compression"],
      unlocks: ["merge-sort-tree"]
    },
    {
      id: "sparse-table",
      name: "Sparse Table",
      category: "Data Structures",
      description: "O(n log n) preprocessing for O(1) idempotent range queries (min, max, GCD) — no updates supported.",
      prerequisites: ["range-queries"],
      unlocks: ["lca"]
    },
    {
      id: "segment-tree",
      name: "Segment Tree",
      category: "Data Structures",
      description: "Tree over array intervals supporting O(log n) range queries and point updates for any associative operation.",
      prerequisites: ["range-queries", "coordinate-compression"],
      unlocks: ["lazy-propagation", "merge-sort-tree", "persistent-segment-tree", "dynamic-segment-tree", "segment-tree-beats"]
    },
    {
      id: "lazy-propagation",
      name: "Lazy Propagation",
      category: "Data Structures",
      description: "Extend segment trees to support range updates in O(log n) by deferring updates until needed.",
      prerequisites: ["segment-tree"],
      unlocks: ["segment-tree-beats", "persistent-segment-tree"]
    },
    {
      id: "merge-sort-tree",
      name: "Merge Sort Tree",
      category: "Data Structures",
      description: "Segment tree where each node stores a sorted list of its range's elements — enables O(log² n) range k-th element queries.",
      prerequisites: ["segment-tree", "fenwick-tree", "recursion"],
      unlocks: ["persistent-segment-tree"]
    },
    {
      id: "persistent-segment-tree",
      name: "Persistent Segment Tree",
      category: "Data Structures",
      description: "Segment tree that preserves all historical versions by path-copying — enables queries on past states in O(log n) per version.",
      prerequisites: ["segment-tree", "lazy-propagation", "merge-sort-tree"],
      unlocks: []
    },
    {
      id: "dynamic-segment-tree",
      name: "Dynamic Segment Tree",
      category: "Data Structures",
      description: "Segment tree with nodes allocated on demand — handles extremely large value ranges without O(N) memory allocation.",
      prerequisites: ["segment-tree"],
      unlocks: []
    },
    {
      id: "segment-tree-beats",
      name: "Segment Tree Beats",
      category: "Data Structures",
      description: "Ji driver segment tree supporting range chmin/chmax updates in amortized O(n log² n) — breaks the \"no non-idempotent range update\" barrier.",
      prerequisites: ["lazy-propagation", "segment-tree"],
      unlocks: []
    },
    {
      id: "sqrt-decomposition",
      name: "Sqrt Decomposition",
      category: "Data Structures",
      description: "Partition an array into √n blocks, precomputing block-level answers to achieve O(√n) per query/update — a versatile fallback technique.",
      prerequisites: ["range-queries", "prefix-sum"],
      unlocks: ["mos-algorithm"]
    },

    // ─── GRAPHS ─────────────────────────────────────────────────────
    {
      id: "graph-basics",
      name: "Graph Basics",
      category: "Graphs",
      description: "Graph representations (adjacency list/matrix), terminology (directed, undirected, weighted, degree), and basic traversal setup.",
      prerequisites: ["arrays"],
      unlocks: ["dfs", "bfs", "topological-sort", "dsu"]
    },
    {
      id: "dfs",
      name: "DFS",
      category: "Graphs",
      description: "Depth-First Search explores as deep as possible before backtracking — used for connectivity, cycle detection, topological sort, and tree traversal.",
      prerequisites: ["graph-basics", "stack", "recursion"],
      unlocks: ["connected-components", "topological-sort", "scc", "bridges", "articulation-points", "biconnected-components", "euler-path", "tree-dfs"]
    },
    {
      id: "bfs",
      name: "BFS",
      category: "Graphs",
      description: "Breadth-First Search explores level by level — finds shortest paths in unweighted graphs and solves multi-source reachability problems.",
      prerequisites: ["graph-basics", "queue"],
      unlocks: ["connected-components", "bipartite-graph", "0-1-bfs", "shortest-path"]
    },
    {
      id: "connected-components",
      name: "Connected Components",
      category: "Graphs",
      description: "Identify maximal connected subgraphs via DFS or BFS. Fundamental for graph partitioning and labeling.",
      prerequisites: ["dfs", "bfs"],
      unlocks: ["bipartite-graph", "dsu"]
    },
    {
      id: "bipartite-graph",
      name: "Bipartite Graph",
      category: "Graphs",
      description: "Check and use two-colorability of a graph via BFS/DFS. Prerequisite for matching algorithms.",
      prerequisites: ["bfs", "connected-components"],
      unlocks: ["matching", "kuhn-algorithm"]
    },
    {
      id: "topological-sort",
      name: "Topological Sort",
      category: "Graphs",
      description: "Linear ordering of DAG vertices respecting edge directions — via Kahn's BFS algorithm or DFS finishing times.",
      prerequisites: ["dfs", "bfs"],
      unlocks: ["dp-on-dag", "scc"]
    },
    {
      id: "dsu",
      name: "DSU",
      category: "Graphs",
      description: "Disjoint Set Union with union-by-rank and path compression — O(α(n)) per operation for dynamic connectivity.",
      prerequisites: ["graph-basics", "connected-components"],
      unlocks: ["rollback-dsu", "dsu-on-tree", "kruskal", "mst"]
    },
    {
      id: "rollback-dsu",
      name: "Rollback DSU",
      category: "Graphs",
      description: "DSU with union by rank but no path compression, supporting undo operations — used in offline dynamic connectivity.",
      prerequisites: ["dsu"],
      unlocks: ["dsu-on-tree"]
    },
    {
      id: "dsu-on-tree",
      name: "DSU On Tree",
      category: "Graphs",
      description: "Small-to-large merging on subtrees to answer offline subtree queries in O(n log n).",
      prerequisites: ["rollback-dsu", "tree-dp"],
      unlocks: []
    },
    {
      id: "shortest-path",
      name: "Shortest Path",
      category: "Graphs",
      description: "Overview of shortest path problem variants and applicable algorithms by graph type (weighted, unweighted, negative edges).",
      prerequisites: ["bfs", "graph-basics"],
      unlocks: ["dijkstra", "bellman-ford", "floyd-warshall", "0-1-bfs"]
    },
    {
      id: "dijkstra",
      name: "Dijkstra",
      category: "Graphs",
      description: "Shortest paths from a source in O((V+E) log V) using a priority queue. Requires non-negative edge weights.",
      prerequisites: ["shortest-path", "priority-queue", "greedy"],
      unlocks: ["johnson-algorithm"]
    },
    {
      id: "0-1-bfs",
      name: "0-1 BFS",
      category: "Graphs",
      description: "Shortest paths when edge weights are 0 or 1 using a deque in O(V+E) — faster than Dijkstra for this special case.",
      prerequisites: ["bfs", "deque", "shortest-path"],
      unlocks: []
    },
    {
      id: "bellman-ford",
      name: "Bellman Ford",
      category: "Graphs",
      description: "Shortest paths from a source in O(VE) — handles negative edge weights and detects negative cycles.",
      prerequisites: ["shortest-path"],
      unlocks: ["floyd-warshall", "johnson-algorithm"]
    },
    {
      id: "floyd-warshall",
      name: "Floyd Warshall",
      category: "Graphs",
      description: "All-pairs shortest paths in O(V³) using DP over intermediate vertices. Handles negative edges, detects negative cycles.",
      prerequisites: ["bellman-ford", "dynamic-programming"],
      unlocks: ["johnson-algorithm"]
    },
    {
      id: "johnson-algorithm",
      name: "Johnson Algorithm",
      category: "Graphs",
      description: "All-pairs shortest paths in O(VE + V² log V) by reweighting with Bellman-Ford then running Dijkstra from each vertex.",
      prerequisites: ["dijkstra", "bellman-ford", "floyd-warshall"],
      unlocks: []
    },
    {
      id: "mst",
      name: "MST",
      category: "Graphs",
      description: "Minimum Spanning Tree — minimum weight subgraph connecting all vertices. Solved by Kruskal or Prim.",
      prerequisites: ["dsu", "greedy"],
      unlocks: ["kruskal", "prim"]
    },
    {
      id: "kruskal",
      name: "Kruskal",
      category: "Graphs",
      description: "Build MST by sorting edges and greedily adding the minimum weight edge that doesn't form a cycle, using DSU for connectivity.",
      prerequisites: ["mst", "dsu", "greedy"],
      unlocks: []
    },
    {
      id: "prim",
      name: "Prim",
      category: "Graphs",
      description: "Build MST by greedily expanding the frontier with the cheapest edge, using a priority queue. Efficient on dense graphs.",
      prerequisites: ["mst", "priority-queue-greedy"],
      unlocks: []
    },
    {
      id: "scc",
      name: "SCC",
      category: "Graphs",
      description: "Strongly Connected Components — maximal subgraphs where every vertex is reachable from every other. Solved by Kosaraju or Tarjan.",
      prerequisites: ["dfs", "topological-sort"],
      unlocks: ["kosaraju", "tarjan"]
    },
    {
      id: "kosaraju",
      name: "Kosaraju",
      category: "Graphs",
      description: "Two-pass DFS algorithm for SCCs: first pass on original graph, second on reversed graph in reverse finishing order.",
      prerequisites: ["scc"],
      unlocks: []
    },
    {
      id: "tarjan",
      name: "Tarjan",
      category: "Graphs",
      description: "Single-pass DFS-based SCC algorithm using a stack and low-link values. Also computes bridges and articulation points.",
      prerequisites: ["scc"],
      unlocks: ["bridges", "articulation-points", "biconnected-components"]
    },
    {
      id: "bridges",
      name: "Bridges",
      category: "Graphs",
      description: "Find edges whose removal increases the number of connected components — using DFS with low-link values.",
      prerequisites: ["dfs", "tarjan"],
      unlocks: ["biconnected-components"]
    },
    {
      id: "articulation-points",
      name: "Articulation Points",
      category: "Graphs",
      description: "Find vertices whose removal increases the number of connected components — computed alongside bridges in a single DFS.",
      prerequisites: ["dfs", "tarjan"],
      unlocks: ["biconnected-components"]
    },
    {
      id: "biconnected-components",
      name: "Biconnected Components",
      category: "Graphs",
      description: "Maximal 2-edge-connected or 2-vertex-connected subgraphs, found using bridges and articulation points.",
      prerequisites: ["bridges", "articulation-points", "tarjan"],
      unlocks: []
    },
    {
      id: "euler-path",
      name: "Euler Path",
      category: "Graphs",
      description: "Find a path or circuit traversing every edge exactly once — exists iff at most 2 vertices have odd degree (Hierholzer's algorithm).",
      prerequisites: ["dfs"],
      unlocks: []
    },

    // ─── TREES ──────────────────────────────────────────────────────
    {
      id: "trees",
      name: "Trees",
      category: "Trees",
      description: "Connected acyclic graphs. Covers rooting, parent/child relationships, depth, and subtree structure.",
      prerequisites: ["graph-basics", "dfs"],
      unlocks: ["tree-dfs", "diameter", "euler-tour", "binary-lifting", "tree-dp"]
    },
    {
      id: "tree-dfs",
      name: "Tree DFS",
      category: "Trees",
      description: "DFS on trees to compute subtree sizes, depths, in/out times, and subtree properties.",
      prerequisites: ["trees", "dfs", "recursion"],
      unlocks: ["diameter", "euler-tour", "lca", "tree-queries"]
    },
    {
      id: "diameter",
      name: "Diameter",
      category: "Trees",
      description: "Longest path in a tree — found by two BFS/DFS passes or DP. A building block for tree distance problems.",
      prerequisites: ["tree-dfs"],
      unlocks: ["rerooting-dp"]
    },
    {
      id: "euler-tour",
      name: "Euler Tour",
      category: "Trees",
      description: "Linearize a tree via DFS entry/exit times, reducing subtree queries to range queries on an array.",
      prerequisites: ["tree-dfs"],
      unlocks: ["lca", "tree-queries", "heavy-light-decomposition"]
    },
    {
      id: "binary-lifting",
      name: "Binary Lifting",
      category: "Trees",
      description: "Precompute 2^k-th ancestors for all nodes in O(n log n) to answer k-th ancestor and LCA queries in O(log n).",
      prerequisites: ["tree-dfs"],
      unlocks: ["lca"]
    },
    {
      id: "lca",
      name: "LCA",
      category: "Trees",
      description: "Lowest Common Ancestor — find the deepest node ancestral to both query nodes via binary lifting, Euler tour + RMQ, or Tarjan offline.",
      prerequisites: ["binary-lifting", "euler-tour", "sparse-table"],
      unlocks: ["tree-queries", "heavy-light-decomposition"]
    },
    {
      id: "tree-queries",
      name: "Tree Queries",
      category: "Trees",
      description: "Answer path and subtree queries on trees by combining LCA, Euler tour, and range data structures.",
      prerequisites: ["lca", "euler-tour", "tree-dfs"],
      unlocks: ["heavy-light-decomposition", "centroid-decomposition", "virtual-tree"]
    },
    {
      id: "rerooting-dp",
      name: "Rerooting DP",
      category: "Trees",
      description: "Compute DP values for all possible roots in O(n) by rerooting — first a standard root DP, then propagate to children.",
      prerequisites: ["tree-dp", "diameter"],
      unlocks: []
    },
    {
      id: "heavy-light-decomposition",
      name: "Heavy Light Decomposition",
      category: "Trees",
      description: "Decompose a tree into O(log n) chains, enabling O(log² n) path queries using a segment tree.",
      prerequisites: ["tree-queries", "euler-tour", "lca", "segment-tree"],
      unlocks: ["centroid-decomposition"]
    },
    {
      id: "centroid-decomposition",
      name: "Centroid Decomposition",
      category: "Trees",
      description: "Recursively decompose a tree by centroids to solve path queries in O(n log n) — particularly useful for distance problems.",
      prerequisites: ["heavy-light-decomposition", "tree-queries"],
      unlocks: ["virtual-tree"]
    },
    {
      id: "virtual-tree",
      name: "Virtual Tree",
      category: "Trees",
      description: "Build a compressed tree containing only key nodes and their LCAs — reduces complex multi-query tree problems to smaller instances.",
      prerequisites: ["centroid-decomposition", "lca"],
      unlocks: []
    },

    // ─── MATCHING AND FLOW ──────────────────────────────────────────
    {
      id: "matching",
      name: "Matching",
      category: "Matching And Flow",
      description: "Finding a maximum set of edges with no shared endpoints — bipartite and general matching.",
      prerequisites: ["bipartite-graph"],
      unlocks: ["kuhn-algorithm", "hopcroft-karp"]
    },
    {
      id: "kuhn-algorithm",
      name: "Kuhn Algorithm",
      category: "Matching And Flow",
      description: "Augmenting-path based maximum bipartite matching in O(VE) via repeated DFS.",
      prerequisites: ["matching"],
      unlocks: ["hopcroft-karp"]
    },
    {
      id: "hopcroft-karp",
      name: "Hopcroft Karp",
      category: "Matching And Flow",
      description: "Maximum bipartite matching in O(E √V) by finding maximal sets of augmenting paths via BFS layering + DFS.",
      prerequisites: ["kuhn-algorithm"],
      unlocks: []
    },
    {
      id: "network-flow",
      name: "Network Flow",
      category: "Matching And Flow",
      description: "Model problems as maximum flow in a capacity network — includes min-cut, bipartite matching, and circulation.",
      prerequisites: ["graph-basics", "bfs"],
      unlocks: ["ford-fulkerson", "edmond-karp", "dinic", "min-cost-max-flow"]
    },
    {
      id: "ford-fulkerson",
      name: "Ford Fulkerson",
      category: "Matching And Flow",
      description: "Augmenting-path max-flow algorithm using DFS — pseudopolynomial runtime, but introduces residual graph concept.",
      prerequisites: ["network-flow"],
      unlocks: ["edmond-karp"]
    },
    {
      id: "edmond-karp",
      name: "Edmond Karp",
      category: "Matching And Flow",
      description: "BFS-based Ford-Fulkerson with O(VE²) guarantee — finds shortest augmenting paths each iteration.",
      prerequisites: ["ford-fulkerson"],
      unlocks: ["dinic"]
    },
    {
      id: "dinic",
      name: "Dinic",
      category: "Matching And Flow",
      description: "Layered network flow algorithm running in O(V² E) — the standard choice for competitive programming max-flow.",
      prerequisites: ["edmond-karp"],
      unlocks: ["min-cost-max-flow"]
    },
    {
      id: "min-cost-max-flow",
      name: "Min Cost Max Flow",
      category: "Matching And Flow",
      description: "Find maximum flow with minimum total cost using shortest-path augmentation (SPFA or Bellman-Ford on residual graph).",
      prerequisites: ["dinic", "bellman-ford"],
      unlocks: []
    },

    // ─── ADVANCED ALGORITHMS ────────────────────────────────────────
    {
      id: "mos-algorithm",
      name: "Mo's Algorithm",
      category: "Advanced Algorithms",
      description: "Answer offline range queries in O((n + q) √n) by sorting queries on a space-filling curve to minimize pointer movement.",
      prerequisites: ["sqrt-decomposition", "offline-queries", "sliding-window"],
      unlocks: ["mos-on-trees"]
    },
    {
      id: "mos-on-trees",
      name: "Mo's On Trees",
      category: "Advanced Algorithms",
      description: "Extend Mo's algorithm to path queries on trees using Euler tour flattening.",
      prerequisites: ["mos-algorithm", "euler-tour"],
      unlocks: []
    },
    {
      id: "convex-hull-trick",
      name: "Convex Hull Trick",
      category: "Advanced Algorithms",
      description: "Optimize DP transitions of the form dp[i] = min(a[j]*x[i] + b[j]) by maintaining a lower convex hull of lines.",
      prerequisites: ["monotonic-stack", "ternary-search", "dp-optimizations"],
      unlocks: ["convex-hull-dp"]
    },
    {
      id: "fft",
      name: "FFT",
      category: "Advanced Algorithms",
      description: "Fast Fourier Transform for O(n log n) polynomial multiplication — used in string convolution, subset sum counting, and signal processing.",
      prerequisites: ["mathematics-fundamentals", "modular-arithmetic"],
      unlocks: []
    },
    {
      id: "matrix-exponentiation",
      name: "Matrix Exponentiation",
      category: "Advanced Algorithms",
      description: "Compute the n-th term of a linear recurrence in O(k³ log n) by exponentiating the transition matrix.",
      prerequisites: ["fast-exponentiation", "dynamic-programming"],
      unlocks: []
    },
    {
      id: "randomization",
      name: "Randomization",
      category: "Advanced Algorithms",
      description: "Randomized algorithms and data structures — random hashing, random pivots, and probabilistic proofs of correctness.",
      prerequisites: ["basic-probability"],
      unlocks: []
    },

    // ─── GAME THEORY ────────────────────────────────────────────────
    {
      id: "game-theory",
      name: "Game Theory",
      category: "Game Theory",
      description: "Combinatorial game theory for two-player perfect-information games: winning/losing positions, strategy stealing.",
      prerequisites: ["bit-manipulation", "mathematics-fundamentals"],
      unlocks: ["nim", "sprague-grundy"]
    },
    {
      id: "nim",
      name: "Nim",
      category: "Game Theory",
      description: "Analyze the classic multi-pile removal game using the XOR (nim-sum) of pile sizes.",
      prerequisites: ["game-theory"],
      unlocks: ["sprague-grundy"]
    },
    {
      id: "sprague-grundy",
      name: "Sprague Grundy",
      category: "Game Theory",
      description: "Assign Grundy values (mex of reachable states) to reduce any impartial game to Nim via the Sprague-Grundy theorem.",
      prerequisites: ["nim"],
      unlocks: []
    },

    // ─── GEOMETRY ───────────────────────────────────────────────────
    {
      id: "geometry-basics",
      name: "Geometry Basics",
      category: "Geometry",
      description: "Points, vectors, dot product, cross product, area of triangle — the primitive operations underlying all computational geometry.",
      prerequisites: ["mathematics-fundamentals"],
      unlocks: ["line-geometry", "circle-geometry", "convex-hull-geometry"]
    },
    {
      id: "line-geometry",
      name: "Line Geometry",
      category: "Geometry",
      description: "Segment intersection, line equations, point-on-segment tests, and geometric predicates using cross products.",
      prerequisites: ["geometry-basics"],
      unlocks: ["convex-hull-geometry"]
    },
    {
      id: "circle-geometry",
      name: "Circle Geometry",
      category: "Geometry",
      description: "Circle-line intersection, circle-circle intersection, circumscribed circle, and area computations.",
      prerequisites: ["geometry-basics"],
      unlocks: []
    },
    {
      id: "convex-hull-geometry",
      name: "Convex Hull",
      category: "Geometry",
      description: "Compute the convex hull of a point set in O(n log n) using Graham scan or Andrew's monotone chain.",
      prerequisites: ["line-geometry", "sorting"],
      unlocks: ["rotating-calipers"]
    },
    {
      id: "rotating-calipers",
      name: "Rotating Calipers",
      category: "Geometry",
      description: "Sweep two parallel lines around a convex hull to find diameter, maximum distance, or closest pair of points in O(n).",
      prerequisites: ["convex-hull-geometry"],
      unlocks: []
    }
  ]
};