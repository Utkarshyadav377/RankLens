import React from 'react';
import { 
  ArrowLeft, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Percent 
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import RatingDistribution from '../components/RatingDistribution';

const TopicDeepDive = ({ topicId, data, onBack, onLearningPath }) => {
  const topic = data.topics[topicId];

  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <p className="text-slate-400 mb-4">Topic not found.</p>
        <button onClick={onBack} className="text-emerald-400 hover:underline">
          Go back to Dashboard
        </button>
      </div>
    );
  }

  const getTopicRatingColor = (rating) => {
    if (rating < 1200) return 'text-slate-400';
    if (rating < 1400) return 'text-green-400';
    if (rating < 1600) return 'text-cyan-400';
    if (rating < 1900) return 'text-blue-400';
    if (rating < 2200) return 'text-teal-400';
    return 'text-rose-400';
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full px-6 py-8">
      {/* Back button and page title */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-white/[0.02] border border-white/[0.06] py-2 px-3 rounded-lg w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Header section */}
      <div>
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Topic Analysis</span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1 font-display">{topic.name}</h2>
      </div>

      {/* Stats Cards Row (3 Cards: Attempted, Accepted, Acceptance Rate) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard hoverGlow={false}>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-cyan-600/10 flex items-center justify-center text-cyan-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Total Attempted</div>
              <div className="text-xl font-bold text-white font-mono mt-0.5">
                {topic.userStats.totalAttempts || 0}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard hoverGlow={false}>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-600/10 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Total Accepted</div>
              <div className="text-xl font-bold text-white font-mono mt-0.5">
                {topic.userStats.solved || 0}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard hoverGlow={false}>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-amber-600/10 flex items-center justify-center text-amber-400">
              <Percent className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Acceptance Rate</div>
              <div className="text-xl font-bold text-white font-mono mt-0.5">
                {topic.userStats.totalAttempts > 0 ? `${topic.userStats.acceptanceRate.toFixed(1)}%` : '0.0%'}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Rating Distribution Histogram */}
      <GlassCard hoverGlow={false} className="w-full">
        <div className="mb-6">
          <h3 className="text-base font-bold text-white font-display">Rating Distribution Histogram</h3>
          <p className="text-xs text-slate-500 mt-1">Number of unique problems solved for each Codeforces difficulty bucket.</p>
        </div>
        <RatingDistribution distribution={topic.userStats.distribution} />
      </GlassCard>

      {/* Centered Topic Rating Card */}
      <div className="flex justify-center mt-6">
        <GlassCard hoverGlow={true} className="w-full max-w-md p-8 text-center border-emerald-500/20 bg-emerald-950/[0.01]">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Topic Rating</div>
          <div className={`text-5xl font-extrabold font-mono tracking-tight ${topic.userStats.rating > 0 ? getTopicRatingColor(topic.userStats.rating) : 'text-slate-500'}`}>
            {topic.userStats.rating > 0 ? topic.userStats.rating : 'Not Yet Rated'}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default TopicDeepDive;
