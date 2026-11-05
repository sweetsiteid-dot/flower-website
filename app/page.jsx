'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Heart, Sparkles, Calendar, Clock, Music, Pause, VolumeX,
  Gift, Plus, Lock, Unlock, Edit, Trash2, X, ChevronRight, 
  RotateCcw, BookOpen, Star, Sliders, ArrowRight, 
  Flower2, Wand2, RefreshCw, Droplets, Feather, Compass,
  Send, Layers, Trophy, CheckCircle2
} from 'lucide-react';

// --- CANVAS INTERAKTIF KELOPAK & BUNGA AI MEKAR ---
function AIFlowerCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Partikel Kelopak Bunga Melayang
    const petals = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: Math.sin(Math.random() * Math.PI * 2) * 0.5,
      angle: Math.random() * 360,
      spin: Math.random() * 2 - 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: `rgba(${Math.floor(Math.random() * 60 + 200)}, ${Math.floor(Math.random() * 80 + 100)}, ${Math.floor(Math.random() * 120 + 120)}, ${Math.random() * 0.4 + 0.2})`
    }));

    // Bunga AI Mekar saat Layar Diklik
    let clickBlooms = [];

    const handleCanvasClick = (e) => {
      clickBlooms.push({
        x: e.clientX,
        y: e.clientY,
        size: 0,
        maxSize: Math.random() * 25 + 20,
        opacity: 1,
        petalsCount: Math.floor(Math.random() * 3) + 5,
        color: `hsl(${Math.floor(Math.random() * 70 + 310)}, 85%, 70%)`
      });
    };
    window.addEventListener('click', handleCanvasClick);

    const drawPetal = (x, y, size, angle, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(size, -size, size * 2, 0, 0, size * 2);
      ctx.bezierCurveTo(-size * 2, 0, -size, -size, 0, 0);
      ctx.fill();
      ctx.restore();
    };

    const drawAIBloom = (b) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.globalAlpha = b.opacity;
      for (let i = 0; i < b.petalsCount; i++) {
        const angle = (360 / b.petalsCount) * i;
        ctx.rotate((angle * Math.PI) / 180);
        ctx.beginPath();
        ctx.fillStyle = b.color;
        ctx.arc(0, b.size / 2, b.size / 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.fillStyle = '#fff7ed';
      ctx.arc(0, 0, b.size / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * p.speedX;
        p.angle += p.spin;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }

        drawPetal(p.x, p.y, p.size, p.angle, p.color);
      });

      clickBlooms.forEach((b, index) => {
        if (b.size < b.maxSize) {
          b.size += 1.5;
        } else {
          b.opacity -= 0.015;
        }
        drawAIBloom(b);
        if (b.opacity <= 0) {
          clickBlooms.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
    />
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef(null);

  // Core States
  const [anniversaryDate, setAnniversaryDate] = useState('2023-02-14T00:00:00');
  const [partnerNames, setPartnerNames] = useState({ partner1: 'Alex', partner2: 'Taylor', nickname: 'My Glowing AI Conservatory' });
  const [partnerStatus, setPartnerStatus] = useState({
    partner1Status: 'Blooming with Joy 🌸',
    partner2Status: 'Watering Our Garden 🌿',
    quote: 'Di antara ribuan bintang, kamu adalah kelopak bunga buatan AI paling indah.'
  });

  const [activeTab, setActiveTab] = useState('garden');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // 1. FITUR BARU: Daily Garden Water Streak
  const [waterStreak, setWaterStreak] = useState(12);
  const [isWateredToday, setIsWateredToday] = useState(false);

  // 2. FITUR BARU: AI Botanical Studio & Poem Writer
  const aiVibes = [
    { title: 'Rose Celestial Neon', color: 'from-pink-500 via-rose-400 to-purple-500', poem: 'Di setiap pendar cahayamu, ada kehangatan yang tak pernah padam oleh waktu.' },
    { title: 'Starlight Crystal Lotus', color: 'from-cyan-400 via-teal-300 to-pink-400', poem: 'Tenang dan anggun, kehadiranmu seperti telaga jernih di bawah sinar rembulan.' },
    { title: 'Golden Ether Orchid', color: 'from-amber-300 via-yellow-200 to-rose-400', poem: 'Senyumanmu adalah mentari pagi yang selalu berhasil mencairkan dinginnya hari.' },
    { title: 'Velvet Midnight Poppy', color: 'from-indigo-400 via-purple-300 to-pink-500', poem: 'Misteri terindah yang selalu ingin aku pelajari dan cintai setiap harinya.' }
  ];
  const [selectedVibe, setSelectedVibe] = useState(aiVibes[0]);
  const [customPoemInput, setCustomPoemInput] = useState('');

  // 3. FITUR BARU: Botani Kebaikan (Gratitude Seed Jar)
  const [botaniSeeds, setBotaniSeeds] = useState([
    { id: 1, text: 'Terima kasih selalu sabar dengerin cerita random-ku setiap malam.', author: 'Alex', date: 'Hari Ini' },
    { id: 2, text: 'Ingat ya, kamu itu selalu cukup dan luar biasa di mataku!', author: 'Taylor', date: 'Kemarin' }
  ]);
  const [newSeedText, setNewSeedText] = useState('');

  // 4. FITUR BARU: Romantic Time-Capsule Vault
  const [secretPasscode, setSecretPasscode] = useState('1234');
  const [inputPin, setInputPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [lockError, setLockError] = useState('');
  const [secretLetter, setSecretLetter] = useState(
`Untuk Bunga Terindahku ❤️,

Jika kamu membaca tulisan ini, berarti kamu sudah membuka kapsul waktu rahasia kita.

Aku mau bilang terima kasih ya sudah bertahan dan mau tumbuh bersama sejauh ini. Seperti kebun bunga buatan AI ini, kecantikan dan kebaikan hatimu selalu terasa ajaib bagi hidupku.

Semoga web ini selalu bisa jadi tempat pulang yang manis buat kamu kapan saja kamu kangen.

Dengan Cinta Abadi,
— Pasangan Bucinmu 💕`
  );
  const [displayedText, setDisplayedText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  // 5. FITUR BARU: Love Compass & Floral Astrology Quiz
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);

  const floralQuestions = [
    { q: "Apa aroma favorit saat kita santai bareng?", opts: ["Aroma Kopi / Matcha", "Aroma Lavender Hangat", "Aroma Hujan Musim Semi", "Aroma Makanan Enak"], ans: 0 },
    { q: "Kalau kita jadi tanaman, kita cocok jadi apa?", opts: ["Bunga Rose Abadi", "Pohon Rindang Tempat Berteduh", "Bunga Matahari Ceria", "Sepasang Kaktus Kuat"], ans: 1 },
    { q: "Momen apa yang paling bikin kebun cinta kita makin mekar?", opts: ["Ngobrol deep talk berjam-jam", "Jalan-jalan tanpa tujuan", "Nonton film sambil maskeran", "Semua momen asal sama kamu"], ans: 3 }
  ];

  // 6. Memory Path Timeline
  const [timeline, setTimeline] = useState([
    { id: 1, date: 'Awal Benih Tertanam', title: 'Pertemuan Pertama', desc: 'Momen awal obrolan manis yang mengalir tanpa rasa canggung.', icon: '🌱' },
    { id: 2, date: 'Kelopak Pertama Mekar', title: 'Kencan Pertama', desc: 'Duduk berdua menikmati malam hingga lupa waktu.', icon: '🌸' },
    { id: 3, date: 'Tumbuh Bersama', title: 'Komitmen Abadi', desc: 'Keputusan terbaik untuk saling merawat dan menjaga satu sama lain.', icon: '💍' }
  ]);

  // Settings Modal State
  const [showSettings, setShowSettings] = useState(false);
  const [editNames, setEditNames] = useState(partnerNames);
  const [editAnniversary, setEditAnniversary] = useState('2023-02-14');
  const [editPin, setEditPin] = useState('1234');

  // Auto Scroll ke Atas saat Ganti Tab
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Hydration Safety Check
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const savedAnniversary = localStorage.getItem('ai_garden_anniversary');
      if (savedAnniversary) {
        setAnniversaryDate(savedAnniversary);
        setEditAnniversary(savedAnniversary.split('T')[0]);
      }
      const savedPartners = localStorage.getItem('ai_garden_partners');
      if (savedPartners) {
        const parsed = JSON.parse(savedPartners);
        setPartnerNames(parsed);
        setEditNames(parsed);
      }
    }
  }, []);

  // Relationship Counter Calculator
  useEffect(() => {
    if (!isMounted) return;
    const calculateTime = () => {
      const start = new Date(anniversaryDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [anniversaryDate, isMounted]);

  // Audio Handler
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
      showToast("🎵 Musik di-pause");
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
        showToast("🎶 Memutar: Shape of My Heart ❤️");
      }).catch((err) => {
        console.log("Autoplay diblokir:", err);
        showToast("Klik sekali lagi untuk memutar lagu!");
      });
    }
  };

  // Water Garden Handler
  const handleWaterGarden = () => {
    if (!isWateredToday) {
      setIsWateredToday(true);
      setWaterStreak(prev => prev + 1);
      showToast("💧 Kebun Cinta Berhasil Disiram! Streak Bertambah 🔥");
    } else {
      showToast("Kebun sudah disiram hari ini. Kembali besok ya! 🌸");
    }
  };

  // Add Seed Gratitude Handler
  const handleAddSeed = (e) => {
    e.preventDefault();
    if (!newSeedText.trim()) return;
    const item = { id: Date.now(), text: newSeedText.trim(), author: partnerNames.partner1, date: 'Baru Saja' };
    setBotaniSeeds([item, ...botaniSeeds]);
    setNewSeedText('');
    showToast("🌱 Benih Apresiasi Baru Berhasil Ditanam!");
  };

  // Typewriter Secret Letter
  useEffect(() => {
    if (isUnlocked && typewriterIndex < secretLetter.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + secretLetter.charAt(typewriterIndex));
        setTypewriterIndex(prev => prev + 1);
      }, 25);
      return () => clearTimeout(timer);
    }
  }, [isUnlocked, typewriterIndex, secretLetter]);

  const handleKeypadPress = (digit) => {
    if (inputPin.length < 4) {
      const nextPin = inputPin + digit;
      setInputPin(nextPin);
      setLockError('');
      if (nextPin.length === 4) {
        if (nextPin === secretPasscode) {
          setIsUnlocked(true);
          setTypewriterIndex(0);
          setDisplayedText('');
          showToast("🔓 Kapsul Waktu Rahasia Terbuka!");
        } else {
          setLockError("PIN Salah! Ketik 1234");
          setTimeout(() => setInputPin(''), 1000);
        }
      }
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-rose-300 font-sans">
        <div className="animate-pulse flex items-center gap-3">
          <Flower2 className="w-8 h-8 text-pink-400 animate-spin" />
          <span className="font-bold text-lg">Membuka AI Botanical Garden... 🌸</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-rose-950 to-slate-950 text-slate-100 font-sans relative overflow-x-hidden pb-28">
      {/* Pemutar Audio shapeofmyheart.mp3 */}
      <audio ref={audioRef} src="/shapeofmyheart.mp3" loop prefetch="auto" />

      {/* Interactive Background Canvas */}
      <AIFlowerCanvas />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-rose-600/90 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border border-rose-400/40 backdrop-blur-md">
          <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/70 border-b border-rose-900/40 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleTabChange('garden')}>
            <div className="bg-gradient-to-tr from-rose-500 to-purple-600 p-2.5 rounded-2xl shadow-lg text-white">
              <Flower2 className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h1 className="font-extrabold text-base md:text-lg bg-gradient-to-r from-rose-300 via-pink-200 to-amber-200 bg-clip-text text-transparent">
                {partnerNames.partner1} & {partnerNames.partner2}
              </h1>
              <p className="text-[11px] text-rose-400/80 font-medium">{partnerNames.nickname}</p>
            </div>
          </div>

          {/* Nav Tabs Desktop */}
          <nav className="hidden md:flex items-center gap-1.5 bg-rose-950/40 p-1.5 rounded-full border border-rose-900/30">
            {[
              { id: 'garden', label: 'Kebun Utama', icon: Flower2 },
              { id: 'studio', label: 'AI Studio', icon: Wand2 },
              { id: 'seeds', label: 'Benih Kebaikan', icon: Feather },
              { id: 'timelock', label: 'Kapsul PIN', icon: Lock },
              { id: 'compass', label: 'Love Quiz', icon: Compass }
            ].map(tab => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-900/50'
                      : 'text-slate-400 hover:text-rose-300 hover:bg-rose-900/20'
                  }`}
                >
                  <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-rose-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMusic}
              className={`p-2.5 rounded-full transition-all flex items-center justify-center border ${
                isPlayingMusic
                  ? 'bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-600/40'
                  : 'bg-slate-900/80 text-rose-400 border-rose-900/40 hover:bg-rose-950'
              }`}
            >
              {isPlayingMusic ? <Music className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2.5 bg-slate-900/80 text-slate-300 border border-rose-900/40 rounded-full hover:bg-rose-950 transition-all"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-6xl mx-auto px-4 pt-8">

        {/* ================= TAB 1: KEBUN UTAMA & DAILY WATER STREAK ================= */}
        {activeTab === 'garden' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Hero Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-purple-950/60 p-8 md:p-12 border border-rose-800/40 shadow-2xl backdrop-blur-xl">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Avatar 1 */}
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-rose-500 to-pink-400 shadow-xl">
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-3xl font-extrabold text-rose-300">
                        {partnerNames.partner1.charAt(0)}
                      </div>
                    </div>
                    <h3 className="mt-2 font-bold text-lg text-rose-100">{partnerNames.partner1}</h3>
                    <span className="text-xs bg-rose-950/80 border border-rose-800/40 px-3 py-1 rounded-full text-rose-300 mt-1">
                      {partnerStatus.partner1Status}
                    </span>
                  </div>

                  {/* Pulsing Connector */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center animate-pulse">
                      <Heart className="w-6 h-6 fill-rose-400 text-rose-400" />
                    </div>
                    <span className="text-xs text-rose-300 mt-1 font-semibold">Tumbuh Bersama</span>
                  </div>

                  {/* Avatar 2 */}
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-purple-400 to-pink-400 shadow-xl">
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-3xl font-extrabold text-purple-300">
                        {partnerNames.partner2.charAt(0)}
                      </div>
                    </div>
                    <h3 className="mt-2 font-bold text-lg text-purple-100">{partnerNames.partner2}</h3>
                    <span className="text-xs bg-rose-950/80 border border-rose-800/40 px-3 py-1 rounded-full text-rose-300 mt-1">
                      {partnerStatus.partner2Status}
                    </span>
                  </div>
                </div>

                {/* Daily Quote Card */}
                <div className="bg-slate-950/60 p-5 rounded-2xl border border-rose-800/30 max-w-xs text-center md:text-right backdrop-blur-md">
                  <span className="text-[10px] uppercase tracking-widest text-rose-400 font-bold">Catatan Kebun Cinta</span>
                  <p className="italic text-sm text-rose-200 mt-1">"{partnerStatus.quote}"</p>
                </div>
              </div>
            </div>

            {/* LIVE RELATIONSHIP COUNTER */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl text-center shadow-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-800/40 text-rose-300 text-xs font-semibold mb-3">
                <Clock className="w-4 h-4 text-rose-400" />
                <span>Love Timer Kebun Cinta</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-8">
                Telah Bersama Memekarkan Kebun Cinta Selama:
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {[
                  { label: 'Hari', val: timeTogether.days },
                  { label: 'Jam', val: timeTogether.hours },
                  { label: 'Menit', val: timeTogether.minutes },
                  { label: 'Detik', val: timeTogether.seconds }
                ].map((t, idx) => (
                  <div key={idx} className="bg-slate-950/80 border border-rose-900/30 rounded-2xl p-5 shadow-inner">
                    <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-rose-300 via-pink-400 to-purple-400 font-mono">
                      {t.val}
                    </div>
                    <div className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-wider">{t.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FITUR BARU: DAILY WATER STREAK CHECK-IN */}
            <div className="bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-900 border border-rose-900/40 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center md:text-left">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 mx-auto">
                  <Droplets className="w-8 h-8 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Daily Water Streak</span>
                    <span className="text-xs bg-blue-950 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-800 font-mono font-bold">
                      {waterStreak} Hari 🔥
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-100 mt-1">Siram Kebun Cinta Hari Ini</h3>
                  <p className="text-slate-400 text-xs mt-1">Klik tombol siram tiap hari untuk menjaga kelopak bunga tetap mekar indah!</p>
                </div>
              </div>

              <button
                onClick={handleWaterGarden}
                disabled={isWateredToday}
                className={`px-8 py-4 rounded-2xl font-bold text-sm transition transform active:scale-95 shadow-xl shrink-0 flex items-center gap-2 ${
                  isWateredToday
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white'
                }`}
              >
                <Droplets className="w-4 h-4" />
                <span>{isWateredToday ? 'Kebun Sudah Disiram ✓' : 'Siram Kebun Sekarang'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 2: AI BOTANICAL STUDIO & POEM WRITER ================= */}
        {activeTab === 'studio' && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <div className="bg-slate-900/70 border border-rose-900/40 p-8 rounded-3xl text-center backdrop-blur-xl shadow-2xl relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-900/50">
                <Wand2 className="w-8 h-8 text-white animate-pulse" />
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100">AI Botanical Studio & Poem Writer</h2>
              <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
                Pilih racikan bunga AI favoritmu dan biarkan sistem merajik puisi cinta romantis secara otomatis!
              </p>

              {/* Grid Vibe Selector */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {aiVibes.map((vibe, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedVibe(vibe)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all text-center ${
                      selectedVibe.title === vibe.title
                        ? 'bg-rose-950/80 border-rose-500 shadow-lg scale-105'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full mx-auto bg-gradient-to-tr ${vibe.color} p-0.5 shadow-md mb-3`}>
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                        <Flower2 className="w-6 h-6 text-rose-300" />
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200">{vibe.title}</h4>
                  </div>
                ))}
              </div>

              {/* Display Generated Poem */}
              <div className="mt-8 bg-slate-950/90 border border-rose-900/40 rounded-3xl p-8 max-w-2xl mx-auto text-center shadow-inner relative">
                <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800/40">
                  AI Craft Poem Result
                </span>
                <p className="text-rose-200 text-lg md:text-xl font-serif italic mt-6 leading-relaxed">
                  "{selectedVibe.poem}"
                </p>
                <div className="mt-6 pt-4 border-t border-slate-800 text-slate-500 text-xs">
                  Dirajik khusus untuk <span className="text-rose-300 font-bold">{partnerNames.partner2}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: BENIH KEBAIKAN (GRATITUDE JAR) ================= */}
        {activeTab === 'seeds' && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <div className="bg-slate-900/60 border border-slate-800 p-6 md:p-8 rounded-3xl backdrop-blur-md">
              <div className="text-center max-w-md mx-auto mb-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <Feather className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-slate-100">Botani Kebaikan & Apresiasi</h2>
                <p className="text-slate-400 text-xs mt-1">Tanam ucapan rasa terima kasih dan apresiasi kecil untuk pasanganmu di sini.</p>
              </div>

              {/* Input Form Benih Baru */}
              <form onSubmit={handleAddSeed} className="flex gap-3 mb-8">
                <input
                  type="text"
                  required
                  placeholder="Tulis ucapan terima kasih / pujian kecil hari ini..."
                  value={newSeedText}
                  onChange={(e) => setNewSeedText(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-2xl text-xs shadow-lg transition flex items-center gap-2 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Tanam Benih</span>
                </button>
              </form>

              {/* Seed Cards Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {botaniSeeds.map((seed) => (
                  <div key={seed.id} className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 hover:border-emerald-800/40 transition">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
                        Dari: {seed.author}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">{seed.date}</span>
                    </div>
                    <p className="text-slate-300 text-sm italic mt-2 leading-relaxed">"{seed.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: KAPSUL WAKTU RAHASIA (PIN) ================= */}
        {activeTab === 'timelock' && (
          <div className="space-y-8 animate-fadeIn max-w-xl mx-auto">
            {!isUnlocked ? (
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl text-center shadow-2xl space-y-6">
                <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <Lock className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Kapsul Waktu Rahasia</h2>
                  <p className="text-xs text-slate-400 mt-1">Masukkan 4-angka PIN rahasia (PIN Default: 1234)</p>
                </div>

                <div className="flex justify-center gap-4 my-4">
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className={`w-4 h-4 rounded-full border-2 transition-all ${
                        inputPin.length > idx ? 'bg-rose-500 border-rose-500 scale-125' : 'border-slate-700 bg-slate-950'
                      }`}
                    />
                  ))}
                </div>

                {lockError && <p className="text-xs font-semibold text-rose-400">{lockError}</p>}

                <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'Clear', 0, 'Delete'].map((btn, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (btn === 'Clear') setInputPin('');
                        else if (btn === 'Delete') setInputPin(prev => prev.slice(0, -1));
                        else handleKeypadPress(String(btn));
                      }}
                      className="py-3.5 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold text-base rounded-2xl border border-slate-800 transition active:scale-95"
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-950/90 border border-rose-900/40 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                    <Unlock className="w-5 h-5 text-emerald-400" /> Kapsul Waktu Terbuka
                  </div>
                  <button onClick={() => setIsUnlocked(false)} className="text-slate-500 hover:text-slate-300">
                    <Lock className="w-4 h-4" />
                  </button>
                </div>

                <div className="prose text-slate-300 leading-relaxed text-sm whitespace-pre-line bg-slate-900/50 p-6 rounded-2xl border border-rose-900/20">
                  {displayedText}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: LOVE COMPASS & FLORAL QUIZ ================= */}
        {activeTab === 'compass' && (
          <div className="space-y-8 animate-fadeIn max-w-2xl mx-auto">
            <div className="bg-slate-900/70 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl text-center shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto mb-4">
                <Compass className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100">Love Compass & Quiz Kebun</h2>
              <p className="text-slate-400 text-xs mt-1 mb-8">Uji pemahaman dan tingkat kecocokan kompas cinta kalian!</p>

              {!quizFinished ? (
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 text-left">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-rose-400 font-mono">Soal {quizIndex + 1} dari {floralQuestions.length}</span>
                    <span className="text-xs text-slate-500">Skor: {quizScore}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-6">{floralQuestions[quizIndex].q}</h3>
                  <div className="space-y-3">
                    {floralQuestions[quizIndex].opts.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (i === floralQuestions[quizIndex].ans) setQuizScore(prev => prev + 1);
                          if (quizIndex + 1 < floralQuestions.length) setQuizIndex(prev => prev + 1);
                          else setQuizFinished(true);
                        }}
                        className="w-full text-left p-4 rounded-xl bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-700/50 text-sm transition text-slate-200"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-8 text-center">
                  <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-slate-100 mb-2">Quiz Selesai!</h3>
                  <p className="text-slate-400 text-sm mb-6">Skor Kecocokan: <span className="text-rose-400 font-bold text-xl">{quizScore} / {floralQuestions.length}</span></p>
                  <button
                    onClick={() => { setQuizIndex(0); setQuizScore(0); setQuizFinished(false); }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-6 py-3 rounded-2xl text-xs transition"
                  >
                    Ulangi Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Global Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-rose-400" /> Pengaturan Web Bucin
              </h3>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="text-xs font-bold text-slate-400">Nama Pasangan 1 & 2</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <input
                    type="text"
                    value={editNames.partner1}
                    onChange={(e) => setEditNames({ ...editNames, partner1: e.target.value })}
                    className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                  <input
                    type="text"
                    value={editNames.partner2}
                    onChange={(e) => setEditNames({ ...editNames, partner2: e.target.value })}
                    className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400">Tanggal Jadian</label>
                <input
                  type="date"
                  value={editAnniversary}
                  onChange={(e) => setEditAnniversary(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400">PIN Rahasia Brankas (4 Angka)</label>
                <input
                  type="text"
                  maxLength={4}
                  value={editPin}
                  onChange={(e) => setEditPin(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-center font-mono font-bold"
                />
              </div>

              <button
                onClick={() => {
                  setPartnerNames(editNames);
                  setAnniversaryDate(`${editAnniversary}T00:00:00`);
                  setSecretPasscode(editPin);
                  setShowSettings(false);
                  showToast("✨ Pengaturan Berhasil Disimpan!");
                }}
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl mt-4 shadow-lg"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Floating Bottom Bar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-slate-900/90 backdrop-blur-xl border border-rose-900/40 rounded-full p-2 shadow-2xl flex items-center justify-around">
        {[
          { id: 'garden', icon: Flower2 },
          { id: 'studio', icon: Wand2 },
          { id: 'seeds', icon: Feather },
          { id: 'timelock', icon: Lock },
          { id: 'compass', icon: Compass }
        ].map((item) => {
          const IconComp = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`p-2.5 rounded-full transition ${
                isActive ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400'
              }`}
            >
              <IconComp className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
