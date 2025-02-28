import React from "react";
import { render, screen } from "@testing-library/react";
import { UserNameProfilePlaceholder } from ".";

describe("UserNameProfilePlaceholder", () => {
  it("should render the default placeholder when isVisible is true", () => {
    render(<UserNameProfilePlaceholder />);

    const placeholders = screen.getAllByRole("status");
    expect(placeholders).toHaveLength(1);
  });

  it("should render the correct number of placeholders when count is provided", () => {
    render(<UserNameProfilePlaceholder count={3} />);

    const placeholders = screen.getAllByRole("status");
    expect(placeholders).toHaveLength(3);
  });

  it("should not render anything when isVisible is false", () => {
    render(<UserNameProfilePlaceholder isVisible={false} />);

    const placeholders = screen.queryByRole("status");
    expect(placeholders).toBeNull();
  });

  it("should apply the correct styles", () => {
    render(<UserNameProfilePlaceholder />);

    const placeholder = screen.getByRole("status");

    expect(placeholder).toHaveClass(
      "flex items-center gap-4 w-full p-4 bg-gray-800 rounded-lg animate-pulse mb-4"
    );
  });
});
