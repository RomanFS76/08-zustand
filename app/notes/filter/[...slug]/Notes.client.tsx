'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';

import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './page.module.css';
import NoteList from '@/components/NoteList/NoteList';
import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import Link from 'next/link';

type NotesClientProps = {
  tag?: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const [debounced] = useDebounce(search, 700);

  // ****************************useQuery****************************

  const { data } = useQuery({
    queryKey: ['notes', page, debounced, tag],
    queryFn: () => fetchNotes(page, debounced, tag),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  // ****************************Modal*******************************

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (valueSearch: string) => {
    setSearch(valueSearch);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox valueSearch={search} onSearch={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            onChangePage={setPage}
          />
        )}
        <Link href="/notes/action/create">Create note +</Link>
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}

//  return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <SearchBox valueSearch={search} onSearch={handleSearch} />
//         {totalPages > 1 && (
//           <Pagination
//             totalPages={totalPages}
//             page={page}
//             onChangePage={setPage}
//           />
//         )}
//         <button className={css.button} onClick={openModal}>
//           Create note +
//         </button>
//       </header>
//       {notes.length > 0 && <NoteList notes={notes} />}
//       {isModalOpen && (
//         <Modal onClose={closeModal}>
//           <NoteForm onCancel={closeModal} />
//         </Modal>
//       )}
//     </div>
//   );
