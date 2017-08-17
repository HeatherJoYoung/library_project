

var submitSearchData = function() {

	var authInput = document.getElementById("author").value;
	var pageInput = document.getElementById("pages").value;
	var dateInput = document.getElementById("date").value;

	searchByFilters(authInput, pageInput, dateInput);
};

var searchByFilters = function(author, pages, date) {

	var results = [];

	if(author) {
		if(pages) {
			if(date) { //filter by author, pages and date
				for (i = 0; i < gLib.myBookArr.length; i++) {
					if (gLib.myBookArr[i].author === author && gLib.myBookArr[i].numPages == pages && gLib.myBookArr[i].pubDate == date) {
						results.push(gLib.myBookArr[i]);
					}
				}
			}
			else { //filter by author and pages
				for (i = 0; i < gLib.myBookArr.length; i++) {
					if (gLib.myBookArr[i].author === author && gLib.myBookArr[i].numPages == pages) {
						results.push(gLib.myBookArr[i]);
					}
				}
			}
		}
		else if(date) { //filter by author and date
			for (i = 0; i < gLib.myBookArr.length; i++) {
				if (gLib.myBookArr[i].author === author && gLib.myBookArr[i].pubDate == date) {
					results.push(gLib.myBookArr[i]);
				}
			}
		}
		else { //filter by author only
			for (i = 0; i < gLib.myBookArr.length; i++) {
				if (gLib.myBookArr[i].author === author) {
					results.push(gLib.myBookArr[i]);
				}
			}
		}
	}
	else if(pages) {
		if(date) { // filter by pages and date
			for (i = 0; i < gLib.myBookArr.length; i++) {
				if (gLib.myBookArr[i].numPages == pages && gLib.myBookArr[i].pubDate == date) {
					results.push(gLib.myBookArr[i]);
				}
			}
		}
		else { //filter by pages only
			for (i = 0; i < gLib.myBookArr.length; i++) {
				if (gLib.myBookArr[i].numPages == pages) {
					results.push(gLib.myBookArr[i]);
				}
			}
		}
	}
	else { // filter by date only
		for (i = 0; i < gLib.myBookArr.length; i++) {
			if (gLib.myBookArr[i].pubDate == date) {
				results.push(gLib.myBookArr[i]);
			}
		}
	}
console.log(results);
};

//Second version
// var searchByFilters = function(title, author, pages, pageOp, date, dateOp, library) {
//
// 	var results = [];
//
//   if (title && author && pages && date) { // title and author and pages and date
//     for (i = 0; i < library.length; i++) {
// 			if (library[i].title === title && library[i].author === author && library[i].numPages == pages && library[i].pubDate == date) {
// 				results.push(library[i]);
//       }
//     }
//   }
//   if (title && author && pages &&!date) { //title and author and pages
//     for (i = 0; i < library.length; i++) {
// 			if (library[i].title === title && library[i].author === author && library[i].numPages == pages) {
// 				results.push(library[i]);
//       }
//     }
//   }
//   if (title &&!author && pages && date) { //title and pages and date
//     for (i = 0; i < library.length; i++) {
// 			if (library[i].title === title && library[i].numPages == pages && library[i].pubDate == date) {
// 				results.push(library[i]);
//       }
//     }
//   }
//   if (title && author && !pages && !date) { //title and author
//     for (i = 0; i < library.length; i++) {
// 			if (library[i].title === title && library[i].author === author) {
// 				results.push(library[i]);
//       }
//     }
//   }
//   if (title && !author && pages && !date) { //title and pages
//     for (i = 0; i < library.length; i++) {
//       if (library[i].title === title && library[i].numPages == pages) {
//         results.push(library[i]);
//       }
//     }
//   }
//   if (title && !author && !pages && date) { //title and date
//     for (i = 0; i < library.length; i++) {
// 			if (library[i].title === title && library[i].pubDate == date) {
// 				results.push(library[i]);
//       }
//     }
//   }
//   if (title && !author && !pages && !date) { // title only
//     for (i = 0; i < library.length; i++) {
// 			if (library[i].title === title) {
// 				results.push(library[i]);
//       }
//     }
//   }
//   if (!title && author && pages && date) {
// 		for (i = 0; i < library.length; i++) {
// 			if (library[i].author === author && library[i].numPages == pages && library[i].pubDate == date) {
// 				results.push(library[i]);
// 			}
// 		}
// 	}
// 	if (!title && author && pages && !date) { //filter by author and pages
// 		for (i = 0; i < library.length; i++) {
// 			if (library[i].author === author && library[i].numPages == pages) {
// 						results.push(library[i]);
// 			}
// 		}
// 	}
// 	if (!title && author && !pages && date) { //filter by author and date
// 		for (i = 0; i < library.length; i++) {
// 			if (library[i].author === author && library[i].pubDate == date) {
// 				results.push(library[i]);
// 			}
// 		}
// 	}
// 	if (!title && author && !pages && !date) { //filter by author only
//     for (i = 0; i < library.length; i++) {
// 			if (library[i].author === author) {
// 				results.push(library[i]);
// 			}
//     }
//   }
// 	if (!author && !!title && pages && date) { // filter by pages and date
// 		for (i = 0; i < library.length; i++) {
// 			if (library[i].numPages == pages && library[i].pubDate == date) {
// 				results.push(library[i]);
// 			}
// 		}
// 	}
// 	if (!author && !title && pages && !date) { //filter by pages only
// 		for (i = 0; i < library.length; i++) {
// 			if (library[i].numPages == pages) {
// 				results.push(library[i]);
// 			}
// 		}
// 	}
// 	if (!author && !title && !pages && date) { // filter by date only
// 		for (i = 0; i < library.length; i++) {
// 			if (library[i].pubDate == date) {
// 				results.push(library[i]);
// 			}
// 		}
// 	}
// if(results) {
//   return results;
// } else {
//   return ("No books found.")
// }
// };
