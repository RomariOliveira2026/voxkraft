"use client";

import { useCallback, useEffect, useState } from "react";
import { DEMO_STORE_UPDATED_EVENT } from "@/lib/demo-store/constants";

export function useDemoStoreVersion(demoMode: boolean) {
  const [version, setVersion] = useState(0);

  const refresh = useCallback(() => {
    setVersion((current) => current + 1);
  }, []);

  useEffect(() => {
    if (!demoMode) return;

    const handleUpdate = () => refresh();
    window.addEventListener(DEMO_STORE_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(DEMO_STORE_UPDATED_EVENT, handleUpdate);
  }, [demoMode, refresh]);

  return version;
}
