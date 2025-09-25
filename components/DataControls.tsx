"use client"

import { Button } from "@/components/ui/button"
import { usePokemonStore } from "@/stores/usePokemonStore"
import { exportCSV } from "@/lib/csvExport"

export default function DataControls() {
  const save = usePokemonStore((s) => s.save)
  const load = usePokemonStore((s) => s.load)
  const data = usePokemonStore((s) => s.data)

  return (
    <div className="flex gap-2">
      <Button onClick={() => save()}>💾 Save</Button>
      <Button onClick={() => load()}>📂 Load</Button>
      <Button onClick={() => exportCSV(data)}>⬇️ Export CSV</Button>
    </div>
  )
}
