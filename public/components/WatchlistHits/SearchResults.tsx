import React, { useCallback, useContext, useEffect, useRef } from 'react';

// My libraries
import { WatchlistHitsProviderContext } from '../../context/WatchlistHitsProvider';
import { FocusedWatchlistHitContext } from '../../context/FocusedWatchlistHitProvider';

function SearchResults() {
  const { updateFocusedWatchlistHit } = useContext(FocusedWatchlistHitContext);
  const { 
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useContext(WatchlistHitsProviderContext);
  
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (loaderRef.current) {
      const bottom = loaderRef.current.getBoundingClientRect().bottom <= window.innerHeight;
      if (bottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div id="cs598-search-results">
      {/* Display loading or error */}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}

      {/* List of items */}
      <ul className='list'>
        {data?.pages?.map((watchlistHits) =>
          watchlistHits.map((watchlistHit: any) => {
            if (!watchlistHit?._source?.carbon_black_cloud?.watchlist_hit?.report) {
              return undefined;
            }
            return (
              <li key={watchlistHit?._id} className="list-item" onClick={() => updateFocusedWatchlistHit(watchlistHit)}>
                <h5 className="title">{watchlistHit?._source?.carbon_black_cloud?.watchlist_hit?.report?.name}</h5>
                <p className="description">External IP: {watchlistHit?._source?.carbon_black_cloud?.watchlist_hit?.device?.external_ip}</p>
                <p className="description">Process ID: {watchlistHit?._source?.process?.pid}</p>
              </li>
            );
          }).filter(Boolean)
        )}
      </ul>

      {/* Scroll loading indicator */}
      <div ref={loaderRef}>
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
};

export { SearchResults };