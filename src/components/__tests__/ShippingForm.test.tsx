import React from "react";
import { render } from "@testing-library/react";
import { ShippingForm } from "../ShippingForm";
import type { ShippingDetails } from "@/net/shippingRatesTypes";

describe("ShippingForm", () => {
  it("renders correctly and matches snapshot", () => {
    const mockOnSubmit = jest.fn();
    const { asFragment } = render(
      <ShippingForm onSubmit={mockOnSubmit} isLoading={false} initialValues={null} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
