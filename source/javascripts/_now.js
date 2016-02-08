var timings = [];

var articles = document.getElementsByTagName('article');
for (var i = 0, ilen = articles.length; i < ilen; i += 1) {
  var article = articles[i];
  timings.push(make_timing(article));
}

update_now(true);

function make_timing(article) {
  var timing = {'elem': article};
  var times = article.getElementsByTagName('time');
  for (var i = 0, ilen = times.length; i < ilen; i += 1) {
    var time = times[i];
    timing[time.className] = Date.parse(time.getAttribute('dateTime'));
  }
  return timing;
}

function update_now(scroll_to_now) {
  var now = new Date(new Date().getTime() - (window.debug_offset || 0));
  for (var i = 0, ilen = timings.length; i < ilen; i += 1) {
    var timing = timings[i];
    if (timing.start < now && timing.end > now) {
      add_class(timing.elem, 'now');

      if (scroll_to_now) {
	timing.elem.scrollIntoView(true);

	// Only scroll to the first now
	scroll_to_now = false;
      }
    } else {
      remove_class(timing.elem, 'now');
    }
  }

  setTimeout(update_now, 60000);
}

