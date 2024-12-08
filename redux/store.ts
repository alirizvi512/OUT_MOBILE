import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import feedReducer from './slice/feedSlice';
import feedSaga from './saga/feedSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        feed: feedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(feedSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
