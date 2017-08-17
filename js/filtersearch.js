
Library.prototype._submitSearchData = function() {
  console.log("I made it this far.");
  // var titleInput = $("#srch-title").val();
	// var authInput = $("#srch-author").val();
	// var pageInput = $("#srch-pages").val();
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
	// var dateInput = $("#srch-pubdate").val();
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

  //var searchObj = new searchBook (titleInput, authInput, pageOperator, pageInput, dateOperator, dateInput);
	this._compare(searchBook);
  console.log(searchBook);
};

Library.prototype._compare = function(obj) {
  var title = true;
  var author = true;
  var pages = true;
  var date = true;
  var array = this.myBookArr;
  var results = [];
  for (i = 0; i < array.length; i++) {
    if (obj.title && !this.getBookByTitle) {
      title = false;
    }
    if (obj.author && !this.getBooksByAuthor) {
      author = false;
    }
    if (obj.pages && obj.pages == !array[i].numPages) {
      pages = false;
    }
    if (obj.date && obj.date == !array[i].pubDate) {
      date = false;
    }
    if (title && author && pages && date) {
      results.push(array[i]);
      console.log(array[i]);
    }
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
