export function CenterLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`h-screen w-screen flex items-center justify-center ${className}`}
    >
      <div className={"p-5 border-2 rounded-xl w-screen"}>
        <div className={"mx-3 space-y-3"}>{children}</div>
      </div>
    </div>
  );
}
