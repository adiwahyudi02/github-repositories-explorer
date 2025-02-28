"use client";

import { UserList } from "@/components/pages/main/user/user-list";
import { UserSearchInput } from "@/components/pages/main/user/user-search-input";

export default function Main() {
  return (
    <div className="max-w-3xl m-auto py-6 px-4">
      <UserSearchInput />
      <UserList />
    </div>
  );
}
