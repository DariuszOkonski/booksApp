{
  ('use strict');

  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    booksList: '.books-list',
    booksImages: '.books-list .book__image',
    filters: '.filters',
  };

  const identificators = {
    class: {
      favorite: 'favorite',
      bookImage: 'book__image',
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
      }
    });
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
