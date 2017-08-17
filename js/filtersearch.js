

var submitSearchData = function() {

  var titleInput = $("#srch-title").value;
	var authInput = $("#srch-author").value;
	var pageInput = $("#srch-pages").value;
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
	var dateInput = $("#srch-pubdate").value;
  function dateOperatorFunction() {
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
  var dateOperator = ;
  var library = library;

	searchByFilters(titleInput, authInput, pageInput, pageOperator, dateInput, dateOperator, library);
};

var searchByFilters = function(title, author, pages, pageOp, date, dateOp, library) {

	var results = [];

  if (title && author && pages && date) { // title and author and pages and date
    for (i = 0; i < library.length; i++) {
			if (library[i].title === title && library[i].author === author && library[i].numPages == pages && library[i].pubDate == date) {
				results.push(library[i]);
      }
    }
  }
  if (title && author && pages &&!date) { //title and author and pages
    for (i = 0; i < library.length; i++) {
			if (library[i].title === title && library[i].author === author && library[i].numPages == pages) {
				results.push(library[i]);
      }
    }
  }
  if (title &&!author && pages && date) { //title and pages and date
    for (i = 0; i < library.length; i++) {
			if (library[i].title === title && library[i].numPages == pages && library[i].pubDate == date) {
				results.push(library[i]);
      }
    }
  }
  if (title && author && !pages && !date) { //title and author
    for (i = 0; i < library.length; i++) {
			if (library[i].title === title && library[i].author === author) {
				results.push(library[i]);
      }
    }
  }
  if (title && !author && pages && !date) { //title and pages
    for (i = 0; i < library.length; i++) {
      if (library[i].title === title && library[i].numPages == pages) {
        results.push(library[i]);
      }
    }
  }
  if (title && !author && !pages && date) { //title and date
    for (i = 0; i < library.length; i++) {
			if (library[i].title === title && library[i].pubDate == date) {
				results.push(library[i]);
      }
    }
  }
  if (title && !author && !pages && !date) { // title only
    for (i = 0; i < library.length; i++) {
			if (library[i].title === title) {
				results.push(library[i]);
      }
    }
  }
  if (!title && author && pages && date) {
		for (i = 0; i < library.length; i++) {
			if (library[i].author === author && library[i].numPages == pages && library[i].pubDate == date) {
				results.push(library[i]);
			}
		}
	}
	if (!title && author && pages && !date) { //filter by author and pages
		for (i = 0; i < library.length; i++) {
			if (library[i].author === author && library[i].numPages == pages) {
						results.push(library[i]);
			}
		}
	}
	if (!title && author && !pages && date) { //filter by author and date
		for (i = 0; i < library.length; i++) {
			if (library[i].author === author && library[i].pubDate == date) {
				results.push(library[i]);
			}
		}
	}
	if (!title && author && !pages && !date) { //filter by author only
    for (i = 0; i < library.length; i++) {
			if (library[i].author === author) {
				results.push(library[i]);
			}
    }
  }
	if (!author && !!title && pages && date) { // filter by pages and date
		for (i = 0; i < library.length; i++) {
			if (library[i].numPages == pages && library[i].pubDate == date) {
				results.push(library[i]);
			}
		}
	}
	if (!author && !title && pages && !date) { //filter by pages only
		for (i = 0; i < library.length; i++) {
			if (library[i].numPages == pages) {
				results.push(library[i]);
			}
		}
	}
	if (!author && !title && !pages && date) { // filter by date only
		for (i = 0; i < library.length; i++) {
			if (library[i].pubDate == date) {
				results.push(library[i]);
			}
		}
	}
if(results) {
  return results;
} else {
  return ("No books found.")
}
};
