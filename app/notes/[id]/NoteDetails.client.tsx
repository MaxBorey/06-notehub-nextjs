"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from './NoteDetails.client.module.css';

interface NoteDetailsClientProps {
  noteId: number;
}

const getInvalidIdMessage = () => (
  <p className={css.content}>Invalid note ID</p>
);

const getLoadingMessage = () => (
  <p className={css.content}>Loading, please wait...</p>
);

const getErrorMessage = () => (
  <p className={css.content}>Something went wrong.</p>
);

const NoteDetailsClient = ({ noteId }: NoteDetailsClientProps) => {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
    enabled: !isNaN(noteId),
  });

  if (isNaN(noteId)) return getInvalidIdMessage();
  if (isLoading) return getLoadingMessage();
  if (error || !data) return getErrorMessage();

  const note = data;
  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          {/* <button className={css.editBtn}>Edit note</button> */}
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;