export async function fetchPokemonList(limit = 100, offset = 0) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  )
  if (!res.ok) throw new Error("Failed to fetch list")
  return res.json()
}

export async function fetchPokemonDetail(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch detail")
  return res.json()
}
