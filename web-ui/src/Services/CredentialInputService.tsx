import { Tokens } from '../Models/Interfaces/Tokens';

export const isLoggedIn = (): boolean => {
	if (sessionStorage.length === 0) {
		return false;
	}

	return sessionStorage.access !== undefined;
};
export const setTokens = (tokens: Tokens): void => {
	sessionStorage.setItem('access', tokens.access);
	sessionStorage.setItem('refresh', tokens.refresh);
};
export const invalidUsername = (name: string): boolean => {
	return !name.match(/^[0-9a-zA-Z]+$/);
};
export const invalidPasscode = (pass: string): boolean => {
	return !pass.match(/^(?=.*\d).{4,8}$/);
};
export const passcodeTooShort = (pass: string): boolean => {
	return pass.length < 6;
};
export const invalidName = (name: string) => {
	return !name.match(/^[^0-9]+$/);
};
export const emptyFields = (...inputs: string[]): boolean => !inputs.every(Boolean);
export const formatError = (error: string): string => {
	let err: string = error;
	if (err.includes('Error: ')) {
		err = error.substring(7, err.length);
	}
	if (err.charAt(err.length - 1) === '.') {
		err = err.substring(0, err.length - 1);
	}
	return err;
};
export const clearSessionStorage = () => {
	sessionStorage.clear();
};
export const getBearerHeader = () => {
	return 'Bearer ' + sessionStorage.access;
};

export const validCollegeName = (name: string) => {
	return name.match(/^[A-z]+['s]*(\s[A-z]*){0,1}$/);
};

export const validPlayerFirstName = (name: string) => {
	return name.match(/^[A-z]+$/);
};

export const validPlayerSurname = (name: string) => {
	return name.match(/^[A-z]+$/);
};
