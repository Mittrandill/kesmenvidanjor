import { useEffect, useRef } from "react";
import { useSheetClose } from "@/components/admin/EditSheetTrigger";

export function useFormSuccess(
  pending: boolean,
  hasError: boolean,
  onSuccess?: () => void,
) {
  const sheetClose = useSheetClose();
  const callback = onSuccess ?? sheetClose ?? undefined;
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending && !hasError) {
      callback?.();
    }
    wasPending.current = pending;
  }, [pending, hasError, callback]);
}
