import SvgIcon from "@/ui/svg-icon";
import { config } from "@/lib/config";

interface ListProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export function List(props: ListProps) {
  return (
    <div {...props}>
      <div className={"py-9 px-6 rounded-t-3xl bg-white shadow-bt"}>
        {props.children}
      </div>
    </div>
  );
}

interface ListItemProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string;
  icon: string;
}
export function ListItem(props: ListItemProps) {
  return (
    <div {...props}>
      <div
        className={"py-3 mx-4 gap-5 flex flex-row flex-nowrap items-center"}
        style={{
          borderBottom: `solid 1px ${config.app.colors.secondary["100"]}`,
        }}
      >
        <SvgIcon
          src={props.icon}
          color={config.app.colors.secondary["900"]}
          size={32}
        />
        <p className={"text-secondary-900 font-light text-xl"}>{props.title}</p>
      </div>
    </div>
  );
}
