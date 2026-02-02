import Link from "next/link";

interface Genre {
  id: number;
  name: string;
}

interface Props {
  genres: Genre[];
}

export default function GenreList({ genres }: Props) {
  if (!genres || genres.length === 0) {
    return (
      <p className="text-gray-400 mt-4">
        No genres available.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {genres.map((genre) => (
        <Link
          key={genre.id}
          href={`/genre/${genre.id}`}
          className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition text-sm"
        >
          {genre.name}
        </Link>
      ))}
    </div>
  );
}
