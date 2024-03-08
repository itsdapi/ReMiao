import { CenterLayout } from "@/ui/layout";
import Avatar from "@/ui/avatar";
import { getCurrentUserInfo, updateUserInfo } from "@/lib/miao-api/user";
import { Button, Input } from "@tarojs/components";
import { config } from "@/lib/config";
import { RoundBtn } from "@/ui/button/button";
import { useEffect, useState } from "react";
import { getFileUrl } from "@/lib/miao-api/util";
import { showToast } from "@/lib/util";
import { switchTab } from "@tarojs/taro";
import TopbarProvider from "@/ui/topbar";

export default function Login() {
  const [newNickname, setNewNickname] = useState("");
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [nicknameChanged, setNicknameChanged] = useState(false);
  const [avatarChanged, setAvatarChanged] = useState(false);

  useEffect(() => {
    const initData = async () => {
      const fileUrl = await getFileUrl();
      const oldInfo = await getCurrentUserInfo();
      setNewNickname(oldInfo.nickName);
      setNewAvatarUrl(`${fileUrl}/${oldInfo.avatarFileName}`);
    };

    initData();
  }, []);

  const handleSubmit = async () => {
    if (!avatarChanged || !nicknameChanged) {
      showToast("数据并没有修改", "error");
      return;
    }
    await updateUserInfo({
      nickName: newNickname,
      localAvatarUrl: newAvatarUrl,
    });
    showToast("更新信息成功", "success");
    switchTab({
      url: config.app.aboutPagePath,
    });
  };

  return (
    <TopbarProvider back>
      <CenterLayout className={"bg-primary-100"}>
        <Button
          style={{ border: "none" }}
          plain
          className={"pb-5"}
          openType={"chooseAvatar"}
          onChooseAvatar={(event) => {
            setAvatarChanged(true);
            setNewAvatarUrl(event.detail.avatarUrl);
          }}
        >
          <Avatar src={newAvatarUrl} />
        </Button>
        <div className={`rounded-lg flex flex-col p-2 gap-4`}>
          <div className={"text-2xl"}>名称</div>
          <Input
            type={"nickname"}
            onBlur={(event) => {
              setNewNickname(event.detail.value);
              setNicknameChanged(true);
            }}
            placeholder={newNickname}
            className={"w-full h-10 bg-white rounded-xl p-2"}
            style={{
              border: `solid 1px ${config.app.colors.secondary["900"]}`,
            }}
          />
          <RoundBtn onClick={handleSubmit}>提交</RoundBtn>
        </div>
      </CenterLayout>
    </TopbarProvider>
  );
}
