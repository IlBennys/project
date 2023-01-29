const Url = "https://striveschool-api.herokuapp.com/api/deezer/search?q="

const fetchByQuery = async (query) => {
  const ricerca = await fetch(`${Url}${query}`)
  const { data: songs } = await ricerca.json()
  return songs // ABBIAMO L'OGG DI RIFERIMENTO
}

// Prima sezione
const renderFavoriteSongs = async () => {
  let canzoni = await fetchByQuery("fabri fibra")
  let row = document.querySelector("#favArtist.row")
  let canzoniPrefe = [canzoni[5], canzoni[13], canzoni[16]]
  canzoniPrefe.forEach(({ album, title, rank, artist }) => {
    row.innerHTML += `
    <div class='col'> 
        <div class="card m-3" >
             <img src="${album.cover_xl}" class="img-fluid rounded-start card-img-top"  alt="${title}">
      
        <div class="card-body">
          <h5 class="card-title" songRank='${rank}'>${title}</h5>
          <p class="card-text">${artist.name}</p>
        </div>
  </div></div>
        `
  })
}
// Seconda sezione
const canzonePreferita = async () => {
  let [primaCanzone] = await fetchByQuery("In Italia")
  // console.log(primaCanzone)
  const { album, title, artist, rank } = primaCanzone
  let sezione = document.querySelector("#favSong")
  sezione.innerHTML += `<div class="card m-3" >
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${album.cover_xl}" class="img-fluid rounded-start" alt="${title}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title" songRank='${rank}'>${title}</h5>
        <p class="card-text">${artist.name}</p>
      </div>
    </div>
  </div>
</div>`
}

// Terza sezione
const carosello22 = async () => {
  try {
    const arrayDiQueries = [
      "Stelle fabri fibra",
      "Fenomeno fabri fibra",
      "Contrabbando fabri fibra",
    ]
    for (let i = 0; i < arrayDiQueries.length; i++) {
      const singolaQuery = arrayDiQueries[i]
      let [canzone] = await fetchByQuery(singolaQuery)
      let sezione = document.querySelector(".carousel-inner")
      sezione.innerHTML += `<div class="carousel-item ${
        i == 0 ? "active" : ""
      } ">
    <img src="${canzone.album.cover_xl}" class="d-block w-100" alt="pic-album">
    
  </div>`
    }
  } catch (error) {
    console.log(error)
  }
}
const arrayDiTitoli = () => {
  let h5 = document.querySelectorAll("h5")
  let titoli = []
  h5.forEach((singoloTitolo) => {
    titoli.push({
      titolo: singoloTitolo.innerText,
      rank: Number(singoloTitolo.getAttribute("songRank")),
    })
  })
  return titoli
}

const titoliAlfabetici = () => {
  let titoli = arrayDiTitoli()
  let sorted = titoli.map((canzone) => canzone.titolo).sort()
  console.log(sorted)
  let alert = document.querySelector(".modal ul.canzoniOrdinate")
  alert.innerHTML = ""
  sorted.forEach((canzone) => {
    alert.innerHTML += `<li class='list-group-item'>
        ${canzone}
        
        </li>`
  })
}

const soloTitolo = () => {
  let titoli = arrayDiTitoli()
  let sorted = titoli.sort((a, b) => {
    return a.rank - b.rank
  })
  console.log(sorted)
  let alert = document.querySelector(".alert ul.canzoniOrdinate")
  alert.innerHTML = ""
  sorted.forEach((canzone) => {
    alert.innerHTML += `<li class='list-group-item'>
        ${canzone.titolo} - ${canzone.rank}  
        
        </li>`
  })
  alert.parentElement.classList.toggle("d-none")
}

window.onload = async () => {
  await renderFavoriteSongs()
  await canzonePreferita()
  await carosello22()
  await titoliAlfabetici()
}
