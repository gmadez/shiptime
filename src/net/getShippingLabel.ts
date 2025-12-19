import type { ShippingRate, ShippingDetails } from "@/net/shippingRatesTypes";
import transformShippingRates from "./transformShippingRates";
import mockShippingRates from "../data/mockShippingRates";
import type { ShipmentsRequest } from "./shipmentsRequestTypes";
import Shipment from "./shipmentTypes";
import fetchData from "./fetchData";

const service = "shipments/";

export const getShipment = async (
  rate: ShippingRate,
  details: ShippingDetails
): Promise<Shipment> => {
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
      customsInvoice: {
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
      },
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

    const data: Shipment = await fetchData(service, shipmentsRequest);
    return data;
};

export default getShipment;
