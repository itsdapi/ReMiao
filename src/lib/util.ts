import Taro from "@tarojs/taro";

/**
 *
 * @returns 返回从顶上直到按钮的高度（非遮挡高度）
 */
export async function getStatusBarHeight() {
  const value = (await Taro.getSystemInfo()).statusBarHeight;
  const memuHeight = Taro.getMenuButtonBoundingClientRect().height;
  return value ? value + memuHeight : 0;
}
