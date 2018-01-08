//Libraries/Frameworks
import $ from 'jquery';

(window.jQuery === undefined || window.$ === undefined) ? window.jQuery = window.$ = jQuery: $ = window.jQuery;

import 'bootstrap';
import 'jquery-match-height';
import 'jquery-ajax-unobtrusive';
import 'jquery-validation';
import 'jquery-validation-unobtrusive';
import 'underscore';

// import score modules
import Button from './modules/button';
import Modal from './modules/modal';

export const MyScoreUILib = {
	$,
    Button,
    Modal
};

$(document).ready(() => {
  console.log('Webpack Bundle eXeCuteD!');
});
