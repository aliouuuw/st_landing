'use client'

import { useEffect, useState, useRef } from "react";
import { SplineScene } from "@/components/SplineScene";
import { AtmosphericLayers } from "@/components/AtmosphericLayers";
import { Card } from "@/components/ui/card";
import { scrollTo } from "@/lib/lenis";
import { 
  fadeScaleReveal, 
  animateCounter, 
  observeAndAnimate,
  magneticButton,
  typewriterLoop,
  DURATION
} from "@/lib/animations";

export default function Home() {
  useEffect(() => {
    // Initialize scroll-triggered animations with enhanced settings
    observeAndAnimate('.animate-on-scroll', (element) => {
      fadeScaleReveal(element, { 
        duration: DURATION.content,
        stagger: 60,
        direction: 'up'
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    })
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-200 focus:px-6 focus:py-3 focus:bg-blue-500 focus:text-white focus:rounded-full focus:font-semibold"
      >
        Aller au contenu principal
      </a>
      <Navigation />
      <main id="main-content">
      <Hero />
      <ServicesSection />
      <IndustriesSection />
      <MarketOpportunitySection />
      <FeaturesSection />
      <ProcessJourneySection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      </main>
    </div>
  );
}

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (currentScrollY / documentHeight) * 100;
      
      setScrolled(currentScrollY > 24);
      setScrollProgress(Math.min(scrollPercentage, 100));
      
      // Hide/show navigation based on scroll direction
      if (currentScrollY > 200) {
        if (currentScrollY > lastScrollY.current && !hidden) {
          setHidden(true);
        } else if (currentScrollY < lastScrollY.current && hidden) {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hidden]);

  useEffect(() => {
    if (ctaRef.current) {
      const cleanup = magneticButton(ctaRef.current, {
        strength: 0.3,
        radius: 80,
        scale: 1.05,
        glow: true
      });
      return cleanup;
    }
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href, { duration: 1.2 });
  };

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label="Navigation principale"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-nav shadow-lg"
          : "bg-white/40 backdrop-blur-md"
      } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      style={{
        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo with Progress Ring */}
          <a
            href="#accueil"
            onClick={(e) => handleNavClick(e, "#accueil")}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Retour à l'accueil"
          >
            <div className="relative flex h-12 w-12 items-center justify-center">
              {/* Progress Ring */}
              <svg className="absolute inset-0 w-12 h-12 -rotate-90" aria-hidden="true">
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  fill="none"
                  stroke="rgba(96, 165, 250, 0.1)"
                  strokeWidth="2"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 22}`}
                  strokeDashoffset={`${2 * Math.PI * 22 * (1 - scrollProgress / 100)}`}
                  style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="50%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Logo Icon */}
              <div className="relative flex h-10 w-10 rotate-45 items-center justify-center rounded-xl bg-neutral-900 transition-all duration-500 group-hover:rotate-[225deg] group-hover:scale-110 animate-breathe">
                <div className="h-4 w-4 -rotate-45 rounded-md bg-blue-gradient transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <span className="font-display text-2xl font-semibold text-neutral-900 tracking-tight transition-colors duration-300 group-hover:text-blue-600">
              SaiTech
            </span>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[
              { label: "Accueil", href: "#accueil" },
              { label: "Services", href: "#services" },
              { label: "Industries", href: "#industries" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="group relative py-2 text-neutral-600 transition-colors duration-300 hover:text-neutral-900"
              >
                {item.label}
                <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-gradient scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* Elite CTA Button */}
          <a
            ref={ctaRef}
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue-gradient px-6 py-3 text-sm font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:ring-offset-2"
            aria-label="Contacter un expert"
            style={{ willChange: 'transform' }}
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">Planifier un atelier</span>
            <div className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] transition-transform duration-1000 group-hover:translate-x-[200%]" />
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const ctaPrimaryRef = useRef<HTMLAnchorElement>(null);
  const ctaSecondaryRef = useRef<HTMLAnchorElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Typewriter animation with Tron-style flash deletion
    if (typewriterRef.current) {
      const cleanup = typewriterLoop(typewriterRef.current, [
        { text: 'Construisez intelligent.', highlight: 'intelligent' },
        { text: 'Automatisez vite.', highlight: 'vite' }
      ], {
        typingSpeed: 100,
        deletingSpeed: 25,
        pauseDuration: 2500
      });
      
      return cleanup;
    }
  }, []);

  useEffect(() => {
    // Magnetic buttons
    if (ctaPrimaryRef.current) {
      const cleanup1 = magneticButton(ctaPrimaryRef.current, {
        strength: 0.4,
        radius: 100,
        scale: 1.05,
        glow: true
      });
      
      const cleanup2 = ctaSecondaryRef.current ? magneticButton(ctaSecondaryRef.current, {
        strength: 0.3,
        radius: 80,
        scale: 1.02
      }) : () => {};
      
      return () => {
        cleanup1();
        cleanup2();
      };
    }
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center pt-24 pb-20" 
      id="accueil" 
      aria-label="Section héro"
    >
      {/* Elite Atmospheric Layers */}
      <div className="absolute inset-0 bg-hero-mesh" />
      <AtmosphericLayers />
      
      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content - Clean and focused */}
          <div className="relative z-10 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Intelligence accessible
            </div>
            
            {/* Headline with typewriter */}
            <h1 className="font-display heading-xl font-bold text-neutral-900 min-h-[8rem] flex items-center">
              <span ref={typewriterRef} className="inline-block"></span>
            </h1>
            
            {/* Description */}
            <p className="body-lg text-neutral-600 max-w-xl">
              Des systèmes intelligents et des outils d&apos;automatisation conçus pour les entreprises africaines.
              <span className="block mt-2 font-semibold text-neutral-900">Standards mondiaux. Excellence locale.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                ref={ctaPrimaryRef}
                href="#contact"
                className="group relative inline-flex items-center gap-2 bg-blue-gradient text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:ring-offset-2 overflow-hidden"
                style={{ willChange: 'transform' }}
              >
                <span className="relative z-10">Démarrer un projet</span>
                <div className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-45">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] transition-transform duration-1000 group-hover:translate-x-[200%]" />
              </a>
              
              <a
                ref={ctaSecondaryRef}
                href="#services"
                className="group inline-flex items-center gap-2 glass border-2 border-blue-500/20 hover:border-blue-500/40 text-neutral-900 hover:text-blue-600 px-8 py-4 rounded-full font-semibold transition-all duration-300"
                style={{ willChange: 'transform' }}
              >
                <span>Nos services</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right content - 3D Scene */}
          <div className="relative h-[500px] lg:h-[700px]">
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-blue-500/5 rounded-3xl blur-3xl" />
            
            {/* Spline scene */}
            <div 
              className="relative h-full" 
              style={{ 
                filter: 'drop-shadow(0 0 40px rgba(37, 99, 235, 0.12))'
              }}
            >
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Trust Indicators - Floating Orbit Animation */}
        <div className="relative mt-16 pt-12 border-t border-neutral-200/50">
          <p className="text-center text-sm text-neutral-500 mb-8 uppercase tracking-wider">
            Partenaires de confiance
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { name: 'AWS', icon: '☁️' },
              { name: 'OpenAI', icon: '🤖' },
              { name: 'Microsoft', icon: '🪟' },
              { name: 'Google Cloud', icon: '🌐' },
              { name: 'Anthropic', icon: '🧠' }
            ].map((partner, index) => (
              <div
                key={partner.name}
                className="group relative flex flex-col items-center gap-2 cursor-pointer transition-transform duration-500 hover:scale-110"
                style={{
                  animation: `float-soft ${8 + index * 2}s ease-in-out infinite`,
                  animationDelay: `${index * 0.5}s`
                }}
              >
                <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl glass transition-all duration-300 group-hover:shadow-[0_0_32px_rgba(37,99,235,0.2)]">
                  <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
                    {partner.icon}
                  </span>
                  <div className="absolute inset-0 rounded-2xl bg-blue-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                </div>
                <span className="text-xs font-medium text-neutral-600 group-hover:text-blue-600 transition-colors duration-300">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const services = [
    {
      id: "01",
      title: "Stratégie & Conseil IA",
      description: "Évaluez votre maturité IA. Développez des feuilles de route alignées sur vos objectifs. Guidez votre transformation digitale.",
      icon: "🎯",
      details: [
        "Audit de maturité IA et analyse de l'existant",
        "Roadmap stratégique personnalisée",
        "Accompagnement à la transformation digitale"
      ],
      testimonial: "\"Une vision claire pour notre transformation IA\" - CTO, Telecom"
    },
    {
      id: "02",
      title: "Fine-Tuning LLM & RAG",
      description: "Modèles linguistiques personnalisés sur vos données. Pipelines RAG adaptatifs. IA qui évolue avec vos utilisateurs.",
      icon: "🧠",
      details: [
        "Fine-tuning sur vos données métier",
        "Architecture RAG performante",
        "Optimisation continue des modèles"
      ],
      testimonial: "\"Des résultats 10x supérieurs à GPT générique\" - Head of AI, FinTech"
    },
    {
      id: "03",
      title: "Automatisation IA",
      description: "Systèmes agentiques qui exécutent vos workflows. Automatisation des opérations répétitives à l'échelle.",
      icon: "⚡",
      details: [
        "Agents IA autonomes pour workflows",
        "Orchestration multi-étapes",
        "Monitoring et amélioration continue"
      ],
      testimonial: "\"70% de gain de temps sur nos process\" - COO, E-commerce"
    },
    {
      id: "04",
      title: "Solutions IA sur mesure",
      description: "Produits IA propriétaires et intégrations. APIs modulaires et logiciels construits sur nos plateformes internes.",
      icon: "🚀",
      details: [
        "Développement de produits IA custom",
        "APIs et intégrations robustes",
        "Plateformes évolutives et scalables"
      ],
      testimonial: "\"Une solution qui s'adapte parfaitement à notre métier\" - CEO, EdTech"
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="services" aria-labelledby="services-heading">
      {/* Subtle background effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="badge-text text-blue-600 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
            Nos services
          </span>
          <h2 id="services-heading" className="font-display heading-lg font-bold text-neutral-900 mt-6 mb-4">
            Quatre piliers pour votre transformation IA
          </h2>
          <p className="body-lg text-neutral-600 max-w-2xl mx-auto">
            Des services conçus pour rendre l&apos;intelligence artificielle accessible, adaptive et transformative pour votre contexte.
          </p>
        </div>

        {/* Architectural Cards Grid with Perspective */}
        <div 
          className="grid md:grid-cols-2 gap-8"
          style={{
            perspective: '2000px',
            perspectiveOrigin: 'center center'
          }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="animate-on-scroll"
              style={{ 
                animationDelay: `${index * 100}ms`,
                transform: hoveredCard === service.id && hoveredCard !== null
                  ? 'translateZ(20px)'
                  : hoveredCard !== null
                  ? 'scale(0.98) translateZ(-10px)'
                  : 'translateZ(0)',
                transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card
                variant="glass"
                className="relative p-8 overflow-hidden group cursor-pointer"
                style={{
                  boxShadow: hoveredCard === service.id
                    ? '0 32px 80px rgba(96, 165, 250, 0.25), 0 0 0 1px rgba(96, 165, 250, 0.1) inset'
                    : undefined
                }}
                onClick={() => setExpandedCard(expandedCard === service.id ? null : service.id)}
              >
                {/* Service Number Background */}
                <div 
                  className="absolute top-4 right-4 font-display text-9xl font-bold text-neutral-900 opacity-[0.03] pointer-events-none select-none"
                  style={{ lineHeight: 1 }}
                >
                  {service.id}
                </div>

                {/* Multi-layer Glass Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Inner Glow */}
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(96,165,250,0)] group-hover:shadow-[inset_0_0_60px_rgba(96,165,250,0.05)] transition-shadow duration-500" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    {/* 3D Icon Container */}
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:scale-110 transition-transform duration-500">
                      <span className="text-4xl transform group-hover:scale-110 transition-transform duration-500">
                        {service.icon}
                      </span>
                      <div className="absolute inset-0 rounded-2xl bg-blue-gradient opacity-0 group-hover:opacity-10 blur transition-all duration-500" />
                    </div>

                    <div className="flex-1">
                      <span className="badge-text text-blue-600 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                        {service.id}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display heading-md font-semibold text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="body-base text-neutral-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Progressive Disclosure */}
                  <div 
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: expandedCard === service.id ? '400px' : '0',
                      opacity: expandedCard === service.id ? 1 : 0
                    }}
                  >
                    <div className="pt-4 border-t border-neutral-200/50 space-y-3">
                      <p className="text-sm font-semibold text-neutral-900 mb-2">Services inclus:</p>
                      <ul className="space-y-2">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-neutral-600">
                            <span className="text-blue-500 mt-1">✓</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-3 mt-3 border-t border-neutral-200/50">
                        <p className="text-sm italic text-blue-600">
                          {service.testimonial}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expand Indicator */}
                  <button 
                    className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all duration-300"
                    aria-label={expandedCard === service.id ? "Réduire" : "En savoir plus"}
                  >
                    <span>{expandedCard === service.id ? 'Réduire' : 'En savoir plus'}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${expandedCard === service.id ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Hover shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                    style={{
                      animation: 'shimmer 3s ease-in-out infinite',
                    }}
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </section>
  );
};

const IndustriesSection = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('Tous');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const industries = [
    {
      sector: "Éducation",
      category: "Social",
      opportunity: "Apprentissage personnalisé, analytics étudiants",
      solutions: "Tutorat adaptatif, notation automatisée",
      icon: "📚",
      impact: "85% d'amélioration des performances",
      color: "from-blue-500 to-cyan-500"
    },
    {
      sector: "Télécoms",
      category: "Tech",
      opportunity: "Service client, analytics de données",
      solutions: "Modèles prédictifs de churn, chatbots intelligents",
      icon: "📡",
      impact: "60% de réduction du churn",
      color: "from-purple-500 to-pink-500"
    },
    {
      sector: "Marketing & Ventes",
      category: "Business",
      opportunity: "Scoring de leads, optimisation de campagnes",
      solutions: "Insights CRM pilotés par IA",
      icon: "📊",
      impact: "2.5x ROI sur les campagnes",
      color: "from-orange-500 to-red-500"
    },
    {
      sector: "Finance",
      category: "Business",
      opportunity: "Évaluation des risques, détection de fraude",
      solutions: "Scoring de crédit et analyse de portefeuille",
      icon: "💰",
      impact: "95% de précision anti-fraude",
      color: "from-green-500 to-emerald-500"
    },
    {
      sector: "Manufacturing",
      category: "Industrial",
      opportunity: "Optimisation des ressources, maintenance prédictive",
      solutions: "Outils d'automatisation de processus",
      icon: "🏭",
      impact: "40% de coûts opérationnels réduits",
      color: "from-indigo-500 to-blue-500"
    },
    {
      sector: "Service Client",
      category: "Social",
      opportunity: "Bots conversationnels, automatisation logistique",
      solutions: "Agents IA gérant commandes, feedback et routage",
      icon: "🤝",
      impact: "70% d'automatisation des requêtes",
      color: "from-teal-500 to-cyan-500"
    },
  ];

  const filters = ['Tous', 'Social', 'Tech', 'Business', 'Industrial'];

  const filteredIndustries = selectedFilter === 'Tous' 
    ? industries 
    : industries.filter(ind => ind.category === selectedFilter);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const cards = containerRef.current.querySelectorAll('.industry-card');
      const scrolled = window.scrollY;
      const sectionTop = containerRef.current.offsetTop;
      
      cards.forEach((card, index) => {
        const element = card as HTMLElement;
        const speed = 0.05 + (index % 3) * 0.02;
        const offset = (scrolled - sectionTop) * speed;
        element.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" id="industries">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float-soft" />
        <div className="absolute bottom-1/4 right-[15%] w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float-soft" style={{ animationDelay: '2s' }} />
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="badge-text text-blue-600 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
            Industries ciblées
          </span>
          <h2 className="font-display heading-lg font-bold text-neutral-900 mt-6 mb-4">
            Six secteurs prioritaires pour l&apos;Afrique
          </h2>
          <p className="body-lg text-neutral-600 max-w-2xl mx-auto">
            Solutions IA adaptées aux réalités et opportunités des marchés africains.
          </p>
        </div>

        {/* Filter Buttons with Choreography */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-on-scroll">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                selectedFilter === filter
                  ? 'bg-blue-gradient text-white shadow-lg scale-105'
                  : 'glass text-neutral-700 hover:text-blue-600 hover:scale-105'
              }`}
              style={{
                transform: selectedFilter === filter ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {filter}
              {filter !== 'Tous' && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-white/20">
                  {industries.filter(ind => ind.category === filter).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Interactive Industries Grid with Ecosystem Lines */}
        <div className="relative">
          {/* Connection Lines - Abstract Visualization */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20" 
            style={{ zIndex: 0 }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {filteredIndustries.length > 1 && (
              <>
                <line x1="33%" y1="25%" x2="66%" y2="25%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4,4">
                  <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1s" repeatCount="indefinite" />
                </line>
                <line x1="15%" y1="50%" x2="85%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4,4">
                  <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1.2s" repeatCount="indefinite" />
                </line>
                <line x1="33%" y1="75%" x2="66%" y2="75%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4,4">
                  <animate attributeName="stroke-dashoffset" from="0" to="8" dur="0.9s" repeatCount="indefinite" />
                </line>
              </>
            )}
          </svg>

          {/* Grid with Morphing Transitions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {filteredIndustries.map((industry, index) => (
              <div
                key={industry.sector}
                className="industry-card animate-on-scroll"
                style={{ 
                  animationDelay: `${index * 80}ms`,
                  animation: 'fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                  opacity: 0
                }}
              >
                <Card
                  variant="glass"
                  className="relative p-6 overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-500"
                >
                  {/* Gradient Overlay */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Hover Blur Background */}
                  <div className="absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500" />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        {industry.icon}
                      </div>
                      <span className="badge-text text-blue-600 bg-blue-500/10 px-2 py-1 rounded-full text-[0.65rem]">
                        {industry.category}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {industry.sector}
                    </h3>

                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-xs font-semibold text-neutral-900 mb-1">Opportunité</p>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {industry.opportunity}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-semibold text-neutral-900 mb-1">Solutions</p>
                        <p className="text-sm text-blue-600 leading-relaxed">
                          {industry.solutions}
                        </p>
                      </div>
                    </div>

                    {/* Impact Metric */}
                    <div className="pt-3 mt-3 border-t border-neutral-200/50">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-neutral-200/50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${industry.color} group-hover:w-full transition-all duration-1000 w-0`}
                          />
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-neutral-700 mt-2">
                        🎯 {industry.impact}
                      </p>
                    </div>

                    {/* Hover Overlay with Case Study Preview */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-white text-sm font-semibold mb-2">Voir les cas d&apos;usage →</p>
                        <p className="text-white/70 text-xs">Découvrez nos projets dans ce secteur</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* No results state */}
        {filteredIndustries.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-500 text-lg">Aucune industrie ne correspond à ce filtre.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

const MarketOpportunitySection = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const particleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticles = (container: HTMLElement) => {
      const symbols = ['$', '€', '£', '¥', '₹', '₦'];
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute text-blue-500/30 font-bold pointer-events-none';
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.fontSize = `${Math.random() * 20 + 12}px`;
        particle.style.animation = `floatParticle ${3 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`;
        container.appendChild(particle);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            setAnimated(true);
            
            // Animate counters
            const counter18 = document.getElementById('counter-18');
            const counter30 = document.getElementById('counter-30');
            const counter5 = document.getElementById('counter-5');
            
            if (counter18) animateCounter(counter18, 18, { suffix: 'Mds $', duration: 2000 });
            if (counter30) animateCounter(counter30, 30, { suffix: '%', duration: 2000 });
            if (counter5) animateCounter(counter5, 5, { suffix: '%', duration: 2000 });

            // Create particle effects for $18B stat
            if (particleContainerRef.current) {
              createParticles(particleContainerRef.current);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [animated]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Visual Metaphor Background - Flowing Growth Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
          {/* Growth curves */}
          <path 
            d="M0,400 Q250,350 500,250 T1000,100" 
            fill="none" 
            stroke="url(#flowGradient)" 
            strokeWidth="3"
            opacity="0.4"
          >
            <animate attributeName="d" 
              values="M0,400 Q250,350 500,250 T1000,100;
                      M0,380 Q250,330 500,230 T1000,80;
                      M0,400 Q250,350 500,250 T1000,100"
              dur="8s" 
              repeatCount="indefinite" 
            />
          </path>
          <path 
            d="M0,450 Q250,400 500,300 T1000,150" 
            fill="none" 
            stroke="url(#flowGradient)" 
            strokeWidth="2"
            opacity="0.3"
          >
            <animate attributeName="d" 
              values="M0,450 Q250,400 500,300 T1000,150;
                      M0,430 Q250,380 500,280 T1000,130;
                      M0,450 Q250,400 500,300 T1000,150"
              dur="10s" 
              repeatCount="indefinite" 
            />
          </path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="badge-text text-blue-600 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
            Opportunité de marché
          </span>
          <h2 className="font-display heading-lg font-bold text-neutral-900 mt-6 mb-4">
            L&apos;IA en Afrique : un potentiel inexploité
          </h2>
          <p className="body-lg text-neutral-600 max-w-2xl mx-auto">
            Un écosystème en pleine expansion avec des opportunités massives
          </p>
        </div>

        {/* Data Theater - Cinematic Stats */}
        <div ref={statsRef} className="grid md:grid-cols-3 gap-8 mb-16">
          {/* $18B Market - With Particle Effects */}
          <div className="relative">
            <div 
              ref={particleContainerRef}
              className="absolute inset-0 overflow-hidden pointer-events-none" 
              aria-hidden="true"
            />
            <Card variant="glass" className="relative p-10 text-center animate-on-scroll overflow-hidden group hover:scale-105 transition-transform duration-500">
              {/* Radial gradient glow */}
              <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <div className="mb-2 text-sm text-blue-600 font-semibold uppercase tracking-wider">
                  Valeur du marché
                </div>
                <div 
                  id="counter-18" 
                  className="font-display text-6xl font-bold text-blue-gradient mb-3 relative"
                  style={{ 
                    textShadow: '0 0 40px rgba(37, 99, 235, 0.3)',
                    animation: animated ? 'glow 2s ease-in-out infinite' : 'none'
                  }}
                >
                  0Mds $
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Marché IA Africain d&apos;ici 2030
                </p>
                
                {/* Visual bar underneath */}
                <div className="mt-4 h-2 bg-neutral-200/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-gradient"
                    style={{
                      width: animated ? '100%' : '0%',
                      transition: 'width 2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s'
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* 30% CAGR */}
          <Card variant="glass" className="p-10 text-center animate-on-scroll overflow-hidden group hover:scale-105 transition-transform duration-500" style={{ animationDelay: '100ms' }}>
            <div className="relative z-10">
              <div className="mb-2 text-sm text-purple-600 font-semibold uppercase tracking-wider">
                Croissance
              </div>
              <div className="relative inline-block">
                <div 
                  id="counter-30" 
                  className="font-display text-6xl font-bold text-blue-gradient mb-3"
                  style={{ textShadow: '0 0 40px rgba(96, 165, 250, 0.3)' }}
                >
                  0%
                </div>
                {/* Animated arrow */}
                <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                  <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Taux de croissance annuel (CAGR)
              </p>

              {/* Circular progress indicator */}
              <div className="mt-4 flex justify-center">
                <svg className="w-16 h-16 -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                  <circle 
                    cx="32" 
                    cy="32" 
                    r="28" 
                    fill="none" 
                    stroke="url(#progressGradient2)" 
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={animated ? `${2 * Math.PI * 28 * 0.7}` : `${2 * Math.PI * 28}`}
                    style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s' }}
                  />
                  <defs>
                    <linearGradient id="progressGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#A78BFA" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </Card>

          {/* 5% Adoption */}
          <Card variant="glass" className="p-10 text-center animate-on-scroll overflow-hidden group hover:scale-105 transition-transform duration-500" style={{ animationDelay: '200ms' }}>
            <div className="relative z-10">
              <div className="mb-2 text-sm text-orange-600 font-semibold uppercase tracking-wider">
                Opportunité
              </div>
              <div 
                id="counter-5" 
                className="font-display text-6xl font-bold text-blue-gradient mb-3"
                style={{ textShadow: '0 0 40px rgba(167, 139, 250, 0.3)' }}
              >
                0%
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                PME africaines avec IA
              </p>
              
              {/* Gap indicator */}
              <div className="text-xs text-green-600 font-semibold bg-green-50 rounded-full px-3 py-1 inline-block">
                <span className="inline-block mr-1">→</span>
                95% de marché à conquérir
              </div>

              {/* Geometric growth visualization */}
              <div className="mt-4 flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((_, idx) => (
                  <div 
                    key={idx}
                    className="w-2 bg-blue-gradient rounded-full"
                    style={{
                      height: animated ? `${(idx + 1) * 8}px` : '0px',
                      transition: `height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.8 + idx * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Differentiators Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Réalités locales",
              description: "Compréhension profonde des marchés africains et de leurs spécificités.",
              icon: "🌍"
            },
            {
              title: "Opération bilingue",
              description: "Services en français et anglais pour une portée panafricaine.",
              icon: "🗣️"
            },
            {
              title: "Équipe d'ingénieurs",
              description: "Capacité à construire des solutions compétitives mondialement.",
              icon: "👥"
            },
          ].map((item, index) => (
            <Card
              key={item.title}
              variant="glass"
              className="animate-on-scroll p-6 border-l-4 border-blue-500 group hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) rotate(180deg);
            opacity: 0;
          }
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 40px rgba(37, 99, 235, 0.3);
          }
          50% {
            text-shadow: 0 0 60px rgba(37, 99, 235, 0.5);
          }
        }
      `}</style>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      id: "01",
      title: "Automatisations sur mesure",
      description: "Workflows pilotés par l&apos;IA pour la finance, la supply chain et l&apos;expérience client.",
    },
    {
      id: "02",
      title: "Données sécurisées, gouvernées",
      description: "Collecte chiffrée, conformité réglementaire et monitoring continu de la qualité.",
    },
    {
      id: "03",
      title: "Décisions en temps réel",
      description: "Tableaux de bord intelligents, alertes proactives et recommandations actionnables.",
    },
    {
      id: "04",
      title: "Équipe hybride panafricaine",
      description: "Experts IA basés à Dakar, Lagos et Abidjan pour une proximité projet maximale.",
    },
  ];

  return (
    <section className="py-24" id="apropos">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="badge-text text-blue-600 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
            Pourquoi SaiTech
          </span>
          <h2 className="font-display heading-lg font-bold text-neutral-900 mt-6 mb-4">
            Une plateforme d&apos;automatisation conçue pour l&apos;Afrique moderne
          </h2>
          <p className="body-lg text-neutral-600 max-w-2xl mx-auto">
            Nous alignons stratégie, technologie et opérations pour créer des entreprises plus rapides, plus fiables et prêtes à l&apos;échelle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.id}
              variant="glass"
              className="animate-on-scroll p-8 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(96,165,250,0.15)] transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="badge-text text-blue-600 bg-blue-500/10 px-3 py-1 rounded-full">
                {feature.id}
              </span>
              <h3 className="font-display heading-md font-semibold text-neutral-900 mt-6 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="body-base text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessJourneySection = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  
  const steps = [
    {
      number: "01",
      title: "Découverte & Audit",
      description: "Analyse de votre écosystème, identification des opportunités IA et définition des objectifs stratégiques.",
      duration: "1-2 semaines",
      color: "from-blue-500 to-cyan-500",
      icon: "🔍"
    },
    {
      number: "02",
      title: "Stratégie & Architecture",
      description: "Conception de la solution, architecture technique, roadmap détaillée et estimation des ressources.",
      duration: "2-3 semaines",
      color: "from-purple-500 to-pink-500",
      icon: "🏗️"
    },
    {
      number: "03",
      title: "Développement & Training",
      description: "Implémentation de la solution, fine-tuning des modèles, développement des interfaces et intégrations.",
      duration: "4-8 semaines",
      color: "from-orange-500 to-red-500",
      icon: "⚙️"
    },
    {
      number: "04",
      title: "Déploiement & Scale",
      description: "Mise en production, monitoring, optimisation continue et accompagnement pour l'adoption.",
      duration: "2-4 semaines",
      color: "from-green-500 to-emerald-500",
      icon: "🚀"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="processus">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="badge-text text-blue-600 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
            Notre processus
          </span>
          <h2 className="font-display heading-lg font-bold text-neutral-900 mt-6 mb-4">
            Du concept à la production en 4 étapes
          </h2>
          <p className="body-lg text-neutral-600 max-w-2xl mx-auto">
            Une méthodologie éprouvée pour transformer vos idées en solutions IA performantes
          </p>
        </div>

        {/* Curved Timeline Path - SVG */}
        <div className="relative mb-12">
          <svg 
            className="w-full h-32 md:h-24" 
            viewBox="0 0 1000 100" 
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="33%" stopColor="#A78BFA" />
                <stop offset="66%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
            {/* Background path */}
            <path 
              d="M 50 50 Q 300 20, 500 50 T 950 50" 
              fill="none" 
              stroke="#E5E7EB" 
              strokeWidth="3"
            />
            {/* Animated progress path */}
            <path 
              d="M 50 50 Q 300 20, 500 50 T 950 50" 
              fill="none" 
              stroke="url(#pathGradient)" 
              strokeWidth="3"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              className="animate-on-scroll"
              style={{
                animation: 'drawPath 2s ease-out forwards'
              }}
            />
          </svg>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="animate-on-scroll group"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveStep(index)}
            >
              <Card
                variant="glass"
                className={`relative p-6 cursor-pointer transition-all duration-500 ${
                  activeStep === index 
                    ? 'scale-105 shadow-[0_24px_60px_rgba(96,165,250,0.25)]' 
                    : 'hover:scale-102'
                }`}
              >
                {/* Step number background */}
                <div 
                  className="absolute top-3 right-3 font-display text-7xl font-bold opacity-[0.03] pointer-events-none"
                  style={{ lineHeight: 1 }}
                >
                  {step.number}
                </div>

                {/* Gradient accent */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>

                  {/* Step number badge */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-gradient-to-r ${step.color} text-white`}>
                    Étape {step.number}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-semibold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{step.duration}</span>
                  </div>

                  {/* Progress indicator */}
                  {activeStep === index && (
                    <div className="mt-4 pt-4 border-t border-neutral-200/50">
                      <div className="h-1.5 bg-neutral-200/50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${step.color}`}
                          style={{
                            width: '100%',
                            animation: 'fillBar 1s ease-out'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Light beam on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-2xl">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-10 blur-xl`}
                    style={{ animation: 'pulse 2s ease-in-out infinite' }}
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-on-scroll">
          <p className="text-neutral-600 mb-6">
            Prêt à commencer votre transformation IA ?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-blue-gradient text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_24px_50px_rgba(96,165,250,0.3)]"
          >
            <span>Démarrer un projet</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes drawPath {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fillBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }
      `}</style>
    </section>
  );
};

const CaseStudiesSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const cases = [
    {
      id: 1,
      client: "TechCorp Senegal",
      industry: "Télécoms",
      title: "Réduction du churn de 60% avec ML prédictif",
      challenge: "Taux de churn client élevé de 35% annuel",
      solution: "Modèle de prédiction de churn avec interventions proactives",
      results: ["60% réduction du churn", "2.5M$ économisés/an", "92% précision du modèle"],
      image: "📱",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      client: "EduTech Ghana",
      industry: "Éducation",
      title: "Plateforme d'apprentissage adaptatif IA",
      challenge: "Faible engagement et taux d'abandon de 45%",
      solution: "Système de recommandation personnalisé et tuteur IA",
      results: ["85% amélioration engagement", "70% réduction abandon", "50K étudiants actifs"],
      image: "📚",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      client: "FinServe Nigeria",
      industry: "Finance",
      title: "Détection de fraude en temps réel",
      challenge: "Pertes de $500K/mois dues à la fraude",
      solution: "Système de détection anomalies ML + règles métier",
      results: ["95% précision", "$4.8M économisés/an", "<100ms temps réponse"],
      image: "💰",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="cas-etudes">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="badge-text text-blue-600 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
            Cas d&apos;études
          </span>
          <h2 className="font-display heading-lg font-bold text-neutral-900 mt-6 mb-4">
            Des résultats concrets, mesurables
          </h2>
          <p className="body-lg text-neutral-600 max-w-2xl mx-auto">
            Découvrez comment nous avons aidé des entreprises africaines à transformer leurs opérations avec l&apos;IA
          </p>
        </div>

        {/* Horizontal Scroll Gallery */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {cases.map((caseStudy, index) => (
            <Card
              key={caseStudy.id}
              variant="glass"
              className="flex-shrink-0 w-[85vw] md:w-[600px] p-8 snap-center group cursor-pointer hover:shadow-[0_32px_80px_rgba(96,165,250,0.2)] transition-all duration-500"
              onClick={() => setSelectedCase(selectedCase === index ? null : index)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${caseStudy.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-5xl">{caseStudy.image}</span>
                      <div>
                        <h3 className="font-display text-sm text-neutral-600">{caseStudy.client}</h3>
                        <span className="badge-text text-blue-600 bg-blue-500/10 px-2 py-1 rounded-full text-[0.65rem]">
                          {caseStudy.industry}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h4 className="font-display heading-md font-semibold text-neutral-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {caseStudy.title}
                </h4>

                {/* Challenge & Solution */}
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 mb-1">🎯 Défi</p>
                    <p className="text-sm text-neutral-600">{caseStudy.challenge}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 mb-1">💡 Solution</p>
                    <p className="text-sm text-neutral-600">{caseStudy.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="pt-4 border-t border-neutral-200/50">
                  <p className="text-sm font-semibold text-neutral-900 mb-3">📈 Résultats</p>
                  <div className="grid grid-cols-3 gap-3">
                    {caseStudy.results.map((result, idx) => (
                      <div key={idx} className={`p-3 rounded-xl bg-gradient-to-br ${caseStudy.color} text-white text-center`}>
                        <p className="text-xs font-semibold leading-tight">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expand indicator */}
                <button className="mt-6 text-sm font-semibold text-blue-600 flex items-center gap-2 group-hover:gap-3 transition-all">
                  <span>Lire l&apos;étude complète</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Scroll indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {cases.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === 0 ? 'w-8 bg-blue-600' : 'w-2 bg-neutral-300'
              }`}
              onClick={() => {
                const container = scrollContainerRef.current;
                if (container) {
                  const cardWidth = container.offsetWidth * 0.85;
                  container.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
                }
              }}
              aria-label={`Voir le cas d'étude ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "SaiTech a transformé notre approche du service client. Leur solution IA a réduit nos coûts de 40% tout en améliorant la satisfaction client.",
      author: "Amina Diallo",
      role: "CEO, TechCorp Senegal",
      avatar: "👩🏾‍💼",
      rating: 5
    },
    {
      quote: "Une équipe exceptionnelle qui comprend vraiment les défis des entreprises africaines. Résultats au-delà de nos attentes.",
      author: "Kwame Mensah",
      role: "CTO, EduTech Ghana",
      avatar: "👨🏿‍💻",
      rating: 5
    },
    {
      quote: "Le système de détection de fraude développé par SaiTech nous a fait économiser des millions. ROI atteint en moins de 6 mois.",
      author: "Ngozi Okonkwo",
      role: "Head of Risk, FinServe Nigeria",
      avatar: "👩🏿‍💼",
      rating: 5
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="badge-text text-blue-600 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
            Témoignages
          </span>
          <h2 className="font-display heading-lg font-bold text-neutral-900 mt-6 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="body-lg text-neutral-600 max-w-2xl mx-auto">
            La confiance de leaders technologiques à travers l&apos;Afrique
          </p>
        </div>

        {/* Floating Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="animate-on-scroll"
              style={{ 
                animationDelay: `${index * 150}ms`,
                animation: `float-soft ${8 + index}s ease-in-out infinite`
              }}
            >
              <Card
                variant="glass"
                className="p-8 hover:-translate-y-2 hover:shadow-[0_32px_70px_rgba(96,165,250,0.15)] transition-all duration-500 group"
              >
                {/* Quote icon */}
                <div className="text-5xl text-blue-500/20 mb-4">&ldquo;</div>

                {/* Quote text */}
                <p className="text-neutral-700 leading-relaxed mb-6 italic">
                  {testimonial.quote}
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-200/50">
                  <div className="w-12 h-12 rounded-full bg-blue-gradient flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{testimonial.author}</p>
                    <p className="text-sm text-neutral-600">{testimonial.role}</p>
                  </div>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-blue-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section className="py-24 bg-white" id="contact">
      <div className="max-w-5xl mx-auto px-6">
        <Card
          variant="glass"
          className="animate-on-scroll p-12 border-2 border-blue-500/20"
        >
          <div className="text-center mb-8">
            <span className="badge-text text-blue-600 bg-blue-500/10 px-4 py-2 rounded-full">
              Parlons impact
            </span>
            <h2 className="font-display heading-lg font-bold text-neutral-900 mt-6 mb-4">
              Prêt à automatiser votre prochaine étape de croissance ?
            </h2>
            <p className="body-lg text-neutral-600 max-w-2xl mx-auto">
              Réservez une session avec nos architectes pour cartographier vos opportunités IA et lancer un pilote en quelques semaines.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:contact@saitech.africa"
              className="inline-flex items-center gap-3 glass-card px-6 py-3 text-neutral-900 hover:text-blue-600 transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              contact@saitech.africa
            </a>
            <a
              href="tel:+221000000000"
              className="inline-flex items-center gap-3 glass-card px-6 py-3 text-neutral-900 hover:text-blue-600 transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              +221 00 000 00 00
            </a>
          </div>

          <div className="mt-8 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-blue-gradient text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_24px_45px_rgba(96,165,250,0.35)]"
            >
              Planifier un atelier
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">→</span>
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
};

const Footer = () => {
  const particleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create subtle particle drift effect
    if (particleContainerRef.current) {
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-blue-500/10 rounded-full';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `particleDrift ${15 + Math.random() * 10}s ease-in-out ${Math.random() * 5}s infinite`;
        particleContainerRef.current.appendChild(particle);
      }
    }
  }, []);

  const footerLinks = {
    company: [
      { label: 'À propos', href: '#apropos' },
      { label: 'Services', href: '#services' },
      { label: 'Processus', href: '#processus' },
      { label: 'Contact', href: '#contact' }
    ],
    resources: [
      { label: 'Cas d\'études', href: '#cas-etudes' },
      { label: 'Industries', href: '#industries' },
      { label: 'Blog', href: '#' },
      { label: 'Documentation', href: '#' }
    ],
    legal: [
      { label: 'Confidentialité', href: '#' },
      { label: 'Conditions', href: '#' },
      { label: 'Cookies', href: '#' },
      { label: 'Mentions légales', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'GitHub', icon: '⚡', href: '#' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-neutral-50 to-white pt-24 pb-12 overflow-hidden">
      {/* Particle drift background */}
      <div 
        ref={particleContainerRef}
        className="absolute inset-0 pointer-events-none" 
        aria-hidden="true"
      />

      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6 group">
              <div className="relative flex h-10 w-10 items-center justify-center">
                <div className="relative flex h-10 w-10 rotate-45 items-center justify-center rounded-xl bg-neutral-900 transition-all duration-500 group-hover:rotate-[225deg]">
                  <div className="h-4 w-4 -rotate-45 rounded-md bg-blue-gradient" />
                </div>
              </div>
              <span className="font-display text-2xl font-semibold text-neutral-900">
                SaiTech
              </span>
            </div>

            <p className="text-neutral-600 mb-6 leading-relaxed max-w-sm">
              Transformez votre entreprise avec des solutions IA adaptées aux réalités africaines. Excellence mondiale, impact local.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-neutral-900">
                Newsletter IA & Insights
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-1 px-4 py-2 rounded-full glass border border-neutral-200 focus:border-blue-500 focus:outline-none text-sm transition-all"
                  aria-label="Email pour newsletter"
                />
                <button className="px-6 py-2 bg-blue-gradient text-white rounded-full font-semibold text-sm hover:scale-105 transition-transform">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Entreprise</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-600 hover:text-blue-600 transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-blue-600 transition-all duration-300" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Ressources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-600 hover:text-blue-600 transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-blue-600 transition-all duration-300" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Légal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-600 hover:text-blue-600 transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-blue-600 transition-all duration-300" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-sm text-neutral-600">
              © {new Date().getFullYear()} SaiTech. Tous droits réservés.{' '}
              <span className="text-neutral-400">•</span>{' '}
              <span className="text-blue-600">Made with ❤️ in Africa</span>
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex items-center justify-center w-10 h-10 rounded-full glass hover:shadow-lg transition-all duration-300 hover:scale-110 group"
                  aria-label={social.name}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Easter Egg - Hidden message */}
          <div className="mt-8 text-center">
            <p className="text-xs text-neutral-400 hover:text-blue-600 transition-colors cursor-help" title="Konami Code: ↑↑↓↓←→←→BA">
              Built with passion • Powered by AI • Designed for Africa 🌍
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes particleDrift {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translate(50px, -80px);
            opacity: 0;
          }
        }
      `}</style>
    </footer>
  );
};
