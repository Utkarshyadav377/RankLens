import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Zap, 
  CheckCircle2, 
  TrendingUp, 
  Compass, 
  Info,
  ArrowUpRight
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

const Dashboard = ({ data, onTopicSelect, onLearningPathSelect }) => {
  const { topics, overallUserStats } = data;
  const currentRating = overallUserStats.currentRating;

  // Sorting state for Topic Rankings
  const [sortBy, setSortBy] = React.useState('rating');
  const [sortOrder, setSortOrder] = React.useState('desc');

  // Convert topics object to list
  const topicList = React.useMemo(() => {
    return Object.entries(topics).map(([id, topic]) => {
      const rating = topic.userStats.rating || 0;
      const totalAttempts = topic.userStats.totalAttempts || 0;
      const uniqueSolved = topic.userStats.solved || 0;
      const acceptanceRate = topic.userStats.acceptanceRate || 0;
      return {
        id,
        name: topic.name,
        rating,
        totalAttempts,
        uniqueSolved,
        acceptanceRate,
      };
    });
  }, [topics]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedTopics = React.useMemo(() => {
    const arr = [...topicList];
    arr.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (sortBy === 'name') {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
        if (valA < valB) return sortOrder === 'desc' ? 1 : -1;
        if (valA > valB) return sortOrder === 'desc' ? -1 : 1;
        return 0;
      }
      if (valA < valB) return sortOrder === 'desc' ? 1 : -1;
      if (valA > valB) return sortOrder === 'desc' ? -1 : 1;
      return 0;
    });
    return arr;
  }, [topicList, sortBy, sortOrder]);

  const getTopicRatingColor = (rating) => {
    if (rating < 1200) return 'text-slate-400';
    if (rating < 1400) return 'text-green-400';
    if (rating < 1600) return 'text-cyan-400';
    if (rating < 1900) return 'text-blue-400';
    if (rating < 2200) return 'text-teal-400';
    return 'text-rose-400';
  };

  // Performance Insights calculations
  const insights = React.useMemo(() => {
    const solvedTopics = topicList.filter(t => t.uniqueSolved > 0);
    const attemptedTopics = topicList.filter(t => t.totalAttempts > 0);

    // 1. Highest Rated Topic
    let highestRated = null;
    if (solvedTopics.length > 0) {
      highestRated = solvedTopics.reduce((prev, curr) => (curr.rating > prev.rating) ? curr : prev, solvedTopics[0]);
    }

    // 2. Lowest Rated Topic
    let lowestRated = null;
    if (solvedTopics.length > 0) {
      lowestRated = solvedTopics.reduce((prev, curr) => (curr.rating < prev.rating) ? curr : prev, solvedTopics[0]);
    } else if (topicList.length > 0) {
      lowestRated = topicList[0];
    }

    // 3. Highest Acceptance Rate
    let highestAcceptance = null;
    if (attemptedTopics.length > 0) {
      highestAcceptance = attemptedTopics.reduce((prev, curr) => (curr.acceptanceRate > prev.acceptanceRate) ? curr : prev, attemptedTopics[0]);
    }

    // 4. Lowest Acceptance Rate
    let lowestAcceptance = null;
    if (attemptedTopics.length > 0) {
      lowestAcceptance = attemptedTopics.reduce((prev, curr) => (curr.acceptanceRate < prev.acceptanceRate) ? curr : prev, attemptedTopics[0]);
    }

    // 5. Primary Improvement Area
    let primaryImprovementText = '';
    const strongestRating = highestRated ? highestRated.rating : currentRating;
    const candidatesForLowAcceptance = attemptedTopics.filter(t => t.uniqueSolved >= 5 && t.acceptanceRate < 50);
    
    if (candidatesForLowAcceptance.length > 0) {
      const worstAcceptance = candidatesForLowAcceptance.reduce((prev, curr) => (curr.acceptanceRate < prev.acceptanceRate) ? curr : prev, candidatesForLowAcceptance[0]);
      primaryImprovementText = `Focus on ${worstAcceptance.name}. Large solve volume but low acceptance rate.`;
    } else {
      const candidatesForRatingGap = solvedTopics.filter(t => t.rating < strongestRating);
      if (candidatesForRatingGap.length > 0) {
        const worstGap = candidatesForRatingGap.reduce((prev, curr) => (curr.rating < prev.rating) ? curr : prev, candidatesForRatingGap[0]);
        primaryImprovementText = `Focus on ${worstGap.name}. Topic rating significantly below your strongest topics.`;
      } else if (lowestRated) {
        primaryImprovementText = `Focus on ${lowestRated.name}. Topic rating significantly below your strongest topics.`;
      } else {
        primaryImprovementText = `Focus on DP. Topic rating significantly below your strongest topics.`;
      }
    }

    // 6. Recommended Focus (highest potential rating gain = currentRating - topic.rating)
    let recommendedTopic = null;
    let maxGain = -Infinity;
    topicList.forEach((topic) => {
      const gain = currentRating - topic.rating;
      if (gain > maxGain) {
        maxGain = gain;
        recommendedTopic = topic;
      }
    });

    return {
      highestRated,
      lowestRated,
      highestAcceptance,
      lowestAcceptance,
      primaryImprovementText,
      recommendedTopic,
    };
  }, [topicList, currentRating]);

  // Framer motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 25 } }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full px-6 py-8">
      {/* Dashboard Welcome Header */}
      <div>
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Your Stats</span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1 font-display">Profile Overview</h2>
        <p className="text-sm text-slate-400 mt-1.5 leading-relaxed max-w-2xl">
          Topic ratings and acceptance rates from your submissions. Tap any row for a detailed breakdown.
        </p>
      </div>

      {/* Top Stats Cards (Exactly 3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard hoverGlow={false} className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Award className="h-20 w-20 text-white" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Current Rating</div>
              <div className="text-3xl font-extrabold text-white mt-0.5 font-mono">{overallUserStats.currentRating}</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard hoverGlow={false} className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap className="h-20 w-20 text-white" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-inner">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Max Rating</div>
              <div className="text-3xl font-extrabold text-white mt-0.5 font-mono">{overallUserStats.maxRating}</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard hoverGlow={false} className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <CheckCircle2 className="h-20 w-20 text-white" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Codeforces Rank</div>
              <div className="text-xl font-extrabold text-white mt-0.5 capitalize truncate max-w-[180px] leading-tight">
                {overallUserStats.rank || 'Unrated'}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Peak: <span className="capitalize font-semibold text-slate-400">{overallUserStats.maxRank || 'Unrated'}</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* TOPIC RANKINGS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-4">
          <div>
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <span>Topic Rankings</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Click on any row to open the topic deep dive.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/50 border border-white/[0.04] px-3 py-1.5 rounded-lg text-[10px] text-slate-400 self-start sm:self-auto">
            <Info className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-white">Acceptance Rate:</strong> Unique Solved Problems / Total Attempts
            </span>
          </div>
        </div>

        <GlassCard hoverGlow={false} className="w-full overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/[0.06] bg-slate-900/20 sticky top-0 backdrop-blur z-10 font-mono">
                  <th 
                    className="py-3 px-4 text-slate-400 font-bold uppercase tracking-wider text-[10px] text-left cursor-pointer select-none hover:text-white transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Topic Name</span>
                      <span className="text-[9px] text-slate-500">
                        {sortBy === 'name' ? (sortOrder === 'desc' ? '▼' : '▲') : '⇅'}
                      </span>
                    </div>
                  </th>
                  <th 
                    className="py-3 px-4 text-slate-400 font-bold uppercase tracking-wider text-[10px] text-right cursor-pointer select-none hover:text-white transition-colors"
                    onClick={() => handleSort('rating')}
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Topic Rating</span>
                      <span className="text-[9px] text-slate-500">
                        {sortBy === 'rating' ? (sortOrder === 'desc' ? '▼' : '▲') : '⇅'}
                      </span>
                    </div>
                  </th>
                  <th 
                    className="py-3 px-4 text-slate-400 font-bold uppercase tracking-wider text-[10px] text-right cursor-pointer select-none hover:text-white transition-colors"
                    onClick={() => handleSort('acceptanceRate')}
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Acceptance Rate</span>
                      <span className="text-[9px] text-slate-500">
                        {sortBy === 'acceptanceRate' ? (sortOrder === 'desc' ? '▼' : '▲') : '⇅'}
                      </span>
                    </div>
                  </th>
                  <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider text-[9px] text-right font-sans">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedTopics.map((topic) => {
                  const rating = topic.rating;
                  const rate = topic.acceptanceRate.toFixed(1);

                  return (
                    <tr 
                      key={topic.id} 
                      onClick={() => onTopicSelect(topic.id)}
                      className="border-b border-white/[0.03] hover:bg-white/[0.04] text-slate-300 transition-all cursor-pointer group"
                    >
                      <td className="py-3 px-4 font-sans font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                        {topic.name}
                      </td>
                      <td className={`py-3 px-4 text-right font-mono font-bold ${rating > 0 ? getTopicRatingColor(rating) : 'text-slate-500'}`}>
                        {rating > 0 ? rating : 'Unrated'}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-slate-200">
                        {topic.totalAttempts > 0 ? `${rate}%` : '0.0%'}
                      </td>
                      <td className="py-3 px-4 text-right font-sans">
                        <div className="inline-flex items-center justify-end text-[10px] font-semibold text-slate-500 group-hover:text-emerald-400 transition-colors">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">
                            Deep Dive
                          </span>
                          <ArrowUpRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      {/* PERFORMANCE INSIGHTS */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
          <Compass className="h-5 w-5 text-emerald-400" />
          <span>Performance Insights</span>
        </h3>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Card 1: Highest Rated */}
          <motion.div variants={itemVariants}>
            <GlassCard hoverGlow={true} className="p-5 flex flex-col justify-between h-full min-h-[140px]">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Highest Rated Topic</div>
                <div className="text-xl font-extrabold text-white mt-1">
                  {insights.highestRated ? (
                    <>
                      {insights.highestRated.name}{" "}
                      <span className={`font-mono text-base ${getTopicRatingColor(insights.highestRated.rating)}`}>
                        ({insights.highestRated.rating})
                      </span>
                    </>
                  ) : 'N/A'}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                Your peak capability lies in this domain.
              </div>
            </GlassCard>
          </motion.div>

          {/* Card 2: Lowest Rated */}
          <motion.div variants={itemVariants}>
            <GlassCard hoverGlow={true} className="p-5 flex flex-col justify-between h-full min-h-[140px]">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Lowest Rated Topic</div>
                <div className="text-xl font-extrabold text-white mt-1">
                  {insights.lowestRated ? (
                    <>
                      {insights.lowestRated.name}{" "}
                      <span className={`font-mono text-base ${getTopicRatingColor(insights.lowestRated.rating)}`}>
                        ({insights.lowestRated.rating})
                      </span>
                    </>
                  ) : 'N/A'}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                This area currently estimates below your other skills.
              </div>
            </GlassCard>
          </motion.div>

          {/* Card 3: Highest Acceptance Rate */}
          <motion.div variants={itemVariants}>
            <GlassCard hoverGlow={true} className="p-5 flex flex-col justify-between h-full min-h-[140px]">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Highest Acceptance Rate</div>
                <div className="text-xl font-extrabold text-white mt-1">
                  {insights.highestAcceptance ? (
                    <>
                      {insights.highestAcceptance.name}{" "}
                      <span className="font-mono text-base text-emerald-400">
                        ({insights.highestAcceptance.acceptanceRate.toFixed(0)}%)
                      </span>
                    </>
                  ) : 'N/A'}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                You solve questions in this topic with high accuracy.
              </div>
            </GlassCard>
          </motion.div>

          {/* Card 4: Lowest Acceptance Rate */}
          <motion.div variants={itemVariants}>
            <GlassCard hoverGlow={true} className="p-5 flex flex-col justify-between h-full min-h-[140px]">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Lowest Acceptance Rate</div>
                <div className="text-xl font-extrabold text-white mt-1">
                  {insights.lowestAcceptance ? (
                    <>
                      {insights.lowestAcceptance.name}{" "}
                      <span className="font-mono text-base text-rose-400">
                        ({insights.lowestAcceptance.acceptanceRate.toFixed(0)}%)
                      </span>
                    </>
                  ) : 'N/A'}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                You struggle with accuracy here; focus on finding clean designs.
              </div>
            </GlassCard>
          </motion.div>

          {/* Card 5: Primary Improvement Area */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1">
            <GlassCard hoverGlow={true} className="p-5 flex flex-col justify-between h-full min-h-[140px] border-emerald-500/10 bg-emerald-500/[0.01]">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Primary Improvement Area</div>
                <div className="text-sm font-semibold text-slate-200 mt-2.5 leading-relaxed">
                  {insights.primaryImprovementText}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                Targeting this topic will address your current weak point.
              </div>
            </GlassCard>
          </motion.div>

          {/* Card 6: Recommended Focus */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1">
            <GlassCard hoverGlow={true} className="p-5 flex flex-col justify-between h-full min-h-[140px] border-emerald-500/10 bg-emerald-500/[0.01]">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Recommended Focus</div>
                <div className="text-xl font-extrabold text-white mt-1">
                  Recommended Focus:
                  <div className="text-emerald-400 text-lg mt-0.5">{insights.recommendedTopic ? insights.recommendedTopic.name : 'N/A'}</div>
                </div>
                <div className="text-xs text-slate-300 mt-2 font-medium">
                  Reason:
                  <span className="text-slate-400 font-normal ml-1">Highest potential rating gain.</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
