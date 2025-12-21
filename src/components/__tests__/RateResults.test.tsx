import React from "react";
import { render } from "@testing-library/react";
import { RateResults } from "../RateResults";
import type { ShippingRate, ShippingDetails } from "@/net/shippingRatesTypes";
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);


describe("RateResults", () => {
  it("renders correctly and matches snapshot and has no accessibility violations", async () => {
    const mockRates: ShippingRate[] = [
      {
        carrierId: "carrier1",
        carrier: "Carrier One",
        serviceId: "service1",
        service: "Express",
        quoteId: "quote1",
        price: 25.5,
        estimatedDays: "2 days",
        logo: "https://example.com/logo.png",
        features: ["Tracking", "Insurance"],
      },
    ];
    const mockDetails: ShippingDetails = {
      originCompanyName: "Origin Co",
      originAttention: "John Doe",
      originPhoneNumber: "1234567890",
      originStateOrProvince: "ON",
      originAddress: "123 Main St",
      originCity: "Toronto",
      originCountry: "CA",
      originPostalCode: "A1A1A1",
      destinationCompanyName: "Dest Co",
      destinationAttention: "Jane Smith",
      destinationPhoneNumber: "0987654321",
      destinationStateOrProvince: "NY",
      destinationAddress: "456 Elm St",
      destinationCity: "New York",
      destinationCountry: "US",
      destinationPostalCode: "10001",
      packageType: "PACKAGE",
      length: 10,
      width: 10,
      height: 10,
      weight: 5,
      shippingDate: new Date(),
    };
    const { asFragment, container } = render(
      <RateResults
        rates={mockRates}
        details={mockDetails}
        onBack={() => {}}
        onSelectRate={() => {}}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });
});
