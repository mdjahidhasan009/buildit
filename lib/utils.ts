import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function hasProperty<T extends object, K extends keyof any>(
//     item: T,
//     propertyName: K
// ): item is T & Record<K, string> {
//   return typeof item[propertyName as keyof T] === 'string';
// }

// export function hasStringProperty<T extends object>(item: T, propertyName: string): boolean {
//   return typeof item[propertyName as keyof T] === 'string';
// }

export function hasStringProperty(item: any, propertyName: string): boolean {
  return typeof item[propertyName] === 'string';
}