import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Candidate, CandidateRequest } from '../models/candidate.model';

@Injectable({ providedIn: 'root' })
export class CandidateService {
  private url = `${environment.apiUrl}/candidates`;

  constructor(private http: HttpClient) {}

  //register first time
  create(data: CandidateRequest): Observable<Candidate> {
    return this.http.post<Candidate>(this.url, data);
  }

  //if candidate already exists — find by email
  getByEmail(email: string): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.url}/email/${email}`);
  }
}
