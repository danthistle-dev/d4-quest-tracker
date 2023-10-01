import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from './ui/button';
import { useCharacters } from '@/lib/use-characters';
import { useQuests } from '@/lib/use-quests';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle } from 'lucide-react';
import { Character, QuestData } from '@/lib/types';
import questData from '../quest-data.json';

interface UploadQuestDataDialogProps {
    open: boolean;
    onClose: (open: boolean) => void;
}

function UploadQuestDataDialog({ open, onClose }: UploadQuestDataDialogProps) {
    const [data, setData] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const { setCharacters } = useCharacters();
    const { setQuests } = useQuests();

    const onSave = () => {
        try {
            const parsedData: { characters: Character[]; quests: QuestData[] } = JSON.parse(data);

            if (
                parsedData.quests.some(
                    (q) => !parsedData.characters.map((c) => c.id).includes(q.characterId)
                )
            ) {
                throw new Error('Invalid character ID found');
            }

            if (
                parsedData.quests.some(
                    (q) => Number(q.id) < 1 || Number(q.id) > questData.totalQuestCount
                )
            ) {
                throw new Error('Invalid quest ID found');
            }

            setCharacters(parsedData.characters);
            setQuests(parsedData.quests);
            onClose(false);
        } catch (e) {
            console.error(e);
            setError(true);
        }
    };

    return (
        <Dialog onOpenChange={onClose} open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="dark:text-stone-50">Upload Quest Data</DialogTitle>
                    <DialogDescription>
                        Paste JSON file content that has previously been saved here. Warning: This
                        will overwrite any existing data.
                    </DialogDescription>
                </DialogHeader>
                <Textarea
                    className="dark:text-stone-50 font-mono"
                    rows={15}
                    value={data}
                    onChange={(e) => {
                        setData(e.target.value);
                        setError(false);
                    }}
                />
                {error ? (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            You have entered invalid or incompatible JSON. Please try again.
                        </AlertDescription>
                    </Alert>
                ) : null}
                <div className="mt-2 flex justify-end gap-2">
                    <Button onClick={() => onClose(false)} variant="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onSave}>Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default UploadQuestDataDialog;
