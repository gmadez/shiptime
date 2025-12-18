import type { ShippingRate, ShippingDetails } from "@/net/shippingRatesTypes";
import transformShippingRates from "./transformShippingRates";
import mockShippingRates from "../data/mockShippingRates";
import type { ShippingRequest } from "./shippingRequestTypes";

const endpoint = "https://restapi.appspaces.ca/rest/rates/";

export const getRates = async (
  details: ShippingDetails
): Promise<ShippingRate[]> => {
  console.log("Generating rates for details:", details);

  // build ShippingRequest from ShippingDetails
  const shippingRequest: ShippingRequest = {
    from: {
      companyName: "Sender",
      attention: "Sender Name",
      phone: "123-456-7890",
      state: "ON",
      streetAddress: details.originAddress,
      city: details.originCity,
      countryCode: details.originCountry,
      postalCode: details.originPostalCode,
    },
    to: {
      companyName: "Sender",
      attention: "Sender Name",
      phone: "123-456-7890",
      state: "ON",
      streetAddress: details.destinationAddress,
      city: details.destinationCity,
      countryCode: details.destinationCountry,
      postalCode: details.destinationPostalCode,
    },
    packageType: details.packageType || "PACKAGE",
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
    shipDate: details.shippingDate ? details.shippingDate.toISOString() : undefined,
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shippingRequest),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    const rates = transformShippingRates(data);
    return rates.sort((a, b) => a.price - b.price);
  } catch (err) {
    // fallback to local mock on network error
    // eslint-disable-next-line no-console
    console.warn("Failed to fetch rates, using mock data:", err);
    const rates = transformShippingRates(mockShippingRates);
    return rates.sort((a, b) => a.price - b.price);
  }
};


export const generateMockRates = async (details: ShippingDetails): Promise<ShippingRate[]> => {
  const rates = transformShippingRates(mockShippingRates);

  return rates.sort((a, b) => a.price - b.price);
};

export default generateMockRates;
