import { CreateLeague } from '../../Models/Interfaces/CreateLeague';
import { getBearerHeader } from '../CredentialInputService';
import { LeaguePositions } from '../../Models/Interfaces/LeaguePositions';
import { UserLeaguePosition } from '../../Models/Interfaces/UserLeaguePosition';
import { LeagueAdmin } from '../../Models/Interfaces/LeagueAdmin';

export const getLeaguesAndPositions = (): Promise<LeaguePositions[]> => {
	return fetch('/api/league/user/all', {
		method: 'GET',
		headers: { Authorization: getBearerHeader() }
	}).then(response => {
		if (response.status === 200) {
			return response.json();
		}
	});
};

export const createLeague = (data: CreateLeague): Promise<LeaguePositions> => {
	return fetch('/api/league/make', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json', Authorization: getBearerHeader() }
	}).then(response => {
		if (!response.ok) {
			if (response.status === 400) {
				return response.json().then(json => {
					if (response.ok) {
						return json;
					} else {
						return Promise.reject(json.message);
					}
				});
			} else if (response.status === 500) {
				throw new Error('Internal server error');
			} else {
				throw new Error(response.status.toString());
			}
		} else if (response.status === 201) {
			return response.json();
		}
	});
};

export const joinLeague = (code: string): Promise<LeaguePositions> => {
	return fetch('/api/league/join', {
		method: 'POST',
		body: code,
		headers: { Authorization: getBearerHeader() }
	}).then(response => {
		if (!response.ok) {
			if (response.status === 400) {
				return response.json().then(json => {
					if (response.ok) {
						return json;
					} else {
						return Promise.reject(json.message);
					}
				});
			} else if (response.status === 500) {
				throw new Error('Internal server error');
			} else {
				throw new Error(response.status.toString());
			}
		} else if (response.status === 200) {
			return response.json();
		}
	});
};

export const getPositionsOfUsersInLeague = (leagueName: string): Promise<UserLeaguePosition[]> => {
	return fetch('/api/league/name/' + leagueName + '/ranking', {
		method: 'GET',
		headers: { Authorization: getBearerHeader() }
	}).then(response => {
		if (response.status === 200) {
			return response.json();
		}
	});
};

export const getLeagueAdmin = (leagueName: string): Promise<LeagueAdmin> => {
	return fetch('/api/league/' + leagueName + '/admin', {
		method: 'GET',
		headers: { Authorization: getBearerHeader() }
	}).then(response => {
		if (response.status === 400) {
			return response.json().then(json => {
				if (response.ok) {
					return json;
				} else {
					return Promise.reject(json.message);
				}
			});
		} else if (response.status === 200) {
			return response.json();
		}
	});
};
