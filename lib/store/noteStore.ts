import { newNoteData } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialDraft: newNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteDraftStore = {
  draft: newNoteData;
  setDraft: (note: newNoteData) => void;
  clearDraft: () => void;
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
