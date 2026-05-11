/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Grid3X3, 
  Library, 
  BrainCircuit, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  Star,
  Trophy,
  Zap,
  Swords,
  Shield,
  Target,
  Flame,
  Crown,
  Sparkles
} from 'lucide-react';
import { MultiplicationFormula, LearningMode } from './types';
import { generateMultiplicationData, getChineseFormula } from './utils';
import { MultiplicationCard } from './components/MultiplicationCard';

export default function App() {
  const [mode, setMode] = useState<LearningMode>('grid');
  const [cardIndex, setCardIndex] = useState(0);
  const [isQuizFlipped, setIsQuizFlipped] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<MultiplicationFormula | null>(null);

  const formulas = useMemo(() => generateMultiplicationData(), []);

  // Group formulas for staircase layout
  const groupedFormulas = useMemo(() => {
    const groups: Record<number, MultiplicationFormula[]> = {};
    formulas.forEach(f => {
      if (!groups[f.b]) groups[f.b] = [];
      groups[f.b].push(f);
    });
    return Object.values(groups);
  }, [formulas]);

  // Initialize quiz
  useEffect(() => {
    if (mode === 'quiz') {
      pickNewQuiz();
    }
  }, [mode]);

  const pickNewQuiz = () => {
    const randomIndex = Math.floor(Math.random() * formulas.length);
    setCurrentQuiz(formulas[randomIndex]);
    setIsQuizFlipped(false);
  };

  const nextCard = () => {
    setCardIndex((prev) => (prev + 1) % formulas.length);
  };

  const prevCard = () => {
    setCardIndex((prev) => (prev - 1 + formulas.length) % formulas.length);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden pb-20 relative">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
      </div>

      {/* Header */}
      <header className="p-10 text-center relative z-10">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="inline-block relative"
        >
          <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse" />
          <h1 className="text-5xl font-black italic tracking-tighter bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent drop-shadow-[0_4px_10px_rgba(30,58,138,0.5)] uppercase flex items-center justify-center gap-4">
            <Trophy className="text-yellow-500" size={48} />
            王者算力：荣耀大厅
          </h1>
        </motion.div>
        <p className="mt-4 text-blue-400 font-black italic tracking-widest uppercase text-xs opacity-80">Mathematical Master Arena v2.1</p>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex flex-wrap justify-center gap-4 mb-12 px-4 relative z-10">
        {[
          { icon: Grid3X3, label: '口诀阵法', value: 'grid' },
          { icon: Library, label: '英雄图鉴', value: 'cards' },
          { icon: BrainCircuit, label: '排位匹配', value: 'quiz' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setMode(tab.value as LearningMode)}
            className={`
              group relative flex items-center gap-3 px-8 py-4 rounded-xl font-black italic transition-all overflow-hidden
              ${mode === tab.value 
                ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border-b-4 border-blue-800 scale-105' 
                : 'bg-[#1e293b] text-gray-400 border-b-4 border-[#0f172a] hover:bg-[#334155] hover:text-white shadow-lg'}
            `}
          >
            <tab.icon size={20} className={mode === tab.value ? 'text-yellow-400' : 'text-gray-500'} />
            <span className="tracking-widest">{tab.label}</span>
            {mode === tab.value && (
              <motion.div layoutId="tab-glow" className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 skew-x-12 translate-x-full animate-[shimmer_2s_infinite]" />
            )}
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait">
          {mode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col gap-6"
            >
               {/* 阶梯化呈现 Staircase Layout */}
                <div className="flex flex-col gap-6 items-start bg-white/5 p-8 rounded-[3rem] border-2 border-white/5 backdrop-blur-md relative overflow-hidden">
                   {/* Rank Labels Mapping */}
                   {groupedFormulas.map((row, i) => {
                      const ranks = [
                        { name: "青铜", icon: Swords, color: "text-orange-400" },
                        { name: "白银", icon: Shield, color: "text-slate-300" },
                        { name: "黄金", icon: Star, color: "text-yellow-400" },
                        { name: "铂金", icon: Zap, color: "text-cyan-400" },
                        { name: "钻石", icon: Target, color: "text-blue-400" },
                        { name: "星耀", icon: Flame, color: "text-purple-400" },
                        { name: "最强王者", icon: Crown, color: "text-yellow-500" },
                        { name: "无双王者", icon: Trophy, color: "text-red-500" },
                        { name: "荣耀王者", icon: Sparkles, color: "text-amber-400" }
                      ];
                      const RankIcon = ranks[i].icon;
                      
                      return (
                        <motion.div 
                            key={i} 
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 group/row"
                        >
                            {/* Rank Badge */}
                            <div className="flex flex-col items-center justify-center w-20 shrink-0">
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-b from-[#1e293b] to-[#0f172a] border-2 border-white/10 flex items-center justify-center mb-1 shadow-lg group-hover/row:border-cyan-500/50 transition-colors`}>
                                    <RankIcon className={ranks[i].color} size={24} />
                                </div>
                                <span className={`text-[10px] font-black italic uppercase tracking-tighter ${ranks[i].color}`}>{ranks[i].name}</span>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {row.map((f, j) => (
                                   <MultiplicationCard key={f.id} formula={f} index={j} />
                                ))}
                            </div>
                        </motion.div>
                      );
                   })}
                </div>
            </motion.div>
          )}

          {mode === 'cards' && (
            <motion.div
              key="cards"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="relative w-full max-w-sm aspect-square">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={formulas[cardIndex].id}
                    initial={{ x: 200, opacity: 0, rotate: 10 }}
                    animate={{ x: 0, opacity: 1, rotate: 0 }}
                    exit={{ x: -200, opacity: 0, rotate: -10 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="w-full h-full"
                  >
                    <div className={`
                        w-full h-full rounded-3xl border-4 p-8 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] 
                        bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-blue-500/50 relative overflow-hidden group
                    `}>
                      {/* Decoration */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
                      
                      <span className="text-sm font-black text-blue-400 uppercase tracking-[0.3em] mb-4 opacity-50">Discovery Card</span>
                      <h2 className="text-8xl font-black text-center mb-6 italic tracking-tighter text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                        {formulas[cardIndex].a} × {formulas[cardIndex].b} = <span className="text-yellow-500">{formulas[cardIndex].result}</span>
                      </h2>
                      <p className="text-2xl font-black text-cyan-400 italic opacity-80">
                        {getChineseFormula(formulas[cardIndex].a, formulas[cardIndex].b, formulas[cardIndex].result)}
                      </p>

                      <div className="mt-12 flex gap-2">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className={s <= (formulas[cardIndex].b % 5 + 1) ? "fill-yellow-500 text-yellow-500" : "text-gray-700"} />)}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                <div className="absolute -bottom-24 left-0 right-0 flex justify-between items-center px-4">
                  <button onClick={prevCard} className="w-16 h-16 bg-[#1e293b] text-white border border-blue-500/30 rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-600 transition-all active:scale-90 active:translate-y-1">
                    <ChevronLeft size={32} />
                  </button>
                  <div className="text-center">
                    <div className="text-[10px] text-blue-400 font-black tracking-widest uppercase">Index</div>
                    <span className="font-black text-3xl text-white italic">{cardIndex + 1} <span className="text-lg text-gray-500">/ {formulas.length}</span></span>
                  </div>
                  <button onClick={nextCard} className="w-16 h-16 bg-[#1e293b] text-white border border-blue-500/30 rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-600 transition-all active:scale-90 active:translate-y-1">
                    <ChevronRight size={32} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {mode === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center py-6 px-4"
            >
              {/* Game Style Header */}
              <div className="w-full max-w-lg mb-8 flex items-center justify-between bg-[#1e293b] p-4 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    <Trophy className="text-[#5d4037]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest">Ranked Match</h3>
                    <p className="text-xl font-black text-white italic">最强王者之路</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-gray-400">WIN STREAK</div>
                  <div className="flex gap-1 justify-end">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_5px_#eab308]"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Monster / Target Container */}
              <div className="relative w-full max-w-md h-80 flex flex-col items-center justify-center bg-[#0a192f] rounded-[3rem] border-4 border-[#1e3a8a] shadow-2xl overflow-hidden mb-12">
                {/* Background Radar Effect */}
                <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                  <div className="w-64 h-64 border-4 border-cyan-400 rounded-full animate-ping" />
                  <div className="absolute w-40 h-40 border-2 border-cyan-400 rounded-full" />
                </div>

                <AnimatePresence mode="wait">
                  {!isQuizFlipped ? (
                    <motion.div
                      key="monster"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ scale: 1.5, opacity: 0, filter: 'brightness(2)' }}
                      className="text-center z-10"
                    >
                      <div className="text-7xl mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">👾</div>
                      <div className="px-6 py-2 bg-red-600/20 border border-red-500 rounded-full text-red-500 font-black text-xs mb-8 tracking-widest">BOSS APPEARED</div>
                      <div className="text-8xl font-black text-white italic tracking-tighter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                        {currentQuiz?.a} <span className="text-cyan-400">×</span> {currentQuiz?.b}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="victory"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center z-10"
                    >
                      <motion.div 
                        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-8xl mb-4"
                      >
                        ⚔️
                      </motion.div>
                      <div className="px-6 py-2 bg-green-600/20 border border-green-500 rounded-full text-green-500 font-black text-xs mb-8 tracking-widest">CRITICAL HIT!</div>
                      <div className="text-7xl font-black text-yellow-400 italic">
                         = {currentQuiz?.result}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* HP Bar Decoration */}
                <div className="absolute bottom-6 w-3/4 h-3 bg-gray-800 rounded-full border border-white/10 overflow-hidden">
                    <motion.div 
                      animate={{ width: isQuizFlipped ? '0%' : '100%' }}
                      className={`h-full ${isQuizFlipped ? 'bg-red-600' : 'bg-gradient-to-r from-red-600 to-orange-400'}`}
                    />
                </div>
              </div>

              {/* Game Action Buttons */}
              <div className="flex flex-col gap-6 w-full max-w-sm">
                {!isQuizFlipped ? (
                  <button 
                    onClick={() => setIsQuizFlipped(true)}
                    className="group relative w-full py-8 bg-gradient-to-b from-cyan-400 to-blue-600 text-white rounded-[2rem] font-black text-3xl shadow-[0_12px_0_#1e3a8a] transform hover:translate-y-1 hover:shadow-[0_6px_0_#1e3a8a] active:translate-y-3 active:shadow-none transition-all flex items-center justify-center gap-6"
                  >
                    释放大招 <Zap size={40} className="fill-yellow-300" />
                  </button>
                ) : (
                  <button 
                    onClick={pickNewQuiz}
                    className="group relative w-full py-8 bg-gradient-to-b from-green-400 to-emerald-600 text-white rounded-[2rem] font-black text-3xl shadow-[0_12px_0_#065f46] transform hover:translate-y-1 hover:shadow-[0_6px_0_#065f46] active:translate-y-3 active:shadow-none transition-all flex items-center justify-center gap-6"
                  >
                    下一波小怪 <ChevronRight size={40} />
                  </button>
                )}

                <div className="flex justify-between items-center px-4 pt-4 border-t border-white/10">
                    <button 
                      onClick={() => setMode('grid')}
                      className="flex items-center gap-2 text-gray-500 font-black hover:text-blue-600 transition-colors"
                    >
                      <RotateCcw size={20} /> 退出匹配
                    </button>
                    <div className="flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-xl border border-yellow-500/50">
                        <Star className="text-yellow-500 fill-yellow-500" size={16} />
                        <span className="text-xs font-black text-yellow-500 uppercase">乘法大师</span>
                    </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Decorative background footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 flex justify-center pointer-events-none">
         <div className="bg-[#1e293b]/80 backdrop-blur-md px-10 py-2 rounded-t-3xl border-t border-x border-blue-500/30 text-[10px] font-black tracking-[0.5em] text-blue-400/50 uppercase">
            System Online • Secure Connection • v2.1
         </div>
      </footer>
    </div>
  );
}
