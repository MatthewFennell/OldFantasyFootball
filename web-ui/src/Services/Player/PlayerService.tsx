import { TopWeeklyPlayer } from '../../Models/Interfaces/TopWeeklyPlayer';
import { WeeklyPlayer } from '../../Models/Interfaces/WeeklyPlayer';
import { getBearerHeader } from '.././CredentialInputService';
import { FilterPlayers } from '../../Models/Interfaces/FilterPlayers';
import { FilteredPlayer } from '../../Models/Interfaces/FilteredPlayer';

export const getTeamForUserInWeek = (week: number): Promise<WeeklyPlayer[]> => {
  return fetch('/api/player/week/' + week + '/team', {
    method: 'GET',
    headers: { Authorization: getBearerHeader() }
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }
  });
};

export const getPlayersWithMostPointsInWeek = (week: number): Promise<TopWeeklyPlayer> => {
  return fetch('/api/player/points/week/' + week + '/most', {
    method: 'GET',
    headers: { Authorization: getBearerHeader() }
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }
  });
};

export const filterPlayers = (data: FilterPlayers): Promise<FilteredPlayer[]> => {
  console.log('sending data ' + JSON.stringify(data));
  return fetch(
    '/api/player/max/' +
      data.maximum +
      '/min/' +
      data.minimum +
      '/name/' +
      data.name +
      '/position/' +
      data.position +
      '/team/' +
      data.team +
      '/sort/' +
      data.sortBy,
    {
      method: 'GET',
      headers: { Authorization: getBearerHeader() }
    }
  ).then(response => {
    console.log('Response = ' + JSON.stringify(response));
    if (response.status === 200) {
      return response.json();
    }
  });
};
