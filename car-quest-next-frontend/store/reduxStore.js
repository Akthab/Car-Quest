import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
// import menuSlice from './slice/menuSlice';
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import menuSlice from './slice/menuSlice';

// Configure Persist
const persistConfig = {
	key: 'root', // Key under which state is persisted
	storage, // Storage engine (localStorage by default)
};

// Wrap userReducer with persistReducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Configure store with persisted userReducer
const store = configureStore({
	reducer: {
		user: persistedUserReducer,
		menu: menuSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

// Persist the store (optional)
const persistor = persistStore(store);

// Export store and persistor
export { store, persistor };
