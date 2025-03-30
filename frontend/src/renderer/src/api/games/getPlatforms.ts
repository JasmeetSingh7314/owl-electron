import { URLEndpoint } from "./getGames";

export const getPlatforms = async (index: number[] | string[] | undefined) => {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${URLEndpoint}getPlatform?token=fqtvv3932n6lalnlxjla0mxewqzxpl&platforms=${index}`,
    requestOptions
  );

  const result = await response.json();

  return result;
};
