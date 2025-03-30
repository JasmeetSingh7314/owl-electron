import { URLEndpoint } from "./getGames";

export const getVideoById = async (id: number | string | undefined) => {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${URLEndpoint}getVideos?token=fqtvv3932n6lalnlxjla0mxewqzxpl&id=${id}`,
    requestOptions
  );

  const result = await response.json();

  return result;
};
