export interface RSVPData {
  name: string;
  meat: string;
  drink_type: string;
  drink_detail: string;
}

export interface GuestResponse extends RSVPData {
  id: number;
  created_at: string;
}
