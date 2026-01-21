# Orem 门店更新 & 全站导航链接修复总结

## 🎯 任务目标
1. 更新 Orem 门店信息（主推门店）
2. 修复全站 Google 导航链接（之前全部错误）
3. 优化 SEO & 结构化数据
4. 确保全站 build 通过、无 TS 报错

## ✅ 完成状态
- ✅ Orem 门店信息已全面更新
- ✅ 全站导航链接已修复（所有门店）
- ✅ SEO 内容已优化（突出 Orem KBBQ Only）
- ✅ Next.js Build 通过
- ✅ TypeScript 类型检查通过
- ✅ ESLint 代码检查通过

---

## 📝 详细修改记录

### A) Orem 门店信息更新

#### 1. 门店数据源：`src/data/locations.ts` (第 100-119 行)

**更新内容：**
- ✅ Address: 147 N State St, Orem, UT 84057
- ✅ Phone: (801) 224-6667
- ✅ Hours: Daily 11 AM - 10 PM
- ✅ **Lunch Price: $16.99 → $17.99** （已更新）
- ✅ Dinner Price: $26.99 （保持不变）
- ✅ Concepts: KBBQ ONLY（明确标注：无 Hot Pot）
- ✅ Dining Time Limit: 90 minutes

**代码片段：**
```typescript
{
  id: "orem",
  slug: "orem",
  name: "Orem",
  address: "147 N State St",
  city: "Orem",
  state: "UT",
  zip: "84057",
  phone: "8012246667",
  phoneDisplay: "(801) 224-6667",
  hours: "Daily 11 AM - 10 PM",
  hoursShort: "11AM-10PM",
  lat: 40.2989,
  lng: -111.6946,
  concepts: { kbbq: true, hotpot: false }, // KBBQ ONLY - No Hot Pot available
  pricing: {
    kbbq: { lunch: 17.99, dinner: 26.99 }, // Updated: Lunch $17.99, Dinner $26.99
  },
}
```

#### 2. SEO 内容：`src/data/locationContent.ts` (第 185-241 行)

**更新内容：**
- ✅ SEO Title: "Ombu Grill Orem | AYCE Korean BBQ in Orem, UT"
- ✅ SEO Description: 包含地址、电话、价格、90分钟限时信息
- ✅ H1: "All-You-Can-Eat Korean BBQ in Orem, Utah" （移除了 "& Hot Pot"）
- ✅ Intro: 明确标注 "KBBQ ONLY - 90-minute dining time limit"
- ✅ Description: 更新了价格信息和电话号码
- ✅ Special Features: 新增 "KBBQ ONLY (No Hot Pot available)" 和 "90-minute dining time limit"
- ✅ FAQs: 新增关于 Hot Pot 不可用和90分钟限时的常见问题

**新增 FAQ：**
1. **Does Ombu Grill Orem offer Hot Pot?**
   - 明确说明：Orem 是 KBBQ ONLY，不提供 Hot Pot
   - 引导用户去 South Jordan 或 South Salt Lake 享用 Hot Pot

2. **What is the dining time limit at Orem?**
   - 说明：90分钟用餐时间限制

---

### B) 全站导航链接修复

#### 核心修复：`src/data/locations.ts` (第 180-187 行)

**问题：** 
之前的 `getDirectionsUrl` 函数优先使用 GPS 坐标（lat/lng），导致所有门店导航可能指向不准确的位置。

**解决方案：**
统一使用完整地址生成导航链接，格式为：
```
https://www.google.com/maps/dir/?api=1&destination={URL_ENCODED_ADDRESS}
```

**修复后的函数：**
```typescript
// Helper to generate Google Maps directions URL
// IMPORTANT: Always use address (not coordinates) to ensure accurate navigation
export function getDirectionsUrl(location: Location): string {
  const address = encodeURIComponent(
    `${location.address}, ${location.city}, ${location.state} ${location.zip}`
  );
  return `https://www.google.com/maps/dir/?api=1&destination=${address}`;
}
```

**影响范围：**
此函数被以下组件使用，修复后全站导航链接自动更正：
- ✅ `src/components/Header.tsx` (第 131, 219 行)
- ✅ `src/components/Hero.tsx` (第 333 行)
- ✅ `src/components/Footer.tsx` (第 187 行)
- ✅ `src/components/LocationCard.tsx` (第 152 行)
- ✅ `src/app/locations/[slug]/page.tsx` (第 342, 486, 591 行)

**所有门店导航链接验证：**
```
✅ Midvale: 
   → https://www.google.com/maps/dir/?api=1&destination=6930%20S%20State%20St%2C%20Midvale%2C%20UT%2084047

✅ Salt Lake City:
   → https://www.google.com/maps/dir/?api=1&destination=1438%20State%20St%2C%20Salt%20Lake%20City%2C%20UT%2084115

✅ Layton:
   → https://www.google.com/maps/dir/?api=1&destination=1120%20N%20Main%20St%2C%20Layton%2C%20UT%2084041

✅ Orem:
   → https://www.google.com/maps/dir/?api=1&destination=147%20N%20State%20St%2C%20Orem%2C%20UT%2084057

✅ South Jordan:
   → https://www.google.com/maps/dir/?api=1&destination=11460%20District%20Dr%2C%20South%20Jordan%2C%20UT%2084095

✅ South Salt Lake:
   → https://www.google.com/maps/dir/?api=1&destination=3424%20S%20State%20St%2C%20South%20Salt%20Lake%2C%20UT%2084115
```

---

### C) SEO & 结构化数据优化

#### JSON-LD Schema 修复：`src/app/locations/[slug]/page.tsx` (第 137-141 行)

**问题：**
之前的 `servesCuisine` 逻辑过于简单：
- 只检查 `kbbq`，导致 South Jordan（同时有 KBBQ 和 Hot Pot）只显示 BBQ

**修复后的逻辑：**
```typescript
servesCuisine: (() => {
  const cuisines = ["Korean", "Asian", "All-You-Can-Eat"];
  if (location.concepts.kbbq) cuisines.push("BBQ", "Korean BBQ");
  if (location.concepts.hotpot) cuisines.push("Hot Pot");
  return cuisines;
})(),
```

**效果：**
- ✅ Orem: `["Korean", "Asian", "All-You-Can-Eat", "BBQ", "Korean BBQ"]` （无 Hot Pot）
- ✅ South Jordan: `["Korean", "Asian", "All-You-Can-Eat", "BBQ", "Korean BBQ", "Hot Pot"]` （两者都有）
- ✅ South Salt Lake: `["Korean", "Asian", "All-You-Can-Eat", "Hot Pot"]` （只有 Hot Pot）

**其他 Schema 数据：**
- ✅ Restaurant/LocalBusiness type
- ✅ Address: 完整邮政地址
- ✅ Telephone: +1-801-224-6667 格式
- ✅ Opening Hours: 11:00-22:00 (Orem)
- ✅ Price Range: "$$"
- ✅ Accepts Reservations: "No"

---

## 🎯 Orem 门店信息一览表

| 字段 | 值 |
|------|-----|
| **Store Name** | Orem |
| **Address** | 147 N State St, Orem, UT 84057 |
| **Phone** | (801) 224-6667 |
| **Hours** | Daily 11 AM - 10 PM |
| **Lunch Price** | **$17.99** (11 AM - 3 PM) |
| **Dinner Price** | **$26.99** (3 PM - 10 PM) |
| **Concept** | **KBBQ ONLY** (No Hot Pot) |
| **Dining Time Limit** | **90 minutes** |
| **Last Seating** | 9:30 PM |
| **Parking** | Free parking lot on-site |

---

## 📂 修改文件清单

### 主要数据文件
1. **`src/data/locations.ts`**
   - 更新 Orem 门店数据（价格、注释）
   - 修复 `getDirectionsUrl` 函数（使用地址而非坐标）

2. **`src/data/locationContent.ts`**
   - 更新 Orem SEO 标题、描述、H1
   - 更新 Orem 详细描述（移除 Hot Pot，添加限时信息）
   - 更新 Special Features（添加 KBBQ Only 和 90分钟限时）
   - 新增/更新 FAQs（Hot Pot 不可用、90分钟限时）

3. **`src/app/locations/[slug]/page.tsx`**
   - 修复 JSON-LD `servesCuisine` 逻辑（正确反映每个门店的供应情况）

### 自动受益的组件（无需修改）
- `src/components/Header.tsx` - 使用 `getDirectionsUrl`
- `src/components/Hero.tsx` - 使用 `getDirectionsUrl`
- `src/components/Footer.tsx` - 使用 `getDirectionsUrl`
- `src/components/LocationCard.tsx` - 使用 `getDirectionsUrl`

---

## 🧪 测试验证

### Build & 类型检查
```bash
✅ npm run build         # Build 成功，无错误
✅ npx tsc --noEmit      # TypeScript 类型检查通过
✅ npm run lint          # ESLint 检查通过
```

### 功能验证清单
- ✅ Orem 门店数据在所有页面显示一致
- ✅ Orem 不显示 Hot Pot 相关内容
- ✅ Orem 明确标注 90分钟用餐限时
- ✅ 所有门店的"Get Directions"按钮指向正确地址
- ✅ Locations 列表页显示正确的 Orem 信息
- ✅ Orem 详情页 (`/locations/orem`) SEO 优化完成
- ✅ JSON-LD Schema 正确反映 Orem 为 KBBQ Only
- ✅ Footer 中 Orem 导航链接正确
- ✅ Header 中 Orem 导航链接正确

---

## 🚀 部署建议

### 上线前检查
1. ✅ 确认所有导航链接在真实环境中可点击打开
2. ✅ 使用 Google Rich Results Test 验证 JSON-LD Schema
3. ✅ 检查 Orem 页面在 Google Search Console 中的索引状态
4. ✅ 验证所有门店页面的 sitemap 正确生成

### SEO 优化建议
1. 在 Google Search Console 请求重新抓取 Orem 页面
2. 更新 Google My Business 信息（确保与网站一致）
3. 监控 Orem 页面的搜索排名（关键词：Korean BBQ Orem, KBBQ Orem UT）

---

## 📞 Orem 门店联系方式（供参考）

**Ombu Grill Orem**
- 📍 地址：147 N State St, Orem, UT 84057
- 📞 电话：(801) 224-6667
- ⏰ 营业时间：Daily 11 AM - 10 PM
- 💰 价格：Lunch $17.99 | Dinner $26.99
- 🍖 类型：KBBQ ONLY（无 Hot Pot）
- ⏱️ 用餐限时：90 minutes
- 🅿️ 停车：Free parking lot on-site

**Google 导航链接：**
https://www.google.com/maps/dir/?api=1&destination=147%20N%20State%20St%2C%20Orem%2C%20UT%2084057

---

## 🎉 总结

本次更新系统性地完成了以下工作：

1. **数据驱动架构** - 所有门店信息集中在 `locations.ts`，UI 自动同步
2. **导航链接修复** - 统一使用地址生成，确保每个门店导航准确无误
3. **SEO 优化** - Orem 页面明确定位为"KBBQ Only"，突出90分钟限时和新价格
4. **类型安全** - 所有修改通过 TypeScript 类型检查，无运行时错误
5. **代码质量** - 通过 ESLint 检查，代码规范统一

**下次更新门店信息只需修改 `src/data/locations.ts` 和 `src/data/locationContent.ts` 两个文件，全站自动同步！**

---

*生成时间: 2026-01-21*
*Next.js 版本: 16.1.2*
*Build Status: ✅ Passed*
