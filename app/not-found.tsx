import css from './Home.module.css'
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Page not found | NoteHub',
  description:
    'The page you are looking for does not exist.',
  openGraph: {
    title: 'Page not found | NoteHub',
    description:
      'The page you are looking for does not exist.',
    url: 'https://notehub.io/404',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Page not found',
      },
    ],
    type: 'website',
  },
};

const NotFound = () => {
  return (
    <main className={css.main}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </main>
  );
};

export default NotFound;