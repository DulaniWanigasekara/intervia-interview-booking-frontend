import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./status-badge.html`
})
export class StatusBadgeComponent {
  @Input() status: string = '';

  get badgeClass(): string {
    const map: Record<string, string> = {
      AVAILABLE: 'bg-blue-50 text-blue-700',
      CONFIRMED: 'bg-green-50 text-green-700',
      BOOKED:    'bg-gray-100 text-gray-600',
      EXPIRED:   'bg-gray-50 text-gray-400',
      CANCELLED: 'bg-orange-50 text-orange-600'
    };
    return map[this.status] ?? 'bg-gray-100 text-gray-500';
  }

  get dotClass(): string {
    const map: Record<string, string> = {
      AVAILABLE: 'bg-blue-500',
      CONFIRMED: 'bg-green-500',
      BOOKED:    'bg-gray-400',
      EXPIRED:   'bg-gray-300',
      CANCELLED: 'bg-orange-400'
    };
    return map[this.status] ?? 'bg-gray-400';
  }
}
