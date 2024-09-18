import './scss/index.scss'
import axios from 'axios'
import handleButtonEvents from '../src/js/components/buttons.js';

const SEARCH_BUTTON = document.querySelector('.search-button')

// raccolta dei libri con genere fantasy

SEARCH_BUTTON.addEventListener('click', async (event) => {

    event.preventDefault()

    const GENRE_INPUT = document
        .querySelector('#genre-input')
        .value.toLowerCase()

    if (GENRE_INPUT === 'fantasy') {
        try {
            const RESPONSE = await axios.get('https://books-finder-backend.onrender.com/api/books')

            const BOOKS = RESPONSE.data // Usa RESPONSE.data invece di RESPONSE.json()

            createCards(BOOKS)
        } catch (error) {
            console.error('Errore durante il recupero dei dati:', error)
        }
    } else {
        console.log('Genere non corrispondente')
    }
})

// funzione che genera le cards

function createCards(BOOKS) {
    const RESULTS = document.querySelector('.results')
    RESULTS.innerHTML = `
    <div class="row">
        <div class="card-container col-sm-6"></div>
    </div>`

    // forEach usato per creare una card per ogni libro trovato 

    BOOKS.forEach((book) => {
        const CARD = document.createElement('div')
        CARD.classList.add('card')
        CARD.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-author">di <strong>${book.authors}</strong></p>
                    <button
                    class="button card-button"
                    data-book-key="${book.key}"
                    data-title="${book.title}"
                    data-author="${book.authors}"
                    data-description="${book.description}"
                    data-bs-target="#staticBackdrop"
                    data-bs-toggle="modal"
                    >
                        Descrizione
                    </button>

                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-body"></div>
                            </div>
                        </div>
                    </div>
                </div>`

        document.querySelector('.card-container').appendChild(CARD)
    })

    // funzione che gestisce i pulsanti 'Descrizione' all'interno della card

    document.querySelectorAll('.card-button').forEach((button) => {
        button.addEventListener('click', async (event) => {

            let title = event.target.getAttribute('data-title')
            let bookKey = event.target.getAttribute('data-book-key')
            let author = event.target.getAttribute('data-author')

            try {
                const RESPONSE = await axios.get(`api/book/${bookKey}`)
                let description
                if (
                    RESPONSE.data.description &&
                    RESPONSE.data.description.value
                ) {
                    description = RESPONSE.data.description.value
                } else {
                    description = RESPONSE.data.description
                }

                const MODAL_CONTENT = document.querySelector('.modal-content')
                MODAL_CONTENT.innerHTML = `
                                        <div class="modal-header">
                                            <h2 class="modal-title">${title}</h2>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <p class='modal-description'><strong>Descrizione</strong><p>
                                            <p>${description}</p> 
                                            <p class='modal-author'>scritto da <strong>${author}</strong></p>
                                        </div>`
            } catch (error) {
                console.error('Errore durante il recupero dei dati:', error)
            }
        })
    })
}

// utilizzo della funzione per i bottoni sui mobile screens

handleButtonEvents();