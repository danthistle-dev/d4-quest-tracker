export type Character = {
    id: string;
    name: string;
};

export type Quest = {
    id: number;
    regionId: number;
    name: string;
};

export type QuestData = {
    id: string;
    characterId: string;
};

export type Region = {
    id: number;
    name: string;
    questCount: number;
};
