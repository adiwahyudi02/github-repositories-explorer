import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchInput } from ".";

describe("SearchInput", () => {
  jest.useFakeTimers();

  const onChangeMock = jest.fn();

  beforeEach(() => {
    onChangeMock.mockClear();
  });

  it("should render input with placeholder", () => {
    render(<SearchInput value="" onChange={onChangeMock} />);

    const input = screen.getByPlaceholderText("Type to search");
    expect(input).toBeInTheDocument();
  });

  it("should render input with initial value", () => {
    render(<SearchInput value="initial" onChange={onChangeMock} />);

    const input = screen.getByDisplayValue("initial");
    expect(input).toBeInTheDocument();
  });

  it("should call onChange with debounced value", async () => {
    render(<SearchInput value="" onChange={onChangeMock} debounceTime={300} />);

    const input = screen.getByPlaceholderText("Type to search");

    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveValue("test");

    // Fast forward time and check if onChange was called
    jest.advanceTimersByTime(300);

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith("test");
    });
  });

  it("should debounce onChange calls", () => {
    render(<SearchInput value="" onChange={onChangeMock} debounceTime={500} />);

    const input = screen.getByPlaceholderText("Type to search");

    fireEvent.change(input, { target: { value: "a" } });
    fireEvent.change(input, { target: { value: "ab" } });
    fireEvent.change(input, { target: { value: "abc" } });

    // Advance time less than debounceTime to ensure debounce is working
    jest.advanceTimersByTime(400);
    expect(onChangeMock).not.toHaveBeenCalled();

    // Advance time to exceed debounceTime
    jest.advanceTimersByTime(100);
    expect(onChangeMock).toHaveBeenCalledWith("abc");
  });

  it("should update input value when prop changes", () => {
    const { rerender } = render(
      <SearchInput value="initial" onChange={onChangeMock} />
    );

    const input = screen.getByPlaceholderText("Type to search");
    expect(input).toHaveValue("initial");

    // Change the value prop and re-render
    rerender(<SearchInput value="updated" onChange={onChangeMock} />);
    expect(input).toHaveValue("updated");
  });
});
