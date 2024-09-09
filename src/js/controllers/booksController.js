import axios from 'axios';  

// controller per ottenere una lista di libri sulla base di una query
export const getBooks = async (req, res) => {
    
    try {
        const RESPONSE = await axios.get('https://openlibrary.org/search.json', {
            params: {
                q: 'fantasy',
                limit: 10
            }
        });

        // controlla se sono stati trovati i libri
        if (RESPONSE.data.docs.length === 0) {
            res.status(404).send('Nessun libro trovato');
        } else {

            // mappa i dati ed estrae solo le informazioni necessarie
            const BOOKS = RESPONSE.data.docs.map(book => ({
                key: book.key,
                title: book.title,
                authors: book.author_name ? book.author_name.join(', ') : 'Unknown',
            }));
            // invia la risposta dei libri come json
            res.json(BOOKS);
        }
    } catch (error) {
        res.status(500).send('Errore durante il recupero dei dati');
    }
};


// controller per ottenere i dettagli di un singolo libro tramite la key
export const getBookDetails = async (req, res) => {
    let bookKey = req.params.key;

    try {
        // Effettua una richiesta get all'API di Open Library utilizzando la key del libro
        const RESPONSE = await axios.get(`https://openlibrary.org/works/${bookKey}.json`);
        let bookDetails = {
            description: RESPONSE.data.description ? RESPONSE.data.description.value : 'Nessuna descrizione disponibile',
        };
        // invia i dettagli dei libri come risposta json 
        res.json(bookDetails);
    } catch (error) {
        res.status(500).send('Errore durante il recupero dei dati');
    }
};