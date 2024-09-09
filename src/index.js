import './scss/index.scss'
import axios from 'axios'

const searchButton = document.querySelector('.search-button')

// Creazione delle cards

searchButton.addEventListener('click', async (event) => {
    console.log('pulsante premuto')
    event.preventDefault()

    const GENRE = document.querySelector('#genre-input').value.toLowerCase()
    console.log('Genere inserito:', GENRE) // Log del genere inserito

    if (GENRE === 'fantasy') {
        try {
            const RESPONSE = await axios.get('/api/books')

            const BOOKS = RESPONSE.data // Usa RESPONSE.data invece di RESPONSE.json()
            console.log('Libri ricevuti:', BOOKS) // Log dei libri ricevuti

            createCards(BOOKS)
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error)
        }
    } else {
        console.log('Genere non corrispondente') // Log se il genere non è "fantasy"
    }
})

function createCards(BOOKS) {
    const RESULTS = document.querySelector('.results')
    RESULTS.innerHTML = `
    <div class="row">
        <div class="card-container col-sm-6"></div>
    </div>`

    BOOKS.forEach((book) => {
        const CARD = document.createElement('div')
        CARD.classList.add('card')
        CARD.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">${book.authors}</p>
                    <button class="button card-button"
                        data-book-key="${book.key}"
                        data-title="${book.title}"
                        data-author="${book.authors}"
                        data-description="">Descrizione
                    </button>
                </div>`
        document.querySelector('.card-container').appendChild(CARD)
    })
    document.querySelectorAll('.card-button').forEach((button) => {
        button.addEventListener('click', async (event) => {
            event.preventDefault()
            console.log('card-button premuto')

            let bookKey = event.target.getAttribute('data-book-key')
            let title = event.target.getAttribute('data-title')
            let author = event.target.getAttribute('data-author')

            try {
                const RESPONSE = await axios.get(`api/book${bookKey}`)
                console.log('RESPONSE:', RESPONSE)
                let description = RESPONSE.data.description
                    ? RESPONSE.data.description
                    : 'Nessuna descrizione disponibile'
                console.log('description:', description)
            } catch (error) {
                console.error('Errore durante il recupero dei dati:', error)
            }
        })
    })
}
