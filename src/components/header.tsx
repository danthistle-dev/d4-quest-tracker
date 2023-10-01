import { downloadJson } from '@/lib/utils';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { Download, Upload } from 'lucide-react';
import UploadQuestDataDialog from './upload-quest-data-dialog';
import { useState } from 'react';

function Header() {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const onClose = (open: boolean) => {
        setDialogOpen(open);
    };

    const generateJson = () => {
        const questData = localStorage.getItem('quests');
        const characterData = localStorage.getItem('characters');

        const data = {
            characters: JSON.parse(characterData || '[]'),
            quests: JSON.parse(questData || '[]'),
        };

        downloadJson(JSON.stringify(data), 'diablo-iv-quest-tracker-data.json');
    };

    return (
        <header className="flex justify-between items-center">
            <h1 className="dark:text-stone-50 text-2xl">Diablo IV Quest Tracker</h1>
            <div className="flex gap-1">
                <Button
                    onClick={() => setDialogOpen(true)}
                    size="icon"
                    variant="outline"
                    className="dark:text-stone-50"
                >
                    <Upload />
                </Button>
                <Button
                    onClick={() => generateJson()}
                    size="icon"
                    variant="outline"
                    className="dark:text-stone-50"
                >
                    <Download />
                </Button>
                <ModeToggle />
            </div>
            {dialogOpen ? <UploadQuestDataDialog open={dialogOpen} onClose={onClose} /> : null}
        </header>
    );
}

export default Header;
