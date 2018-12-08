import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable';
import thunk from 'redux-thunk';
import firebase from 'firebase';
import { reactReduxFirebase } from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

const reduxFirebaseConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  enableRedirectHandling: false
};

const firebaseConfig = {
  apiKey: "AIzaSyCRlNCTUCkmEQn7YrWm1EUfiq4sr7YetA8",
  authDomain: "socar-ddc1f.firebaseapp.com",
  databaseURL: "https://socar-ddc1f.firebaseio.com",
  projectId: "socar-ddc1f",
  storageBucket: "socar-ddc1f.appspot.com",
  messagingSenderId: "245291164436"
};

const fb = firebase.initializeApp(firebaseConfig);


const firebaseEnhancer = compose(
  reactReduxFirebase(fb, reduxFirebaseConfig),
  applyMiddleware(thunk)
);

const enhancer = composeWithDevTools(
  {
    // Options: https://github.com/jhen0409/react-native-debugger#options
  },
)(firebaseEnhancer);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [immutableTransform()],
}

const persistedReducer = persistReducer(persistConfig, reducer)

export default function configureStore(onStore, onAuthReady) {
  const store = createStore(persistedReducer, undefined, enhancer);
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers')
      store.replaceReducer(
        persistReducer(persistConfig, nextRootReducer)
      )
    });
  }
  persistStore(store, null, onStore);
  store.firebaseAuthIsReady.then(onAuthReady);
  return store;
} 