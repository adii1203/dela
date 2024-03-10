import { useEffect, useState, useCallback } from "react";

export const useMediaQuery = (query: string) => {
  const getMatch = (query: string) => {
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(getMatch(query));

  const handelChange = useCallback(() => setMatches(getMatch(query)), [query]);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    handelChange();
    matchMedia.addEventListener("change", handelChange);
    return () => matchMedia.removeEventListener("change", handelChange);
  }, [query, handelChange]);

  return matches;
};
