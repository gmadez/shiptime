import { Contact, InvoiceItem, LineItem, Money } from "./types";

export interface PickupDetail {
  location: string;
  otherLocation?: string;
  pickupTip?: Money;
  pickupDate: string;
  readyTime: string;
  closeTime: string;
}

export interface DeclaredValue {
  currency: string;
  amount: number;
}

export interface DutiesAndTaxes {
  dutiable: boolean;
  paidBy: string;
}

export interface CustomsInvoice {
  invoiceContact: Contact & {
    customsBroker?: string;
    shipperTaxId?: string;
    recipientTaxId?: string;
    iorTaxId?: string;
  };
  dutiesAndTaxes: DutiesAndTaxes;
  currency: string;
  invoiceItems?: InvoiceItem[];
  reasonForExport: string;
}

export interface RateRequest {
  from: Contact;
  to: Contact;
  packageType: string;
  lineItems: LineItem[];
  unitOfMeasurement: string;
  serviceOptions: string[];
  shipDate: string;
  insuranceType: string;
  customsInvoice: CustomsInvoice;
  waitTimeLimit: number;
}

export interface ShipmentsRequest {
  rateRequest: RateRequest;
  carrierId: string;
  serviceId: string;
  quoteId: string;
  pickupDetail: PickupDetail;
}

export default ShipmentsRequest;