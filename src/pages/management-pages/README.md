## 大致想法

index是管理页面入口

然后各个文件夹是一个大的功能类 里面有细分的功能

> 例如cat是猫咪类 然后有列表list 还有详细信息info 其中info页面可以承担添加猫咪 或者修改猫咪数据功能
> 剩下的同理

然后我打算是用[Taro UI](https://taro-ui.jd.com/#/docs/introduction)或者[Nut UI](https://nutui.jd.com/taro/react/2x/#/zh-CN/component/button)
> 因为这个页面只用给自己人用 所以不需要自己花时间设计了其实

接口在`/src/lib/miao-api/management.ts`这里写

API接口文档我会发群里

然后接口已经做好底层封装了 直接调用 `miaoApiCall()` 就行

```typescript
import { miaoApiCall } from "@/lib/miao-api/util";
```

最后就是用绝对地址引入

