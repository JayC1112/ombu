# 🚀 部署检查清单

## ✅ 预部署验证

### 1. 代码质量检查
- ✅ **Build 通过** - `npm run build` 成功，无错误
- ✅ **TypeScript 检查** - `npx tsc --noEmit` 通过
- ✅ **ESLint 检查** - `npm run lint` 通过
- ✅ **所有页面生成** - 14 个页面全部成功生成

### 2. Orem 门店信息验证

| 检查项 | 要求值 | 状态 |
|--------|--------|------|
| 地址 | 147 N State St, Orem, UT 84057 | ✅ |
| 电话显示 | (801) 224-6667 | ✅ |
| 电话 E.164 | +18012246667 | ✅ |
| 营业时间 | 11:00 AM – 10:00 PM | ✅ |
| Lunch 价格 | $17.99 | ✅ |
| Dinner 价格 | $26.99 | ✅ |
| 类型 | KBBQ ONLY (无 Hot Pot) | ✅ |
| 用餐限时 | 90 分钟 | ✅ |

### 3. 导航链接验证

所有6个门店的导航链接都已修复：

| 门店 | 导航地址 | 状态 |
|------|----------|------|
| Midvale | 6930 S State St, Midvale, UT 84047 | ✅ |
| Salt Lake City | 1438 State St, Salt Lake City, UT 84115 | ✅ |
| Layton | 1120 N Main St, Layton, UT 84041 | ✅ |
| **Orem** | **147 N State St, Orem, UT 84057** | ✅ |
| South Jordan | 11460 District Dr, South Jordan, UT 84095 | ✅ |
| South Salt Lake | 3424 S State St, South Salt Lake, UT 84115 | ✅ |

**导航链接格式：**
```
https://www.google.com/maps/dir/?api=1&destination={URL编码的完整地址}
```

### 4. 文件修改清单

#### 新建文件
- ✅ `src/utils/maps.ts` - 导航链接生成工具

#### 修改文件
- ✅ `src/data/locations.ts` - 唯一门店数据源（Orem 更新 + 所有门店 phoneE164）
- ✅ `src/data/locationContent.ts` - Orem SEO 内容
- ✅ `src/app/locations/[slug]/page.tsx` - JSON-LD Schema 修复
- ✅ `src/app/layout.tsx` - 价格信息更新

#### 自动受益组件（无需修改）
- ✅ `src/components/Header.tsx`
- ✅ `src/components/Hero.tsx`
- ✅ `src/components/Footer.tsx`
- ✅ `src/components/LocationCard.tsx`

---

## 📦 部署步骤

### 选项 1: Vercel 部署（推荐）

如果项目已连接到 Vercel：

```bash
# 1. 提交更改
git add .
git commit -m "feat: 更新 Orem 门店信息并修复全站导航链接"

# 2. 推送到远程仓库
git push origin main

# Vercel 会自动检测并部署
```

### 选项 2: 手动部署

```bash
# 1. 构建生产版本
npm run build

# 2. 启动生产服务器（本地测试）
npm start

# 3. 或导出静态文件（如果使用静态导出）
# 在 next.config.ts 中配置 output: 'export'
```

### 选项 3: 其他平台

根据您的部署平台（Netlify、AWS、Azure 等），按照相应平台的部署流程操作。

---

## 🔍 部署后验证

### 1. 功能验证

访问以下页面并验证：

- [ ] **首页** (`/`)
  - [ ] Hero 区域显示正确的 Orem 信息
  - [ ] 导航按钮指向正确地址

- [ ] **Orem 详情页** (`/locations/orem`)
  - [ ] 地址：147 N State St, Orem, UT 84057
  - [ ] 电话：(801) 224-6667
  - [ ] 营业时间：11:00 AM – 10:00 PM
  - [ ] 价格：Lunch $17.99, Dinner $26.99
  - [ ] 明确标注：KBBQ ONLY（无 Hot Pot）
  - [ ] 90分钟用餐限时
  - [ ] "Get Directions" 按钮指向正确地址

- [ ] **所有门店导航链接**
  - [ ] Midvale → 正确地址
  - [ ] Salt Lake City → 正确地址
  - [ ] Layton → 正确地址
  - [ ] Orem → 正确地址
  - [ ] South Jordan → 正确地址
  - [ ] South Salt Lake → 正确地址

### 2. SEO 验证

- [ ] **Orem 页面 SEO**
  - [ ] Title: "Ombu Grill Orem | AYCE Korean BBQ in Orem, UT"
  - [ ] Description 包含地址、电话、价格、90分钟限时
  - [ ] H1: "All-You-Can-Eat Korean BBQ in Orem, Utah"
  - [ ] 无 Hot Pot 相关内容

- [ ] **JSON-LD Schema**
  - [ ] 使用 Google Rich Results Test 验证
  - [ ] `servesCuisine` 正确（Orem 无 Hot Pot）
  - [ ] 地址、电话、营业时间正确

### 3. 性能检查

- [ ] 页面加载速度正常
- [ ] 所有图片正常显示
- [ ] 导航链接可正常打开
- [ ] 移动端响应式正常

---

## 🐛 已知问题

无已知问题。

---

## 📝 部署备注

### 重要提醒

1. **数据源唯一性**
   - 所有门店信息只在 `src/data/locations.ts` 定义
   - 修改门店信息只需更新此文件

2. **导航链接生成**
   - 统一使用 `src/utils/maps.ts` 中的 `buildGoogleDirectionsUrl()`
   - 所有组件通过 `getDirectionsUrl(location)` 调用

3. **Orem 特殊说明**
   - Orem 是 KBBQ ONLY，无 Hot Pot
   - 90分钟用餐限时
   - 价格：Lunch $17.99, Dinner $26.99

---

## 🎯 部署后建议

1. **Google Search Console**
   - 请求重新抓取 Orem 页面
   - 监控搜索排名变化

2. **Google My Business**
   - 确保 Google My Business 信息与网站一致
   - 地址、电话、营业时间同步

3. **测试导航链接**
   - 在真实设备上测试所有门店的导航按钮
   - 确保在移动端和桌面端都能正常打开 Google Maps

4. **监控**
   - 监控网站访问量
   - 检查是否有错误日志
   - 验证用户反馈

---

## ✅ 部署确认

- [ ] 所有代码已提交到 Git
- [ ] Build 通过，无错误
- [ ] 已推送到远程仓库（如适用）
- [ ] 部署平台已配置
- [ ] 部署成功
- [ ] 功能验证通过
- [ ] SEO 验证通过

---

*最后更新：2026-01-21*  
*Build Status: ✅ Passed*  
*Ready for Deployment: ✅ Yes*
