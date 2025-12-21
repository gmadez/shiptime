import type { ShippingRate, ShippingDetails } from "@/net/shippingRatesTypes";
import type { ShipmentsRequest } from "./shipmentsRequestTypes";
import Shipment from "./shipmentTypes";
import fetchData from "./fetchData";
import mockShipmenResponse from "@/data/mockShipmenResponse";

const service = "shipments/";

type GetShippingLabelResult = { data: Shipment | null; error: Error | null };

export const getShipment = async (
  rate: ShippingRate,
  details: ShippingDetails
): Promise<GetShippingLabelResult> => {
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

  // build ShippingLabelRequest from ShippingRate and ShippingDetails
  const shipmentsRequest: ShipmentsRequest = {
    rateRequest: {
      from: {
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
      to: {
        companyName: details.destinationCompanyName || details.originAttention,
        streetAddress: details.destinationAddress,
        city: details.destinationCity,
        countryCode: details.destinationCountry,
        state: details.destinationStateOrProvince,
        postalCode: details.destinationPostalCode,
        attention: details.destinationAttention,
        phone: details.destinationPhoneNumber,
        residential: true,
        notify: true,
      },
      packageType: "PACKAGE",
      lineItems: [
        {
          length: details.length,
          width: details.width,
          height: details.height,
          weight: details.weight,
        },
      ],
      unitOfMeasurement: "IMPERIAL",
      serviceOptions: ["APPOINTMENT"],
      shipDate: details.shippingDate.toISOString(),
      insuranceType: "SHIPTIME",
      customsInvoice: customsInvoce,
      waitTimeLimit: 30,
    },
    carrierId: rate.carrierId,
    serviceId: rate.serviceId,
    quoteId: rate.quoteId,
    pickupDetail: {
      location: "FrontDoor",
      pickupDate: details.shippingDate.toISOString().split("T")[0],
      readyTime:'10:00',
      closeTime:'18:00',
    },
  };

  if (import.meta.env.VITE_DEV_API_MOCKING === "true") {
    return { data: mockShipmenResponse, error: null };
  }
  
  const { data: ratesResponse, error }: { data: Shipment | null; error: Error | null } = await fetchData(service, shipmentsRequest);
  if (error) {
    return { data: null, error };
  }
   return { data: ratesResponse, error: null };
};

export default getShipment;
