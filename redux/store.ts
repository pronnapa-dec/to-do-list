// redux/store.ts
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type

export default store;
