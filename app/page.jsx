'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Heart, Sparkles, Calendar, Clock, Music, Pause, VolumeX,
  Gift, Lock, Unlock, X, RotateCcw, BookOpen, Star, Sliders,
  Flower2, Feather, Send, Disc, Mail, Droplets, Camera, ImageIcon,
  Sparkle, CheckCircle2, ChevronRight
} from 'lucide-react';

// --- CANVAS PARTIKEL BINTANG & KELOPAK BERKILAU ---
function OrganicCanvas() {
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

    const petals = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 6 + 3,
      speedY: Math.random() * 0.5 + 0.2,
      speedX: Math.sin(Math.random() * Math.PI * 2) * 0.4,
      angle: Math.random() * 360,
      spin: Math.random() * 1.5 - 0.75,
      color: `rgba(${Math.floor(Math.random() * 50 + 205)}, ${Math.floor(Math.random() * 60 + 160)}, ${Math.floor(Math.random() * 80 + 120)}, ${Math.random() * 0.35 + 0.15})`
    }));

    let sparks = [];
    const handleCanvasClick = (e) => {
      for (let i = 0; i < 7; i++) {
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          size: Math.random() * 4 + 2,
          opacity: 1,
          color: `hsl(${Math.floor(Math.random() * 40 + 330)}, 85%, 70%)`
        });
      }
    };
    window.addEventListener('click', handleCanvasClick);

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

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      sparks.forEach((s, index) => {
        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= 0.025;

        ctx.beginPath();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, s.opacity);
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        if (s.opacity <= 0) sparks.splice(index, 1);
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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-70" />;
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef(null);

  // States Utama
  const [anniversaryDate, setAnniversaryDate] = useState('2023-02-14T00:00:00');
  const [partnerNames, setPartnerNames] = useState({ partner1: 'Alex', partner2: 'Taylor', nickname: 'Romance Journal' });
  const [partnerStatus, setPartnerStatus] = useState({
    partner1Status: 'Sedang Kangen berat 💖',
    partner2Status: 'Merawat Bunga Kebun 🌸',
    quote: 'Kamu adalah halaman favorit dari seluruh kisah hidup yang pernah aku tulis.'
  });

  const [couplePhotos, setCouplePhotos] = useState({
    photo1: '/photo1.jpg',
    photo2: '/photo2.jpg'
  });

  const [activeTab, setActiveTab] = useState('journal');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Streak Siram Tanaman
  const [waterStreak, setWaterStreak] = useState(16);
  const [isWateredToday, setIsWateredToday] = useState(false);

  // Piringan Puisi
  const poemList = [
    { title: "Mekar Senja", text: "Di antara jingga malam, senyumanmu adalah kedamaian yang selalu aku cari." },
    { title: "Embun Musim Semi", text: "Seperti tetes air di pagi hari, kehadiranmu selalu menyegarkan jiwaku." },
    { title: "Lagu Bintang", text: "Tak perlu kata-kata rumit, berada di sampingmu sudah cukup bikin sempurna." },
    { title: "Kepingan Abadi", text: "Terima kasih telah menjadi bagian tercantik di setiap bab kehidupanku." }
  ];
  const [selectedPoem, setSelectedPoem] = useState(poemList[0]);

  // Catatan Apresiasi
  const [gratitudeNotes, setGratitudeNotes] = useState([
    { id: 1, text: 'Terima kasih selalu sabar mendengarkan cerita random-ku setiap malam.', author: 'Alex', date: 'Hari Ini' },
    { id: 2, text: 'Ingat ya, kamu adalah orang paling hebat yang pernah aku temui!', author: 'Taylor', date: 'Kemarin' }
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  // Kupon Cinta
  const [coupons, setCoupons] = useState([
    { id: 1, title: 'Bebas Pilih Kuliner', desc: 'Pilih restoran apa aja, aku yang pesan & bayar!', tag: 'Food', status: 'Available' },
    { id: 2, title: 'Pelukan Hangat 10 Menit', desc: 'Tukarkan kapan saja kamu butuh semangat atau merasa lelah.', tag: 'Comfort', status: 'Available' },
    { id: 3, title: 'Boba Delivery Instant', desc: 'Langsung dipesankan es boba manis favoritmu ke rumah.', tag: 'Treat', status: 'Available' }
  ]);

  // Timeline Memory
  const [timelineEvents, setTimelineEvents] = useState([
    { id: 1, date: '15 Okt 2022', title: 'Awal Kata Menyapa', desc: 'Momen manis saat kita pertama kali bertukar cerita.', icon: '☕' },
    { id: 2, date: '02 Nov 2022', title: 'Kencan Pertama Kita', desc: 'Jalan-jalan santai sambil minum boba sampai larut.', icon: '🌌' },
    { id: 3, date: '14 Feb 2023', title: 'Janji Menyatu', desc: 'Hari di mana kita memutuskan untuk berjalan bersama selamanya.', icon: '💍' }
  ]);

  // Amplop Rahasia PIN
  const [secretPasscode, setSecretPasscode] = useState('1234');
  const [inputPin, setInputPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [lockError, setLockError] = useState('');
  const [secretLetter, setSecretLetter] = useState(
`Untuk Bunga Terindahku ❤️,

Jika kamu membuka amplop rahasia ini, berarti kamu sudah memasukkan PIN jadian kita.

Aku cuma mau bilang terima kasih ya sudah menjadi alasan di balik senyumku setiap hari. Web romantis ini aku buat khusus untuk menyimpan kenangan indah kita berdua.

Semoga web ini selalu bisa jadi pelukan hangat kapan saja kamu merindukanku.

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
  const [editPhoto1, setEditPhoto1] = useState(couplePhotos.photo1);
  const [editPhoto2, setEditPhoto2] = useState(couplePhotos.photo2);

  // Auto Scroll ke Atas saat Ganti Tab
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Hydration Safety
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const savedAnniversary = localStorage.getItem('organic_anniversary');
      if (savedAnniversary) {
        setAnniversaryDate(savedAnniversary);
        setEditAnniversary(savedAnniversary.split('T')[0]);
      }
      const savedPartners = localStorage.getItem('organic_partners');
      if (savedPartners) {
        const parsed = JSON.parse(savedPartners);
        setPartnerNames(parsed);
        setEditNames(parsed);
      }
    }
  }, []);

  // Timer Calculator
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

  // Audio Toggle (/shapeofmyheart.mp3)
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

  const handleWaterGarden = () => {
    if (!isWateredToday) {
      setIsWateredToday(true);
      setWaterStreak(prev => prev + 1);
      showToast("💧 Tanaman Kebun Disiram! Streak Bertambah 🔥");
    } else {
      showToast("Tanaman sudah disiram hari ini. Kembali besok ya! 🌸");
    }
  };

  // Typewriter Letter
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
          showToast("🔓 Amplop Rahasia Berhasil Dibuka!");
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
          <span className="font-bold text-lg">Membuka Portal Cinta Organik... 🌸</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-rose-950/90 to-slate-950 text-slate-100 font-serif relative overflow-x-hidden pb-32 pt-6">
      {/* Audio Element */}
      <audio ref={audioRef} src="/shapeofmyheart.mp3" loop prefetch="auto" />

      {/* Canvas Partikel Organik */}
      <OrganicCanvas />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-rose-600/90 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border border-rose-400/40 backdrop-blur-md font-sans">
          <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* FLOATING CREST HEADER */}
      <header className="max-w-xl mx-auto px-4 mb-8">
        <div className="bg-slate-900/60 border border-rose-900/40 rounded-full p-2 px-6 backdrop-blur-xl shadow-2xl flex items-center justify-between font-sans">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabChange('journal')}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 p-0.5 shadow-md flex items-center justify-center">
              <Heart className="w-4 h-4 fill-slate-950 text-slate-950" />
            </div>
            <div>
              <h1 className="font-bold text-sm bg-gradient-to-r from-amber-200 via-rose-200 to-pink-200 bg-clip-text text-transparent">
                {partnerNames.partner1} & {partnerNames.partner2}
              </h1>
              <p className="text-[9px] text-amber-300/80 tracking-widest uppercase">{partnerNames.nickname}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMusic}
              className={`p-2 rounded-full transition border ${
                isPlayingMusic ? 'bg-rose-600 text-white border-rose-400 shadow-md' : 'bg-slate-950 text-amber-400 border-amber-900/40'
              }`}
            >
              {isPlayingMusic ? <Music className="w-3.5 h-3.5 animate-bounce" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 bg-slate-950 text-slate-300 border border-amber-900/40 rounded-full hover:bg-rose-950 transition"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Workspace Content Main */}
      <main className="max-w-5xl mx-auto px-4">

        {/* ================= 1. ORGANIC SCRAPBOOK JOURNAL ================= */}
        {activeTab === 'journal' && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* Organic Hero Banner dengan Foto Polaroid Berputar */}
            <div className="relative bg-gradient-to-br from-slate-900/90 via-rose-950/40 to-slate-900/90 border border-rose-900/30 rounded-[3rem] p-6 md:p-10 backdrop-blur-xl shadow-2xl">
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                
                {/* 2 Polaroid Photos Overlapping */}
                <div className="flex items-center justify-center gap-2 relative">
                  {/* Foto 1 (Miring Kiri) */}
                  <div className="bg-white p-3 pb-8 rounded-2xl shadow-2xl transform -rotate-6 hover:rotate-0 transition duration-300 border border-slate-200 w-36 md:w-40 text-center font-sans">
                    <div className="w-full h-36 md:h-40 bg-rose-100 rounded-xl overflow-hidden relative">
                      <img
                        src={couplePhotos.photo1}
                        alt="Foto 1"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden absolute inset-0 bg-slate-900 flex-col items-center justify-center text-slate-400 text-xs p-2">
                        <ImageIcon className="w-8 h-8 mb-1 text-rose-400" />
                        <span>Foto Kamu</span>
                      </div>
                    </div>
                    <span className="font-bold text-xs text-slate-800 mt-2 block">{partnerNames.partner1} 💕</span>
                  </div>

                  {/* Icon Heart Pin Middle */}
                  <div className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center z-10 animate-pulse">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  </div>

                  {/* Foto 2 (Miring Kanan) */}
                  <div className="bg-white p-3 pb-8 rounded-2xl shadow-2xl transform rotate-6 hover:rotate-0 transition duration-300 border border-slate-200 w-36 md:w-40 text-center font-sans">
                    <div className="w-full h-36 md:h-40 bg-pink-100 rounded-xl overflow-hidden relative">
                      <img
                        src={couplePhotos.photo2}
                        alt="Foto 2"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden absolute inset-0 bg-slate-900 flex-col items-center justify-center text-slate-400 text-xs p-2">
                        <ImageIcon className="w-8 h-8 mb-1 text-pink-400" />
                        <span>Foto Doi</span>
                      </div>
                    </div>
                    <span className="font-bold text-xs text-slate-800 mt-2 block">{partnerNames.partner2} 💖</span>
                  </div>
                </div>

                {/* Scrapbook Text */}
                <div className="text-center md:text-right max-w-md font-sans">
                  <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800/40 font-bold">
                    Romantic Scrapbook
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mt-3 font-serif">
                    Kisah Kasih {partnerNames.partner1} & {partnerNames.partner2}
                  </h2>
                  <p className="text-slate-300 text-sm mt-2 italic font-serif leading-relaxed">
                    "{partnerStatus.quote}"
                  </p>
                </div>
              </div>
            </div>

            {/* ORGANIC TIMER PODS */}
            <div className="bg-slate-900/60 border border-rose-900/30 rounded-[2.5rem] p-8 backdrop-blur-xl text-center shadow-2xl font-sans relative">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-950 text-rose-300 text-xs font-bold mb-6">
                <Clock className="w-4 h-4 text-rose-400" />
                <span>Timer Perjalanan Cinta</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                  { label: 'Hari', val: timeTogether.days },
                  { label: 'Jam', val: timeTogether.hours },
                  { label: 'Menit', val: timeTogether.minutes },
                  { label: 'Detik', val: timeTogether.seconds }
                ].map((t, idx) => (
                  <div key={idx} className="bg-gradient-to-b from-slate-950 to-rose-950/60 border border-rose-900/30 rounded-[2rem] p-5 text-center shadow-lg transform hover:scale-105 transition">
                    <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-pink-300 font-mono">
                      {t.val}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 mt-2 tracking-wider">{t.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* TANAMAN SIRAM STREAK ORGANIK */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-[2.5rem] p-6 md:p-8 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <Droplets className="w-7 h-7 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Streak Tanaman Cinta</span>
                    <span className="text-xs bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-800 font-mono font-bold">
                      {waterStreak} Hari 🔥
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 mt-1">Siram Tanaman Kebun Kita</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Jaga agar bunga di album ini selalu mekar setiap hari!</p>
                </div>
              </div>

              <button
                onClick={handleWaterGarden}
                disabled={isWateredToday}
                className={`px-6 py-3.5 rounded-2xl font-bold text-xs transition shadow-lg shrink-0 flex items-center gap-2 ${
                  isWateredToday
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                <Droplets className="w-4 h-4" />
                <span>{isWateredToday ? 'Sudah Disiram ✓' : 'Siram Tanaman Sekarang'}</span>
              </button>
            </div>

          </div>
        )}

        {/* ================= 2. GALERI FOTO POLAROID ================= */}
        {activeTab === 'photos' && (
          <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto font-sans">
            <div className="text-center max-w-md mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-3">
                <Camera className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100 font-serif">Galeri Foto Kenangan</h2>
              <p className="text-slate-400 text-xs mt-1">Abadikan foto-foto indah berdua di sini!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
              <div className="bg-white p-4 pt-4 pb-10 rounded-2xl shadow-2xl border border-slate-200 transform -rotate-2 hover:rotate-0 transition duration-300">
                <div className="w-full h-60 bg-slate-900 rounded-xl overflow-hidden relative">
                  <img
                    src={couplePhotos.photo1}
                    alt="Foto 1"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden absolute inset-0 bg-slate-900 flex-col items-center justify-center text-slate-400 text-xs p-4 text-center">
                    <Camera className="w-8 h-8 mb-2 text-rose-400" />
                    <span>Upload <b>photo1.jpg</b> ke folder public/</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-bold text-slate-800 text-sm">{partnerNames.partner1}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">"Momen indah yang selalu bikin tersenyum."</p>
                </div>
              </div>

              <div className="bg-white p-4 pt-4 pb-10 rounded-2xl shadow-2xl border border-slate-200 transform rotate-2 hover:rotate-0 transition duration-300">
                <div className="w-full h-60 bg-slate-900 rounded-xl overflow-hidden relative">
                  <img
                    src={couplePhotos.photo2}
                    alt="Foto 2"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden absolute inset-0 bg-slate-900 flex-col items-center justify-center text-slate-400 text-xs p-4 text-center">
                    <Camera className="w-8 h-8 mb-2 text-pink-400" />
                    <span>Upload <b>photo2.jpg</b> ke folder public/</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-bold text-slate-800 text-sm">{partnerNames.partner2}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">"Wajah favorit yang selalu aku rindukan."</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. PIRINGAN PUISI ================= */}
        {activeTab === 'wheel' && (
          <div className="space-y-8 animate-fadeIn max-w-2xl mx-auto">
            <div className="bg-slate-900/70 border border-rose-900/40 p-8 rounded-[2.5rem] text-center backdrop-blur-xl shadow-2xl relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center mx-auto mb-4 shadow-lg animate-spin-slow">
                <Disc className="w-7 h-7 text-slate-950" />
              </div>

              <h2 className="text-2xl font-bold text-slate-100 font-serif">Piringan Puisi Cinta</h2>
              <p className="text-slate-400 text-xs mt-1 font-sans">Putar piringan puisi untuk membaca bait kata-kata tersirat!</p>

              <div className="grid grid-cols-2 gap-3 mt-6 font-sans">
                {poemList.map((poem, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPoem(poem)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition ${
                      selectedPoem.title === poem.title
                        ? 'bg-rose-600 text-white border-rose-500 shadow-lg'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {poem.title}
                  </button>
                ))}
              </div>

              <div className="mt-6 bg-slate-950/90 border border-rose-900/40 rounded-3xl p-6 text-center shadow-inner">
                <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800/40 font-sans">
                  {selectedPoem.title}
                </span>
                <p className="text-rose-100 text-base italic mt-4 leading-relaxed font-serif">
                  "{selectedPoem.text}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. CATATAN TEMPEL ================= */}
        {activeTab === 'notes' && (
          <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto font-sans">
            <div className="bg-slate-900/60 border border-slate-800 p-6 md:p-8 rounded-[2.5rem] backdrop-blur-md">
              <div className="text-center max-w-md mx-auto mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-2">
                  <Feather className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-100 font-serif">Catatan Tempel Apresiasi</h2>
                <p className="text-slate-400 text-xs mt-1">Tempelkan ucapan pujian & rasa terima kasih harian di sini.</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (!newNoteText.trim()) return;
                setGratitudeNotes([{ id: Date.now(), text: newNoteText.trim(), author: partnerNames.partner1, date: 'Baru Saja' }, ...gratitudeNotes]);
                setNewNoteText('');
                showToast("✨ Catatan Apresiasi Berhasil Ditempel!");
              }} className="flex gap-3 mb-6">
                <input
                  type="text"
                  required
                  placeholder="Tulis pesan manis hari ini..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition"
                />
                <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-2xl text-xs shadow-lg transition">
                  Tempel
                </button>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gratitudeNotes.map((note) => (
                  <div key={note.id} className="bg-amber-100/10 border border-amber-500/20 rounded-2xl p-5 backdrop-blur-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
                        Dari: {note.author}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">{note.date}</span>
                    </div>
                    <p className="text-slate-200 text-sm italic mt-2 leading-relaxed font-serif">"{note.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= 5. KUPON CINTA TIKET ORGANIK ================= */}
        {activeTab === 'coupons' && (
          <div className="space-y-8 animate-fadeIn font-sans max-w-4xl mx-auto">
            <div className="text-center max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-slate-100 font-serif">Kupon Spesial Pasangan</h2>
              <p className="text-slate-400 text-xs mt-1">Tukarkan kupon ini untuk klaim hadiah spesialmu!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {coupons.map((c) => (
                <div key={c.id} className="relative bg-slate-900/80 border border-rose-900/40 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden shadow-xl">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950 border-r border-rose-900/40" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950 border-l border-rose-900/40" />

                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-300 bg-rose-950 px-2.5 py-1 rounded-full border border-rose-800">{c.tag}</span>
                    <h4 className="font-bold text-slate-100 text-base mt-3">{c.title}</h4>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">{c.desc}</p>
                  </div>

                  <button
                    disabled={c.status !== 'Available'}
                    onClick={() => {
                      setCoupons(coupons.map(item => item.id === c.id ? { ...item, status: 'Redeemed' } : item));
                      showToast("🎉 Kupon Berhasil Ditukarkan!");
                    }}
                    className={`w-full py-3 rounded-2xl font-bold text-xs mt-6 transition ${
                      c.status === 'Available' ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {c.status === 'Available' ? 'Tukarkan Kupon' : 'Sudah Terpakai ✓'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 6. AMPLOP SURAT RAHASIA PIN ================= */}
        {activeTab === 'secret' && (
          <div className="space-y-8 animate-fadeIn max-w-lg mx-auto font-sans">
            {!isUnlocked ? (
              <div className="bg-slate-900/80 border border-rose-900/40 rounded-[2.5rem] p-8 backdrop-blur-xl text-center shadow-2xl space-y-6">
                <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 font-serif">Amplop Surat Rahasia</h2>
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
                      className="py-3 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold text-base rounded-2xl border border-slate-800 transition active:scale-95"
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-950/90 border border-rose-900/40 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                    <Unlock className="w-5 h-5 text-emerald-400" /> Surat Rahasia Terbuka
                  </div>
                  <button onClick={() => setIsUnlocked(false)} className="text-slate-500 hover:text-slate-300">
                    <Lock className="w-4 h-4" />
                  </button>
                </div>

                <div className="prose text-rose-100 leading-relaxed text-sm whitespace-pre-line bg-slate-900/60 p-6 rounded-2xl border border-rose-900/20 font-serif">
                  {displayedText}
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
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
                <label className="text-xs font-bold text-slate-400">Path File Foto 1 & 2</label>
                <div className="space-y-2 mt-1">
                  <input
                    type="text"
                    placeholder="/photo1.jpg"
                    value={editPhoto1}
                    onChange={(e) => setEditPhoto1(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="/photo2.jpg"
                    value={editPhoto2}
                    onChange={(e) => setEditPhoto2(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
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
                <label className="text-xs font-bold text-slate-400">PIN Rahasia Amplop (4 Angka)</label>
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
                  const updatedPhotos = { photo1: editPhoto1, photo2: editPhoto2 };
                  setCouplePhotos(updatedPhotos);
                  if (typeof window !== 'undefined') localStorage.setItem('organic_photos', JSON.stringify(updatedPhotos));
                  setShowSettings(false);
                  showToast("✨ Pengaturan Disimpan!");
                }}
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl mt-4 shadow-lg"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING BLOSSOM DOCK */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 backdrop-blur-xl border border-rose-900/40 rounded-full p-1.5 px-3 shadow-2xl flex items-center gap-1 font-sans">
        {[
          { id: 'journal', icon: BookOpen },
          { id: 'photos', icon: Camera },
          { id: 'wheel', icon: Disc },
          { id: 'notes', icon: Feather },
          { id: 'coupons', icon: Gift },
          { id: 'secret', icon: Mail }
        ].map((item) => {
          const IconComp = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`p-2.5 rounded-full transition-all relative ${
                isActive ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-900/50 scale-110' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconComp className="w-4 h-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
