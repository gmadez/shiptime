export interface Shipment {
  shipId: number;
  trackingNumbers: string[];
  labelUrl: string;
  invoiceUrl?: string;
  carrierTrackingUrl: string;
  pickupConfirmation?: string;
  messages: string[];
}

export default Shipment;
