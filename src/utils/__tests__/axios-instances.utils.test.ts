import { axiosClient, axiosServer } from "../axios-instances.utils";

describe("Axios Instances", () => {
  test("axiosClient should be configured with the correct baseURL", () => {
    expect(axiosClient.defaults.baseURL).toBe("/api");
  });

  test("axiosServer should be configured with the correct baseURL", () => {
    expect(axiosServer.defaults.baseURL).toBe("https://api.github.com");
  });
});
