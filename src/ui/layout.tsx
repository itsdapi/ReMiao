export function CenterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"h-screen w-screen flex items-center justify-center"}>
      <div className={"p-5 border-2 rounded-xl w-screen"}>
        <div className={"mx-3 space-y-3"}>{children}</div>
      </div>
    </div>
  );
}
