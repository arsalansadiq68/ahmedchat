import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  CirclePlay,
  Flame,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Pause,
  Phone,
  Play,
  Quote,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

const VIDEO = "https://cdn.builder.io/o/assets%2Fd93bdecde0304b4aae247bbf7b3ffd85%2F41e3721cf6504621b37d660ddb4941df?alt=media&token=374acf94-214b-4efd-9bcb-ef4e7e9796ca&apiKey=d93bdecde0304b4aae247bbf7b3ffd85";
const HERO_IMAGE = "https://cdn.builder.io/api/v1/image/assets%2Fd93bdecde0304b4aae247bbf7b3ffd85%2Fe168bef0adc2463cbb649f68fd1da9ef?format=webp&width=800&height=1200";
const STALL_IMAGE = "https://cdn.builder.io/api/v1/image/assets%2Fd93bdecde0304b4aae247bbf7b3ffd85%2F22c1f895f74f4e7fbc00eaa894fa87bc?format=webp&width=800&height=1200";
const FOOD_IMAGE = "https://cdn.builder.io/api/v1/image/assets%2Fd93bdecde0304b4aae247bbf7b3ffd85%2F950d7d4ee93d4003a9806a298ed9ee56?format=webp&width=800&height=1200";
const FATHER_IMAGE = "https://cdn.builder.io/api/v1/image/assets%2Fd93bdecde0304b4aae247bbf7b3ffd85%2F173e5b9f80a44589a113744fbbee7a98?format=webp&width=800&height=1200";
const MAPS = "https://www.google.com/maps/search/?api=1&query=V4W8%2BX4Q%2C%20Gulshan-e-Jamal%2C%20Karachi";
const WHATSAPP = "https://wa.me/923361125871";
const PHONE = "tel:+923361125871";

const navItems = [
  ["HOME", "home"],
  ["AHMED BHAI", "ahmed"],
  ["THE CHAAT", "chaat"],
  ["AHMED'S STYLE", "style"],
  ["VISIT US", "visit"],
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <div className={`section-label ${dark ? "section-label-dark" : ""}`}><span className="label-line" />{children}</div>;
}

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [heard, setHeard] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 70]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) { videoRef.current.play(); setVideoPlaying(true); }
    else { videoRef.current.pause(); setVideoPlaying(false); }
  };
  const toggleMute = () => { if (videoRef.current) videoRef.current.muted = !muted; setMuted(!muted); };
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <header className={`site-nav ${scrolled ? "nav-scrolled" : ""}`}>
        <button className="brand-mark" onClick={() => go("home")} aria-label="Ahmed Samosa Chaat House home">
          <span>AHMED</span><small>SAMOSA CHAAT HOUSE</small>
        </button>
        <nav className="desktop-nav">{navItems.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</nav>
        <a className="nav-cta" href={WHATSAPP} target="_blank" rel="noreferrer">CHAT LOO! <ArrowUpRight size={15} /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </header>
      {menuOpen && <div className="mobile-menu">{navItems.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}<ChevronRight size={17} /></button>)}<a href={WHATSAPP} target="_blank" rel="noreferrer">WHATSAPP AHMED BHAI <ArrowUpRight size={17} /></a></div>}

      <main>
        <section id="home" className="hero-section">
          <motion.video ref={videoRef} className="hero-video" autoPlay muted loop playsInline poster={HERO_IMAGE} style={{ y: heroY }} src={VIDEO} />
          <div className="hero-overlay" />
          <div className="hero-grain" />
          <div className="hero-content page-width">
            <Reveal><SectionLabel dark>KARACHI STREET FOOD</SectionLabel></Reveal>
            <Reveal delay={0.1}><h1>AHMED KI<br /><em>CHAT LOO!</em></h1></Reveal>
            <Reveal delay={0.2}><p className="hero-subtitle">Karachi ki asli Sindhi-style Samosa Chaat</p></Reveal>
            <Reveal delay={0.3}><p className="hero-copy">Crispy samosay, spicy chana, chatpati chutneys aur Ahmed Bhai ka apna unique style.</p></Reveal>
            <Reveal delay={0.4}><div className="hero-actions"><a href={WHATSAPP} target="_blank" rel="noreferrer" className="button button-yellow"><MessageCircle size={18} /> WHATSAPP AHMED BHAI <ArrowUpRight size={16} /></a><a href={PHONE} className="button button-outline"><Phone size={17} /> CALL AHMED BHAI</a></div></Reveal>
            <Reveal delay={0.5}><div className="hero-phone"><span>CALL / WHATSAPP</span><a href={PHONE}>0336 1125871</a></div></Reveal>
          </div>
          <button className="scroll-cue" onClick={() => go("statement")}><span>SCROLL TO DISCOVER</span><ArrowDown size={17} /></button>
          <div className="hero-stamp">SINCE<br /><strong>1999</strong></div>
        </section>

        <section id="statement" className="statement-section page-width">
          <Reveal><SectionLabel>THE AHMED EXPERIENCE</SectionLabel><p className="eyebrow-urdu">Yahan sirf chaat nahi milti...</p><h2>AHMED BHAI KI<br /><span>STYLE MILTI HAI!</span></h2><div className="statement-footer"><p>One bite and you know.<br />This is not just chaat.</p><span className="section-number">01 <Minus size={22} /></span></div></Reveal>
        </section>

        <section id="ahmed" className="ahmed-section dark-section">
          <div className="page-width split-layout">
            <Reveal className="portrait-wrap"><div className="photo-frame"><img src={HERO_IMAGE} alt="Ahmed Bhai at Ahmed Samosa Chaat House" loading="lazy" /><span className="frame-corner corner-tl" /><span className="frame-corner corner-br" /></div><div className="portrait-caption"><span>THE MAN</span><span>THE MYTH<br />THE MASALA</span></div></Reveal>
            <Reveal delay={0.15}><SectionLabel dark>MEET AHMED BHAI</SectionLabel><h2 className="light-heading">Naam Ahmed.<br /><em>Style apni.</em><br />Chaat sabki favourite.</h2><p className="light-copy">Ahmed Samosa Chaat House Karachi ki street-food culture ka ek mashhoor naam hai. Crispy samosay, spicy chana, chutneys aur Ahmed Bhai ka apna unique andaaz is jagah ko yaadgar banata hai.</p><div className="pull-quote"><Quote size={24} /><span>AHMED KI<br /><strong>CHAT LOO!</strong></span></div></Reveal>
          </div>
        </section>

        <section className="family-section page-width">
          <div className="family-intro"><Reveal><SectionLabel>ROOTS &amp; ROUTES</SectionLabel><h2>EK CHAAT,<br /><span>EK KAHANI</span></h2><p>Har mashhoor naam ke peeche ek kahani hoti hai. Ahmed Samosa Chaat House ke safar mein family, mehnat aur apna andaaz sabse khaas hissa hain.</p></Reveal></div>
          <Reveal delay={0.15} className="family-collage"><div className="family-photo"><img src={FATHER_IMAGE} alt="Ahmed Samosa Chaat House family story" loading="lazy" /><span>FAMILY</span></div><div className="journey">{["FAMILY", "MEHNAT", "APNA STYLE", "AHMED KI CHAT"].map((step, i) => <div key={step} className={i === 3 ? "active" : ""}><span>0{i + 1}</span><b>{step}</b>{i < 3 && <ChevronRight size={17} />}</div>)}</div></Reveal>
        </section>

        <section id="chaat" className="chaat-section cream-section">
          <div className="page-width"><Reveal><SectionLabel>THE CHAAT</SectionLabel><div className="section-heading-row"><div><h2>Simple ingredients.<br /><span>Full Ahmed-style attitude.</span></h2></div><p>Four essentials. Infinite cravings.<br />No prices, just good taste.</p></div></Reveal>
            <div className="food-grid">{[
              ["01", "SAMOSA CHAAT", "Crispy samosa, spicy chana, chutneys aur creamy yogurt ka full street-food combination.", FOOD_IMAGE],
              ["02", "CRISPY SAMOSA", "Golden, crispy aur garma-garam.", STALL_IMAGE],
              ["03", "CHANA CHAAT", "Spicy chana with chatpati chutneys and Ahmed Bhai's style.", HERO_IMAGE],
              ["04", "SPECIAL CHUTNEYS", "Woh chutney jo ek bite ko doosri bite tak le jaye.", FOOD_IMAGE],
            ].map(([num, title, copy, image], i) => <Reveal key={title} delay={i * 0.08}><article className={`food-card ${i === 0 ? "featured" : ""}`}><div className="food-image"><img src={image} alt={title} loading="lazy" /><span>{num}</span></div><div className="food-info"><h3>{title}</h3><p>{copy}</p><ArrowUpRight size={19} /></div></article></Reveal>)}</div>
          </div>
        </section>

        <section id="style" className="dictionary-section page-width"><Reveal><div className="dictionary-top"><div><SectionLabel>AHMED BHAI'S STYLE</SectionLabel><h2>AHMED BHAI KI<br /><span>DICTIONARY</span></h2></div><p>Some words are made up.<br />Some styles are earned.</p></div></Reveal><div className="dictionary-grid">{[["01", "SANTEXY", "SAMOSA CHANAAT", "Ahmed Bhai ka apna unique style!"], ["02", "MUNTAMY", "DANTADY BANTACHE", "Mummy Daddy Bache — Ahmed Bhai style!"], ["03", "AHMED BHAI KI", "CHAT", "The original. The iconic. The full vibe."]].map(([n, a, b, copy], i) => <Reveal delay={i * 0.1} key={n}><article className={`word-card ${i === 2 ? "word-featured" : ""}`}><span className="word-number">{n}</span><h3>{a}<br /><strong>{b}</strong></h3><p>{copy}</p>{i === 2 && <Sparkles size={21} className="word-spark" />}</article></Reveal>)}</div><button className={`style-button ${heard ? "heard" : ""}`} onClick={() => setHeard(!heard)}>{heard ? <><Check size={18} /> STYLE DELIVERED</> : <><CirclePlay size={18} /> HEAR THE AHMED STYLE</>}</button></section>

        <section className="video-section dark-section"><div className="page-width"><Reveal><div className="video-header"><div><SectionLabel dark>THE VIDEO EXPERIENCE</SectionLabel><h2>STYLE DEKHI<br /><em>HAI?</em></h2></div><p>Ab Ahmed Bhai ka asli<br />andaaz dekho.</p></div></Reveal><Reveal delay={0.15}><div className="video-container"><video ref={videoRef} src={VIDEO} poster={STALL_IMAGE} muted={muted} loop playsInline onPlay={() => setVideoPlaying(true)} onPause={() => setVideoPlaying(false)} /><div className="video-controls"><button onClick={toggleVideo} aria-label={videoPlaying ? "Pause video" : "Play video"}>{videoPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button><span>Yeh hai Ahmed Bhai ka style!</span><button onClick={toggleMute} aria-label={muted ? "Unmute video" : "Mute video"}>{muted ? <VolumeX /> : <Volume2 />}</button></div></div></Reveal></div></section>

        <section className="bite-section"><div className="page-width"><Reveal><SectionLabel>THE STREET FOOD EXPERIENCE</SectionLabel><h2>ONE BITE.<br /><span>ONE CRUNCH.</span><br />FULL CHAAT.</h2><div className="ingredient-row">{["SAMOSA", "CHICKPEAS", "YOGURT", "CHUTNEY", "CORIANDER"].map((item, i) => <span key={item}><i>{["✦", "●", "◆", "≈", "✳"][i]}</i>{item}</span>)}</div></Reveal></div></section>

        <section className="why-section cream-section"><div className="page-width"><Reveal><SectionLabel>THE AHMED DIFFERENCE</SectionLabel><div className="why-heading"><h2>WHY AHMED'S<br /><span>CHAAT?</span></h2><p>Because the taste comes with personality. And that is something you cannot copy.</p></div></Reveal><div className="why-grid">{[[Flame, "CRISPY SAMOSAY", "Golden, crispy and fresh."], [Sparkles, "CHATPATA CHANA", "Full desi flavour."], [MessageCircle, "DESI CHUTNEYS", "Sweet, spicy and tangy."], [Quote, "AHMED BHAI KA STYLE", "The taste comes with personality."]].map(([Icon, title, copy], i) => <Reveal delay={i * 0.08} key={title as string}><div className="why-card"><Icon size={24} strokeWidth={1.5} /><span>0{i + 1}</span><h3>{title as string}</h3><p>{copy as string}</p></div></Reveal>)}</div></div></section>

        <section className="stall-section"><img src={STALL_IMAGE} alt="Ahmed Samosa Chaat House stall signboard" loading="lazy" /><div className="stall-overlay" /><div className="page-width stall-content"><Reveal><SectionLabel dark>THE KARACHI FEELING</SectionLabel><h2>KARACHI KA<br /><em>STREET FOOD.</em><br />AHMED BHAI<br />KA STYLE.</h2><p>Jahan roadside chaat sirf khana nahi hoti — ek experience hoti hai.</p></Reveal></div></section>

        <section id="visit" className="visit-section dark-section"><div className="page-width"><Reveal><SectionLabel dark>FIND THE FLAVOUR</SectionLabel><h2>CHAT LOO,<br /><em>PHIR BAAT KARENGE!</em></h2></Reveal><div className="visit-layout"><Reveal delay={0.1}><div className="visit-details"><span className="visit-kicker">AHMED SAMOSA CHAAT HOUSE</span><div className="detail-line"><MapPin size={21} /><p>V4W8+X4Q, Gulshan-e-Jamal (Railway Colony),<br />Block D, Gulshan-e-Jamal, Karachi, Pakistan</p></div><div className="detail-line"><Phone size={20} /><a href={PHONE}>0336 1125871</a></div><div className="visit-actions"><a href={WHATSAPP} target="_blank" rel="noreferrer" className="button button-yellow"><MessageCircle size={18} /> WHATSAPP AHMED BHAI</a><a href={PHONE} className="button button-outline"><Phone size={17} /> CALL NOW</a></div></div></Reveal><Reveal delay={0.2}><div className="map-card"><div className="map-lines" /><MapPin size={32} /><span>GULSHAN-E-JAMAL</span><strong>KARACHI, PAKISTAN</strong><a href={MAPS} target="_blank" rel="noreferrer">GET DIRECTIONS <ArrowUpRight size={16} /></a></div></Reveal></div></div></section>
      </main>

      <footer className="site-footer"><div className="page-width footer-grid"><div><button className="brand-mark footer-brand" onClick={() => go("home")}><span>AHMED</span><small>SAMOSA CHAAT HOUSE</small></button><p className="footer-tagline">AHMED KI CHAT LOO!</p><p className="footer-subtitle">Karachi ki asli Sindhi-style Samosa Chaat</p></div><div className="footer-links"><span>FIND US</span><a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14} /></a><a href={PHONE}>Phone <ArrowUpRight size={14} /></a><a href={MAPS} target="_blank" rel="noreferrer">Google Maps <ArrowUpRight size={14} /></a></div><div className="footer-location"><span>LOCATION</span><p>V4W8+X4Q, Gulshan-e-Jamal (Railway Colony), Block D, Gulshan-e-Jamal, Karachi</p><Sparkles size={18} /></div></div><div className="page-width footer-bottom"><span>© AHMED SAMOSA CHAAT HOUSE</span><span>Made with <b>♥</b> for Karachi street food.</span><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowDown size={17} /> BACK TO TOP</button></div></footer>
    </div>
  );
}
