import React from "react";
import { render } from "@testing-library/react";
import { RateCard } from "../RateCard";
import type { ShippingRate } from "@/net/shippingRatesTypes";
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe("RateCard", () => {
  it("renders correctly and matches snapshot and has no accessibility violations", async () => {
    const mockRate: ShippingRate = {
      carrierId: "carrier1",
      carrier: "Carrier One",
      serviceId: "service1",
      service: "Express",
      quoteId: "quote1",
      price: 25.5,
      estimatedDays: "2 days",
      logo: "🚚",
      features: ["Tracking", "Insurance", "Signature"],
    };
    const { asFragment, container } = render(
      <RateCard
        rate={mockRate}
        isSelected={false}
        onSelect={() => {}}
        index={0}
        isBestValue={true}
        isFastest={false}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });
});
