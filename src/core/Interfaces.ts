export interface Customer {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  date: Date;
  customer_id: number;
  items: string;
}

export interface InsertData {
  customers: Customer[];
  orders: Order[];
}
