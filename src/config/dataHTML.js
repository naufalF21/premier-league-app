export const standingsHTML = (data) => {
	let standingsHTML = '';
	const standingsClub = data.standings[0].table;
	standingsClub.forEach((club) => {
		standingsHTML += `
					<tr>
						<td>${club.position}</td>
						<td class="valign-wrapper" style="display: flex">
							<img src="${club.team.crestUrl.replace(/^http:\/\//i, 'https://')}"/>
							<span>${club.team.name}</span>
						</td>
						<td class="center">${club.playedGames}</td>
						<td class="center">${club.won}</td>
						<td class="center">${club.draw}</td>
						<td class="center">${club.lost}</td>
						<td class="center">${club.goalsFor}</td>
						<td class="center">${club.goalsAgainst}</td>
						<td class="center">${club.goalDifference}</td>
						<td class="center">${club.points}</td>
					</tr>
				`;
	});
	$('#standings').html(standingsHTML);
};

export const allClubsHTML = (data) => {
	let clubsHTML = '';
	const teams = data.teams;
	teams.forEach((team, index) => {
		if (team.venue === null) team.venue = '-';
		if (team.crestUrl === null) team.crestUrl = '';

		team.crestUrl = team.crestUrl.replace(/^http:\/\//i, 'https://');

		clubsHTML += `
			<tr>
				<td>${index + 1}</td>
				<td>
					<a href="./profile.html?id=${team.id}" class="valign-wrapper">
						<img src="${team.crestUrl}" alt="${team.name}"/>
						<span>${team.name}</span>
					</a>
				</td>
				<td>${team.venue}</td>
				<td>${team.address}</td>
			</tr>
		`;
	});

	$('#clubs').html(clubsHTML);
};

export const clubsByIdHTML = (club) => {
	if (club.phone === null) club.phone = '-';
	if (club.founded === null) club.founded = '-';
	if (club.venue === null) club.venue = '-';

	$('.card-image').html(`<img src="${club.crestUrl}" alt="${club.name}" />`);
	$('.card-title').html(club.name);
	$('#club-founded').html(`Founded: ${club.founded}`);

	let clubInfoData = `
		<tr>
			<td>${club.venue}</td>
			<td>${club.address}</td>
			<td>${club.phone}</td>
			<td>${club.website}</td>
			<td>${club.clubColors}</td>
		</tr>
	`;
	$('#club-info').html(clubInfoData);

	let squadHTML = '';
	club.squad.forEach((squad, index) => {
		squad.dateOfBirth = new Date(squad.dateOfBirth).toLocaleDateString();
		if (squad.position === null) squad.position = '-';
		squadHTML += `
			<tr>
				<td>${index + 1}</td>
				<td>${squad.name}</td>
				<td>${squad.position}</td>
				<td>${squad.dateOfBirth}</td>
				<td>${squad.nationality}</td>
				<td>${squad.role}</td>
			</tr>
		`;
	});
	$('#club-squad').html(squadHTML);
};

export const savedClubsHTML = (clubs) => {
	if (clubs.length < 1) $('.saved').css('height', '100vh');
	if (clubs.length === 1) $('#saved-pages').addClass('full');
	if (clubs.length > 0) $('#none').css('display', 'none');

	let savedClubsHTML = '';
	clubs.forEach((club) => {
		savedClubsHTML += `
			<div class="card">
				<a href="./profile.html?id=${club.id}&saved=true">
				<div class="card-image waves-effect waves-block waves-light">
					<img src="${club.crestUrl}" />	
				</div>
				</a>
				<hr />
				<div class="card-content">
					<span class="card-title">${club.name}</span>
					<span>Founded: ${club.founded}</span>
				</div>
			</div>
		`;
	});

	$('#saved-clubs').html(savedClubsHTML);
};

export const matchesHTML = (data) => {
	let matchesHTML = '';
	const matchesClub = data.matches;
	matchesClub.forEach((match) => {
		match.utcDate = new Date(match.utcDate).toLocaleString();
		const score = match.score.fullTime;
		if (score.homeTeam === null) score.homeTeam = 'Not available';
		if (score.awayTeam === null) score.awayTeam = 'Not available';
		matchesHTML += `
			<tr id=${match.matchday}>
				<td class="center">${match.matchday}</td>
				<td>${match.utcDate}</td>
				<td>${match.group}</td>
				<td>${match.homeTeam.name}</td>
				<td>${score.homeTeam}-${score.awayTeam}</td>
				<td>${match.awayTeam.name}</td>
			</tr>
		`;
	});

	let matchday = '';
	for (let i = 1; i < 39; i++) {
		matchday += `<li><span>${i}</span></li>`;
	}

	const dropdown = $('#dropdown1');
	dropdown.on('click', (e) => {
		let num = e.target.innerText;
		const matches = $('#matches tr');
		for (let match of matches) {
			match.classList.remove('hidden');
			if (match.id !== num) {
				match.classList.add('hidden');
			}
		}
	});

	$('#matches').html(matchesHTML);
	$('#dropdown1').html(matchday);
};
