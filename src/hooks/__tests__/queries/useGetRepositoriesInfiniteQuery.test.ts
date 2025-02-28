import { renderHook, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { axiosClient } from "@/utils/axios-instances.utils";
import { mockRepositoriesRes } from "@/__mocks__/repository.mock";
import { useGetRepositoriesInfiniteQuery } from "@/hooks/queries/useGetRepositoriesInfiniteQuery";
import { ReactQueryProvider } from "@/providers/react-query.provider";

const mockAxios = new MockAdapter(axiosClient);

describe("useGetRepositoriesInfiniteQuery", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it("should fetch repositories successfully", async () => {
    mockAxios
      .onGet("/github/users/adiwahyudi02/repos")
      .reply(200, mockRepositoriesRes);

    const { result } = renderHook(
      () => useGetRepositoriesInfiniteQuery({ username: "adiwahyudi02" }),
      { wrapper: ReactQueryProvider }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data?.pages[0]).toEqual(mockRepositoriesRes);
    });
  });

  it("should load more pages when getNextPageParam is called", async () => {
    // Mock multiple pages
    mockAxios
      .onGet("/github/users/adiwahyudi02/repos", {
        params: { per_page: 5, page: 1 },
      })
      .reply(200, mockRepositoriesRes);

    mockAxios
      .onGet("/github/users/adiwahyudi02/repos", {
        params: { per_page: 5, page: 2 },
      })
      .reply(200, []);

    const { result } = renderHook(
      () =>
        useGetRepositoriesInfiniteQuery({
          username: "adiwahyudi02",
          per_page: 5,
        }),
      { wrapper: ReactQueryProvider }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data?.pages[0]).toEqual(mockRepositoriesRes);
    });

    // Load next page
    result.current.fetchNextPage();
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data?.pages[1]).toEqual([]);
    });
  });
});
