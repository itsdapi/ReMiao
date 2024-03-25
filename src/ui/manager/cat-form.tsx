import Taro from "@tarojs/taro";
import { updateCat } from "@/lib/miao-api/management";
import { CatInfo } from "@/lib/miao-api/type";
import { Button, Dialog } from "@nutui/nutui-react-taro";
import { useState } from "react";
import { mutate } from "swr";
import NutForm, { Feilds } from "./form";

export function CatForm({ id, catInfo }: { id: string; catInfo: CatInfo }) {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const statusList = [
    { value: "0", text: "失踪" },
    { value: "1", text: "正常" },
    { value: "2", text: "生病" },
    { value: "3", text: "住院" },
    { value: "4", text: "被领养" },
    { value: "5", text: "死亡" },
  ];
  const feilds: Feilds[] = [
    {
      type: "text",
      required: true,
      label: "猫咪名字",
      name: "name",
    },
    {
      type: "textarea",
      required: true,
      label: "猫咪描述",
      name: "description",
    },
    {
      type: "text",
      required: true,
      label: "猫咪出没地",
      name: "haunt",
    },
    {
      type: "select",
      required: false,
      label: "猫咪状态",
      name: "status",
      data: statusList,
    },
    {
      type: "switch",
      required: false,
      label: "是否绝育",
      name: "isNeuter",
    },
  ];
  const initialValues = {
    name: catInfo.name,
    description: catInfo.description,
    haunt: catInfo.haunt,
    status: [statusList[catInfo.status]],
    isNeuter: catInfo.isNeuter,
  };
  return (
    <>
      <NutForm
        feilds={feilds}
        initialValues={initialValues}
        onFinish={(values) => {
          const catData: CatInfo = {
            name: values.name,
            description: values.description,
            haunt: values.haunt,
            status: values.status[0].value,
            isNeuter: values.isNeuter,
            species: catInfo.species,
          };
          console.log("catData", catData);
          updateCat(id, catData)
            .then((res) => {
              console.log("updateCat", res);
              mutate(id);
              Taro.navigateBack();
            })
            .catch((e) => {
              alert(e);
            });
        }}
        footer={
          <div className={"flex justify-center w-full gap-2"}>
            <Button formType={"submit"} type={"primary"}>
              提交修改
            </Button>
            <Button onClick={() => setDeleteVisible(true)}>删除猫咪</Button>
            <Dialog
              title={"确定要删除吗？"}
              visible={deleteVisible}
              disableConfirmButton
              onConfirm={() => {
                // TODO: delete cat
                setDeleteVisible(false);
              }}
              onCancel={() => {
                setDeleteVisible(false);
              }}
            ></Dialog>
          </div>
        }
      />
    </>
  );
}
