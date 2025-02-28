import React from "react";
import { SearchInput } from "@/components/ui/search-input";
import { useUserRepositoryContext } from "@/contexts/user-repository.context";

export const UserSearchInput: React.FC = () => {
  const { search, handleSearch } = useUserRepositoryContext();

  return (
    <div className="mb-4">
      <SearchInput
        value={search}
        onChange={handleSearch}
        placeholder="Search Github Users"
      />
    </div>
  );
};
