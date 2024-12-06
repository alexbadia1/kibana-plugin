import React, { createContext, useContext, useEffect } from 'react';

// Kibana libraries
import type { CoreStart } from '@kbn/core/public';

// External libraries
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, useInfiniteQuery } from '@tanstack/react-query';

// My Libraries
import { SearchQueryContext } from './SearchQueryProvider';
import { WATCHLIST_HITS_ENDPOINT, WATCHLIST_HITS_PAGE_SIZE } from '../../common/constants';

async function fetchWatchlistHits({ pageParam = 0, queryKey }, http: CoreStart['http']) {
  const [_key, { pageSize, searchQuery }] = queryKey;
  const response = await fetch(
    http.basePath.prepend(
      `${WATCHLIST_HITS_ENDPOINT}?from=${pageParam}&size=${pageSize}&searchquery=${encodeURIComponent(searchQuery)}`
    )
  );
  const data = await response.json();
  return data;
};

interface WatchlistHitsProviderContextProps {
  data: InfiniteData<any> | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<any, unknown>>
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
} 

const WatchlistHitsProviderContext = createContext<WatchlistHitsProviderContextProps>(null!);

interface WatchlistHitsProviderProps {
  children: React.ReactNode;
  http: CoreStart['http'];
}

const WatchlistHitsProvider = ({ children, http }: WatchlistHitsProviderProps) => {
  const { searchQuery } = useContext(SearchQueryContext);
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery(
    ['paginatedData', { pageSize: WATCHLIST_HITS_PAGE_SIZE, searchQuery }],
    (_) => fetchWatchlistHits(_, http),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage && lastPage.length < WATCHLIST_HITS_PAGE_SIZE ? false : allPages.length;
      },
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  useEffect(() => {
    refetch();
  }, [searchQuery, refetch]);

  const initialValue = { 
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
  
  return (
    <WatchlistHitsProviderContext.Provider value={initialValue}>
      {children}
    </WatchlistHitsProviderContext.Provider>
  );
};

export {
  WatchlistHitsProviderContext,
  WatchlistHitsProvider
};