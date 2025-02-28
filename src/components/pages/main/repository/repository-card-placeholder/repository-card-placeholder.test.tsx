import React from "react";
import { render, screen } from "@testing-library/react";
import { RepositoryCardPlaceholder } from ".";

describe("RepositoryCardPlaceholder", () => {
  it("should render one placeholder by default", () => {
    render(<RepositoryCardPlaceholder />);

    const placeholders = screen.getAllByRole("status");
    expect(placeholders).toHaveLength(1);
  });

  it("should render multiple placeholders when count is provided", () => {
    render(<RepositoryCardPlaceholder count={3} />);

    const placeholders = screen.getAllByRole("status");
    expect(placeholders).toHaveLength(3);
  });

  it("should not render anything when isVisible is false", () => {
    const { container } = render(
      <RepositoryCardPlaceholder isVisible={false} />
    );
    expect(container.firstChild).toBeNull();
  });
});
