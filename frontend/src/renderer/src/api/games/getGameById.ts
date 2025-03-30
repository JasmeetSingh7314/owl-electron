import { URLEndpoint } from "./getGames";

export const getGamesById = async (id: number | string | undefined) => {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${URLEndpoint}getInfo?token=fqtvv3932n6lalnlxjla0mxewqzxpl&game_id=${id}`,
    requestOptions
  );

  const result = await response.json();

  return result;
};
