"use client";

import { useQuery } from "@tanstack/react-query";
import { getPokemonList } from "@/service/service";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);

  const { data: pokemonList, isLoading: listLoading } = useQuery({
    queryKey: ["pokemonList", page],
    queryFn: () => getPokemonList(page),
  });

  if (listLoading) return <div>Loading Pokemon list...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokemon Explorer</h1>

      <div className="mb-4">
        <h2 className="text-xl mb-2">Pokemon List (Page {page})</h2>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {pokemonList?.results.map((pokemon) => (
            <button key={pokemon.name} className="p-2 border rounded">
              {pokemon.name}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
