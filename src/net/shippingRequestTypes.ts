import type { Money } from "./shippingRatesTypes";

export interface Contact {
  companyName: string;
  streetAddress: string;
  streetAddress2?: string;
  city: string;
  countryCode: string;
  state: string;
  postalCode: string;
  attention: string;
  email?: string;
  phone: string;
  instructions?: string;
  residential?: boolean;
  notify?: boolean;
  customsBroker?: string;
  shipperTaxId?: string;
  recipientTaxId?: string;
  iorTaxId?: string;
}

export interface LineItem {
  length: number;
  width: number;
  height: number;
  weight: number;
  declaredValue?: Money;
  description?: string;
  nmfcCode?: string;
  freightClass?: string;
}

export interface DutiesAndTaxes {
  dutiable: boolean;
  paidBy: string;
}

export interface InvoiceItem {
  quantity: number;
  code: string;
  description: string;
  origin?: string;
  provinceOrState?: string;
  unitPrice: number;
  weight: number;
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
