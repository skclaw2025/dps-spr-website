"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { searchIndex, type SearchEntry } from "./searchData";

const GREEN = "#0F6B50"; // matches the current menu green

function score(e: SearchEntry, term: string) {
  const t = e.title.toLowerCase();
  const k = (e.keywords ?? "").toLowerCase();
  if (t === term) return 100;
  if (t.startsWith(term)) return 80;
  if (t.includes(term)) return 60;
  if (k.includes(term)) return 40;
  if (e.section.toLowerCase().includes(term)) return 20;
  return 0;
}

export default function MenuSearch({ onNavigate }: { onNavigate: () => void }) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return searchIndex
      .map((e) => ({ e, s: score(e, term) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((x) => x.e);
  }, [q]);

  return (
    <div className="relative w-full">
      <div
        className="flex items-center gap-3 rounded-full border bg-white px-5 py-3.5"
        style={{ borderColor: "rgba(0,0,0,0.12)" }}
      >
        <MagnifyingGlassIcon className="h-5 w-5 shrink-0" style={{ color: GREEN }} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search DPS SPR — admissions, sports, fees…"
          aria-label="Search the website"
          className="w-full bg-transparent text-base outline-none placeholder:text-neutral-400"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            aria-label="Clear search"
            className="shrink-0 text-neutral-400 transition hover:text-neutral-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {q && (
        <div
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border bg-white shadow-xl"
          style={{ borderColor: "rgba(0,0,0,0.08)" }}
        >
          {results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    onClick={onNavigate}
                    className="flex items-center justify-between gap-4 px-5 py-3 transition hover:bg-neutral-50"
                  >
                    <span className="font-medium text-neutral-800">{r.title}</span>
                    <span className="shrink-0 text-[11px] uppercase tracking-wide text-neutral-400">{r.section}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-4 text-sm text-neutral-500">No matches for &ldquo;{q}&rdquo;.</p>
          )}
        </div>
      )}
    </div>
  );
}