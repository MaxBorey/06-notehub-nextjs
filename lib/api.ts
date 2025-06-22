import axios from "axios";
import { Note } from "../types/note";

interface NotesApiResponse {
  notes: Note[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

const API_URL = 'https://notehub-public.goit.study/api/notes';
const token = process.env.NEXT_PUBLIC_VITE_SWAGER_TOKEN;
const headers = { Authorization: `Bearer ${token}` };

export async function getNotes(
  search: string = '',
  page: number
): Promise<NotesApiResponse> {
  const response = await axios.get<NotesApiResponse>(API_URL, {
    params: {
      page,
      perPage: 12,
      ...(search ? { search } : {}),
    },
    headers,
  });
  return response.data;
}

export async function createNote(
  newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> {
  const response = await axios.post<{ note: Note }>(API_URL, newNote, { headers });
  return response.data.note;
}

export async function deleteNote(id: number): Promise<Note> {
  const response = await axios.delete<{ note: Note }>(`${API_URL}/${id}`, { headers });
  return response.data.note;
}

export const getSingleNote = async (id: number): Promise<Note> => {
  const url = `https://notehub-public.goit.study/api/notes/${id}`;
  const token = process.env.NEXT_PUBLIC_VITE_SWAGER_TOKEN;
  const headers = { Authorization: `Bearer ${token}` };

  const res = await axios.get<Note>(url, { headers });
  return res.data;
};
