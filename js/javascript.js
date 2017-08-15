var Library = function() {};

Library.prototype.myBookArr = [];

Library.prototype.addBook = function(book) {
  for (j = 0; j < this.myBookArr.length; j++) {
    if (this.myBookArr[j].title === book.title) {
      return false;
      }
    }
    this.myBookArr.push(book);
    return true;
};

Library.prototype.addBooks = function(booksArray) {
  var num = 0;
  for (i = 0; i < booksArray.length; i++) {
    if(this.addBook(booksArray[i])) {
        num++;
    }
  }
  return(num + " book(s) have been added to the library.");
};

Library.prototype.removeBookByTitle = function(title) {
  for (i = 0; i < this.myBookArr.length; i++) {
    if (this.myBookArr[i].title.toLowerCase().indexOf(title.toLowerCase()) > -1 && title) {
      this.myBookArr.splice(i, 1);
      alert(title + " was removed from the library.");
      return true;
    }
  }
  alert("There are no books in the library with this title.");
  return false;
};

Library.prototype.removeBookByAuthor = function(author) {
  var booksRemoved = [];
  for (i = 0; i < this.myBookArr.length; i++) {
    if (this.myBookArr[i].author.toLowerCase().indexOf(author.toLowerCase()) > -1 && author) {
      booksRemoved.push(this.myBookArr[i]);
      this.myBookArr.splice(i, 1);
    }
  }
  if (booksRemoved.length > 0) {
    alert(booksRemoved.length + " book(s) by " + author + " removed from the library.");
    return true;
  }
  else {
    alert("There are no books in the library by this author.");
    return false;
  }
};

Library.prototype.getRandomBook = function() {
  var length = this.myBookArr.length;
  if (length > 0) {
    return this.myBookArr[Math.floor(Math.random() * length)]
  }
  else {
    return null;
  }
};

Library.prototype.getBookByTitle = function(title) {
  var books = [];
  for (i = 0; i < this.myBookArr.length; i++) {
      if (this.myBookArr[i].title.toLowerCase().indexOf(title.toLowerCase()) > -1 && title) {
      books.push(this.myBookArr[i]);
    }
  }
  return books;
};

Library.prototype.getBooksByAuthor = function(author) {
  var books = [];
  for (i = 0; i < this.myBookArr.length; i++) {
    if (this.myBookArr[i].author.toLowerCase().indexOf(author.toLowerCase()) > -1 && author) {
      books.push(this.myBookArr[i]);
    }
  }
  return books;
};

Library.prototype.getAuthors = function() {
  var authorArray = [];

  for (i = 0; i < this.myBookArr.length; i++)
  dance:
  {
    for (j = 0; j < authorArray.length; j++) {
      if (this.myBookArr[i].author === authorArray[j]) {
        console.log(this.myBookArr[i].author);
        break dance;
      }
    }
    authorArray.push(this.myBookArr[i].author);
  }
    return authorArray;
};

Library.prototype.getRandomAuthorName = function() {
  return this.getRandomBook().author;
};

var Book = function(oArgs){
  this.title = oArgs.title;
  this.author = oArgs.author;
  this.numPages = oArgs.numPages;
  this.pubDate = new Date(oArgs.pubDate);  //do date conversion when adding the book in
};


window.bookOne = new Book({title: "The Woman in White", author: "Wilkie Collins", numPages: 672, pubDate: "08/16/1860"});
window.bookTwo = new Book({title: "A Crime in the Neighborhood", author: "Suzanne Berne", numPages: 245, pubDate: "05/06/1999"});
window.bookThree = new Book({title: "The Confidential Agent", author: "Graham Greene", numPages: 247, pubDate: "11/01/1939"});
window.bookFour = new Book({title: "Demetrios", author: "Eric Ambler", numPages: 192, pubDate: "09/10/1939"});
window.bookFive = new Book({title: "True Confession", author: "John Gregory Dunne", numPages: 352, pubDate: "12/21/2005"});
window.bookSix = new Book({title: "The Eye of the Beholder", author: "Marc Behm", numPages: 192, pubDate: "12/07/1980"});
window.bookSeven = new Book({title: "A Simple Plan", author: "Scott Smith", numPages: 335, pubDate: "08/31/1993"});
window.bookEight = new Book({title: "Sneaky People", author: "Thomas Berger", numPages: 320, pubDate: "07/01/1975"});
window.bookNine = new Book({title: "The Quiet American", author: "Graham Greene", numPages: 180, pubDate: "12/10/1955"});
window.bookTen = new Book({title: "Cutter and Bone", author: "Newton Thornburg", numPages: 320, pubDate: "03/01/1976"});


Library.prototype.populateStorage = function(key, libArray) {
    localStorage.setItem(key, JSON.stringify(libArray));
  };

//document ready function
$(function (){
  window.vLib = new Library();
  window.vLib.init();
});

Library.prototype.init = function() {
// set up bind events
  this._bindEvents();
  this._checkLocalStorage();
  //you can also set commonly used selectors in the init function (i.e., this.$container = (#Container))
};

Library.prototype._bindEvents = function() {
  $("addbook").on("click", $.proxy(this.newFunction, this));
  $("addlist").on("click", $.proxy(this.newFunction, this));
  $("removetitle").on("click", $.proxy(this.newFunction, this));
  $("removeauthor").on("click", $.proxy(this.newFunction, this));
};

Library.prototype._checkLocalStorage = function() {
  if(localStorage) {
    var vLibrary = JSON.parse(localStorage.getItem("vLibrary"));
    this._populateCatalog(vLibrary);
  };
};

Library.prototype._populateCatalog = function(library) {
  var $table = $("table");
  for(i = 0; i < library.length; i++) {
    var newRow = $("<tr>");
    var newTitle = $("<td>").text(library[i].title);
    var newAuthor = $("<td>").text(library[i].author);
    var newPages = $("<td>").text(library[i].numPages);
    var newPubDate = $("<td>").text(library[i].pubDate);
    newRow.append(newTitle);
    newRow.append(newAuthor);
    newRow.append(newPages);
    newRow.append(newPubDate);
    $table.append(newRow);

  };
};

Library.prototype._handleGetMyName = function() {
  var inputVal = $("input.my-name").val();
  alert(val);
};
