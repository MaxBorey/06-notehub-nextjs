'use client';

import { useState } from 'react';
import css from './Notes.module.css';
import NoteList from '../../components/NoteList/NoteList';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/NoteModal/NoteModal';
import SearchBox from '../../components/SearchBox/SearchBox';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { getNotes } from '../../lib/api';
import { Note } from '../../types/note';

interface NotesApiResponse {
  notes: Note[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<NotesApiResponse, Error>({
    queryKey: ['notes', debouncedSearchTerm, page],
    queryFn: () => getNotes(debouncedSearchTerm, page),
    placeholderData: previousData => previousData,
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={searchTerm}
          onChange={(value) => {
            setSearchTerm(value);
            setPage(1);
          }}
        />

        {totalPages > 1 && (
          <div className={css.paginationInline}>
            <Pagination
              pageCount={totalPages}
              forcePage={page - 1}
              onPageChange={({ selected }) => setPage(selected + 1)}
            />
          </div>
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <strong>Loading notes...</strong>}
      {isError && <div style={{ color: 'red' }}>Error loading notes</div>}
      {!isLoading && !isError && <NoteList items={notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
