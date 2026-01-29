'use client';

import css from './NoteForm.module.css';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { NoteTag } from '@/types/note';
import { useNoteDraftStore } from '@/lib/store/noteStore';

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['note'] });
      router.push('/notes/filter/all');
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as string;

    mutate({ title, content, tag: tag as NoteTag });
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <label className={css.formGroup}>
        Title
        <input
          type="text"
          name="title"
          className={css.input}
          required
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </label>

      <label className={css.formGroup}>
        Content
        <textarea
          name="content"
          className={css.textarea}
          rows={5}
          required
          defaultValue={draft?.content}
          onChange={handleChange}
        />
      </label>

      <label className={css.formGroup}>
        Category
        <select
          name="tag"
          className={css.select}
          required
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.push('/notes/filter/all')}
        >
          Cancel
        </button>

        <button type="submit" className={css.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
