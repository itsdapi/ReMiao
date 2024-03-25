import { ConfigProvider, Grid } from "@nutui/nutui-react-taro";
import { Image } from "@tarojs/components";
import { SelectedPhoto } from "@/lib/miao-api/type";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";

export default function CatImage({ photos }: { photos: SelectedPhoto[] }) {
  const customTheme = {
    nutuiGridItemContentPadding: "2px",
  };
  const fileUrl = useSelector((state: RootState) => state.login.data?.fileUrl);
  return (
    <ConfigProvider theme={customTheme}>
      <Grid columns={3} square>
        {photos.map((photo) => (
          <Grid.Item key={photo.id}>
            <Image
              src={`${fileUrl}/${photo.fileName}`}
              mode={"aspectFill"}
              className={"w-full h-full p-0"}
              lazyLoad
            />
          </Grid.Item>
        ))}
      </Grid>
    </ConfigProvider>
  );
}
