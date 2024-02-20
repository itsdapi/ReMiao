import CardXL from "@/ui/cards/card-xl";
import Title from "@/ui/title";
import Taro from "@tarojs/taro";

export default function Index() {
  const handleCardXLClick = () => {
    Taro.navigateTo({ url: "/pages/none-tabs-pages/cat-detail" });
  };

  return (
    <div>
      <Title>莞工猫猫图鉴</Title>
      <div onClick={handleCardXLClick}>
        <CardXL />
      </div>
    </div>
  );
}
