import { ReactNode } from "react";

export default function MySuspense({
  children,
  loading,
  fallback,
}: {
  children: ReactNode;
  loading: boolean;
  fallback: ReactNode;
}) {
  return loading ? fallback : children;
}
