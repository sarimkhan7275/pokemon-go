import { create } from "zustand";
import { saveData, loadData } from "@/lib/persistence";

export type Pokemon = {
  id: number;
  name: string;
  sprite?: string;
  types?: string[];
  stats?: { hp: number; attack: number; defense: number };
  custom?: Record<string, string | number | boolean>;
};

type CustomColumn = {
  key: string;
  type: "string" | "number" | "boolean";
};

type State = {
  data: Pokemon[];
  progress: { fetched: number; total: number };
  customColumns: CustomColumn[];
  addPokemon: (p: Pokemon) => void;
  setProgress: (f: number, t: number) => void;
  clear: () => void;
  updateCell: (id: number, field: string, value: any) => void;
  addCustomColumn: (key: string, type: "string" | "number" | "boolean") => void;
  save: () => void;
  load: () => Promise<void>;
};

export const usePokemonStore = create<State>((set, get) => ({
  data: [],
  progress: { fetched: 0, total: 0 },
  customColumns: [],
  addPokemon: (p) => set((s) => ({ data: [...s.data, p] })),
  setProgress: (f, t) => set({ progress: { fetched: f, total: t } }),
  clear: () => set({ data: [], progress: { fetched: 0, total: 0 }, customColumns: [] }),

  save: () => {
    const { data, customColumns } = get();
    saveData(data, customColumns);
  },

  load: async () => {
    const result = await loadData();
    if (result) {
      set({
        data: result.data,
        customColumns: result.customColumns,
        progress: { fetched: result.data.length, total: result.data.length },
      });
    }
  },

  updateCell: (id, field, value) =>
    set((s:any) => ({
      data: s.data.map((row:any) => {
        if (row.id !== id) return row;

        if (field.startsWith("custom.")) {
          const key = field.split(".")[1];
          return { ...row, custom: { ...row.custom, [key]: value } };
        }
        if (field.startsWith("stats.")) {
          const key = field.split(".")[1];
          return { ...row, stats: { ...row.stats, [key]: Number(value) } };
        }
        return { ...row, [field]: value };
      }),
    })),

  addCustomColumn: (key, type) =>
    set((s) => ({
      customColumns: [...s.customColumns, { key, type }],
      data: s.data.map((row) => ({
        ...row,
        custom: { ...row.custom, [key]: type === "boolean" ? false : type === "number" ? 0 : "" },
      })),
    })),
}));
