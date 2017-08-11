

var submitSearchData = function() {
	var authInput = document.getElementById("author").value ? document.getElementById("author").value : null;
	var pageInput = document.getElementById("pages").value ? document.getElementById("pages").value : null;
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
	var dateInput = document.getElementById("date").value ? new Date(document.getElementById("date").value): null;

	console.log(authInput);
	console.log(pageInput);
	console.log(dateInput);

	searchByFilters(authInput, pageInput, dateInput);
};

var searchByFilters = function(author, pages, pageOperator, date) {

	var results = [];

	if(author) {
		if(pages) {
			if(date) { //filter by author, pages and date
				if (pageOperator == "greaterthan") {
					for (i = 0; i < gLib.myBookArr.length; i++) {
						if (gLib.myBookArr[i].author === author && gLib.myBookArr[i].numPages > pages && gLib.myBookArr[i].pubDate == date) {
							results.push(gLib.myBookArr[i]);
						}
 					}
				}
				else if (pageOperator == "lessthan") {
					for (i = 0; i < gLib.myBookArr.length; i++) {
						if (gLib.myBookArr[i].author === author && gLib.myBookArr[i].numPages < pages && gLib.myBookArr[i].pubDate == date) {
							results.push(gLib.myBookArr[i]);
						}
 					}
				}
				else {
					for (i = 0; i < gLib.myBookArr.length; i++) {
						if (gLib.myBookArr[i].author === author && gLib.myBookArr[i].numPages == pages && gLib.myBookArr[i].pubDate == date) {
							results.push(gLib.myBookArr[i]);
						}
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
			console.log("I got to line 37.");
			console.log(gLib.myBookArr);
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
			if (pageOperator == "greaterthan") {
				for (i = 0; i < gLib.myBookArr.length; i++) {
					if (gLib.myBookArr[i].numPages > pages && gLib.myBookArr[i].pubDate == date) {
						results.push(gLib.myBookArr[i]);
					}
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
