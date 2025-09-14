import type { TokenData } from "@/interfaces";
import { useState, useEffect } from "react";

export function useTokenData() {
  const [data, setData] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/price");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const tokenData = await response.json();

        if (tokenData.error) {
          throw new Error(tokenData.error);
        }
        setData(tokenData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching token data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}
