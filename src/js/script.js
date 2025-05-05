
{
  'use strict';

  
  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    booksList: '.books-list'
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML)
  };
  
  function render() {
    const bookList = document.querySelector(select.booksList);

    dataSource.books.forEach(book => {
      const generatedHTML = templates.templateBook(book);
      const generatedListElement = utils.createDOMFromHTML(generatedHTML);
      bookList.appendChild(generatedListElement);
    });
  }

  render();
}