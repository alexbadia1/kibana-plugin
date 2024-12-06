import React, { useContext, useEffect, useState } from 'react';

// My libraries
import { SearchQueryContext } from '../../context/SearchQueryProvider';

export function SearchBar() {
  const { updateSearchQuery } = useContext(SearchQueryContext);
  const [input, setInput] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      updateSearchQuery(input);
    }, 100);

    return () => {
      clearTimeout(timerId);
    };
  }, [input]);

  return (
    <div id="cs598-search-bar">
      <input
        type="text"
        id="cs598-search-bar__input"
        placeholder="Starting with..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}

