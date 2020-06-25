import Main from './main';

const loadPages = async (page) => {
	try {
		const response = await fetch(`src/pages/${page}.html`);
		const data = await response.text();
		let status = response.status;
		const content = $('.body-content');

		switch (status) {
			case 200:
				// muat konten html
				content.html(data);
				Main();

				break;
			case 404:
				content.html('<p>Halaman tidak ditemukan.</p>');
				break;
			default:
				content.html('<p>Halaman tidak dapat diakses</p>');
		}
	} catch (error) {
		console.log(error);
	}
};

export default loadPages;
