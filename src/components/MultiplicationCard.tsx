import React from 'react';
import { motion } from 'motion/react';
import { MultiplicationFormula } from '../types';
import { getChineseFormula } from '../utils';

interface Props {
  formula: MultiplicationFormula;
  showAnswer?: boolean;
  onClick?: () => void;
  index: number;
}

export const MultiplicationCard: React.FC<Props> = ({ formula, showAnswer = true, onClick, index }) => {
  // Use a refined color palette for "Honor of Kings" feel
  // 1-3: Bronze/Brown, 4-6: Silver/Cyan, 7-9: Gold/Yellow
  const getThemeColors = (row: number) => {
    if (row <= 3) return 'from-orange-800 to-amber-900 border-amber-600/50 text-amber-100 shadow-[0_0_10px_rgba(180,83,9,0.2)]';
    if (row <= 6) return 'from-slate-700 to-slate-900 border-cyan-500/50 text-cyan-100 shadow-[0_0_10px_rgba(6,182,212,0.2)]';
    return 'from-yellow-600 to-yellow-900 border-yellow-400/50 text-yellow-50 shadow-[0_0_15px_rgba(234,179,8,0.3)]';
  };

  const themeClass = getThemeColors(formula.b);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.4, delay: index * 0.01 }}
      whileHover={{ scale: 1.1, zIndex: 10, filter: 'brightness(1.2)' }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-xl border-2 p-3 overflow-hidden
        flex flex-col items-center justify-center min-w-[100px] min-h-[70px]
        bg-gradient-to-br ${themeClass}
        backdrop-blur-sm group
      `}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <div className="text-xl font-black italic tracking-tighter drop-shadow-md text-white mb-1">
        {formula.a} × {formula.b} = {formula.result}
      </div>
      <div className="text-[10px] font-bold opacity-60 tracking-wider">
        {getChineseFormula(formula.a, formula.b, formula.result)}
      </div>
      
      {!showAnswer && (
        <div className="absolute inset-0 bg-[#0a192f]/60 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <span className="text-xl font-bold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">?</span>
        </div>
      )}
      
      {/* Corner Decoration */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
    </motion.div>
  );
};
