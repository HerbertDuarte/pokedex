const main = document.getElementById('main')
const input = document.querySelector('input#search')
const [final, inicio] = [151, 1]

var arrayPokemons = [{name:''}]

async function fetchPokemon(pokemon){
  const data = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)).json()
  const img = data.sprites.front_default
  const name = data.name[0].toUpperCase() + data.name.slice(1)
  const type0 = data.types[0].type.name
  const pokeId = data.id
  
  arrayPokemons.splice(data.id , 1, {
    id: data.id,
    name: data.name,
    img : data.sprites.front_default,
    type0: data.types[0].type.name,
    type1: undefined,
    gerarType1(){
      if(data.types[1]){
        this.type1 = data.types[1].type.name
      }
    }
  })

  arrayPokemons[data.id].gerarType1()

  generatorSingleCard(data.id, main.innerHTML)
  
}

function generatorSingleCard(id, add=''){
  if(arrayPokemons[id].type1){

    main.innerHTML = add + (
    `<div class="pokeCard card${arrayPokemons[id].type0}">
    <div class="infos">
    <p>${arrayPokemons[id].id}. ${arrayPokemons[id].name}</p>
      <img src="${arrayPokemons[id].img}" alt="${arrayPokemons[id].name}">
    </div>
    <div class="divTypes">
    <span class="type ${arrayPokemons[id].type0}">${arrayPokemons[id].type0}</span>
    <span class="type ${arrayPokemons[id].type1}">${arrayPokemons[id].type1}</span>
    </div>
    </div>`
    )

  }else{
    main.innerHTML = add + (
    `<div id="app" class="pokeCard card${arrayPokemons[id].type0}">
    <div class="infos">
    <p>${arrayPokemons[id].id}. ${arrayPokemons[id].name}</p>
      <img src="${arrayPokemons[id].img}" alt="${arrayPokemons[id].name}">
    </div>
    <div class="divTypes">
    <span class="type ${arrayPokemons[id].type0}">${arrayPokemons[id].type0}</span>
    </div>
    </div>`
    )
  }
}
async function generatorCard(start, final, clean=false){

  if(clean == 0){
    main.innerHTML = ''
  }
  
  for(let i = start; i<=final ; i++){
    await fetchPokemon(i) 
  }

  input.removeAttribute('disabled', 'disabled')
  input.placeholder = 'Type the pokemon name or id'

}

generatorCard(inicio,final,0)

input.addEventListener('keyup', _.debounce(searchPokemon, 1000))

function searchPokemon(){
  const rawText = input.value
  var text = rawText.toString().toLowerCase() 
  
  if(rawText.length == 0){
    generatorCard(inicio,final,0)
  }
  else{
    main.value = ''
    const searchResult = arrayPokemons.filter((element) => {
      element.name = '' + element.name
      element.name.toString()
      return element.name.toLowerCase().includes(text) == true || text == element.id
    })

    if(searchResult[0]){
      searchResult.forEach(element => {
        return generatorCard(element.id, element.id)
      })
    }else{
      main. innerHTML = '<p class="noresult">nada encontrado</p>'
    }
  }

}
