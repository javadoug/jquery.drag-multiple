(function() {

  var i, out, isJs, isCss, path, paths;

  paths = ['libs/jquery/jquery-ui.css', 'libs/jquery/jquery.js', 'libs/jquery/jquery-ui.js'];

  var jqversion = location.search.match(/[?&]jquery=(.*?)(?=&|$)/);
  var uiversion = location.search.match(/[?&]jqueryui=(.*?)(?=&|$)/);

  for (i in paths) {

    path = paths[i];

    isJs = !(isCss = /\.css/i.test(path));

    if (jqversion && isJs) {
      path = 'http://code.jquery.com/jquery-' + jqversion[1] + '.js';
    }

    if (uiversion && isJs) {
      path = 'http://code.jquery.com/jquery-ui-' + uiversion[1] + '.js';
    }

    if (uiversion && isCss) {
      path = 'http://code.jquery.com/jquery-ui-' + uiversion[1] + '.css';
    }

    if (isCss) {
      out = '<link rel="stylesheet" href="' + path + '">';
    } else {
      out = '<script src="' + path + '"></script>';
    }

    document.write(out);

  }

}());
