import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, ArrowRight, BarChart3, Route, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { brand } from '../config/brand';

const LandingPage = ({ onVerifyHandle, onCompleteIngestion }) => {
  const [handle, setHandle] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [apiLoading, setApiLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [loadingStep, setLoadingStep] = React.useState(0);

  const steps = [
    'Pulling profile from Codeforces...',
    'Scanning your submission history...',
    'Scoring topics with Elo estimates...',
    'Mapping prerequisite chains...',
    'Preparing your dashboard...',
  ];

  React.useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          }
          clearInterval(interval);
          onCompleteIngestion();
          return prev;
        });
      }, 650);
    }
    return () => clearInterval(interval);
  }, [loading, onCompleteIngestion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handle.trim()) return;

    setError(null);
    setApiLoading(true);

    const result = await onVerifyHandle(handle.trim());
    setApiLoading(false);

    if (result.success) {
      setLoading(true);
      setLoadingStep(0);
    } else {
      setError(result.error);
    }
  };

  const features = [
    {
      icon: BarChart3,
      color: 'emerald',
      title: 'Topic Ratings',
      description: 'Get estimated Elo per topic — DP, graphs, greedy, math, and more.',
    },
    {
      icon: Sparkles,
      color: 'cyan',
      title: 'Gap Finder',
      description: 'Spot where your solve rate drops and which concepts need attention.',
    },
    {
      icon: Radar,
      color: 'teal',
      title: 'Deep Analytics',
      description: 'Rating histograms and per-problem stats, styled like CF but smarter.',
    },
    {
      icon: Route,
      color: 'sky',
      title: 'Learning Paths',
      description: 'Follow interactive prerequisite graphs to climb ranks systematically.',
    },
  ];

  const colorMap = {
    emerald: 'bg-emerald-600/10 border-emerald-500/25 text-emerald-400',
    cyan: 'bg-cyan-600/10 border-cyan-500/25 text-cyan-400',
    teal: 'bg-teal-600/10 border-teal-500/25 text-teal-400',
    sky: 'bg-sky-600/10 border-sky-500/25 text-sky-400',
  };

  return (
    <div className="relative min-h-screen bg-[#0a1628] flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute -top-32 right-0 w-[520px] h-[520px] bg-emerald-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[480px] h-[480px] bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none" />

      <header className="relative z-10 max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <Radar className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-white font-display text-lg block leading-none">{brand.name}</span>
            <span className="text-[10px] text-slate-500 font-medium">by @{brand.author}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={brand.github}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-slate-400 hover:text-emerald-400 transition-colors"
          >
            GitHub
          </a>
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            v{brand.version}
          </span>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto w-full px-6 flex-1 flex flex-col items-center justify-center py-16 md:py-24">
        <AnimatePresence mode="wait">
          {!loading ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Codeforces profile intelligence
                  </div>

                  <h1 className="font-display font-extrabold tracking-tight text-4xl md:text-5xl lg:text-[3.25rem] text-white leading-[1.08] mb-5">
                    {brand.tagline.split(' clearly')[0]}{' '}
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                      clearly.
                    </span>
                  </h1>

                  <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                    {brand.shortDescription} Enter your handle and get a full breakdown in seconds.
                  </p>

                  {error && (
                    <div className="mb-5 p-3.5 rounded-xl border border-rose-500/25 bg-rose-500/10 text-rose-300 text-xs font-medium">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="max-w-md">
                    <div className="relative flex p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl focus-within:border-emerald-500/40 focus-within:shadow-[0_0_32px_-6px_rgba(16,185,129,0.25)] transition-all">
                      <input
                        type="text"
                        required
                        disabled={apiLoading}
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        placeholder="Your Codeforces handle"
                        className="flex-1 bg-transparent px-4 py-3.5 text-white placeholder-slate-500 outline-none text-base font-medium disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={apiLoading}
                        className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-lg shadow-emerald-600/15 transition-all active:scale-[0.98] disabled:opacity-70"
                      >
                        {apiLoading ? 'Checking...' : 'Analyze'}
                        {!apiLoading && <ArrowRight className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-3">
                      Try{' '}
                      <button type="button" onClick={() => setHandle('tourist')} className="text-emerald-400/90 hover:text-emerald-300 font-semibold">tourist</button>
                      {' '}or{' '}
                      <button type="button" onClick={() => setHandle('Benq')} className="text-emerald-400/90 hover:text-emerald-300 font-semibold">Benq</button>
                    </p>
                  </form>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {features.map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <GlassCard key={f.title} hoverGlow delay={0.08 * i} className="p-5">
                        <div className={`h-9 w-9 rounded-xl border flex items-center justify-center mb-3 ${colorMap[f.color]}`}>
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <h3 className="font-semibold text-white text-sm font-display">{f.title}</h3>
                        <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">{f.description}</p>
                      </GlassCard>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center max-w-sm w-full bg-[#0d1f35]/80 backdrop-blur-xl border border-emerald-500/15 p-8 rounded-3xl shadow-2xl shadow-emerald-950/40"
            >
              <div className="relative h-14 w-14 mb-7">
                <div className="absolute inset-0 rounded-full border-[3px] border-slate-800" />
                <div className="absolute inset-0 rounded-full border-[3px] border-t-emerald-400 border-r-cyan-400 animate-spin" />
                <Radar className="absolute inset-0 m-auto h-5 w-5 text-emerald-400" />
              </div>

              <h3 className="text-white font-semibold text-lg font-display">Building your profile</h3>
              <p className="text-xs text-cyan-400/80 font-mono mt-1">@{handle}</p>

              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mt-6 border border-white/[0.05]">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((loadingStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.45 }}
                />
              </div>

              <motion.p
                key={loadingStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[11px] text-slate-400 font-mono mt-4 text-center"
              >
                {steps[loadingStep]}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 max-w-6xl mx-auto w-full px-6 py-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <span>&copy; {new Date().getFullYear()} {brand.name} · Built by <a href={brand.github} className="text-emerald-400/80 hover:text-emerald-300">@{brand.author}</a></span>
        <span>Not affiliated with Codeforces</span>
      </footer>
    </div>
  );
};

export default LandingPage;
