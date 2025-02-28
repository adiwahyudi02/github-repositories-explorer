import { renderHook } from "@testing-library/react";
import { useIsMounted } from "../useIsMounted";

describe("useIsMounted", () => {
  it("should return true on the first render", () => {
    const { result } = renderHook(() => useIsMounted());
    expect(result.current).toBe(true);
  });

  it("should return false after the first render", () => {
    const { result, rerender } = renderHook(() => useIsMounted());
    rerender();
    expect(result.current).toBe(false);
  });
});
