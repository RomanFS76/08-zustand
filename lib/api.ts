import axios from 'axios';
import type { Note } from '../types/note';

const NotesAPI = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});
interface FetchNotesResponse {
  notes: Note[];  
  totalPages: number;
}

export const fetchNotes = async (page:number, search: string, tag?:string): Promise<FetchNotesResponse> => {
  const { data } = await NotesAPI.get<FetchNotesResponse>('/notes', {
    params: { page, perPage: 12, search, tag },
  });
  return data;
};

interface createNoteParams {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export const createNote = async (note: createNoteParams): Promise<Note> => {
  const { data } = await NotesAPI.post<Note>(`/notes`, note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await NotesAPI.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await NotesAPI.get<Note>(`/notes/${id}`);
  return data;
};



