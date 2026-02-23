import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Slot } from '../models/slot';

@Injectable({ providedIn: 'root' })
export class SlotService {
  private url = `${environment.apiUrl}/slots`;

  constructor(private http: HttpClient) {}

  // Fetches all slots — backend returns AVAILABLE, BOOKED, EXPIRED dynamically
  getAll(): Observable<Slot[]> {
    return this.http.get<Slot[]>(this.url);
  }
}
