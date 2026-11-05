'use client';
import { Canvas } from '@react-three/fiber';
export function Scene() { return <Canvas frameloop="demand" dpr={[1,2]} camera={{ position:[0,0,5], fov:35 }} />; }
