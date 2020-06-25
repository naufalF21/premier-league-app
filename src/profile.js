import 'regenerator-runtime';

// Styles
import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import './styles/styles.css';

// API Configuration
import * as api from './config/api';
// Indexeddb Configuration
import * as db from './config/db';
// ServiceWorker
import * as checkSw from './checkSw';

$(document).ready(() => {
	const urlParams = new URLSearchParams(window.location.search);
	const isFromSaved = urlParams.get('saved');
	const getId = urlParams.get('id');
	const saveBtn = $('#save');
	const deleteBtn = $('#delete');
	const item = api.getClubsById();
	const savedClub = api.getSavedClubsById();

	if (isFromSaved) {
		saveBtn.css('display', 'none');
		deleteBtn.on('click', () => {
			savedClub.then((club) => db.deleteClubById(club.id));
		});
		api.getSavedClubsById();
	} else {
		deleteBtn.css('display', 'none');
		saveBtn.on('click', () => {
			item.then((club) => {
				db.saveForLater(club);
			});
		});
	}

	api.removeAddBtn(getId);
});

// REGISTER SERVICE WORKER
if (!('serviceWorker' in navigator)) {
	console.log('ServiceWorker belum didukung browser ini.');
} else {
	checkSw.registerServiceWorker();
	checkSw.requestPermission();
}
