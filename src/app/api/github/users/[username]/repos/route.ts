import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import {
  IGetRepositoriesReq,
  IGetRepositoriesRes,
} from "@/types/repository.types";
import { axiosServer } from "@/utils/axios-instances.utils";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const per_page = Number(searchParams.get("per_page"));
  const { username } = params;

  // Ensure username is provided
  if (!username) {
    return NextResponse.json(
      { error: "Username parameter is required" },
      { status: 400 }
    );
  }

  const requestParams: IGetRepositoriesReq = {
    ...(page && { page }),
    ...(per_page && { per_page }),
  };

  try {
    const response = await axiosServer.get<IGetRepositoriesRes[]>(
      `/users/${username}/repos`,
      {
        params: requestParams,
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    const status =
      isAxiosError(error) && error.response ? error.response.status : 500;
    const message =
      isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch GitHub user repositories";

    return NextResponse.json({ error: message }, { status });
  }
}
