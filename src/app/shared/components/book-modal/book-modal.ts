import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Slot } from '../../../core/models/slot.model';
import { StatusBadgeComponent } from '../status-badge/status-badge';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent],
  templateUrl: './book-modal.html'
})
export class BookModalComponent {
  @Input() slot: Slot | null = null;
  @Input() loading: boolean = false;
  @Input() errorMessage: string = '';

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirm() { this.confirmed.emit(); }
  close() { this.cancelled.emit(); }
}
