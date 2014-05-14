(function() {

  var i, out, isUi, isJs, isCss, path, paths;

  paths = ['libs/jquery/jquery-ui.css', 'libs/jquery/jquery.js', 'libs/jquery/jquery-ui.js'];

  var jqversion = location.search.match(/[?&]jquery=(.*?)(?=&|$)/);
  var uiversion = location.search.match(/[?&]jqueryui=(.*?)(?=&|$)/);

  for (i in paths) {

    path = paths[i];

    isUi = /-ui/i.test(path);
    isJs = !(isCss = /\.css/i.test(path));

    // http://code.jquery.com/jquery-2.1.1.min.js
    if (jqversion && isJs) {
      path = 'http://code.jquery.com/jquery-' + jqversion[1] + '.js';
    }

    // http://code.jquery.com/ui/1.10.4/jquery-ui.min.js
    if (isUi && uiversion && isJs) {
      path = 'http://code.jquery.com/ui/' + uiversion[1] + '/jquery-ui.js';
    }

    // http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css
    if (isUi && uiversion && isCss) {
      path = 'http://code.jquery.com/ui/' + uiversion[1] + '/themes/smoothness/jquery-ui.css';
    }

    console.log('path is %s', path);

    if (isCss) {
      out = '<link rel="stylesheet" href="' + path + '">';
    } else {
      out = '<script src="' + path + '"></script>';
    }

    document.write(out);

  }

}());
