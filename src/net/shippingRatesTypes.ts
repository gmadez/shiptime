export interface ShippingRate {
  id: string;
  carrier: string;
  service: string;
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
  originAddress: string;
  originCity: string;
  // originZip: string;
  originPostalCode: string;
  originCountry: string;
  destinationAddress: string;
  destinationCity: string;
  // destinationZip: string;
  destinationPostalCode: string;
  destinationCountry: string;
  shippingDate: Date;
  packageType: string;
}

export type Money = {
  currency: string;
  amount: number;
};

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
