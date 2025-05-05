{
  ('use strict');

  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    booksList: '.books-list',
    booksImages: '.books-list .book__image',
  };

  const identificators = {
    class: {
      favorite: 'favorite',
    },
    attributes: {
      bookImageDataId: 'data-id',
    },
    events: {
      doubleClick: 'dblclick',
    },
  };

  const templates = {
    templateBook: Handlebars.compile(
      document.querySelector(select.templateOf.templateBook).innerHTML
    ),
  };

  let favoriteBooks = [];

  function initActions() {
    const booksImages = document.querySelectorAll(select.booksImages);
    for (const book of booksImages) {
      book.addEventListener(
        identificators.events.doubleClick,
        function (event) {
          event.preventDefault();
          const dataId = this.getAttribute(
            identificators.attributes.bookImageDataId
          );

          if (!favoriteBooks.includes(dataId)) {
            this.classList.add(identificators.class.favorite);
            favoriteBooks.push(
              this.getAttribute(identificators.attributes.bookImageDataId)
            );
          } else {
            favoriteBooks = favoriteBooks.filter((id) => id !== dataId);
            this.classList.remove(identificators.class.favorite);
          }
        }
      );
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
