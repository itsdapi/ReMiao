export function KVInfo({
  title,
  value,
  className,
}: {
  title?: string;
  value?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col space-y-2 text-secondary-900 ${className}`}>
      <h2 className={"font-medium"}>{title}</h2>
      <span className={"font-light text-sm"}>{value}</span>
    </div>
  );
}
