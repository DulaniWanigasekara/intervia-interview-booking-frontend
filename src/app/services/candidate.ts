import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Candidate, CandidateRequest } from '../models/candidate';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CandidateService {
  private url = `${environment.apiUrl}/candidates`;

  constructor(private http: HttpClient) {}

  // Called on home page — register if first time
  create(data: CandidateRequest): Observable<Candidate> {
    return this.http.post<Candidate>(this.url, data);
  }

  // Called if candidate already exists — find by email
  getByEmail(email: string): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.url}/email/${email}`);
  }
}
