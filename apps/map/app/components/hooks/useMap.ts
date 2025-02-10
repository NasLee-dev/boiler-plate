'use client';
import { INITIAL_CENTER, INITIAL_ZOOM, MAP_KEY } from "@/app/constants/map";
import { NaverMap } from "@/app/types/naverMap";
import { fetchMapData } from "@/app/utils/fetchMapData";
import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { useCallback } from "react";

export const queryKey = [MAP_KEY]

export const useMap = () => {
	const { data: map }: UseQueryResult<NaverMap> = useQuery({
		queryKey,
		queryFn: fetchMapData,
		enabled: false,
	})
	const queryClient = useQueryClient()
	const initMap = useCallback((map: NaverMap) => {
		return queryClient.setQueryData<NaverMap>(queryKey, map)
	}, [queryClient])

	const resetMapOptions = useCallback(() => {
		map?.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM)
	}, [map])

	return {
		initMap,
		resetMapOptions,
	}
};
