const main = document.getElementById('main')
const searchDiv = document.getElementById('searchDiv')
const input = document.querySelector('input#search')
const loading = document.querySelector('.circle')
const qlq = window.location.href.toString().toLowerCase()
if(qlq.includes('johto')){
  var [final, inicio] = [251, 152]
}
else if(qlq.includes('hoenn')){
  var [final, inicio] = [386, 252]
}
else if(qlq.includes('sinnoh')){
  var [final, inicio] = [494, 387]
}
else if(qlq.includes('unova')){
  var [final, inicio] = [649, 495]
}
else if(qlq.includes('kalos')){
  var [final, inicio] = [721, 650]
}
else{
  var [final, inicio] = [151, 1]
}


var arrayPokemons = [{name:''}]

function showStats(element){
  element.classList.add('active')
}
function hideStats(element){
  element.classList.remove('active')
}
async function fetchPokemon(pokemon, div){
  const data = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)).json()
  const img = data.sprites.front_default
  const name = data.name[0].toUpperCase() + data.name.slice(1)
  const type0 = data.types[0].type.name
  if(data.types[1]){
    var type1 = data.types[1].type.name
  }
  const pokeId = data.id
  const hp = data.stats[0].base_stat
  const attack = data.stats[1].base_stat
  const defense = data.stats[2].base_stat
  const spattack = data.stats[3].base_stat
  const spdefense = data.stats[4].base_stat
  const speed = data.stats[5].base_stat

  const total = speed + defense + attack + spattack + spdefense + hp
  
  arrayPokemons.splice(data.id , 1, {
    id: data.id,
    name: data.name,
    img : data.sprites.front_default,
    type0: data.types[0].type.name,
    type1: undefined,
    gerarType1: function(){
      if(data.types[1]){
        this.type1 = data.types[1].type.name
      }
    }
  })
  
  if(!data.types[1]){
    div.innerHTML += (
    `<div id="app" onmouseover="showStats(this)" onmouseout="hideStats(this)" class=" pokeCard card${type0}">
    <div class="infos">
    <p>${pokeId}. ${name}</p>
      <img src="${img}" alt="${name}">
      <div class="stats">
      <p><span>HP </span><span class="num">${hp}</span> </p>
      <p><span>Attack </span><span class="num">${attack}</span></p>
      <p><span>Defense </span><span class="num">${defense}</span></p>
      <p><span>Special-Attack </span><span class="num">${spattack}</span></p>
      <p><span>Special-Defense </span><span class="num">${spdefense}</span></p>
      <p><span>Speed </span><span class="num">${speed}</span></p>
      <p><span>Total </span><span class="num">${total}</span></p>
      </div>
    </div>
    <div class="divTypes">
    <span class="type ${type0}">${type0}</span>
    </div>
    </div>`
    )
  }

  if(type1){


    div.innerHTML += (
    `<div onmouseover="showStats(this)" onmouseout="hideStats(this)" class="pokeCard card${type0}">
    <div class="infos">
    <p>${pokeId}. ${name}</p>
      <img src="${img}" alt="${name}">
      <div class="stats">
      <p><span>HP </span><span class="num">${hp}</span> </p>
      <p><span>Attack </span><span class="num">${attack}</span></p>
      <p><span>Defense </span><span class="num">${defense}</span></p>
      <p><span>Special-Attack </span><span class="num">${spattack}</span></p>
      <p><span>Special-Defense </span><span class="num">${spdefense}</span></p>
      <p><span>Speed </span><span class="num">${speed}</span></p>
      <p><span>Total </span><span class="num">${total}</span></p>
      </div>
    </div>
    <div class="divTypes">
    <span class="type ${type0}">${type0}</span>
    <span class="type ${type1}">${type1}</span>
    </div>
    </div>`
    )

  }
  
}

async function generatorCard(start, final, clean=false, div){
  if(clean == 0){
    div.innerHTML = ''
  }
  
  for(let i = start; i<=final ; i++){
    await fetchPokemon(i, div) 
  }

  input.removeAttribute('disabled', 'disabled')
  input.placeholder = 'Type the pokemon name or id'

  loading.classList.add('hide')
  div.classList.remove('hide')
}

generatorCard(inicio, final, 0, main)

input.addEventListener('keyup', _.debounce(searchPokemon, 1000))

function searchPokemon(){
  const rawText = input.value
  var text = rawText.toString().toLowerCase() 
  
  if(rawText.length == 0){
    main.classList.remove('hide')
    searchDiv.classList.add('hide')
  }
  else{
      main.classList.add('hide')
      const searchResult = arrayPokemons.filter((element) => {
      element.name = '' + element.name
      element.name.toString()
      return element.name.toLowerCase().includes(text) == true || text == element.id
    })

    if(searchResult[0]){
      searchResult.forEach(element => {
        return generatorCard(element.id, element.id, 0, searchDiv)
      })
      searchDiv.classList.remove('hide')
    }else{
      searchDiv.innerHTML = '<p class="noresult">no result founds!</p><div id="alert"><i class="fa-solid fa-triangle-exclamation"></i></div>'
      searchDiv.classList.remove('hide')
    }
  }
}
