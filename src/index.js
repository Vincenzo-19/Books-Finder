import './scss/index.scss'
import axios from 'axios'

const SEARCH_BUTTON = document.querySelector('.search-button')

// Creazione delle cards

SEARCH_BUTTON.addEventListener('click', async (event) => {
    console.log('pulsante premuto')
    event.preventDefault()

    const GENRE_INPUT = document
        .querySelector('#genre-input')
        .value.toLowerCase()
    console.log('Genere inserito:', GENRE_INPUT) // Log del genere inserito

    if (GENRE_INPUT === 'fantasy') {
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
                    <p class="card-text">di <strong>${book.authors}</strong></p>
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
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">${book.title}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body"></div>
                            </div>
                        </div>
                    </div>
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

                const MODAL_BODY = document.querySelector('.modal-body')
                MODAL_BODY.innerHTML = `<p class='modal-description'><strong>Descrizione</strong><p>
                                        <p>${description}</p> 
                                        <p class='modal-author'>pubblicato da <strong>${author}</strong></p> `
            } catch (error) {
                console.error('Errore durante il recupero dei dati:', error)
            }
        })
    })
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('touchstart', () => {
        button.style.backgroundColor = '#4caf4fbb';
    });
    button.addEventListener('touchend', () => {
        button.style.backgroundColor = 'transparent';
    });
});