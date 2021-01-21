import { $, browser, ExpectedConditions } from 'protractor';

// tslint:disable-next-line:nx-enforce-module-boundaries
import * as ReadingListActions from 'libs/books/data-access/src/lib/+state/reading-list.actions';

// tslint:disable-next-line:nx-enforce-module-boundaries
import {
    initialState,
    readingListAdapter,
    reducer,
    State
} from 'libs/books/data-access/src/lib/+state/reading-list.reducer';
import { createBook, createReadingListItem } from '@tmo/shared/testing';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });
 

  describe('Reading List  Reducer', () => {
    describe('valid Reading List actions', () => {
      let state: State;
  
      beforeEach(() => {
        state = readingListAdapter.setAll(
          [createReadingListItem('A'), createReadingListItem('B')],
          initialState
        );
      });

      it('loadBooksSuccess should load books from reading list', () => {
        const list = [
          createReadingListItem('A'),
          createReadingListItem('B'),
          createReadingListItem('C')
        ];
        const action = ReadingListActions.loadReadingListSuccess({ list });
  
        const result: State = reducer(initialState, action);
  
        expect(result.loaded).toBe(true);
        expect(result.ids.length).toEqual(3);
      });

      it('UndoAddToReadingList should undo book addition to the state', () => {
        const action = ReadingListActions.undoAddToReadingList({
          book: createBook('B')
        });
  
        const result: State = reducer(state, action);
  
        expect(result.ids).toEqual(['A']);
      });
  

      it('UndoRemoveFromReadingList should undo book removal from the state', () => {
        const action = ReadingListActions.undoRemoveFromReadingList({
          item: createReadingListItem('C')
        });
  
        const result: State = reducer(state, action);
         
        expect(result.ids).toEqual(['A', 'B' , 'C']);
      });
    });
  
    describe('unknown action', () => {
      it('should return the previous state', () => {
        const action = {} as any;
  
        const result = reducer(initialState, action);
  
        expect(result).toEqual(initialState);
      });
    });
  })
});
