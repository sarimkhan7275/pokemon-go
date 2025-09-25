import Papa from "papaparse"
import { Pokemon } from "@/stores/usePokemonStore"

export function exportCSV(data: Pokemon[], filename = "pokemon_export.csv") {
  if (!data.length) return

  const rows = data.map((p) => ({
    id: p.id,
    name: p.name,
    sprite: p.sprite,
    types: p.types?.join(", "),
    hp: p.stats?.hp,
    attack: p.stats?.attack,
    defense: p.stats?.defense,
    ...(p.custom || {}),
  }))

  const csv = Papa.unparse(rows)
  const blob = new Blob([csv], { type: "text/csvcharset=utf-8" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
