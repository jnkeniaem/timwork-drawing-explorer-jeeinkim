import { create } from 'zustand';
import type { DrawingContext } from '../types/drawing';

interface SelectedRevisionStore {
  selected: DrawingContext | null;
  setSelected: (selected: DrawingContext | null) => void;
}

export const useSelectedRevision = create<SelectedRevisionStore>((set) => ({
  selected: null,
  setSelected: (selected) => set({ selected }),
}));
