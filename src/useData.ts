import { useCallback, useEffect, useState } from "react";

interface UseData {
  (path: string): {
    data: Record<string, unknown> | null;
    reload: () => Promise<void>;
  };
}
const useData: UseData = (path) => {
  const [data, setData] = useState<null>(null);

  const fetchBook = useCallback(async () => {
    const response = await fetch(`http://localhost:4730/${path}`);
    const result = await response.json();
    setData(result);
  }, [path]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  return { data, reload: fetchBook };
};

export default useData;
