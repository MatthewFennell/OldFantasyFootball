import { getBearerHeader } from '../CredentialInputService';

export const makeCollegeTeam = (name: string): Promise<void> => {
  return fetch('/api/college/make', {
    method: 'POST',
    body: name,
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
      console.log('in here');
      return response.json();
    }
  });
};
