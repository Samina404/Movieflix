import { create } from "zustand";

interface UIState {
    isMobileMenuOpen: boolean;
    searchQuery: string;
    setMobileMenuOpen: (isOpen: boolean) => void;
    setSearchQuery: (query: string) => void;
    closeMobileMenu: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isMobileMenuOpen: false,
    searchQuery: "",
    setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));
