import { Credentials } from '../Models/Interfaces/Credentials';
import { Account } from '../Models/Interfaces/Account';
import { Player } from '../Models/Interfaces/Player';
import { RegistrationDetails } from '../Models/Interfaces/RegistrationDetails';
import { Tokens } from '../Models/Interfaces/Tokens';
import { getBearerHeader } from './CredentialInputService';

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

export const getActiveTeam = (): Promise<{ activeTeam: Player[] }> => {
  return fetch('/api/activeTeam/players', {
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
