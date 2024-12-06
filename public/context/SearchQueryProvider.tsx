import React, { createContext, useState } from 'react';

interface SearchQueryContextProps {
  searchQuery: string;
  updateSearchQuery: (newSearchQuery: string) => void;
} 

const SearchQueryContext = createContext<SearchQueryContextProps>(null!);

interface SearchQueryProviderProps {
  children: React.ReactNode;
}

const SearchQueryProvider = ({ children }: SearchQueryProviderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const updateSearchQuery = (query: string) => setSearchQuery(query);
  return (
    <SearchQueryContext.Provider value={{ searchQuery, updateSearchQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
};

export {
  SearchQueryContext,
  SearchQueryProvider
};