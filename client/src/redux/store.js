import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productRducer from './reducers/productRducer';
import cardReducer from './reducers/cardReducer';

const rootReducer = combineReducers({
  user: userReducer,
  product: productRducer,
  card: cardReducer,
});

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user'], // Only 'user' reducer will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
