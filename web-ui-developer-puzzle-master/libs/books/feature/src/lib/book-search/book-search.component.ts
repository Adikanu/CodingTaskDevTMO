import { Component, OnInit , ChangeDetectionStrategy ,OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  undoAddToReadingList,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { take ,debounceTime, distinctUntilChanged  ,takeUntil , tap} from 'rxjs/operators';
import { Book } from '@tmo/shared/models';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';


@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookSearchComponent implements OnInit , OnDestroy{
  books: ReadingListBook[];

  handleSearch$ = new Subject<void>();


  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly sb: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
   
    this.search();
    this.searchForm.get('term').valueChanges.pipe(
      debounceTime(500) ,
      distinctUntilChanged(),
      tap(term => this.searchBooks(term)),
      takeUntil(this.handleSearch$)
      )
    .subscribe();
  }

  search(){
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
      
      const snackBarRef = this.sb.open(
         `${book.title} added!`,
         'Undo',
         { duration: 7000 }
      );

      snackBarRef.onAction().pipe(
        take(1)
      ).subscribe(() => this.store.dispatch(undoAddToReadingList({book})))
    }
  



 

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks(value?: string) {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: value }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy(): void{
    this.handleSearch$.next();
    this.handleSearch$.complete();
  }
}
