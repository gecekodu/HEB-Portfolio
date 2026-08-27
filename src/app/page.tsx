"use client";

import { useEffect, useMemo, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ArrowDownRight, ArrowUp, ChevronDown, Download, ExternalLink, Github, Menu, X } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import portrait from "@/images/me.jpeg";
import kaizenSite from "@/images/my project/kaizen-site.png";
import tsglSite from "@/images/my project/tsgl-site.png";
import nemos1 from "@/images/my project/nemos/nemos1.jpeg";
import nemos2 from "@/images/my project/nemos/nemos2.jpeg";
import nemos3 from "@/images/my project/nemos/nemos3.jpeg";
import nemos4 from "@/images/my project/nemos/nemos4.jpeg";
import sutolsProject from "@/images/my project/sutols/sutols-project.png";
import sutolsSlide from "@/images/my project/sutols/slade.png";
import asdoguSite from "@/images/my project/asdogu-site.png";
import aspirSite from "@/images/my project/aspir-site.png";

type ProjectVisual = { href: string; githubHref?: string; images: StaticImageData[]; layout: "phone" | "browser" };
type PdfView = { src: string; title: string };
type VirtualTour = { src: string };

const projectVisuals: ProjectVisual[] = [
  { href: "https://play.google.com/store/apps/details?id=birdev.nemos", githubHref: "https://github.com/gecekodu/NemosApp", images: [nemos1, nemos2, nemos3, nemos4], layout: "phone" },
  { href: "https://sutols.com", images: [sutolsProject, sutolsSlide], layout: "browser" },
  { href: "https://tsgldernegi.org.tr", images: [tsglSite], layout: "browser" },
  { href: "https://kaizenotel.com", images: [kaizenSite], layout: "browser" },
  { href: "https://web.asdogunakliyat.com/", images: [asdoguSite], layout: "browser" },
  { href: "https://web.aspirpetrol.com/", images: [aspirSite], layout: "browser" },
];

const virtualTours: VirtualTour[] = [
  { src: "https://www.google.com/maps/embed?pb=!4v1787830140802!6m8!1m7!1sCAoSHENJQUJJaENMV1BGd1FjeU9rVHR0VkdYRDlmVjY.!2m2!1d36.59938419160705!2d34.29900636714608!3f18.08757210885071!4f22.93584671303185!5f0.7820865974627469" },
  { src: "https://www.google.com/maps/embed?pb=!4v1787830074575!6m8!1m7!1sCAoSHENJQUJJaEJhYmRoR1R5NHF0UVgzQzgwdndJb0Y.!2m2!1d36.6038972125821!2d34.29931188186994!3f175.88535900305547!4f2.019929445312954!5f0.7820865974627469" },
  { src: "https://www.google.com/maps/embed?pb=!4v1787829928709!6m8!1m7!1sCAoSHENJQUJJaEJaRTNBRE5lYlQ2M3ViUDBpOU5yQk8.!2m2!1d36.41933430821961!2d34.08527870303443!3f154.56!4f-16.239999999999995!5f1.490806565825793" },
  { src: "https://www.google.com/maps/embed?pb=!4v1787829969577!6m8!1m7!1sCAoSHENJQUJJaEQzalJwT0E2TFlNTUNzU0FxZVQ1V0s.!2m2!1d36.60121273397765!2d34.30237264939085!3f140!4f10!5f0.7820865974627469" },
  { src: "https://www.google.com/maps/embed?pb=!4v1787830025876!6m8!1m7!1sCAoSHENJQUJJaEQ1Z2dCb2ZQZkxubFVmdVlQQ3c0eFE.!2m2!1d36.7832520206512!2d34.55808008412003!3f183.44000409486085!4f0.2369265610867899!5f0.7820865974627469" },
];

export default function Home() {
  const { lang, t, setLanguage } = useLanguageStore();
  const [selectedProject, setSelectedProject] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCv, setShowCv] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<PdfView | null>(null);
  const [virtualToursOpen, setVirtualToursOpen] = useState(false);
  const [certificatesOpen, setCertificatesOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => { document.documentElement.lang = lang.toLowerCase(); }, [lang]);
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const project = useMemo(() => ({ ...t.projects.items[selectedProject], visual: projectVisuals[selectedProject] }), [selectedProject, t.projects.items]);
  const closeMenu = () => setMenuOpen(false);

  return <main>
    <header className="site-header">
      <a className="wordmark" href="#top" onClick={closeMenu}>HEB<span>.</span></a>
      <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Ana navigasyon">
        <a href="#about" onClick={closeMenu}>{t.nav.about}</a><a href="#projects" onClick={closeMenu}>{t.nav.work}</a><a href="#profile" onClick={closeMenu}>{t.nav.profile}</a><a href="#certificates" onClick={closeMenu}>{t.nav.certificates}</a><a href="#contact" onClick={closeMenu}>{t.nav.contact}</a>
      </nav>
      <div className="header-actions"><button className="language-toggle" onClick={() => setLanguage(lang === "TR" ? "EN" : "TR")}>{lang}</button><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menüyü aç veya kapat">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
    </header>

    <section className="hero" id="top"><div className="hero-copy"><p className="section-label">{t.hero.name} / 2026</p><h1 className={lang === "TR" ? "hero-title-tr" : undefined}>{t.hero.title.split("\n").map((line, index) => <span key={line} className={index === 1 ? "title-second-line" : undefined}>{line}</span>)}</h1><p>{t.about.text}</p><div className="hero-actions"><a className="button button-dark" href="#projects">{t.nav.work} <ArrowDownRight size={17} /></a><button className="text-action" onClick={() => setShowCv(true)}><Download size={16} /> {t.nav.cv}</button></div></div><div className="hero-portrait"><Image src={portrait} alt="Hasan Emre Bircan" priority quality={100} sizes="(max-width: 760px) 86vw, 34vw" /><span>{t.hero.role}</span></div><a className="scroll-prompt" href="#about">{t.hero.scroll}</a></section>

    <section className="about section" id="about"><div className="about-grid"><h2>{lang === "TR" ? "Fikirleri kullanılabilir dijital deneyimlere dönüştürüyorum." : "I turn ideas into usable digital experiences."}</h2><div><p>{t.about.text}</p><dl className="facts"><div><dt>{lang === "TR" ? "KONUM" : "LOCATION"}</dt><dd>Mersin, TR</dd></div><div><dt>{lang === "TR" ? "ODAK" : "FOCUS"}</dt><dd>{t.hero.role}</dd></div><div><dt>{lang === "TR" ? "EĞİTİM" : "EDUCATION"}</dt><dd>Sivas Cumhuriyet University</dd></div></dl><a className="about-github" href="https://github.com/gecekodu" target="_blank" rel="noreferrer">GITHUB <Github size={16} /></a></div></div></section>

    <section className="projects section" id="projects"><div className="section-heading"><p className="section-label">{t.projects.label}</p><span>{String(selectedProject + 1).padStart(2, "0")} / {String(t.projects.items.length).padStart(2, "0")}</span></div><div className="project-tabs" role="tablist" aria-label={t.projects.label}>{t.projects.items.map((item, index) => <button key={item.title} className={index === selectedProject ? "active" : ""} onClick={() => setSelectedProject(index)}>{item.title}</button>)}</div><article className="project-feature"><div className="project-meta"><p>{project.year} / {project.type}</p><h2>{project.title}</h2><span>{project.description}</span><small>{project.tech}</small><div className="project-links"><a className="button button-light" href={project.visual.href} target="_blank" rel="noreferrer">{t.projects.view} <ExternalLink size={16} /></a>{project.visual.githubHref && <a className="button button-outline" href={project.visual.githubHref} target="_blank" rel="noreferrer">GITHUB <Github size={16} /></a>}</div></div><ProjectPreview project={project.visual} title={project.title} /></article></section>

    <section className="profile section" id="profile"><p className="section-label">{t.profile.label}</p><div className="timeline">{t.profile.items.map((item) => <article key={item.title}><span>{item.year}</span><div><p>{item.type === "education" ? t.profile.education : t.profile.experience}</p><h3>{item.title}</h3><h4>{item.org}</h4><small>{item.text}</small></div></article>)}</div></section>
    <section className="certificates section" id="certificates"><button className="collapsible-heading" type="button" onClick={() => setCertificatesOpen(!certificatesOpen)} aria-expanded={certificatesOpen} aria-controls="certificates-content"><div><p className="section-label">{t.certificates.label}</p><h2>{t.certificates.institution}</h2></div><span className="collapsible-toggle" aria-hidden="true"><ChevronDown size={24} /></span></button>{certificatesOpen && <div id="certificates-content" className="collapsible-content"><p className="section-summary">{t.certificates.summary}</p><div className="certificate-grid">{t.certificates.items.map((item, index) => { const src = `certificates/${encodeURIComponent(item.file)}#view=FitH`; const openCertificate = () => setSelectedCertificate({ src, title: item.title }); return <article className="certificate-card" key={item.file}><div className="certificate-card-header"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong><button onClick={openCertificate} aria-label={`${item.title} büyük aç`}><ExternalLink size={17} /></button></div><div className="certificate-preview"><iframe src={src} title={item.title} loading="lazy" /></div></article>; })}</div></div>}</section>
    <section className="virtual-tours section"><button className="collapsible-heading" type="button" onClick={() => setVirtualToursOpen(!virtualToursOpen)} aria-expanded={virtualToursOpen} aria-controls="virtual-tours-content"><div><p className="section-label">{t.virtualTours.label}</p><h2>{t.virtualTours.title}</h2></div><span className="collapsible-toggle" aria-hidden="true"><ChevronDown size={24} /></span></button>{virtualToursOpen && <div id="virtual-tours-content" className="collapsible-content"><div className="virtual-tours-heading"><p>{t.virtualTours.description}</p></div><div className="tour-grid">{virtualTours.map((tour, index) => <article className="tour-card" key={tour.src}><div className="tour-card-header"><span>{String(index + 1).padStart(2, "0")}</span><strong>{t.virtualTours.itemLabel} {String(index + 1).padStart(2, "0")}</strong></div><iframe src={tour.src} title={`${t.virtualTours.itemLabel} ${index + 1}`} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></article>)}</div></div>}</section>
    <section className="skills section"><p className="section-label">{t.skills.label}</p><h2>{t.skills.title}</h2><ul>{t.skills.items.map((skill, index) => <li key={skill}><span>{String(index + 1).padStart(2, "0")}</span>{skill}</li>)}</ul></section>
    <section className="contact" id="contact"><p className="section-label">{t.nav.contact}</p><h2>{t.closing.title}</h2><a href="mailto:emrebircan33@gmail.com">emrebircan33@gmail.com <ArrowDownRight size={22} /></a><footer>{t.closing.footer}</footer></section>
    <button className={showScrollTop ? "scroll-top visible" : "scroll-top"} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Yukarı çık"><ArrowUp size={19} /></button>
    {showCv && <PdfModal title="CV" src="EmreCV.pdf#view=FitH" onClose={() => setShowCv(false)} />}
    {selectedCertificate && <PdfModal title={selectedCertificate.title} src={selectedCertificate.src} externalHref={selectedCertificate.src} onClose={() => setSelectedCertificate(null)} />}
  </main>;
}

function ProjectPreview({ project, title }: { project: ProjectVisual; title: string }) { if (project.layout === "phone") return <div className="phone-gallery">{project.images.map((image, index) => <figure key={image.src} className={`phone-${index + 1}`}><span className="phone-speaker" /><span className="phone-screen"><Image src={image} alt={`${title} ekranı ${index + 1}`} fill quality={100} sizes="(max-width: 760px) 34vw, 180px" /></span></figure>)}</div>; return <div className="browser-gallery">{project.images.map((image, index) => <figure key={image.src} className={index === 0 ? "main-shot" : "detail-shot"}><Image src={image} alt={`${title} önizleme ${index + 1}`} fill quality={100} sizes="(max-width: 760px) 92vw, 650px" /></figure>)}</div>; }
function PdfModal({ externalHref, onClose, src, title }: { externalHref?: string; onClose: () => void; src: string; title: string }) { return <div className="pdf-modal" role="dialog" aria-modal="true" aria-label={title}><div className="pdf-modal-actions">{externalHref && <a href={externalHref} target="_blank" rel="noreferrer" aria-label={`${title} yeni sekmede aç`}><ExternalLink size={20} /></a>}<button onClick={onClose} aria-label="Kapat"><X size={20} /></button></div><iframe src={src} title={title} /></div>; }
