import axios from 'axios'

// funzione per ottenere la descrizione di un libro
async function getBookDescription (bookKey) {
    try {
        let response = await axios.get(`https://openlibrary.org${bookKey}.json`)
        return response.data.description
            ? response.data.description.value || response.data.description
            : 'Questa edizione non ha ancora una descrizione'
    } catch (error) {
        console.error(
            `Errore durante il recupero della descrizione per il libro ${bookKey}:`,
            error
        )
    }
}

export default getBookDescription