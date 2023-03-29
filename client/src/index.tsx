import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import ReactDOM from 'react-dom/client';
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from './Api/Reducers/rootReducer';
import App from './App';
import { ModalContextProvider } from './hooks/Modal/ModalContext';
import { ToastContextProvider } from './hooks/Toasts/ToastContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const makeStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }),
    devTools: true,
    preloadedState
  })
}

const store = makeStore(); 


root.render(
  <Provider store={store}>
    <ModalContextProvider>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
    </ModalContextProvider>
  </Provider>
);


export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();