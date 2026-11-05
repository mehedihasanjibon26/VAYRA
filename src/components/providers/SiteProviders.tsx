'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function SiteProviders({ children }: Readonly<{ children: React.ReactNode }>) { const lenisRef = useRef<Lenis | null>(null); useEffect(() => { const lenis = new Lenis({ autoRaf:false, smoothWheel:true }); lenisRef.current = lenis; const onFrame = (time:number) => lenis.raf(time * 1000); gsap.ticker.add(onFrame); gsap.ticker.lagSmoothing(0); lenis.on('scroll', ScrollTrigger.update); return () => { lenis.off('scroll', ScrollTrigger.update); gsap.ticker.remove(onFrame); lenis.destroy(); lenisRef.current = null; }; }, []); return children; }
