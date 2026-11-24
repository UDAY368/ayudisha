"use client";
import { useEffect, useState } from "react";

/** Server renders the build year; the client corrects it so a long-lived static build stays current. */
export function CopyrightYear() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span suppressHydrationWarning>{year}</span>;
}
