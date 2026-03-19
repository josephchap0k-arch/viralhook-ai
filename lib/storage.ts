// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
export interface User {
  id: string
  email: string
  name: string
  plan: 'free' | 'pro'
  generationsToday: number
  generationsTotal: number
  lastResetDate: string
  createdAt: string
}

export interface HookEntry {
  id: string
  topic: string
  platform: string
  tone: string
  hooks: string[]
  createdAt: string
}

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────
export const FREE_DAILY_LIMIT = 5
const USER_KEY    = 'vh_user'
const HISTORY_KEY = 'vh_history'

// ─────────────────────────────────────────────────────────────
// User helpers
// ─────────────────────────────────────────────────────────────
export function readUser(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    const user: User = JSON.parse(raw)
    const today = todayStr()
    if (user.lastResetDate !== today) {
      user.generationsToday = 0
      user.lastResetDate = today
      writeUser(user)
    }
    return user
  } catch {
    return null
  }
}

export function writeUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}
export function createUserFromSupabase(id: string, email: string, name: string): User {
  const existing = readUser()
  if (existing && existing.id === id) return existing
  const user: User = {
    id,
    email,
    name,
    plan: 'free',
    generationsToday: 0,
    generationsTotal: 0,
    lastResetDate: todayStr(),
    createdAt: new Date().toISOString(),
  }
  writeUser(user)
  return user
}
export function createUser(email: string, name: string): User {
  const existing = readUser()
  if (existing && existing.email === email) throw new Error('Email already registered.')
  const user: User = {
    id: uid(),
    email,
    name,
    plan: 'free',
    generationsToday: 0,
    generationsTotal: 0,
    lastResetDate: todayStr(),
    createdAt: new Date().toISOString(),
  }
  writeUser(user)
  return user
}

export function loginUser(email: string): User {
  const user = readUser()
  if (!user || user.email !== email) throw new Error('No account found with that email.')
  return user
}

export function logoutUser(): void {
  localStorage.removeItem(USER_KEY)
}

export function upgradeToPro(user: User): User {
  const updated: User = { ...user, plan: 'pro' }
  writeUser(updated)
  return updated
}

export function canGenerate(user: User): boolean {
  return user.plan === 'pro' || user.generationsToday < FREE_DAILY_LIMIT
}

export function generationsLeft(user: User): number {
  if (user.plan === 'pro') return Infinity
  return Math.max(0, FREE_DAILY_LIMIT - user.generationsToday)
}

export function recordGeneration(user: User): User {
  const updated: User = {
    ...user,
    generationsToday: user.generationsToday + 1,
    generationsTotal: user.generationsTotal + 1,
  }
  writeUser(updated)
  return updated
}

// ─────────────────────────────────────────────────────────────
// History helpers
// ─────────────────────────────────────────────────────────────
export function readHistory(): HookEntry[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]') } catch { return [] }
}

export function appendHistory(entry: Omit<HookEntry, 'id' | 'createdAt'>): HookEntry {
  const history = readHistory()
  const newEntry: HookEntry = { ...entry, id: uid(), createdAt: new Date().toISOString() }
  localStorage.setItem(HISTORY_KEY, JSON.stringify([newEntry, ...history].slice(0, 50)))
  return newEntry
}

export function removeHistory(id: string): void {
  const updated = readHistory().filter(h => h.id !== id)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
}

// ─────────────────────────────────────────────────────────────
// Utils
// ─────────────────────────────────────────────────────────────
function uid(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2)
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}
