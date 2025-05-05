{
  ('use strict');

  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    booksList: '.books-list',
    booksImages: '.books-list .book__image',
    booksImagesHidden: '.book__image.hidden',
    bookImage: (id) => `.book__image[data-id="${id}"]`,
    filters: '.filters',
  };

  const identificators = {
    class: {
      favorite: 'favorite',
      bookImage: 'book__image',
      hidden: 'hidden',
    },
    attributes: {
      bookImageDataId: 'data-id',
    },
  };

  const templates = {
    templateBook: Handlebars.compile(
      document.querySelector(select.templateOf.templateBook).innerHTML
    ),
  };

  let favoriteBooks = [];
  let filters = [];

  function initActions() {
    const booksList = document.querySelector(select.booksList);
    booksList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const target = event.target.offsetParent;

      if (target.classList.contains(identificators.class.bookImage)) {
        const dataId = target.getAttribute(
          identificators.attributes.bookImageDataId
        );

        if (!favoriteBooks.includes(dataId)) {
          target.classList.add(identificators.class.favorite);
          favoriteBooks.push(dataId);
        } else {
          favoriteBooks = favoriteBooks.filter((id) => id !== dataId);
          target.classList.remove(identificators.class.favorite);
        }
      }
    });

    const filtersDOMElement = document.querySelector(select.filters);
    filtersDOMElement.addEventListener('click', function (event) {
      if (event.target.type === 'checkbox') {
        if (event.target.checked) {
          filters.push(event.target.value);
        } else {
          filters = filters.filter((item) => item !== event.target.value);
        }

        filterBooks();
      }
    });
  }

  function clearActiveBooks() {
    const booksList = document.querySelectorAll(select.booksImagesHidden);
    booksList.forEach((book) =>
      book.classList.remove(identificators.class.hidden)
    );
  }

  function filterBooks() {
    clearActiveBooks();

    for (const book of dataSource.books) {
      let shouldBeHidden = false;

      for (const filter of filters) {
        if (!book.details.adults && !book.details.nonFiction) {
          break;
        }

        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      const targetBook = document.querySelector(select.bookImage(book.id));

      if (shouldBeHidden) {
        targetBook.classList.add(identificators.class.hidden);
      }
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
