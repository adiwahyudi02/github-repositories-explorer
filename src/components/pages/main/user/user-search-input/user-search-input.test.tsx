import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useUserRepositoryContext } from "@/contexts/user-repository.context";
import { UserSearchInput } from ".";

jest.mock("@/contexts/user-repository.context", () => ({
  useUserRepositoryContext: jest.fn(),
}));

describe("UserSearchInput", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("should render SearchInput with the correct value and placeholder", () => {
    (useUserRepositoryContext as jest.Mock).mockReturnValue({
      search: "john",
      handleSearch: jest.fn(),
    });

    render(<UserSearchInput />);

    const input = screen.getByPlaceholderText("Search Github Users");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("john");
  });

  it("should call handleSearch when input value changes", () => {
    const handleSearchMock = jest.fn();

    (useUserRepositoryContext as jest.Mock).mockReturnValue({
      search: "",
      handleSearch: handleSearchMock,
    });

    render(<UserSearchInput />);

    const input = screen.getByPlaceholderText("Search Github Users");

    fireEvent.change(input, { target: { value: "adiwahyudi02" } });

    // Fast-forward time to trigger the debounce
    jest.runAllTimers();

    expect(handleSearchMock).toHaveBeenCalledWith("adiwahyudi02");
  });
});
