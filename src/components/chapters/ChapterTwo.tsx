
"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ChapterTwo.module.css";

const basePath = (
  process.env.NEXT_PUBLIC_BASE_PATH || ""
).replace(/\/+$/, "");

const products = [
  {
    name: "NOCTURNE",
    image: "nocturne.png",
    notes: "FIG · IRIS · MUSK",
  },
  {
    name: "SOLENNE",
    image: "solenne.png",
    notes: "BERGAMOT · CEDAR · AMBER",
  },
  {
    name: "VEIL",
    image: "veil.png",
    notes: "VANILLA · SUEDE · INCENSE",
  },
];

function Perfume({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <Image
      src={`${basePath}/assets/images/fragrances/${name}.png`}
      alt={`VEYRA ${name.toUpperCase()} perfume`}
      width={1122}
      height={1402}
      sizes="(max-width: 600px) 65vw, 340px"
      className={className}
      unoptimized
      draggable={false}
    />
  );
}

export default function ChapterTwo() {
  const rootRef = useRef<HTMLElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const darkCopyRef = useRef<HTMLDivElement>(null);
  const cardMotionRef = useRef<HTMLDivElement>(null);
  const pinkRef = useRef<HTMLDivElement>(null);
  const pinkCopyRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const phoneMotionRef = useRef<HTMLDivElement>(null);
  const whiteMotionRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const dark = darkRef.current;
    const darkCopy = darkCopyRef.current;
    const cardMotion = cardMotionRef.current;
    const pink = pinkRef.current;
    const pinkCopy = pinkCopyRef.current;
    const numbers = numbersRef.current;
    const phoneMotion = phoneMotionRef.current;
    const whiteMotion = whiteMotionRef.current;
    const finalScene = finalRef.current;

    if (
      !root ||
      !dark ||
      !darkCopy ||
      !cardMotion ||
      !pink ||
      !pinkCopy ||
      !numbers ||
      !phoneMotion ||
      !whiteMotion ||
      !finalScene
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      gsap.set(dark, { autoAlpha: 1 });
      gsap.set(darkCopy, { y: 0, autoAlpha: 1 });
      gsap.set(cardMotion, { x: 0, y: 0, rotation: 5, scale: 1, autoAlpha: 1 });
      gsap.set(pink, { autoAlpha: 0 });
      gsap.set(phoneMotion, { y: 0, rotation: 0, scale: 1, autoAlpha: 0 });
      gsap.set(whiteMotion, { yPercent: 0, rotation: 0, scale: 1, autoAlpha: 0 });
      gsap.set(finalScene, { autoAlpha: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(dark, { autoAlpha: 0 });
      gsap.set(darkCopy, { y: 42, autoAlpha: 0 });
      gsap.set(cardMotion, {
        x: 95,
        y: 190,
        rotation: -15,
        scale: 0.82,
        autoAlpha: 0,
        transformOrigin: "50% 100%",
      });
      gsap.set(pink, {
        clipPath: "circle(0% at 54% 53%)",
      });

      gsap.set(pinkCopy, {
        y: 45,
        autoAlpha: 0,
      });

      gsap.set(numbers, {
        x: 100,
        autoAlpha: 0,
      });

      gsap.set(phoneMotion, {
        y: 150,
        rotation: -9,
        scale: 0.88,
        autoAlpha: 0,
      });

      gsap.set(whiteMotion, {
        yPercent: 115,
        rotation: 7,
        scale: 0.94,
        transformOrigin: "50% 100%",
      });

      gsap.set(finalScene, {
        autoAlpha: 0,
      });

      gsap.set(
        `.${styles.finalCopy}, .${styles.finalBottle}`,
        {
          y: 65,
          autoAlpha: 0,
        }
      );

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });

      // 0–1.35: The next chapter emerges over the Hero.
      tl.to(dark, { autoAlpha: 1, duration: 1.05, ease: "power2.out" }, 0)
        .to(
          darkCopy,
          { y: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out" },
          0.18
        )
        // 1.35–2.05: Hold the settled dark composition.
        .to({}, { duration: 0.7 }, 1.35)
        // 2.05–3.55: Card rises from below after the hold.
        .to(
          cardMotion,
          {
            x: 0,
            y: 0,
            rotation: 5,
            scale: 1,
            autoAlpha: 1,
            duration: 1.35,
            ease: "power3.out",
          },
          2.05
        )
        .to(
          cardMotion,
          {
            x: -75,
            y: -75,
            rotation: -8,
            duration: 1.1,
            ease: "sine.inOut",
          },
          3.35
        )
        // 3.75–5.35: Pink organic reveal.
        .to(
          pink,
          {
            clipPath: "circle(155% at 54% 53%)",
            duration: 1.6,
            ease: "power2.inOut",
          },
          3.75
        )
        .to(
          dark,
          { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" },
          4.75
        )
        .to(
          pinkCopy,
          { y: 0, autoAlpha: 1, duration: 0.9, ease: "power2.out" },
          4.55
        )
        .to(
          numbers,
          { x: 0, autoAlpha: 1, duration: 1.1, ease: "power2.out" },
          4.7
        )
        // 5.1–6.8: Phone enters fully, then settles into place.
        .to(
          phoneMotion,
          {
            y: 0,
            rotation: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 1.45,
            ease: "power3.out",
          },
          5.1
        )
        .to(numbers, { x: -90, duration: 2.1, ease: "sine.inOut" }, 5.45)
        .to(
          phoneMotion,
          { y: -12, rotation: 2, duration: 0.8, ease: "sine.inOut" },
          6.45
        )
        // 6.9–8.45: White editorial sheet covers the pink scene.
        .to(
          whiteMotion,
          {
            yPercent: 0,
            rotation: 0,
            scale: 1,
            duration: 1.5,
            ease: "power3.inOut",
          },
          6.9
        )
        .to({}, { duration: 0.72 }, 8.45)
        // 8.45–10.05: Final pink scene is revealed behind the sheet.
        .set(finalScene, { autoAlpha: 1 }, 8.45)
        .to(
          "." + styles.finalCopy,
          { y: 0, autoAlpha: 1, duration: 1.05, ease: "power2.out" },
          8.48
        )
        .to(
          "." + styles.finalBottle,
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.12,
            duration: 1.15,
            ease: "power2.out",
          },
          8.48
        )
        .to(
          whiteMotion,
          {
            yPercent: -120,
            rotation: -7,
            scale: 0.95,
            duration: 1.6,
            ease: "power3.inOut",
          },
          8.52
        )
        .to({}, { duration: 0.95 }, 10.12);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="collection"
      className={styles.chapter}
      aria-label="VEYRA fragrance story"
    >
      <div className={styles.sticky}>
        {/* 01 — BLACK STORY */}

        <div ref={darkRef} className={styles.darkScene}>
          <div className={styles.sceneMeta}>
            <span>VEYRA / 002</span>
            <span>THE UNSEEN</span>
          </div>

          <div ref={darkCopyRef} className={styles.darkCopy}>
            <p className={styles.eyebrow}>
              BEYOND THE ORDINARY
            </p>

            <h2 className={styles.darkHeading}>
              <span>SOME THINGS</span>
              <span>ARE FELT</span>
              <span>BEFORE THEY&apos;RE SEEN.</span>
            </h2>

            <p className={styles.darkDescription}>
              A fragrance that speaks before you do.
            </p>
          </div>

          <div className={styles.cardSlot}>
            <div
              ref={cardMotionRef}
              className={styles.cardMotion}
            >
              <div className={styles.invitation}>
                <div className={styles.cardTop}>
                  <span>MAISON VEYRA</span>
                  <span>001 / 006</span>
                </div>

                <Perfume
                  name="nocturne"
                  className={styles.cardImage}
                />

                <div className={styles.cardBottom}>
                  <span>THE FIRST IMPRESSION</span>
                  <strong>NOCTURNE</strong>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.darkFooter}>
            01 / THE STORY
          </div>
        </div>

        {/* 02 — PINK LAUNCH */}

        <div ref={pinkRef} className={styles.pinkScene}>
          <div className={styles.sceneMeta}>
            <span>VEYRA / FRAGRANCE HOUSE</span>
            <span>COLLECTION 001</span>
          </div>

          <div
            ref={pinkCopyRef}
            className={styles.pinkCopy}
          >
            <h2 className={styles.pinkHeading}>
              <span>THE NEXT CHAPTER</span>
              <span>IS COMING.</span>
            </h2>
          </div>

          <div
            ref={numbersRef}
            className={styles.giantNumbers}
            aria-hidden="true"
          >
            48 : 00 : 00
          </div>

          <div className={styles.phoneSlot}>
            <div
              ref={phoneMotionRef}
              className={styles.phoneMotion}
            >
              <div className={styles.phone}>
                <div className={styles.phoneScreen}>
                  <div className={styles.island} />

                  <div className={styles.phoneTop}>
                    <strong>VEYRA</strong>
                    <span>✳</span>
                  </div>

                  <div className={styles.phoneKicker}>
                    THE SCENT EDITION
                  </div>

                  <div className={styles.phoneImageArea}>
                    <Perfume
                      name="solenne"
                      className={styles.phoneProduct}
                    />
                  </div>

                  <div className={styles.phoneInfo}>
                    <small>EAU DE PARFUM</small>
                    <strong>SOLENNE</strong>
                    <span>THE RADIANT ONE</span>
                  </div>

                  <div className={styles.phoneButton}>
                    DISCOVER THE SCENT ↗
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className={styles.pinkFooter}>
            <span>SIX SCENTS. SIX STORIES.</span>
            <span>AN INVITATION TO DISCOVER</span>
          </footer>
        </div>

        {/* 03 — FINAL PINK UNDER THE WHITE SHEET */}

        <div ref={finalRef} className={styles.finalScene}>
          <div className={styles.sceneMeta}>
            <span>VEYRA / 003</span>
            <span>THE EXPERIENCE</span>
          </div>

          <div className={styles.finalCopy}>
            <p>NOT JUST A SCENT.</p>
            <h2>
              <span>A FEELING</span>
              <span>THAT STAYS.</span>
            </h2>
          </div>

          <div className={styles.finalProducts}>
            <div className={`${styles.finalBottle} ${styles.finalLeft}`}>
              <Perfume
                name="veil"
                className={styles.finalImage}
              />
            </div>

            <div className={`${styles.finalBottle} ${styles.finalRight}`}>
              <Perfume
                name="afterglow"
                className={styles.finalImage}
              />
            </div>
          </div>

          <footer className={styles.finalFooter}>
            <span>THE ART OF BEING UNFORGETTABLE</span>
            <span>CONTINUE THE JOURNEY ↓</span>
          </footer>
        </div>

        {/* 04 — WHITE EDITORIAL SHEET */}

        <div className={styles.whiteSlot}>
          <div
            ref={whiteMotionRef}
            className={styles.whiteMotion}
          >
            <div className={styles.whitePanel}>
              <div className={styles.whiteMeta}>
                <span>THE FRAGRANCE ARCHIVE</span>
                <span>VEYRA / 2026</span>
              </div>

              <div className={styles.whiteContent}>
                <p className={styles.whiteKicker}>
                  THE VEYRA COLLECTION
                </p>

                <h2>
                  <span>EVERY SCENT</span>
                  <span>TELLS A STORY.</span>
                </h2>

                <p className={styles.whiteDescription}>
                  Three expressions from the VEYRA
                  fragrance universe.
                </p>

                <div className={styles.fragranceList}>
                  {products.map((product, index) => (
                    <div
                      key={product.name}
                      className={styles.fragranceRow}
                    >
                      <span className={styles.rowNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <strong>{product.name}</strong>

                      <Perfume
                        name={product.image.replace(".png", "")}
                        className={styles.rowImage}
                      />

                      <span className={styles.rowNotes}>
                        {product.notes}
                      </span>

                      <span className={styles.rowArrow}>
                        ↗
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <footer className={styles.whiteFooter}>
                AN OLFACTORY JOURNEY — VEYRA
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
