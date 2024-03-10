import TopbarProvider from "@/ui/topbar";
import { PaddingBlock } from "@/ui/padding-block";
import SvgIcon from "@/ui/svg-icon";
import ToIcon from "@/public/icon/to.svg";
import { config } from "@/lib/config";
import Title from "@/ui/title";
import { MeHelpType } from "@/lib/type";
import { navigateTo } from "@tarojs/taro";
import { URLSearchParams } from "@tarojs/runtime";

export default function MeHelp() {
  const options: MeHelpType[] = [
    {
      question: "我发现新的猫猫了",
      desc: "如果发现没见过的猫猫...",
      title: "你好！",
    },
    {
      question: "猫猫好像有些不正常",
      desc: "发现了一只吐白沫的猫猫！",
      title: "你好！",
    },
    {
      question: "好像有猫猫生宝宝惹",
      desc: "生了一窝好多！",
      title: "你好！",
    },
  ];

  const handleOptionClick = async (option: MeHelpType) => {
    const postConfig = {
      title: option.title,
      desc: option.desc,
      api: "feedback",
      feedbackType: 0,
    };
    const SP = new URLSearchParams(postConfig);
    const url = `${config.app.postPath}?${SP.toString()}`;
    navigateTo({
      url: url,
    });
    await navigateTo({
      url: config.app.postPath,
    });
  };

  return (
    <TopbarProvider
      className={"bg-primary-100"}
      topClassName={"bg-primary-100"}
      back
    >
      <PaddingBlock />
      <div className={"mx-5 space-y-5"} id={"content"}>
        <Title>我想提供帮助</Title>
        {options.map((option) => (
          <div
            className={"gap-3 flex items-center"}
            key={option.question}
            onClick={() => handleOptionClick(option)}
          >
            <p className={"text-secondary-900 text-xl"}>{option.question}</p>
            <SvgIcon
              src={ToIcon}
              color={config.app.colors.secondary["900"]}
              className={"h-4 w-4"}
            />
          </div>
        ))}
      </div>
    </TopbarProvider>
  );
}
