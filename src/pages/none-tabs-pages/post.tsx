import { PaddingBlock } from "@/ui/padding-block";
import TextArea from "@/ui/text-area";
import PostTool from "@/ui/post-tool";
import { useState } from "react";
import { ChooseMedia } from "@/lib/type";
import PostSelectedImages from "@/ui/post-selected-images";
import { editImage, goBack, isBlank, showToast } from "@/lib/util";
import { useParams } from "@/lib/hook";
import TopbarProvider from "@/ui/topbar";
import { upload } from "@/lib/miao-api/file";
import { postFeedback } from "@/lib/miao-api/feedback";

export default function Post(params: any) {
  const { title, desc, api, feedbackType, catID, requiredImage } = useParams(
    params,
    ["title", "desc", "api", "feedbackType", "requiredImage", "catID"]
  );
  const [input, setInput] = useState("");
  const [medias, setMedias] = useState<ChooseMedia[]>([]);

  const handleSend = async () => {
    console.log(`send!, ${api}`, { input, medias });
    // 第零步 基础内容检查
    // 首先输入内容肯定是需要的
    if (isBlank(input)) {
      showToast("输入内容！");
      return;
    }

    // 接着是检查图片内容 通过在页面params的requiredImage中传入1代表true 0代表false
    if (medias.length === 0 && Number(requiredImage)) {
      console.log("Image is required!");
      showToast("需要上传图片哦");
      return;
    }

    // 第一步 上传照片
    let tokenList: string[] = [];
    if (medias.length !== 0) {
      // 组装符合上传格式的Object
      const uploadQueue = medias.map((media) => {
        return { filePath: media.tempFilePath, isCompressed: true };
      });
      console.log("upload queue", uploadQueue);
      const result = await upload(uploadQueue);
      // 有发生错误需要告知用户哪个照片无法上传
      if (result.errorList.length !== 0)
        showToast(`${result.errorList.toString()}无法上传`);
      tokenList = result.tokenList;
    }

    // 第二步 发布反馈
    // 通过向页面传入api参数来指定用哪个api接口
    // 因为这个页面还可以用来承载发布帖子的功能
    if (api === "feedback") {
      const feedbackID = (
        await postFeedback({
          type: feedbackType ? feedbackType : "1",
          catID: Number(catID),
          fileTokens: tokenList,
          content: input,
        })
      ).feedbackID.toString();
      showToast(`反馈${feedbackID}已收到`, "success");
    }

    // 自动返回上一页 等待1秒
    await new Promise((r) => setTimeout(r, 1000));
    goBack();
  };

  const handleMediaDelete = (path: string) => {
    setMedias(medias.filter((m) => m.tempFilePath !== path));
  };

  const handleImageEdit = async (index: number) => {
    const res = await editImage(medias[index].tempFilePath);
    const nextMedias = medias.map((media, nIndex) => {
      if (nIndex === index) {
        return {
          ...media,
          tempFilePath: res,
        };
      } else {
        return media;
      }
    });
    setMedias(nextMedias);
  };

  return (
    <TopbarProvider
      className={"bg-primary-100"}
      topClassName={"bg-primary-100"}
      back
    >
      <div className={"min-h-screen "}>
        <PaddingBlock />
        <div className={"mx-3 space-y-10"}>
          <div className={"flex flex-col items-center text-secondary-900"}>
            <h1 className={"text-3xl font-bold mb-2"}>{title}</h1>
            <div>{desc}</div>
          </div>
          <div className={"space-y-2"}>
            <TextArea onBlur={setInput} />
            <PostTool onChooseImage={setMedias} onSend={handleSend} />
            <PostSelectedImages
              images={medias}
              onDelete={handleMediaDelete}
              onClickImage={handleImageEdit}
            />
          </div>
        </div>
      </div>
    </TopbarProvider>
  );
}
