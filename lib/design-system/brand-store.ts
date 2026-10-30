"use client";
// One active brand per page, shared by every design-system widget on it
// (the widgets are loaded as separate chunks, so a module store is simpler than a provider).
import { useSyncExternalStore } from "react";
import type { BrandId } from "./tokens";

let current: BrandId = "aster";
const listeners = new Set<() => void>();

export function setBrand(id: BrandId) {
  current = id;
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useBrand(): [BrandId, (id: BrandId) => void] {
  const brand = useSyncExternalStore(subscribe, () => current, () => "aster" as BrandId);
  return [brand, setBrand];
}
