export const URLEndpoint = "http://localhost:8080/api/";

export const getGames = async () => {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${URLEndpoint}getGames?token=fqtvv3932n6lalnlxjla0mxewqzxpl`,
    requestOptions
  );

  const result = await response.json();
  console.log(result);
  return result;
};
