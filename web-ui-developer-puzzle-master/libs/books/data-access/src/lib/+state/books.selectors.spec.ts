import { booksAdapter, initialState } from './books.reducer';
import * as BooksSelectors from './books.selectors';
import { createBook } from '@tmo/shared/testing';

describe('Books Selectors', () => {
  let state;

  beforeEach(() => {
    state = {
      books: booksAdapter.addMany(
        [createBook('A'), createBook('B'), createBook('C')],
        {
          ...initialState,
          error: 'Unknown error',
          loaded: true,
          searchTerm: 'Todd Motto'
        }
      )
    };
  });

  describe('Books Selectors', () => {
    it('getBooks() should return the list of Books', () => {
      const results = BooksSelectors.getBooks(state);

      expect(results.length).toBe(3);
      expect(results.map(x => x.id)).toEqual(['A', 'B', 'C']);
    });

    it("getBooksLoaded() should return the current 'loaded' status", () => {
      const result = BooksSelectors.getBooksLoaded(state);

      expect(result).toBe(true);
    });

    it("getBooksError() should return the current 'error' state", () => {
      const result = BooksSelectors.getBooksError(state);

      expect(result).toEqual('Unknown error');
    });

    it('getSearchTerm() should return the current search term' ,() => {
       
      const result = BooksSelectors.getSearchTerm(state);

      expect(result).toEqual('Todd Motto');

    });
  });
});
