import { useQuery } from "@tanstack/react-query";
import { fetchDefaultGroups } from "@/services/group-service";

export const useFetchGroups = () => {
  return useQuery({
    queryKey: ["default_groups"],
    queryFn: fetchDefaultGroups,
  });
};
