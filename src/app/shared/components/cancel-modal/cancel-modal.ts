import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancel-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cancel-modal.html'
})
export class CancelModalComponent {
  @Input() loading: boolean = false;
  @Input() errorMessage: string = '';

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirm() { this.confirmed.emit(); }
  close() { this.cancelled.emit(); }
}
