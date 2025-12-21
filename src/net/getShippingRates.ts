import type { ShippingRate, ShippingDetails, ShippingRatesResponse } from "@/net/shippingRatesTypes";
import type { Result } from "./types";
import transformShippingRates from "./transformShippingRates";
import mockShippingRates from "../data/mockShippingRates";
import type { ShippingRequest } from "./shippingRequestTypes";
import fetchData from "./fetchData";

const service = "rates/";

export const getShippingRates = async (
  details: ShippingDetails
): Promise<Result<ShippingRate[]>> => {
  let customsInvoce = null;
  // International shipment placeholder data, works for CA to US.
  if (details.originCountry !== details.destinationCountry) {
    customsInvoce = {
      invoiceContact: {
        companyName: details.originCompanyName || details.originAttention,
        streetAddress: details.originAddress,
        city: details.originCity,
        countryCode: details.originCountry,
        state: details.originStateOrProvince,
        postalCode: details.originPostalCode,
        attention: details.originAttention,
        phone: details.originPhoneNumber,
        residential: true,
        notify: true,
      },
      dutiesAndTaxes: {
        dutiable: true,
        paidBy: "CONSIGNEE",
      },
      currency: "CAD",
      reasonForExport: "COMMERCIAL",
      invoiceItems: [
        {
          quantity: 1,
          code: "001002", // International shipment placeholder code
          description: "Goods",
          unitPrice: 100,
          weight: details.weight,
          origin: details.originCountry,
          provinceOrState: details.originStateOrProvince,
        },
      ],
    };
  }

  // build ShippingRequest from ShippingDetails
  const shippingRequest: ShippingRequest = {
    from: {
      companyName: details.originCompanyName,
      attention: details.originAttention,
      phone: details.originPhoneNumber,
      state: details.originStateOrProvince,
      streetAddress: details.originAddress,
      city: details.originCity,
      countryCode: details.originCountry,
      postalCode: details.originPostalCode,
    },
    to: {
      companyName: details.destinationCompanyName,
      attention: details.destinationAttention,
      phone: details.destinationPhoneNumber,
      state: details.destinationStateOrProvince,
      streetAddress: details.destinationAddress,
      city: details.destinationCity,
      countryCode: details.destinationCountry,
      postalCode: details.destinationPostalCode,
    },
    packageType: details.packageType,
    lineItems: [
      {
        length: details.length,
        width: details.width,
        height: details.height,
        weight: details.weight,
        description: "Package",
      },
    ],
    unitOfMeasurement: "IMPERIAL",
    serviceOptions: [],
    shipDate: details.shippingDate.toISOString(),
    customsInvoice: customsInvoce,
  };

  if (import.meta.env.VITE_DEV_API_MOCKING === "true") {
    const rates = transformShippingRates(mockShippingRates);
    return { data: rates.sort((a, b) => a.price - b.price), error: null };
  }

  const { data: ratesResponse, error }: { data: ShippingRatesResponse | null; error: Error | null } = await fetchData(service, shippingRequest);
  if (error) {
    return { data: null, error };
  }

  const rates = transformShippingRates(ratesResponse);
  return { data: rates.sort((a, b) => a.price - b.price), error: null };
};

export default getShippingRates;
