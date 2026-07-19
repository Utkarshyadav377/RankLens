import React from 'react';
import { LayoutDashboard, Network, LogOut, Radar, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { brand } from '../config/brand';

const Navigation = ({ activeTab, handle, rating, rank, avatar, onReset }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { id: 'dashboard', name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'dsa-explorer', name: 'Skill Map', icon: Network, path: '/dsa-explorer' },
  ];

  return (
    <>
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-[#0a1628]/90 backdrop-blur-md border-b border-emerald-500/10 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Radar className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold tracking-tight text-white font-display">{brand.name}</span>
        </div>

        <div className="flex items-center gap-3">
          {avatar && (
            <img src={avatar} alt={handle} className="h-6 w-6 rounded-full border border-emerald-500/20" />
          )}
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/25 text-emerald-400">
            {handle}
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="md:hidden fixed top-[65px] left-0 right-0 bg-[#0a1628]/98 border-b border-emerald-500/10 z-30 p-6 flex flex-col gap-3"
          >
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-emerald-500/12 border border-emerald-500/25 text-emerald-400'
                      : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            })}
            <div className="h-px bg-white/[0.06] my-1" />
            <button
              onClick={() => { setIsOpen(false); onReset(); }}
              className="flex items-center gap-3 p-3 rounded-xl text-rose-400 hover:bg-rose-950/20"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium text-sm">Switch Handle</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <aside className="hidden md:flex flex-col w-64 border-r border-emerald-500/10 bg-[#0a1628]/60 backdrop-blur-md p-6 h-screen sticky top-0 shrink-0">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Radar className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold tracking-tight text-white leading-none font-display">{brand.name}</h1>
            <span className="text-[10px] text-slate-500 tracking-wide">@{brand.author}</span>
          </div>
        </div>

        <div className="mb-8 p-4 rounded-2xl bg-white/[0.02] border border-emerald-500/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex items-center gap-3">
            {avatar && (
              <img src={avatar} alt={handle} className="h-10 w-10 rounded-full border border-emerald-500/15 shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Profile</div>
              <div className="font-semibold text-white truncate font-display">{handle}</div>
              <div className="text-[10px] text-emerald-400 font-medium capitalize truncate mt-1">{rank || 'unrated'}</div>
            </div>
          </div>
          <div className="mt-3.5 relative z-10 flex items-center justify-between border-t border-white/[0.05] pt-2.5">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Rating</span>
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
              {rating}
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'dashboard' && activeTab === 'deep-dive');
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`relative flex items-center w-full gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl bg-emerald-500/8 border border-emerald-500/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`h-5 w-5 relative z-10 ${isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-emerald-500/10 pt-4 mt-auto space-y-2">
          <a
            href={brand.github}
            target="_blank"
            rel="noreferrer"
            className="block text-[10px] text-slate-500 hover:text-emerald-400 transition-colors px-4"
          >
            @{brand.author} on GitHub
          </a>
          <button
            onClick={onReset}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/10 transition-all group"
          >
            <LogOut className="h-5 w-5 group-hover:text-rose-400" />
            <span>Switch Handle</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
