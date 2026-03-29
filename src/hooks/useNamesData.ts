import { useEffect, useState } from "react";
import { loadNamesData, type NameEntry } from "../lib/names";

type NamesLoadState = "idle" | "loading" | "loaded" | "error";

export default function useNamesData(enabled: boolean) {
  const [names, setNames] = useState<NameEntry[]>([]);
  const [status, setStatus] = useState<NamesLoadState>(
    enabled ? "loading" : "idle",
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let isCancelled = false;

    setStatus((currentStatus) =>
      currentStatus === "loaded" ? currentStatus : "loading",
    );

    loadNamesData()
      .then((loadedNames) => {
        if (isCancelled) {
          return;
        }

        setNames(loadedNames);
        setStatus("loaded");
      })
      .catch(() => {
        if (isCancelled) {
          return;
        }

        setStatus("error");
      });

    return () => {
      isCancelled = true;
    };
  }, [enabled]);

  return {
    names,
    status,
  };
}
