var main = document.getElementById('main')

async function fetchPokemon(pokemon){
  const data = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)).json()

  const name = data.name[0].toUpperCase() + data.name.slice(1)
  const img = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`)
  const urlImg = img.url
  const type0 = data.types[0].type.name

  if(data.types[1]){
    const type1 = data.types[1].type.name
  
    main.innerHTML += (
      `<div class="pokeCard card${type0}">
      <div class="infos">
        <p>${name}</p>
        <img src="${urlImg}" alt="${name}">
      </div>
      <div class="divTypes">
      <span class="type ${type0}">${type0}</span>
      <span class="type ${type1}">${type1}</span>
      </div>
      </div>`
      )

  }else{
    main.innerHTML +=(
      `<div id="app" class="pokeCard card${type0}">
      <div class="infos">
        <p>${name}</p>
        <img src="${urlImg}" alt="${name}">
      </div>
      <div class="divTypes">
      <span class="type ${type0}">${type0}</span>
      </div>
      </div>`
      )
  }
  
}
async function generatorCard(){
  
  for(let i = 1; i<=151 ; i++){
    await fetchPokemon(i)
  }

}

generatorCard()

function searchPokemon(name){
  const input = document.querySelector('input#search')

  if(input.value.length == 0){
    generatorCard(151)  
  }
  else{
      
  }
}