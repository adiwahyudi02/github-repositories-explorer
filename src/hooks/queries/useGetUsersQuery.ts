"use client";

import { QUERY_KEY } from "@/constants/query.constants";
import { IGetUsersReq, IGetUsersRes } from "@/types/user.types";
import { axiosClient } from "@/utils/axios-instances.utils";
import { useQuery } from "@tanstack/react-query";

export const useGetUsersQuery = (params: IGetUsersReq) => {
  const query: IGetUsersReq = {
    page: 1,
    per_page: 5,
    ...params,
  };

  return useQuery({
    queryKey: [QUERY_KEY.GET_USERS, query],
    queryFn: async () => {
      // handle empty q params
      if (!query.q) {
        return {
          total_count: 0,
          incomplete_results: false,
          items: [],
        };
      }

      const { data } = await axiosClient.get<IGetUsersRes>("/github/users", {
        params: query,
      });
      return data;
    },
  });
};
