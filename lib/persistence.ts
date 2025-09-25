import { set, get, del } from "idb-keyval"
import { Pokemon } from "@/stores/usePokemonStore"

const DB_KEY = "pokemon-research-lab-data"

export async function saveData(data: Pokemon[], customColumns: any[]) {
  await set(DB_KEY, { data, customColumns })
}

export async function loadData() {
  return (await get(DB_KEY)) as { data: Pokemon[]; customColumns: any[] } | null
}

export async function clearData() {
  await del(DB_KEY)
}
