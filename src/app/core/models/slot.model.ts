export type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'EXPIRED';

export interface Interviewer {
  id: number;
  name: string;
  email: string;
  department: string;
}

export interface Slot {
  id: number;
  interviewer: Interviewer;
  startTime: string;
  endTime: string;
  status: SlotStatus;
}
