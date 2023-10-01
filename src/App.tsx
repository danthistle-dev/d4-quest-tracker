import { ThemeProvider } from './components/theme-provider';
import Header from './components/header';
import CharacterSelect from './components/character-select';
import { Toaster } from './components/ui/toaster';
import QuestTracker from './components/quest-tracker';
import { Separator } from './components/ui/separator';
import { useStore } from './store';
import '../app/globals.css';

function App() {
    const selectedCharacter = useStore((state) => state.selectedCharacter);
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <Toaster />
            <div className="h-screen">
                <main className="p-10 max-w-5xl mx-auto">
                    <Header />
                    <CharacterSelect />
                    <Separator />
                    {selectedCharacter ? (
                        <QuestTracker />
                    ) : (
                        <h3 className="dark:text-stone-50 mt-3">
                            Create or select a character to track quests
                        </h3>
                    )}
                </main>
            </div>
        </ThemeProvider>
    );
}

export default App;
