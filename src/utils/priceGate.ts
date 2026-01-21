/**
 * Price Display Gate Utility
 * 
 * 统一控制价格显示逻辑
 * 只有在用户明确选择了门店（通过定位或手动选择）后才显示价格
 */

import { useLocationStore } from "@/store/locationStore";

/**
 * 判断是否应该显示价格
 * 
 * 规则：
 * - 用户手动选择了门店（selectedLocation !== null）→ 显示价格
 * - 定位成功且找到了最近门店（locationStatus === "granted" && nearestLocation !== null）→ 显示价格
 * - 其他情况（未定位、定位失败、未选择门店）→ 不显示价格
 * 
 * @returns boolean - true 表示可以显示价格，false 表示应该隐藏价格
 */
export function useDisplayPrices(): boolean {
  const { locationStatus, nearestLocation, selectedLocation } = useLocationStore();
  
  // 用户手动选择了门店
  if (selectedLocation !== null) {
    return true;
  }
  
  // 定位成功且找到了最近门店
  if (locationStatus === "granted" && nearestLocation !== null) {
    return true;
  }
  
  // 其他情况：不显示价格
  return false;
}

/**
 * 非 Hook 版本（用于非 React 组件）
 * 需要传入 location store 的状态
 */
export function shouldDisplayPrices(params: {
  locationStatus: "idle" | "locating" | "granted" | "denied" | "error";
  nearestLocation: { id: string } | null;
  selectedLocation: { id: string } | null;
}): boolean {
  const { locationStatus, nearestLocation, selectedLocation } = params;
  
  // 用户手动选择了门店
  if (selectedLocation !== null) {
    return true;
  }
  
  // 定位成功且找到了最近门店
  if (locationStatus === "granted" && nearestLocation !== null) {
    return true;
  }
  
  // 其他情况：不显示价格
  return false;
}
