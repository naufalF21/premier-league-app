import idb from './idb';

const dbPromised = idb.open('pl-app', 1, (upgradeDb) => {
	const clubsObjectStore = upgradeDb.createObjectStore('clubs', {
		keyPath: 'id',
	});
	clubsObjectStore.createIndex('name', 'name', { unique: false });
});

export const saveForLater = (club) => {
	dbPromised
		.then((db) => {
			const tx = db.transaction('clubs', 'readwrite');
			const store = tx.objectStore('clubs');
			store.put(club);
			return tx.complete;
		})
		.then(() => console.log('Data club berhasil disimpan.'));
};

export const deleteClubById = (id) => {
	dbPromised
		.then((db) => {
			var tx = db.transaction('clubs', 'readwrite');
			var store = tx.objectStore('clubs');
			store.delete(id);
			return tx.complete;
		})
		.then(() => {
			console.log('Club removed');
		});
};

export const getAll = () => {
	return new Promise((resolve, reject) => {
		dbPromised
			.then((db) => {
				const tx = db.transaction('clubs', 'readonly');
				const store = tx.objectStore('clubs');
				return store.getAll();
			})
			.then((clubs) => resolve(clubs));
	});
};

export const getById = (id) => {
	return new Promise((resolve, reject) => {
		dbPromised
			.then((db) => {
				var tx = db.transaction('clubs', 'readonly');
				var store = tx.objectStore('clubs');
				return store.get(id);
			})
			.then((club) => {
				resolve(club);
			});
	});
};
