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
  page: number
): Promise<NotesApiResponse> {
  const response = await axios.get<NotesApiResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      ...(search ? { search } : {}),
    },
  });
  return response.data;
}
export async function createNote(
  newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<{ note: Note }> {
  const response = await axios.post<{ note: Note }>('/notes', newNote);
  return response.data;
}
export async function deleteNote(id: number): Promise<{ note: Note }> {
  const response = await axios.delete<{ note: Note }>(`/notes/${id}`);
  return response.data;
}
export const fetchNoteById = async (id: number): Promise<{ note: Note }> => {
  const response = await axios.get<{ note: Note }>(`/notes/${id}`);
  return response.data;
};