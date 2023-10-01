import { Checkbox } from '@/components/ui/checkbox';
import { Region } from '@/lib/types';
import questData from '../quest-data.json';
import { useStore } from '../store';
import { useQuests } from '@/lib/use-quests';
import QuestCounter from './quest-counter';

interface QuestListProps {
    region?: Region;
    search?: string;
}

function QuestList({ region, search }: QuestListProps) {
    const character = useStore((state) => state.selectedCharacter);
    const quests = region
        ? questData.quests.filter((quest) => region.id === quest.regionId)
        : questData.quests;

    const { completedQuests, toggleQuestCompletion, getCompletedQuestCount } = useQuests(character);

    const isQuestCompleted = (id: string) => {
        return completedQuests.findIndex((q) => Number(q.id) === Number(id)) !== -1;
    };

    const filteredQuests = quests.filter((quest) => {
        if (!search) return true;
        return quest.name.toLowerCase().includes(search.toLowerCase());
    });

    const getTotalCount = () => {
        if (region) {
            const regionData = questData.regions.find((r) => r.id === region.id);
            if (!regionData) return 0;
            return regionData.questCount;
        }
        return questData.totalQuestCount;
    };

    return (
        <div className="flex justify-between">
            <div className="grid gap-1 xs:grid-cols-2 sm:grid-cols-3">
                {filteredQuests.map((quest) => (
                    <QuestItem
                        key={quest.id}
                        name={quest.name}
                        completed={isQuestCompleted(String(quest.id))}
                        onClick={() => toggleQuestCompletion(String(quest.id), character)}
                    />
                ))}
            </div>
            <QuestCounter count={getCompletedQuestCount(region?.id)} total={getTotalCount()} />
        </div>
    );
}

interface QuestItemProps {
    name: string;
    completed: boolean;
    onClick?: () => void;
}

function QuestItem({ name, completed, onClick }: QuestItemProps) {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox id={name} checked={completed} onClick={onClick} className="w-10 h-10" />
            <label htmlFor={name} className="text-sm font-medium leading-none dark:text-stone-50">
                {name}
            </label>
        </div>
    );
}

export default QuestList;
