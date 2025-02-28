import React, { JSX } from "react";
import { render, screen } from "@testing-library/react";
import { UserNameProfile } from ".";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicElements["img"]) => (
    // Using eslint-disable-next-line to bypass the warning in test mock
    // Since this is a mock, we are safely ignoring the lint rule here
    // Also ensuring the alt attribute is present for accessibility
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt || "Mocked image"} />
  ),
}));

describe("UserNameProfile", () => {
  const mockProps = {
    imageUrl: "/path/to/image.jpg",
    username: "johndoe",
  };

  it("should render the image with correct src and alt", () => {
    render(<UserNameProfile {...mockProps} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockProps.imageUrl);
    expect(image).toHaveAttribute("alt", `${mockProps.username} image`);
  });

  it("should render the username with the correct text", () => {
    render(<UserNameProfile {...mockProps} />);

    const username = screen.getByText(mockProps.username);
    expect(username).toBeInTheDocument();
  });

  it("should apply the correct styles", () => {
    render(<UserNameProfile {...mockProps} />);

    const image = screen.getByRole("img");
    expect(image).toHaveClass("rounded-full");

    const username = screen.getByText(mockProps.username);
    expect(username).toHaveClass(
      "text-blue-500 hover:underline cursor-pointer"
    );
  });
});
