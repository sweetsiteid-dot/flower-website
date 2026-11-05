'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Heart, Sparkles, Calendar, Clock, Music, VolumeX,
  Gift, Lock, Unlock, X, BookOpen, Star, Sliders,
  Flower2, Feather, Send, Disc, Mail, Droplets, Camera, ImageIcon,
  CheckCircle2, Compass, Smile, Award, Package, Flame, Sparkle,
  Bookmark, Menu, Compass as NavigationIcon
} from 'lucide-react';

// --- ANIMASI PARTIKEL BINTANG & EMUN MALAM ---
function EtherealCanvas() {
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
      size: Math.random() * 5 + 2,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: Math.sin(Math.random() * Math.PI * 2) * 0.3,
      angle: Math.random() * 360,
      spin: Math.random() * 1.2 - 0.6,
      color: `rgba(${Math.floor(Math.random() * 60 + 200)}, ${Math.floor(Math.random() * 50 + 150)}, ${Math.floor(Math.random() * 80 + 130)}, ${Math.random() * 0.35 + 0.15})`
    }));

    let sparks = [];
    const handleCanvasClick = (e) => {
      for (let i = 0; i < 6; i++) {
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

// --- MAIN SCRAPBOOK MAGAZINE APP ---
export default function App() {
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef(null);

  // Core Data
  const [anniversaryDate, setAnniversaryDate] = useState('2023-02-14T00:00:00');
  const [partnerNames, setPartnerNames] = useState({ partner1: 'Alex', partner2: 'Taylor', nickname: 'Scrapbook Romance Journal' });
  const [partnerStatus, setPartnerStatus] = useState({
    partner1Status: 'Sedang Merindukanmu 💕',
    partner2Status: 'Tersenyum Membaca Pesanmu 🌸',
    quote: 'Kamu adalah halaman favorit dari seluruh kisah hidup yang pernah aku tulis.'
  });

  const [couplePhotos, setCouplePhotos] = useState({
    photo1: '/photo1.jpg',
    photo2: '/photo2.jpg'
  });

  const [activeTab, setActiveTab] = useState('hub');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Timer Perjalanan Cinta
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // 2. Kebun Cinta Streak
  const [waterStreak, setWaterStreak] = useState(17);
  const [gardenLevel, setGardenLevel] = useState(6);
  const [gardenExp, setGardenExp] = useState(80);
  const [isWateredToday, setIsWateredToday] = useState(false);

  // 4. Ramalan Cinta Harian
  const loveFortunes = [
    { title: "Kencan Penuh Manis", desc: "Hari ini adalah hari yang pas buat makan es krim bareng atau jalan-jalan santai!", tag: "Hoki Cinta 100%" },
    { title: "Gelombang Pelukan", desc: "Pasanganmu sedang butuh pelukan hangat 10 detik ekstra hari ini.", tag: "Kasih Sayang" },
    { title: "Kejutan Kecil", desc: "Akan ada momen ngobrol lucu yang bikin kalian berdua ketawa lepas.", tag: "Momen Spesial" },
    { title: "Kedamaian Jiwa", desc: "Hubungan kalian sedang di fase paling stabil dan penuh kedamaian.", tag: "Harmonis" }
  ];
  const [activeFortune, setActiveFortune] = useState(null);

  // 5. Piringan Puisi
  const poemList = [
    { title: "Mekar Senja", text: "Di antara jingga malam, senyumanmu adalah kedamaian yang selalu aku cari." },
    { title: "Embun Musim Semi", text: "Seperti tetes air di pagi hari, kehadiranmu selalu menyegarkan jiwaku." },
    { title: "Lagu Bintang", text: "Tak perlu kata-kata rumit, berada di sampingmu sudah cukup bikin sempurna." },
    { title: "Kepingan Abadi", text: "Terima kasih telah menjadi bagian tercantik di setiap bab kehidupanku." }
  ];
  const [selectedPoem, setSelectedPoem] = useState(poemList[0]);

  // 6. Catatan Tempel Apresiasi
  const [gratitudeNotes, setGratitudeNotes] = useState([
    { id: 1, text: 'Terima kasih selalu sabar mendengarkan cerita random-ku setiap malam.', author: 'Alex', date: 'Hari Ini' },
    { id: 2, text: 'Ingat ya, kamu adalah orang paling hebat yang pernah aku temui!', author: 'Taylor', date: 'Kemarin' }
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  // 7. Kupon Hadiah
  const [coupons, setCoupons] = useState([
    { id: 1, title: 'Bebas Pilih Kuliner', desc: 'Pilih restoran apa aja, aku yang pesan & bayar!', tag: 'Food', status: 'Available' },
    { id: 2, title: 'Pelukan Hangat 10 Menit', desc: 'Tukarkan kapan saja kamu butuh semangat atau merasa lelah.', tag: 'Comfort', status: 'Available' },
    { id: 3, title: 'Boba Delivery Instant', desc: 'Langsung dipesankan es boba manis favoritmu ke rumah.', tag: 'Treat', status: 'Available' }
  ]);

  // 8. Target Impian Together (Bucket List)
  const [bucketList, setBucketList] = useState([
    { id: 1, title: 'Piknik di Taman Bunga Lavender', completed: true },
    { id: 2, title: 'Masak Makanan Favorit Berdua di Rumah', completed: true },
    { id: 3, title: 'Stargazing Menikmati Sunrise di Puncak', completed: false },
    { id: 4, title: 'Road Trip Spontan Tanpa Rencana', completed: false }
  ]);

  // 9. Timeline Kenangan
  const [timelineEvents, setTimelineEvents] = useState([
    { id: 1, date: '15 Okt 2022', title: 'Awal Kata Menyapa', desc: 'Momen manis saat kita pertama kali bertukar cerita.', icon: '☕' },
    { id: 2, date: '02 Nov 2022', title: 'Kencan Pertama Kita', desc: 'Jalan-jalan santai sambil minum boba sampai larut.', icon: '🌌' },
    { id: 3, date: '14 Feb 2023', title: 'Janji Menyatu', desc: 'Hari di mana kita memutuskan untuk berjalan bersama selamanya.', icon: '💍' }
  ]);

  // 10. Amplop Rahasia PIN
  const [secretPasscode, setSecretPasscode] = useState('1234');
  const [inputPin, setInputPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [lockError, setLockError] = useState('');
  const [secretLetter, setSecretLetter] = useState(
`Untuk Bunga Terindahku ❤️,

Jika kamu membuka amplop rahasia ini, berarti kamu sudah memasukkan PIN jadian kita.

Aku cuma mau bilang terima kasih ya sudah menjadi alasan di balik senyumku setiap hari. Web jurnal ini aku buat khusus untuk menyimpan kenangan indah kita berdua.

Semoga web ini selalu bisa jadi pelukan hangat kapan saja kamu merindukanku.

Dengan Cinta Abadi,
— Pasangan Bucinmu 💕`
  );
  const [displayedText, setDisplayedText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  // 12. Kuis Chemistry Pasangan
  const quizQuestions = [
    { q: "Apa aroma & suasana santai favorit kita berdua?", opts: ["Kopi & Musik Lofi", "Aroma Hujan Musim Semi", "Jalan-Jalan Malam", "Nonton Film Sambil Maskeran"], ans: 0 },
    { q: "Siapa yang paling sering bilang kangen duluan?", opts: [partnerNames.partner1, partnerNames.partner2, "Dua-duanya barengan!", "Tergantung suasana hati"], ans: 2 },
    { q: "Momen apa yang paling bikin hubungan kita makin erat?", opts: ["Deep talk sampai subuh", "Petualangan jalan-jalan", "Makan makanan favorit", "Semua momen asal sama kamu"], ans: 3 }
  ];
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);

  // 14. Kotak Hadiah Unboxing
  const [giftBoxOpened, setGiftBoxOpened] = useState(false);
  const giftBoxRewards = [
    "🎁 Hadiah Hari Ini: 100 Tetes Kasih Sayang & Voucher Bebas Request Apa Saja!",
    "🧸 Hadiah Hari Ini: Tiket Nonton Film Pilihanmu Malam Ini!",
    "🍰 Hadiah Hari Ini: Pesenan Cake / Sweet Treat Langsung Dikirim!"
  ];
  const [currentGiftReward, setCurrentGiftReward] = useState('');

  // 15. Botol Bintang Harapan
  const [wishes, setWishes] = useState([
    { id: 1, wish: "Semoga kita terus saling merawat dan bahagia sampai tua bersama.", author: partnerNames.partner1 },
    { id: 2, wish: "Semua impian dan rencana road trip kita bisa terwujud tahun ini!", author: partnerNames.partner2 }
  ]);
  const [newWishInput, setNewWishInput] = useState('');

  // Settings State
  const [showSettings, setShowSettings] = useState(false);
  const [editNames, setEditNames] = useState(partnerNames);
  const [editAnniversary, setEditAnniversary] = useState('2023-02-14');
  const [editPin, setEditPin] = useState('1234');
  const [editPhoto1, setEditPhoto1] = useState(couplePhotos.photo1);
  const [editPhoto2, setEditPhoto2] = useState(couplePhotos.photo2);

  // Auto Scroll ke Atas saat Ganti Tab
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Hydration Load
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const savedAnniversary = localStorage.getItem('journal_anniversary');
      if (savedAnniversary) {
        setAnniversaryDate(savedAnniversary);
        setEditAnniversary(savedAnniversary.split('T')[0]);
      }
      const savedPartners = localStorage.getItem('journal_partners');
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

  // Audio Toggle
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
      const newExp = gardenExp + 30;
      if (newExp >= 100) {
        setGardenLevel(prev => prev + 1);
        setGardenExp(newExp - 100);
        showToast("🎉 LEVEL UP! Kebun Cinta Naik Level! 🌸");
      } else {
        setGardenExp(newExp);
        showToast("💧 Tanaman Disiram! Streak Bertambah 🔥");
      }
    } else {
      showToast("Tanaman sudah disiram hari ini. Kembali besok ya! 🌸");
    }
  };

  // Typewriter Letter Effect
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

  const navTabs = [
    { id: 'hub', label: '1. Cover Journal', icon: BookOpen },
    { id: 'fortune', label: '4. Ramalan Hoki', icon: Sparkle },
    { id: 'wheel', label: '5. Piringan Puisi', icon: Disc },
    { id: 'notes', label: '6. Papan Apresiasi', icon: Feather },
    { id: 'coupons', label: '7. Kupon Hadiah', icon: Gift },
    { id: 'bucket', label: '8. Target Impian', icon: Star },
    { id: 'timeline', label: '9. Timeline Kenangan', icon: Calendar },
    { id: 'secret', label: '10. Amplop PIN', icon: Mail },
    { id: 'quiz', label: '12. Kuis Chemistry', icon: Compass },
    { id: 'giftbox', label: '14. Unboxing Kado', icon: Package },
    { id: 'wishes', label: '15. Botol Harapan', icon: Sparkles }
  ];

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-rose-300 font-sans">
        <div className="animate-pulse flex items-center gap-3">
          <Flower2 className="w-8 h-8 text-pink-400 animate-spin" />
          <span className="font-bold text-lg">Membuka Scrapbook Studio Jurnal... 🌸</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-rose-950/80 to-slate-950 text-slate-100 font-serif relative overflow-x-hidden pb-32">
      {/* Audio Element */}
      <audio ref={audioRef} src="/shapeofmyheart.mp3" loop prefetch="auto" />

      {/* Partikel Ethereal */}
      <EtherealCanvas />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-rose-600/90 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border border-rose-400/40 backdrop-blur-md font-sans">
          <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* FLOATING TOP MUSIC & SETTINGS WIDGET (MINIMALIS UNIK) */}
      <div className="fixed top-5 left-5 z-40 flex items-center gap-2 font-sans">
        <button
          onClick={toggleMusic}
          className={`p-3 rounded-full transition shadow-2xl flex items-center gap-2 border ${
            isPlayingMusic ? 'bg-rose-600 text-white border-rose-400 animate-pulse' : 'bg-slate-900/90 text-amber-400 border-amber-900/40'
          }`}
        >
          {isPlayingMusic ? <Music className="w-4 h-4 animate-spin" /> : <VolumeX className="w-4 h-4" />}
          <span className="text-xs font-bold hidden sm:inline">{isPlayingMusic ? 'Playing ❤️' : 'Music Off'}</span>
        </button>
        <button
          onClick={() => setShowSettings(true)}
          className="p-3 bg-slate-900/90 text-slate-300 border border-amber-900/40 rounded-full hover:bg-rose-950 transition shadow-2xl"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>

      {/* ================= BARU: BINDER SIDEBAR BOOKMARK (DESKTOP NAV) ================= */}
      <aside className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col gap-2 p-3 font-sans">
        {navTabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-l-2xl text-xs font-bold transition-all transform hover:-translate-x-2 border-l border-t border-b shadow-2xl ${
                isActive
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white border-rose-400 shadow-rose-900/50 scale-105'
                  : 'bg-slate-900/90 text-slate-400 border-amber-900/30 hover:text-amber-200 hover:bg-slate-800'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </aside>

      {/* WORKSPACE JOURNAL BODY */}
      <main className="max-w-4xl mx-auto px-4 pt-20">

        {/* ================= 1. COVER JOURNAL EDITORIAL (BERUBAH TOTAL!) ================= */}
        {activeTab === 'hub' && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* Split Screen Scrapbook Studio Hero */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-900/70 border border-amber-900/30 rounded-[3rem] p-6 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              
              {/* Left Side: Overlapping Skewed Polaroid Frame */}
              <div className="md:col-span-6 flex items-center justify-center relative py-6">
                <div className="relative">
                  {/* Polaroid Foto 1 */}
                  <div className="bg-white p-3 pb-8 rounded-2xl shadow-2xl transform -rotate-12 hover:rotate-0 transition duration-500 border border-slate-200 w-40 sm:w-48 text-center font-sans">
                    <div className="w-full h-40 sm:h-48 bg-rose-100 rounded-xl overflow-hidden relative">
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

                  {/* Polaroid Foto 2 (Overlapping) */}
                  <div className="absolute top-6 left-12 bg-white p-3 pb-8 rounded-2xl shadow-2xl transform rotate-12 hover:rotate-0 transition duration-500 border border-slate-200 w-40 sm:w-48 text-center font-sans z-10">
                    <div className="w-full h-40 sm:h-48 bg-pink-100 rounded-xl overflow-hidden relative">
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
              </div>

              {/* Right Side: Editorial Journal Typography & Quote */}
              <div className="md:col-span-6 text-center md:text-left font-sans space-y-4">
                <span className="inline-block text-[10px] uppercase tracking-widest px-3.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800/40 font-bold">
                  Volume Kenangan Abadi
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-serif leading-tight">
                  Kisah Kasih <br />
                  <span className="bg-gradient-to-r from-amber-200 via-rose-300 to-pink-300 bg-clip-text text-transparent">
                    {partnerNames.partner1} & {partnerNames.partner2}
                  </span>
                </h2>
                <p className="text-slate-300 text-sm italic font-serif leading-relaxed">
                  "{partnerStatus.quote}"
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="text-xs bg-slate-950 text-rose-300 px-3 py-1 rounded-full border border-rose-900/40 font-mono">
                    {partnerStatus.partner1Status}
                  </span>
                  <span className="text-xs bg-slate-950 text-amber-300 px-3 py-1 rounded-full border border-amber-900/40 font-mono">
                    {partnerStatus.partner2Status}
                  </span>
                </div>
              </div>

            </div>

            {/* CELESTIAL DIAL TIMER (PIRINGAN WAKTU UNIK) */}
            <div className="bg-gradient-to-br from-slate-900/90 to-rose-950/60 border border-amber-900/30 rounded-[3rem] p-8 text-center backdrop-blur-xl shadow-2xl relative font-sans">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950 text-amber-300 text-xs font-bold mb-8 border border-amber-800/40">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Timer Perjalanan Cinta</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
                {[
                  { label: 'Hari Bersama', val: timeTogether.days },
                  { label: 'Jam Berlalu', val: timeTogether.hours },
                  { label: 'Menit Indah', val: timeTogether.minutes },
                  { label: 'Detik Berharga', val: timeTogether.seconds }
                ].map((t, idx) => (
                  <div key={idx} className="relative group">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-950 border-2 border-rose-900/40 group-hover:border-rose-500/60 transition-all flex flex-col items-center justify-center mx-auto shadow-inner">
                      <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-pink-300 font-mono">
                        {t.val}
                      </span>
                      <span className="text-[9px] uppercase font-bold text-slate-400 mt-1 tracking-wider">{t.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STREAK KEBUN CINTA */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-[2.5rem] p-6 md:p-8 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <Droplets className="w-7 h-7 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Level {gardenLevel} Kebun Cinta</span>
                    <span className="text-xs bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-800 font-mono font-bold">
                      {waterStreak} Hari Streak 🔥
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 mt-1">Siram Tanaman Kebun Kita</h3>
                  <div className="w-48 bg-slate-950 rounded-full h-2 mt-2 border border-slate-800 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${gardenExp}%` }} />
                  </div>
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
                <span>{isWateredToday ? 'Sudah Disiram ✓' : 'Siram (+30 EXP)'}</span>
              </button>
            </div>

          </div>
        )}

        {/* ================= 4. RAMALAN HOKI ================= */}
        {activeTab === 'fortune' && (
          <div className="space-y-8 animate-fadeIn max-w-xl mx-auto font-sans">
            <div className="bg-slate-900/80 border border-amber-900/40 rounded-[2.5rem] p-8 text-center backdrop-blur-xl shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <Sparkle className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100 font-serif">Ramalan & Kejutan Harian</h2>
              <p className="text-slate-400 text-xs mt-1">Buka kartu ramalan hoki romantis harianmu!</p>

              {activeFortune ? (
                <div className="bg-slate-950/90 border border-amber-900/40 rounded-3xl p-6 mt-6 animate-scaleUp">
                  <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                    {activeFortune.tag}
                  </span>
                  <h4 className="font-bold text-slate-100 mt-3 text-base">{activeFortune.title}</h4>
                  <p className="text-slate-300 text-xs mt-2 italic font-serif">"{activeFortune.desc}"</p>
                </div>
              ) : (
                <p className="text-xs text-slate-500 my-6">Klik tombol di bawah untuk membuka kartu ramalan!</p>
              )}

              <button
                onClick={() => {
                  const rnd = loveFortunes[Math.floor(Math.random() * loveFortunes.length)];
                  setActiveFortune(rnd);
                  showToast("✨ Kartu Ramalan Berhasil Dibuka!");
                }}
                className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold text-xs rounded-2xl shadow-lg mt-6 transition"
              >
                Buka Kartu Harian
              </button>
            </div>
          </div>
        )}

        {/* ================= 5. PIRINGAN PUISI ================= */}
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

        {/* ================= 6. CATATAN TEMPEL ================= */}
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

        {/* ================= 7. KUPON HADIAH ================= */}
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

        {/* ================= 8. TARGET IMPIAN ================= */}
        {activeTab === 'bucket' && (
          <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto font-sans">
            <div className="bg-slate-900/60 border border-slate-800 rounded-[2.5rem] p-6 md:p-8 backdrop-blur-md">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 font-serif">
                    <Star className="w-5 h-5 text-yellow-400" /> Target Impian Together
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Impian yang telah terwujud bersama</p>
                </div>
              </div>

              <div className="space-y-3">
                {bucketList.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      setBucketList(bucketList.map(item => item.id === b.id ? { ...item, completed: !item.completed } : item));
                    }}
                    className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                      b.completed ? 'bg-slate-950/60 border-slate-800 text-slate-500 line-through' : 'bg-slate-900 border-slate-800 text-slate-200'
                    }`}
                  >
                    <span className="text-sm font-semibold">{b.title}</span>
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${b.completed ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400' : 'border-slate-700'}`}>
                      {b.completed && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= 9. TIMELINE KENANGAN ================= */}
        {activeTab === 'timeline' && (
          <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto font-sans">
            <div className="bg-slate-900/60 border border-slate-800 p-6 md:p-8 rounded-[2.5rem] backdrop-blur-md">
              <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2 mb-6 font-serif">
                <Calendar className="w-6 h-6 text-rose-400" />
                Jejak Kenangan Timeline
              </h2>

              <div className="relative border-l-2 border-rose-900/40 ml-4 space-y-8">
                {timelineEvents.map((item) => (
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

        {/* ================= 10. AMPLOP PIN ================= */}
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

        {/* ================= 12. KUIS CHEMISTRY ================= */}
        {activeTab === 'quiz' && (
          <div className="space-y-8 animate-fadeIn max-w-xl mx-auto font-sans">
            <div className="bg-slate-900/80 border border-rose-900/40 rounded-[2.5rem] p-8 backdrop-blur-xl text-center shadow-2xl">
              <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Compass className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100 font-serif">Kuis Chemistry Cinta</h2>
              <p className="text-xs text-slate-400 mt-1 mb-6">Uji kecocokan dan ingatan kenangan kalian!</p>

              {!quizFinished ? (
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 text-left">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-rose-400 font-mono">Soal {quizIndex + 1} dari {quizQuestions.length}</span>
                    <span className="text-xs text-slate-500">Skor: {quizScore}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 mb-4">{quizQuestions[quizIndex].q}</h3>
                  <div className="space-y-3">
                    {quizQuestions[quizIndex].opts.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (i === quizQuestions[quizIndex].ans) setQuizScore(prev => prev + 1);
                          if (quizIndex + 1 < quizQuestions.length) setQuizIndex(prev => prev + 1);
                          else setQuizFinished(true);
                        }}
                        className="w-full text-left p-3.5 rounded-xl bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-700/50 text-xs transition text-slate-200"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-8 text-center">
                  <Award className="w-16 h-16 text-amber-400 mx-auto mb-3 animate-bounce" />
                  <h3 className="text-xl font-bold text-slate-100 mb-1">Kuis Selesai!</h3>
                  <p className="text-slate-400 text-xs mb-6">Skor Kecocokan: <span className="text-rose-400 font-bold text-lg">{quizScore} / {quizQuestions.length}</span></p>
                  <button
                    onClick={() => { setQuizIndex(0); setQuizScore(0); setQuizFinished(false); }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-6 py-3 rounded-2xl text-xs transition"
                  >
                    Ulangi Kuis
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= 14. UNBOXING KADO ================= */}
        {activeTab === 'giftbox' && (
          <div className="space-y-8 animate-fadeIn max-w-xl mx-auto font-sans">
            <div className="bg-slate-900/80 border border-rose-900/40 rounded-[2.5rem] p-8 text-center backdrop-blur-xl shadow-2xl">
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce">
                <Package className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100 font-serif">Kotak Hadiah Kejutan</h2>
              <p className="text-xs text-slate-400 mt-1">Buka kado digital harian untuk klaim surprise!</p>

              {giftBoxOpened ? (
                <div className="bg-slate-950/90 border border-amber-900/40 rounded-3xl p-6 mt-6 animate-scaleUp">
                  <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                    Unboxing Result
                  </span>
                  <p className="text-amber-200 text-sm font-bold mt-4 leading-relaxed">{currentGiftReward}</p>
                </div>
              ) : (
                <p className="text-xs text-slate-500 my-6">Klik tombol di bawah untuk membuka kado manis hari ini!</p>
              )}

              <button
                onClick={() => {
                  const rnd = giftBoxRewards[Math.floor(Math.random() * giftBoxRewards.length)];
                  setCurrentGiftReward(rnd);
                  setGiftBoxOpened(true);
                  showToast("🎁 Kado Berhasil Dibuka!");
                }}
                className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs rounded-2xl shadow-lg mt-6 transition"
              >
                {giftBoxOpened ? 'Buka Kado Lainnya' : 'Buka Kado Sekarang 🎁'}
              </button>
            </div>
          </div>
        )}

        {/* ================= 15. BOTOL HARAPAN ================= */}
        {activeTab === 'wishes' && (
          <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto font-sans">
            <div className="bg-slate-900/60 border border-slate-800 p-6 md:p-8 rounded-[2.5rem] backdrop-blur-md">
              <div className="text-center max-w-md mx-auto mb-6">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-100 font-serif">Botol Bintang Harapan</h2>
                <p className="text-slate-400 text-xs mt-1">Tulis impian & doa terbaikmu untuk hubungan kita di sini.</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (!newWishInput.trim()) return;
                setWishes([{ id: Date.now(), wish: newWishInput.trim(), author: partnerNames.partner1 }, ...wishes]);
                setNewWishInput('');
                showToast("✨ Harapan Baru Berhasil Dimasukkan ke Botol!");
              }} className="flex gap-3 mb-6">
                <input
                  type="text"
                  required
                  placeholder="Tulis impian / doa harapan berdua..."
                  value={newWishInput}
                  onChange={(e) => setNewWishInput(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-pink-500 transition"
                />
                <button type="submit" className="bg-pink-600 hover:bg-pink-500 text-white font-bold px-6 py-3 rounded-2xl text-xs shadow-lg transition">
                  Kirim Doa
                </button>
              </form>

              <div className="space-y-3">
                {wishes.map((w) => (
                  <div key={w.id} className="bg-slate-950/80 border border-pink-900/30 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">Dari: {w.author}</span>
                      <p className="text-slate-200 text-xs italic mt-1 font-serif">"{w.wish}"</p>
                    </div>
                    <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ================= MOBILE RADIAL BOOKMARK MENU (BEBAS DARI BAR KAKU) ================= */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50 font-sans">
        {mobileMenuOpen && (
          <div className="mb-4 bg-slate-900/95 border border-rose-900/40 rounded-3xl p-3 shadow-2xl backdrop-blur-xl flex flex-col gap-2 max-h-[60vh] overflow-y-auto w-48 animate-scaleUp">
            {navTabs.map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
                    isActive ? 'bg-rose-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 to-pink-600 text-white flex items-center justify-center shadow-2xl border border-rose-400/40 transition active:scale-95"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <NavigationIcon className="w-6 h-6 animate-spin-slow" />}
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-rose-400" /> Pengaturan Jurnal Bucin
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
                  if (typeof window !== 'undefined') localStorage.setItem('journal_photos', JSON.stringify(updatedPhotos));
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

    </div>
  );
}
