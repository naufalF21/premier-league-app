import axios from 'axios';
import * as getData from './dataHTML';
import * as db from './db';

const base_url = 'https://api.football-data.org/v2/';
const options = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET',
	'Access-Control-Allow-Headers': 'x-auth-token, x-response-control',
	'Content-Length': 0,
	'Content-Type': 'text/plain',
	headers: {
		'X-Auth-Token': '9738fa85b54b4f9fbdbaaf342e87a260',
	},
};

const status = (response) => {
	if (response.status !== 200) {
		console.log('Error: ' + response.status);
		return Promise.reject(new Error(response.statusText));
	} else {
		return Promise.resolve(response);
	}
};

const error = (error) => console.log('Error: ' + error);

const preloader = (pages, progress) => {
	$(progress).css('display', 'none');
	$(pages).css('display', 'block');
};

export const getStandings = () => {
	if ('caches' in window) {
		caches
			.match(`${base_url}competitions/2021/standings`)
			.then((response) => {
				if (response) {
					response.json().then((data) => {
						preloader('.standings', '#standings-progress');
						getData.standingsHTML(data);
					});
				}
			});
	}

	axios
		.get(`${base_url}competitions/2021/standings`, options)
		.then(status)
		.then((res) => {
			preloader('.standings', '#standings-progress');
			getData.standingsHTML(res.data);
		})
		.catch(error);
};

export const getAllClubs = () => {
	if ('caches' in window) {
		caches.match(`${base_url}teams`).then((response) => {
			if (response) {
				response.json().then((data) => {
					preloader('.clubs', '#clubs-progress');
					getData.allClubsHTML(data);
				});
			}
		});
	}

	axios
		.get(`${base_url}teams`, options)
		.then(status)
		.then((res) => {
			preloader('.clubs', '#clubs-progress');
			getData.allClubsHTML(res.data);
		})
		.catch(error);
};

export const getClubsById = () => {
	return new Promise((resolve, reject) => {
		// Ambil nilai query parameter (?id=)
		const urlParams = new URLSearchParams(window.location.search);
		const idParam = urlParams.get('id');

		if ('caches' in window) {
			caches.match(`${base_url}teams/${idParam}`).then((response) => {
				if (response) {
					response.json().then((data) => {
						preloader('.profile', '#profile-progress');
						data.id = JSON.stringify(data.id);
						getData.clubsByIdHTML(data);

						// Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
						resolve(data);
					});
				}
			});
		}

		axios
			.get(`${base_url}teams/${idParam}`, options)
			.then(status)
			.then((res) => {
				preloader('.profile', '#profile-progress');
				res.data.id = JSON.stringify(res.data.id);
				getData.clubsByIdHTML(res.data);

				// Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
				resolve(res.data);
			})
			.catch(error);
	});
};

export const getSavedClubs = () => {
	db.getAll().then((clubs) => {
		getData.savedClubsHTML(clubs);
	});
};

export const getSavedClubsById = () => {
	return new Promise((resolve, reject) => {
		const urlParams = new URLSearchParams(window.location.search);
		const idParam = urlParams.get('id');

		db.getById(idParam).then((club) => {
			getData.clubsByIdHTML(club);

			resolve(club);
		});
	});
};

export const getMatches = () => {
	if ('caches' in window) {
		caches.match(`${base_url}competitions/2021/matches`).then((response) => {
			if (response) {
				response.json().then((data) => {
					preloader('.matches', '#matches-progress');
					getData.matchesHTML(data);
				});
			}
		});
	}

	axios
		.get(`${base_url}competitions/2021/matches`, options)
		.then(status)
		.then((res) => {
			preloader('.matches', '#matches-progress');
			getData.matchesHTML(res.data);
		})
		.catch(error);
};

export const removeAddBtn = (id) => {
	db.getAll().then((clubs) => {
		clubs.forEach((club) => {
			if (id === club.id) {
				$('#save').css('display', 'none');
			}
		});
	});
};
