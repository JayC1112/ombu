# 环境变量配置

## 开发环境 (.env.local)

```bash
# Supabase（公开）
NEXT_PUBLIC_SUPABASE_URL=https://pupgxrsvbptybumzuydr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# CMS API Key（仅后台使用）
CMS_API_KEY=ombu_admin_2024_secure_key

# 登录密码（生产环境应使用真实认证）
ADMIN_EMAIL=jaychen1112@gmail.com
ADMIN_PASSWORD=ombu2024!
```

## 生产环境 (Vercel Environment Variables)

```
NEXT_PUBLIC_SUPABASE_URL=https://pupgxrsvbptybumzuydr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<从 Supabase Settings > API 获取>
CMS_API_KEY=<生成一个安全的随机字符串>
```

## 需要添加到 .gitignore 的文件

```
.env
.env.local
.env.production
.env.*.local
```

## 部署检查清单

- [ ] Vercel 已配置 NEXT_PUBLIC_SUPABASE_URL
- [ ] Vercel 已配置 NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] .env.local 不在 git 仓库中
- [ ] SUPABASE_SERVICE_ROLE_KEY 未暴露到前端
