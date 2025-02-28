import { renderHook, act } from "@testing-library/react";
import { useSearchParamsState } from "../useSearchParamsState";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

describe("useSearchParamsState", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue("/test");
  });

  it("should initialize with the value from search params", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("key=value")
    );

    const { result } = renderHook(() => useSearchParamsState("key", "default"));

    expect(result.current[0]).toBe("value"); // Should match the search param
  });

  it("should initialize with default value if key is not in search params", () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    const { result } = renderHook(() => useSearchParamsState("key", "default"));

    expect(result.current[0]).toBe("default"); // Should match the default value
  });

  it("should update search params when value changes", () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    const { result } = renderHook(() => useSearchParamsState("key", "default"));

    act(() => {
      result.current[1]("newValue"); // Set new value
    });

    expect(mockPush).toHaveBeenCalledWith("/test?key=newValue", {
      scroll: false,
    });
  });

  it("should remove the key from search params when value is empty", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("key=value")
    );

    const { result } = renderHook(() => useSearchParamsState("key", "default"));

    act(() => {
      result.current[1](""); // Set empty value
    });

    expect(mockPush).toHaveBeenCalledWith("/test?", { scroll: false });
  });
});
