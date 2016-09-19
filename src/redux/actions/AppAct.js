

export let APP_ACT_Type= {
  PokemonSelelectToggle:"PokemonSelelectToggle",
  PokemonSelectListUpdate:"PokemonSelectListUpdate",
  SetPokemonSelectList:"SetPokemonSelectList"
}



export function Act_ToggleSelectPokemon(id)
{
  return {
    type: APP_ACT_Type.PokemonSelelectToggle,data:id
  }
}


export function Act_PokemonSelectListUpdate(pokeSelList)
{
  return {
    type: APP_ACT_Type.PokemonSelelectListUpdate,data:pokeSelList
  }
}
