
import React from 'react'

const NoteForm = () => {
  return (
    <div>NoteForm</div>
  )
}

export default NoteForm











































// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import type { FormikHelpers } from 'formik';
// import * as Yup from 'yup';
// import css from './NoteForm.module.css';
// import { useQueryClient, useMutation } from '@tanstack/react-query';
// import { createNote } from '../../lib/api';
// import { useId } from 'react';

// interface NoteFormValues {
//   title: string;
//   content: string;
//   tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
// }

// const initialValues: NoteFormValues = {
//   title: '',
//   content: '',
//   tag: 'Todo',
// };

// interface NoteFormProps {
//   onCancel: () => void;
// }

// const NoteFormSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Title must be at least 3 characters")
//     .max(50, "Title is too long")
//     .required("Title is required"),
//   content: Yup.string()
//     .max(500, "Content is too long"),
//     tag:Yup.string()
//     .oneOf(['Todo', 'Work', 'Personal','Meeting', 'Shopping'], 'Invalid tag')
//     .required("Tag is required"),
// });

// export default function NoteForm({ onCancel }: NoteFormProps) {
//   const fieldId = useId();

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: createNote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['notes'] });
//       onCancel();
//     },
//   });

//   const handleSubmit = (
//     values: NoteFormValues,
//     actions: FormikHelpers<NoteFormValues>
//   ) => {
//     mutation.mutate(values);
//     actions.resetForm();    
//   };

//   return (
//     <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={NoteFormSchema}>
//       <Form className={css.form}>
//         <div className={css.formGroup}>
//           <label htmlFor={`${fieldId}-title`}>Title</label>
//           <Field
//             id={`${fieldId}-title`}
//             type="text"
//             name="title"
//             className={css.input}
//           />
//           <ErrorMessage name="title" component="span" className={css.error} />
//         </div>
//         <div className={css.formGroup}>
//           <label htmlFor="content">Content</label>
//           <Field
//             as="textarea"
//             id="content"
//             name="content"
//             rows={8}
//             className={css.textarea}
//           />
//           <ErrorMessage name="content" component="span" className={css.error} />
//         </div>
//         <div className={css.formGroup}>
//           <label htmlFor="tag">Tag</label>
//           <Field as="select" id="tag" name="tag" className={css.select}>
//             <option value="Todo">Todo</option>
//             <option value="Work">Work</option>
//             <option value="Personal">Personal</option>
//             <option value="Meeting">Meeting</option>
//             <option value="Shopping">Shopping</option>
//           </Field>
//           <ErrorMessage name="tag" component="span" className={css.error} />
//         </div>
//         <div className={css.actions}>
//           <button type="button" className={css.cancelButton} onClick={onCancel}>
//             Cancel
//           </button>
//           <button type="submit" className={css.submitButton}>
//             Create note
//           </button>
//         </div>
//       </Form>
//     </Formik>
//   );
// }