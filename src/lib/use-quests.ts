import { useLocalStorage } from 'usehooks-ts';
import { QuestData } from './types';
import questData from '../quest-data.json';

export function useQuests(characterId?: string | null) {
    const [quests, setQuests] = useLocalStorage<QuestData[]>('quests', []);

    function toggleQuestCompletion(questId: string | null, characterId: string | null): void {
        if (!questId || !characterId) return;
        const questIndex = quests.findIndex(
            (quest) => quest.id === questId && quest.characterId === characterId
        );

        if (questIndex !== -1) {
            quests.splice(questIndex, 1);
            setQuests(quests);
        } else {
            const newQuest: QuestData = { id: questId, characterId };
            setQuests([...quests, newQuest]);
        }
    }

    const removeCharacterQuests = (characterId: string): void => {
        const newQuests = quests.filter((quest) => quest.characterId !== characterId);
        setQuests(newQuests);
    };

    const completedQuests = characterId
        ? quests.filter((quest) => quest.characterId === characterId)
        : [];

    const getCompletedQuestCount = (regionId?: number): number => {
        if (!regionId) return completedQuests.length;
        const regionQuests = questData.quests.filter((quest) => quest.regionId === regionId);
        return regionQuests.filter((quest) =>
            completedQuests.some((c) => Number(c.id) === quest.id)
        ).length;
    };

    return {
        completedQuests,
        setQuests,
        getCompletedQuestCount,
        removeCharacterQuests,
        toggleQuestCompletion,
    };
}
