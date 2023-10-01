import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Store {
    selectedCharacter: string | null;
    selectedRegion: string;
    setSelectedCharacter: (id: string | null) => void;
    setSelectedRegion: (id: string) => void;
}

export const useStore = create(
    persist<Store>(
        (set) => ({
            selectedCharacter: null,
            selectedRegion: '1',
            setSelectedCharacter: (id) => set({ selectedCharacter: id }),
            setSelectedRegion: (id) => set({ selectedRegion: id }),
        }),
        { name: 'character-store' }
    )
);
