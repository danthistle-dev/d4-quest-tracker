import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function checkCharacterNameLength(name: string): boolean {
    const MIN_LENGTH = 2;
    const MAX_LENGTH = 16;
    return name.length >= MIN_LENGTH && name.length <= MAX_LENGTH;
}

export function downloadJson(json: string, filename: string): void {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(json)}`);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
