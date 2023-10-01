import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { checkCharacterNameLength } from '@/lib/utils';

interface CharacterDialogProps {
    character?: { id: string; name: string } | null;
    open: boolean;
    onClose: (open: boolean) => void;
    onSave: (name: string, id?: string) => void;
    onDelete?: (id: string) => void;
}

function CharacterDialog({ character, open, onClose, onSave, onDelete }: CharacterDialogProps) {
    const [name, setName] = useState(character?.name ?? '');
    const [deleting, setDeleting] = useState<boolean>(false);

    const onDeleteCharacter = () => {
        if (!character) return;
        if (!deleting) {
            setDeleting(true);
            return;
        }

        onDelete?.(character.id);
        setDeleting(false);
    };

    return (
        <Dialog onOpenChange={onClose} open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="dark:text-stone-50">
                        {character ? 'Edit Character' : 'Add Character'}
                    </DialogTitle>
                    <DialogDescription>
                        {character
                            ? 'Change the name of or delete an existing character.'
                            : 'Enter the name of the character you want to add.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="name" className="dark:text-stone-50">
                        Character Name
                    </Label>
                    <Input
                        className="dark:text-stone-50"
                        type="text"
                        id="name"
                        placeholder="Enter character name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex justify-end gap-2">
                    {character ? (
                        <Button variant="destructive" onClick={onDeleteCharacter}>
                            {deleting ? 'Are you sure?' : 'Delete'}
                        </Button>
                    ) : null}
                    <Button
                        onClick={() => onSave(name, character?.id)}
                        disabled={!checkCharacterNameLength(name)}
                    >
                        {character ? 'Save' : 'Add'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CharacterDialog;
