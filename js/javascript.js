
var Library = function() {};

var Book = function(oArgs){
  this.title = oArgs.title;
  this.author = oArgs.author;
  this.numPages = oArgs.numPages;
  this.pubDate = new Date(oArgs.pubDate);
};

var titleResults = null;
var authorResults = null;
var pageMatch = null;

Library.prototype.myBookArr = [];

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

Library.prototype._bindEvents = function() {
  $("#search-submit").on("click", $.proxy(this._submitSearchData, this));
  $(".addbook-btn").on("click", $.proxy(this._toggleAddBook, this));
  $(".addbooks-btn").on("click", $.proxy(this._toggleAddBooks, this));
  $(".title-btn").on("click", $.proxy(this._toggleRemoveTitle, this));
  $(".author-btn").on("click", $.proxy(this._toggleRemoveAuthor, this));
  $(".addbook-submit").on("click", $.proxy(this._handleAddBook, this));
  $(".addbooks-submit").on("click", $.proxy(this._handleAddBooks, this));
  $(".title-submit").on("click", $.proxy(this._handleRemoveTitle, this));
  $(".author-submit").on("click", $.proxy(this._handleRemoveAuthor, this));
  $(".random-author").on("click", $.proxy(this._handleRandomAuthor, this));
  $(".random-title").on("click", $.proxy(this._handleRandomTitle, this));
  $(".author-list").on("click", $.proxy(this._handleAuthorList, this));
};

Library.prototype._checkLocalStorage = function() {
  this.myBookArr = JSON.parse(localStorage.getItem("vLibrary"));
  if (this.myBookArr == null) {
    this.myBookArr = new Array ();
    this.addBooks([bookOne, bookTwo, bookThree, bookFour, bookFive, bookSix, bookSeven, bookEight, bookNine, bookTen]);
    this.populateStorage("vLibrary");
  }
  this._populateCatalog(this.myBookArr);
};

Library.prototype._populateCatalog = function(library) {
  var $table = $(".library-table");
  $table.empty();
  for(i = 0; i < library.length; i++) {
    var newRow = $("<tr>");
    var newTitle = $("<td>").text(library[i].title);
    var newAuthor = $("<td>").text(library[i].author);
    var newPages = $("<td>").text(library[i].numPages);
    var newPubDate = $("<td>").text(library[i].pubDate.substring(0, 4));
    newRow.append(newTitle);
    newRow.append(newAuthor);
    newRow.append(newPages);
    newRow.append(newPubDate);
    $table.append(newRow);
  };
};

Library.prototype.populateStorage = function(key) {
    localStorage.setItem(key, JSON.stringify(this.myBookArr));
  };

//***************  SEARCH FUNCTIONS  *****************************

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

  // function dateOperatorFunction() {
	// 	if(document.getElementById("before").checked) {
	// 			return ("lessthan");
	// 		}
	// 		else if (document.getElementById("after").checked) {
	// 			return ("greaterthan");
	// 		}
	// 		else {
	// 			return ("equals");
	// 		}
	// 	};
  // var dateOperator = dateOperatorFunction();

  var searchBook = {
    title: $("#srch-title").val(),
    author: $("#srch-author").val(),
    pageOp: pageOperator,
    pages: $("#srch-pages").val(),
    //dateOp: dateOperator,
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

    if (array[i].title.toLowerCase().indexOf(obj.title.toLowerCase()) > -1) {
      titleResults = true;
    }
    if (array[i].author.toLowerCase().indexOf(obj.author.toLowerCase()) > -1) {
      authorResults = true;
    }

    if ((obj.pageOp == "greaterthan" && array[i].numPages > obj.pages) || (obj.pageOp == "lessthan" && array[i].numPages < obj.pages)) {
      pageMatch = true;
    }

    if (!obj.title || titleResults) {
      title = true;
    }
    if (!obj.author || authorResults) {
      author = true;
    }
    if (!obj.pages || pageMatch) {
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
    pageMatch = false;
    titleResults = false;
    authorResults = false;
  }

  if (results.length > 0) {
    this._populateSearchResults(results);
  }
  else {
    alert("No matches found.");
  }
}

Library.prototype._populateSearchResults = function(results) {
  var $table = $(".results-table");
  $table.empty();
  for(i = 0; i < results.length; i++) {
    var newRow = $("<tr>");
    var newTitle = $("<td>").text(results[i].title);
    var newAuthor = $("<td>").text(results[i].author);
    var newPages = $("<td>").text(results[i].numPages);
    var newPubDate = $("<td>").text(results[i].pubDate.slice(0, 4));
    newRow.append(newTitle);
    newRow.append(newAuthor);
    newRow.append(newPages);
    newRow.append(newPubDate);
    $table.append(newRow);
  };
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

Library.prototype._handleRandomAuthor = function() {
  var book = this.getRandomBook();
  var $table = $(".results-table");
  $table.empty();
  var newRow = $("<tr>");
  var newAuthor = $("<td>").text(book.author);
  newRow.append(newAuthor);
  $table.append(newRow);
};

Library.prototype._handleRandomTitle = function() {
  var book = this.getRandomBook();
  var $table = $(".results-table");
  $table.empty();
  var newRow = $("<tr>");
  var newTitle = $("<td>").text(book.title);
  newRow.append(newTitle);
  $table.append(newRow);
};

Library.prototype.getAuthors = function() {
  var authorArray = [];

  for (i = 0; i < this.myBookArr.length; i++)
  dance:
  {
    for (j = 0; j < authorArray.length; j++) {
      if (this.myBookArr[i].author === authorArray[j]) {
        break dance;
      }
    }
    authorArray.push(this.myBookArr[i].author);
  }
    return authorArray;
};

Library.prototype._handleAuthorList = function() {
  var $table = $(".results-table");
  $table.empty();
  var results = this.getAuthors();
  for(i = 0; i < results.length; i++) {
    var newRow = $("<tr>");
    var newAuthor = $("<td>").text(results[i]);
    newRow.append(newAuthor);
    $table.append(newRow);
  };
};

//***************  MANAGE LIBRARY FUNCTIONS  *****************************

Library.prototype._toggleAddBook = function () {
  $(".addbook-btn").click(function() {
    $("#book-form").toggle();
  });
  }

Library.prototype._toggleAddBooks = function () {
  $(".addbooks-btn").click(function() {
    $("#multi-book-form").toggle();
  });
  }

Library.prototype._toggleRemoveTitle = function () {
  $(".title-btn").click(function() {
    $("#remove-title").toggle();
  });
  }

Library.prototype._toggleRemoveAuthor = function () {
  $(".author-btn").click(function() {
    $("#remove-author").toggle();
  });
  }

Library.prototype.addBook = function(book) {

  for (j = 0; j < this.myBookArr.length; j++) {
    if (this.myBookArr[j].title === book.title) {
      return false;
      }
    }
    this.myBookArr.push(book);
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

Library.prototype._handleAddBook = function() {
  var newBook = {
    title: $("#add-title").val(),
    author: $("#add-author").val(),
    numPages: $("#add-pages").val(),
    pubDate: new Date($("#add-date").val()),
  };
  if(newBook.title) {
    this.addBook(newBook);
    this.populateStorage("vLibrary");
    this._checkLocalStorage();
  } else {
    alert("Title field must be filled out.");
  }
  $("#book-form").toggle();
};

Library.prototype._handleAddBooks = function () {
  var books = [];
  $("ul li").each(function () {
    if ($(this).find("input.add-title").val()) {
      var newBook = {
        title: $(this).find("input.add-title").val(),
        author: $(this).find("input.add-author").val(),
        pages: $(this).find("input.add-pages").val(),
        date: $(this).find("input.add-date").val()
      };
      books.push(newBook);
    }
  });
  this.addBooks(books);
  this.populateStorage("vLibrary");
  this._checkLocalStorage();
  $("#multi-book-form").toggle();
};

Library.prototype.removeBookByTitle = function(title) {
  for (i = 0; i < this.myBookArr.length; i++) {
    if (this.myBookArr[i].title.toLowerCase().indexOf(title.toLowerCase()) > -1 && title) {
      this.myBookArr.splice(i, 1);
      alert(title + " was removed from the library.");
      return true;
      $("#remove-title").toggle();
    }
  }
  alert("There are no books in the library with this title.");
  return false;
};

Library.prototype._handleRemoveTitle = function() {
  var title = $(".remove-title-input").val();
  this.removeBookByTitle(title);
  this.populateStorage("vLibrary");
  this._checkLocalStorage();
};

Library.prototype.removeBookByAuthor = function(author) {
  var keepBooks = [];
 
  for (i = 0; i < this.myBookArr.length; i++) {
    const book = this.myBookArr[i];
    if (book.author.toLowerCase() !== author.toLowerCase()) {
      keepBooks.push(book);
    }
  }
  if (keepBooks.length < this.myBookArr.length) {
    alert(this.myBookArr.length - keepBooks.length + " book(s) by " + author + " removed from the library.");
    this.myBookArr = keepBooks;
    return true;
  }
  else {
    alert("There are no books in the library by this author.");
    return false;
  }
};

Library.prototype._handleRemoveAuthor = function() {
  var author = $(".remove-author-input").val();
  this.removeBookByAuthor(author);
  this._populateCatalog(this.myBookArr);
  this.populateStorage("vLibrary");
};

Library.prototype.init = function() {

  this._bindEvents();
  this._checkLocalStorage();
  //you can also set commonly used selectors in the init function (i.e., this.$container = (#Container))
};

//document ready function
$(function (){
  window.vLib = new Library();
  window.vLib.init();
});
