export const fetchMapData = async () => {
  const response = await fetch('/api/map');
  if (!response.ok) {
    throw new Error('kakao map 로드 실패');
  }
  return response.json();
};
