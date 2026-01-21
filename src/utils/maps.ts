/**
 * Google Maps 导航链接生成工具
 * 
 * 统一生成指向特定地址的 Google Maps 导航链接
 */

/**
 * 生成 Google Maps 导航链接
 * @param addressFull 完整地址（必须包含街道、城市、州、邮编）
 * @returns Google Maps Directions URL
 */
export function buildGoogleDirectionsUrl(addressFull: string): string {
  return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(addressFull);
}

/**
 * 生成 Google Maps 嵌入 URL（用于 iframe）
 * @param addressFull 完整地址
 * @returns Google Maps Embed URL
 */
export function buildGoogleMapsEmbedUrl(addressFull: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(addressFull)}&output=embed`;
}
