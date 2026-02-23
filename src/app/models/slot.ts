import { Interviewer } from './interviewer.model';

export type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'EXPIRED';

export interface Slot {
  id: number;
  interviewer: Interviewer;
  startTime: string;  // comes as ISO string from backend
  endTime: string;
  status: SlotStatus;
}

export interface SlotRequest {
  interviewerId: number;
  startTime: string;
  endTime: string;
}
