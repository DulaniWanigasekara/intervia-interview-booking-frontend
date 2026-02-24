import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SlotService } from '../../core/services/slot';
import { BookingService } from '../../core/services/booking';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';
import { Slot } from '../../core/models/slot.model';
import { Booking } from '../../core/models/booking.model';

@Component({
  selector: 'app-slots',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent],
  templateUrl: `./slots.html`
})
export class SlotsComponent implements OnInit {
  slots: Slot[] = [];
  myBooking: Booking | null = null;
  selectedSlot: Slot | null = null;
  activeFilter = 'all';
  loading = true;
  loadError = false;
  bookingLoading = false;
  bookingError = '';

  filters = [
    { label: 'All Slots', value: 'all' },
    { label: 'Available', value: 'AVAILABLE' },
    { label: 'Booked', value: 'BOOKED' },
    { label: 'Expired', value: 'EXPIRED' }
  ];

  constructor(
    private slotService: SlotService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSlots();
    this.loadMyBooking();
  }

  loadSlots() {
    this.slotService.getAll().subscribe({
      next: (slots) => { this.slots = slots; this.loading = false; },
      error: () => { this.loadError = true; this.loading = false; }
    });
  }

  loadMyBooking() {
    const stored = localStorage.getItem('intervia_candidate');
    if (!stored) return;
    const candidate = JSON.parse(stored);
    this.bookingService.getByCandidate(candidate.id).subscribe({
      next: (bookings) => {
        this.myBooking = bookings.find(b => b.status === 'CONFIRMED') || null;
      }
    });
  }

  get filteredSlots(): Slot[] {
    if (this.activeFilter === 'all') return this.slots;
    return this.slots.filter(s => s.status === this.activeFilter);
  }

  countByStatus(status: string): number {
    return this.slots.filter(s => s.status === status).length;
  }

  isMySlot(slot: Slot): boolean {
    return this.myBooking?.slot?.id === slot.id;
  }

  onSlotClick(slot: Slot) {
    if (slot.status !== 'AVAILABLE') return;
    const stored = localStorage.getItem('intervia_candidate');
    if (!stored) { this.router.navigate(['/']); return; }
    this.bookingError = '';
    this.selectedSlot = slot;
  }

  closeModal() { this.selectedSlot = null; this.bookingError = ''; }

  confirmBooking() {
    if (!this.selectedSlot) return;
    const candidate = JSON.parse(localStorage.getItem('intervia_candidate')!);
    this.bookingLoading = true;
    this.bookingError = '';

    this.bookingService.create({
      candidateId: candidate.id,
      slotId: this.selectedSlot.id
    }).subscribe({
      next: () => {
        this.bookingLoading = false;
        this.selectedSlot = null;
        this.router.navigate(['/my-booking']);
      },
      error: (err) => {
        this.bookingLoading = false;
        // Display the exact error message from your backend
        this.bookingError = err.error?.message || 'Booking failed. Please try again.';
      }
    });
  }

  slotCardClass(slot: Slot): string {
    if (this.isMySlot(slot)) return 'border-green-400 cursor-default';
    if (slot.status === 'AVAILABLE') return 'border-gray-200 cursor-pointer hover:border-indigo-400 hover:shadow-lg hover:-translate-y-0.5';
    return 'border-gray-100 cursor-default opacity-60';
  }

  topBarClass(slot: Slot): string {
    if (this.isMySlot(slot)) return 'bg-gradient-to-r from-green-400 to-emerald-400';
    if (slot.status === 'AVAILABLE') return 'bg-gradient-to-r from-blue-400 to-indigo-500';
    if (slot.status === 'BOOKED') return 'bg-gray-300';
    return 'bg-gray-200';
  }
}
