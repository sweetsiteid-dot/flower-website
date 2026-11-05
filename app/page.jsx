'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Crown, Heart, Sparkles, Clock, Music, VolumeX,
  Gift, Lock, Unlock, X, BookOpen, Star, Sliders,
  Feather, Send, Disc, Mail, Droplets, Camera, ImageIcon,
  CheckCircle2, Compass, Award, Package, Sparkle, Wand2, Moon
} from 'lucide-react';

// --- ANIMASI SERBUK PERI & BINTANG DISNEY (PIXIE DUST CANVAS) ---
function PixieDustCanvas() {
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

    const stars = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.4 + 0.1,
      speedX: Math.sin(Math.random() * Math.PI * 2) * 0.3,
      opacity: Math.random() * 0.8 + 0.2,
      pulse: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.5 ? '#fef08a' : '#f472b6'
    }));

    let magicSparks = [];
    const handleCanvasClick = (e) => {
      for (let i = 0; i < 10; i++) {
        magicSparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: Math.random() * 5 + 2,
          opacity: 1,
          color: `hsl(${Math.floor(Math.random() * 50 + 40)}, 100%, 75%)`
        });
      }
    };
    window.addEventListener('click', handleCanvasClick);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s) => {
        s.y += s.speedY;
        s.x += s.speedX;
        s.opacity += Math.sin(Date.now() * s.pulse) * 0.01;

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

      magicSparks.forEach((ms, index) => {
        ms.x += ms.vx;
        ms.y += ms.vy;
        ms.opacity -= 0.02;

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

// --- MAIN DISNEY KINGDOM APP ---
export default function App() {
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef(null);

  // Core Data
  const [anniversaryDate, setAnniversaryDate] = useState('2023-02-14T00:00:00');
  const [partnerNames, setPartnerNames] = useState({ partner1: 'Prince', partner2: 'Princess', nickname: 'Disney Enchanted Story' });
  const [partnerStatus, setPartnerStatus] = useState({
    partner1Status: 'Menjaga Istana Cinta 🏰',
    partner2Status: 'Memetik Mawar Ajaib 🌹',
    quote: 'Sekali pun takdir membawa kita ke mana saja, kamu adalah tempat sejatinya hatiku pulang.'
  });

  const [couplePhotos, setCouplePhotos] = useState({
    photo1: '/photo1.jpg',
    photo2: '/photo2.jpg'
  });

  const [activeTab, setActiveTab] = useState('hub');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Live Relationship Timer
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // 2. Mawar Ajaib Streak (Enchanted Rose)
  const [waterStreak, setWaterStreak] = useState(18);
  const [roseLevel, setRoseLevel] = useState(7);
  const [roseExp, setRoseExp] = useState(85);
  const [isWateredToday, setIsWateredToday] = useState(false);

  // 4. Cermin Ajaib Ramalan Hoki
  const loveFortunes = [
    { title: "Momen Dansa Istana", desc: "Hari ini adalah waktu yang sempurna untuk mendengarkan lagu romantis bersama!", tag: "Hoki Kerajaan 100%" },
    { title: "Keajaiban Pelukan", desc: "Satu pelukan hangat hari ini bisa menghapus segala rasa lelah pasanganmu.", tag: "Kasih Sayang Peri" },
    { title: "Bintang Keberuntungan", desc: "Kalian berdua akan menemukan ide kencan seru yang tak terlupakan.", tag: "Impian Terwujud" },
    { title: "Harmoni Dongeng", desc: "Hubungan kalian dilindungi oleh cinta tulus yang tak lekang oleh waktu.", tag: "Abadi" }
  ];
  const [activeFortune, setActiveFortune] = useState(null);

  // 5. Piringan Puisi Kerajaan
  const poemList = [
    { title: "Mekar Senja Istana", text: "Di bawah langit malam bertabur bintang, senyumanmu adalah keajaiban terindah." },
    { title: "Tetes Embun Peri", text: "Seperti sihir manis di pagi hari, hadirmu memberi warna di setiap detik hidupku." },
    { title: "Dansa Bintang-Bintang", text: "Tak butuh mahkota atau istana megah, berada di dekatmu saja sudah menjadi surga." },
    { title: "Takdir Abadi", text: "Kisah cinta kita adalah buku dongeng paling cantik yang tak ingin aku akhiri." }
  ];
  const [selectedPoem, setSelectedPoem] = useState(poemList[0]);

  // 6. Catatan Bintang Apresiasi
  const [gratitudeNotes, setGratitudeNotes] = useState([
    { id: 1, text: 'Terima kasih sudah selalu menjadi pangeran pelindungku setiap hari.', author: 'Princess', date: 'Hari Ini' },
    { id: 2, text: 'Ingat ya, kamu adalah putri paling berharga di seluruh istana hatiku!', author: 'Prince', date: 'Kemarin' }
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  // 7. Kupon Tiket Kerajaan
  const [coupons, setCoupons] = useState([
    { id: 1, title: 'Bebas Pilih Kuliner Istana', desc: 'Pilih tempat makan mana saja, I handle the bill & order!', tag: 'Royal Feast', status: 'Available' },
    { id: 2, title: 'Pelukan Hangat 10 Menit', desc: 'Tukarkan kapan saja kamu butuh rasa nyaman dan pelukan.', tag: 'Magic Comfort', status: 'Available' },
    { id: 3, title: 'Sweet Boba Delivery Instant', desc: 'Es boba manis manis kesukaanmu akan langsung sampai di rumah.', tag: 'Sweet Treat', status: 'Available' }
  ]);

  // 8. Impian Dongeng Together (Bucket List)
  const [bucketList, setBucketList] = useState([
    { id: 1, title: 'Menyaksikan Kembang Api di Depan Istana', completed: true },
    { id: 2, title: 'Dansa Santai Sambil Mendengarkan Musik Favorit', completed: true },
    { id: 3, title: 'Piknik Bintang-Bintang Malam Hari', completed: false },
    { id: 4, title: 'Liburan Bersama ke Tempat Impian', completed: false }
  ]);

  // 9. Timeline Kenangan Istana
  const [timelineEvents, setTimelineEvents] = useState([
    { id: 1, date: '15 Okt 2022', title: 'Awal Kata Menyapa', desc: 'Momen canggung tapi manis saat kita pertama kali saling menyapa.', icon: '✨' },
    { id: 2, date: '02 Nov 2022', title: 'Kencan Pertama Kita', desc: 'Jalan-jalan santai sambil minum boba dan ngobrol sampai larut.', icon: '🌙' },
    { id: 3, date: '14 Feb 2023', title: 'Janji Menyatu', desc: 'Hari di mana kita memutuskan untuk berjalan bersama selamanya.', icon: '👑' }
  ]);

  // 10. Amplop Rahasia PIN
  const [secretPasscode, setSecretPasscode] = useState('1234');
  const [inputPin, setInputPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [lockError, setLockError] = useState('');
  const [secretLetter, setSecretLetter] = useState(
`Untuk Putri/Pangeran Terindahku 👑❤️,

Jika kamu membuka amplop rahasia kerajaan ini, berarti kamu sudah memasukkan PIN jadian kita.

Aku cuma mau bilang terima kasih ya sudah menjadi alasan di balik senyumku setiap hari. Web dongeng ini aku buat khusus untuk menyimpan kenangan indah kita berdua.

Semoga web ini selalu bisa jadi pelukan hangat kapan saja kamu merindukanku.

Dengan Cinta Abadi Istana,
— Pasangan Bucinmu 💕`
  );
  const [displayedText, setDisplayedText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  // 12. Kuis Chemistry Dongeng
  const quizQuestions = [
    { q: "Suasana santai paling ajaib favorit kita berdua?", opts: ["Kopi & Musik Lofi", "Aroma Hujan Musim Semi", "Jalan Malam Sambil Dengarin Lagu", "Nonton Film Sambil Maskeran"], ans: 0 },
    { q: "Siapa yang paling sering ngucapin kangen duluan?", opts: [partnerNames.partner1, partnerNames.partner2, "Dua-duanya barengan!", "Tergantung suasana hati"], ans: 2 },
    { q: "Momen apa yang paling bikin hubungan kita makin erat?", opts: ["Deep talk sampai subuh", "Petualangan jalan-jalan", "Makan makanan favorit", "Semua momen asal sama kamu"], ans: 3 }
  ];
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);

  // 14. Peti Harta Karun Unboxing
  const [giftBoxOpened, setGiftBoxOpened] = useState(false);
  const giftBoxRewards = [
    "🎁 Hadiah Istana: 100 Tetes Serbuk Peri & Voucher Bebas Request Apa Saja!",
    "🧸 Hadiah Istana: Tiket Nonton Film Pilihanmu Malam Ini!",
    "🍰 Hadiah Istana: Sweet Treat / Dessert Langsung Dikirim!"
  ];
  const [currentGiftReward, setCurrentGiftReward] = useState('');

  // 15. Botol Harapan Peri
  const [wishes, setWishes] = useState([
    { id: 1, wish: "Semoga kisah dongeng kita terus bahagia dan abadi selamanya.", author: partnerNames.partner1 },
    { id: 2, wish: "Semua rencana kencan dan liburan kita bisa terwujud tahun ini!", author: partnerNames.partner2 }
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
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Hydration Load
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const savedAnniversary = localStorage.getItem('disney_anniversary');
      if (savedAnniversary) {
        setAnniversaryDate(savedAnniversary);
        setEditAnniversary(savedAnniversary.split('T')[0]);
      }
      const savedPartners = localStorage.getItem('disney_partners');
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
      const newExp = roseExp + 30;
      if (newExp >= 100) {
        setRoseLevel(prev => prev + 1);
        setRoseExp(newExp - 100);
        showToast("🎉 MAWAR AJAIB LEVEL UP! Kebun Makin Berkilau! 🌹");
      } else {
        setRoseExp(newExp);
        showToast("💧 Mawar Ajaib Disiram! Streak Bertambah 🔥");
      }
    } else {
      showToast("Mawar Ajaib sudah disiram hari ini. Kembali besok ya! 🌸");
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

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-amber-300 font-sans">
        <div className="animate-pulse flex items-center gap-3">
          <Crown className="w-8 h-8 text-amber-400 animate-spin" />
          <span className="font-bold text-lg">Membuka Disney Enchanted Kingdom... 🏰✨</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-slate-100 font-serif relative overflow-x-hidden pb-36 pt-6">
      {/* Audio Element (/shapeofmyheart.mp3) */}
      <audio ref={audioRef} src="/shapeofmyheart.mp3" loop prefetch="auto" />

      {/* Pixie Dust Canvas Effect */}
      <PixieDustCanvas />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-amber-500/90 text-slate-950 font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border border-amber-300 backdrop-blur-md font-sans">
          <Sparkles className="w-5 h-5 text-slate-950 fill-slate-950" />
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}

      {/* DISNEY ROYAL TOP HEADER WIDGET */}
      <header className="max-w-3xl mx-auto px-4 mb-8">
        <div className="bg-slate-900/80 border border-amber-500/40 rounded-full p-2.5 px-6 backdrop-blur-xl shadow-2xl flex items-center justify-between font-sans">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabChange('hub')}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-amber-300 p-0.5 shadow-md flex items-center justify-center animate-pulse">
              <Crown className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h1 className="font-bold text-sm bg-gradient-to-r from-amber-200 via-rose-200 to-amber-300 bg-clip-text text-transparent">
                {partnerNames.partner1} & {partnerNames.partner2}
              </h1>
              <p className="text-[9px] text-amber-300/80 tracking-widest uppercase">{partnerNames.nickname}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMusic}
              className={`p-2.5 rounded-full transition border ${
                isPlayingMusic ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-400/40' : 'bg-slate-950 text-amber-400 border-amber-900/40'
              }`}
            >
              {isPlayingMusic ? <Music className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2.5 bg-slate-950 text-slate-300 border border-amber-900/40 rounded-full hover:bg-rose-950 transition"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* WORKSPACE DISNEY CONTENT */}
      <main className="max-w-5xl mx-auto px-4">

        {/* ================= 1. DISNEY MAGICAL HERO & CINDERALLA CLOCK ================= */}
        {activeTab === 'hub' && (
          <div className="space-y-12 animate-fadeIn font-sans">
            
            {/* Dual Royal Photo Mirrors Banner */}
            <div className="relative bg-gradient-to-br from-slate-900/90 via-indigo-950/60 to-slate-900/90 border border-amber-500/30 rounded-[3rem] p-6 md:p-10 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                
                {/* 2 Royal Mirror Photo Frames */}
                <div className="flex items-center justify-center gap-3 relative">
                  {/* Mirror Foto 1 */}
                  <div className="bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 p-1.5 rounded-3xl shadow-2xl transform -rotate-6 hover:rotate-0 transition duration-500 w-36 md:w-44 text-center">
                    <div className="bg-slate-950 p-2.5 rounded-[1.3rem]">
                      <div className="w-full h-36 md:h-44 bg-rose-950 rounded-xl overflow-hidden relative border border-amber-500/40">
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

                  {/* Crown Center Connector */}
                  <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center z-10 animate-pulse">
                    <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
                  </div>

                  {/* Mirror Foto 2 */}
                  <div className="bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 p-1.5 rounded-3xl shadow-2xl transform rotate-6 hover:rotate-0 transition duration-500 w-36 md:w-44 text-center">
                    <div className="bg-slate-950 p-2.5 rounded-[1.3rem]">
                      <div className="w-full h-36 md:h-44 bg-pink-950 rounded-xl overflow-hidden relative border border-amber-500/40">
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

                {/* Royal Story Text */}
                <div className="text-center md:text-right max-w-md">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest px-3.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-700/50 font-bold">
                    <Crown className="w-3 h-3 text-amber-400" /> Disney Enchanted Edition
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mt-3 font-serif leading-tight">
                    Dongeng Kasih <br />
                    <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-pink-300 bg-clip-text text-transparent">
                      {partnerNames.partner1} & {partnerNames.partner2}
                    </span>
                  </h2>
                  <p className="text-slate-300 text-sm mt-3 italic font-serif leading-relaxed">
                    "{partnerStatus.quote}"
                  </p>
                </div>
              </div>
            </div>

            {/* CINDERELLA CLOCK TOWER TIMER */}
            <div className="bg-slate-900/70 border border-amber-500/30 rounded-[3rem] p-8 backdrop-blur-xl text-center shadow-2xl relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950 text-amber-300 text-xs font-bold mb-6 border border-amber-500/40">
                <Clock className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span>Jam Menara Istana (Live Counter)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-2xl mx-auto">
                {[
                  { label: 'Hari Bersama', val: timeTogether.days },
                  { label: 'Jam Berlalu', val: timeTogether.hours },
                  { label: 'Menit Indah', val: timeTogether.minutes },
                  { label: 'Detik Berharga', val: timeTogether.seconds }
                ].map((t, idx) => (
                  <div key={idx} className="bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 border border-amber-500/30 rounded-[2rem] p-5 text-center shadow-inner hover:scale-105 transition duration-300">
                    <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-amber-300 font-mono">
                      {t.val}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-amber-300/80 mt-2 tracking-wider">{t.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ENCHANTED ROSE STREAK (MAWAR AJAIB) */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-[2.5rem] p-6 md:p-8 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0 shadow-lg">
                  <Droplets className="w-7 h-7 animate-bounce text-rose-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Level {roseLevel} Mawar Ajaib</span>
                    <span className="text-xs bg-rose-950 text-rose-300 px-2.5 py-0.5 rounded-full border border-rose-800 font-mono font-bold">
                      {waterStreak} Hari Streak 🔥
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 mt-1">Siram Mawar Ajaib Istana</h3>
                  <div className="w-48 bg-slate-950 rounded-full h-2 mt-2 border border-slate-800 overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-rose-500 h-full rounded-full" style={{ width: `${roseExp}%` }} />
                  </div>
                </div>
              </div>

              <button
                onClick={handleWaterGarden}
                disabled={isWateredToday}
                className={`px-7 py-3.5 rounded-2xl font-bold text-xs transition shadow-lg shrink-0 flex items-center gap-2 ${
                  isWateredToday
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 shadow-amber-500/20'
                }`}
              >
                <Droplets className="w-4 h-4" />
                <span>{isWateredToday ? 'Sudah Disiram ✓' : 'Siram Mawar Ajaib (+30 EXP)'}</span>
              </button>
            </div>

            {/* DISNEY FEATURE GRID BUTTONS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              {[
                { id: 'fortune', name: '4. Cermin Ajaib', icon: Sparkle, color: 'text-amber-300' },
                { id: 'wheel', name: '5. Piringan Puisi', icon: Disc, color: 'text-rose-400' },
                { id: 'notes', name: '6. Bintang Apresiasi', icon: Feather, color: 'text-emerald-400' },
                { id: 'coupons', name: '7. Tiket Kerajaan', icon: Gift, color: 'text-pink-400' },
                { id: 'bucket', name: '8. Impian Dongeng', icon: Star, color: 'text-yellow-400' },
                { id: 'timeline', name: '9. Timeline Kenangan', icon: Wand2, color: 'text-purple-400' },
                { id: 'secret', name: '10. Amplop PIN', icon: Mail, color: 'text-amber-200' },
                { id: 'quiz', name: '12. Kuis Chemistry', icon: Compass, color: 'text-cyan-400' },
                { id: 'giftbox', name: '14. Peti Kejutan', icon: Package, color: 'text-amber-400' },
                { id: 'wishes', name: '15. Harapan Peri', icon: Sparkles, color: 'text-pink-300' }
              ].map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className="bg-slate-900/80 border border-amber-500/20 hover:border-amber-400/60 rounded-2xl p-4 cursor-pointer transition flex items-center gap-3 group shadow-xl"
                  >
                    <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 ${item.color} group-hover:scale-110 transition`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-200">{item.name}</span>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ================= 4. CERMIN AJAIB RAMALAN HOKI ================= */}
        {activeTab === 'fortune' && (
          <div className="space-y-8 animate-fadeIn max-w-xl mx-auto font-sans">
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-[2.5rem] p-8 text-center backdrop-blur-xl shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center mx-auto mb-3">
                <Sparkle className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100 font-serif">Cermin Ajaib Kerajaan</h2>
              <p className="text-slate-400 text-xs mt-1">Buka ramalan hoki romantis harianmu dari Cermin Ajaib!</p>

              {activeFortune ? (
                <div className="bg-slate-950/90 border border-amber-500/40 rounded-3xl p-6 mt-6 animate-scaleUp">
                  <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                    {activeFortune.tag}
                  </span>
                  <h4 className="font-bold text-slate-100 mt-3 text-base">{activeFortune.title}</h4>
                  <p className="text-slate-300 text-xs mt-2 italic font-serif">"{activeFortune.desc}"</p>
                </div>
              ) : (
                <p className="text-xs text-slate-500 my-6">Klik tombol di bawah untuk bertanya pada Cermin Ajaib!</p>
              )}

              <button
                onClick={() => {
                  const rnd = loveFortunes[Math.floor(Math.random() * loveFortunes.length)];
                  setActiveFortune(rnd);
                  showToast("✨ Cermin Ajaib Menjawab Ramalanmu!");
                }}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 font-bold text-xs rounded-2xl shadow-lg mt-6 transition"
              >
                Tanya Cermin Ajaib
              </button>
            </div>
          </div>
        )}

        {/* ================= 5. PIRINGAN PUISI KERAJAAN ================= */}
        {activeTab === 'wheel' && (
          <div className="space-y-8 animate-fadeIn max-w-2xl mx-auto">
            <div className="bg-slate-900/70 border border-amber-500/30 p-8 rounded-[2.5rem] text-center backdrop-blur-xl shadow-2xl relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center mx-auto mb-4 shadow-lg animate-spin-slow">
                <Disc className="w-7 h-7 text-slate-950" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100 font-serif">Piringan Puisi Kerajaan</h2>
              <p className="text-slate-400 text-xs mt-1 font-sans">Putar piringan puisi untuk membaca bait kata-kata tersirat!</p>

              <div className="grid grid-cols-2 gap-3 mt-6 font-sans">
                {poemList.map((poem, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPoem(poem)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition ${
                      selectedPoem.title === poem.title
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {poem.title}
                  </button>
                ))}
              </div>

              <div className="mt-6 bg-slate-950/90 border border-amber-500/30 rounded-3xl p-6 text-center shadow-inner">
                <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800/40 font-sans">
                  {selectedPoem.title}
                </span>
                <p className="text-amber-100 text-base italic mt-4 leading-relaxed font-serif">
                  "{selectedPoem.text}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= 6. BINTANG APRESIASI ================= */}
        {activeTab === 'notes' && (
          <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto font-sans">
            <div className="bg-slate-900/60 border border-slate-800 p-6 md:p-8 rounded-[2.5rem] backdrop-blur-md">
              <div className="text-center max-w-md mx-auto mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center mx-auto mb-2">
                  <Feather className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-100 font-serif">Bintang Apresiasi Istana</h2>
                <p className="text-slate-400 text-xs mt-1">Tempelkan ucapan pujian & rasa terima kasih harian di sini.</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (!newNoteText.trim()) return;
                setGratitudeNotes([{ id: Date.now(), text: newNoteText.trim(), author: partnerNames.partner1, date: 'Baru Saja' }, ...gratitudeNotes]);
                setNewNoteText('');
                showToast("✨ Bintang Apresiasi Berhasil Ditempel!");
              }} className="flex gap-3 mb-6">
                <input
                  type="text"
                  required
                  placeholder="Tulis pesan manis hari ini..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition"
                />
                <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs shadow-lg transition">
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

        {/* ================= 7. TIKET KERAJAAN ================= */}
        {activeTab === 'coupons' && (
          <div className="space-y-8 animate-fadeIn font-sans max-w-4xl mx-auto">
            <div className="text-center max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-slate-100 font-serif">Voucher Tiket Kerajaan</h2>
              <p className="text-slate-400 text-xs mt-1">Tukarkan voucher ini untuk klaim hadiah spesialmu!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {coupons.map((c) => (
                <div key={c.id} className="relative bg-slate-900/80 border border-amber-500/30 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden shadow-xl">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950 border-r border-amber-500/30" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950 border-l border-amber-500/30" />

                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-950 px-2.5 py-1 rounded-full border border-amber-800">{c.tag}</span>
                    <h4 className="font-bold text-slate-100 text-base mt-3">{c.title}</h4>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">{c.desc}</p>
                  </div>

                  <button
                    disabled={c.status !== 'Available'}
                    onClick={() => {
                      setCoupons(coupons.map(item => item.id === c.id ? { ...item, status: 'Redeemed' } : item));
                      showToast("🎉 Voucher Kerajaan Berhasil Ditukarkan!");
                    }}
                    className={`w-full py-3 rounded-2xl font-bold text-xs mt-6 transition ${
                      c.status === 'Available' ? 'bg-amber-400 hover:bg-amber-300 text-slate-950' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {c.status === 'Available' ? 'Tukarkan Voucher' : 'Sudah Terpakai ✓'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 8. IMPIAN DONGENG ================= */}
        {activeTab === 'bucket' && (
          <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto font-sans">
            <div className="bg-slate-900/60 border border-slate-800 rounded-[2.5rem] p-6 md:p-8 backdrop-blur-md">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 font-serif">
                    <Star className="w-5 h-5 text-amber-300" /> Impian Dongeng Together
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Checklist impian berdua yang terwujud</p>
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
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${b.completed ? 'border-amber-400 bg-amber-400/20 text-amber-300' : 'border-slate-700'}`}>
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
                <Wand2 className="w-6 h-6 text-amber-300" />
                Timeline Kenangan Istana
              </h2>

              <div className="relative border-l-2 border-amber-500/30 ml-4 space-y-8">
                {timelineEvents.map((item) => (
                  <div key={item.id} className="relative pl-8 group">
                    <div className="absolute -left-4 top-1 w-8 h-8 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center text-sm">
                      {item.icon}
                    </div>
                    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition">
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">{item.date}</span>
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
              <div className="bg-slate-900/80 border border-amber-500/30 rounded-[2.5rem] p-8 backdrop-blur-xl text-center shadow-2xl space-y-6">
                <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 font-serif">Amplop Surat Kerajaan</h2>
                  <p className="text-xs text-slate-400 mt-1">Masukkan 4-angka PIN rahasia (PIN Default: 1234)</p>
                </div>

                <div className="flex justify-center gap-4 my-4">
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className={`w-4 h-4 rounded-full border-2 transition-all ${
                        inputPin.length > idx ? 'bg-amber-400 border-amber-400 scale-125' : 'border-slate-700 bg-slate-950'
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
              <div className="bg-slate-950/90 border border-amber-500/40 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                    <Unlock className="w-5 h-5 text-emerald-400" /> Surat Kerajaan Terbuka
                  </div>
                  <button onClick={() => setIsUnlocked(false)} className="text-slate-500 hover:text-slate-300">
                    <Lock className="w-4 h-4" />
                  </button>
                </div>

                <div className="prose text-amber-100 leading-relaxed text-sm whitespace-pre-line bg-slate-900/60 p-6 rounded-2xl border border-amber-500/20 font-serif">
                  {displayedText}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 12. KUIS CHEMISTRY DONGENG ================= */}
        {activeTab === 'quiz' && (
          <div className="space-y-8 animate-fadeIn max-w-xl mx-auto font-sans">
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-[2.5rem] p-8 backdrop-blur-xl text-center shadow-2xl">
              <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Compass className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100 font-serif">Kuis Chemistry Dongeng</h2>
              <p className="text-xs text-slate-400 mt-1 mb-6">Uji kecocokan ingatan kenangan kalian!</p>

              {!quizFinished ? (
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 text-left">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-amber-300 font-mono">Soal {quizIndex + 1} dari {quizQuestions.length}</span>
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
                        className="w-full text-left p-3.5 rounded-xl bg-slate-900 hover:bg-amber-950/60 border border-slate-800 hover:border-amber-500/40 text-xs transition text-slate-200"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-8 text-center">
                  <Award className="w-16 h-16 text-amber-300 mx-auto mb-3 animate-bounce" />
                  <h3 className="text-xl font-bold text-slate-100 mb-1">Kuis Selesai!</h3>
                  <p className="text-slate-400 text-xs mb-6">Skor Kecocokan: <span className="text-amber-300 font-bold text-lg">{quizScore} / {quizQuestions.length}</span></p>
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

        {/* ================= 14. PETI KEJUTAN UNBOXING ================= */}
        {activeTab === 'giftbox' && (
          <div className="space-y-8 animate-fadeIn max-w-xl mx-auto font-sans">
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-[2.5rem] p-8 text-center backdrop-blur-xl shadow-2xl">
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce">
                <Package className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100 font-serif">Peti Kejutan Kerajaan</h2>
              <p className="text-xs text-slate-400 mt-1">Buka kado digital harian untuk klaim surprise!</p>

              {giftBoxOpened ? (
                <div className="bg-slate-950/90 border border-amber-500/40 rounded-3xl p-6 mt-6 animate-scaleUp">
                  <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                    Peti Terbuka 🎁
                  </span>
                  <p className="text-amber-200 text-sm font-bold mt-4 leading-relaxed">{currentGiftReward}</p>
                </div>
              ) : (
                <p className="text-xs text-slate-500 my-6">Klik tombol di bawah untuk membuka peti kejutan!</p>
              )}

              <button
                onClick={() => {
                  const rnd = giftBoxRewards[Math.floor(Math.random() * giftBoxRewards.length)];
                  setCurrentGiftReward(rnd);
                  setGiftBoxOpened(true);
                  showToast("🎁 Peti Kejutan Berhasil Dibuka!");
                }}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 font-bold text-xs rounded-2xl shadow-lg mt-6 transition"
              >
                {giftBoxOpened ? 'Buka Peti Lainnya' : 'Buka Peti Sekarang 🎁'}
              </button>
            </div>
          </div>
        )}

        {/* ================= 15. HARAPAN PERI ================= */}
        {activeTab === 'wishes' && (
          <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto font-sans">
            <div className="bg-slate-900/60 border border-slate-800 p-6 md:p-8 rounded-[2.5rem] backdrop-blur-md">
              <div className="text-center max-w-md mx-auto mb-6">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-pink-300 flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-100 font-serif">Botol Harapan Peri</h2>
                <p className="text-slate-400 text-xs mt-1">Tulis impian & doa terbaikmu untuk hubungan kita di sini.</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (!newWishInput.trim()) return;
                setWishes([{ id: Date.now(), wish: newWishInput.trim(), author: partnerNames.partner1 }, ...wishes]);
                setNewWishInput('');
                showToast("✨ Harapan Baru Berhasil Dimasukkan!");
              }} className="flex gap-3 mb-6">
                <input
                  type="text"
                  required
                  placeholder="Tulis impian / doa harapan berdua..."
                  value={newWishInput}
                  onChange={(e) => setNewWishInput(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                />
                <button type="submit" className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs shadow-lg transition">
                  Kirim Doa
                </button>
              </form>

              <div className="space-y-3">
                {wishes.map((w) => (
                  <div key={w.id} className="bg-slate-950/80 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">Dari: {w.author}</span>
                      <p className="text-slate-200 text-xs italic mt-1 font-serif">"{w.wish}"</p>
                    </div>
                    <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-300" /> Pengaturan Disney Web
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
                  if (typeof window !== 'undefined') localStorage.setItem('disney_photos', JSON.stringify(updatedPhotos));
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

      {/* DISNEY MAGICAL DOCK NAVIGATION BAR */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 backdrop-blur-xl border border-amber-500/40 rounded-full p-1.5 px-4 shadow-2xl flex items-center gap-2 font-sans max-w-[95vw] overflow-x-auto">
        {[
          { id: 'hub', icon: Crown },
          { id: 'fortune', icon: Sparkle },
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
              className={`p-2.5 rounded-full transition-all relative shrink-0 ${
                isActive ? 'bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 shadow-lg shadow-amber-500/30 scale-110 font-bold' : 'text-slate-400 hover:text-amber-200'
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
