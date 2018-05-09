import { InjectionToken } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
export const AUTHORIZATION_SERVER_URL = new InjectionToken<string>('AUTHORIZATION_SERVER_URL');
export const AUTHORIZATION_SERVER_CLIENT_ID = new InjectionToken<string>('AUTHORIZATION_SERVER_CLIENT_ID');
export const AUTHORIZATION_SERVER_CLIENT_SECRET = new InjectionToken<string>('AUTHORIZATION_SERVER_CLIENT_SECRET');

