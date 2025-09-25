"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { usePokemonStore } from "@/stores/usePokemonStore"

export default function AddColumn() {
  const addColumn = usePokemonStore((s) => s.addCustomColumn)
  const [name, setName] = useState("")
  const [type, setType] = useState<any>("string")

  const handleAdd = () => {
    if (!name.trim()) return
    addColumn(name.trim(), type)
    setName("")
  }

  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Column name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as any)}
        className="border px-2 py-1 rounded"
      >
        <option value="string">String</option>
        <option value="number">Number</option>
        <option value="boolean">Boolean</option>
      </select>
      <Button onClick={handleAdd}>Add Column</Button>
    </div>
  )
}
