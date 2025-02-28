import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Accordion } from ".";

describe("Accordion", () => {
  const title = "Accordion Title";
  const children = <p>Accordion Content</p>;

  it("should render the title and not show content by default", () => {
    render(<Accordion title={title}>{children}</Accordion>);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.queryByText("Accordion Content")).not.toBeInTheDocument();
  });

  it("should show content when clicked", () => {
    render(<Accordion title={title}>{children}</Accordion>);

    fireEvent.click(screen.getByText(title));
    expect(screen.getByText("Accordion Content")).toBeInTheDocument();
  });

  it("should hide content when clicked again", () => {
    render(<Accordion title={title}>{children}</Accordion>);

    const titleElement = screen.getByText(title);
    fireEvent.click(titleElement);
    fireEvent.click(titleElement);
    expect(screen.queryByText("Accordion Content")).not.toBeInTheDocument();
  });

  it("should call onOpen when opened", () => {
    const onOpen = jest.fn();
    render(
      <Accordion title={title} onOpen={onOpen}>
        {children}
      </Accordion>
    );

    fireEvent.click(screen.getByText(title));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when closed", () => {
    const onClose = jest.fn();
    render(
      <Accordion title={title} isOpen onClose={onClose}>
        {children}
      </Accordion>
    );

    fireEvent.click(screen.getByText(title));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should be open when isOpen prop is true", () => {
    render(
      <Accordion title={title} isOpen>
        {children}
      </Accordion>
    );

    expect(screen.getByText("Accordion Content")).toBeInTheDocument();
  });

  it("should be closed when isOpen prop is false", () => {
    render(
      <Accordion title={title} isOpen={false}>
        {children}
      </Accordion>
    );

    expect(screen.queryByText("Accordion Content")).not.toBeInTheDocument();
  });
});
