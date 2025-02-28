import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useUserRepositoryContext } from "@/contexts/user-repository.context";
import { RepositoryList } from ".";
import { mockRepositoriesRes } from "@/__mocks__/repository.mock";

// Mocking the useUserRepositoryContext hook
jest.mock("@/contexts/user-repository.context");

describe("RepositoryList", () => {
  const mockUseUserRepositoryContext = useUserRepositoryContext as jest.Mock;

  // Default values for the context
  const defaultContextValues = {
    repositories: [],
    isLoadingRepositories: false,
    isFetchingNextRepositories: false,
    hasNextPageRepositories: false,
    paramsGetRepositories: { per_page: 10 },
    fetchNextPageRepositories: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Set default context values before each test
    mockUseUserRepositoryContext.mockReturnValue(defaultContextValues);
  });

  it("should render repository cards when repositories are present", () => {
    mockUseUserRepositoryContext.mockReturnValue({
      ...defaultContextValues,
      repositories: [mockRepositoriesRes[0]],
    });

    render(<RepositoryList />);

    expect(screen.getByText("adiwahyudi02/awesome-gifs")).toBeInTheDocument();
    expect(
      screen.getByText("Learn performance and core web vitals")
    ).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("Updated on May 03, 2024")).toBeInTheDocument();
  });

  it("should show loading placeholders when loading repositories", () => {
    mockUseUserRepositoryContext.mockReturnValue({
      ...defaultContextValues,
      isLoadingRepositories: true,
      paramsGetRepositories: { per_page: 3 },
    });

    render(<RepositoryList />);

    const placeholders = screen.getAllByRole("status");
    expect(placeholders).toHaveLength(3); // Should show 3 placeholders
  });

  it("should display a message when no repositories are found", () => {
    render(<RepositoryList />);

    expect(
      screen.getByText(
        "This user hasn’t shared any repositories yet. Check back later or explore other users."
      )
    ).toBeInTheDocument();
  });

  it("should render 'Load More' button when there are more pages", () => {
    const fetchNextPageRepositories = jest.fn();

    mockUseUserRepositoryContext.mockReturnValue({
      ...defaultContextValues,
      hasNextPageRepositories: true,
      fetchNextPageRepositories,
    });

    render(<RepositoryList />);

    const loadMoreButton = screen.getByRole("button", { name: /Load More/i });
    expect(loadMoreButton).toBeInTheDocument();
    expect(loadMoreButton).toBeEnabled();

    fireEvent.click(loadMoreButton);
    expect(fetchNextPageRepositories).toHaveBeenCalled();
  });

  it("should disable 'Load More' button when fetching next page", () => {
    mockUseUserRepositoryContext.mockReturnValue({
      ...defaultContextValues,
      hasNextPageRepositories: true,
      isFetchingNextRepositories: true,
    });

    render(<RepositoryList />);

    const loadMoreButton = screen.getByRole("button", {
      name: /Load More/i,
    });
    expect(loadMoreButton).toBeInTheDocument();
    expect(loadMoreButton).toBeDisabled();
  });
});
