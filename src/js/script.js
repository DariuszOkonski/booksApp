{
  ('use strict');

  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    booksList: '.books-list',
    booksImages: '.books-list .book__image',
  };

  const templates = {
    templateBook: Handlebars.compile(
      document.querySelector(select.templateOf.templateBook).innerHTML
    ),
  };

  const favoriteBooks = [];

  function initActions() {
    const booksImages = document.querySelectorAll(select.booksImages);
    for (const book of booksImages) {
      book.addEventListener('dblclick', function (event) {
        event.preventDefault();
        this.classList.add('favorite');
        favoriteBooks.push(this.getAttribute('data-id'));
      });
    }
  }

  function render() {
    const bookList = document.querySelector(select.booksList);

    dataSource.books.forEach((book) => {
      const generatedHTML = templates.templateBook(book);
      const generatedListElement = utils.createDOMFromHTML(generatedHTML);
      bookList.appendChild(generatedListElement);
    });
  }

  render();
  initActions();
}
