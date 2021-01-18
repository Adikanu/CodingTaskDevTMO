import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { UndoComponent } from '../undo/undo.component';


@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

   removed = false;

  configSuccess: MatSnackBarConfig = {
    panelClass: 'style-success',
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  };

  constructor(
    private readonly store: Store,
    private readonly sb: MatSnackBar
    ) {}

  removeFromReadingList(item) {
    this.removed = true;
    this.store.dispatch(removeFromReadingList({ item }));
    this.sb.openFromComponent(UndoComponent, {
      data: item,
      ...this.configSuccess
    });
  }

}
