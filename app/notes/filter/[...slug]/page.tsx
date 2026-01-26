import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import {  fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;

  const tag = slug?.[0] === 'all' ? 'All' : slug?.[0];
  console.log(tag)

  const title =
    tag === 'All'
      ? 'All notes | NoteHub'
      : `Notes filtered by ${tag} | NoteHub`;

  const description =
    tag === 'All'
      ? 'Browse all your notes in one place. Organize, search, and manage your thoughts with NoteHub.'
      : `Browse notes filtered by "${tag}". Stay organized and focused with NoteHub.`;

  const url =
    tag === 'All'
      ? 'https://notehub.io/notes'
      : `https://notehub.io/notes/filter/${slug?.[0]}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub filter',
        },
      ],
      type: 'website',
    },
  };
}

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;

  const tag = slug?.[0] === 'all' ? undefined : slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
