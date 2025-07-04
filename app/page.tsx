"use client";

import { useQuery } from "@tanstack/react-query";
import { getPokemonList, getPokemonDetails } from "@/service/service";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  const { data: pokemonList, isLoading: listLoading } = useQuery({
    queryKey: ["pokemonList", page],
    queryFn: () => getPokemonList(page),
  });

  const { data: pokemonDetails, isLoading: detailsLoading } = useQuery({
    queryKey: ["pokemonDetails", selectedPokemon],
    queryFn: () =>
      selectedPokemon ? getPokemonDetails(selectedPokemon) : null,
    enabled: !!selectedPokemon,
  });

  if (listLoading) return <div>Loading Pokemon list...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokemon Explorer</h1>

      <div className="mb-4">
        <h2 className="text-xl mb-2">Pokemon List (Page {page})</h2>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {pokemonList?.results.map((pokemon) => (
            <button
              key={pokemon.name}
              onClick={() => setSelectedPokemon(pokemon.name)}
              className={`p-2 border rounded ${
                selectedPokemon === pokemon.name
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100 hover:text-black cursor-pointer"
              }`}
            >
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

      {selectedPokemon && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl mb-2">Pokemon Details</h2>
          {detailsLoading ? (
            <div>Loading details...</div>
          ) : pokemonDetails ? (
            <div>
              <h3 className="text-lg font-bold">{pokemonDetails.name}</h3>
              <img
                src={pokemonDetails.sprites.front_default}
                alt={pokemonDetails.name}
                className="w-32 h-32"
              />
              <div>
                Types:{" "}
                {pokemonDetails.types.map((t) => t.type.name).join(" & ")}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
