
import { Slot } from "../services/slot";
import { Candidate } from "./candidate";


export type BookingStatus = 'CONFIRMED' | 'CANCELLED';

export interface Booking {
  id: number;
  candidate: Candidate;
  slot: Slot;
  status: BookingStatus;
  createdAt: string;
  cancelledAt: string | null;
}

export interface BookingRequest {
  candidateId: number;
  slotId: number;
}

export interface ApiError {
  status: number;
  error: string;
  message: string;
  timestamp: string;
  fieldErrors?: { [key: string]: string };
}
