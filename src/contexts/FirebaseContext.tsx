import React, { createContext, useContext } from 'react';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAKmHqgCIX_MFHjYd-n7VxACbKFVkR2LjU',
	authDomain: 'vote-prochain-depart.firebaseapp.com',
	projectId: 'vote-prochain-depart',
	storageBucket: 'vote-prochain-depart.appspot.com',
	messagingSenderId: '172917872522',
	appId: '1:172917872522:web:aa5cbfdd019f3ffef69a73',
};

type FirebaseContextType = {
	app: FirebaseApp | undefined;
	auth: Auth | undefined;
	db: Firestore | undefined;
};

const defaultContext: FirebaseContextType = {
	app: undefined,
	auth: undefined,
	db: undefined,
};

export const FirebaseContext =
	createContext<FirebaseContextType>(defaultContext);

export const FirebaseProvider: React.FC<{ children: JSX.Element }> = ({
	children,
}) => {
	const app = initializeApp(firebaseConfig);

	const db = getFirestore(app);

	const auth = getAuth(app);
	auth.languageCode = 'fr';

	return (
		<FirebaseContext.Provider value={{ app, auth, db }}>
			{children}
		</FirebaseContext.Provider>
	);
};

export const useFirebase = () => useContext(FirebaseContext);
