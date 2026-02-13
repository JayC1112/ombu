# 性能优化与监控文档

## P1-1: 性能优化

### 缓存策略

| 页面/接口 | 缓存时间 | 策略 |
|-----------|----------|------|
| /api/cms/locations | 5分钟 | ISR |
| /api/cms/pricing | 5分钟 | ISR |
| /api/cms/gallery | 5分钟 | ISR |
| /api/cms/settings | 5分钟 | ISR |
| / | 5分钟 | ISR |

### 图片优化

当前使用 placeholder 占位图。上线前需：

1. **使用 Supabase Storage** 存储图片
2. **启用 CDN**（Supabase Pro）
3. **使用 WebP 格式**
4. **添加懒加载**（Next.js Image 组件）

```tsx
import Image from 'next/image'

<Image 
  src={url} 
  alt={alt}
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={blur}
/>
```

## P1-2: 监控与告警

### 已实现

- **ErrorBoundary** - 组件错误捕获
- **前端错误日志** - 控制台输出

### 可选：Sentry 集成

```bash
npm install @sentry/nextjs
```

然后在 Sentry 创建项目并获取 DSN。

### 监控点位

| 类型 | 指标 | 阈值 |
|------|------|------|
| API | 响应时间 | > 2s 告警 |
| API | 5xx 错误 | > 1% 告警 |
| 前端 | JS 错误 | 任何 |
| 登录 | 失败次数 | > 5次/分钟 |

## P1-3: SEO 优化

### LocalBusiness Schema

每个门店页面需添加：

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Ombu Grill Midvale",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "6930 S State St",
    "addressLocality": "Midvale",
    "addressRegion": "UT",
    "postalCode": "84047"
  },
  "telephone": "(801) 561-3577",
  "openingHours": ["Mo-Su 11:00-22:00"]
}
```

### 转化追踪

| 事件 | 追踪方式 |
|------|----------|
| 电话点击 | `tel:` link |
| 导航点击 | Google Analytics |
| 菜单查看 | GA event |

## P1-4: 内容发布流程

### 当前状态

- 直接发布（修改立即生效）

### 建议：草稿/发布

```sql
-- 添加状态字段
ALTER TABLE gallery_images ADD COLUMN status TEXT DEFAULT 'published';
ALTER TABLE site_settings ADD COLUMN status TEXT DEFAULT 'published';
```

### 流程

1. **草稿** - 仅后台可见
2. **待审核** - 等待审批
3. **已发布** - 前台可见
