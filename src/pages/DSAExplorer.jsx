import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Compass, BookOpen, Layers, GitFork, Milestone, HelpCircle, Award, TrendingUp, CheckCircle, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactFlow, Background, Controls, Handle, Position } from '@xyflow/react';
import { dsaExplorerData } from '../data/dsaExplorerData';
import GlassCard from '../components/GlassCard';
import '@xyflow/react/dist/style.css';

const CustomNode = ({ data }) => {
  const { topic, isCurrent, isUnlock, rating, solved, status, gap, confidence, readiness } = data;

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'strong':
        return { text: '🟢 Strong', color: 'text-emerald-400' };
      case 'medium':
        return { text: '🟡 Average', color: 'text-amber-400' };
      case 'weak':
        return { text: '🔴 Weak', color: 'text-rose-400' };
      default:
        return { text: '⚪ Unknown', color: 'text-slate-500' };
    }
  };

  const statusInfo = getStatusDisplay(status);

  const getBorderAndGlowClasses = () => {
    if (isCurrent) {
      return 'border-[3px] border-emerald-500 shadow-[0_0_35px_rgba(139,92,246,0.6)] bg-emerald-950/40 scale-110 w-[240px] z-50';
    }
    
    switch (status) {
      case 'strong':
        return 'border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:border-emerald-500/80 bg-slate-950/90 w-[220px]';
      case 'medium':
        return 'border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:border-amber-500/80 bg-slate-950/90 w-[220px]';
      case 'weak':
        return 'border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.25)] hover:border-rose-500/80 bg-slate-950/90 w-[220px]';
      default:
        return 'border-white/[0.08] hover:border-slate-500/50 bg-slate-950/90 w-[220px]';
    }
  };

  return (
    <div className={`p-4 rounded-xl border text-left transition-all duration-300 ${getBorderAndGlowClasses()}`}>
      {/* Input Handle for prerequisites */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ background: isCurrent ? '#a78bfa' : '#475569', width: 8, height: 8 }}
      />

      <div className="space-y-1.5 pointer-events-none text-[11px]">
        {isCurrent && (
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-[9px] uppercase tracking-wider mb-1">
            <span>🔥 Current Topic</span>
          </div>
        )}
        <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold leading-none">
          {topic.category}
        </div>
        <div className="text-xs font-bold text-white truncate">
          {topic.name}
        </div>
        
        <div className="h-px bg-white/[0.06] my-1" />
        
        <div className="space-y-1 text-slate-400 font-medium">
          <div className="flex justify-between">
            <span>Topic Rating:</span>
            <span className="text-white font-semibold font-mono">{status === 'unknown' ? 'Not Yet Rated' : rating}</span>
          </div>
          <div className="flex justify-between">
            <span>Solved:</span>
            <span className="text-white font-semibold font-mono">{solved}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Status:</span>
            <span className={`font-bold ${statusInfo.color}`}>{statusInfo.text}</span>
          </div>
          <div className="flex justify-between">
            <span>Gap:</span>
            <span className={`font-semibold font-mono ${gap === null ? 'text-slate-500' : gap >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {gap === null ? '--' : gap >= 0 ? `+${gap}` : gap}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Confidence:</span>
            <span className={`font-semibold ${confidence === 'High' ? 'text-emerald-400' : confidence === 'Medium' ? 'text-amber-400' : 'text-rose-400'}`}>
              {confidence}
            </span>
          </div>
        </div>

        {isUnlock && readiness !== undefined && (
          <div className="pt-1.5 mt-1.5 border-t border-t-white/[0.06] flex justify-between items-center text-[10px] text-emerald-400 font-semibold">
            <span>Readiness:</span>
            <span>{readiness}%</span>
          </div>
        )}
      </div>

      {/* Output Handle for dependents */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ background: isCurrent ? '#a78bfa' : '#475569', width: 8, height: 8 }}
      />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode
};


const DSAExplorer = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const resultsRef = useRef(null);

  const topics = dsaExplorerData.topics;
  const userRating = data?.overallUserStats?.currentRating || 0;

  // Map dsaExplorerData topic IDs to Codeforces tags dynamically
  const getCfTagsForTopic = (topicId) => {
    const mapping = {
      // Fundamentals
      "programming-basics": ["implementation", "brute force"],
      "complexity-analysis": ["implementation"],
      "bit-manipulation": ["bitmasks"],
      "mathematics-fundamentals": ["math"],
      "gcd-lcm": ["number theory", "math"],
      "number-theory": ["number theory", "math"],
      "modular-arithmetic": ["math", "number theory"],
      "basic-probability": ["probabilities", "math"],
      "ncr": ["combinatorics", "math"],

      // Arrays
      "arrays": ["data structures", "implementation"],
      "prefix-sum": ["data structures", "implementation"],
      "difference-array": ["data structures"],
      "2d-prefix-sum": ["data structures", "implementation"],
      "range-queries": ["data structures"],
      "coordinate-compression": ["sortings", "data structures"],
      "offline-queries": ["sortings", "data structures"],

      // Sorting
      "sorting": ["sortings"],
      "custom-sorting": ["sortings"],

      // Searching
      "binary-search": ["binary search"],
      "binary-search-on-answer": ["binary search"],
      "parallel-binary-search": ["binary search"],
      "ternary-search": ["ternary search"],

      // Pointers
      "two-pointers": ["two pointers"],
      "sliding-window": ["two pointers"],
      "meet-in-the-middle": ["meet-in-the-middle", "brute force"],

      // Greedy
      "observation": ["math", "greedy"],
      "greedy": ["greedy"],
      "constructive-algorithms": ["constructive algorithms"],
      "scheduling": ["greedy"],
      "interval-problems": ["greedy", "sortings"],
      "exchange-arguments": ["greedy"],
      "priority-queue-greedy": ["greedy", "data structures"],

      // Math & Number Theory (advanced)
      "combinatorics": ["combinatorics"],
      "probability-expectation": ["probabilities", "math"],
      "inclusion-exclusion": ["combinatorics", "math"],
      "matrix-exponentiation": ["matrices", "math"],

      // Divide & Conquer
      "divide-and-conquer": ["divide and conquer"],

      // Recursion & Backtracking
      "recursion": ["dfs and similar", "brute force"],
      "backtracking": ["dfs and similar", "brute force"],

      // Dynamic Programming
      "memoization": ["dp"],
      "dynamic-programming": ["dp"],
      "knapsack": ["dp"],
      "digit-dp": ["dp"],
      "dp-on-trees": ["dp", "trees", "dfs and similar"],
      "bitmask-dp": ["bitmasks", "dp"],
      "range-dp": ["dp"],
      "probability-dp": ["dp", "probabilities"],
      "convex-hull-trick": ["dp", "geometry"],
      "sos-dp": ["bitmasks", "dp"],

      // Strings
      "string-basics": ["strings"],
      "string-matching": ["strings"],
      "kmp": ["strings"],
      "z-algorithm": ["strings"],
      "rabin-karp": ["strings", "hashing"],
      "string-hashing": ["strings", "hashing"],
      "trie": ["data structures", "strings"],
      "binary-trie": ["data structures", "bitmasks"],
      "suffix-array": ["string suffix structures"],
      "suffix-automaton": ["string suffix structures"],
      "aho-corasick": ["strings"],

      // Graphs
      "graphs-basics": ["graphs"],
      "dfs": ["dfs and similar", "graphs"],
      "bfs": ["graphs"],
      "connected-components": ["graphs", "dfs and similar"],
      "flood-fill": ["dfs and similar", "graphs"],
      "topo-sort": ["graphs"],
      "cycle-detection": ["graphs", "dfs and similar"],
      "dijkstra": ["shortest paths", "graphs"],
      "bellman-ford": ["shortest paths", "graphs"],
      "floyd-warshall": ["shortest paths", "graphs"],
      "kruskal": ["graphs"],
      "prim": ["graphs"],
      "trees": ["trees", "graphs"],
      "tree-diameter": ["trees", "graphs", "dfs and similar"],
      "lca": ["trees", "graphs"],
      "tree-queries": ["trees", "graphs", "data structures"],
      "centroid-decomposition": ["trees", "graphs", "divide and conquer"],
      "heavy-light-decomposition": ["trees", "graphs", "data structures"],

      // Data Structures
      "stacks": ["data structures"],
      "queues": ["data structures"],
      "priority-queues": ["data structures"],
      "dsu": ["dsu", "data structures"],
      "sparse-table": ["data structures"],
      "fenwick-tree": ["data structures"],
      "segment-tree": ["data structures"],
      "lazy-propagation": ["data structures"],
      "treap": ["data structures"],
      "splay-tree": ["data structures"],
      "sqrt-decomposition": ["data structures"],
      "mo-algorithm": ["data structures"],

      // Game Theory
      "game-theory": ["games"],
      "nim-games": ["games"],
      "sg-theorem": ["games"],

      // Geometry
      "geometry-basics": ["geometry"],
      "convex-hull": ["geometry"],
      "sweep-line": ["geometry", "sortings"],

      // Advanced Graphs
      "flows": ["flows", "graphs"],
      "min-cut": ["flows", "graphs"],
      "mcmf": ["flows", "graphs"],
      "bipartite-matching": ["graph matchings", "graphs"],
      "fft": ["fft", "math"]
    };
    return mapping[topicId] || [];
  };

  const getTopicRating = (topicId) => {
    const tags = getCfTagsForTopic(topicId);
    if (!tags || tags.length === 0) return 0;
    
    const analyticsList = data?.cfTagsAnalytics || [];
    let sum = 0;
    let count = 0;
    
    tags.forEach(t => {
      const match = analyticsList.find(a => a.tag === t.toLowerCase());
      if (match && match.topicRating > 0) {
        sum += match.topicRating;
        count++;
      }
    });
    
    return count > 0 ? Math.round(sum / count) : 0;
  };

  const getTopicRatingColor = (rating) => {
    if (!rating) return 'text-slate-400';
    if (rating < 1200) return 'text-slate-400';
    if (rating < 1400) return 'text-green-400';
    if (rating < 1600) return 'text-cyan-400';
    if (rating < 1900) return 'text-blue-400';
    if (rating < 2200) return 'text-teal-400';
    return 'text-rose-400';
  };

  const buildPrereqChain = (topicId) => {
    const chain = [];
    const visited = new Set();
    
    const visit = (id) => {
      if (visited.has(id)) return;
      visited.add(id);
      
      const topic = topics.find(t => t.id === id);
      if (!topic) return;
      
      if (topic.prerequisites) {
        topic.prerequisites.forEach(pId => visit(pId));
      }
      
      chain.push(topic);
    };
    
    const selected = topics.find(t => t.id === topicId);
    if (selected) {
      if (selected.prerequisites) {
        selected.prerequisites.forEach(pId => visit(pId));
      }
      chain.push(selected);
    }
    
    return chain;
  };

  // Readiness Score target rating logic
  const getTargetRating = (topic) => {
    const category = topic.category;
    switch (category) {
      case "Fundamentals":
        return 800;
      case "Arrays":
      case "Sorting":
      case "Searching":
      case "Pointers":
        return 1000;
      case "Greedy":
      case "Strings":
      case "Recursion & Backtracking":
        return 1200;
      case "Data Structures":
      case "Dynamic Programming":
      case "Graphs":
        return 1400;
      case "Math & Number Theory":
      case "Combinatorics & Probability":
      case "Game Theory":
        return 1500;
      default:
        return 1600;
    }
  };

  const getTopicSolvedProblems = (topicId) => {
    const tags = getCfTagsForTopic(topicId);
    if (!tags || tags.length === 0) return [];
    
    const analyticsList = data?.cfTagsAnalytics || [];
    const solvedSet = new Set();
    const problems = [];
    
    tags.forEach(t => {
      const match = analyticsList.find(a => a.tag === t.toLowerCase());
      if (match && match.problems) {
        match.problems.forEach(prob => {
          if (prob.solved) {
            const key = `${prob.contestId}-${prob.index}`;
            if (!solvedSet.has(key)) {
              solvedSet.add(key);
              problems.push(prob);
            }
          }
        });
      }
    });
    
    return problems;
  };

  const getTopicSolvedCount = (topicId) => {
    return getTopicSolvedProblems(topicId).length;
  };

  const getTopicAttemptedProblems = (topicId) => {
    const tags = getCfTagsForTopic(topicId);
    if (!tags || tags.length === 0) return [];
    
    const analyticsList = data?.cfTagsAnalytics || [];
    const attemptedSet = new Set();
    const problems = [];
    
    tags.forEach(t => {
      const match = analyticsList.find(a => a.tag === t.toLowerCase());
      if (match && match.problems) {
        match.problems.forEach(prob => {
          const key = `${prob.contestId}-${prob.index}`;
          if (!attemptedSet.has(key)) {
            attemptedSet.add(key);
            problems.push(prob);
          }
        });
      }
    });
    
    return problems;
  };

  const getTopicAttemptedCount = (topicId) => {
    return getTopicAttemptedProblems(topicId).length;
  };

  const getTopicConfidence = (topicId) => {
    const solved = getTopicSolvedCount(topicId);
    if (solved === 0) return 'Low';
    if (solved <= 3) return 'Low';
    if (solved <= 10) return 'Medium';
    return 'High';
  };

  // Calculate completion percentage of a single prerequisite topic
  const getTopicCompletion = (topicId) => {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return 0;
    const rating = getTopicRating(topicId);
    if (rating === 0) return 0;
    const target = getTargetRating(topic);
    return Math.min(1.0, rating / target);
  };

  // Readiness score formula
  const getReadinessScore = (topic) => {
    // prerequisiteCompletion
    let prereqCompletion = 1.0;
    if (topic.prerequisites && topic.prerequisites.length > 0) {
      const solvedPrereqs = topic.prerequisites.filter(pId => getTopicSolvedCount(pId) > 0).length;
      prereqCompletion = solvedPrereqs / topic.prerequisites.length;
    }

    // prerequisiteStrength
    let prereqStrength = 1.0;
    if (topic.prerequisites && topic.prerequisites.length > 0) {
      const sumStrength = topic.prerequisites.reduce((sum, pId) => sum + getTopicCompletion(pId), 0);
      prereqStrength = sumStrength / topic.prerequisites.length;
    }

    // topicExposure
    const solvedCount = getTopicSolvedCount(topic.id);
    let topicExposure = 0;
    if (solvedCount >= 5) {
      topicExposure = 1.0;
    } else if (solvedCount > 0) {
      topicExposure = 0.5;
    }

    return 0.5 * prereqCompletion + 0.3 * prereqStrength + 0.2 * topicExposure;
  };

  // Determine if a topic is unlocked
  const isTopicUnlocked = (topic) => {
    if (!topic.prerequisites || topic.prerequisites.length === 0) {
      return true; // No prerequisites means always unlocked
    }
    // A topic is unlocked if all of its direct prerequisites have a baseline completion (e.g. >= 40%)
    return topic.prerequisites.every(pId => getTopicCompletion(pId) >= 0.40);
  };

  const getReadinessStatus = (score) => {
    if (score >= 0.85) return { text: "Ready", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10" };
    if (score >= 0.50) return { text: "Almost Ready", color: "text-amber-400 border-amber-500/20 bg-amber-500/10" };
    return { text: "Not Ready", color: "text-rose-400 border-rose-500/20 bg-rose-500/10" };
  };

  const getReadinessDisplay = (topic) => {
    if (!isTopicUnlocked(topic)) {
      return { text: "Locked", color: "text-slate-500 border-white/[0.04] bg-slate-900" };
    }
    const score = getReadinessScore(topic);
    return getReadinessStatus(score);
  };

  // Recommendation engine based on readiness score, ratings, and structure
  const getRecommendations = () => {
    // 1. Best Next Topic: unlocked, incomplete (< 80% completion), sorted by highest readiness then unlocks
    const nextCandidates = topics.filter(t => isTopicUnlocked(t) && getTopicCompletion(t.id) < 0.8);
    let bestNextTopic = null;
    if (nextCandidates.length > 0) {
      bestNextTopic = [...nextCandidates].sort((a, b) => {
        const readA = getReadinessScore(a);
        const readB = getReadinessScore(b);
        if (Math.abs(readA - readB) > 0.01) return readB - readA;
        const unlocksA = a.unlocks?.length || 0;
        const unlocksB = b.unlocks?.length || 0;
        if (unlocksA !== unlocksB) return unlocksB - unlocksA;
        return getTargetRating(a) - getTargetRating(b);
      })[0];
    }

    // 2. Highest Priority Topic: incomplete, sorted by priority score = readiness * (unlocks + 1) * rating gap
    let highestPriorityTopic = null;
    const priorityCandidates = topics.filter(t => getTopicCompletion(t.id) < 0.8);
    if (priorityCandidates.length > 0) {
      highestPriorityTopic = [...priorityCandidates].sort((a, b) => {
        const readinessA = getReadinessScore(a);
        const readinessB = getReadinessScore(b);
        const unlocksA = a.unlocks?.length || 0;
        const unlocksB = b.unlocks?.length || 0;
        const ratingGapA = Math.max(0, getTargetRating(a) - getTopicRating(a.id));
        const ratingGapB = Math.max(0, getTargetRating(b) - getTopicRating(b.id));
        const scoreA = readinessA * (unlocksA + 1) * ratingGapA;
        const scoreB = readinessB * (unlocksB + 1) * ratingGapB;
        return scoreB - scoreA;
      })[0];
    }

    // 3. Weakest Prerequisite: direct prereq of active topic (or highest priority topic if none active) with lowest completion
    let weakestPrereq = null;
    const targetTopicForPrereq = selectedTopic || highestPriorityTopic;
    if (targetTopicForPrereq && targetTopicForPrereq.prerequisites && targetTopicForPrereq.prerequisites.length > 0) {
      weakestPrereq = targetTopicForPrereq.prerequisites
        .map(pId => topics.find(t => t.id === pId))
        .filter(Boolean)
        .sort((a, b) => getTopicCompletion(a.id) - getTopicCompletion(b.id))[0];
    }

    return {
      bestNextTopic,
      highestPriorityTopic,
      weakestPrereq,
      targetTopicForPrereq
    };
  };

  const renderRecommendations = () => {
    const { bestNextTopic, highestPriorityTopic, weakestPrereq, targetTopicForPrereq } = getRecommendations();
    if (!bestNextTopic && !highestPriorityTopic) return null;

    return (
      <div className="space-y-4 pt-6">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Compass className="h-4 w-4 text-emerald-400" />
          <span>Syllabus Recommendations</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bestNextTopic && (
            <div 
              onClick={() => handleSelectTopic(bestNextTopic)}
              className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.02] cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500">Best Next Topic</span>
                  <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border ${getReadinessDisplay(bestNextTopic).color}`}>
                    {getReadinessDisplay(bestNextTopic).text}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {bestNextTopic.name}
                </h4>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Prerequisites are {Math.round(getReadinessScore(bestNextTopic) * 100)}% complete. Ready to learn next.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                <span>{bestNextTopic.category}</span>
                <span className="text-emerald-400 group-hover:underline">Start →</span>
              </div>
            </div>
          )}

          {highestPriorityTopic && (
            <div 
              onClick={() => handleSelectTopic(highestPriorityTopic)}
              className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.02] cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500">Highest Priority</span>
                  <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border ${getReadinessDisplay(highestPriorityTopic).color}`}>
                    {getReadinessDisplay(highestPriorityTopic).text}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {highestPriorityTopic.name}
                </h4>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Unlocks {highestPriorityTopic.unlocks?.length || 0} topics. Target Elo is {getTargetRating(highestPriorityTopic)}.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                <span>{highestPriorityTopic.category}</span>
                <span className="text-emerald-400 group-hover:underline">Focus →</span>
              </div>
            </div>
          )}

          {weakestPrereq ? (
            <div 
              onClick={() => handleSelectTopic(weakestPrereq)}
              className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.02] cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500">
                    Weakest Prereq {targetTopicForPrereq === selectedTopic ? "(Active)" : ""}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-white/[0.04]">
                    {Math.round(getTopicCompletion(weakestPrereq.id) * 100)}% Mastered
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {weakestPrereq.name}
                </h4>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Weakest prerequisite of {targetTopicForPrereq.name}. Brush up here to improve readiness.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                <span>Rating: {getTopicRating(weakestPrereq.id) || 'N/A'}</span>
                <span className="text-emerald-400 group-hover:underline">Review →</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.06] border-dashed flex flex-col items-center justify-center text-center text-slate-500">
              <HelpCircle className="h-5 w-5 mb-1.5 text-slate-600" />
              <h4 className="text-xs font-bold text-slate-400">All Prereqs Solid</h4>
              <p className="text-[10px] leading-normal max-w-[200px] mt-0.5">
                {selectedTopic ? "No missing prerequisites for the selected topic." : "Select a topic to analyze prerequisites."}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Sync state with URL topic search parameter E.g., /dsa-explorer?topic=recursion
  useEffect(() => {
    const topicId = searchParams.get('topic');
    if (topicId) {
      const match = topics.find(t => t.id === topicId);
      if (match) {
        setSelectedTopic(match);
        setSearchQuery(match.name);
      }
    } else {
      setSelectedTopic(null);
      setSearchQuery('');
    }
  }, [searchParams, topics]);

  // Click outside to close suggestion dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter topics based on search text (matching name or category)
  const filteredSuggestions = searchQuery.trim()
    ? topics.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setSearchQuery(topic.name);
    setShowSuggestions(false);
    setSearchParams({ topic: topic.id });

    // Smooth scroll down to details
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const getTopicNameById = (id) => {
    const match = topics.find(t => t.id === id);
    return match ? match.name : id;
  };

  const getTopicStatus = (topicId) => {
    const solved = getTopicSolvedCount(topicId);
    if (solved === 0) return 'unknown';
    
    const r = getTopicRating(topicId);
    if (r >= userRating) return 'strong';
    if (r >= userRating - 200) return 'medium';
    return 'weak';
  };

  const getInsights = (topicId) => {
    const chain = buildPrereqChain(topicId).filter(t => t.id !== topicId);
    
    const weakestPrereq = chain.length > 0
      ? [...chain].sort((a, b) => getTopicCompletion(a.id) - getTopicCompletion(b.id))[0]
      : null;

    const strongestPrereq = chain.length > 0
      ? [...chain].sort((a, b) => getTopicCompletion(b.id) - getTopicCompletion(a.id))[0]
      : null;

    const selectedTopicObj = topics.find(t => t.id === topicId);
    let bestNextTopic = null;
    if (selectedTopicObj && selectedTopicObj.unlocks) {
      const unlockTopics = selectedTopicObj.unlocks
        .map(uId => topics.find(t => t.id === uId))
        .filter(Boolean);
      if (unlockTopics.length > 0) {
        bestNextTopic = [...unlockTopics].sort((a, b) => getReadinessScore(b) - getReadinessScore(a))[0];
      }
    }

    let biggestSkillGap = null;
    if (chain.length > 0) {
      biggestSkillGap = [...chain].sort((a, b) => getTopicRating(a.id) - getTopicRating(b.id))[0];
    }

    return {
      weakestPrereq,
      strongestPrereq,
      bestNextTopic,
      biggestSkillGap
    };
  };

  const getGraphData = () => {
    if (!selectedTopic) {
      return { nodes: [], edges: [] };
    }

    // Collect all recursive prerequisites
    const prereqChain = buildPrereqChain(selectedTopic.id);
    const prereqList = prereqChain.filter(t => t.id !== selectedTopic.id);

    // Collect immediate unlocked topics
    const unlockList = (selectedTopic.unlocks || [])
      .map(uId => topics.find(t => t.id === uId))
      .filter(Boolean);

    // Calculate longest path level for each prerequisite node
    const levels = {};
    const getLevel = (id) => {
      if (id in levels) return levels[id];
      const topic = topics.find(t => t.id === id);
      if (!topic || topic.id === selectedTopic.id || !topic.prerequisites || topic.prerequisites.length === 0) {
        levels[id] = 0;
        return 0;
      }
      const inChainPrereqs = topic.prerequisites.filter(pId => prereqList.some(p => p.id === pId));
      if (inChainPrereqs.length === 0) {
        levels[id] = 0;
        return 0;
      }
      const maxParentLevel = Math.max(...inChainPrereqs.map(pId => getLevel(pId)));
      levels[id] = maxParentLevel + 1;
      return levels[id];
    };

    // Initialize columns map: level -> array of topics
    const columns = {};
    const addToColumn = (level, topic) => {
      if (!columns[level]) {
        columns[level] = [];
      }
      if (!columns[level].some(t => t.id === topic.id)) {
        columns[level].push(topic);
      }
    };

    // Assign prerequisites to columns based on level
    prereqList.forEach(topic => {
      const lvl = getLevel(topic.id);
      addToColumn(lvl, topic);
    });

    // Find the max level of prerequisites
    const prereqLevels = prereqList.map(t => getLevel(t.id));
    const maxPrereqLevel = prereqLevels.length > 0 ? Math.max(...prereqLevels) : -1;

    // Selected topic is placed at level maxPrereqLevel + 1
    const activeLevel = maxPrereqLevel + 1;
    addToColumn(activeLevel, selectedTopic);

    // Unlocked topics are placed at level maxPrereqLevel + 2
    const unlockLevel = maxPrereqLevel + 2;
    unlockList.forEach(topic => {
      addToColumn(unlockLevel, topic);
    });

    const nodes = [];
    // Generate React Flow nodes with positions
    Object.keys(columns).forEach(lvlStr => {
      const lvl = parseInt(lvlStr);
      const topicsInCol = columns[lvl];
      const count = topicsInCol.length;
      topicsInCol.forEach((topic, index) => {
        const x = lvl * 360;
        const y = (index - (count - 1) / 2) * 190;

        const rating = getTopicRating(topic.id);
        const solved = getTopicSolvedCount(topic.id);
        const status = getTopicStatus(topic.id);
        const gap = status === 'unknown' ? null : rating - userRating;
        const confidence = getTopicConfidence(topic.id);

        nodes.push({
          id: topic.id,
          type: 'custom',
          position: { x, y },
          data: {
            topic,
            isCurrent: topic.id === selectedTopic.id,
            isUnlock: unlockList.some(u => u.id === topic.id),
            rating,
            solved,
            status,
            gap,
            confidence,
            readiness: unlockList.some(u => u.id === topic.id) ? Math.round(getReadinessScore(topic) * 100) : undefined
          }
        });
      });
    });

    // Generate React Flow edges
    const edges = [];
    const nodeIds = new Set(nodes.map(n => n.id));

    nodes.forEach(n => {
      const topic = topics.find(t => t.id === n.id);
      if (topic && topic.prerequisites) {
        topic.prerequisites.forEach(pId => {
          if (nodeIds.has(pId)) {
            const isCurrentPath = pId === selectedTopic.id || n.id === selectedTopic.id;
            edges.push({
              id: `${pId}-${n.id}`,
              source: pId,
              target: n.id,
              type: 'smoothstep',
              animated: isCurrentPath,
              style: {
                stroke: isCurrentPath ? '#a78bfa' : '#334155',
                strokeWidth: isCurrentPath ? 2.5 : 1.5,
                opacity: isCurrentPath ? 1 : 0.6
              }
            });
          }
        });
      }
    });

    return { nodes, edges };
  };

  const onNodeClick = (event, node) => {
    const topic = topics.find(t => t.id === node.id);
    if (topic) {
      handleSelectTopic(topic);
    }
  };

  const { nodes, edges } = getGraphData();

  return (
    <div className="space-y-8 max-w-5xl mx-auto w-full px-6 py-12 text-slate-100 min-h-screen">
      {/* Hero Header Section */}
      <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Compass className="h-3.5 w-3.5 animate-spin-slow" />
          <span>Curriculum Syllabus Explorer</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-none font-display">
          Master Your Next Topic
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Explore prerequisites, learning paths, and your current mastery level. Find the logical steps to level up your competitive programming skills.
        </p>
      </div>

      {/* Search Console */}
      <div className="max-w-xl mx-auto relative z-30" ref={suggestionsRef}>
        <div className="relative flex items-center p-1.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl focus-within:border-emerald-500/50 focus-within:shadow-[0_0_30px_-5px_rgba(124,58,237,0.2)] transition-all duration-300">
          <Search className="h-5 w-5 text-slate-500 ml-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search e.g. DP, Prefix Sum, Dijkstra, Segment Tree..."
            className="flex-1 bg-transparent px-3 py-3 text-white placeholder-slate-500 outline-none text-sm font-medium font-sans"
          />
          {searchQuery && (
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedTopic(null);
                setSearchParams({});
              }}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"
            >
              Clear
            </button>
          )}
        </div>

        {/* Suggestion Dropdown */}
        <AnimatePresence>
          {showSuggestions && filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 right-0 mt-2 bg-slate-950/95 border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl max-h-60 overflow-y-auto"
            >
              {filteredSuggestions.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic)}
                  className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-white/[0.04] transition-colors border-b border-white/[0.04] last:border-b-0"
                >
                  <div>
                    <div className="text-xs font-semibold text-white">{topic.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{topic.category}</div>
                  </div>
                  <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border ${
                    getReadinessDisplay(topic).color
                  }`}>
                    {getReadinessDisplay(topic).text}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recommendation Panel */}
      {renderRecommendations()}

      {/* Selection Details Display Panel */}
      <div ref={resultsRef} className="pt-8">
        <AnimatePresence mode="wait">
          {selectedTopic ? (
            <motion.div
              key={selectedTopic.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Main Topic Detail Card */}
              <GlassCard className="border-l-4 border-l-emerald-500 p-6 flex flex-col md:flex-row gap-6 items-start">
                <div className="h-12 w-12 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="space-y-3 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-slate-900 border border-white/[0.04] px-2.5 py-0.5 rounded-full">
                      {selectedTopic.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight leading-tight font-display">
                    {selectedTopic.name}
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
                    {selectedTopic.description}
                  </p>
                  
                  {/* Topic, User Ratings, and Readiness */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center space-x-2 bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-2">
                      <Award className="h-4 w-4 text-emerald-400" />
                      <div>
                        <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider leading-none">Topic Rating</div>
                        <div className={`text-sm font-bold font-mono mt-1 ${getTopicRatingColor(getTopicRating(selectedTopic.id))}`}>
                          {getTopicSolvedCount(selectedTopic.id) === 0 ? 'Not Yet Rated' : getTopicRating(selectedTopic.id)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <div>
                        <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider leading-none">Solved Problems</div>
                        <div className="text-sm font-bold font-mono text-white mt-1">
                          {getTopicSolvedCount(selectedTopic.id)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-2">
                      <HelpCircle className="h-4 w-4 text-amber-400" />
                      <div>
                        <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider leading-none">Confidence</div>
                        <div className={`text-sm font-bold mt-1 ${
                          getTopicConfidence(selectedTopic.id) === 'High' ? 'text-emerald-400' :
                          getTopicConfidence(selectedTopic.id) === 'Medium' ? 'text-amber-400' : 'text-rose-400'
                        }`}>
                          {getTopicConfidence(selectedTopic.id)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-2">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <div>
                        <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider leading-none">User Rating</div>
                        <div className="text-sm font-bold font-mono text-white mt-1">
                          {userRating > 0 ? userRating : 'N/A'}
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-2 border rounded-xl px-4 py-2 ${getReadinessDisplay(selectedTopic).color}`}>
                      <Layers className="h-4 w-4 animate-pulse" />
                      <div>
                        <div className="text-[9px] uppercase font-bold tracking-wider leading-none opacity-60">Readiness</div>
                        <div className="text-sm font-bold mt-1 font-mono">
                          {getReadinessDisplay(selectedTopic).text} ({Math.round(getReadinessScore(selectedTopic) * 100)}%)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Graph and Insights Container */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-4">
                {/* Dependency Graph */}
                <div className="lg:col-span-3 flex flex-col space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Compass className="h-4 w-4 text-emerald-400 animate-pulse" />
                    <span>Interactive Dependency Map</span>
                  </h3>
                  <div className="h-[500px] w-full bg-slate-950/60 rounded-2xl border border-white/[0.08] overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                    <ReactFlow
                      nodes={nodes}
                      edges={edges}
                      nodeTypes={nodeTypes}
                      onNodeClick={onNodeClick}
                      fitView
                      fitViewOptions={{ padding: 0.15 }}
                      minZoom={0.2}
                      maxZoom={1.5}
                      nodesConnectable={false}
                      nodesDraggable={true}
                      zoomOnDoubleClick={false}
                      selectNodesOnDrag={false}
                    >
                      <Background color="#1e293b" gap={20} size={1} />
                      <Controls className="bg-slate-900 border border-white/[0.08] text-white rounded-lg p-1" />
                    </ReactFlow>
                  </div>
                </div>

                {/* Insights Panel */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/[0.06] backdrop-blur-md space-y-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Award className="h-4 w-4 text-emerald-400" />
                      <span>Mentor Insights</span>
                    </h3>
                    
                    <div className="h-px bg-white/[0.06]" />

                    {(() => {
                      const insights = getInsights(selectedTopic.id);
                      return (
                        <div className="space-y-5">
                          {/* Weakest Prerequisite */}
                          <div className="space-y-2">
                            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Weakest Prerequisite</div>
                            {insights.weakestPrereq ? (
                              <div 
                                onClick={() => handleSelectTopic(insights.weakestPrereq)}
                                className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 hover:bg-rose-500/10 cursor-pointer transition-colors group"
                              >
                                <div className="text-xs font-bold text-white group-hover:text-rose-400">{insights.weakestPrereq.name}</div>
                                <p className="text-[10px] text-slate-400 mt-1 leading-normal font-medium">
                                  {insights.weakestPrereq.name} is currently limiting your {selectedTopic.name} progress.
                                </p>
                              </div>
                            ) : (
                              <div className="p-3 rounded-xl bg-slate-900 border border-white/[0.04] text-[10px] text-slate-500 italic">
                                None (this is a fundamental topic).
                              </div>
                            )}
                          </div>

                          {/* Strongest Prerequisite */}
                          <div className="space-y-2">
                            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Strongest Prerequisite</div>
                            {insights.strongestPrereq ? (
                              <div 
                                onClick={() => handleSelectTopic(insights.strongestPrereq)}
                                className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10 cursor-pointer transition-colors group"
                              >
                                <div className="text-xs font-bold text-white group-hover:text-emerald-400">{insights.strongestPrereq.name}</div>
                                <p className="text-[10px] text-slate-400 mt-1 leading-normal font-medium">
                                  Your {insights.strongestPrereq.name} fundamentals are strong enough for {selectedTopic.name}.
                                </p>
                              </div>
                            ) : (
                              <div className="p-3 rounded-xl bg-slate-900 border border-white/[0.04] text-[10px] text-slate-500 italic">
                                None.
                              </div>
                            )}
                          </div>

                          {/* Recommended Next Topic */}
                          <div className="space-y-2">
                            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Recommended Next Topic</div>
                            {insights.bestNextTopic ? (
                              <div 
                                onClick={() => handleSelectTopic(insights.bestNextTopic)}
                                className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10 cursor-pointer transition-colors group"
                              >
                                <div className="text-xs font-bold text-white group-hover:text-emerald-400">{insights.bestNextTopic.name}</div>
                                <p className="text-[10px] text-slate-400 mt-1 leading-normal font-medium">
                                  {insights.bestNextTopic.name} is your most achievable next topic (Readiness: {Math.round(getReadinessScore(insights.bestNextTopic) * 100)}%).
                                </p>
                              </div>
                            ) : (
                              <div className="p-3 rounded-xl bg-slate-900 border border-white/[0.04] text-[10px] text-slate-500 italic">
                                No unlocked target topics found.
                              </div>
                            )}
                          </div>

                          {/* Biggest Skill Gap */}
                          <div className="space-y-2">
                            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Biggest Skill Gap</div>
                            {insights.biggestSkillGap ? (() => {
                              const gapRating = getTopicRating(insights.biggestSkillGap.id);
                              const gapVal = getTopicSolvedCount(insights.biggestSkillGap.id) === 0 ? 'N/A' : gapRating - userRating;
                              const gapText = gapVal === 'N/A' ? 'Not Yet Rated' : `${gapVal >= 0 ? '+' : ''}${gapVal} Elo`;
                              return (
                                <div 
                                  onClick={() => handleSelectTopic(insights.biggestSkillGap)}
                                  className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 hover:bg-rose-500/10 cursor-pointer transition-colors group"
                                >
                                  <div className="text-xs font-bold text-white group-hover:text-rose-400">{insights.biggestSkillGap.name}</div>
                                  <p className="text-[10px] text-slate-400 mt-1 leading-normal font-medium">
                                    Gap: <span className="text-rose-400 font-semibold font-mono">{gapText}</span> relative to your rating. Focused practice here is recommended.
                                  </p>
                                </div>
                              );
                            })() : (
                              <div className="p-3 rounded-xl bg-slate-900 border border-white/[0.04] text-[10px] text-slate-500 italic">
                                None.
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 max-w-sm mx-auto"
            >
              <div className="h-12 w-12 rounded-full bg-slate-900 border border-white/[0.06] flex items-center justify-center text-slate-500 mx-auto mb-4">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-white">No Topic Selected</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Use the search console above to explore the DSA prerequisites, category trees, and unlock dependencies.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DSAExplorer;
