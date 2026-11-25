
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import {
  initializeApp,
  provideFirebaseApp
} from '@angular/fire/app';

import {
  getAuth,
  provideAuth
} from '@angular/fire/auth';

import {
  getDatabase,
  provideDatabase
} from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyDiAi20PAobScoqNyqOwj64FBnfAUaPHTw',
        authDomain: 'pleitos-nathaly-esdras.firebaseapp.com',
        projectId: 'pleitos-nathaly-esdras',
        storageBucket: 'pleitos-nathaly-esdras.firebasestorage.app',
        messagingSenderId: '925625295597',
        appId: '1:925625295597:web:70e4034bbe80fae566a2e4',
        databaseURL: 'https://pleitos-nathaly-esdras-default-rtdb.firebaseio.com'
      })
    ),

    provideAuth(() => getAuth()),

    provideDatabase(() => getDatabase())
  ]
};

