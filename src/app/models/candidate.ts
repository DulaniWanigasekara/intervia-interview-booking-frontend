export interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface CandidateRequest {
  name: string;
  email: string;
  phone: string;
}
