"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { usePokemonStore } from "@/stores/usePokemonStore"
import { useRef } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import EditableCell from "./EditableCell"

export default function PokemonTable() {
  const data = usePokemonStore((s) => s.data)
  const customColumns = usePokemonStore((s) => s.customColumns)
  const updateCell = usePokemonStore((s) => s.updateCell)

  const parentRef = useRef<any>(null)
  
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 10,
  })

  if (!data.length) {
    return <p className="text-sm text-gray-500">No Pokémon loaded yet.</p>
  }

  return (
    <div
      ref={parentRef}
      className="border rounded-md overflow-auto max-h-[500px]"
    >
      <Table className="table-fixed w-full">
        <TableHeader className="sticky top-0 bg-gray-100 z-10">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Sprite</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Types</TableHead>
            <TableHead>HP</TableHead>
            <TableHead>Attack</TableHead>
            <TableHead>Defense</TableHead>
            {customColumns.map((c) => (
              <TableHead key={c.key}>{c.key}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody
          style={{
            position: "relative",
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((vr) => {
            const p = data[vr.index]
            return (
              <TableRow
                key={p.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${vr.start}px)`,
                }}
              >
                <TableCell>{p.id}</TableCell>
                <TableCell>
                  {p.sprite && (
                    <img src={p.sprite} alt={p.name} className="w-10 h-10" />
                  )}
                </TableCell>
                <TableCell>
                  <EditableCell
                    value={p.name}
                    onChange={(val) => updateCell(p.id, "name", val)}
                  />
                </TableCell>
                <TableCell>
                  <EditableCell
                    value={p.types?.join(", ")}
                    onChange={(val) =>
                      updateCell(p.id, "types", String(val).split(","))
                    }
                  />
                </TableCell>
                <TableCell>
                  <EditableCell
                    value={p.stats?.hp}
                    type="number"
                    onChange={(val) => updateCell(p.id, "stats.hp", val)}
                  />
                </TableCell>
                <TableCell>
                  <EditableCell
                    value={p.stats?.attack}
                    type="number"
                    onChange={(val) => updateCell(p.id, "stats.attack", val)}
                  />
                </TableCell>
                <TableCell>
                  <EditableCell
                    value={p.stats?.defense}
                    type="number"
                    onChange={(val) => updateCell(p.id, "stats.defense", val)}
                  />
                </TableCell>
                {customColumns.map((c: any) => (
                  <TableCell key={c.key}>
                    <EditableCell
                      value={p.custom?.[c.key]}
                      type={c.type}
                      onChange={(val) =>
                        updateCell(p.id, `custom.${c.key}`, val)
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
