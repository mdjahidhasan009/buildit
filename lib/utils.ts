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

export function isMobileDevice() {
  const isMobileUsingRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  let isMobileUsingMobile = false;

  if(window?.navigator?.userAgentData) {
    isMobileUsingMobile = window?.navigator?.userAgentData?.mobile || false;
  }

  return isMobileUsingRegex || isMobileUsingMobile;
}