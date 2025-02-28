import React from "react";
import { render, screen } from "@testing-library/react";
import { RepositoryCard } from ".";

describe("RepositoryCard", () => {
  const defaultProps = {
    repoName: "example-repo",
    repoUrl: "https://github.com/example-repo",
    description: "This is an example repository",
    language: "TypeScript",
    watchers: 1234,
    updatedAt: "2023-08-15T12:34:56Z",
  };

  it("should render the component with all props", () => {
    render(<RepositoryCard {...defaultProps} />);

    expect(screen.getByText("example-repo")).toBeInTheDocument();
    expect(
      screen.getByText("This is an example repository")
    ).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("1,234")).toBeInTheDocument();
    expect(screen.getByText("Updated on Aug 15, 2023")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "example-repo" });
    expect(link).toHaveAttribute("href", "https://github.com/example-repo");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should display 'No description available' when description is null", () => {
    render(<RepositoryCard {...defaultProps} description={null} />);
    expect(
      screen.queryByText("This is an example repository")
    ).not.toBeInTheDocument();
  });

  it("should not display language when it is null", () => {
    render(<RepositoryCard {...defaultProps} language={null} />);
    expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
  });
});
