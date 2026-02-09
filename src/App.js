import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Play, SkipForward, HelpCircle } from 'lucide-react';

// --- БАЗА СЛОВ ДЛЯ КРОКОДИЛА ---
const WORDS = [
  "Кофемашина", "Лунный свет", "Скейтборд", "Панда в космосе", 
  "Зубная паста", "Электрический скат", "Детектив", "Пицца пепперони",
  "Блогер", "Танцы на льду", "Кот в сапогах", "Парашют", "Микроскоп"
];

export default function App() {
  const [gameState, setGameState] = useState('start'); // start, play
  const [currentWord, setCurrentWord] = useState('');
  const [score, setScore] = useState(0);

  // --- ФУНКЦИЯ ВЫБОРА НОВОГО СЛОВА ---
  // Берет случайное слово из массива и следит, чтобы оно не повторялось сразу
  const getNewWord = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    setCurrentWord(WORDS[randomIndex]);
  };

  // --- СТАРТ ИГРЫ ---
  const startGame = () => {
    getNewWord();
    setGameState('play');
    setScore(0);
  };

  // --- СЛЕДУЮЩЕЕ СЛОВО (УГАДАНО) ---
  const handleNext = () => {
    setScore(score + 1);
    getNewWord();
  };

  return (
    <div style={styles.container}>
      <AnimatePresence mode="wait">
        
        {/* ГЛАВНЫЙ ЭКРАН */}
        {gameState === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            style={styles.card}
          >
            <h1 style={styles.logo}>CROC<span style={{color: '#EAFF00'}}>O</span></h1>
            <p style={styles.rules}>Объясни слово жестами, не издавая ни звука!</p>
            <button style={styles.mainBtn} onClick={startGame}>
              ИГРАТЬ <Play fill="#000" size={20} />
            </button>
          </motion.div>
        )}

        {/* ЭКРАН ИГРЫ */}
        {gameState === 'play' && (
          <motion.div 
            key="play"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.card}
          >
            <div style={styles.scoreBoard}>ОЧКИ: {score}</div>
            
            <motion.div 
              key={currentWord}
              initial={{ rotate: -5, scale: 0.9, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              style={styles.wordBox}
            >
              <p style={styles.label}>ТВОЁ СЛОВО:</p>
              <h2 style={styles.word}>{currentWord}</h2>
            </motion.div>

            <div style={styles.btnGroup}>
              <button style={styles.skipBtn} onClick={getNewWord}>
                <SkipForward size={24} />
              </button>
              <button style={styles.doneBtn} onClick={handleNext}>
                УГАДАНО!
              </button>
            </div>

            <button style={styles.resetBtn} onClick={() => setGameState('start')}>
              <RefreshCw size={16} /> ВЫХОД
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// --- СТИЛИ COMIC NEON ---
const styles = {
  container: {
    height: '100dvh',
    background: '#2D004F', // Глубокий фиолетовый
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Unbounded, sans-serif'
  },
  card: {
    background: '#fff',
    border: '5px solid #000',
    boxShadow: '10px 10px 0px #EAFF00',
    borderRadius: '40px',
    padding: '40px 20px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    position: 'relative'
  },
  logo: { fontSize: '48px', fontWeight: '900', marginBottom: '20px', letterSpacing: '-2px' },
  rules: { fontSize: '14px', fontWeight: 'bold', marginBottom: '40px', lineHeight: '1.4' },
  wordBox: {
    background: '#EAFF00',
    border: '4px solid #000',
    padding: '40px 20px',
    borderRadius: '25px',
    marginBottom: '30px',
  },
  label: { fontSize: '12px', fontWeight: '900', marginBottom: '10px', opacity: 0.6 },
  word: { fontSize: '28px', fontWeight: '900', color: '#000', textTransform: 'uppercase' },
  mainBtn: {
    width: '100%',
    background: '#EAFF00',
    border: '4px solid #000',
    padding: '20px',
    borderRadius: '20px',
    fontSize: '18px',
    fontWeight: '900',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    cursor: 'pointer'
  },
  btnGroup: { display: 'flex', gap: '15px' },
  skipBtn: {
    flex: '1',
    background: '#FF7CC0',
    border: '4px solid #000',
    borderRadius: '20px',
    padding: '20px',
    cursor: 'pointer'
  },
  doneBtn: {
    flex: '2',
    background: '#00F0FF',
    border: '4px solid #000',
    borderRadius: '20px',
    padding: '20px',
    fontSize: '16px',
    fontWeight: '900',
    cursor: 'pointer'
  },
  scoreBoard: { position: 'absolute', top: '-15px', right: '20px', background: '#000', color: '#fff', padding: '5px 15px', borderRadius: '10px', fontSize: '12px', fontWeight: '900' },
  resetBtn: { marginTop: '30px', background: 'none', border: 'none', color: '#ccc', display: 'flex', alignItems: 'center', gap: '5px', margin: '30px auto 0 auto', cursor: 'pointer' }
};
