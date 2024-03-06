export default function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={`text-4xl font-bold ${className}`} id={"title"}>
      {children}
    </h1>
  );
}
