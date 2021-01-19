import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const init = createAction('[Reading List] Initialize');

export const loadReadingList = createAction('[Reading List] Load list');

export const loadReadingListSuccess = createAction(
  '[Reading List API] Load list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListError = createAction(
  '[Reading List API] Load list error',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Books Search Results] Add to list',
  props<{ book: Book }>()
);

export const failedAddToReadingList = createAction(
  '[Reading List API] Failed add to list',
  props<{ book: Book }>()
);

export const confirmedAddToReadingList = createAction(
  '[Reading List API] Confirmed add to list',
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  '[Books Search Results] Remove from list',
  props<{ item: ReadingListItem }>()
);

export const failedRemoveFromReadingList = createAction(
  '[Reading List API] Failed remove from list',
  props<{ item: ReadingListItem }>()
);

export const confirmedRemoveFromReadingList = createAction(
  '[Reading List API] Confirmed remove from list',
  props<{ item: ReadingListItem }>()
);

export const toggleMarkedAsRead = createAction(
  '[Reading List] Mark as read',
  props<{item : ReadingListItem }>()
);

export const failedToggleMarkedAsRead = createAction(
  '[Reading List] Mark as read',
  props<{item : ReadingListItem }>()
);

export const unToggledMarkedAsRead = createAction(
  '[Reading List] Undo toggled marked as read',
  props<{item : ReadingListItem }>()
);

export const confirmedMarkedAsRead = createAction(
  '[Reading List] Confirmed mark as read',
  props<{ item: ReadingListItem }>()
);