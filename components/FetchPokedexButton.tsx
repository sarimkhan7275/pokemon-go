"use client"
import { Button } from "@/components/ui/button"
import { usePokemonStore } from "@/stores/usePokemonStore"
import { fetchPokemonList, fetchPokemonDetail } from "@/lib/pokeapi"
import { useState } from "react"

export default function FetchPokedexButton() {
  const progress = usePokemonStore((s) => s.progress)
  const addPokemon = usePokemonStore((s) => s.addPokemon)
  const setProgress = usePokemonStore((s) => s.setProgress)
  const clear = usePokemonStore((s) => s.clear)

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    clear()
    setLoading(true);
    try {
      // Get all pokemon urls
      const first = await fetchPokemonList(100, 0)
      console.log("first", first)
      const total = first.count
      console.log("total",total)
      const urls = first.results.map((p: any) => p.url)
      console.log("urls", urls)

      for (let offset = 100; offset < total; offset += 100) {
        const page = await fetchPokemonList(100, offset)
        console.log("page", page)
        urls.push(...page.results.map((p: any) => p.url))
      }

      // 2. Fetch in batches of 20
      let fetched = 0
      const batchSize = 20

      for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize)

        const details = await Promise.all(
          batch.map(async (url:string) => {
            const detail = await fetchPokemonDetail(url)

            return {
              id: detail.id,
              name: detail.name,
              sprite: detail.sprites.front_default,
              types: detail.types.map((t: any) => t.type.name),
              stats: {
                hp: detail.stats.find((s: any) => s.stat.name === "hp")?.base_stat ?? 0,
                attack: detail.stats.find((s: any) => s.stat.name === "attack")?.base_stat ?? 0,
                defense: detail.stats.find((s: any) => s.stat.name === "defense")?.base_stat ?? 0,
              },
            }
          })
        )


        details.forEach((pokemon:any) => addPokemon(pokemon))
        fetched += details.length
        setProgress(fetched, total)
        setLoading(false)
      }
    } catch (err) {
      console.error("Error fetching Pokédex:", err)
      setLoading(false);
    }
  }

  const percent =
    progress.total > 0
      ? Math.round((progress.fetched / progress.total) * 100)
      : 0;


  return (
    <div className="p-4 rounded-xl bg-card border border-border shadow-md space-y-3 w-full ">
      <h2 className="text-lg font-semibold text-foreground">Pokédex Loader</h2>

      <Button
        onClick={handleClick}
        disabled={loading}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition"
      >
        {loading ? "Fetching…" : "Fetch Full Pokédex"}
      </Button>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">
          Progress: {progress.fetched}/{progress.total} ({percent}%)
        </p>
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-2 bg-primary transition-all"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
