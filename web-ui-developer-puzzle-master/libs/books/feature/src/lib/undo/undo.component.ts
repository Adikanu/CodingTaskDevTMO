import { Component, Inject } from '@angular/core';
import {  MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { failedAddToReadingList, failedRemoveFromReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-snackbar',
  templateUrl: './undo.component.html',
})
export class UndoComponent {

    operation: boolean;
   
    undoRemove() {
        const item = this.data;
        this.store.dispatch(failedRemoveFromReadingList({item}));
    }
    undoAdd(){
      this.operation = true; 
      const book = this.data;
      this.store.dispatch(failedAddToReadingList({ book}));
    }

  constructor( 
    private readonly store: Store,
    public snackBarRef: MatSnackBarRef<UndoComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}