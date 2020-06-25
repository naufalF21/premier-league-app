import 'regenerator-runtime';

// styles
import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import './styles/styles.css';

// folder
import loadNav from './view/nav';
import loadPages from './view/pages';

// ServiceWorker
import * as checkSw from './checkSw';

$(document).ready(() => {
	M.AutoInit();
	loadNav();

	let page = window.location.hash.substr(1);
	if (page === '') page = 'home';
	loadPages(page);
});

// REGISTER SERVICE WORKER
if (!('serviceWorker' in navigator)) {
	console.log('ServiceWorker belum didukung browser ini.');
} else {
	checkSw.registerServiceWorker();
	checkSw.requestPermission();
}
