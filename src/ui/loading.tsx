import SvgIcon from "@/ui/svg-icon";
import LoadingIcon from "@/public/icon/loading.svg";
import { config } from "@/lib/config";

export default function Loading({
  loading = true,
  size = 20,
}: {
  loading?: boolean;
  size?: number;
}) {
  return (
    <SvgIcon
      src={LoadingIcon}
      color={config.app.colors.secondary["900"]}
      size={size}
      className={`animate-spin ${loading ? "visible" : "invisible"}`}
    />
  );
}
