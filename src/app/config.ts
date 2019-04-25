import { environment } from '@env/environment';
import { InjectionToken } from '@angular/core';

export const BASE_URL: string = environment.baseUrl;
export const BASE_URL_TOKEN: InjectionToken<string> = new InjectionToken(BASE_URL);
