'use client';

import { useParams, useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';

const NotePreviewClient = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string | undefined };

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id as string),
    refetchOnMount: false,
  });

  const close = () => router.back();

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  const formattedDate = note.createdAt
    ? new Date(note.createdAt).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
    : '';

  return (
    <Modal onClose={close}>
      <button className={css.backBtn} onClick={close}>
        Close
      </button>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
          <span className={css.tag}>{note.tag}</span>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
