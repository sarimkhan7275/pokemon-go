"use client"

import { useState } from "react"
import Papa from "papaparse"
import { usePokemonStore } from "@/stores/usePokemonStore"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function CsvUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [headers, setHeaders] = useState<string[]>([])
  const [mapping, setMapping] = useState<Record<string, string>>({})

  const addPokemon = usePokemonStore((s) => s.addPokemon)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])

      Papa.parse(e.target.files[0], {
        header: true,
        preview: 1,
        complete: (results) => {
          if (results.meta.fields) {
            setHeaders(results.meta.fields)
          }
        },
      })
    }
  }

  const handleImport = () => {
    if (!file) return

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as Record<string, string>[]
        rows.forEach((row) => {
          const pokemon = {
            id: Number(row[mapping["id"]] ?? 0),
            name: row[mapping["name"]] ?? "unknown",
            sprite: row[mapping["sprite"]] ?? undefined,
            types: row[mapping["types"]]
              ? row[mapping["types"]].split(",").map((t) => t.trim())
              : [],
            stats: {
              hp: Number(row[mapping["hp"]] ?? 0),
              attack: Number(row[mapping["attack"]] ?? 0),
              defense: Number(row[mapping["defense"]] ?? 0),
            },
          }
          addPokemon(pokemon)
        })
      },
    })
  }

  return (
    <Card className="w-full bg-card text-card-foreground shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">📂 CSV Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Input */}
        <div className="space-y-2">
          <Label htmlFor="csv-file">Select CSV File</Label>
          <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} />
        </div>

        {/* Header Mapping */}
        {headers.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Map CSV headers to Pokemon fields:</p>
            <div className="space-y-2">
              {headers.map((h) => (
                <div key={h} className="flex gap-3 items-center">
                  <Label className="w-28 truncate text-sm">{h}</Label>
                  <Select
                    value={mapping[h] || "ignore"}
                    onValueChange={(val) =>
                      setMapping((m) => ({ ...m, [h]: val === "ignore" ? "" : val }))
                    }
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Ignore" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ignore">Ignore</SelectItem>
                      <SelectItem value="id">ID</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="sprite">Sprite</SelectItem>
                      <SelectItem value="types">Types</SelectItem>
                      <SelectItem value="hp">HP</SelectItem>
                      <SelectItem value="attack">Attack</SelectItem>
                      <SelectItem value="defense">Defense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>

            <Button
              onClick={handleImport}
              className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              🚀 Import Pokémon
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
