# 🧪 Pokémon Research Lab

A web app built with **Next.js, TailwindCSS, and ShadCN UI** that allows you to:
- Fetch the **full Pokédex dataset** from the PokéAPI.
- Upload large **CSV datasets** and map headers to Pokémon fields.
- Display everything in a **fast, virtualized, editable table**.
- Add your own custom columns.
- Save/load data from **IndexedDB** and export back to CSV.

---

## 🚀 Live Demo
🔗 [Deployed on Vercel](https://your-vercel-link.vercel.app)  
*(replace with your actual deployed URL)*

---

## 📂 Features
- ⚡ **Full Pokédex Loader** – fetches all Pokémon with progress tracking.
- 📊 **Virtualized Table** – smooth scrolling for 1000+ rows using TanStack Virtual.
- ✍️ **Inline Editing** – edit Pokémon fields directly inside the table.
- ➕ **Custom Columns** – add your own fields (string, number, boolean).
- 📥 **CSV Import** – upload CSV, map headers → fields, and merge data.
- 📤 **CSV Export** – download current dataset with custom fields included.
- 💾 **Persistence** – data is saved in IndexedDB, survives page reloads.
- 🌑 **Dark Mode** – permanently dark theme with polished ShadCN UI.

---

## 🛠️ Tech Stack
- [Next.js](https://nextjs.org/) – React framework
- [TailwindCSS](https://tailwindcss.com/) – utility-first styling
- [ShadCN UI](https://ui.shadcn.com/) – accessible UI components
- [Zustand](https://zustand-demo.pmnd.rs/) – lightweight state management
- [TanStack Table](https://tanstack.com/table) – advanced table rendering
- [TanStack Virtual](https://tanstack.com/virtual) – efficient list virtualization
- [PapaParse](https://www.papaparse.com/) – CSV parsing
- [idb-keyval](https://github.com/jakearchibald/idb-keyval) – IndexedDB wrapper

---

## ⚙️ Setup & Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/your-username/pokemon-research-lab.git
   cd pokemon-research-lab


# Architecture & Decisions

## Next.js App Router
- Provides **server-side rendering** and **client-side interactivity** out of the box.  
- Pages are organized for clarity.

## Zustand Store
Central source of truth for:
- **Pokémon dataset**  
- **Progress tracking**  
- **Custom column definitions**  

Chosen for its **minimal boilerplate** compared to Redux.

## Virtualized Table
- With **1000+ Pokémon**, rendering all rows would cause performance issues.  
- **TanStack Virtual** ensures only visible rows are rendered → smooth scrolling.

## CSV Handling with PapaParse
- Handles large files efficiently with **streaming/chunk parsing**.  
- **Schema mapping step** ensures compatibility with any CSV format.

## IndexedDB Persistence
- Data is saved in the browser (using **idb-keyval**) so it survives reloads without a backend.

## UI with ShadCN + Tailwind
- Provides **consistent styling**  
- Built-in **dark mode**  
- Accessible components



# 🏎️ Performance Optimizations

## Batch API Fetching
- Pokémon data is fetched in **batches of 20** instead of one-by-one → ~10x faster.

## Virtualized Table Rendering
- Only renders **visible rows**, reducing DOM overhead for **1000+ rows**.

## Streaming CSV Parsing
- **PapaParse** processes rows incrementally, avoiding memory issues with large files.

## IndexedDB Persistence
- Offloads storage to the browser, keeping memory usage low and allowing quick reloads.


# ⚠️ Challenges & Solutions

## Slow API Fetching
- Initially fetched Pokémon one at a time → too slow.  
✅ **Fixed by batching requests.**

## Rendering 1000+ Rows
- Plain table lagged heavily.  
✅ **Fixed using TanStack Virtual.**

## CSV Header Mismatch
- Different CSV files had different column names.  
✅ **Solved by adding a header mapping UI before import.**

## Data Loss on Refresh
- Without persistence, data disappeared after reload.  
✅ **Fixed with IndexedDB storage.**
