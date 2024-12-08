import { ITake } from '@/types/Itake';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeedState {
    data: ITake[];
    page: number;
    isLoading: boolean;
    isRefreshing: boolean;
    hasMore: boolean;
    error: string | null;
}

const initialState: FeedState = {
    data: [],
    page: 0,
    isLoading: false,
    isRefreshing: false,
    hasMore: true,
    error: null,
};

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        fetchFeedStart(state, action: PayloadAction<number>) {
            state.isLoading = true;
            state.error = null;
        },
        fetchFeedSuccess(state, action: PayloadAction<{ items: ITake[]; page: number }>) {
            const { items, page } = action.payload;
            if (page === 0) {
                state.data = items; // Refresh case
            } else {
                state.data = [...state.data, ...items]; // Pagination case
            }
            state.page = page;
            state.hasMore = items.length > 0; // If no items, no more data
            state.isLoading = false;
        },
        fetchFeedFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        refreshFeedStart(state) {
            state.isRefreshing = true;
        },
        refreshFeedSuccess(state, action: PayloadAction<ITake[]>) {
            state.data = action.payload;
            state.page = 0;
            state.hasMore = true;
            state.isRefreshing = false;
        },
        refreshFeedFailure(state, action: PayloadAction<string>) {
            state.isRefreshing = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchFeedStart,
    fetchFeedSuccess,
    fetchFeedFailure,
    refreshFeedStart,
    refreshFeedSuccess,
    refreshFeedFailure,
} = feedSlice.actions;

export default feedSlice.reducer;
