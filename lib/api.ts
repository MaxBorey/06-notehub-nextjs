import axios from "axios";
import { Note } from "../types/note";

interface NotesApiResponse {
  notes: Note[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_SWAGGER_TOKEN}`;

export async function getNotes(
  search: string = '',
  page: number,
  perPage: number = 12 
): Promise<NotesApiResponse> {
  const response = await axios.get<NotesApiResponse>('/notes', {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
    },
  });
  return response.data;
}


export async function createNote(
  newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> {
  const response = await axios.post<Note>('/notes', newNote);
  return response.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById (id: number): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
};