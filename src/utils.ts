import { MultiplicationFormula } from './types';

export const generateMultiplicationData = (): MultiplicationFormula[] => {
  const data: MultiplicationFormula[] = [];
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= i; j++) {
      data.push({
        a: j,
        b: i,
        result: i * j,
        id: `${j}x${i}`
      });
    }
  }
  return data;
};

export const COLORS = [
  'bg-pink-100 border-pink-300 text-pink-700',
  'bg-blue-100 border-blue-300 text-blue-700',
  'bg-green-100 border-green-300 text-green-700',
  'bg-yellow-100 border-yellow-300 text-yellow-700',
  'bg-purple-100 border-purple-300 text-purple-700',
  'bg-orange-100 border-orange-300 text-orange-700',
  'bg-indigo-100 border-indigo-300 text-indigo-700',
  'bg-teal-100 border-teal-300 text-teal-700',
  'bg-rose-100 border-rose-300 text-rose-700',
];

export const getChineseNum = (n: number): string => {
  const chineseNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  return chineseNums[n];
};

export const getChineseFormula = (a: number, b: number, res: number): string => {
  const chA = getChineseNum(a);
  const chB = getChineseNum(b);
  
  let resStr = '';
  if (res < 10) {
    resStr = `得${getChineseNum(res)}`;
  } else {
    const tens = Math.floor(res / 10);
    const ones = res % 10;
    
    const tensStr = tens === 1 ? '十' : `${getChineseNum(tens)}十`;
    const onesStr = ones === 0 ? '' : getChineseNum(ones);
    resStr = `${tensStr}${onesStr}`;
  }
  
  return `${chA}${chB}${resStr}`;
};
