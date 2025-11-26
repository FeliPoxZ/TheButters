import { useQuery } from "@tanstack/react-query";

export function useMe() {
	return useQuery<UserSummary | null>({
		queryKey: ["me"],
		queryFn: async () => null,
		enabled: false,
	});
}
