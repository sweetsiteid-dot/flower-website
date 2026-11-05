'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Heart, Sparkles, Calendar, Clock, Music, Pause, VolumeX,
  Gift, Plus, Lock, Unlock, Edit, Trash2, X, ChevronRight, 
  RotateCcw, BookOpen, Star, Sliders, ArrowRight, 
  Flower2, Feather, Compass, Send, Layers, Trophy, CheckCircle2,
  Smile, Flame, Droplets, Wand, Compass as CompassIcon, Sparkle
} from 'lucide-react';

// --- CANVAS ANIMASI KELOPAK BUNGA & MEKAR SAAT DIKLIK ---
function PetalBloomCanvas() {
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
    const petals = Array.from({ length: 30 }, () => ({
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

    // Bunga Mekar Saat Layar Diklik
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

    const drawBloom = (b) => {
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
        drawBloom(b);
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

  // States Utama
  const [anniversaryDate, setAnniversaryDate] = useState('2023-02-14T00:00:00');
  const [partnerNames, setPartnerNames] = useState({ partner1: 'Alex', partner2: 'Taylor', nickname: 'Taman Bintang Abadi' });
  const [partnerStatus, setPartnerStatus] = useState({
    partner1Status: 'Sedang Kangen berat 💖',
    partner2Status: 'Merawat Bunga Kebun 🌸',
    quote: 'Di antara ribuan bintang, kamu adalah kelopak bunga terindah di hidupku.'
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // 1. FITUR: Water Garden & EXP Level Hubungan
  const [waterStreak, setWaterStreak] = useState(14);
  const [gardenLevel, setGardenLevel] = useState(5);
  const [gardenExp, setGardenExp] = useState(70);
  const [isWateredToday, setIsWateredToday] = useState(false);

  // 2. FITUR: Kartu Ramalan Cinta Harian (Love Fortune)
  const loveFortunes = [
    { title: "Kencan Penuh Manis", desc: "Hari ini adalah hari yang pas buat makan es krim bareng atau jalan-jalan santai!", tag: "Hoki Cinta 100%" },
    { title: "Gelombang Pelukan", desc: "Pasanganmu sedang butuh pelukan hangat 10 detik ekstra hari ini.", tag: "Kasih Sayang" },
    { title: "Kejutan Kecil", desc: "Akan ada momen ngobrol lucu yang bikin kalian berdua ketawa lepas.", tag: "Momen Spesial" },
    { title: "Kedamaian Jiwa", desc: "Hubungan kalian sedang di fase paling stabil dan penuh kedamaian.", tag: "Harmonis" }
  ];
  const [activeFortune, setActiveFortune] = useState(null);

  // 3. FITUR: Botanical Bloom & Poem Studio
  const flowerTypes = [
    { name: 'Mawar Midnight', color: 'from-pink-500 via-rose-500 to-purple-600', poem: 'Di setiap pendar cahayamu, ada kehangatan yang tak pernah padam oleh waktu.' },
    { name: 'Teratai Kristal', color: 'from-cyan-400 via-teal-300 to-pink-400', poem: 'Tenang dan anggun, kehadiranmu seperti telaga jernih di bawah sinar rembulan.' },
    { name: 'Anggrek Emas', color: 'from-amber-300 via-yellow-200 to-rose-400', poem: 'Senyumanmu adalah mentari pagi yang selalu berhasil mencairkan dinginnya hari.' },
    { name: 'Lily Starlight', color: 'from-indigo-400 via-purple-300 to-pink-500', poem: 'Misteri terindah yang selalu ingin aku pelajari dan cintai setiap harinya.' }
  ];
  const [selectedFlower, setSelectedFlower] = useState(flowerTypes[0]);

  // 4. FITUR: Papan Benih Apresiasi (Gratitude Jar)
  const [gratitudeNotes, setGratitudeNotes] = useState([
    { id: 1, text: 'Terima kasih selalu sabar dengerin cerita random-ku setiap malam.', author: 'Alex', time: 'Hari Ini' },
    { id: 2, text: 'Ingat ya, kamu itu selalu cukup dan paling luar biasa di mataku!', author: 'Taylor', time: 'Kemarin' }
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  // 5. FITUR: Kupon Hadiah & Bucket List
  const [coupons, setCoupons] = useState([
    { id: 1, title: 'Bebas Pilihan Kuliner', desc: 'Bebas pilih makanan tanpa kata "terserah". I handle the bill!', tag: 'Kuliner', status: 'Available', code: 'TREAT-VIP' },
    { id: 2, title: 'Pelukan Hangat 5 Menit', desc: 'Berlaku kapan saja saat kamu lagi merasa capek atau butuh semangat.', tag: 'Comfort', status: 'Available', code: 'HUG-PAS' },
    { id: 3, title: 'Boba & Snack Delivery', desc: 'Tukarkan kupon ini untuk langsung dipesankan boba favoritmu.', tag: 'Sweet', status: 'Available', code: 'BOBA-LOVE' }
  ]);

  const [bucketList, setBucketList] = useState([
    { id: 1, title: 'Piknik di Taman Bunga Sakura / Lavender', completed: true },
    { id: 2, title: 'Masak Makanan Favorit Berdua di Rumah', completed: true },
    { id: 3, title: 'Stargazing Menikmati Sunrise di Puncak', completed: false },
    { id: 4, title: 'Road Trip Spontan Tanpa Rencana', completed: false }
  ]);

  // 6. FITUR: Jejak Kenangan (Timeline)
  const [timeline, setTimeline] = useState([
    { id: 1, date: '15 Oktober 2022', title: 'Pertemuan Pertama', desc: 'Momen awal obrolan manis yang mengalir hangat di kafe favorit.', icon: '☕' },
    { id: 2, date: '02 November 2022', title: 'Kencan Pertama', desc: 'Nonton bioskop dan ngobrol berdua sampai larut malam.', icon: '🌌' },
    { id: 3, date: '14 Februari 2023', title: 'Resmi Jadian', desc: 'Mengikat janji untuk selalu saling merawat dan saling mendukung.', icon: '💍' }
  ]);

  // 7. FITUR: Kapsul Waktu Rahasia (PIN 1234)
  const [secretPasscode, setSecretPasscode] = useState('1234');
  const [inputPin, setInputPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [lockError, setLockError] = useState('');
  const [secretLetter, setSecretLetter] = useState(
`Untuk Bunga Terindahku ❤️,

Jika kamu membaca tulisan ini, berarti kamu sudah membuka kapsul waktu rahasia kita.

Aku cuma mau bilang terima kasih ya sudah bertahan dan mau tumbuh bersama sejauh ini. Kebaikan hatimu selalu terasa ajaib bagi hidupku.

Semoga web kecil ini selalu bisa jadi tempat pulang yang manis buat kamu kapan saja kamu kangen.

Dengan Cinta Abadi,
— Pasangan Bucinmu 💕`
  );
  const [displayedText, setDisplayedText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);

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
      const savedAnniversary = localStorage.getItem('botanical_anniversary');
      if (savedAnniversary) {
        setAnniversaryDate(savedAnniversary);
        setEditAnniversary(savedAnniversary.split('T')[0]);
      }
      const savedPartners = localStorage.getItem('botanical_partners');
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

  // Audio Handler (/shapeofmyheart.mp3)
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
      const newExp = gardenExp + 30;
      if (newExp >= 100) {
        setGardenLevel(prev => prev + 1);
        setGardenExp(newExp - 100);
        showToast("🎉 LEVEL UP! Kebun Cinta Naik Level! 🌸");
      } else {
        setGardenExp(newExp);
        showToast("💧 Kebun Disiram! Streak Bertambah 🔥");
      }
    } else {
      showToast("Kebun sudah disiram hari ini. Kembali besok ya! 🌸");
    }
  };

  // Add Gratitude Note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const item = { id: Date.now(), text: newNoteText.trim(), author: partnerNames.partner1, time: 'Baru Saja' };
    setGratitudeNotes([item, ...gratitudeNotes]);
    setNewNoteText('');
    showToast("🌱 Pesan Apresiasi Berhasil Ditanam!");
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

  const completedBucketCount = bucketList.filter(b => b.completed).length;

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-rose-300 font-sans">
        <div className="animate-pulse flex items-center gap-3">
          <Flower2 className="w-8 h-8 text-pink-400 animate-spin" />
          <span className="font-bold text-lg">Membuka Portal Kebun Cinta... 🌸</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-slate-100 font-sans relative overflow-x-hidden pb-28">
      {/* Pemutar Audio shapeofmyheart.mp3 */}
      <audio ref={audioRef} src="/shapeofmyheart.mp3" loop prefetch="auto" />

      {/* Interactive Background Canvas */}
      <PetalBloomCanvas />

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
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleTabChange('dashboard')}>
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
              { id: 'dashboard', label: 'Dashboard', icon: Layers },
              { id: 'bloom', label: 'Bloom Studio', icon: Flower2 },
              { id: 'gratitude', label: 'Papan Apresiasi', icon: Feather },
              { id: 'rewards', label: 'Kupon & Goals', icon: Gift },
              { id: 'timeline', label: 'Timeline', icon: Calendar },
              { id: 'secret', label: 'Kapsul PIN', icon: Lock }
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

          {/* Quick Controls */}
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

      {/* Main Content Workspace */}
      <main className="max-w-6xl mx-auto px-4 pt-8">

        {/* ================= 1. BENTO GRID DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header Couple Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-purple-950/70 p-6 md:p-10 border border-rose-800/40 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 p-1 shadow-xl">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-2xl font-black text-rose-300">
                    {partnerNames.partner1.charAt(0)}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center animate-pulse">
                  <Heart className="w-5 h-5 fill-rose-400 text-rose-400" />
                </div>
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 p-1 shadow-xl">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-2xl font-black text-purple-300">
                    {partnerNames.partner2.charAt(0)}
                  </div>
                </div>
              </div>

              <div className="text-center md:text-right">
                <span className="text-[10px] uppercase tracking-widest text-rose-400 font-bold bg-rose-950 px-3 py-1 rounded-full border border-rose-800/40">
                  Status Kebun Cinta
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 mt-2">{partnerNames.partner1} ❤️ {partnerNames.partner2}</h2>
                <p className="text-xs text-rose-200/80 italic mt-1">"{partnerStatus.quote}"</p>
              </div>
            </div>

            {/* BENTO GRID WORKSPACE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Bento 1: Live Counter */}
              <div className="md:col-span-2 bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                    <Clock className="w-4 h-4" /> Live Love Counter
                  </div>
                  <span className="text-[10px] text-slate-500">Sejak 14 Feb 2023</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                  {[
                    { label: 'Hari', val: timeTogether.days },
                    { label: 'Jam', val: timeTogether.hours },
                    { label: 'Menit', val: timeTogether.minutes },
                    { label: 'Detik', val: timeTogether.seconds }
                  ].map((t, i) => (
                    <div key={i} className="bg-slate-950/80 border border-rose-900/30 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-pink-400 font-mono">
                        {t.val}
                      </div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 mt-1">{t.label}</div>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-slate-400 text-center md:text-left mt-2">
                  Telah bersama memekarkan kenangan indah setiap detiknya 💖
                </div>
              </div>

              {/* Bento 2: Water Streak & EXP Level */}
              <div className="bg-gradient-to-br from-slate-900 via-rose-950/50 to-slate-900 border border-rose-900/40 rounded-3xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                      <Droplets className="w-4 h-4" /> Water Streak
                    </span>
                    <span className="text-xs font-mono font-bold bg-blue-950 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-800">
                      {waterStreak} Hari 🔥
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-100">Level Kebun: Lvl {gardenLevel}</h3>
                  <div className="w-full bg-slate-950 rounded-full h-3 mt-3 overflow-hidden p-0.5 border border-slate-800">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500" style={{ width: `${gardenExp}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block text-right">{gardenExp} / 100 EXP</span>
                </div>

                <button
                  onClick={handleWaterGarden}
                  disabled={isWateredToday}
                  className={`w-full py-3 rounded-2xl font-bold text-xs mt-6 transition flex items-center justify-center gap-2 ${
                    isWateredToday
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg'
                  }`}
                >
                  <Droplets className="w-4 h-4" />
                  <span>{isWateredToday ? 'Sudah Disiram ✓' : 'Siram Kebun (+30 EXP)'}</span>
                </button>
              </div>

              {/* Bento 3: Kartu Ramalan Cinta Harian */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                    <Sparkle className="w-4 h-4" /> Ramalan Cinta Harian
                  </div>

                  {activeFortune ? (
                    <div className="bg-slate-950/80 border border-amber-900/40 rounded-2xl p-4 text-center animate-scaleUp">
                      <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-800">
                        {activeFortune.tag}
                      </span>
                      <h4 className="font-bold text-slate-100 mt-2 text-sm">{activeFortune.title}</h4>
                      <p className="text-slate-300 text-xs mt-2 italic">"{activeFortune.desc}"</p>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-xs text-slate-400">Klik tombol di bawah untuk membuka kartu pesan kejutan harianmu!</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    const rnd = loveFortunes[Math.floor(Math.random() * loveFortunes.length)];
                    setActiveFortune(rnd);
                    showToast("✨ Kartu Ramalan Berhasil Dibuka!");
                  }}
                  className="w-full py-3 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold text-xs rounded-2xl shadow-lg mt-4 transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Buka Kartu Harian</span>
                </button>
              </div>

              {/* Bento 4: Quick Shortcuts */}
              <div
                onClick={() => handleTabChange('bloom')}
                className="bg-slate-900/70 border border-slate-800 hover:border-rose-700/50 p-6 rounded-3xl cursor-pointer transition flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-800">Studio</span>
                  <h3 className="font-bold text-slate-100 text-base mt-2">Bloom & Poem Studio</h3>
                  <p className="text-xs text-slate-400 mt-1">Rajik racikan bunga & puisi cinta</p>
                </div>
                <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-400 group-hover:scale-110 transition border border-rose-500/20">
                  <Flower2 className="w-6 h-6" />
                </div>
              </div>

              <div
                onClick={() => handleTabChange('secret')}
                className="bg-slate-900/70 border border-slate-800 hover:border-purple-700/50 p-6 rounded-3xl cursor-pointer transition flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-950 px-2.5 py-0.5 rounded-full border border-purple-800">Brankas</span>
                  <h3 className="font-bold text-slate-100 text-base mt-2">Kapsul Waktu PIN</h3>
                  <p className="text-xs text-slate-400 mt-1">Buka surat rahasia ber-PIN</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400 group-hover:scale-110 transition border border-purple-500/20">
                  <Lock className="w-6 h-6" />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= 2. BLOOM & POEM STUDIO ================= */}
        {activeTab === 'bloom' && (
          <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto">
            <div className="bg-slate-900/70 border border-rose-900/40 p-8 rounded-3xl text-center backdrop-blur-xl shadow-2xl relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-900/50">
                <Flower2 className="w-8 h-8 text-white animate-spin-slow" />
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100">Botanical Bloom & Poem Studio</h2>
              <p className="text-slate-400 text-xs md:text-sm mt-2 max-w-md mx-auto">
                Pilih kombinasi bunga favoritmu dan nikmati karya puisi cinta romantis tersirat!
              </p>

              {/* Flower Selector */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {flowerTypes.map((fl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedFlower(fl)}
                    className={`p-4 rounded-2xl border cursor-pointer transition text-center ${
                      selectedFlower.name === fl.name
                        ? 'bg-rose-950/80 border-rose-500 shadow-lg scale-105'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full mx-auto bg-gradient-to-tr ${fl.color} p-0.5 shadow-md mb-3`}>
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                        <Flower2 className="w-6 h-6 text-rose-300" />
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200">{fl.name}</h4>
                  </div>
                ))}
              </div>

              {/* Display Poem Card */}
              <div className="mt-8 bg-slate-950/90 border border-rose-900/40 rounded-3xl p-8 max-w-xl mx-auto text-center shadow-inner relative">
                <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800/40">
                  Hasil Karya Puisi Bunga
                </span>
                <p className="text-rose-200 text-base md:text-lg font-serif italic mt-6 leading-relaxed">
                  "{selectedFlower.poem}"
                </p>
                <div className="mt-6 pt-4 border-t border-slate-800 text-slate-500 text-xs">
                  Dipersembahkan untuk <span className="text-rose-300 font-bold">{partnerNames.partner2}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. PAPAN BENIH APRESIASI ================= */}
        {activeTab === 'gratitude' && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            <div className="bg-slate-900/60 border border-slate-800 p-6 md:p-8 rounded-3xl backdrop-blur-md">
              <div className="text-center max-w-md mx-auto mb-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <Feather className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-slate-100">Papan Benih Apresiasi</h2>
                <p className="text-slate-400 text-xs mt-1">Tanam ucapan rasa terima kasih dan apresiasi kecil harian di sini.</p>
              </div>

              {/* Input Form */}
              <form onSubmit={handleAddNote} className="flex gap-3 mb-8">
                <input
                  type="text"
                  required
                  placeholder="Tulis ucapan terima kasih / pujian kecil hari ini..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-2xl text-xs shadow-lg transition flex items-center gap-2 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Tanam Pesan</span>
                </button>
              </form>

              {/* Notes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gratitudeNotes.map((note) => (
                  <div key={note.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-emerald-800/40 transition">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
                        Dari: {note.author}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">{note.time}</span>
                    </div>
                    <p className="text-slate-300 text-sm italic mt-2 leading-relaxed">"{note.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. KUPON & BUCKET LIST ================= */}
        {activeTab === 'rewards' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Vouchers Section */}
            <div>
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-4">
                <Gift className="w-5 h-5 text-pink-400" /> Kupon Spesial Siap Tukar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {coupons.map((c) => (
                  <div key={c.id} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] uppercase font-bold text-pink-400 bg-pink-950 px-2 py-0.5 rounded-full border border-pink-800">{c.tag}</span>
                        <span className="text-xs font-mono text-slate-500">{c.code}</span>
                      </div>
                      <h4 className="font-bold text-slate-100 text-base">{c.title}</h4>
                      <p className="text-slate-400 text-xs mt-1">{c.desc}</p>
                    </div>
                    <button
                      disabled={c.status !== 'Available'}
                      onClick={() => {
                        setCoupons(coupons.map(item => item.id === c.id ? { ...item, status: 'Redeemed' } : item));
                        showToast("🎉 Kupon Berhasil Ditukarkan!");
                      }}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs mt-4 transition ${
                        c.status === 'Available' ? 'bg-pink-600 hover:bg-pink-500 text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {c.status === 'Available' ? 'Tukarkan Kupon' : 'Sudah Terpakai ✓'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Bucket List Section */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-md">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400" /> Target Impian (Bucket List)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{completedBucketCount} dari {bucketList.length} impian telah terwujud</p>
                </div>
                <span className="text-xl font-black text-amber-400">
                  {Math.round((completedBucketCount / bucketList.length) * 100)}%
                </span>
              </div>

              <div className="space-y-2">
                {bucketList.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      setBucketList(bucketList.map(item => item.id === b.id ? { ...item, completed: !item.completed } : item));
                    }}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                      b.completed ? 'bg-slate-950/60 border-slate-800 text-slate-500 line-through' : 'bg-slate-900 border-slate-800 text-slate-200'
                    }`}
                  >
                    <span className="text-xs font-semibold">{b.title}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${b.completed ? 'border-amber-400 bg-amber-400/20 text-amber-400' : 'border-slate-700'}`}>
                      {b.completed && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= 5. TIMELINE KENANGAN ================= */}
        {activeTab === 'timeline' && (
          <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto">
            <div className="bg-slate-900/60 border border-slate-800 p-6 md:p-8 rounded-3xl backdrop-blur-md">
              <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2 mb-6">
                <Calendar className="w-6 h-6 text-rose-400" />
                Jejak Momen Kenangan
              </h2>

              <div className="relative border-l-2 border-rose-900/40 ml-4 space-y-8">
                {timeline.map((item) => (
                  <div key={item.id} className="relative pl-8 group">
                    <div className="absolute -left-4 top-1 w-8 h-8 rounded-full bg-slate-950 border-2 border-rose-500 flex items-center justify-center text-sm">
                      {item.icon}
                    </div>
                    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-rose-800/40 transition">
                      <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">{item.date}</span>
                      <h3 className="text-base font-bold text-slate-100 mt-1">{item.title}</h3>
                      <p className="text-slate-400 text-xs mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= 6. KAPSUL WAKTU RAHASIA (PIN) ================= */}
        {activeTab === 'secret' && (
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

      </main>

      {/* Settings Modal */}
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

      {/* Mobile Floating Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-slate-900/90 backdrop-blur-xl border border-rose-900/40 rounded-full p-2 shadow-2xl flex items-center justify-around">
        {[
          { id: 'dashboard', icon: Layers },
          { id: 'bloom', icon: Flower2 },
          { id: 'gratitude', icon: Feather },
          { id: 'rewards', icon: Gift },
          { id: 'timeline', icon: Calendar },
          { id: 'secret', icon: Lock }
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
