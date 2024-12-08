import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedStart, refreshFeedStart } from '@/redux/slice/feedSlice';
import { RootState } from '@/redux/store';
import Header from '@/components/feed/Header';
import Card from '@/components/feed/Card';
import { ITake } from '@/types/Itake';

export default function IndexScreen() {
  const dispatch = useDispatch();
  const { data, isLoading, isRefreshing, hasMore, page } = useSelector((state: RootState) => state.feed);

  useEffect(() => {
    dispatch(fetchFeedStart(0)); // Fetch initial data (page 0)
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(refreshFeedStart());
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      dispatch(fetchFeedStart(page + 1)); // Fetch next page
    }
  };

  const renderFooter = () => {
    if (!isLoading || !hasMore) return null;
    return <ActivityIndicator style={styles.footer} />;
  };

  const renderItem = ({ item }: { item: ITake }) => <Card key={item.id} take={item} />;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#171717" />
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#FFFFFF']}
              tintColor="#FFFFFF"
            />
          }
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#171717',
  },
  footer: {
    paddingVertical: 20,
  },
});

