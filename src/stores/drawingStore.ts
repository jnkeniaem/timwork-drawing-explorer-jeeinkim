import { create } from 'zustand';
import type { DrawingContext } from '../types/drawing';

interface DrawingStore {
  selected: DrawingContext | null;
  setSelected: (selected: DrawingContext | null) => void;
  revisionItems: DrawingContext[];
  setRevisionItems: (revisionItems: DrawingContext[]) => void;
}

export const useDrawingStore = create<DrawingStore>((set) => ({
  selected: null,
  setSelected: (selected) => set({ selected }),

  // context를 포함하는 revision item 목록
  revisionItems: [],
  setRevisionItems: (revisionItems) => set({ revisionItems }),
}));
