import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Booking, BookingRequest } from '../models/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private url = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  // Create a booking — POST /api/bookings
  create(data: BookingRequest): Observable<Booking> {
    return this.http.post<Booking>(this.url, data);
  }

  // Get candidate's own bookings — GET /api/bookings/candidate/{id}
  getByCandidate(candidateId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.url}/candidate/${candidateId}`);
  }

  // Cancel booking — PATCH /api/bookings/{id}/cancel
  cancel(bookingId: number): Observable<Booking> {
    return this.http.patch<Booking>(`${this.url}/${bookingId}/cancel`, {});
  }
}
