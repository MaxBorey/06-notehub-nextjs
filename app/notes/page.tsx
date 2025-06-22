import { getNotes } from "../../lib/api";
import NotesClient from "./Notes.client";
import { Note } from "../../types/note";

export default async function NotesPage() {
  const page = 1;
  const search = '';
  const data = await getNotes(search, page);

  return (
    <NotesClient
      initialNotes={data.notes as Note[]}
      initialTotalPages={data.totalPages}
      initialPage={page}
      initialSearch={search}
    />
  );
}
