"use client";

import { useEffect, useMemo, useState } from "react";
import { useInterval } from "usehooks-ts";

const pad2 = (n: number) => String(n).padStart(2, "0");

const formatMMSS = (totalSeconds: number) => {
  const s = Math.max(0, totalSeconds);
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${pad2(mm)}:${pad2(ss)}`;
};

const readNumber = (key: string): number | null => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
};

const writeNumber = (key: string, value: number) => {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // ignore
  }
};

const removeKey = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
};

const computeLeft = (deadlineTs: number) =>
  Math.max(0, Math.ceil((deadlineTs - Date.now()) / 1000));

export const useTestCountdown = ({
  testId,
  totalSeconds,
  isEnabled = true,
}: {
  testId: string | number;
  totalSeconds: number;
  isEnabled?: boolean;
}) => {
  const key = useMemo(() => `test_timer_deadline:${testId}`, [testId]);

  const [deadline, setDeadline] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(
    Math.max(0, totalSeconds)
  );

  // init from storage
  useEffect(() => {
    if (!isEnabled) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDeadline(null);
      setSecondsLeft(Math.max(0, totalSeconds));
      return;
    }

    const saved = readNumber(key);

    if (saved && saved > 0) {
      setDeadline(saved);
      setSecondsLeft(computeLeft(saved));
      return;
    }

    const next = Date.now() + Math.max(0, totalSeconds) * 1000;
    writeNumber(key, next);
    setDeadline(next);
    setSecondsLeft(Math.max(0, totalSeconds));
  }, [isEnabled, key, totalSeconds]);

  // tick (library)
  useInterval(
    () => {
      if (!deadline) return;
      const left = computeLeft(deadline);
      setSecondsLeft(left);
    },
    isEnabled && deadline && secondsLeft > 0 ? 1000 : null
  );

  const mmss = useMemo(() => formatMMSS(secondsLeft), [secondsLeft]);

  const clear = () => {
    removeKey(key);
    setDeadline(null);
  };

  return { secondsLeft, mmss, clear };
};
