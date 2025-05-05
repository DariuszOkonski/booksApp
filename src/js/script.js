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

  class BookList {
    constructor() {
      this.favoriteBooks = [];
      this.filters = [];
      this.dom = {};

      this.initData();
    }

    initData() {
      this.data = dataSource.books;

      this.getElements();
      this.render();
      this.initActions();
    }

    getElements(id) {
      if (!id) {
        this.dom.booksList = document.querySelector(select.booksList);
        this.dom.filters = document.querySelector(select.filters);
      }
      this.dom.singleBook = document.querySelector(select.bookImage(id));
    }

    initActions() {
      this.dom.booksList.addEventListener('dblclick', (event) => {
        event.preventDefault();
        const target = event.target.offsetParent;

        if (target.classList.contains(identificators.class.bookImage)) {
          const dataId = target.getAttribute(
            identificators.attributes.bookImageDataId
          );

          if (!this.favoriteBooks.includes(dataId)) {
            target.classList.add(identificators.class.favorite);
            this.favoriteBooks.push(dataId);
          } else {
            this.favoriteBooks = this.favoriteBooks.filter(
              (id) => id !== dataId
            );
            target.classList.remove(identificators.class.favorite);
          }
        }
      });

      this.dom.filters.addEventListener('click', (event) => {
        if (event.target.type === 'checkbox') {
          if (event.target.checked) {
            this.filters.push(event.target.value);
          } else {
            this.filters = this.filters.filter(
              (item) => item !== event.target.value
            );
          }

          this.filterBooks();
        }
      });
    }

    filterBooks() {
      for (const book of dataSource.books) {
        let shouldBeHidden = false;

        for (const filter of this.filters) {
          if (!book.details.adults && !book.details.nonFiction) {
            break;
          }

          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        this.getElements(book.id);

        if (
          this.dom.singleBook.classList.contains(identificators.class.hidden)
        ) {
          this.dom.singleBook.classList.remove(identificators.class.hidden);
        }

        if (shouldBeHidden) {
          this.dom.singleBook.classList.add(identificators.class.hidden);
        }
      }
    }

    determineRatingBgc(rating) {
      if (rating <= 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }

      if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }

      if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }

      if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }

    render() {
      this.data.forEach((book) => {
        const ratingBgc = this.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;

        const generatedHTML = templates.templateBook(book);
        const generatedListElement = utils.createDOMFromHTML(generatedHTML);
        this.dom.booksList.appendChild(generatedListElement);
      });
    }
  }

  new BookList();
}
