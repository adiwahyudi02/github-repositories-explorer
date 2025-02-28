import { renderHook, waitFor } from "@testing-library/react";
import { axiosClient } from "@/utils/axios-instances.utils";
import MockAdapter from "axios-mock-adapter";
import { useGetUsersQuery } from "@/hooks/queries/useGetUsersQuery";
import { ReactQueryProvider } from "@/providers/react-query.provider";
import { mockUsersRes } from "@/__mocks__/user.mock";

const mockAxios = new MockAdapter(axiosClient);

describe("useGetUsersQuery", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test("should return users data when q param is provided", async () => {
    mockAxios.onGet("/github/users").reply(200, mockUsersRes);

    const { result } = renderHook(
      () => useGetUsersQuery({ q: "adiwahyudi02" }),
      {
        wrapper: ReactQueryProvider,
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockUsersRes);
  });

  test("should return empty result when q param is empty", async () => {
    const { result } = renderHook(() => useGetUsersQuery({ q: "" }), {
      wrapper: ReactQueryProvider,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      total_count: 0,
      incomplete_results: false,
      items: [],
    });
  });
});
