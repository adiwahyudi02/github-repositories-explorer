"use client";

import React, { useMemo } from "react";
import { createContext, useContext } from "react";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { IGetUsersReq, IUser } from "@/types/user.types";
import { useGetUsersQuery } from "@/hooks/queries/useGetUsersQuery";
import { URL_PARAMS_KEY } from "@/constants/url-params.constants";
import {
  IGetRepositoriesRes,
  IGetRepositoriesWithUsernameReq,
  IRepository,
} from "@/types/repository.types";
import { useGetRepositoriesInfiniteQuery } from "@/hooks/queries/useGetRepositoriesInfiniteQuery";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

interface UserRepositoryContextType {
  // user
  users: IUser[];
  isLoadingUsers: boolean;
  paramsGetUsers: IGetUsersReq;

  // repository
  repositories: IRepository[];
  fetchNextPageRepositories: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<IGetRepositoriesRes, unknown>,
      Error
    >
  >;
  hasNextPageRepositories: boolean;
  isLoadingRepositories: boolean;
  isFetchingNextRepositories: boolean;
  paramsGetRepositories: IGetRepositoriesWithUsernameReq;

  // filter
  search: string;
  handleSearch: (search: string) => void;
  selectedAccordion: string;
  handleSelectedAccordion: (username: string) => void;
}

const UserRepositoryContext = createContext<
  UserRepositoryContextType | undefined
>(undefined);

export const UserRepositoryProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [search, setSearch] = useSearchParamsState(URL_PARAMS_KEY.Q);
  const [selectedAccordion, setSelectedAccordion] = useSearchParamsState(
    URL_PARAMS_KEY.SELECTED_ACCORDION
  );

  // params to get user by search
  const paramsGetUsers: IGetUsersReq = {
    q: search,
    page: 1,
    per_page: 5,
  };

  // get the users
  const { data: usersData, isLoading: isLoadingUsers } =
    useGetUsersQuery(paramsGetUsers);

  // params to get repositories by username
  const paramsGetRepositories: IGetRepositoriesWithUsernameReq = {
    username: selectedAccordion,
    page: 1,
    per_page: 5,
  };

  // get the repositories
  const {
    data: repositoriesData,
    fetchNextPage: fetchNextPageRepositories,
    hasNextPage: hasNextPageRepositories,
    isLoading: isLoadingRepositories,
    isFetchingNextPage: isFetchingNextRepositories,
  } = useGetRepositoriesInfiniteQuery(paramsGetRepositories, {
    enabled: !!paramsGetRepositories.username,
  });

  const repositories =
    useMemo(
      () => repositoriesData?.pages.flatMap((page) => page),
      [repositoriesData]
    ) || [];

  const handleSearch = (search: string) => {
    setSearch(search);
    setSelectedAccordion("");
  };

  return (
    <UserRepositoryContext.Provider
      value={{
        // users
        users: usersData?.items || [],
        isLoadingUsers,
        paramsGetUsers,

        // repositories
        repositories,
        fetchNextPageRepositories,
        hasNextPageRepositories,
        isLoadingRepositories,
        isFetchingNextRepositories,
        paramsGetRepositories,

        // filter
        search,
        handleSearch,
        selectedAccordion,
        handleSelectedAccordion: setSelectedAccordion,
      }}
    >
      {children}
    </UserRepositoryContext.Provider>
  );
};

export const useUserRepositoryContext = () => {
  const context = useContext(UserRepositoryContext);
  if (!context) {
    throw new Error(
      "useUserRepositoryContext must be used within an UserProvider"
    );
  }
  return context;
};
