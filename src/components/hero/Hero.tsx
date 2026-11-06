
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

type HeroProps = {
  embedded?: boolean;
};

const perfumes = [
  {
    name: "NOCTURNE",
    file: "nocturne.png",
    notes: "FIG · IRIS · MUSK",
  },
  {
    name: "SOLENNE",
    file: "solenne.png",
    notes: "BERGAMOT · CEDAR · AMBER",
  },
  {
    name: "VEIL",
    file: "veil.png",
    notes: "VANILLA · SUEDE · INCENSE",
  },
  {
    name: "AFTERGLOW",
    file: "afterglow.png",
    notes: "ROSE · SAFFRON · MOSS",
  },
  {
    name: "OBSCURA",
    file: "obscura.png",
    notes: "PLUM · OUD · BLACK TEA",
  },
  {
    name: "MUSE",
    file: "muse.png",
    notes: "NEROLI · LINEN · WHITE WOODS",
  },
];

const basePath = (
  process.env.NEXT_PUBLIC_BASE_PATH || ""
).replace(/\/+$/, "");

export default function Hero({
  embedded = false,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const hoveredRef = useRef<number | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const title = titleRef.current;

    if (!section || !frame || !title) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const items = itemsRef.current.filter(Boolean);

    if (reduced) {
      items.forEach((item, index) => {
        const angle =
          (index / perfumes.length) * Math.PI * 2 -
          Math.PI / 2;

        gsap.set(item, {
          x: Math.cos(angle) * frame.clientWidth * 0.32,
          y: Math.sin(angle) * frame.clientHeight * 0.28,
          scale: 0.9,
        });
      });
      return;
    }

    let angle = 0;
    let progress = 0;
    let lastTime = 0;

    const render = (time: number) => {
      const delta =
        lastTime === 0
          ? 0
          : Math.min(time - lastTime, 0.05);

      lastTime = time;

      if (hoveredRef.current === null) {
        angle += delta * 0.105;
      }

      const w = frame.clientWidth;
      const h = frame.clientHeight;
      const mobile = w < 650;

      const radiusX =
        w * (mobile ? 0.36 : 0.34) *
        (1 + progress * 0.23);

      const radiusY =
        h * (mobile ? 0.29 : 0.3) *
        (1 + progress * 0.17);

      items.forEach((item, index) => {
        const a =
          angle +
          (index * Math.PI * 2) / perfumes.length -
          Math.PI / 2;

        const depth = (Math.sin(a) + 1) / 2;
        const selected = hoveredRef.current === index;
        const scale =
          (0.73 + depth * 0.39) *
          (selected ? 1.2 : 1);

        gsap.set(item, {
          x: Math.cos(a) * radiusX,
          y:
            Math.sin(a) * radiusY +
            Math.sin(time * 0.8 + index) * 8,
          scale,
          rotation: Math.cos(a) * 8,
          opacity:
            hoveredRef.current !== null && !selected
              ? 0.7
              : 1,
          zIndex: selected
            ? 35
            : Math.round(depth * 18 + 2),
          force3D: true,
        });
      });
    };

    const context = gsap.context(() => {
      const scrollElement = embedded
        ? section.closest<HTMLElement>("[data-veyra-intro]")
        : section;

      if (scrollElement) {
        ScrollTrigger.create({
          trigger: scrollElement,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            progress = embedded
              ? Math.max(0, (self.progress - 0.6) / 0.4)
              : self.progress;
          },
        });
      }

      gsap.ticker.add(render);
    }, section);

    return () => {
      gsap.ticker.remove(render);
      context.revert();
    };
  }, [embedded]);

  const handleHover = (index: number | null) => {
    hoveredRef.current = index;
    setActive(index);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`${styles.hero} ${
        embedded ? styles.embedded : ""
      }`}
    >
      <div ref={frameRef} className={styles.frame}>
        <div className={styles.ambient} />
        <div className={styles.grain} />

        <header className={styles.navigation}>
          <a className={styles.logo} href="#hero">
            VEYRA
          </a>

          <nav
            className={styles.navLinks}
            aria-label="Main navigation"
          >
            <a href="#hero">COLLECTION</a>
            <a href="#hero">THE HOUSE</a>
          </nav>

          <a className={styles.navCta} href="#hero">
            EXPLORE THE HOUSE ↗
          </a>
        </header>

        <div className={styles.orbit}>
          {perfumes.map((perfume, index) => (
            <div
              key={perfume.name}
              ref={(node) => {
                if (node) itemsRef.current[index] = node;
              }}
              className={styles.orbitItem}
              onPointerEnter={() => handleHover(index)}
              onPointerLeave={() => handleHover(null)}
            >
              <Image
                src={`${basePath}/assets/images/fragrances/${perfume.file}`}
                alt={`VEYRA ${perfume.name} perfume`}
                width={1122}
                height={1402}
                sizes="(max-width: 600px) 40vw, 20vw"
                className={styles.productImage}
                priority={index < 2}
                unoptimized
                draggable={false}
              />
            </div>
          ))}
        </div>

        <div className={styles.content}>
          <p className={styles.kicker}>
            MAISON VEYRA — THE FRAGRANCE HOUSE
          </p>

          <h1 ref={titleRef} className={styles.title}>
            <span>BECOME</span>
            <span>UNFORGETTABLE</span>
          </h1>

          <p className={styles.subtitle}>
            SIX SCENTS. INFINITE WAYS TO BE YOU.
          </p>

          <a href="#hero" className={styles.discover}>
            DISCOVER VEYRA ↗
          </a>
        </div>

        {active !== null && (
          <div className={styles.activeLabel}>
            <span>
              FRAGRANCE {String(active + 1).padStart(2, "0")}
            </span>
            <strong>{perfumes[active].name}</strong>
            <small>{perfumes[active].notes}</small>
          </div>
        )}

        <footer className={styles.footer}>
          <span>MAISON VEYRA / EST. 2026</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </footer>
      </div>
    </section>
  );
}
