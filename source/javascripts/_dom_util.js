function toggle_class(elem, cls) {
  if (has_class(elem, cls)) {
    remove_class(elem, cls);
  } else {
    add_class(elem, cls);
  }
}

function has_class(elem, cls) {
  return elem.className.indexOf(cls) !== -1;
}

function add_class(elem, cls) {
  elem.className += ' ' + cls;
}

function remove_class(elem, cls) {
  elem.className = elem.className.replace(' ' + cls, '');
}

