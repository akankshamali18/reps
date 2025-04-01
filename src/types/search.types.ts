/**
 * Interface for a single chat message
 */
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

/**
 * Interface for search results
 */
export interface SearchResult {
  id: string;
  title: string;
  content: string;
  relevance: number;
  source: string;
}

/**
 * Interface for search state
 */
export interface SearchState {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Interface for search component props
 */
export interface SearchProps {
  onSearch: (query: string) => Promise<void>;
  placeholder?: string;
  className?: string;
}

/**
 * Interface for search results component props
 */
export interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  onResultClick: (result: SearchResult) => void;
} 