import {
  Cell,
  Form,
  Input,
  Picker,
  Switch,
  TextArea,
} from "@nutui/nutui-react-taro";

export default function NutForm({
  feilds,
  initialValues,
  onFinish,
  footer,
}: {
  feilds: Feilds[];
  initialValues: any;
  onFinish: (values: any) => void;
  footer: JSX.Element;
}) {
  return (
    <Form initialValues={initialValues} onFinish={onFinish}>
      {feilds.map((item) => {
        switch (item.type) {
          case "text":
            return (
              <Form.Item
                required={item.required}
                label={item.label}
                name={item.name}
              >
                <Input className={"nut-input-text"} type={"text"} />
              </Form.Item>
            );
          case "textarea":
            return (
              <Form.Item
                required={item.required}
                label={item.label}
                name={item.name}
              >
                <TextArea className={"nut-input-text"} />
              </Form.Item>
            );
          case "select":
            return (
              <Form.Item
                required={item.required}
                label={item.label}
                name={item.name}
                trigger={"onConfirm"}
                onClick={(_, ref: any) => {
                  ref.open();
                }}
              >
                <Picker options={item.data}>
                  {(value: any) => {
                    if (item.data === undefined) return null;
                    return (
                      <Cell
                        className={"nutui-cell--clickable p-0"}
                        title={
                          value.length
                            ? item.data.filter(
                                (po) => po.value === value[0].value
                              )[0]?.text
                            : "请选择"
                        }
                        align={"center"}
                      />
                    );
                  }}
                </Picker>
              </Form.Item>
            );
          case "switch":
            return (
              <Form.Item
                required={item.required}
                label={item.label}
                name={item.name}
                valuePropName={"checked"}
              >
                <Switch />
              </Form.Item>
            );
          default:
            return null;
        }
      })}
      {footer}
    </Form>
  );
}

export type Feilds = {
  required: boolean;
  label: string;
  name: string;
  type: string;
  data?: { value: string; text: string }[];
};
