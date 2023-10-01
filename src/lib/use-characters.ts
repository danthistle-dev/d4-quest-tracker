import { useLocalStorage } from 'usehooks-ts';
import { Character } from './types';
import { useQuests } from './use-quests';
import { useStore } from '@/store';

export function useCharacters() {
    const [characters, setCharacters] = useLocalStorage<Character[]>('characters', []);
    const { removeCharacterQuests } = useQuests();
    const setSelectedCharacter = useStore((state) => state.setSelectedCharacter);

    function removeCharacter(id: string) {
        const newCharacters = characters.filter((character) => character.id !== id);
        setCharacters(newCharacters);
        removeCharacterQuests(id);
        setSelectedCharacter(null);
    }

    return {
        characters,
        setCharacters,
        removeCharacter,
    };
}
