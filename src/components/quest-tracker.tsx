import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import questData from '../quest-data.json';
import { Input } from './ui/input';
import { useState } from 'react';
import QuestList from './quest-list';
import QuestCounter from './quest-counter';
import { useQuests } from '@/lib/use-quests';
import { useStore } from '@/store';

function QuestTracker() {
    const { selectedCharacter, selectedRegion, setSelectedRegion } = useStore((state) => state);
    const [search, setSearch] = useState<string>('');
    const regions = questData.regions;
    const { getCompletedQuestCount } = useQuests(selectedCharacter);

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <section className="mt-5">
            <section className="flex items-center justify-between mb-2">
                <div className="grid w-full max-w-sm items-center mr-2">
                    <Input
                        className="dark:text-stone-50"
                        type="text"
                        id="name"
                        placeholder="Search quests..."
                        value={search}
                        onChange={onSearch}
                    />
                </div>
                <QuestCounter count={getCompletedQuestCount()} total={questData.totalQuestCount} />
            </section>
            <Tabs value={selectedRegion}>
                <TabsList className="w-full overflow-x-auto h-fit">
                    <TabsTrigger
                        value="all"
                        className="flex-1"
                        onClick={() => setSelectedRegion('all')}
                    >
                        All
                    </TabsTrigger>
                    {regions.map((region) => (
                        <TabsTrigger
                            key={region.id}
                            value={String(region.id)}
                            onClick={() => setSelectedRegion(String(region.id))}
                            className="flex-1"
                        >
                            {region.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="all">
                    <QuestList search={search} />
                </TabsContent>
                {regions.map((region) => (
                    <TabsContent key={region.id} value={String(region.id)}>
                        <QuestList region={region} search={search} />
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    );
}

export default QuestTracker;
