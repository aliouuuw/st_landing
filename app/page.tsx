'use client'

import { useEffect, useState, useRef } from "react";
import { SplineScene } from "@/components/SplineScene";
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
      <ContactSection />
      </main>
    </div>
  );
}

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      role="navigation"
      aria-label="Navigation principale"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-nav shadow-lg"
          : "bg-white/40 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#accueil"
            onClick={(e) => handleNavClick(e, "#accueil")}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Retour à l'accueil"
          >
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="relative flex h-10 w-10 rotate-45 items-center justify-center rounded-xl bg-neutral-900 transition-all duration-500 group-hover:rotate-[225deg] group-hover:scale-110">
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
      {/* Simple atmospheric background */}
      <div className="absolute inset-0 bg-hero-mesh" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
      
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
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    {
      id: "01",
      title: "Stratégie & Conseil IA",
      description: "Évaluez votre maturité IA. Développez des feuilles de route alignées sur vos objectifs. Guidez votre transformation digitale.",
      icon: "🎯",
    },
    {
      id: "02",
      title: "Fine-Tuning LLM & RAG",
      description: "Modèles linguistiques personnalisés sur vos données. Pipelines RAG adaptatifs. IA qui évolue avec vos utilisateurs.",
      icon: "🧠",
    },
    {
      id: "03",
      title: "Automatisation IA",
      description: "Systèmes agentiques qui exécutent vos workflows. Automatisation des opérations répétitives à l'échelle.",
      icon: "⚡",
    },
    {
      id: "04",
      title: "Solutions IA sur mesure",
      description: "Produits IA propriétaires et intégrations. APIs modulaires et logiciels construits sur nos plateformes internes.",
      icon: "🚀",
    },
  ];

  return (
    <section className="py-24 bg-white" id="services" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-6">
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

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.id}
              variant="glass"
              className="animate-on-scroll p-8 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(96,165,250,0.15)] transition-all duration-300 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{service.icon}</span>
                <div className="flex-1">
                  <span className="badge-text text-blue-600 bg-blue-500/10 px-3 py-1 rounded-full">
                    {service.id}
                  </span>
                  <h3 className="font-display heading-md font-semibold text-neutral-900 mt-4 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="body-base text-neutral-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const IndustriesSection = () => {
  const industries = [
    {
      sector: "Éducation",
      opportunity: "Apprentissage personnalisé, analytics étudiants",
      solutions: "Tutorat adaptatif, notation automatisée",
      icon: "📚",
    },
    {
      sector: "Télécoms",
      opportunity: "Service client, analytics de données",
      solutions: "Modèles prédictifs de churn, chatbots intelligents",
      icon: "📡",
    },
    {
      sector: "Marketing & Ventes",
      opportunity: "Scoring de leads, optimisation de campagnes",
      solutions: "Insights CRM pilotés par IA",
      icon: "📊",
    },
    {
      sector: "Finance",
      opportunity: "Évaluation des risques, détection de fraude",
      solutions: "Scoring de crédit et analyse de portefeuille",
      icon: "💰",
    },
    {
      sector: "Manufacturing",
      opportunity: "Optimisation des ressources, maintenance prédictive",
      solutions: "Outils d'automatisation de processus",
      icon: "🏭",
    },
    {
      sector: "Service Client",
      opportunity: "Bots conversationnels, automatisation logistique",
      solutions: "Agents IA gérant commandes, feedback et routage",
      icon: "🤝",
    },
  ];

  return (
    <section className="py-24" id="industries">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <Card
              key={industry.sector}
              variant="glass"
              className="animate-on-scroll p-6 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(96,165,250,0.12)] transition-all duration-300 group"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="text-3xl mb-4">{industry.icon}</div>
              <h3 className="font-display text-xl font-semibold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors">
                {industry.sector}
              </h3>
              <p className="text-sm text-neutral-600 mb-3 leading-relaxed">
                <span className="font-semibold text-neutral-900">Opportunité:</span> {industry.opportunity}
              </p>
              <p className="text-sm text-blue-600 leading-relaxed">
                {industry.solutions}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const MarketOpportunitySection = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="badge-text text-blue-600 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
            Opportunité de marché
          </span>
          <h2 className="font-display heading-lg font-bold text-neutral-900 mt-6 mb-4">
            L&apos;IA en Afrique : un potentiel inexploité
          </h2>
        </div>

        <div ref={statsRef} className="grid md:grid-cols-3 gap-8 mb-16">
          <Card variant="glass" className="p-8 text-center animate-on-scroll">
            <div id="counter-18" className="font-display text-5xl font-bold text-blue-gradient mb-3">
              0Mds $
            </div>
            <p className="text-sm text-neutral-600 uppercase tracking-wide">
              Marché IA Africain d&apos;ici 2030
            </p>
          </Card>
          
          <Card variant="glass" className="p-8 text-center animate-on-scroll" style={{ animationDelay: '100ms' }}>
            <div id="counter-30" className="font-display text-5xl font-bold text-blue-gradient mb-3">
              0%
            </div>
            <p className="text-sm text-neutral-600 uppercase tracking-wide">
              Croissance annuelle (CAGR)
            </p>
          </Card>
          
          <Card variant="glass" className="p-8 text-center animate-on-scroll" style={{ animationDelay: '200ms' }}>
            <div id="counter-5" className="font-display text-5xl font-bold text-blue-gradient mb-3">
              0%
            </div>
            <p className="text-sm text-neutral-600 uppercase tracking-wide">
              PME africaines avec IA
            </p>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Réalités locales",
              description: "Compréhension profonde des marchés africains et de leurs spécificités.",
            },
            {
              title: "Opération bilingue",
              description: "Services en français et anglais pour une portée panafricaine.",
            },
            {
              title: "Équipe d'ingénieurs",
              description: "Capacité à construire des solutions compétitives mondialement.",
            },
          ].map((item, index) => (
            <Card
              key={item.title}
              variant="glass"
              className="animate-on-scroll p-6 border-l-4 border-blue-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="font-display text-lg font-semibold text-neutral-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
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
