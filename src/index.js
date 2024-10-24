import './scss/index.scss'
import axios from 'axios'
import handleButtonEvents from '../src/js/components/buttons.js'
import createCards from '../src/js/utils/createCards.js'
import getBookDescription from '../src/js/utils/getBookDescription.js'

const SEARCH_BUTTON = document.querySelector('.search-button')
const LOADER = document.getElementById('loader')
let errorMessage = document.getElementById('error-message')

SEARCH_BUTTON.addEventListener('click', async (event) => {
    event.preventDefault()

    let subjectInput = document
        .querySelector('#subject-input')
        .value.toLowerCase()

    LOADER.style.display = 'block'
    errorMessage.style.display = 'none'

    // controllo input se è vuoto oppure se contiene un numero
    if (
        subjectInput === '' ||
        !isNaN(subjectInput) ||
        subjectInput.length < 4
    ) {
        errorMessage.textContent = `L'input inserito è errato! Inserisci un genere valido, ad es. 'Fantasy'`
        errorMessage.style.display = 'block'
        setTimeout(() => {
            errorMessage.style.display = 'none'
        }, 3000)
        LOADER.style.display = 'none'
        return
    }

    try {
        // ottengo i libri dal genere inserito
        let response = await axios.get(
            `https://openlibrary.org/subjects/${subjectInput}.json?limit=10`
        )
        let books = response.data.works

        // controllo se il genere esiste
        if (!books.length) {
            errorMessage.textContent = `Il genere inserito non esiste!`
            errorMessage.style.display = 'block'
            setTimeout(() => {
                errorMessage.style.display = 'none'
            }, 3000)
            LOADER.style.display = 'none'
            return
        }

        // ottengo le descrizioni dei libri
        const BOOKS_WITH_DESCRIPTION = await Promise.all(
            books.map(async (book) => {
                let description = await getBookDescription(book.key)
                return { ...book, description }
            })
        )

        createCards(BOOKS_WITH_DESCRIPTION)
    } catch (error) {
        console.error('Errore durante il recupero dei dati:', error)

        errorMessage.textContent = `Errore durante il recupero dei dati. Riprova più tardi!`
        errorMessage.style.display = 'block'
    } finally {
        LOADER.style.display = 'none'
    }
})

// gestione dei pulsanti per i touch screen

handleButtonEvents()
