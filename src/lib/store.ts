import { create } from 'zustand';
type SiteState = { menuOpen:boolean; setMenuOpen:(menuOpen:boolean)=>void };
export const useSiteStore = create<SiteState>((set) => ({ menuOpen:false, setMenuOpen:(menuOpen) => set({ menuOpen }) }));
