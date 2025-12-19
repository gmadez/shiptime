import { Contact, InvoiceItem, LineItem } from "./types";

export interface DutiesAndTaxes {
  dutiable: boolean;
  paidBy: string;
}

export interface CustomsInvoice {
  invoiceContact: Contact;
  dutiesAndTaxes: DutiesAndTaxes;
  currency: string;
  invoiceItems: InvoiceItem[];
  reasonForExport: string;
}

export interface ShippingRequest {
  from: Contact;
  to: Contact;
  packageType: string;
  lineItems: LineItem[];
  unitOfMeasurement: string;
  serviceOptions?: string[];
  shipDate?: string;
  insuranceType?: string;
  customsInvoice?: CustomsInvoice;
  waitTimeLimit?: number;
}

export default ShippingRequest;
