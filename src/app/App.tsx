import { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu as MenuIcon,
  X,
  MapPin,
  Clock,
  Phone,
  Mail,
  Plus,
  Trash2,
  Edit3,
  Save,
  LogOut,
  Eye,
  LayoutDashboard,
  Facebook,
  Instagram,
  ShieldCheck,
  Link2,
  Info,
  Image as ImageIcon,
  ChevronDown,
  Star,
  Check,
  AlertCircle,
  UtensilsCrossed,
} from "lucide-react";
import bgImage from "../assets/bg1.jpg";
import logoImage from "../assets/logo1.png";
import fontImage from "../assets/font1.png";
import aboutImage from "../assets/restro.jpg";

// ─── TIKTOK SVG (not in lucide) ───────────────────────────────────────────────
const TikTokIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.16 8.16 0 0 0 4.84 1.56V7.17a4.85 4.85 0 0 1-1.07-.48z" />
  </svg>
);

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  popular?: boolean;
  image?: string; // base64 data URL
}
interface MenuCategory {
  id: string;
  name: string;
  emoji: string;
  items: MenuItem[];
}
interface Testimonial {
  id: string;
  author: string;
  rating: number;
  text: string;
  time: string;
  profilePhoto?: string;
}
interface SiteContent {
  hero: { tagline: string; welcomeMessage: string; openTime: string; closeTime: string };
  about: { story: string; artistQuote: string; artistNote: string };
  menu: MenuCategory[];
  location: { address: string; phone: string; email: string };
  social: { facebook: string; instagram: string; tiktok: string };
}

// ─── SEED DATA ────────────────────────────────────────────────────────────────
const DEFAULT_CONTENT: SiteContent = {
  hero: {
    tagline: "Restro 53",
    welcomeMessage: "Great food, warm ambiance, and a touch of local art — right in the heart of Kathmandu.",
    openTime: "07:00",
    closeTime: "21:00",
  },
  about: {
    story:
      "Nestled in the vibrant streets of Kathmandu, Restro 53 is more than a restaurant — it is a celebration of Nepali culture, flavors, and creativity. We bring you authentic tastes prepared with love, served in a space that breathes warmth and artistry. Every dish tells a story rooted in the rich culinary heritage of Nepal.",
    artistQuote: "Added local arts to support local artist.... hope you guys like it.",
    artistNote:
      "Every wall, every corner of Restro 53 tells a story through the eyes of local Nepali artists. We believe that great food and great art share the same soul — both nourish, both inspire. When you dine here, you become part of something larger than a meal.",
  },
  menu: [
    {
      id: "chowmein",
      name: "Chowmein",
      emoji: "🍜",
      items: [
        { id: "c1", name: "Chicken Chowmein", price: 180, description: "Stir-fried noodles with chicken and vegetables" },
        { id: "c2", name: "Vegetable Chowmein", price: 150, description: "Stir-fried noodles with mixed vegetables" },
        { id: "c3", name: "Sadheko Chowmein", price: 170, description: "Spicy marinated chowmein with tangy flavors" },
        { id: "c4", name: "Mix Chowmein", price: 220, description: "Stir-fried noodles with chicken and vegetables" },
      ],
    },
    {
      id: "keema-noodle",
      name: "Keema Noodle",
      emoji: "🍝",
      items: [
        { id: "k1", name: "Chicken Keema Noodles", price: 200, description: "Noodles with spiced minced chicken" },
        { id: "k2", name: "Buff Keema Noodles", price: 220, description: "Noodles with spiced minced buffalo meat" },
      ],
    },
    {
      id: "laphing",
      name: "Laphing",
      emoji: "🥢",
      items: [
        { id: "l1", name: "Dry Laphing", price: 70, description: "Cold noodle dish with dry spices" },
        { id: "l2", name: "Jhol Laphing", price: 90, description: "Cold noodle dish with spicy soup" },
      ],
    },
    {
      id: "momos",
      name: "Momos",
      emoji: "🥟",
      items: [
        { id: "m1", name: "Chicken Momo (Steam)", price: 180, description: "Steamed dumplings stuffed with spiced minced chicken", popular: true },
        { id: "m2", name: "Chicken Momo (Jhol)", price: 200, description: "Steamed dumplings served with spicy dipping sauce" },
        { id: "m3", name: "Chicken Momo (Chilli)", price: 230, description: "Dumplings in spicy chilli sauce" },
        { id: "m4", name: "Chicken Momo (Kothey)", price: 210, description: "Pan-fried dumplings with spiced chicken" },
        { id: "m5", name: "Vegetable Momo (Steam)", price: 150, description: "Steamed dumplings stuffed with seasonal vegetables" },
        { id: "m6", name: "Vegetable Momo (Jhol)", price: 170, description: "Steamed dumplings served with spicy dipping sauce" },
        { id: "m7", name: "Vegetable Momo (Chilli)", price: 200, description: "Dumplings in spicy chilli sauce" },
        { id: "m8", name: "Vegetable Momo (Kothey)", price: 180, description: "Pan-fried dumplings with vegetables" },
      ],
    },
    {
      id: "sadheko",
      name: "Sadheko",
      emoji: "�️",
      items: [
        { id: "s1", name: "Chicken Sadheko", price: 220, description: "Spicy marinated chicken with tangy flavors" },
        { id: "s2", name: "Peanuts Sadheko", price: 150, description: "Spicy marinated peanuts with herbs" },
        { id: "s3", name: "Sweetcorn Sadheko", price: 140, description: "Spicy marinated sweet corn" },
        { id: "s4", name: "Bhatmas Sadheko", price: 150, description: "Spicy marinated soybeans" },
        { id: "s5", name: "Aloo Sadheko", price: 150, description: "Spicy marinated potatoes" },
        { id: "s6", name: "Wai-Wai Sadheko", price: 125, description: "Spicy marinated instant noodles" },
      ],
    },
    {
      id: "chatpat",
      name: "Chatpat",
      emoji: "🥗",
      items: [
        { id: "ch1", name: "Plain Chatpat", price: 100, description: "Spicy tangy snack mix" },
        { id: "ch2", name: "Gilo Chatpat", price: 120, description: "Spicy chatpat with extra heat" },
        { id: "ch3", name: "Chicken Chatpat", price: 150, description: "Spicy chatpat with chicken" },
      ],
    },
    {
      id: "fried-rice",
      name: "Fried Rice",
      emoji: "�",
      items: [
        { id: "fr1", name: "Chicken Fried Rice", price: 220, description: "Fried rice with chicken and vegetables" },
        { id: "fr2", name: "Veg Fried Rice", price: 170, description: "Fried rice with mixed vegetables" },
        { id: "fr3", name: "Mix Fried Rice", price: 260, description: "Fried rice with chicken and vegetables" },
      ],
    },
    {
      id: "sandwich",
      name: "Sandwich",
      emoji: "🥪",
      items: [
        { id: "sw1", name: "Vegetable Sandwich", price: 130, description: "Grilled sandwich with vegetables" },
        { id: "sw2", name: "Chicken Sandwich", price: 190, description: "Grilled sandwich with chicken" },
        { id: "sw3", name: "Extra Cheese", price: 80, description: "Add extra cheese to any sandwich" },
      ],
    },
    {
      id: "wraps",
      name: "Wraps",
      emoji: "🌯",
      items: [
        { id: "w1", name: "Egg Chicken Wrap", price: 240, description: "Wrap with egg and chicken" },
        { id: "w2", name: "Chicken Wrap", price: 200, description: "Wrap with spiced chicken" },
      ],
    },
    {
      id: "burger",
      name: "Burger",
      emoji: "🍔",
      items: [
        { id: "bu1", name: "Chicken Burger", price: 250, description: "Grilled chicken burger with vegetables" },
        { id: "bu2", name: "Vegetable Burger", price: 200, description: "Vegetable patty burger with fresh veggies" },
        { id: "bu3", name: "Extra Cheese", price: 80, description: "Add extra cheese to any burger" },
      ],
    },
    {
      id: "pizzas",
      name: "Pizzas",
      emoji: "🍕",
      items: [
        { id: "p1", name: "Chicken Pizza (Small)", price: 500, description: "Small pizza with chicken and cheese" },
        { id: "p2", name: "Chicken Pizza (Large)", price: 650, description: "Large pizza with chicken and cheese" },
        { id: "p3", name: "Vegetable Pizza (Small)", price: 450, description: "Small pizza with mixed vegetables" },
        { id: "p4", name: "Vegetable Pizza (Large)", price: 550, description: "Large pizza with mixed vegetables" },
        { id: "p5", name: "Mix Pizza (Small)", price: 600, description: "Small pizza with chicken and vegetables" },
        { id: "p6", name: "Mix Pizza (Large)", price: 750, description: "Large pizza with chicken and vegetables" },
      ],
    },
    {
      id: "veg-snacks",
      name: "Vegetable Snacks",
      emoji: "🥔",
      items: [
        { id: "vs1", name: "French Fries", price: 200, description: "Golden crispy fries" },
        { id: "vs2", name: "Chips Chilli", price: 230, description: "Spicy potato chips" },
        { id: "vs3", name: "Paneer Pakauda", price: 280, description: "Fried paneer fritters with spices" },
        { id: "vs4", name: "Sweet Corn Fry", price: 200, description: "Fried sweet corn with spices" },
        { id: "vs5", name: "Mix Veg Pakauda", price: 180, description: "Mixed vegetable fritters" },
        { id: "vs6", name: "Mushroom Chilli", price: 220, description: "Spicy mushroom dish" },
        { id: "vs7", name: "Spicy Mustang Aloo", price: 220, description: "Spicy potatoes with Mustang herbs" },
      ],
    },
    {
      id: "non-veg-snacks",
      name: "Non-Vegetable Snacks",
      emoji: "�",
      items: [
        { id: "ns1", name: "Drumstick", price: 300, description: "Fried chicken drumsticks" },
        { id: "ns2", name: "Buffalo Wings", price: 330, description: "Spicy buffalo wings" },
        { id: "ns3", name: "Chicken Chilli", price: 250, description: "Spicy chicken with bell peppers" },
        { id: "ns4", name: "Sausage Fry", price: 200, description: "Fried sausages with spices" },
        { id: "ns5", name: "Sausage Chilli", price: 250, description: "Spicy sausages with peppers" },
        { id: "ns6", name: "Sesame Chicken Roast", price: 230, description: "Roasted chicken with sesame seeds" },
        { id: "ns7", name: "Chicken Leg Piece", price: 350, description: "Fried chicken leg piece" },
      ],
    },
    {
      id: "khaja-set",
      name: "Khaja Set",
      emoji: "🍱",
      items: [
        { id: "ks1", name: "Chicken Khaja Set", price: 300, description: "Snack platter with chicken items" },
        { id: "ks2", name: "Veg Khaja Set", price: 250, description: "Snack platter with vegetarian items" },
        { id: "ks3", name: "Pork Khaja Set", price: 330, description: "Snack platter with pork items" },
      ],
    },
    {
      id: "salads",
      name: "Salads",
      emoji: "🥗",
      items: [
        { id: "sa1", name: "Creamy Fruit Salad", price: 280, description: "Fresh fruits with creamy dressing" },
        { id: "sa2", name: "Nepali Salad", price: 200, description: "Traditional Nepali style salad" },
        { id: "sa3", name: "Chicken Caesar Salad", price: 250, description: "Caesar salad with chicken" },
      ],
    },
    {
      id: "hot-beverage",
      name: "Hot Beverage",
      emoji: "☕",
      items: [
        { id: "hb1", name: "Black Tea", price: 35, description: "Pure black tea" },
        { id: "hb2", name: "Milk Tea", price: 50, description: "Tea with milk" },
        { id: "hb3", name: "Milk Masala Tea", price: 80, description: "Spiced tea with milk" },
        { id: "hb4", name: "Hot Lemon", price: 80, description: "Hot lemon drink" },
        { id: "hb5", name: "Hot Lemon with Ginger & Honey", price: 125, description: "Hot lemon with ginger and honey" },
        { id: "hb6", name: "Hot Chocolate", price: 150, description: "Rich hot chocolate" },
        { id: "hb7", name: "Black Coffee with Froth (Nescafe)", price: 120, description: "Black coffee with froth" },
        { id: "hb8", name: "Milk Coffee with Froth (Nescafe)", price: 150, description: "Coffee with milk and froth" },
      ],
    },
    {
      id: "cold-beverage",
      name: "Cold Beverage",
      emoji: "🧊",
      items: [
        { id: "cb1", name: "Milkshake (Strawberry / Vanilla / Chocolate)", price: 180, description: "Creamy milkshake in various flavors" },
        { id: "cb2", name: "Lassi (Plain / Banana)", price: 150, description: "Traditional yogurt drink" },
        { id: "cb3", name: "Ice Americano", price: 160, description: "Iced Americano coffee" },
        { id: "cb4", name: "Ice Mocha", price: 200, description: "Iced mocha coffee" },
        { id: "cb5", name: "Ice Tea (Lemon / Peach)", price: 170, description: "Iced tea in various flavors" },
        { id: "cb6", name: "Smoothie (Strawberry / Vanilla / Banana / Blueberry)", price: 250, description: "Fresh fruit smoothie" },
      ],
    },
    {
      id: "refreshments",
      name: "Refreshments",
      emoji: "🍹",
      items: [
        { id: "r1", name: "Mojito (Mint / Watermelon / Virgin)", price: 200, description: "Refreshing mojito in various flavors" },
        { id: "r2", name: "Mint Lemonade", price: 180, description: "Fresh mint lemonade" },
        { id: "r3", name: "Lemon Soda", price: 100, description: "Classic lemon soda" },
        { id: "r4", name: "Grape Lemonade", price: 250, description: "Grape flavored lemonade" },
      ],
    },
  ],
  location: {
    address: "Kathmandu, Nepal",
    phone: "+977-9768588331",
    email: "restro2053@gmail.com",
  },
  social: {
    facebook: "https://facebook.com/restro53",
    instagram: "https://instagram.com/restro53",
    tiktok: "https://tiktok.com/@restro53",
  },
};

// ─── AUTH (client-side demo — replace with server auth in production) ─────────
const ADMIN_USER = "admin";
const ADMIN_PASS = "Restro53@2026";
const AUTH_KEY = "restro53_auth_v1";

function checkAuth() {
  return sessionStorage.getItem(AUTH_KEY) === "yes";
}
function doLogin(u: string, p: string) {
  if (u === ADMIN_USER && p === ADMIN_PASS) {
    sessionStorage.setItem(AUTH_KEY, "yes");
    return true;
  }
  return false;
}
function doLogout() {
  sessionStorage.removeItem(AUTH_KEY);
}

// ─── HOOK ─────────────────────────────────────────────────────────────────────
function useLocalStorage<T>(key: string, def: T): [T, (v: T) => void] {
  const [val, setVal] = useState<T>(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? (JSON.parse(s) as T) : def;
    } catch {
      return def;
    }
  });
  const set = useCallback(
    (v: T) => {
      setVal(v);
      try {
        localStorage.setItem(key, JSON.stringify(v));
      } catch {}
    },
    [key]
  );
  return [val, set];
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-[200] flex items-center gap-2 px-4 py-3 rounded-lg shadow-xl text-sm font-medium transition-all
        ${type === "success" ? "bg-[#e8b84b] text-[#1a1a1a]" : "bg-[#c0392b] text-white"}`}
    >
      {type === "success" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      {message}
    </div>
  );
}

function useToast() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const show = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2800);
  };
  return { toast, show };
}

// ─── ID GENERATOR ─────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Menu", href: "#menu" },
    { label: "Location", href: "#location" },
    { label: "Follow Us", href: "#follow" },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#e8b84b]/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("#home")}
          className="flex items-center gap-2 group"
        >
          <img
            src={logoImage}
            alt="Restro 53 Logo"
            className="w-12 h-12 rounded-full object-cover"
          />
          <img
            src={fontImage}
            alt="Restro 53"
            className="h-10 object-contain group-hover:opacity-80 transition-opacity"
            style={{ filter: "sepia(1) saturate(5) hue-rotate(-10deg) brightness(1.1)" }}
          />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="text-sm font-medium text-[#f0e6d3]/80 hover:text-[#e8b84b] transition-colors tracking-wide uppercase"
              style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: "0.08em" }}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#f0e6d3] hover:text-[#e8b84b] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-[#1a1a1a] border-t border-[#e8b84b]/10 px-5 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="text-left text-base font-medium text-[#f0e6d3]/80 hover:text-[#e8b84b] transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ content }: { content: SiteContent["hero"] }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 bg-[#111]">
        <img
          src={bgImage}
          alt="Restro 53 ambiance"
          className="w-full h-full object-cover opacity-40"
        />
        {/* Vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/60 via-transparent to-[#1a1a1a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/40 via-transparent to-[#1a1a1a]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-[#e8b84b]/60" />
          <span className="text-[#e8b84b] text-xs uppercase tracking-[0.2em] font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Kathmandu, Nepal
          </span>
          <div className="h-px w-12 bg-[#e8b84b]/60" />
        </div>

        <div className="flex justify-center mb-6">
          <img
            src={fontImage}
            alt={content.tagline}
            className="h-24 md:h-32 object-contain"
            style={{ filter: "brightness(1.8) contrast(0.9)" }}
          />
        </div>

        <p
          className="text-lg md:text-xl text-[#f0e6d3]/75 leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
        >
          {content.welcomeMessage}
        </p>

        {/* Hours badge + CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <div className="inline-flex items-center gap-2.5 bg-[#e8b84b]/10 border border-[#e8b84b]/30 rounded-full px-5 py-2.5">
            <Clock className="w-4 h-4 text-[#e8b84b]" />
            <span
              className="text-sm text-[#f0e6d3]/90 font-medium"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Open Daily &nbsp;
              <span className="text-[#e8b84b]">{content.openTime} – {content.closeTime}</span>
            </span>
          </div>

          <button
            onClick={() => {
              const el = document.querySelector("#menu");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 bg-[#e8b84b] text-[#1a1a1a] font-semibold rounded-full px-7 py-2.5 text-sm hover:bg-[#d4a43e] active:scale-95 transition-all"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <UtensilsCrossed className="w-4 h-4" />
            View Our Menu
          </button>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 animate-bounce">
          <ChevronDown className="w-5 h-5 text-[#f0e6d3]" />
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About({ content }: { content: SiteContent["about"] }) {
  return (
    <section id="about" className="py-24 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden">
              <img
                src={aboutImage}
                alt="Restro 53 interior with local art"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 to-transparent" />
            </div>
            {/* Gold accent corner */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-[#e8b84b]/40 rounded-sm" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-[#e8b84b]/40 rounded-sm" />
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#e8b84b]" />
              <span
                className="text-[#e8b84b] text-xs uppercase tracking-[0.2em]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Our Story
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-bold text-[#f0e6d3] mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Where Food Meets <em>Art</em>
            </h2>

            <p
              className="text-[#f0e6d3]/65 leading-relaxed mb-8"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
            >
              {content.story}
            </p>

            {/* Artist quote block */}
            <blockquote className="relative border-l-2 border-[#e8b84b] pl-6 py-2 mb-8">
              <p
                className="text-[#e8b84b] text-lg italic leading-relaxed"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                &ldquo;{content.artistQuote}&rdquo;
              </p>
              <footer
                className="mt-2 text-xs text-[#f0e6d3]/40 uppercase tracking-widest"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                — The Restro 53 Team
              </footer>
            </blockquote>

            <p
              className="text-[#f0e6d3]/55 text-sm leading-relaxed"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
            >
              {content.artistNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MENU ─────────────────────────────────────────────────────────────────────
function MenuSection({ content }: { content: MenuCategory[] }) {
  const [activeId, setActiveId] = useState(content[0]?.id ?? "");
  const active = content.find((c) => c.id === activeId) ?? content[0];

  return (
    <section id="menu" className="py-24 bg-[#151515]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#e8b84b]" />
            <span
              className="text-[#e8b84b] text-xs uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              What We Serve
            </span>
            <div className="h-px w-8 bg-[#e8b84b]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#f0e6d3]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Menu
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide justify-center flex-wrap">
          {content.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border
                ${
                  activeId === cat.id
                    ? "bg-[#e8b84b] text-[#1a1a1a] border-[#e8b84b]"
                    : "bg-transparent text-[#f0e6d3]/60 border-[#e8b84b]/20 hover:border-[#e8b84b]/50 hover:text-[#f0e6d3]"
                }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span>{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Items grid */}
        {active && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {active.items.map((item) => (
              <div
                key={item.id}
                className="relative bg-[#222] border border-[#e8b84b]/10 rounded-sm overflow-hidden hover:border-[#e8b84b]/30 transition-all group"
              >
                {/* Food image */}
                {item.image ? (
                  <div className="h-44 bg-[#1a1a1a] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : null}

                <div className="p-5">
                  {item.popular && (
                    <span
                      className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#e8b84b] bg-[#e8b84b]/10 border border-[#e8b84b]/20 rounded-full px-2 py-0.5 mb-3"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      <Star className="w-2.5 h-2.5" />
                      Popular
                    </span>
                  )}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3
                      className="text-[#f0e6d3] font-semibold text-base leading-tight group-hover:text-[#e8b84b] transition-colors"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {item.name}
                    </h3>
                    <span
                      className="text-[#e8b84b] font-semibold text-sm shrink-0"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Rs {item.price.toFixed(2)}
                    </span>
                  </div>
                  <p
                    className="text-[#f0e6d3]/45 text-sm leading-relaxed"
                    style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── LOCATION ─────────────────────────────────────────────────────────────────
function Location({
  content,
  hero,
}: {
  content: SiteContent["location"];
  hero: SiteContent["hero"];
}) {
  return (
    <section id="location" className="py-24 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#e8b84b]" />
            <span
              className="text-[#e8b84b] text-xs uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Find Us
            </span>
            <div className="h-px w-8 bg-[#e8b84b]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#f0e6d3]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Location
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Map */}
          <div className="md:col-span-3 rounded-sm overflow-hidden border border-[#e8b84b]/15 bg-[#222]">
            <iframe
              title="Restro 53 Location"
              src="https://maps.google.com/maps?q=27.7521077,85.3264344&hl=en&z=16&output=embed"
              className="w-full h-80 md:h-96 grayscale contrast-125 opacity-80"
              loading="lazy"
              allowFullScreen
            />
          </div>

          {/* Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#222] border border-[#e8b84b]/10 rounded-sm p-6">
              <h3
                className="text-lg font-semibold text-[#e8b84b] mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Visit Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#e8b84b] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#f0e6d3] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {content.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#e8b84b] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#f0e6d3] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Daily: {hero.openTime} – {hero.closeTime}
                    </p>
                    <p className="text-[#f0e6d3]/40 text-xs mt-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      7 days a week
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#e8b84b] mt-0.5 shrink-0" />
                  <a
                    href={`tel:${content.phone}`}
                    className="text-[#f0e6d3] text-sm hover:text-[#e8b84b] transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {content.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#e8b84b] mt-0.5 shrink-0" />
                  <a
                    href={`mailto:${content.email}`}
                    className="text-[#f0e6d3] text-sm hover:text-[#e8b84b] transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {content.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Hours table */}
            <div className="bg-[#222] border border-[#e8b84b]/10 rounded-sm p-6">
              <h3
                className="text-lg font-semibold text-[#e8b84b] mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Opening Hours
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span
                    className="text-[#f0e6d3]/60 text-xs"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Monday - Sunday
                  </span>
                  <span
                    className="text-[#f0e6d3] text-xs font-medium"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {hero.openTime} – {hero.closeTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ───────────────────────────────────────────────────────────────
function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const PLACE_ID = "ChIJWU-UIgAZ6zkRY78nHT9mAV8";
  const API_KEY = ""; // Add your Google Places API key here

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (API_KEY) {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`
          );
          const data = await response.json();
          
          if (data.result && data.result.reviews) {
            const formattedReviews: Testimonial[] = data.result.reviews.map((review: any) => ({
              id: review.time.toString(),
              author: review.author_name,
              rating: review.rating,
              text: review.text,
              time: review.relative_time_description,
              profilePhoto: review.profile_photo_url,
            }));
            setTestimonials(formattedReviews);
          }
        } else {
          // Fallback testimonials when no API key is provided
          const fallbackTestimonials: Testimonial[] = [
            {
              id: "1",
              author: "Aarav Sharma",
              rating: 5,
              text: "Amazing food and great ambiance! The momos are the best I've had in Kathmandu. Will definitely come back.",
              time: "2 weeks ago",
            },
            {
              id: "2", 
              author: "Priya Thapa",
              rating: 5,
              text: "Love the local art and the cozy atmosphere. The staff is super friendly and the food is always fresh.",
              time: "1 month ago",
            },
            {
              id: "3",
              author: "Rajesh Gurung",
              rating: 4,
              text: "Great place to hang out with friends. The chowmein and chicken chilli are must-try dishes!",
              time: "3 weeks ago",
            },
            {
              id: "4",
              author: "Sita Magar",
              rating: 5,
              text: "Perfect spot for family dinners. The thakali set reminds me of home cooking. Highly recommended!",
              time: "1 week ago",
            },
            {
              id: "5",
              author: "Bikash Rai",
              rating: 5,
              text: "Best restaurant in Tokha! The prices are reasonable and the quality is top-notch. Love the art on the walls.",
              time: "2 days ago",
            },
          ];
          // Randomly select 3 testimonials
          const shuffled = fallbackTestimonials.sort(() => 0.5 - Math.random());
          setTestimonials(shuffled.slice(0, 3));
        }
      } catch (err) {
        setError("Failed to load reviews");
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-[#e8b84b] text-[#e8b84b]" : "text-[#e8b84b]/30"}`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-24 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#e8b84b]" />
            <span
              className="text-[#e8b84b] text-xs uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Customer Love
            </span>
            <div className="h-px w-8 bg-[#e8b84b]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#f0e6d3]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What People Say
          </h2>
        </div>

        {loading ? (
          <div className="text-center text-[#f0e6d3]/60">Loading reviews...</div>
        ) : error ? (
          <div className="text-center text-[#f0e6d3]/60">{error}</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#222] border border-[#e8b84b]/10 rounded-sm p-6 hover:border-[#e8b84b]/30 transition-all"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Review text */}
                <p
                  className="text-[#f0e6d3]/75 text-sm leading-relaxed mb-6"
                  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
                >
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  {testimonial.profilePhoto ? (
                    <img
                      src={testimonial.profilePhoto}
                      alt={testimonial.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#e8b84b]/20 flex items-center justify-center">
                      <span className="text-[#e8b84b] font-semibold text-sm">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p
                      className="text-[#f0e6d3] font-semibold text-sm"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {testimonial.author}
                    </p>
                    <p
                      className="text-[#f0e6d3]/40 text-xs"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {testimonial.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Google Reviews Link */}
        <div className="text-center mt-10">
          <a
            href={`https://search.google.com/local/writereview?placeid=${PLACE_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#e8b84b] hover:text-[#f0e6d3] transition-colors text-sm font-medium"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <Star className="w-4 h-4" />
            Write a Review on Google
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FOLLOW US ────────────────────────────────────────────────────────────────
function FollowUs({ content }: { content: SiteContent["social"] }) {
  const socials = [
    {
      label: "Facebook",
      href: content.facebook,
      icon: <Facebook className="w-6 h-6" />,
      color: "hover:bg-[#1877f2]/20 hover:border-[#1877f2]/50",
    },
    {
      label: "Instagram",
      href: content.instagram,
      icon: <Instagram className="w-6 h-6" />,
      color: "hover:bg-[#e1306c]/20 hover:border-[#e1306c]/50",
    },
    {
      label: "TikTok",
      href: content.tiktok,
      icon: <TikTokIcon className="w-6 h-6" />,
      color: "hover:bg-white/10 hover:border-white/40",
    },
  ];

  return (
    <section id="follow" className="py-28 bg-[#111] relative overflow-hidden">
      {/* Decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[18vw] font-bold text-[#f0e6d3]/[0.015] whitespace-nowrap"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Follow Us
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-8 bg-[#e8b84b]" />
          <span
            className="text-[#e8b84b] text-xs uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Stay Connected
          </span>
          <div className="h-px w-8 bg-[#e8b84b]" />
        </div>

        <h2
          className="text-4xl md:text-5xl font-bold text-[#f0e6d3] mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Follow Restro 53
        </h2>
        <p
          className="text-[#f0e6d3]/50 mb-12 text-lg"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
        >
          Daily specials, behind-the-scenes, and the latest from our artists.
        </p>

        <div className="flex flex-wrap justify-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-8 py-4 border border-[#f0e6d3]/15 rounded-sm text-[#f0e6d3] transition-all duration-200 ${s.color} hover:text-[#f0e6d3]`}
            >
              {s.icon}
              <span
                className="text-base font-medium"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {s.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ onAdminClick }: { onAdminClick: () => void }) {
  return (
    <footer className="bg-[#111] border-t border-[#e8b84b]/10 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p
          className="text-[#f0e6d3]/35 text-sm text-center md:text-left"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          © 2026 Restro 53 · Kathmandu, Nepal. All rights reserved.
        </p>
        <button
          onClick={onAdminClick}
          className="text-xs text-[#f0e6d3]/20 hover:text-[#e8b84b]/60 transition-colors"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Admin
        </button>
      </div>
    </footer>
  );
}

// ─── PUBLIC SITE ──────────────────────────────────────────────────────────────
function PublicSite({
  content,
  onAdminClick,
}: {
  content: SiteContent;
  onAdminClick: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Header />
      <Hero content={content.hero} />
      <About content={content.about} />
      <MenuSection content={content.menu} />
      <Testimonials />
      <Location content={content.location} hero={content.hero} />
      <FollowUs content={content.social} />
      <Footer onAdminClick={onAdminClick} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── ADMIN LOGIN ──────────────────────────────────────────────────────────────
function AdminLogin({
  onLogin,
  onBack,
}: {
  onLogin: () => void;
  onBack: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (doLogin(username, password)) {
        onLogin();
      } else {
        setError("Invalid username or password.");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-[#e8b84b]/10 border border-[#e8b84b]/30 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-7 h-7 text-[#e8b84b]" />
          </div>
          <h1
            className="text-2xl font-bold text-[#f0e6d3]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Admin Panel
          </h1>
          <p
            className="text-sm text-[#f0e6d3]/40 mt-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Restro 53 · Kathmandu
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-xs font-medium text-[#f0e6d3]/60 mb-1.5 uppercase tracking-wider"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#222] border border-[#e8b84b]/15 rounded-sm px-4 py-3 text-[#f0e6d3] text-sm focus:outline-none focus:border-[#e8b84b]/50 transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              placeholder="admin"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label
              className="block text-xs font-medium text-[#f0e6d3]/60 mb-1.5 uppercase tracking-wider"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#222] border border-[#e8b84b]/15 rounded-sm px-4 py-3 text-[#f0e6d3] text-sm focus:outline-none focus:border-[#e8b84b]/50 transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              placeholder="••••••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p
              className="flex items-center gap-1.5 text-[#c0392b] text-sm"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e8b84b] text-[#1a1a1a] font-semibold py-3 rounded-sm text-sm hover:bg-[#d4a43e] disabled:opacity-60 transition-colors mt-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 p-3 rounded-sm bg-[#222] border border-[#e8b84b]/10">
          <p className="text-xs text-[#f0e6d3]/30 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Default: <span className="text-[#f0e6d3]/50">admin</span> / <span className="text-[#f0e6d3]/50">Restro53@2026</span>
          </p>
        </div>

        <button
          onClick={onBack}
          className="w-full mt-4 text-xs text-[#f0e6d3]/30 hover:text-[#f0e6d3]/60 transition-colors"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          ← Back to website
        </button>
      </div>
    </div>
  );
}

// ─── SHARED FORM FIELD ────────────────────────────────────────────────────────
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-xs font-medium text-[#f0e6d3]/50 mb-1.5 uppercase tracking-wider"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-[#1a1a1a] border border-[#e8b84b]/15 rounded-sm px-3 py-2.5 text-[#f0e6d3] text-sm focus:outline-none focus:border-[#e8b84b]/40 transition-colors";

const textareaCls = inputCls + " min-h-[90px] resize-y leading-relaxed";

// ─── HERO EDITOR ──────────────────────────────────────────────────────────────
function HeroEditor({
  data,
  onChange,
}: {
  data: SiteContent["hero"];
  onChange: (d: SiteContent["hero"]) => void;
}) {
  const [local, setLocal] = useState(data);
  const { toast, show } = useToast();

  const save = () => {
    onChange(local);
    show("Hero section saved!");
  };

  return (
    <div className="space-y-5">
      {toast && <Toast {...toast} />}
      <Field label="Business Name / Tagline">
        <input
          className={inputCls}
          style={{ fontFamily: "'Poppins', sans-serif" }}
          value={local.tagline}
          onChange={(e) => setLocal({ ...local, tagline: e.target.value })}
        />
      </Field>
      <Field label="Welcome Message">
        <textarea
          className={textareaCls}
          style={{ fontFamily: "'Poppins', sans-serif" }}
          value={local.welcomeMessage}
          onChange={(e) => setLocal({ ...local, welcomeMessage: e.target.value })}
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Opening Time">
          <input
            type="time"
            className={inputCls}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            value={local.openTime}
            onChange={(e) => setLocal({ ...local, openTime: e.target.value })}
          />
        </Field>
        <Field label="Closing Time">
          <input
            type="time"
            className={inputCls}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            value={local.closeTime}
            onChange={(e) => setLocal({ ...local, closeTime: e.target.value })}
          />
        </Field>
      </div>
      <button
        onClick={save}
        className="flex items-center gap-2 bg-[#e8b84b] text-[#1a1a1a] px-5 py-2.5 rounded-sm text-sm font-semibold hover:bg-[#d4a43e] transition-colors"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <Save className="w-4 h-4" /> Save Hero Section
      </button>
    </div>
  );
}

// ─── ABOUT EDITOR ─────────────────────────────────────────────────────────────
function AboutEditor({
  data,
  onChange,
}: {
  data: SiteContent["about"];
  onChange: (d: SiteContent["about"]) => void;
}) {
  const [local, setLocal] = useState(data);
  const { toast, show } = useToast();

  const save = () => {
    onChange(local);
    show("About section saved!");
  };

  return (
    <div className="space-y-5">
      {toast && <Toast {...toast} />}
      <Field label="Restaurant Story">
        <textarea
          className={textareaCls}
          style={{ fontFamily: "'Poppins', sans-serif" }}
          value={local.story}
          onChange={(e) => setLocal({ ...local, story: e.target.value })}
        />
      </Field>
      <Field label="Artist Quote (displayed as blockquote)">
        <textarea
          className={textareaCls}
          style={{ fontFamily: "'Poppins', sans-serif" }}
          value={local.artistQuote}
          onChange={(e) => setLocal({ ...local, artistQuote: e.target.value })}
        />
      </Field>
      <Field label="Artist Support Note">
        <textarea
          className={textareaCls}
          style={{ fontFamily: "'Poppins', sans-serif" }}
          value={local.artistNote}
          onChange={(e) => setLocal({ ...local, artistNote: e.target.value })}
        />
      </Field>
      <button
        onClick={save}
        className="flex items-center gap-2 bg-[#e8b84b] text-[#1a1a1a] px-5 py-2.5 rounded-sm text-sm font-semibold hover:bg-[#d4a43e] transition-colors"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <Save className="w-4 h-4" /> Save About Section
      </button>
    </div>
  );
}

// ─── MENU EDITOR ──────────────────────────────────────────────────────────────
function MenuEditor({
  data,
  onChange,
}: {
  data: MenuCategory[];
  onChange: (d: MenuCategory[]) => void;
}) {
  const [categories, setCategories] = useState<MenuCategory[]>(data);
  const [activeCat, setActiveCat] = useState(data[0]?.id ?? "");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const { toast, show } = useToast();

  const active = categories.find((c) => c.id === activeCat);

  const save = () => {
    onChange(categories);
    show("Menu saved!");
  };

  const addCategory = () => {
    const newCat: MenuCategory = {
      id: uid(),
      name: "New Category",
      emoji: "🍽️",
      items: [],
    };
    setCategories([...categories, newCat]);
    setActiveCat(newCat.id);
  };

  const deleteCat = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    setActiveCat(updated[0]?.id ?? "");
  };

  const updateCat = (id: string, patch: Partial<MenuCategory>) => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const addItem = () => {
    if (!active) return;
    const newItem: MenuItem = {
      id: uid(),
      name: "New Item",
      price: 0,
      description: "",
    };
    updateCat(active.id, { items: [...active.items, newItem] });
    setEditingItem(newItem);
  };

  const saveItem = (item: MenuItem) => {
    if (!active) return;
    updateCat(active.id, {
      items: active.items.map((i) => (i.id === item.id ? item : i)),
    });
    setEditingItem(null);
  };

  const deleteItem = (itemId: string) => {
    if (!active) return;
    updateCat(active.id, { items: active.items.filter((i) => i.id !== itemId) });
    if (editingItem?.id === itemId) setEditingItem(null);
  };

  return (
    <div className="space-y-5">
      {toast && <Toast {...toast} />}

      {/* Category tabs row */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCat(cat.id);
              setEditingItem(null);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium border transition-all
              ${activeCat === cat.id
                ? "bg-[#e8b84b] text-[#1a1a1a] border-[#e8b84b]"
                : "bg-[#1a1a1a] text-[#f0e6d3]/60 border-[#e8b84b]/15 hover:border-[#e8b84b]/35"
              }`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
        <button
          onClick={addCategory}
          className="flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs font-medium border border-dashed border-[#e8b84b]/30 text-[#e8b84b]/60 hover:border-[#e8b84b]/60 hover:text-[#e8b84b] transition-all"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <Plus className="w-3 h-3" /> Add Category
        </button>
      </div>

      {active && (
        <div className="bg-[#1a1a1a] border border-[#e8b84b]/10 rounded-sm p-5 space-y-4">
          {/* Category meta */}
          <div className="flex items-center gap-3 pb-4 border-b border-[#e8b84b]/10">
            <input
              className="w-14 bg-[#222] border border-[#e8b84b]/15 rounded-sm px-2 py-2 text-center text-lg focus:outline-none"
              value={active.emoji}
              onChange={(e) => updateCat(active.id, { emoji: e.target.value })}
            />
            <input
              className={`${inputCls} flex-1`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
              value={active.name}
              onChange={(e) => updateCat(active.id, { name: e.target.value })}
              placeholder="Category name"
            />
            <button
              onClick={() => deleteCat(active.id)}
              className="p-2 text-[#c0392b]/60 hover:text-[#c0392b] transition-colors"
              title="Delete category"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Items list */}
          <div className="space-y-2">
            {active.items.map((item) =>
              editingItem?.id === item.id ? (
                <ItemEditForm
                  key={item.id}
                  item={editingItem}
                  onChange={setEditingItem}
                  onSave={() => saveItem(editingItem)}
                  onCancel={() => setEditingItem(null)}
                  onDelete={() => deleteItem(item.id)}
                />
              ) : (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-[#222] border border-[#e8b84b]/8 rounded-sm hover:border-[#e8b84b]/20 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#f0e6d3] truncate" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {item.name}
                      </span>
                      {item.popular && (
                        <span className="text-[10px] text-[#e8b84b] bg-[#e8b84b]/10 px-1.5 py-0.5 rounded-full">Popular</span>
                      )}
                    </div>
                    <p className="text-xs text-[#f0e6d3]/35 truncate" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Rs {item.price.toFixed(2)} · {item.description}
                    </p>
                  </div>
                  <button onClick={() => setEditingItem({ ...item })} className="p-1.5 text-[#f0e6d3]/30 hover:text-[#e8b84b] transition-colors">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="p-1.5 text-[#f0e6d3]/30 hover:text-[#c0392b] transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            )}
          </div>

          <button
            onClick={addItem}
            className="flex items-center gap-1.5 text-xs text-[#e8b84b]/60 hover:text-[#e8b84b] border border-dashed border-[#e8b84b]/20 hover:border-[#e8b84b]/40 rounded-sm px-3 py-2 w-full justify-center transition-all"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <Plus className="w-3.5 h-3.5" /> Add Menu Item
          </button>
        </div>
      )}

      <button
        onClick={save}
        className="flex items-center gap-2 bg-[#e8b84b] text-[#1a1a1a] px-5 py-2.5 rounded-sm text-sm font-semibold hover:bg-[#d4a43e] transition-colors"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <Save className="w-4 h-4" /> Save Menu
      </button>
    </div>
  );
}

function ItemEditForm({
  item,
  onChange,
  onSave,
  onCancel,
  onDelete,
}: {
  item: MenuItem;
  onChange: (i: MenuItem) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange({ ...item, image: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 bg-[#2a2a2a] border border-[#e8b84b]/25 rounded-sm space-y-3">
      {/* Image upload */}
      <div>
        <label className="text-[10px] text-[#f0e6d3]/40 uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Food Photo
        </label>
        <div className="flex gap-3 items-start">
          {/* Preview */}
          <div
            className={`w-24 h-20 rounded-sm border flex-shrink-0 flex items-center justify-center overflow-hidden
              ${item.image ? "border-[#e8b84b]/30" : "border-dashed border-[#f0e6d3]/15 bg-[#1a1a1a]"}`}
          >
            {item.image ? (
              <img src={item.image} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-6 h-6 text-[#f0e6d3]/20" />
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 flex-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 text-xs border border-[#e8b84b]/25 text-[#e8b84b]/70 hover:border-[#e8b84b]/60 hover:text-[#e8b84b] rounded-sm transition-all w-full justify-center"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              {item.image ? "Change Photo" : "Upload Photo"}
            </button>
            {item.image && (
              <button
                type="button"
                onClick={() => onChange({ ...item, image: undefined })}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#c0392b]/20 text-[#c0392b]/60 hover:border-[#c0392b]/40 hover:text-[#c0392b] rounded-sm transition-all w-full justify-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <Trash2 className="w-3 h-3" /> Remove Photo
              </button>
            )}
            <p className="text-[10px] text-[#f0e6d3]/25 leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
              JPG, PNG or WEBP. Recommended 600×400px.
            </p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <div className="h-px bg-[#f0e6d3]/5" />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] text-[#f0e6d3]/40 uppercase tracking-wider mb-1 block" style={{ fontFamily: "'Poppins', sans-serif" }}>Name</label>
          <input
            className={inputCls}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            value={item.name}
            onChange={(e) => onChange({ ...item, name: e.target.value })}
          />
        </div>
        <div>
          <label className="text-[10px] text-[#f0e6d3]/40 uppercase tracking-wider mb-1 block" style={{ fontFamily: "'Poppins', sans-serif" }}>Price (Rs)</label>
          <input
            type="number"
            step="0.5"
            min="0"
            className={inputCls}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            value={item.price}
            onChange={(e) => onChange({ ...item, price: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </div>
      <div>
        <label className="text-[10px] text-[#f0e6d3]/40 uppercase tracking-wider mb-1 block" style={{ fontFamily: "'Poppins', sans-serif" }}>Description</label>
        <textarea
          className={textareaCls + " min-h-[60px]"}
          style={{ fontFamily: "'Poppins', sans-serif" }}
          value={item.description}
          onChange={(e) => onChange({ ...item, description: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!!item.popular}
            onChange={(e) => onChange({ ...item, popular: e.target.checked })}
            className="accent-[#e8b84b]"
          />
          <span className="text-xs text-[#f0e6d3]/50" style={{ fontFamily: "'Poppins', sans-serif" }}>Mark as Popular</span>
        </label>
      </div>
      <div className="flex gap-2 pt-1">
        <button
          onClick={onSave}
          className="flex items-center gap-1.5 bg-[#e8b84b] text-[#1a1a1a] px-3 py-1.5 rounded-sm text-xs font-semibold hover:bg-[#d4a43e] transition-colors"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <Check className="w-3 h-3" /> Save Item
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1.5 text-xs text-[#f0e6d3]/50 border border-[#f0e6d3]/10 rounded-sm hover:border-[#f0e6d3]/25 transition-colors"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Cancel
        </button>
        <button
          onClick={onDelete}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#c0392b]/60 hover:text-[#c0392b] border border-[#c0392b]/15 hover:border-[#c0392b]/40 rounded-sm transition-colors"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <Trash2 className="w-3 h-3" /> Delete
        </button>
      </div>
    </div>
  );
}

// ─── LOCATION EDITOR ──────────────────────────────────────────────────────────
function LocationEditor({
  data,
  hero,
  onChange,
  onHeroChange,
}: {
  data: SiteContent["location"];
  hero: SiteContent["hero"];
  onChange: (d: SiteContent["location"]) => void;
  onHeroChange: (d: SiteContent["hero"]) => void;
}) {
  const [local, setLocal] = useState(data);
  const [localHero, setLocalHero] = useState(hero);
  const { toast, show } = useToast();

  const save = () => {
    onChange(local);
    onHeroChange(localHero);
    show("Location & hours saved!");
  };

  return (
    <div className="space-y-5">
      {toast && <Toast {...toast} />}
      <Field label="Full Address">
        <input
          className={inputCls}
          style={{ fontFamily: "'Poppins', sans-serif" }}
          value={local.address}
          onChange={(e) => setLocal({ ...local, address: e.target.value })}
        />
      </Field>
      <Field label="Phone Number">
        <input
          className={inputCls}
          style={{ fontFamily: "'Poppins', sans-serif" }}
          value={local.phone}
          onChange={(e) => setLocal({ ...local, phone: e.target.value })}
        />
      </Field>
      <Field label="Email Address">
        <input
          type="email"
          className={inputCls}
          style={{ fontFamily: "'Poppins', sans-serif" }}
          value={local.email}
          onChange={(e) => setLocal({ ...local, email: e.target.value })}
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Opening Time">
          <input
            type="time"
            className={inputCls}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            value={localHero.openTime}
            onChange={(e) => setLocalHero({ ...localHero, openTime: e.target.value })}
          />
        </Field>
        <Field label="Closing Time">
          <input
            type="time"
            className={inputCls}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            value={localHero.closeTime}
            onChange={(e) => setLocalHero({ ...localHero, closeTime: e.target.value })}
          />
        </Field>
      </div>
      <button
        onClick={save}
        className="flex items-center gap-2 bg-[#e8b84b] text-[#1a1a1a] px-5 py-2.5 rounded-sm text-sm font-semibold hover:bg-[#d4a43e] transition-colors"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <Save className="w-4 h-4" /> Save Location & Hours
      </button>
    </div>
  );
}

// ─── SOCIAL EDITOR ────────────────────────────────────────────────────────────
function SocialEditor({
  data,
  onChange,
}: {
  data: SiteContent["social"];
  onChange: (d: SiteContent["social"]) => void;
}) {
  const [local, setLocal] = useState(data);
  const { toast, show } = useToast();

  const save = () => {
    onChange(local);
    show("Social links saved!");
  };

  return (
    <div className="space-y-5">
      {toast && <Toast {...toast} />}
      <Field label="Facebook URL">
        <div className="relative">
          <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f0e6d3]/25" />
          <input
            className={inputCls + " pl-9"}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            value={local.facebook}
            onChange={(e) => setLocal({ ...local, facebook: e.target.value })}
            placeholder="https://facebook.com/yourpage"
          />
        </div>
      </Field>
      <Field label="Instagram URL">
        <div className="relative">
          <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f0e6d3]/25" />
          <input
            className={inputCls + " pl-9"}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            value={local.instagram}
            onChange={(e) => setLocal({ ...local, instagram: e.target.value })}
            placeholder="https://instagram.com/yourprofile"
          />
        </div>
      </Field>
      <Field label="TikTok URL">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#f0e6d3]/25">
            <TikTokIcon className="w-4 h-4" />
          </span>
          <input
            className={inputCls + " pl-9"}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            value={local.tiktok}
            onChange={(e) => setLocal({ ...local, tiktok: e.target.value })}
            placeholder="https://tiktok.com/@yourprofile"
          />
        </div>
      </Field>
      <button
        onClick={save}
        className="flex items-center gap-2 bg-[#e8b84b] text-[#1a1a1a] px-5 py-2.5 rounded-sm text-sm font-semibold hover:bg-[#d4a43e] transition-colors"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <Save className="w-4 h-4" /> Save Social Links
      </button>
    </div>
  );
}

// ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────
type AdminSection = "overview" | "hero" | "about" | "menu" | "location" | "social";

function AdminDashboard({
  content,
  onChange,
  onLogout,
  onViewSite,
}: {
  content: SiteContent;
  onChange: (c: SiteContent) => void;
  onLogout: () => void;
  onViewSite: () => void;
}) {
  const [section, setSection] = useState<AdminSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems: { id: AdminSection; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "hero", label: "Hero Section", icon: <ImageIcon className="w-4 h-4" /> },
    { id: "about", label: "About Section", icon: <Info className="w-4 h-4" /> },
    { id: "menu", label: "Menu", icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: "location", label: "Location & Hours", icon: <MapPin className="w-4 h-4" /> },
    { id: "social", label: "Social Links", icon: <Link2 className="w-4 h-4" /> },
  ];

  const sectionTitles: Record<AdminSection, string> = {
    overview: "Dashboard Overview",
    hero: "Edit Hero Section",
    about: "Edit About Section",
    menu: "Manage Menu",
    location: "Location & Contact",
    social: "Social Media Links",
  };

  return (
    <div className="min-h-screen bg-[#151515] flex flex-col">
      {/* Top bar */}
      <header className="bg-[#1a1a1a] border-b border-[#e8b84b]/10 px-5 py-3 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-[#f0e6d3]/60 hover:text-[#f0e6d3] transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <MenuIcon className="w-5 h-5" />
          </button>
          <span
            className="text-base font-bold text-[#e8b84b]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Restro 53
          </span>
          <span className="text-[#f0e6d3]/25 hidden sm:inline text-xs" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Admin Panel
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onViewSite}
            className="flex items-center gap-1.5 text-xs text-[#f0e6d3]/50 hover:text-[#f0e6d3] border border-[#f0e6d3]/10 hover:border-[#f0e6d3]/25 rounded-sm px-3 py-1.5 transition-all"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <Eye className="w-3.5 h-3.5" /> View Site
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs text-[#f0e6d3]/50 hover:text-[#c0392b] border border-[#f0e6d3]/10 hover:border-[#c0392b]/30 rounded-sm px-3 py-1.5 transition-all"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative inset-y-0 left-0 z-20 w-56 bg-[#1f1f1f] border-r border-[#e8b84b]/10 flex flex-col transition-transform duration-200 pt-14 md:pt-0`}
        >
          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-sm text-left transition-all
                  ${
                    section === item.id
                      ? "bg-[#e8b84b]/10 text-[#e8b84b] border border-[#e8b84b]/20"
                      : "text-[#f0e6d3]/50 hover:text-[#f0e6d3] hover:bg-[#2a2a2a] border border-transparent"
                  }`}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-3 border-t border-[#e8b84b]/10">
            <p className="text-[10px] text-[#f0e6d3]/20 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Changes saved to local storage
            </p>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <h2
            className="text-xl font-bold text-[#f0e6d3] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {sectionTitles[section]}
          </h2>

          {section === "overview" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Menu Categories", value: content.menu.length, icon: <UtensilsCrossed className="w-5 h-5" /> },
                {
                  label: "Total Menu Items",
                  value: content.menu.reduce((acc, c) => acc + c.items.length, 0),
                  icon: <Star className="w-5 h-5" />,
                },
                {
                  label: "Opening Hours",
                  value: `${content.hero.openTime}–${content.hero.closeTime}`,
                  icon: <Clock className="w-5 h-5" />,
                },
                { label: "Location", value: content.location.address, icon: <MapPin className="w-5 h-5" /> },
                { label: "Email", value: content.location.email, icon: <Mail className="w-5 h-5" /> },
                { label: "Phone", value: content.location.phone, icon: <Phone className="w-5 h-5" /> },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#222] border border-[#e8b84b]/10 rounded-sm p-5"
                >
                  <div className="flex items-center gap-2 mb-2 text-[#e8b84b]">
                    {stat.icon}
                    <span className="text-xs text-[#f0e6d3]/40 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {stat.label}
                    </span>
                  </div>
                  <p
                    className="text-[#f0e6d3] font-semibold text-lg"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
              <div className="sm:col-span-2 lg:col-span-3 bg-[#222] border border-[#e8b84b]/10 rounded-sm p-5">
                <p className="text-[#f0e6d3]/40 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Select a section from the sidebar to edit content. All changes are saved to your browser and reflected on the public website immediately.
                </p>
              </div>
            </div>
          )}

          {section === "hero" && (
            <HeroEditor
              data={content.hero}
              onChange={(hero) => onChange({ ...content, hero })}
            />
          )}
          {section === "about" && (
            <AboutEditor
              data={content.about}
              onChange={(about) => onChange({ ...content, about })}
            />
          )}
          {section === "menu" && (
            <MenuEditor
              data={content.menu}
              onChange={(menu) => onChange({ ...content, menu })}
            />
          )}
          {section === "location" && (
            <LocationEditor
              data={content.location}
              hero={content.hero}
              onChange={(location) => onChange({ ...content, location })}
              onHeroChange={(hero) => onChange({ ...content, hero })}
            />
          )}
          {section === "social" && (
            <SocialEditor
              data={content.social}
              onChange={(social) => onChange({ ...content, social })}
            />
          )}
        </main>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [content, setContent] = useLocalStorage<SiteContent>("restro53_content_v1", DEFAULT_CONTENT);
  const [view, setView] = useState<"public" | "admin-login" | "admin-dashboard">(() => {
    if (window.location.hash === "#admin") {
      return checkAuth() ? "admin-dashboard" : "admin-login";
    }
    return "public";
  });

  // Sync URL hash with view
  useEffect(() => {
    if (view === "public") {
      window.location.hash = "";
    } else {
      window.location.hash = "admin";
    }
  }, [view]);

  const goToAdmin = () => {
    setView(checkAuth() ? "admin-dashboard" : "admin-login");
  };

  const handleLogin = () => {
    setView("admin-dashboard");
  };

  const handleLogout = () => {
    doLogout();
    setView("public");
    window.scrollTo(0, 0);
  };

  if (view === "admin-login") {
    return (
      <AdminLogin
        onLogin={handleLogin}
        onBack={() => setView("public")}
      />
    );
  }

  if (view === "admin-dashboard") {
    return (
      <AdminDashboard
        content={content}
        onChange={setContent}
        onLogout={handleLogout}
        onViewSite={() => {
          setView("public");
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  return (
    <PublicSite
      content={content}
      onAdminClick={goToAdmin}
    />
  );
}
