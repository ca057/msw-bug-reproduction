import { useCallback, useEffect, useState } from "react";

interface UseData {
  (path: string): {
    data: Record<string, unknown> | null;
    reload: () => Promise<void>;
  };
}
const useData: UseData = (path) => {
  const [data, setData] = useState<null>(null);

  const fetchData = useCallback(async () => {
    const response = await fetch(`http://localhost:4730/${path}`);
    const result = await response.text();
    setData(JSON.parse(result));
  }, [path]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, reload: fetchData };
};

export default useData;
