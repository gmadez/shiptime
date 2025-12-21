import React from "react";
import { render } from "@testing-library/react";
import { ShippingForm } from "../ShippingForm";
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe("ShippingForm", () => {
  it("renders correctly and matches snapshot and has no accessibility violations", async () => {
    const mockOnSubmit = jest.fn();
    const { asFragment, container } = render(
      <ShippingForm onSubmit={mockOnSubmit} isLoading={false} initialValues={null} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });
});
