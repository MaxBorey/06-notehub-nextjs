import { getNotes } from "../../../lib/api";
import NotesClient from "../Notes.client";

export default async function NotesPage() {
  let data;
  try {
    data = await getNotes('', 1);
  } catch (err) {
    return <div>Could not fetch notes. {String(err)}</div>;
  }

  if (!data || !Array.isArray(data.notes)) {
    return <div>No notes available</div>;
  }

  return (
    <NotesClient
      initialNotes={data.notes}
      initialTotalPages={data.totalPages}
      initialPage={data.page}
      initialSearch={''}
    />
  );
}
