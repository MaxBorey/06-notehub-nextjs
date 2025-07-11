import css from './NoteList.module.css';
import { Note } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api';
import { useState } from 'react';
import Link from "next/link";


interface NoteListProps {
  items: Note[];
}

export default function NoteList({ items }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onMutate: (id: number) => {
      setDeletingId(id);
      setDeleteError(null);
    },
    onSettled: () => {
      setDeletingId(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error: Error) => {
      setDeleteError(error?.message || "Could not delete the note. Try again!");
    }
  });

  return (
    <>
      <ul className={css.list}>
        {items.map(note => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`}>View details</Link>
              <button
                className={css.button}
                disabled={deletingId === note.id}
                onClick={() => deleteMutation.mutate(note.id)}
              >
                {deletingId === note.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {deleteError && (
        <div className={css.errorMsg}>{deleteError}</div>
      )}
    </>
  );
}
