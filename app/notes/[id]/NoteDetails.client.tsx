"use client";

import css from './NoteDetails.client.module.css';
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import { getSingleNote } from "../../../lib/api";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const noteId = Number(id);

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getSingleNote(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
