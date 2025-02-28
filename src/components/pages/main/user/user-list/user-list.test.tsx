import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserList } from "../user-list";
import { useUserRepositoryContext } from "@/contexts/user-repository.context";
import { mockUsersRes } from "@/__mocks__/user.mock";

// Mock useUserRepositoryContext
jest.mock("@/contexts/user-repository.context");

const mockUseUserRepositoryContext =
  useUserRepositoryContext as jest.MockedFunction<
    typeof useUserRepositoryContext
  >;

// Default Mock Values
const defaultMockContext = {
  users: [],
  isLoadingUsers: false,
  selectedAccordion: "",
  paramsGetUsers: { q: "", per_page: 2 },
  handleSelectedAccordion: jest.fn(),
  repositories: [],
  fetchNextPageRepositories: jest.fn(),
  hasNextPageRepositories: false,
  isLoadingRepositories: false,
  isFetchingNextRepositories: false,
  paramsGetRepositories: { username: "", per_page: 2 },
  search: "",
  handleSearch: jest.fn(),
};

describe("UserList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render a list of users with Accordion and UserNameProfile", () => {
    mockUseUserRepositoryContext.mockReturnValue({
      ...defaultMockContext,
      users: mockUsersRes.items,
    });

    render(<UserList />);

    expect(screen.getByText("adiwahyudi")).toBeInTheDocument();
    expect(screen.getByText("adiwahyudinata")).toBeInTheDocument();
  });

  it("should show UserNameProfilePlaceholder when loading users", () => {
    mockUseUserRepositoryContext.mockReturnValue({
      ...defaultMockContext,
      isLoadingUsers: true,
    });

    render(<UserList />);

    expect(screen.getAllByRole("status")).toHaveLength(2);
  });

  it("should display a Message when no users match the search", () => {
    mockUseUserRepositoryContext.mockReturnValue({
      ...defaultMockContext,
      paramsGetUsers: { q: "no-match", per_page: 2 },
    });

    render(<UserList />);

    expect(
      screen.getByText("Your search did not match any users")
    ).toBeInTheDocument();
  });

  it("should display default Message when no search query is present", () => {
    mockUseUserRepositoryContext.mockReturnValue({
      ...defaultMockContext,
    });

    render(<UserList />);

    expect(screen.getByText("Discover GitHub Users")).toBeInTheDocument();
  });

  it("should toggle accordion when clicked", () => {
    const handleSelectedAccordion = jest.fn();
    mockUseUserRepositoryContext.mockReturnValue({
      ...defaultMockContext,
      users: mockUsersRes.items,
      handleSelectedAccordion,
    });

    render(<UserList />);

    fireEvent.click(screen.getByText("adiwahyudi"));

    expect(handleSelectedAccordion).toHaveBeenCalledWith("adiwahyudi");
  });
});
