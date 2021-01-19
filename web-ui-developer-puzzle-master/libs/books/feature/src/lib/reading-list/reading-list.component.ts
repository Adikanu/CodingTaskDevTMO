import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { 
  getReadingList, 
  removeFromReadingList,
  toggleMarkedAsRead,
  unToggledMarkedAsRead
} from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { take } from 'rxjs/operators';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  onRemoveFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  onToggledMarkedAsRead(item : ReadingListItem){
    const readStatus = item.finished? 'unread' : 'read';
    const message = `${item.title} marked as ${readStatus}`;
    this.store.dispatch(toggleMarkedAsRead({ item}));

    const snackBarRef = this.snackBar.open(message , 'Undo' , { duration: 5000});

    snackBarRef.onAction().pipe(take(1)).
    subscribe(() => this.store.dispatch(unToggledMarkedAsRead({item})))
  }
}
