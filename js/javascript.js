
var Library = function() {};

Library.prototype.myBookArr = [];

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
  if (books.length > 0) {
    return books;
  } else {
    return null;
  }
};

Library.prototype.getBooksByAuthor = function(author) {
  var books = [];
  for (i = 0; i < this.myBookArr.length; i++) {
    if (this.myBookArr[i].author.toLowerCase().indexOf(author.toLowerCase()) > -1 && author) {
      books.push(this.myBookArr[i]);
    }
  }
  if (books.length > 0) {
    return books;
  } else {
    return null;
  }
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

Library.prototype.populateStorage = function(key) {
    localStorage.setItem(key, JSON.stringify(this.myBookArr));
  };

Library.prototype._populateCatalog = function(library) {
  var $table = $(".library-table");
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

Library.prototype._handleAddBook = function() {
  var newBook = {
    title: $("#add-title").val(),
    author: $("#add-author").val(),
    numPages: $("#add-pages").val(),
    pubDate: $("#add-date").val(),
  };
  this.addBook(newBook);
};

Library.prototype._submitSearchData = function() {

  function pageOperatorFunction() {
		if(document.getElementById("less").checked) {
				return ("lessthan");
			}
			else if (document.getElementById("greater").checked) {
				return ("greaterthan");
			}
			else {
				return ("equals");
			}
		};
  var pageOperator = pageOperatorFunction();

  function dateOperatorFunction() {
		if(document.getElementById("before").checked) {
				return ("lessthan");
			}
			else if (document.getElementById("after").checked) {
				return ("greaterthan");
			}
			else {
				return ("equals");
			}
		};
  var dateOperator = dateOperatorFunction();
  var searchBook = {
    title: $("#srch-title").val(),
    author: $("#srch-author").val(),
    pageOp: pageOperator,
    pages: $("#srch-pages").val(),
    dateOp: dateOperator,
    date: $("#srch-pubdate").val()
  };

	this._compare(searchBook);
};

Library.prototype._compare = function(obj) {
  var title = false;
  var author = false;
  var pages = false;
  var date = false;
  var array = this.myBookArr;
  var results = [];
  for (i = 0; i < array.length; i++) {
    if (!obj.title || obj.title === array[i].title) {
      title = true;
    }
    if (!obj.author || obj.author === array[i].author) {
      author = true;
    }
    if (!obj.pages || obj.pages == array[i].numPages) {
      pages = true;
    }
    if (!obj.date || obj.date == array[i].pubDate) {
      date = true;
    }
    if (title && author && pages && date) {
      results.push(array[i]);
    }

    title = false;
    author = false;
    pages = false;
    date = false;
  }
  console.log(results);
  if (results.length > 0) {
    this._populateSearchResults(results);
  }
  else {
  }
}

Library.prototype._populateSearchResults = function(results) {
  var $table = $(".results-table");
  for(i = 0; i < results.length; i++) {
    var newRow = $("<tr>");
    var newTitle = $("<td>").text(results[i].title);
    var newAuthor = $("<td>").text(results[i].author);
    var newPages = $("<td>").text(results[i].numPages);
    var newPubDate = $("<td>").text(results[i].pubDate);
    newRow.append(newTitle);
    newRow.append(newAuthor);
    newRow.append(newPages);
    newRow.append(newPubDate);
    $table.append(newRow);
  };
};

Library.prototype._bindEvents = function() {
  $("#search-submit").on("click", $.proxy(this._submitSearchData, this));
  $(".btn .addbook").on("click", $.proxy(this._handleAddBook(), this));
  $("addlist").on("click", $.proxy(this.newFunction, this));
  $("removetitle").on("click", $.proxy(this.newFunction, this));
  $("removeauthor").on("click", $.proxy(this.newFunction, this));
};

Library.prototype._checkLocalStorage = function() {
  if(localStorage) {
    var vLibrary = JSON.parse(localStorage.getItem("vLibrary")) || new Array();
    this.myBookArr = vLibrary;
    this._populateCatalog(vLibrary);
  };
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
