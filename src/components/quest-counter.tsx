import { Progress } from './ui/progress';

interface QuestCounterProps {
    count: number;
    total: number;
}

function QuestCounter({ count, total }: QuestCounterProps) {
    const percentage = Math.round((count / total) * 100);

    return (
        <div className="flex flex-col gap-1 w-24">
            <div className="flex items-center justify-between gap-5">
                <span className="text-sm font-medium leading-none dark:text-stone-50">
                    {count}/{total}
                </span>
                <span className="text-sm font-medium leading-none dark:text-stone-50">
                    {percentage}%
                </span>
            </div>
            <Progress value={percentage} className="bg-stone-200" />
        </div>
    );
}

export default QuestCounter;
