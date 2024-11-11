import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../UserContext";
import { useContext } from "react";

export const useSecurities = () => {
  const { user } = useContext(UserContext);

  return useQuery({
    queryKey: ["securities"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/securities/", {
        headers: new Headers({
          Authorization: `Token ${user.token}`,
        }),
      });

      return await response.json();
    },
  });
};
