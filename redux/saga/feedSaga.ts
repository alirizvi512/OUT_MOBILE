import { takeLatest, call, put } from 'redux-saga/effects';
import {
    fetchFeedStart,
    fetchFeedSuccess,
    fetchFeedFailure,
    refreshFeedStart,
    refreshFeedSuccess,
    refreshFeedFailure,
} from './../slice/feedSlice';
import { getFeedTakes } from '@/services/getFeedTakes';
import { PayloadAction } from '@reduxjs/toolkit';
import { ITake } from '@/types/Itake';
// Define the return type of your API call
type FetchResponse = ITake[];

// Generator function for fetching feed
function* fetchFeedSaga(action: PayloadAction<number>): Generator<any, void, FetchResponse> {
    try {
        const page = action.payload;
        const items: FetchResponse = yield call(getFeedTakes, page); // Call your API
        yield put(fetchFeedSuccess({ items, page }));
    } catch (error: any) {
        yield put(fetchFeedFailure(error.message));
    }
}

// Generator function for refreshing feed
function* refreshFeedSaga(): Generator<any, void, FetchResponse> {
    try {
        const items: FetchResponse = yield call(getFeedTakes, 0); // Refresh always fetches page 0
        yield put(refreshFeedSuccess(items));
    } catch (error: any) {
        yield put(refreshFeedFailure(error.message));
    }
}

// Watcher saga
export default function* feedSaga(): Generator {
    yield takeLatest(fetchFeedStart.type, fetchFeedSaga);
    yield takeLatest(refreshFeedStart.type, refreshFeedSaga);
}
