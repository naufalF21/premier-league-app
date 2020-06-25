import loadPages from './pages';

const loadNav = () => {
	return fetch('src/components/nav.html')
		.then((response) => response.text())
		.then((data) => {
			// muat nav
			$('.topnav, .sidenav').html(data);

			// daftarkan event listener untuk nav
			$('.sidenav a, .topnav a').on('click', (event) => {
				// tutup sidenav
				const sidenav = $('.sidenav');
				M.Sidenav.getInstance(sidenav).close();

				// muat konten halaman yang dipanggil
				const pages = event.target.getAttribute('href').substr(1);
				loadPages(pages);
			});
		})
		.catch((error) => console.log(error));
};

export default loadNav;
