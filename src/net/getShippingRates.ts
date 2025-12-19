import type { ShippingRate, ShippingDetails, ShippingRatesResponse } from "@/net/shippingRatesTypes";
import transformShippingRates from "./transformShippingRates";
import mockShippingRates from "../data/mockShippingRates";
import type { ShippingRequest } from "./shippingRequestTypes";
import fetchData from "./fetchData";

const service = "rates/";

export const getRates = async (
  details: ShippingDetails
): Promise<ShippingRate[]> => {
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
  };

  const data: ShippingRatesResponse = await fetchData(service, shippingRequest);
  const rates = transformShippingRates(data);
  return rates.sort((a, b) => a.price - b.price);
};


export const generateMockRates = async (details: ShippingDetails): Promise<ShippingRate[]> => {
  const rates = transformShippingRates(mockShippingRates);

  return rates.sort((a, b) => a.price - b.price);
};

export default generateMockRates;
