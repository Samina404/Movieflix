"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelector({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const options = [
    { label: "Popularity", value: "popularity.desc" },
    { label: "Release Date", value: "release_date.desc" },
    { label: "Vote Average", value: "vote_average.desc" },
    { label: "Title (A-Z)", value: "original_title.asc" },
  ];

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.set("page", "1"); // Reset to page 1 on sort change
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-foreground-muted uppercase tracking-widest text-[10px]">Sort By:</span>
      <select
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="bg-foreground/5 border border-card-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-card text-foreground">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
