import { CatInfo } from "@/lib/miao-api/type";
import { Picker } from "@tarojs/components";
import { useState } from "react";
import { AtForm, AtInput, AtButton, AtListItem, AtSwitch } from "taro-ui";

export function CatForm({ catInfo }: { catInfo: CatInfo }) {
  const statusList = {
    0: "失踪",
    1: "正常",
    2: "生病",
    3: "住院",
    4: "被领养",
    5: "死亡",
  };
  const [catData, setCatData] = useState(catInfo);
  return (
    <>
      {/* AtForm不能管理表单数据 */}
      <AtForm
        onSubmit={() => {
          console.log(catData);
          // TODO: 提交表单
        }}
      >
        <AtInput
          name={"name"}
          title={"猫咪名字"}
          type={"text"}
          value={catData.name}
          onChange={(e) => {
            setCatData({ ...catData, name: `${e}` });
          }}
        />
        <AtInput
          name={"description"}
          title={"猫咪描述"}
          type={"text"}
          value={catData.description}
          onChange={(e) => {
            setCatData({ ...catData, description: `${e}` });
          }}
        />
        <AtInput
          name={"haunt"}
          title={"猫咪出没地"}
          type={"text"}
          value={catData.haunt}
          onChange={(e) => {
            setCatData({ ...catData, haunt: `${e}` });
          }}
        />
        {/* 猫咪状态,0表示失踪,1表示正常,2表示生病,3表示住院,4表示被领养,5表示死亡 */}
        {/* TODO:对齐 */}
        <Picker
          mode={"selector"}
          range={Object.values(statusList)}
          value={Number(catData.status)}
          onChange={(e) => {
            setCatData({ ...catData, status: `${e.detail.value}` });
          }}
        >
          <AtListItem
            title={"猫咪状态"}
            extraText={statusList[catData.status]}
          />
        </Picker>
        <AtSwitch
          title={"是否绝育"}
          checked={catData.isNeuter}
          onChange={() => {
            setCatData({ ...catData, isNeuter: !catData.isNeuter });
          }}
        />
        <AtButton type={"primary"} formType={"submit"} className={"m-2"}>
          提交
        </AtButton>
      </AtForm>
    </>
  );
}
