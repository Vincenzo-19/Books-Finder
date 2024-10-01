import showBookDescription from './showBookDescription.js'

// funzione per creare le card dei libri
function createCards(BOOKS) {
    const RESULTS = document.querySelector('.results')
    RESULTS.innerHTML = `
    <div class="row">
        <div class="card-container col-sm-6"></div>
    </div>`

    BOOKS.forEach((book) => {
        let card = document.createElement('div')
        card.classList.add('card')
        let title = book.title
        let truncatedTitle =
            title.length > 50 ? title.slice(0, 47) + '...' : title
        let authors = book.author_name ? book.author_name.slice(0, 2).join(', ') : 'Sconosciuto';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${truncatedTitle}</h5>
                <p class="card-author">di <strong>${authors}</strong></p>
                <button
                    class="button card-button"
                    data-book-key="${book.key}"
                    data-title="${book.title}"
                    data-author="${book.author_name ? book.author_name.join(', ') : 'Sconosciuto'}"
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

        document.querySelector('.card-container').appendChild(card)
    })

    document.querySelectorAll('.card-button').forEach((button) => {
        button.addEventListener('click', showBookDescription)
    })
}

export default createCards