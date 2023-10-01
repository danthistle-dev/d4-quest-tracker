import { useState } from 'react';
import ShortUniqueId from 'short-unique-id';
import { Button } from './ui/button';
import { Check, PlusIcon } from 'lucide-react';
import CharacterDialog from './character-dialog';
import { useToast } from './ui/use-toast';
import { Character } from '@/lib/types';
import { useStore } from '@/store';
import { useCharacters } from '@/lib/use-characters';

function CharacterSelect() {
    const { toast } = useToast();
    const { characters, removeCharacter, setCharacters } = useCharacters();
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
    const state = useStore();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const addCharacter = (name: string) => {
        if (!name.length) return;

        if (characters.findIndex((c) => c.name === name) !== -1) {
            console.error('Character already exists');
            toast({
                title: 'Character already exists',
                description: 'The character you are trying to add already exists.',
            });
            return;
        }

        const newCharacter = {
            id: new ShortUniqueId().randomUUID(6),
            name: name,
        };

        setCharacters([...characters, newCharacter]);
        state.setSelectedCharacter(newCharacter.id);
        closeDialog();
    };

    const editCharacter = (name: string, id: string) => {
        if (!name.length) return;

        const index = characters.findIndex((c) => c.id === id);
        const existing = characters.findIndex((c) => c.name === name);

        if (existing !== -1 && existing !== index) {
            console.error('Character already exists');
            toast({
                title: 'Character name already exists',
                description: 'The name you have chosen belongs to another character.',
            });
            return;
        }

        if (index === -1) {
            console.error('Character not found');
            toast({
                title: 'Character not found',
                description: 'The character you are trying to edit does not exist.',
            });
            return;
        }

        const newCharacters = [...characters];
        newCharacters[index].name = name;

        setCharacters(newCharacters);
        closeDialog();
    };

    const deleteCharacter = (id: string) => {
        const index = characters.findIndex((c) => c.id === id);

        if (index === -1) {
            console.error('Character not found');
            toast({
                title: 'Character not found',
                description: 'The character you are trying to delete does not exist.',
            });
            return;
        }

        const newCharacters = [...characters];
        newCharacters.splice(index, 1);

        removeCharacter(id);
        closeDialog();
    };

    const handleSave = (name: string, id?: string) => {
        if (id) {
            editCharacter(name, id);
        } else {
            addCharacter(name);
        }
    };

    const openDialog = (character?: Character) => {
        setSelectedCharacter(character ?? null);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setSelectedCharacter(null);
        setDialogOpen(false);
    };

    const onClickCharacter = (character: Character) => {
        if (state.selectedCharacter === character.id) {
            openDialog(character);
            return;
        }
        state.setSelectedCharacter(character.id);
    };

    return (
        <section className="my-5 flex items-center gap-1 flex-wrap">
            {characters.map((c) => (
                <Button key={c.id} onClick={() => onClickCharacter(c)}>
                    {state.selectedCharacter === c.id ? <Check /> : null} {c.name}
                </Button>
            ))}
            <Button
                size={characters.length ? 'icon' : undefined}
                onClick={() => openDialog()}
                disabled={characters.length === 10}
            >
                <PlusIcon /> {!characters.length ? 'Add Character' : null}
            </Button>
            {dialogOpen ? (
                <CharacterDialog
                    character={selectedCharacter}
                    open={dialogOpen}
                    onClose={closeDialog}
                    onSave={handleSave}
                    onDelete={deleteCharacter}
                />
            ) : null}
        </section>
    );
}

export default CharacterSelect;
