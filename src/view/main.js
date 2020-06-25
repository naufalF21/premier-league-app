import loadPages from './pages';
import * as api from '../config/api';

const Main = () => {
	M.AutoInit();
	let page;
	page = window.location.hash.substr(1);

	const landingPage = () => {
		const mainTheme = $('#main-theme');
		const pageFooter = $('.page-footer');

		if (page === '') page = 'home';

		mainTheme.removeClass('bg');
		pageFooter.css('display', 'block');

		if (page === 'home') {
			mainTheme.addClass('bg');
			pageFooter.css('display', 'none');
		}
	};

	const redirectBtn = () => {
		$('#redirect-btn').on('click', (e) => {
			page = e.target.getAttribute('href').substr(1);
			loadPages(page);
		});
	};

	const toTopBtn = () => {
		const scrollTop = $('#to-top');

		$(window).scroll(function() {
			// declare variable
			const topPos = $(this).scrollTop();

			// if user scrolls down - show scroll to top button
			if (topPos > 100) {
				$(scrollTop).css('opacity', '1');
			} else {
				$(scrollTop).css('opacity', '0');
			}
		});

		scrollTop.click(function() {
			$('html, body').animate(
				{
					scrollTop: 0,
				},
				800
			);
			return false;
		});
	};

	$(document).ready(() => {
		landingPage();
		redirectBtn();
		toTopBtn();

		api.getStandings();
		api.getAllClubs();
		api.getMatches();
		api.getSavedClubs();
	});
};

export default Main;
