import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../UserContext";
import { useContext } from "react";

export const useCreateSubscription = () => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ticker }) => {
      console.log("in mutation:", ticker);
      const response = await fetch("http://localhost:8000/subscriptions/", {
        method: "post",
        headers: new Headers({
          Authorization: `Token ${user.token}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ ticker }),
      });

      return await response.json();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};
