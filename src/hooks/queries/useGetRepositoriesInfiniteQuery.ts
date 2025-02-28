import { QUERY_KEY } from "@/constants/query.constants";
import {
  IGetRepositoriesWithUsernameReq,
  IGetRepositoriesRes,
} from "@/types/repository.types";
import { axiosClient } from "@/utils/axios-instances.utils";
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

export const useGetRepositoriesInfiniteQuery = (
  { username, page = 1, per_page = 5 }: IGetRepositoriesWithUsernameReq,
  options?: Omit<
    UseInfiniteQueryOptions<
      IGetRepositoriesRes,
      Error,
      InfiniteData<IGetRepositoriesRes>,
      IGetRepositoriesRes,
      [string, IGetRepositoriesWithUsernameReq]
    >,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
  >
) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_REPOSITORIES, { username, per_page }],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axiosClient.get<IGetRepositoriesRes>(
        `/github/users/${username}/repos`,
        {
          params: {
            per_page,
            page: pageParam,
          },
        }
      );
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === per_page ? allPages.length + 1 : undefined;
    },
    initialPageParam: page,
    ...options,
  });
};
