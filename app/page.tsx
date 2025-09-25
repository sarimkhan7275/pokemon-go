"use client";
import FetchPokedexButton from "@/components/FetchPokedexButton"
import PokemonTable from "@/components/PokemonTable"
import CsvUploader from "@/components/CsvUploader"
import AddColumn from "@/components/AddColumn"
import DataControls from "@/components/DataControls"

export default function Page() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Pokémon Research Lab</h1>
      <FetchPokedexButton />
      <CsvUploader />
      <AddColumn />
      <DataControls />
      <PokemonTable />
    </main>
  );
}
