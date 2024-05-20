import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitlize(s: string) {
  if (s.length === 0) return ''
  if (s.length === 1) return s.toUpperCase()
  return s.at(0)?.toUpperCase() + s.slice(1)
}
