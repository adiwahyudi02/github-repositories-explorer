import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { IGetUsersReq, IGetUsersRes } from "@/types/user.types";
import { axiosServer } from "@/utils/axios-instances.utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const page = Number(searchParams.get("page"));
  const per_page = Number(searchParams.get("per_page"));

  // Ensure q is provided
  if (!q) {
    return NextResponse.json(
      { error: "Query parameter q is required" },
      { status: 400 }
    );
  }

  const requestParams: IGetUsersReq = {
    q,
    ...(page && { page }),
    ...(per_page && { per_page }),
  };

  try {
    const response = await axiosServer.get<IGetUsersRes>("/search/users", {
      params: requestParams,
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    // Handle and pass the error to NextResponse
    const status =
      isAxiosError(error) && error.response ? error.response.status : 500;
    const message =
      isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to fetch GitHub users";

    return NextResponse.json({ error: message }, { status });
  }
}
