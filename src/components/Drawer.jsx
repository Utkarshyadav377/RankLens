import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, BookOpen, Star, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

const Drawer = ({ isOpen, onClose, topicId, topic, onDeepDive, onLearningPath }) => {
  if (!topic) return null;

  const difficultyColors = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Hard: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  const statusIcons = {
    strong: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
    medium: <HelpCircle className="h-5 w-5 text-amber-400" />,
    weak: <AlertTriangle className="h-5 w-5 text-rose-400" />,
  };

  const statusLabels = {
    strong: 'Strong',
    medium: 'Medium',
    weak: 'Weak',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Sliding panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-950/95 border-l border-white/[0.08] backdrop-blur-2xl z-50 p-6 shadow-2xl overflow-y-auto flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Topic Details</span>
                <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">{topic.name}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/[0.05] text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-6">
              {/* Badges row */}
              <div className="flex flex-wrap gap-2.5">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${difficultyColors[topic.difficulty] || 'bg-slate-800 text-slate-400'}`}>
                  {topic.difficulty}
                </span>
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full border border-emerald-500/20 bg-emerald-600/10 text-emerald-400 flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-emerald-400/20" />
                  Target: {topic.globalAverageRating}
                </span>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-white/[0.01] p-4 rounded-xl border border-white/[0.03]">
                  {topic.description}
                </p>
              </div>

              {/* User Rating and Performance */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Your Skill Analysis</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Estimated Rating</div>
                    <div className="text-xl font-bold text-white mt-1 font-mono">{topic.userStats?.rating || 'N/A'}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Status</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      {statusIcons[topic.userStats?.status]}
                      <span className="text-sm font-semibold text-white">
                        {statusLabels[topic.userStats?.status] || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats overview */}
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Problems Solved / Attempted</span>
                  <span className="text-white font-semibold font-mono">
                    {topic.userStats?.solved} / {topic.userStats?.attempted}
                  </span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-white/[0.04]">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${
                      topic.userStats?.status === 'strong'
                        ? 'from-emerald-500 to-teal-400'
                        : topic.userStats?.status === 'medium'
                        ? 'from-amber-500 to-yellow-400'
                        : 'from-rose-500 to-orange-400'
                    }`}
                    style={{ width: `${(topic.userStats?.solved / (topic.userStats?.attempted || 1)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Success Rate</span>
                  <span className="text-white font-semibold font-mono">
                    {((topic.userStats?.solved / (topic.userStats?.attempted || 1)) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Prerequisites and Next Topics */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Prerequisites</h4>
                  {topic.prerequisites.length > 0 ? (
                    <div className="flex flex-col gap-1.5">
                      {topic.prerequisites.map((p) => (
                        <span key={p} className="text-xs text-slate-300 font-medium capitalize flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-cyan-500" />
                          {p.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 italic">None</span>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Next Steps</h4>
                  {topic.nextTopics.length > 0 ? (
                    <div className="flex flex-col gap-1.5">
                      {topic.nextTopics.map((n) => (
                        <span key={n} className="text-xs text-slate-300 font-medium capitalize flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-emerald-500" />
                          {n.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 italic">Max level achieved</span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-6 border-t border-white/[0.06] mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  onLearningPath(topicId);
                  onClose();
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-sm font-semibold text-white border border-white/[0.06] transition-all hover:border-white/[0.1]"
              >
                <BookOpen className="h-4.5 w-4.5 text-slate-400" />
                <span>Learning Path</span>
              </button>

              <button
                onClick={() => {
                  onDeepDive(topicId);
                  onClose();
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 text-sm font-semibold text-white shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all border border-emerald-500/20 hover:scale-[1.02]"
              >
                <span>Deep Dive</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
