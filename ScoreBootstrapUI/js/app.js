//Libraries/Frameworks
import 'jquery';

(window.jQuery === undefined || window.$ === undefined) ? window.jQuery = window.$ = jQuery: $ = window.jQuery;

import 'bootstrap';
import 'jquery-match-height';
import 'jquery-ajax-unobtrusive';
import 'jquery-validation';
import 'jquery-validation-unobtrusive';
import 'underscore';

// import score modules
import './modules/button';
import './modules/modal';


$(document).ready(() => {
  console.log('Webpack Bundle eXeCuteD!');
});
