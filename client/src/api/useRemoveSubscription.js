import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../UserContext";
import { useContext } from "react";

export const useRemoveSubscription = () => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ticker }) => {
      const response = await fetch(
        `http://localhost:8000/subscriptions/${ticker}`,
        {
          method: "delete",
          headers: new Headers({
            Authorization: `Token ${user.token}`,
            "Content-Type": "application/json",
          }),
        }
      );

      return await response.json();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};
