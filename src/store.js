import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducers from './reducers/rootReducers';

function saveToLocalStorage(state) {
  try {
      if (state.roomReducers.roomInfo) {
          localStorage.setItem('state', JSON.stringify(state));
      }
      else {
          localStorage.setItem('state', null);
      }
  } catch (err) {
      console.log('Error when call function saveToLocalStorage()', err);
  }
}

// Function load state
function loadFromLocalStorage() {
  try {
      const serializedState = localStorage.getItem('state');
      if (!serializedState || serializedState === 'null') return undefined;
      return JSON.parse(serializedState);
  } catch (err) {
      console.log('Error when call function loadFromLocalStorage()', err);
      return undefined;
  }
}

const persistedState = loadFromLocalStorage();

// Create store
const store = createStore(
  rootReducers,
  persistedState,
  applyMiddleware(
      thunkMiddleware
  )
);
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;