import { Credentials } from '../Models/Interfaces/Credentials';
import { CreateLeague } from '../Models/Interfaces/CreateLeague';
import { Account } from '../Models/Interfaces/Account';
import { TopWeeklyPlayer } from '../Models/Interfaces/TopWeeklyPlayer';
import { WeeklyPlayer } from '../Models/Interfaces/WeeklyPlayer';
import { RegistrationDetails } from '../Models/Interfaces/RegistrationDetails';
import { Tokens } from '../Models/Interfaces/Tokens';
import { getBearerHeader } from './CredentialInputService';
import { TopWeeklyUser } from '../Models/Interfaces/TopWeeklyUser';
import { LeaguePositions } from '../Models/Interfaces/LeaguePositions';
import { UserLeaguePosition } from '../Models/Interfaces/UserLeaguePosition';

export const register = (data: RegistrationDetails): Promise<void> => {
  return fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }).then(response => {
    if (!response.ok) {
      if (response.status === 400) {
        let msg: string = 'name or surname';
        response.json().then(response => {
          msg = response.message.toString();
        });
        throw new Error('Invalid characters in ' + msg + '.');
      } else if (response.status === 409) {
        let msg: string = 'email or username';
        response.json().then(response => {
          msg = response.message.toString();
        });
        throw new Error('User with this ' + msg + ' already exists.');
      } else if (response.status === 500) {
        throw new Error('Sorry, something went wrong!');
      } else {
        throw new Error(response.status.toString());
      }
    }
  });
};

export const login = (data: Credentials): Promise<Tokens> => {
  return fetch('/api/token', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }).then(response => {
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Login Unsuccessful');
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

export const getActiveTeam = (): Promise<{ activeTeam: TopWeeklyPlayer[] }> => {
  return fetch('/api/activeTeam/players', {
    method: 'GET',
    headers: { Authorization: getBearerHeader() }
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }
  });
};

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

export const createLeague = (data: CreateLeague): Promise<any> => {
  console.log('Sending ' + JSON.stringify(data));
  return fetch('/api/league/make', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', Authorization: getBearerHeader() }
  })
    .then(response => {
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Login Unsuccessful');
        } else if (response.status === 500) {
          throw new Error('Internal server error');
        } else {
          throw new Error(response.status.toString());
        }
      } else if (response.status === 201) {
        return response.json();
      }
    })
    .catch(error => console.error(error));
};

export const joinLeague = (code: string): Promise<LeaguePositions> => {
  console.log('Sending ' + JSON.stringify(code));
  return fetch('/api/league/join', {
    method: 'POST',
    body: code,
    headers: { Authorization: getBearerHeader() }
  })
    .then(response => {
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Login Unsuccessful');
        } else if (response.status === 500) {
          throw new Error('Internal server error');
        } else {
          throw new Error(response.status.toString());
        }
      } else if (response.status === 200) {
        return response.json();
      }
    })
    .catch(error => console.error(error));
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

export const getNumberOfWeeks = (): Promise<number> => {
  return fetch('/api/weeks/total', {
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

export const getBalance = (): Promise<{ balance: number }> => {
  return fetch('/api/user/current', {
    method: 'GET',
    headers: { Authorization: getBearerHeader() }
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }
  });
};

export const getUser = (): Promise<Account> => {
  return fetch('/api/user/current', {
    method: 'GET',
    headers: { Authorization: getBearerHeader() }
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }
  });
};

export const deleteUser = (): Promise<void> => {
  return fetch('/api/user/current', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }).then(response => {
    if (response.status === 403) {
      throw new Error('Delete Current User Unsuccessfull: 403 Forbidden!');
    } else if (response.status === 204) {
      throw new Error('User Successfully Deleted');
    }
  });
};
