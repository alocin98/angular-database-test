export interface Customer {
  customer_id: number;
  customer_name: string;
}

export interface Item {
  item_id: number;
  item_name: string;
  item_price: number;
}

export interface Shipment {
  shipment_id: number;
  order: Order;
  shipment_date: Date;
}

export interface Order {
  order_id: number;
  order_date: Date;
  customer: Customer;
  items: Item[];
}

export interface InsertData {
  customers: Customer[];
  items: Item[];
  orders: Order[];
  shipments: Shipment[];
}
