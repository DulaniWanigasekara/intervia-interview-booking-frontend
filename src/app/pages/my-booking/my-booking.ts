import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService } from '../../core/services/booking';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';
import { Booking } from '../../core/models/booking.model';

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent],
  templateUrl: `./my-booking.html`
})
export class MyBookingComponent implements OnInit {
  booking: Booking | null = null;
  loading = true;
  showCancelConfirm = false;
  cancelLoading = false;
  cancelError = '';

  constructor(
    public router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    const stored = localStorage.getItem('intervia_candidate');
    if (!stored) { this.loading = false; return; }

    const candidate = JSON.parse(stored);
    this.bookingService.getByCandidate(candidate.id).subscribe({
      next: (bookings) => {
        this.booking = bookings.find(b => b.status === 'CONFIRMED') || null;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  cancelBooking() {
    if (!this.booking) return;
    this.cancelLoading = true;
    this.cancelError = '';

    this.bookingService.cancel(this.booking.id).subscribe({
      next: () => {
        this.cancelLoading = false;
        this.showCancelConfirm = false;
        this.booking = null;
      },
      error: (err) => {
        this.cancelLoading = false;
        this.cancelError = err.error?.message || 'Failed to cancel. Try again.';
      }
    });
  }
}
