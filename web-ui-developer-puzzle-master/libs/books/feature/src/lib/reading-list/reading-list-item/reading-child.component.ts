import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-read-child',
  templateUrl: './reading-child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadChildComponent {
  @Input() book: ReadingListItem;
  @Output() removedFromReadingList = new EventEmitter<ReadingListItem>();
  @Output() markedAsRead = new EventEmitter<ReadingListItem>();
  @Output() toggledMarkedAsRead = new EventEmitter<ReadingListItem>();

  removeFromReadingList(book: ReadingListItem) {
    this.removedFromReadingList.emit(book);
  }

  toggleMarkedAsRead(book: ReadingListItem) {
    this.toggledMarkedAsRead.emit(book);
  }
}