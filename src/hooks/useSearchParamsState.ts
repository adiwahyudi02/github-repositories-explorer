import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export const useSearchParamsState = (
  key: string,
  defaultValue: string = ""
) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Initialize state from URL or default value
  const [value, setValue] = useState<string>(
    searchParams.get(key) || defaultValue
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [value, key, pathname, router, searchParams]);

  return [value, setValue] as const;
};
