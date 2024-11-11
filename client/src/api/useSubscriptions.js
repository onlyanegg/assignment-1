import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../UserContext";
import { useContext } from "react";

export const useSubscriptions = () => {
  const { user } = useContext(UserContext);

  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/subscriptions/", {
        headers: new Headers({
          Authorization: `Token ${user.token}`,
        }),
      });

      return await response.json();
    },
    refetchInterval: 5000,
  });
};
