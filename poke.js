const pokeBtn = document.querySelector('#pokeBtn')

pokeBtn.addEventListener('click', getName)

async function getName(){

    try {
        const getPokemonStats = await axios.get('https://pokeapi.co/api/v2/pokemon/')
            .then(res => res.data.results)
            .then(data => {
                data.map(pokeStats => {
                    getStats(pokeStats)
                })
                return data
            })

    } catch (error) {
        console.error(error)
    }
}
const getMainContainer = document.querySelector('#mainContainer')
const getStats = async (charStats) => {
    try {
        const inStats = await axios.get(charStats.url)
            .then(res => res.data)
            .then(data => {
                //<div class="card" style="width: 18rem;">
                const card = document.createElement('div')
                    card.className = 'card'
                //<img src="..." class="card-img-top" alt="...">
                const frontShiny = data.sprites.front_shiny
                const img = document.createElement('img')
                    img.src = frontShiny
                    img.className = 'card-img-top'
                    card.append(img)
                
                //<div class="card-body">
                const cardBody = document.createElement('div')
                    cardBody.className = 'card-body'
                    //<h5 class="card-title">Card title</h5>
                const h5El = document.createElement('h5')
                    h5El.className = 'card-title'
                    h5El.textContent = charStats.name
                    cardBody.append(h5El)

                    //<p element .card-text
                
                const pEl = document.createElement('p')
                        pEl.className = 'card-text'
                    pEl.textContent = data.types.map(type =>{
                            return ' '+ type.type.name
                        })
                        cardBody.append(pEl)
                    card.append(cardBody)
                getMainContainer.append(card)

            })
    } catch (error) {
        console.log(error)
    }
}

//https://pokeapi.co/api/v2/pokemon/

