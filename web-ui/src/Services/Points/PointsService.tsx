import { getBearerHeader } from '.././CredentialInputService';
import { TopWeeklyUser } from '../../Models/Interfaces/TopWeeklyUser';

export const getTotalPoints = (): Promise<number> => {
	return fetch('/api/points/user/total', {
		method: 'GET',
		headers: { Authorization: getBearerHeader() }
	}).then(response => {
		if (response.status === 200) {
			return response.json();
		}
	});
};

export const getAveragePoints = (week: number): Promise<number> => {
	return fetch('/api/points/everybody/week/' + week + '/average', {
		method: 'GET',
		headers: { Authorization: getBearerHeader() }
	}).then(response => {
		if (response.status === 200) {
			return response.json();
		}
	});
};

export const getPointsForUserInWeek = (week: number): Promise<number> => {
	return fetch('/api/points/user/week/' + week, {
		method: 'GET',
		headers: { Authorization: getBearerHeader() }
	}).then(response => {
		if (response.status === 200) {
			return response.json();
		}
	});
};

export const getUsersWithMostPointsInWeek = (week: number): Promise<TopWeeklyUser> => {
	return fetch('/api/points/user/week/' + week + '/most', {
		method: 'GET',
		headers: { Authorization: getBearerHeader() }
	}).then(response => {
		if (response.status === 200) {
			return response.json();
		}
	});
};
