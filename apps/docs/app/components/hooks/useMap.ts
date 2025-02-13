import { MAP_KEY } from '../../constants/kakaoMap';
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { fetchMapData } from '../../utils/fetchMapData';
import { useCallback } from 'react';

export const queryKey = [MAP_KEY];

export const useMap = () => {
  const { data: map }: UseQueryResult<kakao.maps.Map> = useQuery({
    queryKey,
    enabled: false,
    queryFn: fetchMapData,
  });

  const queryClient = useQueryClient();
  const initMap = useCallback(
    (map: unknown) => {
      return queryClient.setQueryData(queryKey, map);
    },
    [queryClient]
  );

  return {
    initMap,
  };
};
