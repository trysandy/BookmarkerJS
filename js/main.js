document.getElementById('bookmarkForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {

  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)) {
    return false;
  }

  var objectBookmark = {
    name: siteName,
    url: siteUrl
  }

  if (localStorage.getItem('idBookmarks') === null) {
    var bookmarks = [];
    bookmarks.push(objectBookmark);

    localStorage.setItem('idBookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('idBookmarks'));

    bookmarks.push(objectBookmark);
    localStorage.setItem('idBookmarks', JSON.stringify(bookmarks));
  }

  document.getElementById('bookmarkForm').reset();

  fetchBookmarks();

  e.preventDefault();
}

function deleteBookmarks(url) {
  var bookmarks = JSON.parse(localStorage.getItem('idBookmarks'));

  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }

  localStorage.setItem('idBookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();

}

function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('idBookmarks'));

  var bookmarksResults = document.getElementById('bookmarksResults');

  bookmarksResults.innerHTML = '';

  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">' +
      ' <h3>' + name +
      '   <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a> ' +
      '   <a onclick="deleteBookmarks(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
      ' </h3>' +
      '</div>';
  }
}

function validateForm(siteName, siteUrl) {
  /*
  if (!siteName || !siteUrl) {
    alert('Please fill site name and site url!');
    return false;
  }
  */

  var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regexUrl = new RegExp(expression);

  if (!siteUrl.match(regexUrl)) {
    alert('Please fill with HTTP or HTTPS url');
    return false;
  }

  return true;
}


/*
function validateForm() {
  var siteName = document.forms["bookmarkForm"]["siteName"].value;
  var siteUrl = document.forms["bookmarkForm"]["siteUrl"].value;

  if (siteName == null || siteName == "") {
    alert("Site name is required!");
    return false;
  } else if (siteName.length < 3) {
    alert("Site name must be at least 3 characters!");
    return false;
  } else if (siteUrl == null || siteUrl == "") {
    alert("Site URL is required!");
    return false;
  } else if (siteUrl.length < 3) {
    alert("Site URL must be at least 3 characters!");
    return false;
  }
}
*/
