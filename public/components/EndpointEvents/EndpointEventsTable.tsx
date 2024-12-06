import React, { useCallback, useContext, useEffect, useRef } from 'react';

// Kibana libraries
import { EuiTitle } from '@elastic/eui';

// My libraries
import { EndpointEventsProviderContext } from '../../context/EndpointEventsProvider';
import { FocusedWatchlistHitContext } from '../../context/FocusedWatchlistHitProvider';

function EndpointEventsTable() {
  const { focusedWatchlistHit } = useContext(FocusedWatchlistHitContext);
  const { 
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useContext(EndpointEventsProviderContext);
  
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
    <div id="cs598-endpoint-table">

    <EuiTitle size="l">
      <h5 style={{fontSize: 16}}> {focusedWatchlistHit?._source?.carbon_black_cloud?.watchlist_hit?.report?.name} </h5>
    </EuiTitle>
      

      {/* Display loading or error */}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}

      {/* List of items */}
      <ul className='list'>
        {data?.pages?.map((endpointEvents) =>
          endpointEvents.map((endpointEvent: any) => {
            if (!endpointEvent?._source?.process) {
              return undefined;
            }
            const pid = endpointEvent?._source?.process?.pid;
            const exec = endpointEvent?._source?.process?.executable;
            const ppid = endpointEvent?._source?.process?.parent?.pid;
            const pexec = endpointEvent?._source?.process?.parent?.executable;
            return (
              <li key={endpointEvent?._id} className="list-item">
                <h5 className="title">{`[ pid=${pid} ] ${exec}`}</h5>
                <p className="description">Parent: {`[ pid=${ppid} ] ${pexec}`}</p>
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

export { EndpointEventsTable };