import { updateCat } from "@/lib/miao-api/management";
import { CatInfo } from "@/lib/miao-api/type";
import {
  Form,
  Button,
  Input,
  TextArea,
  Picker,
  Cell,
  Switch,
  Divider,
} from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import { mutate } from "swr";

export function CatForm({ id, catInfo }: { id: string; catInfo: CatInfo }) {
  const statusList = [
    { value: "0", text: "失踪" },
    { value: "1", text: "正常" },
    { value: "2", text: "生病" },
    { value: "3", text: "住院" },
    { value: "4", text: "被领养" },
    { value: "5", text: "死亡" },
  ];
  return (
    <>
      <Form
        initialValues={{
          name: catInfo.name,
          description: catInfo.description,
          haunt: catInfo.haunt,
          status: [catInfo.status],
          isNeuter: catInfo.isNeuter,
        }}
        labelPosition={"right"}
        onFinish={(values) => {
          const cataData: CatInfo = {
            name: values.name,
            description: values.description,
            haunt: values.haunt,
            status: values.status[0],
            isNeuter: values.isNeuter,
            species: catInfo.species,
          };
          updateCat(id, cataData)
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
          <>
            <Button formType={"submit"} block type={"primary"}>
              提交
            </Button>
          </>
        }
      >
        <Form.Item
          required
          label={"猫咪名字"}
          name={"name"}
          initialValue={catInfo.name}
        >
          <Input
            className={"nut-input-text"}
            placeholder={"请输入猫咪名字"}
            type={"text"}
          />
        </Form.Item>
        <Form.Item
          required
          label={"猫咪描述"}
          name={"description"}
          initialValue={catInfo.description}
        >
          <TextArea
            className={"nut-input-text"}
            placeholder={"请输入猫咪描述"}
          />
        </Form.Item>
        <Form.Item
          required
          label={"猫咪出没地"}
          name={"haunt"}
          initialValue={catInfo.haunt}
        >
          <Input
            className={"nut-input-text"}
            placeholder={"请输入猫咪出没地"}
            type={"text"}
          />
        </Form.Item>
        {/* 猫咪状态,0表示失踪,1表示正常,2表示生病,3表示住院,4表示被领养,5表示死亡 */}
        <Form.Item
          label={"猫咪状态"}
          name={"status"}
          trigger={"onConfirm"}
          onClick={(_, ref: any) => {
            ref.open();
          }}
        >
          <Picker options={statusList}>
            {(value: any) => {
              return (
                <Cell
                  className={"nutui-cell--clickable p-0"}
                  title={
                    value.length
                      ? statusList.filter((po) => po.value === value[0])[0]
                          ?.text
                      : "请选择"
                  }
                  align={"center"}
                />
              );
            }}
          </Picker>
        </Form.Item>
        <Form.Item
          label={"是否绝育"}
          name={"isNeuter"}
          valuePropName={"checked"}
        >
          <Switch />
        </Form.Item>
      </Form>
      <Divider />
    </>
  );
}
