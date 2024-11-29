import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// from https://fe-tool.com/random-password
export const getRandomString = (size) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890';
  const charactersLength = characters.length;
  let password = '';
  for (let i = 0; i < size; ++i) {
    password += characters[Math.floor(Math.random() * charactersLength)];
  }
  return password;
}
