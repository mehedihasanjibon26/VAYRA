
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/hero/Hero";
import styles from "./BookIntro.module.css";

export default function BookIntro() {
  const rootRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const book = bookRef.current;
    const cover = coverRef.current;
    const portal = portalRef.current;
    const frame = frameRef.current;
    const meta = metaRef.current;
    const hint = hintRef.current;

    if (
      !root ||
      !book ||
      !cover ||
      !portal ||
      !frame ||
      !meta ||
      !hint
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const context = gsap.context(() => {
      const getPageBounds = () => {
        const rect = frame.getBoundingClientRect();
        const parent = root
          .querySelector(`.${styles.sticky}`)
          ?.getBoundingClientRect();

        return {
          x: rect.left - (parent?.left ?? 0),
          y: rect.top - (parent?.top ?? 0),
          scaleX: rect.width / window.innerWidth,
          scaleY: rect.height / window.innerHeight,
        };
      };

      if (reduceMotion) {
        gsap.set(portal, {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
        });
        gsap.set([book, meta, hint], {
          autoAlpha: 0,
        });
        return;
      }

      gsap.set(portal, {
        ...getPageBounds(),
        transformOrigin: "top left",
        force3D: true,
      });

      gsap.set(cover, {
        rotationY: 0,
        transformOrigin: "0% 50%",
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          hint,
          {
            autoAlpha: 0,
            y: -20,
            duration: 0.12,
          },
          0
        )
        .to(
          cover,
          {
            rotationY: -165,
            duration: 0.44,
            ease: "power2.inOut",
          },
          0.07
        )
        .to(
          meta,
          {
            autoAlpha: 0,
            duration: 0.2,
          },
          0.38
        )
        .fromTo(
          portal,
          {
            x: () => getPageBounds().x,
            y: () => getPageBounds().y,
            scaleX: () => getPageBounds().scaleX,
            scaleY: () => getPageBounds().scaleY,
          },
          {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 0.47,
            ease: "power3.inOut",
            immediateRender: false,
          },
          0.48
        )
        .to(
          book,
          {
            autoAlpha: 0,
            duration: 0.18,
          },
          0.55
        )
        .to(
          root,
          {
            backgroundColor: "#09080b",
            duration: 0.37,
          },
          0.5
        );

      const refresh = () => ScrollTrigger.refresh();

      window.addEventListener("resize", refresh);

      return () => {
        window.removeEventListener("resize", refresh);
      };
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className={styles.intro}
      data-veyra-intro
      aria-label="VEYRA cinematic opening"
    >
      <div className={styles.sticky}>
        <div ref={metaRef} className={styles.meta}>
          <div className={styles.topMeta}>
            <span>MAISON VEYRA</span>
            <span>AN OLFACTORY STORY</span>
          </div>

          <div className={styles.bottomMeta}>
            <span>EST. 2026</span>
            <span>THE ART OF BEING UNFORGETTABLE</span>
          </div>
        </div>

        <div ref={bookRef} className={styles.book}>
          <div className={styles.bookShadow} />

          <div
            ref={frameRef}
            className={styles.bookPage}
          />

          <div ref={coverRef} className={styles.cover}>
            <div className={styles.coverContent}>
              <span className={styles.rule} />
              <span className={styles.coverKicker}>
                MAISON VEYRA
              </span>

              <strong className={styles.coverBrand}>
                VEYRA
              </strong>

              <span className={styles.coverEdition}>
                FRAGRANCE EDITION / 001
              </span>
              <span className={styles.rule} />
            </div>
          </div>

          <div className={styles.spine} />
        </div>

        {/* The only actual Hero on the entire page.
            Initially scaled to fit the book's page,
            then expanded to fill the viewport. */}
        <div
          ref={portalRef}
          className={styles.heroPortal}
        >
          <Hero embedded />
        </div>

        <div
          ref={hintRef}
          className={styles.scrollHint}
        >
          SCROLL TO OPEN <span>↓</span>
        </div>
      </div>
    </section>
  );
}
