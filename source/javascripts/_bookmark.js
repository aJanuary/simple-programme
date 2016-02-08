var articles = document.getElementsByTagName('article');
var storage_expiry = get_storage_expiry();

var bookmarks = load_stored_state();
// If we've just loaded state from the url, we want to immediately persist it to a cookie
store_state();

for (var i = 0, ilen = articles.length; i < ilen; i += 1) {
  var article = articles[i];
  add_button(article);
}

function add_button(article) {
  var event_name = article.id;
  if (!event_name) { return; }

  var button = article.getElementsByTagName('a')[0];

  button.addEventListener('click', toggle, false);

  if (bookmarks[event_name]) {
    add_class(button, 'selected');
  }
}

function toggle(e) {
  e.preventDefault();

  var bttn = e.target;
  var event_name = bttn.parentNode.id;
	  
  if (!bookmarks[event_name]) {
    bookmarks[event_name] = true;
    add_class(bttn, 'selected');
  } else {
    delete bookmarks[event_name];
    remove_class(bttn, 'selected');
  }

  store_state();

  return false;
}

function store_state() {
  var persisted_value = Object.keys(bookmarks).join();

  document.cookie = 'b=' + persisted_value + '; expires = ' + storage_expiry;

  // Mobile safari doesn't share cookies between the website and homescreen versions of a website.
  // To allow users to keep bookmarks they made on the website when they add it to their homescreen,
  // keep track of the bookmarks in the url. On first load, it will read the bookmarks from the url
  // because there is no cookie.
  if (history.pushState) {
    var new_url = window.location.protocol + "//" + window.location.host + window.location.pathname;
    if (persisted_value.length > 0) {
      new_url += '#' + persisted_value;
    }
    window.history.replaceState({path:new_url},'',new_url);
  }
}

function load_stored_state() {
  var event_names = [];

  // First try from the cookie
  var parts = ('; ' + document.cookie).split('; b=');
  if (parts.length == 2) {
    event_names = parts.pop().split(';').shift().split(',');
  } else {
    // If we can't find it from the cookie, look in the query string
    if (window.location.hash) {
      event_names = window.location.hash.split(',');
    }
  }

  var result = {};
  for (var i = 0, ilen = event_names.length; i < ilen; i += 1) {
    if (event_names[i].length > 0) {
      result[event_names[i]] = true;
    }
  }
  return result;
}

function get_storage_expiry() {
  var six_months = 1.577e+10;
  return new Date(new Date().getTime() + six_months).toGMTString();
}

