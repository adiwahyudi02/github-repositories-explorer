import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { useGetUsersQuery } from "@/hooks/queries/useGetUsersQuery";
import { useGetRepositoriesInfiniteQuery } from "@/hooks/queries/useGetRepositoriesInfiniteQuery";
import {
  UserRepositoryProvider,
  useUserRepositoryContext,
} from "../user-repository.context";
import { ReactQueryProvider } from "@/providers/react-query.provider";

jest.mock("@/hooks/useSearchParamsState");
jest.mock("@/hooks/queries/useGetUsersQuery");
jest.mock("@/hooks/queries/useGetRepositoriesInfiniteQuery");

const MockComponent = () => {
  const context = useUserRepositoryContext();
  return (
    <>
      <div data-testid="users">{JSON.stringify(context.users)}</div>
      <div data-testid="isLoadingUsers">{String(context.isLoadingUsers)}</div>
      <div data-testid="repositories">
        {JSON.stringify(context.repositories)}
      </div>
      <div data-testid="isLoadingRepositories">
        {String(context.isLoadingRepositories)}
      </div>
      <button onClick={() => context.handleSearch("new-search")}>Search</button>
    </>
  );
};

const renderWithProvider = () => {
  return render(
    <ReactQueryProvider>
      <UserRepositoryProvider>
        <MockComponent />
      </UserRepositoryProvider>
    </ReactQueryProvider>
  );
};

describe("UserRepositoryProvider", () => {
  beforeEach(() => {
    (useSearchParamsState as jest.Mock).mockImplementation((key: string) => {
      switch (key) {
        case "q":
          return ["", jest.fn()];
        case "selectedAccordion":
          return ["", jest.fn()];
        default:
          // Return a default tuple for any other key
          return ["", jest.fn()];
      }
    });

    (useGetUsersQuery as jest.Mock).mockReturnValue({
      data: { items: [{ id: 1, login: "user1" }] },
      isLoading: false,
    });

    (useGetRepositoriesInfiniteQuery as jest.Mock).mockReturnValue({
      data: { pages: [[{ id: 101, name: "repo1" }]] },
      isLoading: false,
      isFetchingNextPage: false,
      hasNextPage: true,
      fetchNextPage: jest.fn(),
    });
  });

  it("should render users and repositories correctly", async () => {
    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId("users").textContent).toContain("user1");
      expect(screen.getByTestId("isLoadingUsers").textContent).toBe("false");
      expect(screen.getByTestId("repositories").textContent).toContain("repo1");
      expect(screen.getByTestId("isLoadingRepositories").textContent).toBe(
        "false"
      );
    });
  });

  it("should handle search correctly", async () => {
    const setSearchMock = jest.fn();
    (useSearchParamsState as jest.Mock).mockImplementation((key: string) => {
      switch (key) {
        case "q":
          return ["", setSearchMock];
        case "selectedAccordion":
          return ["", jest.fn()];
        default:
          return ["", jest.fn()];
      }
    });

    renderWithProvider();

    screen.getByText("Search").click();
    expect(setSearchMock).toHaveBeenCalledWith("new-search");
  });

  it("should throw error when used outside provider", () => {
    const ConsoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() => render(<MockComponent />)).toThrow(
      "useUserRepositoryContext must be used within an UserProvider"
    );
    ConsoleSpy.mockRestore();
  });
});
