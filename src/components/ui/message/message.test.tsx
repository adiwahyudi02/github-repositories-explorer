import React, { JSX } from "react";
import { render, screen } from "@testing-library/react";
import { Message } from ".";

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

describe("Message", () => {
  it("should render title and message", () => {
    render(<Message title="Test Title" message="Test Message" />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  it("should not render title if not provided", () => {
    render(<Message message="Only Message" />);

    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
    expect(screen.getByText("Only Message")).toBeInTheDocument();
  });

  it("should not render message if not provided", () => {
    render(<Message title="Only Title" />);

    expect(screen.getByText("Only Title")).toBeInTheDocument();
    expect(screen.queryByText("Test Message")).not.toBeInTheDocument();
  });

  it("should render image when imageSrc is provided", () => {
    render(
      <Message
        imageSrc="/test-image.png"
        title="With Image"
        message="Message with image"
      />
    );

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "/test-image.png");
    expect(image).toHaveAttribute("alt", "Message image");
  });

  it("should not render image when imageSrc is not provided", () => {
    render(<Message title="No Image" message="Message without image" />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
