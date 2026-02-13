# 部署检查清单

## 部署前检查

- [x] P0 安全修复完成
- [x] RLS 策略已启用
- [x] 后台登录保护
- [x] .env 已加入 .gitignore
- [x] API 缓存已配置

## Vercel 部署步骤

### 1. 推送代码到 GitHub

```bash
cd /Users/jaychen/ombu
git add .
git commit -m "CMS v1.0 - Ready for production"
git push origin main
```

### 2. Vercel 导入

1. 访问 https://vercel.com
2. Import Git Repository
3. 选择 ombu 项目
4. 配置环境变量：

| 变量名 | 值 |
|--------|-----|
| NEXT_PUBLIC_SUPABASE_URL | https://pupgxrsvbptybumzuydr.supabase.co |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | （从 Supabase 获取） |

### 3. 部署

- 点击 Deploy
- 等待构建完成
- 访问生成的 URL 测试

### 4. 自定义域名（可选）

1. Vercel → Settings → Domains
2. 添加 ombugrillutah.com
3. 按提示配置 DNS

## 部署后验证

```bash
# 检查生产环境
curl -s -o /dev/null -w "首页: %{http_code}\n" https://your-vercel-url.com
curl -s -o /dev/null -w "API: %{http_code}\n" https://your-vercel-url.com/api/cms/locations

# 检查后台保护
curl -s -o /dev/null -w "后台: %{http_code}\n" https://your-vercel-url.com/admin
```

## 回滚

Vercel → Deployments → 选择上一个版本 → Promote to Production
