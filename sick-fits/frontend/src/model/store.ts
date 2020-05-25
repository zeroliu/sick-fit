import { StoreEnhancer, createStore, combineReducers, AnyAction } from 'redux';
import { MakeStore, createWrapper, HYDRATE } from 'next-redux-wrapper';
import { cartReducer } from './cart';
import { chainReducers } from './utils';

function createRootReducer() {
  const reducer = combineReducers({
    cart: cartReducer,
  });
  const initState = reducer(undefined, { type: '@@INIT' } as AnyAction);

  const nextWrapperReducer = (state = initState, action: AnyAction) => {
    if (action.type === HYDRATE) {
      return { ...state, ...action.payload };
    }
    return state;
  };

  return chainReducers(initState, reducer, nextWrapperReducer);
}

type ReduxWindow = typeof globalThis & {
  __REDUX_DEVTOOLS_EXTENSION__?: () => StoreEnhancer;
};
const reduxWindow = globalThis as ReduxWindow;

const rootReducer = createRootReducer();
export type AppState = ReturnType<typeof rootReducer>;
const makeStore: MakeStore<AppState> = () =>
  createStore(
    rootReducer,
    reduxWindow.__REDUX_DEVTOOLS_EXTENSION__ &&
      reduxWindow.__REDUX_DEVTOOLS_EXTENSION__(),
  );
export const wrapper = createWrapper<AppState>(makeStore, { debug: true });
