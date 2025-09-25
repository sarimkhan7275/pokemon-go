"use client"

import { Input } from "@/components/ui/input"

type Props = {
  value: any
  type?: "string" | "number" | "boolean"
  onChange: (val: any) => void
}

export default function EditableCell({
  value,
  type = "string",
  onChange,
}: Props) {
  if (type === "boolean") {
    return (
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked)}
      />
    )
  }

  return (
    <Input
      type={type === "number" ? "number" : "text"}
      value={value ?? ""}
      onChange={(e) =>
        onChange(type === "number" ? Number(e.target.value) : e.target.value)
      }
      className="h-7 text-sm"
    />
  )
}
