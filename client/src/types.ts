export interface MeatItem {
  item: string;
  qty: number;
}

export interface RSVPData {
  name: string;
  meat: string;        // JSON: MeatItem[]
  drink_type: string;  // JSON: string[]
  drink_detail: string;
}

export interface GuestResponse extends RSVPData {
  id: number;
  created_at: string;
}
