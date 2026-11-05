'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Crown, Heart, Sparkles, Clock, Music, VolumeX,
  Gift, Lock, Unlock, X, BookOpen, Star, Sliders,
  Feather, Send, Disc, Mail, Droplets, Camera, ImageIcon,
  CheckCircle2, Compass, Award, Package, Sparkle, Wand2, Moon,
  Flame, Gem, Orbit, HelpCircle, Coins
} from 'lucide-react';

// --- CANVAS PARTIKEL BINTANG JATUH & SERBUK PERI (PIXIE DUST) ---
function FairytaleMagicalCanvas() {
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

    // Partikel Bintang Latar
    const stars = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 1,
      speedY: Math.random() * 0.3 + 0.1,
      speedX: Math.sin(Math.random() * Math.PI * 2) * 0.2,
      opacity: Math.random() * 0.8 + 0.2,
      pulse: Math.random() * 0.03 + 0.01,
      color: Math.random() > 0.4 ? '#fef08a' : Math.random() > 0.5 ? '#e9d5ff' : '#f472b6'
    }));

    // Bintang Jatuh Spontan
    let shootingStars = [];
    const createShootingStar = () => {
      if (Math.random() < 0.03 && shootingStars.length < 2) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height * 0.4),
          len: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 6,
          size: Math.random() * 1.5 + 1,
          opacity: 1
        });
      }
    };

    // Burst Partikel saat Layar Diklik/Disentuh
    let magicSparks = [];
    const handleCanvasClick = (e) => {
      for (let i = 0; i < 12; i++) {
        magicSparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          size: Math.random() * 4 + 2,
          opacity: 1,
          color: `hsl(${Math.floor(Math.random() * 60 + 35)}, 100%, 75%)`
        });
      }
    };
    window.addEventListener('click', handleCanvasClick);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Bintang Ambience
      stars.forEach((s) => {
        s.y += s.speedY;
        s.x += s.speedX;
        s.opacity += Math.sin(Date.now() * s.pulse) * 0.015;

        if (s.y > canvas.height + 10) {
          s.y = -10;
          s.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.abs(Math.sin(s.opacity));
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Bintang Jatuh
      createShootingStar();
      shootingStars.forEach((ss, idx) => {
        ss.x += ss.speed;
        ss.y += ss.speed * 0.5;
        ss.opacity -= 0.015;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(254, 240, 138, ${Math.max(0, ss.opacity)})`;
        ctx.lineWidth = ss.size;
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.len, ss.y - ss.len * 0.5);
        ctx.stroke();

        if (ss.opacity <= 0 || ss.x > canvas.width) {
          shootingStars.splice(idx, 1);
        }
      });

      // Render Burst Sihir Klik
      magicSparks.forEach((ms, index) => {
        ms.x += ms.vx;
        ms.y += ms.vy;
        ms.opacity -= 0.025;

        ctx.beginPath();
        ctx.fillStyle = ms.color;
        ctx.globalAlpha = Math.max(0, ms.opacity);
        ctx.arc(ms.x, ms.y, ms.size, 0, Math.PI * 2);
        ctx.fill();

        if (ms.opacity <= 0) magicSparks.splice(index, 1);
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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-80" />;
}

// --- APP UTAMA: DISNEY ENCHANTED REALM ---
export default function App() {
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef(null);

  // Data Utama
  const [anniversaryDate, setAnniversaryDate] = useState('2023-02-14T00:00:00');
  const [partnerNames, setPartnerNames] = useState({ partner1: 'Prince', partner2: 'Princess', nickname: 'Enchanted Tale' });
  const [partnerStatus, setPartnerStatus] = useState({
    quote: 'Sekali pun takdir membawa kita mengelilingi dunia, hatiku selalu menemukan jalan pulang kepadamu.'
  });

  const [couplePhotos, setCouplePhotos] = useState({
    photo1: '/photo1.jpg',
    photo2: '/photo2.jpg'
  });

  const [activeSection, setActiveSection] = useState('realm');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Live Relationship Timer
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // 2. Fitur Baru: Enchanted Rose Cloche (Mawar Ajaib)
  const [roseAffinity, setRoseAffinity] = useState(88);
  const [roseLevel, setRoseLevel] = useState(9);
  const [isRoseWatered, setIsRoseWatered] = useState(false);

  // 3. Fitur Baru: Kitab Mantra PIN (Rune Spellbook)
  const [secretPasscode, setSecretPasscode] = useState('1234');
  const [inputPin, setInputPin] = useState('');
  const [isSpellUnlocked, setIsSpellUnlocked] = useState(false);
  const [lockError, setLockError] = useState('');
  const [secretLetterText] = useState(
`Untuk Putri & Pangeran Terindahku 👑✨,

Jika kamu membaca guratan tinta emas ini, berarti takdir telah membuka segel kitab rahasia kita.

Terima kasih telah menjadikan setiap detik perjalanan ini indah seperti cerita dalam buku dongeng. Web ini dibuat sebagai istana abadi untuk menyimpan semua tawa, rindu, dan mimpi-mimpi kita berdua.

Dengan Kasih Abadi Kerajaan,
— Pasangan Jiwamu 💕`
  );
  const [displayedText, setDisplayedText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  // 4. Fitur Baru: Kompas Takdir Astral (Astral Destiny Compass)
  const [compassDegrees, setCompassDegrees] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeFate, setActiveFate] = useState(null);

  const fairytaleFates = [
    { title: "Dansa Bintang Malam", desc: "Takdir menyarankan kencan mendengarkan lagu romantis favorit bersama malam ini!", reward: "Hoki Cinta 100%" },
    { title: "Kembara Wisata Kuliner", desc: "Saatnya mencoba makanan favorit baru yang belum pernah kalian santap berdua.", reward: "Petualangan Rasa" },
    { title: "Pelukan Pelindung 10 Detik", desc: "Pasanganmu sedang butuh rasa hangat dan pelukan ekstra hari ini.", reward: "Kehangatan Jiwa" },
    { title: "Bintang Harapan Terwujud", desc: "Mimpi manis yang kalian diskusikan belakangan ini akan segera menjadi kenyataan.", reward: "Keajaiban Takdir" }
  ];

  // 5. Fitur Baru: Sumur Harapan & Gulungan Voucher (Wishing Well & Royal Scrolls)
  const [coinsCount, setCoinsCount] = useState(5);
  const [wishesList, setWishesList] = useState([
    { id: 1, wish: "Semoga kisah cinta ini selalu diberkahi kebahagiaan dan keabadian.", author: 'Prince' },
    { id: 2, wish: "Semua rencana jalan-jalan dan impian besar kita terwujud tahun ini!", author: 'Princess' }
  ]);
  const [newWish, setNewWish] = useState('');

  const [royalScrolls, setRoyalScrolls] = useState([
    { id: 1, title: 'Bebas Pilih Santapan Istana', desc: 'Pilih tempat makan mana saja, akan dipesankan secara instant!', tag: 'Feast Scroll', status: 'Available' },
    { id: 2, title: 'Pelukan Hangat Tanpa Batas', desc: 'Tukarkan kapan saja kamu butuh penghibur dan semangat.', tag: 'Comfort Scroll', status: 'Available' },
    { id: 3, title: 'Sweet Treat Delivery', desc: 'Minuman boba / kue manis favorit langsung dikirim ke rumah.', tag: 'Sweet Scroll', status: 'Available' }
  ]);

  // Settings State
  const [showSettings, setShowSettings] = useState(false);
  const [editNames, setEditNames] = useState(partnerNames);
  const [editAnniversary, setEditAnniversary] = useState('2023-02-14');
  const [editPin, setEditPin] = useState('1234');
  const [editPhoto1, setEditPhoto1] = useState(couplePhotos.photo1);
  const [editPhoto2, setEditPhoto2] = useState(couplePhotos.photo2);

  const handleSectionScroll = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hydration Load
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const savedAnniversary = localStorage.getItem('royal_anniversary');
      if (savedAnniversary) {
        setAnniversaryDate(savedAnniversary);
        setEditAnniversary(savedAnniversary.split('T')[0]);
      }
      const savedPartners = localStorage.getItem('royal_partners');
      if (savedPartners) {
        const parsed = JSON.parse(savedPartners);
        setPartnerNames(parsed);
        setEditNames(parsed);
      }
    }
  }, []);

  // Live Timer Calculator
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
        showToast("Klik sekali lagi untuk memutar musik!");
      });
    }
  };

  // Interaksi Mawar Ajaib
  const handleNurtureRose = () => {
    if (!isRoseWatered) {
      setIsRoseWatered(true);
      const nextAff = roseAffinity + 25;
      if (nextAff >= 100) {
        setRoseLevel(prev => prev + 1);
        setRoseAffinity(nextAff - 100);
        showToast("🌸 MAWAR AJAIB MEKAR KEMBALI! Level Naik! ✨");
      } else {
        setRoseAffinity(nextAff);
        showToast("💧 Tetesan Embun Bintang Diberikan ke Mawar! ✨");
      }
    } else {
      showToast("Mawar Ajaib telah mekar sempurna hari ini! Kembali besok ya 🌹");
    }
  };

  // Typewriter Effect Surat Rahasia
  useEffect(() => {
    if (isSpellUnlocked && typewriterIndex < secretLetterText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + secretLetterText.charAt(typewriterIndex));
        setTypewriterIndex(prev => prev + 1);
      }, 25);
      return () => clearTimeout(timer);
    }
  }, [isSpellUnlocked, typewriterIndex, secretLetterText]);

  const handleRunePress = (digit) => {
    if (inputPin.length < 4) {
      const nextPin = inputPin + digit;
      setInputPin(nextPin);
      setLockError('');
      if (nextPin.length === 4) {
        if (nextPin === secretPasscode) {
          setIsSpellUnlocked(true);
          setTypewriterIndex(0);
          setDisplayedText('');
          showToast("🔓 Kitab Mantra Rahasia Berhasil Terbuka!");
        } else {
          setLockError("Sandi Rune Salah! Gunakan 1234");
          setTimeout(() => setInputPin(''), 1000);
        }
      }
    }
  };

  // Spin Kompas Takdir
  const handleSpinCompass = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setActiveFate(null);
    const newDeg = compassDegrees + 1440 + Math.floor(Math.random() * 360);
    setCompassDegrees(newDeg);

    setTimeout(() => {
      setIsSpinning(false);
      const selected = fairytaleFates[Math.floor(Math.random() * fairytaleFates.length)];
      setActiveFate(selected);
      showToast("🧭 Kompas Menunjukkan Takdir Romantis!");
    }, 3000);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-amber-300 font-sans">
        <div className="animate-pulse flex items-center gap-3">
          <Crown className="w-9 h-9 text-amber-400 animate-spin" />
          <span className="font-bold text-lg tracking-wide">Membuka Gerbang Kerajaan Dongeng... 🏰✨</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-slate-100 font-serif relative overflow-x-hidden pb-36">
      {/* Audio Element (/shapeofmyheart.mp3) */}
      <audio ref={audioRef} src="/shapeofmyheart.mp3" loop prefetch="auto" />

      {/* Partikel Pixie Dust Canvas */}
      <FairytaleMagicalCanvas />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-bold px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center gap-3 animate-bounce border border-amber-200 backdrop-blur-md font-sans">
          <Sparkles className="w-5 h-5 text-slate-950 fill-slate-950" />
          <span className="text-xs sm:text-sm">{toastMessage}</span>
        </div>
      )}

      {/* TOP PENDANT BAR (MINIMALIS ELEGANT) */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl font-sans">
        <div className="bg-slate-950/80 border border-amber-500/30 rounded-full p-2 px-6 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 p-0.5 shadow-md flex items-center justify-center animate-pulse">
              <Crown className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <h1 className="font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-200 via-rose-200 to-amber-300 bg-clip-text text-transparent">
                {partnerNames.partner1} & {partnerNames.partner2}
              </h1>
              <p className="text-[8px] text-amber-300/80 tracking-widest uppercase">{partnerNames.nickname}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMusic}
              className={`p-2 rounded-full transition border ${
                isPlayingMusic ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-slate-900 text-amber-400 border-amber-900/40'
              }`}
            >
              {isPlayingMusic ? <Music className="w-3.5 h-3.5 animate-bounce" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 bg-slate-900 text-slate-300 border border-amber-900/40 rounded-full hover:bg-rose-950 transition"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ================= WORKSPACE FAIRYTALE STORYBOOK ================= */}
      <main className="max-w-4xl mx-auto px-4 pt-28 space-y-20">

        {/* ================= BAB I: PORTRET KERAJAAN & PIRINGAN JAM ASTRAL ================= */}
        <section id="realm" className="animate-fadeIn space-y-12">
          
          {/* Dual Royal Mirror Frame (Foto Pangeran & Putri) */}
          <div className="relative bg-gradient-to-b from-indigo-950/40 via-slate-900/80 to-purple-950/40 border border-amber-500/30 rounded-[3.5rem] p-6 md:p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(15,23,42,0.8)] overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              
              {/* Dual Royal Mirror Frames */}
              <div className="flex items-center justify-center gap-4 relative">
                {/* Mirror 1 */}
                <div className="bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 p-1 rounded-[2.2rem] shadow-2xl transform -rotate-6 hover:rotate-0 transition duration-500 w-36 sm:w-44 text-center">
                  <div className="bg-slate-950 p-2 rounded-[2rem]">
                    <div className="w-full h-36 sm:h-44 bg-rose-950 rounded-[1.5rem] overflow-hidden relative border border-amber-500/40">
                      <img
                        src={couplePhotos.photo1}
                        alt="Foto 1"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden absolute inset-0 bg-slate-900 flex-col items-center justify-center text-amber-300 text-xs p-2">
                        <ImageIcon className="w-8 h-8 mb-1 text-amber-400" />
                        <span>Foto Kamu</span>
                      </div>
                    </div>
                    <span className="font-bold text-xs text-amber-200 mt-2 block font-serif">{partnerNames.partner1} 👑</span>
                  </div>
                </div>

                {/* Starlight Connector */}
                <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0 animate-pulse">
                  <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
                </div>

                {/* Mirror 2 */}
                <div className="bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 p-1 rounded-[2.2rem] shadow-2xl transform rotate-6 hover:rotate-0 transition duration-500 w-36 sm:w-44 text-center">
                  <div className="bg-slate-950 p-2 rounded-[2rem]">
                    <div className="w-full h-36 sm:h-44 bg-pink-950 rounded-[1.5rem] overflow-hidden relative border border-amber-500/40">
                      <img
                        src={couplePhotos.photo2}
                        alt="Foto 2"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden absolute inset-0 bg-slate-900 flex-col items-center justify-center text-pink-300 text-xs p-2">
                        <ImageIcon className="w-8 h-8 mb-1 text-pink-400" />
                        <span>Foto Doi</span>
                      </div>
                    </div>
                    <span className="font-bold text-xs text-amber-200 mt-2 block font-serif">{partnerNames.partner2} 👑</span>
                  </div>
                </div>
              </div>

              {/* Royal Story Title */}
              <div className="text-center md:text-right max-w-md font-sans">
                <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest px-3.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-700/40 font-bold">
                  <Crown className="w-3 h-3 text-amber-400" /> Enchanted Grimoire
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-3 font-serif leading-tight">
                  Kisah Kasih <br />
                  <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-amber-300 bg-clip-text text-transparent">
                    {partnerNames.partner1} & {partnerNames.partner2}
                  </span>
                </h2>
                <p className="text-slate-300 text-sm mt-3 italic font-serif leading-relaxed">
                  "{partnerStatus.quote}"
                </p>
              </div>

            </div>
          </div>

          {/* CELESTIAL CLOCK DIAL (JAM WAKTU KOSMIK) */}
          <div className="relative bg-slate-950/80 border border-amber-500/30 rounded-[3.5rem] p-8 backdrop-blur-2xl text-center shadow-2xl font-sans overflow-hidden">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950 text-amber-300 text-xs font-bold mb-8 border border-amber-500/40">
              <Clock className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>Jam Astral Perjalanan Cinta</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { label: 'Hari Bersama', val: timeTogether.days },
                { label: 'Jam Berlalu', val: timeTogether.hours },
                { label: 'Menit Indah', val: timeTogether.minutes },
                { label: 'Detik Berharga', val: timeTogether.seconds }
              ].map((t, idx) => (
                <div key={idx} className="relative group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-indigo-950/80 to-slate-950 border-2 border-amber-500/40 group-hover:border-amber-300 transition-all flex flex-col items-center justify-center mx-auto shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                    <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-amber-300 font-mono">
                      {t.val}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-amber-300/80 mt-1 tracking-wider">{t.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ================= BAB II: KUBAH MAWAR AJAIB (ENCHANTED ROSE DOME) ================= */}
        <section id="rose" className="space-y-6 font-sans">
          <div className="bg-gradient-to-br from-slate-900/90 via-purple-950/50 to-slate-900/90 border border-rose-500/30 rounded-[3rem] p-6 md:p-10 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            
            <div className="flex items-center gap-6">
              {/* Animated Rose Dome Icon */}
              <div className="w-20 h-20 rounded-full bg-rose-950/80 border-2 border-rose-400/50 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(244,114,182,0.3)] animate-pulse">
                <Flame className="w-10 h-10 text-rose-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Level {roseLevel} Mawar Ajaib</span>
                  <span className="text-xs bg-rose-950 text-rose-300 px-3 py-0.5 rounded-full border border-rose-800 font-mono font-bold">
                    {roseAffinity}% Mekar ✨
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-100 font-serif mt-1">Kubah Mawar Ajaib Istana</h3>
                <p className="text-slate-400 text-xs mt-1 max-w-sm">Berikan tetesan embun bintang untuk menjaga agar mawar cinta ini selalu mekar bercahaya.</p>
                
                <div className="w-56 bg-slate-950 rounded-full h-2.5 mt-3 border border-slate-800 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500 h-full rounded-full transition-all duration-500" style={{ width: `${roseAffinity}%` }} />
                </div>
              </div>
            </div>

            <button
              onClick={handleNurtureRose}
              disabled={isRoseWatered}
              className={`px-8 py-4 rounded-2xl font-bold text-xs transition-all duration-300 shadow-xl shrink-0 flex items-center gap-2 ${
                isRoseWatered
                  ? 'bg-slate-900 text-slate-500 cursor-not-allowed border border-slate-800'
                  : 'bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 shadow-amber-500/20 active:scale-95'
              }`}
            >
              <Droplets className="w-4 h-4" />
              <span>{isRoseWatered ? 'Telah Mekar Hari Ini ✓' : 'Beri Embun Bintang (+25%)'}</span>
            </button>
          </div>
        </section>

        {/* ================= BAB III: KITAB MANTRA RUNE (SECRET SPELLBOOK) ================= */}
        <section id="spellbook" className="space-y-6 font-sans max-w-xl mx-auto">
          {!isSpellUnlocked ? (
            <div className="bg-slate-950/90 border border-amber-500/30 rounded-[3rem] p-8 backdrop-blur-2xl text-center shadow-2xl space-y-6 relative">
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-100 font-serif">Kitab Mantra Rahasia</h2>
                <p className="text-xs text-slate-400 mt-1">Masukkan 4-Sandi Rune Kristal untuk membuka segel tinta emas (PIN Default: 1234)</p>
              </div>

              <div className="flex justify-center gap-4 my-4">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      inputPin.length > idx ? 'bg-amber-400 border-amber-400 scale-125 shadow-[0_0_15px_rgba(245,158,11,0.8)]' : 'border-slate-800 bg-slate-950'
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
                      else handleRunePress(String(btn));
                    }}
                    className="py-3.5 bg-slate-900 hover:bg-slate-800 text-amber-200 font-bold text-base rounded-2xl border border-amber-900/30 transition active:scale-95"
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-950/95 border border-amber-500/40 rounded-[3rem] p-8 backdrop-blur-2xl shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-amber-900/40 pb-4">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm font-serif">
                  <Unlock className="w-5 h-5 text-emerald-400" /> Segel Kitab Rahasia Terbuka
                </div>
                <button onClick={() => setIsSpellUnlocked(false)} className="text-slate-500 hover:text-slate-300">
                  <Lock className="w-4 h-4" />
                </button>
              </div>

              <div className="prose text-amber-100 leading-relaxed text-sm whitespace-pre-line bg-indigo-950/40 p-6 rounded-2xl border border-amber-500/20 font-serif shadow-inner">
                {displayedText}
              </div>
            </div>
          )}
        </section>

        {/* ================= BAB IV: KOMPAS TAKDIR ASTRAL ================= */}
        <section id="compass" className="space-y-6 max-w-xl mx-auto font-sans">
          <div className="bg-slate-950/90 border border-amber-500/30 rounded-[3rem] p-8 text-center backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center mx-auto mb-3">
              <Compass className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-100 font-serif">Kompas Takdir Astral</h2>
            <p className="text-xs text-slate-400 mt-1">Putar kompas takdir untuk menemukan kejutan & petunjuk romantis hari ini!</p>

            {/* Visual Jarum Kompas */}
            <div className="my-8 relative w-44 h-44 mx-auto flex items-center justify-center">
              <div
                className="w-full h-full rounded-full border-4 border-amber-500/40 bg-slate-900 flex items-center justify-center shadow-2xl transition-transform duration-[3000ms] ease-out"
                style={{ transform: `rotate(${compassDegrees}deg)` }}
              >
                <div className="w-2 h-20 bg-gradient-to-t from-amber-400 to-rose-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
              </div>
              <div className="absolute w-6 h-6 rounded-full bg-amber-300 border-2 border-slate-950 shadow-md" />
            </div>

            {activeFate && (
              <div className="bg-indigo-950/60 border border-amber-500/40 rounded-3xl p-6 mb-6 animate-scaleUp text-left">
                <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                  {activeFate.reward}
                </span>
                <h4 className="font-bold text-slate-100 mt-3 text-base">{activeFate.title}</h4>
                <p className="text-slate-300 text-xs mt-2 italic font-serif">"{activeFate.desc}"</p>
              </div>
            )}

            <button
              onClick={handleSpinCompass}
              disabled={isSpinning}
              className={`w-full py-4 rounded-2xl font-bold text-xs transition-all duration-300 shadow-lg ${
                isSpinning
                  ? 'bg-slate-900 text-slate-500 cursor-not-allowed border border-slate-800'
                  : 'bg-gradient-to-r from-amber-400 via-rose-500 to-amber-400 text-slate-950 hover:brightness-110 active:scale-95'
              }`}
            >
              {isSpinning ? 'Memutar Kompas Takdir...' : 'Putar Kompas Takdir 🧭'}
            </button>
          </div>
        </section>

        {/* ================= BAB V: SUMUR HARAPAN & GULUNGAN VOUCHER ================= */}
        <section id="wishingwell" className="space-y-12 font-sans">
          
          {/* Sumur Harapan */}
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-[3rem] p-6 md:p-8 backdrop-blur-2xl">
            <div className="text-center max-w-md mx-auto mb-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center mx-auto mb-2">
                <Coins className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100 font-serif">Sumur Harapan Istana</h2>
              <p className="text-slate-400 text-xs mt-1">Lempar koin doa untuk mengabadikan harapan cinta kalian berdua.</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!newWish.trim()) return;
              setWishesList([{ id: Date.now(), wish: newWish.trim(), author: partnerNames.partner1 }, ...wishesList]);
              setNewWish('');
              showToast("✨ Koin Doa Berhasil Dilempar ke Sumur Harapan!");
            }} className="flex gap-3 mb-6">
              <input
                type="text"
                required
                placeholder="Tuliskan harapan manis kalian..."
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                className="flex-1 bg-slate-900 border border-amber-900/40 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition"
              />
              <button type="submit" className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs shadow-lg transition">
                Lempar Koin
              </button>
            </form>

            <div className="space-y-3">
              {wishesList.map((w) => (
                <div key={w.id} className="bg-indigo-950/40 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">Dari: {w.author}</span>
                    <p className="text-slate-200 text-xs italic mt-1 font-serif">"{w.wish}"</p>
                  </div>
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Gulungan Voucher Hadiah */}
          <div className="space-y-6">
            <div className="text-center max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-slate-100 font-serif">Gulungan Voucher Kerajaan</h2>
              <p className="text-slate-400 text-xs mt-1">Tukarkan gulungan ini untuk hadiah kencan spesial!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {royalScrolls.map((s) => (
                <div key={s.id} className="relative bg-slate-950/80 border border-amber-500/30 rounded-[2.5rem] p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950 border-r border-amber-500/30" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950 border-l border-amber-500/30" />

                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-950 px-2.5 py-1 rounded-full border border-amber-800">{s.tag}</span>
                    <h4 className="font-bold text-slate-100 text-base mt-3">{s.title}</h4>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">{s.desc}</p>
                  </div>

                  <button
                    disabled={s.status !== 'Available'}
                    onClick={() => {
                      setRoyalScrolls(royalScrolls.map(item => item.id === s.id ? { ...item, status: 'Redeemed' } : item));
                      showToast("🎉 Voucher Kerajaan Berhasil Ditukarkan!");
                    }}
                    className={`w-full py-3 rounded-2xl font-bold text-xs mt-6 transition ${
                      s.status === 'Available' ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-500/20' : 'bg-slate-900 text-slate-500 cursor-not-allowed border border-slate-800'
                    }`}
                  >
                    {s.status === 'Available' ? 'Tukarkan Voucher' : 'Telah Ditukarkan ✓'}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </section>

      </main>

      {/* ================= FLOATING ROYAL ORB NAVIGATION (MOBILE-FIRST) ================= */}
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        {mobileMenuOpen && (
          <div className="mb-4 bg-slate-950/95 border border-amber-500/40 rounded-3xl p-3 shadow-2xl backdrop-blur-2xl flex flex-col gap-2 max-h-[60vh] overflow-y-auto w-52 animate-scaleUp">
            {[
              { id: 'realm', label: '1. Portret & Jam Astral', icon: Crown },
              { id: 'rose', label: '2. Mawar Ajaib', icon: Flame },
              { id: 'spellbook', label: '3. Kitab Mantra PIN', icon: Lock },
              { id: 'compass', label: '4. Kompas Takdir', icon: Compass },
              { id: 'wishingwell', label: '5. Sumur & Voucher', icon: Coins }
            ].map((tab) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSectionScroll(tab.id)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition text-amber-200 hover:bg-amber-950/60"
                >
                  <IconComp className="w-4 h-4 text-amber-400" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 text-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.5)] border border-amber-200 transition active:scale-95"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Wand2 className="w-6 h-6 animate-pulse" />}
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans">
          <div className="bg-slate-950 rounded-3xl p-6 max-w-md w-full border border-amber-500/30 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b border-amber-900/40 pb-3">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 font-serif">
                <Sliders className="w-5 h-5 text-amber-300" /> Pengaturan Grimoire
              </h3>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="text-xs font-bold text-amber-300/80">Nama Pasangan 1 & 2</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <input
                    type="text"
                    value={editNames.partner1}
                    onChange={(e) => setEditNames({ ...editNames, partner1: e.target.value })}
                    className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  />
                  <input
                    type="text"
                    value={editNames.partner2}
                    onChange={(e) => setEditNames({ ...editNames, partner2: e.target.value })}
                    className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-amber-300/80">Path File Foto 1 & 2</label>
                <div className="space-y-2 mt-1">
                  <input
                    type="text"
                    placeholder="/photo1.jpg"
                    value={editPhoto1}
                    onChange={(e) => setEditPhoto1(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="/photo2.jpg"
                    value={editPhoto2}
                    onChange={(e) => setEditPhoto2(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-amber-300/80">Tanggal Jadian</label>
                <input
                  type="date"
                  value={editAnniversary}
                  onChange={(e) => setEditAnniversary(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-amber-300/80">Sandi Rune Kitab (4 Angka)</label>
                <input
                  type="text"
                  maxLength={4}
                  value={editPin}
                  onChange={(e) => setEditPin(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-center font-mono font-bold"
                />
              </div>

              <button
                onClick={() => {
                  setPartnerNames(editNames);
                  setAnniversaryDate(`${editAnniversary}T00:00:00`);
                  setSecretPasscode(editPin);
                  const updatedPhotos = { photo1: editPhoto1, photo2: editPhoto2 };
                  setCouplePhotos(updatedPhotos);
                  if (typeof window !== 'undefined') localStorage.setItem('royal_photos', JSON.stringify(updatedPhotos));
                  setShowSettings(false);
                  showToast("✨ Pengaturan Disimpan!");
                }}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl mt-4 shadow-lg"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
