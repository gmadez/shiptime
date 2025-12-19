import { Money } from "./types";

export interface ShippingRate {
  carrierId: string;
  carrier: string;
  serviceId: string;
  service: string;
  quoteId: string;
  price: number;
  estimatedDays: string;
  logo?: string;
  features: string[];
}

export interface ShippingDetails {
  length: number;
  width: number;
  height: number;
  weight: number;
  originCompanyName: string;
  originAttention: string;
  originStateOrProvince: string;
  originPhoneNumber: string;
  originAddress: string;
  originCity: string;
  originPostalCode: string;
  originCountry: string;
  destinationCompanyName: string;
  destinationAttention: string;
  destinationStateOrProvince: string;
  destinationPhoneNumber: string;
  destinationAddress: string;
  destinationCity: string;
  destinationPostalCode: string;
  destinationCountry: string;
  shippingDate: Date;
  packageType: string;
}

export interface Surcharge {
  price: Money;
  code: string;
  name: string;
}

export interface Tax {
  price: Money;
  code: string;
  name: string;
}

export interface AvailableRate {
  baseCharge: Money;
  surcharges: Surcharge[];
  taxes: Tax[];
  totalCharge: Money;
  totalBeforeTaxes: Money;
  exchangeRate: number;
  carrierId: string;
  carrierName: string;
  serviceId: string;
  serviceName: string;
  transitDays?: number;
  transitDaysMax?: number;
  transitUnit: string;
  cutoffTime?: string;
  accessTimeInterval: string;
  serviceTerms?: string;
  quoteId: string;
  isShipTimeCarrier?: boolean;
}

export interface ShippingRatesResponse {
  availableRates: AvailableRate[];
  messages?: string[];
}

export default ShippingRatesResponse;
