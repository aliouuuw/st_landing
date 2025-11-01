'use client'

import { useEffect, useState } from "react";

import { SplineScene } from "@/components/SplineScene";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans overflow-x-hidden">
      <Navigation />
      <Hero />
      <SecondSection />
      <FeaturesSection />
    </div>
  );
}

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-neutral-200/60"
          : "bg-white/75 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#accueil"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative flex h-10 w-10 items-center justify-center">
              <span className="absolute inset-0 rounded-xl bg-blue-500/20 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex h-10 w-10 rotate-45 items-center justify-center rounded-2xl bg-neutral-900 transition-transform duration-500 group-hover:-rotate-45">
                <div className="h-4 w-4 -rotate-45 rounded-md bg-blue-500 transition-transform duration-500 group-hover:scale-110" />
              </div>
            </div>
            <span className="font-display text-2xl font-semibold text-neutral-900 tracking-tight">
              SaiTech
            </span>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            {[
              { label: "Accueil", href: "#accueil" },
              { label: "Solutions", href: "#solutions" },
              { label: "À propos", href: "#apropos" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative text-neutral-600 transition-colors duration-300 hover:text-neutral-900"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_18px_35px_rgba(37,99,235,0.35)] focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:ring-offset-2"
          >
            <span className="relative z-10">Parler à un expert</span>
            <span className="absolute inset-0 translate-y-full bg-blue-600 transition-transform duration-300 group-hover:translate-y-0" />
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative" id="accueil">
      <Card className="mx-6 mt-6 bg-neutral-950 border-0 rounded-3xl overflow-hidden">
        <div className="relative min-h-[600px] lg:min-h-[700px]">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="grid lg:grid-cols-2 gap-8 items-center h-full">
            {/* Left content */}
            <div className="p-8 lg:p-16 relative z-10 flex flex-col justify-center">
              <div className="inline-block mb-6">
                <span className="text-blue-400 text-sm font-semibold tracking-wide uppercase bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                  Automatisation intelligente
                </span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Construisez intelligent.
                <br />
                Automatisez vite.
                <br />
                <span className="text-blue-400">Accélérez l&apos;Afrique.</span>
              </h1>
              
              <p className="text-lg text-neutral-400 max-w-xl mb-8 leading-relaxed">
                Des systèmes intelligents et des outils d&apos;automatisation conçus pour les entreprises africaines. 
                Standards mondiaux. Excellence locale.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105"
                >
                  Démarrer un projet
                </a>
                <a
                  href="#solutions"
                  className="border-2 border-neutral-700 hover:border-neutral-500 text-white px-8 py-4 rounded-full font-semibold transition-all hover:bg-neutral-900"
                >
                  Nos solutions
                </a>
              </div>
            </div>

            {/* Right content - 3D Scene */}
            <div className="relative h-[400px] lg:h-[700px]">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

const SecondSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24" id="solutions">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left - Visual */}
        <div className="relative order-2 lg:order-1">
          <Card className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-[32px] border border-blue-500/20 bg-linear-to-br from-blue-500 via-blue-600 to-blue-700 p-14 shadow-[0_30px_80px_rgba(30,64,175,0.35)]">
            <div className="absolute inset-6 rounded-[26px] border border-white/15" />
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="h-full w-full"
            />
            <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-[36px] bg-neutral-900 shadow-[0_30px_70px_rgba(15,23,42,0.45)]" />
          </Card>
          <div className="absolute -top-8 -left-6 h-24 w-24 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md animate-float-soft" />
        </div>

        {/* Right - Content */}
        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
            Vision stratégique
            <span className="h-1 w-1 rounded-full bg-neutral-500" />
            Delivery
          </span>

          <h2 className="mt-6 font-display text-4xl md:text-5xl font-semibold leading-tight text-neutral-900">
            Automatisation IA conçue pour la croissance
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            Nous concevons des plateformes intelligentes qui apprennent de vos processus et orchestrent vos opérations critiques.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">
            Des modèles entraînés sur des données africaines réelles pour des décisions fiables, conformes et rapides.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">
            Déployez en quelques semaines. Gardez la gouvernance. Mesurez chaque impact.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-neutral-500">
            {[
              "Temps réel multi-filiales",
              "Sécurité certifiée",
              "Support 24/7 basé à Dakar",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { value: "100+", label: "déploiements exécutés" },
              { value: "12", label: "pays accompagnés" },
              { value: "4.8/5", label: "score de confiance" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm shadow-blue-500/5"
              >
                <div className="font-display text-3xl font-semibold text-neutral-900">
                  {item.value}
                </div>
                <p className="mt-2 text-sm uppercase tracking-[0.25em] text-neutral-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-neutral-900 bg-neutral-900 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800"
          >
            Découvrir nos cas clients
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/80 text-[11px]">→</span>
          </a>
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
      description:
        "Workflows pilotés par l&apos;IA pour la finance, la supply chain et l&apos;expérience client.",
    },
    {
      id: "02",
      title: "Données sécurisées, gouvernées",
      description:
        "Collecte chiffrée, conformité réglementaire et monitoring continu de la qualité.",
    },
    {
      id: "03",
      title: "Décisions en temps réel",
      description:
        "Tableaux de bord intelligents, alertes proactives et recommandations actionnables.",
    },
    {
      id: "04",
      title: "Équipe hybride panafricaine",
      description:
        "Experts IA basés à Dakar, Lagos et Abidjan pour une proximité projet maximale.",
    },
  ];

  return (
    <section className="bg-white py-24" id="apropos">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-500">
            Pourquoi SaiTech
          </span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-semibold leading-tight text-neutral-900">
            Une plateforme d&apos;automatisation conçue pour l&apos;Afrique moderne
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">
            Nous alignons stratégie, technologie et opérations pour créer des entreprises plus rapides, plus fiables et prêtes à l&apos;échelle.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white/80 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/60 hover:shadow-[0_28px_60px_rgba(30,64,175,0.15)]"
            >
              <span className="inline-flex items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500">
                {feature.id}
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-neutral-900">
                {feature.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                {feature.description}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Détails du programme
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-blue-500/50">→</span>
              </div>
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Card>
          ))}
        </div>

        <div
          id="contact"
          className="mt-20 overflow-hidden rounded-[32px] border border-neutral-200 bg-neutral-900 px-8 py-12 text-white shadow-[0_24px_60px_rgba(15,23,42,0.25)]"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-300">
                Parlons impact
              </span>
              <h3 className="mt-4 font-display text-3xl md:text-4xl font-semibold">
                Prêt à automatiser votre prochaine étape de croissance ?
              </h3>
              <p className="mt-3 max-w-xl text-sm md:text-base text-neutral-300">
                Réservez une session avec nos architectes pour cartographier vos opportunités IA et lancer un pilote en quelques semaines.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm text-neutral-300">
              <a
                href="mailto:contact@saitech.africa"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 transition-all duration-300 hover:border-blue-400 hover:text-blue-200"
              >
                <span className="inline-flex h-2 w-2 rounded-full bg-blue-500" />
                contact@saitech.africa
              </a>
              <a
                href="tel:+221000000000"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 transition-all duration-300 hover:border-blue-400 hover:text-blue-200"
              >
                <span className="inline-flex h-2 w-2 rounded-full bg-blue-500" />
                +221 00 000 00 00
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_45px_rgba(37,99,235,0.35)]"
              >
                Planifier un atelier
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};