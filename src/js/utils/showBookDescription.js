import getBookDescription from './getBookDescription.js'

const showBookDescription = async (event) => {
    let title = event.target.getAttribute('data-title')
    let bookKey = event.target.getAttribute('data-book-key')
    let author = event.target.getAttribute('data-author')

    // assegno una nuova key che rimanda ad una edizione specifica dello stesso libro ma con una descrizione disponibile
    if (bookKey === '/works/OL2895536W') {
        bookKey = '/books/OL32083873M'
    }

    // assegno una nuova key che rimanda ad una edizione specifica dello stesso libro ma con una descrizione disponibile
    if (bookKey === '/works/OL262463W') {
        bookKey = '/books/OL39479118M'
    }

    try {
        let description = await getBookDescription(bookKey)

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
}

export default showBookDescription