import { URLEndpoint } from "./getGames";

export const getLanguages = async (index: number[] | string[] | undefined) => {
  console.log(index);
  let list: any[] = [];
  index?.map((element) => list.push(element.id));
  console.log(list);

  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${URLEndpoint}getLanguages?token=fqtvv3932n6lalnlxjla0mxewqzxpl&languages=${list}`,
    requestOptions
  );

  const result = await response.json();

  return result;
};
