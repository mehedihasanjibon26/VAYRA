
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Hero from "@/components/hero/Hero";
import styles from "./Preloader.module.css";

const BRAND = "VEYRA";

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewContentRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    const scene = sceneRef.current;
    const book = bookRef.current;
    const cover = coverRef.current;
    const pages = pagesRef.current;
    const preview = previewRef.current;
    const previewContent = previewContentRef.current;

    if (
      !root ||
      !scene ||
      !book ||
      !cover ||
      !pages ||
      !preview ||
      !previewContent
    ) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;

    const original = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      htmlTouch: html.style.touchAction,
      bodyTouch: body.style.touchAction,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.touchAction = "none";
    body.style.touchAction = "none";

    let completed = false;
    let restored = false;

    const restoreScroll = () => {
      if (restored) return;
      restored = true;

      html.style.overflow = original.htmlOverflow;
      body.style.overflow = original.bodyOverflow;
      html.style.touchAction = original.htmlTouch;
      body.style.touchAction = original.bodyTouch;
    };

    const finish = () => {
      if (completed) return;
      completed = true;

      restoreScroll();
      setIsVisible(false);

      window.dispatchEvent(
        new Event("veyra:preloader-complete")
      );
    };

    const context = gsap.context(() => {
      if (
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
      ) {
        gsap.set(root, { autoAlpha: 0 });
        finish();
        return;
      }

      const details = gsap.utils.toArray<HTMLElement>(
        `.${styles.coverDetail}`,
        root
      );

      const leaves = gsap.utils.toArray<HTMLElement>(
        `.${styles.pageLeaf}`,
        root
      );

      gsap.set(book, {
        rotationX: 7,
        rotationY: -1,
        y: 16,
        scale: 0.94,
      });

      gsap.set(cover, {
        rotationY: 0,
        transformOrigin: "0% 50%",
      });

      gsap.set(pages, {
        rotationY: 0,
      });

      gsap.set(details, {
        autoAlpha: 0,
        y: 10,
      });

      gsap.set(leaves, {
        rotationY: 0,
        transformOrigin: "0% 50%",
      });

      gsap.set(preview, {
        autoAlpha: 0,
        pointerEvents: "none",
      });

      const placePreviewOnPage = () => {
        const rect = pages.getBoundingClientRect();

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        gsap.set(preview, {
          x: 0,
          y: 0,
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        });

        gsap.set(previewContent, {
          width: viewportWidth,
          height: viewportHeight,
          scaleX: rect.width / viewportWidth,
          scaleY: rect.height / viewportHeight,
          transformOrigin: "top left",
        });
      };

      const syncPreviewScale = () => {
        const width = preview.getBoundingClientRect().width;
        const height = preview.getBoundingClientRect().height;

        gsap.set(previewContent, {
          scaleX: width / window.innerWidth,
          scaleY: height / window.innerHeight,
        });
      };

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.inOut",
        },
        onComplete: finish,
      });

      timeline
        .to(book, {
          y: 0,
          scale: 1,
          rotationX: 4,
          duration: 0.85,
          ease: "power3.out",
        })

        .to(
          details,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.07,
            ease: "power2.out",
          },
          "-=0.35"
        )

        .to(
          scene,
          {
            scale: 1.035,
            duration: 1.3,
            ease: "sine.inOut",
          },
          "<"
        )

        .to(
          cover,
          {
            rotationY: -154,
            duration: 1.65,
            ease: "power4.inOut",
          },
          "<0.8"
        )

        .to(
          leaves,
          {
            rotationY: (index) => -7 - index * 5,
            duration: 1.1,
            stagger: 0.065,
            ease: "power3.inOut",
          },
          "<0.2"
        )

        .to(
          book,
          {
            rotationX: 0,
            rotationY: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.55"
        )

        .call(placePreviewOnPage)

        .to(preview, {
          autoAlpha: 1,
          duration: 0.45,
          ease: "power2.out",
        })

        .to(
          `.${styles.pageLeaf}, .${styles.pageBlock}`,
          {
            autoAlpha: 0,
            duration: 0.2,
          },
          "<"
        )

        .to({}, { duration: 0.35 })

        .to(
          preview,
          {
            left: 0,
            top: 0,
            width: () => window.innerWidth,
            height: () => window.innerHeight,
            duration: 1.65,
            ease: "expo.inOut",
            onUpdate: syncPreviewScale,
          },
          "expand"
        )

        .to(
          scene,
          {
            scale: 1.4,
            opacity: 0,
            duration: 1.25,
            ease: "power3.inOut",
          },
          "expand"
        )

        .to(
          root,
          {
            backgroundColor: "#09080b",
            duration: 1.3,
          },
          "expand"
        )

        .to(
          `.${styles.meta}`,
          {
            autoAlpha: 0,
            duration: 0.45,
          },
          "expand"
        )

        .to(root, {
          autoAlpha: 0,
          duration: 0.12,
          ease: "none",
        });
    }, root);

    return () => {
      context.revert();
      restoreScroll();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={rootRef}
      className={styles.preloader}
      role="status"
      aria-label="VEYRA is opening"
      aria-live="polite"
    >
      <div
        ref={sceneRef}
        className={styles.scene}
        aria-hidden="true"
      >
        <div ref={bookRef} className={styles.book}>
          <div className={styles.bookShadow} />
          <div className={styles.backCover} />

          <div ref={pagesRef} className={styles.pages}>
            <div className={styles.pageBlock} />

            <div
              className={`${styles.pageLeaf} ${styles.leafOne}`}
            />
            <div
              className={`${styles.pageLeaf} ${styles.leafTwo}`}
            />
            <div
              className={`${styles.pageLeaf} ${styles.leafThree}`}
            />

            <div className={styles.innerTitle}>
              <span>VEYRA</span>
              <small>PARFUM · 001</small>
            </div>
          </div>

          <div ref={coverRef} className={styles.frontCover}>
            <span
              className={`${styles.coverDetail} ${styles.coverRule}`}
            />

            <span
              className={`${styles.coverDetail} ${styles.coverKicker}`}
            >
              MAISON VEYRA
            </span>

            <span
              className={`${styles.coverDetail} ${styles.coverBrand}`}
            >
              {BRAND}
            </span>

            <span
              className={`${styles.coverDetail} ${styles.coverEdition}`}
            >
              FRAGRANCE / 001
            </span>

            <span
              className={`${styles.coverDetail} ${styles.coverRuleBottom}`}
            />
          </div>

          <div className={styles.spine} />
        </div>
      </div>

      <div
        ref={previewRef}
        className={styles.heroPreview}
        aria-hidden="true"
      >
        <div
          ref={previewContentRef}
          className={styles.heroPreviewContent}
        >
          <Hero />
        </div>
      </div>

      <div className={styles.meta} aria-hidden="true">
        <span>AN OLFACTORY STUDY</span>
        <span>EST. 2026</span>
      </div>

      <div className={styles.grain} aria-hidden="true" />
    </div>
  );
}
