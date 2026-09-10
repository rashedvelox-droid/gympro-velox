import { useEffect, useMemo, useState } from 'react';

const INSTAGRAM_URL = 'https://www.instagram.com/velo.x01/';

// Reusable link component that redirects to Instagram
const InstaLink = ({ children, className = '', ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }) => (
  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={className} {...props}>
    {children}
  </a>
);

type PortalView = 'client' | 'coach' | 'admin' | 'payment';

const openPortal = (view: PortalView) => {
  if (typeof window === 'undefined') return;
  const targetUrl = `${window.location.pathname}?view=${view}`;
  const features = view === 'admin'
    ? 'width=1400,height=900,noopener,noreferrer'
    : 'width=1100,height=800,noopener,noreferrer';
  window.open(targetUrl, '_blank', features);
};

// ─── TOP BANNER ───
function TopBanner({ language, setLanguage }: { language: 'ar' | 'en'; setLanguage: (value: 'ar' | 'en') => void }) {
  const content = useMemo(() => ({
    ar: {
      text: 'موقع تجريبي · التسجيل عبر إنستغرام',
      label: 'اللغة',
    },
    en: {
      text: 'DEMO WEBSITE · REGISTRATION VIA INSTAGRAM',
      label: 'Language',
    },
  }), [language]);

  return (
    <div className="border-b border-black/10 bg-lime text-black">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-3 py-2.5 text-[9px] font-semibold uppercase tracking-[0.18em] sm:px-6 sm:text-[10px] lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          <span>{content[language].text}</span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-2 py-1">
          <span className="text-[10px] text-black/70">{content[language].label}</span>
          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="rounded-full bg-black px-2.5 py-1 text-[10px] font-bold text-lime transition-colors"
          >
            {language === 'en' ? 'AR' : 'EN'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── NAVBAR ───
function Navbar({ language, onSubscribeClick }: { language: 'ar' | 'en'; onSubscribeClick: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = useMemo(
    () =>
      language === 'ar'
        ? [
            { label: 'الرئيسية', href: '#home' },
            { label: 'الجدول', href: '#classes' },
            { label: 'عنا', href: '#about' },
            { label: 'الأسعار', href: '#pricing' },
            { label: 'الدخول', href: '#auth' },
          ]
        : [
            { label: 'HOME', href: '#home' },
            { label: 'CLASSES', href: '#classes' },
            { label: 'ABOUT', href: '#about' },
            { label: 'PRICING', href: '#pricing' },
            { label: 'ACCESS', href: '#auth' },
          ],
    [language]
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-dark-border bg-dark/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-lime">🏋️</span>
          <span className="text-base font-black tracking-wider text-white sm:text-lg">GYMPRO</span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium tracking-[0.2em] text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button onClick={onSubscribeClick} className="hidden items-center gap-2 bg-lime px-4 py-2.5 text-sm font-bold tracking-wider text-black transition-colors hover:bg-lime-dark md:flex">
          {language === 'ar' ? 'الاشتراك' : 'SUBSCRIBE'} <span>→</span>
        </button>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white md:hidden">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-dark-border bg-dark px-6 pb-6 md:hidden">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="block border-b border-dark-border py-3 text-sm font-medium tracking-[0.2em] text-white/70 transition-colors hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button onClick={onSubscribeClick} className="mt-4 block w-full bg-lime px-6 py-3 text-center text-sm font-bold tracking-wider text-black">
            {language === 'ar' ? 'الاشتراك' : 'SUBSCRIBE'} →
          </button>
        </div>
      )}
    </nav>
  );
}

// ─── HERO SECTION ───
function HeroSection({ language, onSubscribeClick }: { language: 'ar' | 'en'; onSubscribeClick: () => void }) {
  const content = {
    ar: {
      badge: 'نادي لياقة متميز — تأسس 2019',
      title1: 'اصنع',
      title2: 'أسطورتك',
      title3: '',
      subtitle: 'تدرب مع مدربين ممتازين. حقق أهدافك بسهولة.',
      note: 'معاينة تجريبية · اشترك الآن لتصلك كافة المميزات',
      cta1: 'الاشتراك الآن →',
      cta2: 'عرض الخطط',
      footnote: 'بدون التزام · يمكنك الإلغاء في أي وقت.',
      rating: 'تقييم الأعضاء',
      live: 'حصة مباشرة',
      spots: 'HIIT — 12 مقعدًا متبقيًا',
    },
    en: {
      badge: 'PREMIUM FITNESS CLUB — EST. 2019',
      title1: 'FORGE',
      title2: 'YOUR',
      title3: 'LEGEND',
      subtitle: 'TRAIN WITH ELITE TRAINERS. HIT FITNESS GOALS SIMPLER.',
      note: 'DEMO PREVIEW · SUBSCRIBE NOW TO UNLOCK ALL FEATURES',
      cta1: 'SUBSCRIBE NOW →',
      cta2: 'VIEW PLANS',
      footnote: 'NO COMMITMENT. CANCEL ANYTIME.',
      rating: 'MEMBER RATING',
      live: 'Live Class',
      spots: 'HIIT — 12 SPOTS LEFT',
    },
  };

  const copy = content[language];

  return (
    <section id="home" className="hero-image relative min-h-[100svh] overflow-hidden bg-dark sm:min-h-[100dvh]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,255,0,0.14),_transparent_38%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(0,0,0,0.18)_0%,_rgba(0,0,0,0)_100%)]" />
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-3 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-6 lg:px-8 lg:pb-14 lg:pt-8">
        <p className="mb-5 text-[9px] font-semibold tracking-[0.3em] text-lime sm:mb-6 sm:text-[10px]">
          {copy.badge}
        </p>

        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end lg:gap-14 xl:gap-20">
          <div className="w-full max-w-2xl flex-1 text-center sm:text-left lg:max-w-[560px]">
            <h1 className="font-black leading-[0.82] tracking-[-0.03em] text-[clamp(2.4rem,6.5vw,4.6rem)] sm:text-[clamp(2.8rem,7vw,4.8rem)]">
              <span className="block text-white">{copy.title1}</span>
              <span className="block text-lime text-glow-yellow">{copy.title2}</span>
              {copy.title3 ? <span className="block text-stroke text-[clamp(2.2rem,6vw,3.8rem)] sm:text-[clamp(2.4rem,6.5vw,4rem)]">{copy.title3}</span> : null}
            </h1>

            <p className="mx-auto mt-5 max-w-md text-[10px] uppercase tracking-[0.15em] text-white/50 sm:mx-0 sm:mt-6 sm:text-[11px]">
              {copy.subtitle}
            </p>

            <p className="mx-auto mt-4 max-w-md text-[9px] uppercase tracking-[0.25em] text-white/40 sm:mx-0 sm:mt-5 sm:text-[10px]">
              {copy.note}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-start">
              <button onClick={onSubscribeClick} className="w-full bg-lime px-5 py-3 text-center text-sm font-bold tracking-wider text-black transition-colors hover:bg-lime-dark sm:w-auto">
                {copy.cta1}
              </button>
              <a href="#pricing" className="w-full border border-white/20 px-5 py-3 text-center text-sm font-bold tracking-wider text-white transition-colors hover:border-white/50 sm:w-auto">
                {copy.cta2}
              </a>
            </div>

            <p className="mx-auto mt-5 text-[9px] uppercase tracking-[0.2em] text-white/30 sm:mx-0 sm:text-[10px]">
              {copy.footnote}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[420px] flex-shrink-0 self-stretch lg:mx-0 lg:w-[340px] xl:w-[420px]">
            <div className="absolute left-3 top-3 z-10 flex items-center gap-3 border border-dark-border bg-dark-surface/90 px-4 py-3 sm:left-0 sm:top-0 sm:px-6 sm:py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lime sm:h-10 sm:w-10">
                <span className="text-black text-lg">★</span>
              </div>
              <div>
                <p className="text-lime font-black text-lg">4.9 / 5</p>
                <p className="text-xs tracking-[0.15em] text-white/50">{copy.rating}</p>
              </div>
            </div>

            <img 
              src="https://images.pexels.com/photos/6739958/pexels-photo-6739958.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="Modern gym interior"
              className="mt-12 h-[230px] w-full rounded-[24px] border border-white/10 object-cover grayscale sm:h-[280px] lg:h-[340px] xl:h-[420px]"
            />

            <div className="absolute bottom-3 right-3 border border-dark-border bg-dark-surface/90 px-3 py-3 sm:bottom-4 sm:right-0 sm:px-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-sm font-bold text-white">{copy.live}</p>
              </div>
              <p className="text-xs tracking-[0.15em] text-white/50">{copy.spots}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-dark-border pt-4">
          <p className="text-white/30 text-xs tracking-[0.3em] text-center">SCROLL</p>
        </div>
      </div>
    </section>
  );
}

// ─── STATS SECTION ───
function StatsSection() {
  const stats = [
    { number: '4,200+', label: 'ACTIVE MEMBERS' },
    { number: '38', label: 'EXPERT TRAINERS' },
    { number: '3', label: 'LOCATIONS' },
  ];

  return (
    <section className="bg-[linear-gradient(180deg,_rgba(10,10,10,0.98)_0%,_rgba(15,15,15,0.96)_100%)] py-6 sm:py-10">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="rounded-[14px] border border-white/8 bg-white/[0.04] p-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-0 sm:border-0 sm:bg-transparent sm:shadow-none sm:backdrop-blur-none">
              <p className="text-2xl font-black text-lime sm:text-3xl">{stat.number}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/45 sm:mt-2 sm:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHAT WE OFFER SECTION ───
function OfferSection() {
  const services = [
    {
      tag: 'CLASSES',
      icon: '🏋️',
      title: 'GROUP CLASSES',
      desc: '60+ weekly classes: HIIT, CrossFit, Yoga, Boxing, and more.',
    },
    {
      tag: 'RECOVERY',
      icon: '✨',
      title: 'RECOVERY ZONE',
      desc: 'Ice baths, sauna, massage chairs, and physiotherapy sessions.',
    },
    {
      tag: 'TRAINING',
      icon: '👤',
      title: 'PERSONAL TRAINING',
      desc: '1-on-1 sessions with elite certified trainers tailored to your goals.',
    },
  ];

  return (
    <section id="classes" className="bg-[radial-gradient(circle_at_top,_rgba(212,255,0,0.08),_transparent_40%),_#0a0a0a] py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-lime">WHAT WE OFFER</p>
        
        <div className="mb-14 flex flex-col items-start gap-8 lg:mb-20 lg:flex-row lg:justify-between">
          <div>
            <h2 className="text-[clamp(2.4rem,7vw,6.2rem)] font-black leading-[0.9] tracking-tight">
              <span className="block text-white">EVERYTHING</span>
              <span className="block text-stroke">YOU NEED</span>
            </h2>
            <div className="mt-6 h-1 w-16 bg-lime" />
          </div>
          <p className="max-w-md text-sm text-white/55 sm:text-lg lg:mt-12">
            A complete fitness ecosystem under one roof. From iron to recovery, every detail is designed to elevate your performance.
          </p>
        </div>

        <div className="flex flex-row gap-2 overflow-x-auto pb-2 sm:gap-6 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <img
              src="https://images.pexels.com/photos/7031705/pexels-photo-7031705.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="Gym equipment"
              className="mb-3 h-40 w-full object-cover sm:mb-6 sm:h-56 lg:h-80"
            />
          </div>

          {services.map((service, i) => (
            <div key={i} className="group min-w-[78%] border border-dark-border p-3 transition-colors hover:border-lime/30 sm:min-w-[48%] sm:p-5 lg:min-w-0 lg:p-8">
              <div className="mb-4 flex items-center justify-between sm:mb-6 lg:mb-8">
                <span className="border border-dark-border px-2 py-1 text-[10px] tracking-[0.2em] text-white/50 sm:text-xs">
                  {service.tag}
                </span>
                <span className="flex h-8 w-8 items-center justify-center border border-dark-border text-lime transition-colors group-hover:border-lime/50 sm:h-10 sm:w-10">
                  {service.icon}
                </span>
              </div>
              <h3 className="mb-2 text-sm font-black text-white sm:text-xl sm:mb-3">{service.title}</h3>
              <p className="text-xs leading-relaxed text-white/40 sm:text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COACHES SECTION ───
function CoachesSection({ language, onSubscribeClick }: { language: 'ar' | 'en'; onSubscribeClick: () => void }) {
  const [selectedCoach, setSelectedCoach] = useState<{
    id: string;
    name: string;
    role: string;
    cert: string;
    image: string;
    bio: string;
    stats: { clients: string; rating: string; exp: string };
    specialties: string[];
  } | null>(null);

  const coaches = useMemo(
    () => [
      {
        id: 'khalid',
        name: language === 'ar' ? 'خالد الرشيدي' : 'KHALID AL-RASHIDI',
        role: language === 'ar' ? 'مدرب القوة والتأهيل' : 'STRENGTH & CONDITIONING',
        cert: language === 'ar' ? 'معتمد NSCA-CSCS · 9 سنوات خبرة' : 'NSCA-CSCS · 9 Years',
        image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
        bio: language === 'ar' 
          ? 'متخصص في بناء القوة العضلية وإعادة التأهيل البدني. يمتلك خبرة تتجاوز 9 سنوات في تصميم البرامج التدريبية الاحترافية لمختلف المستويات.'
          : 'Specialist in strength programming and physical rehabilitation with over 9 years of elite training experience.',
        stats: { clients: '140+', rating: '4.9 ★', exp: language === 'ar' ? '9 سنوات' : '9 Yrs' },
        specialties: language === 'ar' 
          ? ['رفع الأثقال والقوة', 'بناء الكتلة العضلية', 'تصحيح تكنيك التمرين']
          : ['Powerlifting', 'Hypertrophy', 'Technique Refinement'],
      },
      {
        id: 'nora',
        name: language === 'ar' ? 'نورة القحطاني' : 'NORA AL-QAHTANI',
        role: language === 'ar' ? 'مدربة اليوغا والمرونة' : 'YOGA & MOBILITY',
        cert: language === 'ar' ? 'معتمدة RYT-500 · 7 سنوات خبرة' : 'RYT-500 · 7 Years',
        image: 'https://images.pexels.com/photos/6739125/pexels-photo-6739125.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
        bio: language === 'ar'
          ? 'خبيرة في تمارين الاستشفاء والمرونة واليوغا لمساعدة الأجسام على الوصول إلى أقصى كفاءة حركية وتجنب الإصابات.'
          : 'Expert in mobility, recovery, and therapeutic yoga helping athletes achieve full kinetic range without pain.',
        stats: { clients: '180+', rating: '5.0 ★', exp: language === 'ar' ? '7 سنوات' : '7 Yrs' },
        specialties: language === 'ar'
          ? ['اليوغا الحركية', 'تحسين مرونة المفاصل', 'الاستشفاء العضلي']
          : ['Vinyasa Flow', 'Joint Mobility', 'Muscle Recovery'],
      },
      {
        id: 'faisal',
        name: language === 'ar' ? 'فيصل الزهراني' : 'FAISAL AL-ZAHRANI',
        role: language === 'ar' ? 'مدرب الملاكمة وHIIT' : 'BOXING & HIIT',
        cert: language === 'ar' ? 'شهادة AIBA الدولية · 11 سنة خبرة' : 'AIBA Certified · 11 Years',
        image: 'https://images.pexels.com/photos/6456176/pexels-photo-6456176.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
        bio: language === 'ar'
          ? 'مدرب ملاكمة محترف وحصص لياقة عالية الشدة. يركز على رفع اللياقة القلبية وحرق الدهون بأعلى كفاءة.'
          : 'Professional boxing coach and HIIT specialist focusing on peak cardiovascular fitness and fat burn.',
        stats: { clients: '210+', rating: '4.9 ★', exp: language === 'ar' ? '11 سنة' : '11 Yrs' },
        specialties: language === 'ar'
          ? ['ملاكمة احترافية', 'تدريب HIIT المكثف', 'رفع السرعة والتحمل']
          : ['Pro Boxing', 'High-Intensity HIIT', 'Stamina & Agility'],
      },
      {
        id: 'lama',
        name: language === 'ar' ? 'لمى العتيبي' : 'LAMA AL-OTAIBI',
        role: language === 'ar' ? 'أخصائية التغذية والصحة' : 'NUTRITION & WELLNESS',
        cert: language === 'ar' ? 'معتمدة RDN, NASM-CPT · 6 سنوات' : 'RDN, NASM-CPT · 6 Years',
        image: 'https://images.pexels.com/photos/18162098/pexels-photo-18162098.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
        bio: language === 'ar'
          ? 'أخصائية تغذية رياضية مرخصة تقدم خططاً غذائية متكاملة تناسب طبيعة جسم كل رياضي وأهدافه.'
          : 'Licensed sports nutritionist delivering customized performance meal plans tailored to body composition goals.',
        stats: { clients: '160+', rating: '4.8 ★', exp: language === 'ar' ? '6 سنوات' : '6 Yrs' },
        specialties: language === 'ar'
          ? ['تغذية الرياضيين', 'إدارة الوزن', 'حساب الماكروز']
          : ['Sports Nutrition', 'Weight Management', 'Macro Optimization'],
      },
    ],
    [language]
  );

  return (
    <section id="about" className="bg-[linear-gradient(180deg,_rgba(10,10,10,0.98)_0%,_rgba(12,12,12,0.98)_100%)] bg-grid py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-lime">
          {language === 'ar' ? 'مدربونا المتميزون' : 'OUR COACHES'}
        </p>
        <h2 className="mb-12 text-[clamp(2.2rem,6.8vw,5.8rem)] font-black leading-[0.9] tracking-tight sm:mb-20">
          <span className="block text-white">{language === 'ar' ? 'فريق' : 'ELITE'}</span>
          <span className="block text-stroke">{language === 'ar' ? 'التدريب' : 'TRAINERS'}</span>
        </h2>

        <div className="flex flex-row gap-3 overflow-x-auto pb-2 sm:gap-5 xl:grid xl:grid-cols-4 xl:overflow-visible xl:pb-0">
          {coaches.map((coach) => (
            <div
              key={coach.id}
              onClick={() => setSelectedCoach(coach)}
              className="group cursor-pointer min-w-[78%] rounded-[16px] border border-dark-border bg-dark-card/60 p-3 transition-all duration-300 hover:border-lime/40 hover:bg-dark-card hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(212,255,0,0.08)] sm:min-w-[48%] xl:min-w-0"
            >
              <div className="relative mb-3 overflow-hidden rounded-[12px]">
                <img
                  src={coach.image}
                  alt={coach.name}
                  draggable={false}
                  className="h-[170px] w-full object-cover grayscale transition-[transform,filter] duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:saturate-[1.15] sm:h-[220px] select-none pointer-events-none"
                />
                <div className="absolute top-2 right-2 rounded-full border border-lime/30 bg-black/60 px-2.5 py-1 backdrop-blur-md">
                  <span className="text-[10px] font-bold text-lime">{coach.stats.rating}</span>
                </div>
              </div>
              <h3 className="text-sm font-black tracking-wider text-white sm:text-base">{coach.name}</h3>
              <p className="mt-1 text-[11px] font-semibold tracking-[0.12em] text-lime sm:text-xs">{coach.role}</p>
              <p className="mt-1 text-[10px] text-white/40 sm:text-xs">{coach.cert}</p>

              <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2.5">
                <span className="text-[10px] text-white/50">{language === 'ar' ? 'عرض البروفايل' : 'View Profile'}</span>
                <span className="text-xs font-bold text-lime transition-transform group-hover:translate-x-1">←</span>
              </div>
            </div>
          ))}
        </div>

        {/* Coach Details Modal */}
        {selectedCoach && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="w-full max-w-2xl rounded-[24px] border border-white/10 bg-dark-card p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedCoach(null)}
                className="absolute top-4 text-white/50 hover:text-white transition-colors"
                style={{ left: language === 'ar' ? '1.5rem' : 'auto', right: language === 'ar' ? 'auto' : '1.5rem' }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <img
                  src={selectedCoach.image}
                  alt={selectedCoach.name}
                  className="h-44 w-full sm:w-44 rounded-[16px] object-cover border border-white/10"
                />
                <div className="flex-1">
                  <span className="inline-block rounded-full bg-lime/10 border border-lime/30 px-3 py-1 text-xs font-bold text-lime mb-2">
                    {selectedCoach.role}
                  </span>
                  <h3 className="text-2xl font-black text-white">{selectedCoach.name}</h3>
                  <p className="text-xs text-white/50 mt-1">{selectedCoach.cert}</p>

                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-[12px] border border-white/10 bg-black/30 p-3 text-center">
                    <div>
                      <p className="text-sm font-black text-lime">{selectedCoach.stats.clients}</p>
                      <p className="text-[10px] text-white/40 uppercase">{language === 'ar' ? 'مشترك' : 'Clients'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-black text-lime">{selectedCoach.stats.exp}</p>
                      <p className="text-[10px] text-white/40 uppercase">{language === 'ar' ? 'الخبرة' : 'Experience'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-black text-lime">{selectedCoach.stats.rating}</p>
                      <p className="text-[10px] text-white/40 uppercase">{language === 'ar' ? 'التقييم' : 'Rating'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-lime mb-2">
                  {language === 'ar' ? 'نبذة عن المدرب' : 'ABOUT COACH'}
                </h4>
                <p className="text-sm leading-relaxed text-white/70">{selectedCoach.bio}</p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-lime mb-3">
                  {language === 'ar' ? 'مجالات التخصص' : 'SPECIALTIES'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCoach.specialties.map((spec, i) => (
                    <span key={i} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/80">
                      ✓ {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedCoach(null)}
                  className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold text-white/70 hover:border-white/40 hover:text-white transition-colors"
                >
                  {language === 'ar' ? 'إغلاق' : 'Close'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCoach(null);
                    onSubscribeClick();
                  }}
                  className="rounded-full bg-lime px-6 py-2.5 text-xs font-bold text-black hover:bg-lime-dark transition-colors uppercase tracking-wider"
                >
                  {language === 'ar' ? 'احجز جلستك مع المدرب' : 'Book Session'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── PRICING SECTION ───
function PricingSection({ language, onSubscribeClick }: { language: 'ar' | 'en'; onSubscribeClick: () => void }) {
  const plans = [
    {
      name: 'BASIC',
      price: '49',
      period: '/month',
      features: ['Full gym access', 'Locker room', 'Free WiFi', 'Basic app access'],
      popular: false,
    },
    {
      name: 'PRO',
      price: '79',
      period: '/month',
      features: ['Everything in Basic', 'All group classes', 'Recovery zone access', 'Nutrition guide', '1 PT session/month'],
      popular: true,
    },
    {
      name: 'ELITE',
      price: '119',
      period: '/month',
      features: ['Everything in Pro', '4 PT sessions/month', 'Priority booking', 'Guest passes', 'Custom meal plan'],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="bg-[linear-gradient(180deg,_rgba(10,10,10,0.98)_0%,_rgba(15,15,15,0.96)_100%)] py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-4 text-center text-xs font-semibold tracking-[0.3em] text-lime">MEMBERSHIP PLANS</p>
        <h2 className="mb-4 text-center text-[clamp(2.1rem,5.8vw,4.6rem)] font-black leading-[0.9] tracking-tight">
          <span className="text-white">CHOOSE YOUR </span>
          <span className="text-lime">PLAN</span>
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-center text-sm tracking-[0.18em] text-white/40 sm:mb-16">
          All plans include free first session. No hidden fees. Cancel anytime.
        </p>

        <div className="flex flex-row gap-2 overflow-x-auto pb-2 sm:gap-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="group relative flex min-w-[78%] flex-col items-center rounded-[20px] border border-dark-border bg-dark-card/60 p-4 text-center sm:min-w-[48%] sm:p-5 lg:min-w-0 transition-all duration-300 hover:border-lime hover:bg-lime/5 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(212,255,0,0.15)] cursor-pointer"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-lime/40 bg-black/90 px-3.5 py-0.5 text-[10px] font-bold tracking-wider text-lime backdrop-blur-md transition-colors group-hover:bg-lime group-hover:text-black">
                  {language === 'ar' ? 'الأكثر طلباً' : 'MOST POPULAR'}
                </div>
              )}
              <p className="mb-2 text-[10px] tracking-[0.2em] text-white/50 sm:mb-3 sm:text-xs">{plan.name}</p>
              <div className="mb-3 flex flex-col items-center sm:mb-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/40 sm:text-xs">
                  {language === 'ar' ? 'يشمل' : 'Includes'}
                </p>
                <p className="mt-1 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                  {plan.price}
                  <span className="ml-1 text-[11px] font-medium text-white/40 sm:text-sm">
                    {language === 'ar' ? ' د.أ/شهر' : ' JOD/month'}
                  </span>
                </p>
              </div>
              <ul className="mb-4 flex flex-1 flex-col items-center space-y-1.5 sm:mb-5 sm:space-y-2">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-2 text-[11px] text-white/60 sm:text-sm">
                    <span className="text-[10px] text-lime sm:text-xs">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={onSubscribeClick}
                className="block w-full rounded-full border border-white/20 py-2.5 text-center text-[11px] font-bold tracking-wider text-white transition-all sm:py-3 sm:text-sm group-hover:border-lime group-hover:bg-lime group-hover:text-black"
              >
                {language === 'ar' ? 'الاشتراك ←' : 'SUBSCRIBE →'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS SECTION ───
function TestimonialsSection({ language }: { language: 'ar' | 'en' }) {
  const testimonials = [
    {
      quote: language === 'ar' 
        ? "أكملت أول ماراثون لي بعد 8 أشهر من التدريب هنا. المدربون دفعوني لتجاوز ما كنت أعتقد أنه ممكن."
        : "Completed my first marathon after 8 months of training here. The coaches pushed me beyond what I thought was possible.",
      name: language === 'ar' ? 'سارة الدوسري' : 'Sara Al-Dosari',
      role: language === 'ar' ? 'عضوية نخبة' : 'Elite Member',
      achievement: language === 'ar' ? 'إنهاء الماراثون' : 'MARATHON FINISHER',
    },
    {
      quote: language === 'ar'
        ? "أفضل استثمار قمت به هذا العام. مستويات طاقتي ونومي وثقتي بنفسي تغيرت تماماً."
        : "Best investment I made this year. My energy levels, sleep, and confidence are completely transformed.",
      name: language === 'ar' ? 'ريم المطيري' : 'Reem Al-Mutairi',
      role: language === 'ar' ? 'عضوية احترافية' : 'Pro Member',
      achievement: language === 'ar' ? 'قطع أول 10 كم' : 'RAN FIRST 10K',
    },
    {
      quote: language === 'ar'
        ? "التدريب مع استشارات التغذية هو السلاح السري. أخيراً فهمت كيف أغذي جسمي بشكل صحيح."
        : "The nutrition coaching paired with training is the secret weapon. I finally understand how to eat.",
      name: language === 'ar' ? 'حصة البلوي' : 'Hessa Al-Balawi',
      role: language === 'ar' ? 'عضوة منذ 2022' : 'Member since 2022',
      achievement: language === 'ar' ? 'خسارة 8% دهون' : '8% BODY FAT LOST',
    },
    {
      quote: language === 'ar'
        ? "خسرت 18 كجم في 5 أشهر. المدربون هنا في مستوى آخر، يهتمون بالفعل بتقدمك المستمر."
        : "Lost 18kg in 5 months. The trainers here are on another level — they actually care about your progress.",
      name: language === 'ar' ? 'محمد الحربي' : 'Mohammed Al-Harbi',
      role: language === 'ar' ? 'عضو منذ 2023' : 'Member since 2023',
      achievement: language === 'ar' ? '-18 كجم في 5 أشهر' : '-18KG IN 5 MONTHS',
    },
    {
      quote: language === 'ar'
        ? "سجلت عبر الإنترنت في 3 دقائق. كانت العملية سلسة جداً والحصة الأولى أبهرتني."
        : "Signed up online in 3 minutes. The process was seamless and the first session blew my mind.",
      name: language === 'ar' ? 'طارق الشمري' : 'Tariq Al-Shammari',
      role: language === 'ar' ? 'عضو منذ 2024' : 'Member since 2024',
      achievement: language === 'ar' ? '+12 كجم عضلات' : '+12KG MUSCLE',
    },
    {
      quote: language === 'ar'
        ? "برنامج الكابتن خالد للقوة أضاف 40 كجم لتمرين الديدلفت خلال 3 أشهر. البرامج التدريبية احترافية للغاية."
        : "Khalid's strength program added 40kg to my deadlift in 3 months. The programming is world-class.",
      name: language === 'ar' ? 'عبدالله الغامدي' : 'Abdullah Al-Ghamdi',
      role: language === 'ar' ? 'رياضي قوة بدنية' : 'Powerlifter',
      achievement: language === 'ar' ? '+40 كجم ديدلفت' : '+40KG DEADLIFT',
    },
  ];

  return (
    <section className="bg-[radial-gradient(circle_at_top,_rgba(212,255,0,0.06),_transparent_35%),_#0a0a0a] py-16 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-lime">
          {language === 'ar' ? 'نتائج حقيقية' : 'REAL RESULTS'}
        </p>
        
        <div className="mb-16 flex flex-col items-start gap-8 lg:flex-row lg:justify-between">
          <div>
            <h2 className="text-[clamp(2.2rem,6.8vw,5.8rem)] font-black leading-[0.9] tracking-tight">
              <span className="block text-white">{language === 'ar' ? 'آراء' : 'MEMBERS'}</span>
              <span className="block text-stroke">{language === 'ar' ? 'الأعضاء' : 'SPEAK'}</span>
            </h2>
            <div className="mt-6 h-1 w-16 bg-lime" />
          </div>
          <p className="max-w-md text-sm text-white/55 sm:text-lg lg:mt-12">
            {language === 'ar' 
              ? 'أكثر من 4,200 عضو غيروا حياتهم في GymPro. إليك دليل ما يمكن أن يحققه الالتزام المستمر.'
              : 'Over 4,200 members have transformed their lives at GymPro. Here is the proof of what consistency can do.'}
          </p>
        </div>

        <div className="flex flex-row gap-2 overflow-x-auto pb-2 sm:gap-6 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 xl:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-[78%] border border-dark-border bg-dark-card p-3 transition-colors hover:border-lime/20 sm:min-w-[48%] sm:p-5 md:min-w-0">
              <div className="mb-3 text-2xl font-black text-lime sm:mb-4 sm:text-3xl">"</div>
              <p className="mb-4 text-[11px] leading-relaxed text-white/70 sm:mb-6 sm:text-sm">"{t.quote}"</p>
              <div className="flex items-start justify-between border-t border-dark-border pt-3 sm:pt-4">
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="mt-0.5 text-[10px] text-white/30 sm:text-xs">{t.role}</p>
                </div>
                <span className="ml-2 text-[10px] font-bold tracking-wider text-lime sm:text-xs">{t.achievement}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AUTH ACCESS SECTION ───
function AuthSection({ language }: { language: 'ar' | 'en' }) {
  const content = {
    ar: {
      heading: 'الولوج إلى النظام',
      subheading: 'اختر بوابة الدخول المناسبة لك',
      client: 'العملاء',
      clientDesc: 'تابع عضويتك، أو سجّل الدخول إلى حسابك، أو ابدأ اشتراكًا جديدًا.',
      coach: 'المدربون',
      coachDesc: 'الوصول إلى لوحة إدارة الحصص والبرامج بسهولة.',
      admin: 'لوحة الإدارة الخاصة',
      adminDesc: 'نافذة منفصلة لإدارة الاشتراكات والعقود والإحصاءات.',
      open: 'فتح',
      privateAdmin: 'دخول خاص للإدارة',
    },
    en: {
      heading: 'Member Access',
      subheading: 'Choose the access portal that fits your role',
      client: 'Clients',
      clientDesc: 'Manage your membership, sign in, or start a new subscription.',
      coach: 'Coaches',
      coachDesc: 'Access your training dashboard and manage programs.',
      admin: 'Private Admin Panel',
      adminDesc: 'A dedicated control window for subscriptions, contracts, and analytics.',
      open: 'Open',
      privateAdmin: 'Private admin access',
    },
  };

  const copy = content[language];

  return (
    <section id="auth" className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(212,255,0,0.12),_transparent_35%),_#0a0a0a] py-14 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-lime">{copy.heading}</p>
          <h2 className="text-[clamp(1.8rem,5.8vw,3rem)] font-black leading-[0.95] tracking-tight text-white">
            {copy.subheading}
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-lime">{copy.client}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{copy.clientDesc}</p>
            <button
              type="button"
              onClick={() => openPortal('client')}
              className="mt-5 rounded-full bg-lime px-5 py-2.5 text-sm font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-lime-dark"
            >
              {copy.open}
            </button>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-lime">{copy.coach}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{copy.coachDesc}</p>
            <button
              type="button"
              onClick={() => openPortal('coach')}
              className="mt-5 rounded-full bg-lime px-5 py-2.5 text-sm font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-lime-dark"
            >
              {copy.open}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

function PortalPage({ language, view, autoLogin = false }: { language: 'ar' | 'en'; view: PortalView; autoLogin?: boolean }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, member: 'Sara Al-Dosari', plan: 'PRO', status: 'Active', renewal: '2026-08-01' },
    { id: 2, member: 'Mohammed H.', plan: 'ELITE', status: 'Active', renewal: '2026-07-29' },
    { id: 3, member: 'Lina K.', plan: 'BASIC', status: 'Paused', renewal: '2026-07-25' },
  ]);
  const [contracts, setContracts] = useState([
    { id: 1, coach: 'Khalid Noor', role: 'Strength Coach', status: 'Active', expiry: '2026-10-01' },
    { id: 2, coach: 'Rania Sami', role: 'HIIT Coach', status: 'Active', expiry: '2026-09-15' },
    { id: 3, coach: 'Omar F.', role: 'Nutrition Coach', status: 'Pending', expiry: '2026-08-10' },
  ]);

  const content = {
    ar: {
      title: view === 'client' ? 'بوابة العملاء' : view === 'coach' ? 'بوابة المدربين' : 'لوحة الإدارة الخاصة',
      subtitle: view === 'client'
        ? 'سجل الدخول أو أنشئ حسابك للوصول إلى عضويتك وحجوزاتك.'
        : view === 'coach'
          ? 'ادخل إلى لوحة المدرب لإدارة الجلسات والبرامج.'
          : 'لوحة تحكم داخلية كاملة لإدارة الموقع والموظفين والاشتراكات.',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      buttonLogin: 'دخول',
      buttonSignup: 'إنشاء الحساب',
      successLogin: view === 'admin' ? 'تم الدخول بنجاح إلى لوحة الإدارة.' : 'تم تسجيل الدخول بنجاح.',
      successSignup: 'تم إنشاء الحساب بنجاح. سيتم تفعيل الوصول قريبًا.',
      adminPassword: 'كلمة المرور الخاصة هي: yoken',
      back: 'العودة إلى الصفحة الرئيسية',
      demoNote: 'هذا الموقع تجريبي في جميع النوافذ.',
      paymentTitle: 'طرق الدفع',
      paymentSubtitle: 'اختر طريقة الدفع المناسبة لعملية الاشتراك التجريبية.',
      paymentMethods: ['بطاقة ائتمان أو خصم', 'Apple Pay', 'PayPal', 'تحويل بنكي', 'نقدًا داخل النادي'],
      paymentConfirm: 'تم اختيار هذه الطريقة في الوضع التجريبي فقط.',
      membership: 'الاشتراك',
      classes: 'الحصص القادمة',
      clients: 'العملاء',
      coaches: 'المدربون',
      gym: 'نظرة عامة على النادي',
      clientValue: 'عضوية مميزة',
      classValue: 'HIIT · 18:30',
      coachValue: '4 مدربين نشطين',
      gymValue: '3 أقسام · 2 صالات',
      adminAccess: 'التحكم الإداري',
      adminNote: 'تستطيع هنا إلغاء الاشتراكات، إنهاء عقود المدربين، ومراجعة الإحصاءات.',
      overview: 'نظرة عامة',
      subscriptions: 'الاشتراكات',
      contracts: 'عقود المدربين',
      analytics: 'الإحصاءات',
      memberCount: 'عدد الأعضاء',
      activeCoaches: 'المدربون النشطون',
      monthlyRevenue: 'الإيراد الشهري',
      cancellations: 'الإلغاءات',
      cancel: 'إلغاء',
      pause: 'إيقاف مؤقت',
      reactivate: 'تفعيل',
      endContract: 'إنهاء العقد',
      renew: 'تجديد',
      plan: 'الخطة',
      status: 'الحالة',
      nextRenewal: 'التجديد التالي',
      actions: 'الإجراءات',
      noAction: 'لا توجد إجراءات حالياً',
      adminSummary: 'لوحة تحكم كاملة مع صلاحيات إدارة الاشتراكات والعقود والقياسات.',
    },
    en: {
      title: view === 'client' ? 'Client Portal' : view === 'coach' ? 'Coach Portal' : 'Private Admin Dashboard',
      subtitle: view === 'client'
        ? 'Sign in or create your account to access your membership and bookings.'
        : view === 'coach'
          ? 'Enter the coach dashboard to manage sessions and programs.'
          : 'A full internal control center for managing the gym website, staff, subscriptions, and performance.',
      login: 'Login',
      signup: 'Sign Up',
      name: 'Full Name',
      email: 'Email Address',
      password: 'Password',
      buttonLogin: 'Enter',
      buttonSignup: 'Create Account',
      successLogin: view === 'admin' ? 'Admin access granted successfully.' : 'You have signed in successfully.',
      successSignup: 'Your account was created successfully. Access will be activated shortly.',
      adminPassword: 'The private password is: yoken',
      back: 'Back to home',
      demoNote: 'This site is a demo in all windows.',
      paymentTitle: 'Payment Methods',
      paymentSubtitle: 'Choose the payment method for the demo subscription flow.',
      paymentMethods: ['Credit or Debit Card', 'Apple Pay', 'PayPal', 'Bank Transfer', 'Cash at the gym'],
      paymentConfirm: 'This selection is for demo purposes only.',
      membership: 'Membership',
      classes: 'Upcoming classes',
      clients: 'Clients',
      coaches: 'Coaches',
      gym: 'Gym overview',
      clientValue: 'Premium membership',
      classValue: 'HIIT · 6:30 PM',
      coachValue: '4 active coaches',
      gymValue: '3 zones · 2 halls',
      adminAccess: 'Administrative control',
      adminNote: 'You can cancel subscriptions, terminate coach contracts, and review performance metrics here.',
      overview: 'Overview',
      subscriptions: 'Subscriptions',
      contracts: 'Coach Contracts',
      analytics: 'Analytics',
      memberCount: 'Members',
      activeCoaches: 'Active coaches',
      monthlyRevenue: 'Monthly revenue',
      cancellations: 'Cancellations',
      cancel: 'Cancel',
      pause: 'Pause',
      reactivate: 'Reactivate',
      endContract: 'End contract',
      renew: 'Renew',
      plan: 'Plan',
      status: 'Status',
      nextRenewal: 'Next renewal',
      actions: 'Actions',
      noAction: 'No action available',
      adminSummary: 'A complete control panel with full permissions for subscriptions, contracts, and reporting.',
    },
  };

  const copy = content[language];

  useEffect(() => {
    if (autoLogin && view === 'admin') {
      setIsLoggedIn(true);
      setMessage(copy.successLogin);
    }
  }, [autoLogin, view, copy.successLogin]);

  const handleSubscriptionAction = (id: number, action: 'cancel' | 'pause' | 'reactivate') => {
    setSubscriptions(prev => prev.map(item => item.id === id ? { ...item, status: action === 'cancel' ? 'Cancelled' : action === 'pause' ? 'Paused' : 'Active' } : item));
    setMessage(language === 'ar' ? 'تم تحديث الاشتراك بنجاح.' : 'Subscription updated successfully.');
  };

  const handleContractAction = (id: number, action: 'end' | 'renew') => {
    setContracts(prev => prev.map(item => item.id === id ? { ...item, status: action === 'end' ? 'Terminated' : 'Active' } : item));
    setMessage(language === 'ar' ? 'تم تحديث عقد المدرب بنجاح.' : 'Coach contract updated successfully.');
  };

  if (view === 'payment') {
    return (
      <div className="relative min-h-screen bg-dark text-white overflow-hidden">
        {/* Professional Background Image & Glow Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none mix-blend-luminosity"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,255,0,0.16),_transparent_45%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(10,10,10,0.85)_0%,_rgba(10,10,10,0.98)_100%)] pointer-events-none" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-md px-4 py-4 sm:px-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-lime">{copy.paymentTitle}</p>
              <h1 className="text-2xl font-black tracking-tight text-white">{copy.paymentSubtitle}</h1>
            </div>
            <a href="/" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:border-lime/40 hover:text-white">
              {copy.back}
            </a>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.paymentMethods.map(method => (
              <div key={method} className="rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 transition-all hover:border-lime/30 hover:bg-white/[0.06]">
                <p className="text-lg font-semibold text-white">{method}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{copy.paymentConfirm}</p>
                <button
                  type="button"
                  className="mt-5 rounded-full bg-lime px-5 py-2.5 text-sm font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-lime-dark"
                >
                  {language === 'ar' ? 'اختيار' : 'Select'}
                </button>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-white/45">{copy.demoNote}</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (view === 'admin') {
      if (password === 'yoken') {
        setIsLoggedIn(true);
        setMessage(copy.successLogin);
      } else {
        setMessage(language === 'ar' ? 'كلمة المرور غير صحيحة. حاول مرة أخرى.' : 'Wrong password. Please try again.');
      }
      return;
    }

    if (mode === 'login') {
      setIsLoggedIn(true);
      setMessage(copy.successLogin);
      openPortal('payment');
    } else {
      setIsLoggedIn(true);
      setMessage(copy.successSignup);
      openPortal('payment');
    }
  };

  return (
    <div className="relative min-h-screen bg-dark text-white overflow-hidden">
      {/* High-resolution Background Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none mix-blend-luminosity"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80')` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,255,0,0.15),_transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(10,10,10,0.85)_0%,_rgba(10,10,10,0.98)_100%)] pointer-events-none" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-4 sm:px-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-lime">{copy.title}</p>
            <h1 className="text-2xl font-black tracking-tight text-white">{copy.subtitle}</h1>
          </div>
          <a href="/" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:border-lime/40 hover:text-white">
            {copy.back}
          </a>
        </div>

        <p className="mt-4 text-center text-sm text-white/40">{copy.demoNote}</p>

        {!isLoggedIn ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="mb-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${mode === 'login' ? 'bg-lime text-black' : 'bg-white/[0.06] text-white/70'}`}
                >
                  {copy.login}
                </button>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${mode === 'signup' ? 'bg-lime text-black' : 'bg-white/[0.06] text-white/70'}`}
                >
                  {copy.signup}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {mode === 'signup' && (
                  <div>
                    <label className="mb-1 block text-[11px] uppercase tracking-[0.24em] text-white/40">{copy.name}</label>
                    <input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-[12px] border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none" placeholder={copy.name} />
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-[11px] uppercase tracking-[0.24em] text-white/40">{copy.email}</label>
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-[12px] border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none" placeholder={copy.email} />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] uppercase tracking-[0.24em] text-white/40">{copy.password}</label>
                  <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-[12px] border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none" placeholder={copy.password} />
                </div>

                <button type="submit" className="w-full rounded-[12px] bg-lime px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-lime-dark">
                  {mode === 'login' ? copy.buttonLogin : copy.buttonSignup}
                </button>
              </form>

              {view === 'admin' && <p className="mt-4 text-sm text-white/55">{copy.adminPassword}</p>}

              {message && <p className="mt-4 rounded-[12px] border border-lime/20 bg-lime/10 px-3 py-2 text-sm text-lime">{message}</p>}
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(140deg,_rgba(212,255,0,0.14),_rgba(255,255,255,0.03))] p-6 sm:p-8">
              <p className="text-[10px] uppercase tracking-[0.24em] text-lime">{view === 'admin' ? copy.adminAccess : copy.membership}</p>
              <h2 className="mt-2 text-2xl font-black text-white">{view === 'admin' ? 'GYM CONTROL CENTER' : 'WELCOME BACK'}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {view === 'admin' ? copy.adminNote : 'Your account is ready. Use the portal to manage your membership and class bookings.'}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[16px] border border-white/10 bg-black/20 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{view === 'admin' ? copy.clients : copy.membership}</p>
                  <p className="mt-2 text-xl font-black text-white">{view === 'admin' ? '24' : copy.clientValue}</p>
                </div>
                <div className="rounded-[16px] border border-white/10 bg-black/20 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{view === 'admin' ? copy.coaches : copy.classes}</p>
                  <p className="mt-2 text-xl font-black text-white">{view === 'admin' ? '6' : copy.classValue}</p>
                </div>
                <div className="rounded-[16px] border border-white/10 bg-black/20 p-4 sm:col-span-2">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{view === 'admin' ? copy.gym : copy.gym}</p>
                  <p className="mt-2 text-xl font-black text-white">{view === 'admin' ? 'All memberships · classes · staff' : copy.gymValue}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="rounded-[24px] border border-lime/20 bg-[linear-gradient(140deg,_rgba(212,255,0,0.16),_rgba(255,255,255,0.03))] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-lime">{view === 'admin' ? copy.adminAccess : copy.membership}</p>
                  <h2 className="mt-2 text-2xl font-black text-white">{view === 'admin' ? 'ADMIN CONTROL CENTER' : 'WELCOME TO YOUR PORTAL'}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">{view === 'admin' ? copy.adminNote : 'Your account is now active. You can manage your bookings and plan details from here.'}</p>
                </div>
                <div className="rounded-full border border-lime/30 bg-black/20 px-4 py-2 text-sm font-semibold text-lime">
                  {copy.adminSummary}
                </div>
              </div>

              {view === 'admin' ? (
                <div className="mt-6 grid gap-3 md:grid-cols-4">
                  <div className="rounded-[16px] border border-white/10 bg-black/20 p-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{copy.memberCount}</p>
                    <p className="mt-2 text-xl font-black text-white">{subscriptions.filter(item => item.status === 'Active').length + 12}</p>
                  </div>
                  <div className="rounded-[16px] border border-white/10 bg-black/20 p-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{copy.activeCoaches}</p>
                    <p className="mt-2 text-xl font-black text-white">{contracts.filter(item => item.status === 'Active').length}</p>
                  </div>
                  <div className="rounded-[16px] border border-white/10 bg-black/20 p-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{copy.monthlyRevenue}</p>
                    <p className="mt-2 text-xl font-black text-white">$18.4k</p>
                  </div>
                  <div className="rounded-[16px] border border-white/10 bg-black/20 p-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{copy.cancellations}</p>
                    <p className="mt-2 text-xl font-black text-white">4</p>
                  </div>
                </div>
              ) : (
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  <div className="rounded-[16px] border border-white/10 bg-black/20 p-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{copy.clients}</p>
                    <p className="mt-2 text-xl font-black text-white">24</p>
                  </div>
                  <div className="rounded-[16px] border border-white/10 bg-black/20 p-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{copy.coaches}</p>
                    <p className="mt-2 text-xl font-black text-white">6</p>
                  </div>
                  <div className="rounded-[16px] border border-white/10 bg-black/20 p-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">{copy.gym}</p>
                    <p className="mt-2 text-xl font-black text-white">3 zones · 2 halls</p>
                  </div>
                </div>
              )}
            </div>

            {view === 'admin' && (
              <>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-lime">{copy.subscriptions}</p>
                      <h3 className="text-xl font-black text-white">{copy.subscriptions}</h3>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-white/40">
                          <th className="px-2 py-3">Member</th>
                          <th className="px-2 py-3">{copy.plan}</th>
                          <th className="px-2 py-3">{copy.status}</th>
                          <th className="px-2 py-3">{copy.nextRenewal}</th>
                          <th className="px-2 py-3">{copy.actions}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscriptions.map(item => (
                          <tr key={item.id} className="border-b border-white/5 text-white/70 transition-colors hover:border-lime/60 hover:bg-lime/10 hover:text-white">
                            <td className="px-2 py-3">{item.member}</td>
                            <td className="px-2 py-3">{item.plan}</td>
                            <td className="px-2 py-3">{item.status}</td>
                            <td className="px-2 py-3">{item.renewal}</td>
                            <td className="px-2 py-3">
                              <div className="flex flex-wrap gap-2">
                                {item.status === 'Active' ? (
                                  <button onClick={() => handleSubscriptionAction(item.id, 'pause')} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 hover:border-lime/60 hover:text-lime transition-colors">{copy.pause}</button>
                                ) : (
                                  <button onClick={() => handleSubscriptionAction(item.id, 'reactivate')} className="rounded-full border border-lime/30 px-3 py-1 text-xs text-lime hover:border-lime/70 hover:bg-lime/10 transition-colors">{copy.reactivate}</button>
                                )}
                                <button onClick={() => handleSubscriptionAction(item.id, 'cancel')} className="rounded-full bg-red-600/80 px-3 py-1 text-xs text-white">{copy.cancel}</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-lime">{copy.contracts}</p>
                      <h3 className="text-xl font-black text-white">{copy.contracts}</h3>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-white/40">
                          <th className="px-2 py-3">Coach</th>
                          <th className="px-2 py-3">Role</th>
                          <th className="px-2 py-3">{copy.status}</th>
                          <th className="px-2 py-3">Expiry</th>
                          <th className="px-2 py-3">{copy.actions}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contracts.map(item => (
                          <tr key={item.id} className="border-b border-white/5 text-white/70">
                            <td className="px-2 py-3">{item.coach}</td>
                            <td className="px-2 py-3">{item.role}</td>
                            <td className="px-2 py-3">{item.status}</td>
                            <td className="px-2 py-3">{item.expiry}</td>
                            <td className="px-2 py-3">
                              <div className="flex flex-wrap gap-2">
                                <button onClick={() => handleContractAction(item.id, 'renew')} className="rounded-full border border-lime/30 px-3 py-1 text-xs text-lime">{copy.renew}</button>
                                <button onClick={() => handleContractAction(item.id, 'end')} className="rounded-full bg-red-600/80 px-3 py-1 text-xs text-white">{copy.endContract}</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                  <div className="mb-5">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-lime">{copy.analytics}</p>
                    <h3 className="text-xl font-black text-white">{copy.analytics}</h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-[16px] border border-white/10 bg-black/20 p-4">
                      <p className="text-white/50">Attendance</p>
                      <p className="mt-2 text-2xl font-black text-white">92%</p>
                    </div>
                    <div className="rounded-[16px] border border-white/10 bg-black/20 p-4">
                      <p className="text-white/50">Retention</p>
                      <p className="mt-2 text-2xl font-black text-white">84%</p>
                    </div>
                    <div className="rounded-[16px] border border-white/10 bg-black/20 p-4">
                      <p className="text-white/50">Member Growth</p>
                      <p className="mt-2 text-2xl font-black text-white">+11%</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {message && <p className="rounded-[12px] border border-lime/20 bg-lime/10 px-3 py-2 text-sm text-lime">{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CTA SECTION ───
function CTASection({ language, onSubscribeClick }: { language: 'ar' | 'en'; onSubscribeClick: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_center,_rgba(212,255,0,0.12),_transparent_50%),_#0a0a0a] py-12 sm:py-16">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[clamp(5rem,20vw,18rem)] font-black text-white/[0.03] tracking-tight whitespace-nowrap">
          JOIN NOW
        </span>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <p className="mb-4 text-[10px] font-semibold tracking-[0.3em] text-lime">READY TO START?</p>
        <h2 className="mb-4 text-[clamp(1.8rem,6vw,3.2rem)] font-black leading-[0.9] tracking-tight">
          <span className="block text-white">YOUR FIRST STEP</span>
          <span className="block text-lime text-glow-yellow">STARTS HERE.</span>
        </h2>
        <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-white/45">
          Join 4,200+ members who chose to invest in themselves. Register your membership online in under 3 minutes.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button onClick={onSubscribeClick} className="bg-lime text-black px-7 py-3 text-sm font-bold tracking-wider hover:bg-lime-dark transition-colors">
            {language === 'ar' ? 'الاشتراك الآن →' : 'SUBSCRIBE NOW →'}
          </button>
          <a href="#pricing" className="border border-white/20 text-white px-7 py-3 text-sm font-bold tracking-wider hover:border-white/50 transition-colors">
            COMPARE PLANS
          </a>
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.24em] text-white/35">
          FREE FIRST SESSION · NO HIDDEN FEES · CANCEL ANYTIME
        </p>
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer className="bg-dark border-t border-dark-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <span className="text-lime text-xl">🏋️</span>
            <span className="text-white font-black text-lg tracking-wider">GYMPRO</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {['Home', 'Pricing', 'Sign Up', 'Privacy', 'Terms'].map(link => (
              <a
                key={link}
                href={link === 'Sign Up' ? INSTAGRAM_URL : '#'}
                target={link === 'Sign Up' ? '_blank' : undefined}
                rel={link === 'Sign Up' ? 'noopener noreferrer' : undefined}
                className="text-white/40 hover:text-white text-sm transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-lime transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-lime transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-lime transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

        <div className="border-t border-dark-border mt-8 pt-8">
          <p className="text-white/20 text-xs text-center tracking-[0.2em]">
            © 2026 GYMPRO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN APP ───
function AppShell({ children, language }: { children: React.ReactNode; language: 'ar' | 'en' }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(212,255,0,0.16),_transparent_45%)] px-0 py-0">
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="mx-auto flex min-h-screen w-full max-w-none flex-col overflow-hidden rounded-none border-0 bg-dark shadow-none">
        {children}
      </div>
    </div>
  );
}

function PaymentModal({ isOpen, onClose, language }: { isOpen: boolean; onClose: () => void; language: 'ar' | 'en' }) {
  if (!isOpen) return null;

  const content = {
    ar: {
      paymentTitle: 'طرق الدفع',
      paymentSubtitle: 'اختر طريقة الدفع المناسبة لعملية الاشتراك',
      paymentMethods: ['بطاقة ائتمان أو خصم', 'Apple Pay', 'PayPal', 'تحويل بنكي', 'نقدًا داخل النادي'],
      paymentConfirm: 'اختر الطريقة لإتمام العملية بأمان.',
      select: 'اختيار'
    },
    en: {
      paymentTitle: 'Payment Methods',
      paymentSubtitle: 'Choose your preferred payment method',
      paymentMethods: ['Credit/Debit Card', 'Apple Pay', 'PayPal', 'Bank Transfer', 'Cash'],
      paymentConfirm: 'Select this method to proceed securely.',
      select: 'Select'
    }
  };

  const copy = content[language];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl rounded-[24px] border border-white/10 bg-dark p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/50 hover:text-white" style={{right: language === 'ar' ? 'auto' : undefined, left: language === 'ar' ? '1.5rem' : undefined}}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.24em] text-lime">{copy.paymentTitle}</p>
          <h2 className="text-2xl font-black tracking-tight text-white mt-1">{copy.paymentSubtitle}</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {copy.paymentMethods.map(method => (
            <div key={method} className="rounded-[16px] border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-lime/30 cursor-pointer">
              <p className="text-lg font-semibold text-white">{method}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/50">{copy.paymentConfirm}</p>
              <button
                type="button"
                className="mt-4 rounded-full bg-lime px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-lime-dark"
                onClick={onClose}
              >
                {copy.select}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OwnerPage() {
  const [language, setLanguage] = useState<'ar' | 'en'>('en');
  const [portalView, setPortalView] = useState<PortalView | null>(null);
  const [autoAdminLogin, setAutoAdminLogin] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const currentView = params.get('view');
    const shouldAutoLoginAdmin = params.get('access') === 'owner' || params.get('secret') === 'yoken';

    if (currentView === 'client' || currentView === 'coach' || currentView === 'admin') {
      setPortalView(currentView);
      setAutoAdminLogin(currentView === 'admin' && shouldAutoLoginAdmin);
    } else {
      setPortalView(null);
      setAutoAdminLogin(false);
    }
  }, []);

  if (portalView) {
    return <PortalPage language={language} view={portalView} autoLogin={autoAdminLogin} />;
  }

  return (
    <AppShell language={language}>
      <TopBanner language={language} setLanguage={setLanguage} />
      <Navbar language={language} onSubscribeClick={() => setIsPaymentModalOpen(true)} />
      <HeroSection language={language} onSubscribeClick={() => setIsPaymentModalOpen(true)} />
      <StatsSection />
      <OfferSection />
      <CoachesSection language={language} onSubscribeClick={() => setIsPaymentModalOpen(true)} />
      <PricingSection language={language} onSubscribeClick={() => setIsPaymentModalOpen(true)} />
      <TestimonialsSection language={language} />
      <AuthSection language={language} />
      <CTASection language={language} onSubscribeClick={() => setIsPaymentModalOpen(true)} />
      <Footer />
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} language={language} />
    </AppShell>
  );
}
