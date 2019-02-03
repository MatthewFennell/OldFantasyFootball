import { PlayerDTO } from '../../Models/Interfaces/Player';
import { CreatePlayer } from '../../Models/Interfaces/CreatePlayer';
import { getBearerHeader } from '.././CredentialInputService';
import { FilterPlayers } from '../../Models/Interfaces/FilterPlayers';

export const getTeamForUserInWeek = (week: number): Promise<PlayerDTO[]> => {
  return fetch('/api/player/week/' + week + '/team', {
    method: 'GET',
    headers: { Authorization: getBearerHeader() }
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }
  });
};

export const getPlayersWithMostPointsInWeek = (week: number): Promise<PlayerDTO> => {
  return fetch('/api/player/points/week/' + week + '/most', {
    method: 'GET',
    headers: { Authorization: getBearerHeader() }
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }
  });
};

export const createPlayer = (data: CreatePlayer): Promise<any> => {
  return fetch('/api/player/make', {
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
    } else if (response.status === 200) {
      return response.json();
    }
  });
};

export const findPlayersInCollegeTeam = (data: string): Promise<PlayerDTO[]> => {
  console.log('sending data ' + JSON.stringify(data));
  return fetch('/api/player/team/' + data, {
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

export const filterPlayers = (data: FilterPlayers): Promise<PlayerDTO[]> => {
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
