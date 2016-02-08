if (window.applicationCache) {
  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      var notif = document.createElement('a');
      notif.href = '#';
      notif.className = 'notif';
      notif.innerHTML = 'Programme updated - tap to reload';
      notif.addEventListener('click', function(e) {
	  e.preventDefault();
	  location.reload();
	  return false;
      });
      add_class(document.body, 'notif-container');
      document.body.appendChild(notif);
    }
  });

  (function() {
    try {
      window.applicationCache.update();
    } catch(e) {
      // cache might not have been loaded yet
    }
    setTimeout(arguments.callee, 60000);
  })();
}
