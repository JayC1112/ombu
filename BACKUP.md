# 备份与回滚文档

## Supabase 自动备份

Supabase 免费/Pro 版提供：
- **自动每日备份**（由 Supabase 托管）
- **Point-in-time恢复**：可恢复到过去7天任意时间点

## 手动备份（可选）

```bash
# 导出所有表数据
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

## 回滚流程

### 1. 数据库回滚
1. 登录 Supabase Dashboard
2. 前往 Settings → Database
3. 点击 "Point in time restore"
4. 选择恢复时间点
5. 确认恢复

### 2. 代码回滚（Vercel）
1. 登录 Vercel Dashboard
2. 进入项目 → Deployments
3. 找到上一个正常版本
4. 点击 "..." → "Promote to Production"

## 演练步骤（建议每月一次）

1. 导出当前数据库：`pg_dump > backup.sql`
2. 修改一条测试数据
3. 验证数据存在
4. 从备份恢复
5. 验证数据已恢复

## 备份频率

| 类型 | 频率 | 保留 |
|------|------|------|
| Supabase 自动 | 每日 | 7天 |
| 手动导出 | 可选 | 按需 |

## 紧急情况联系人

- Supabase 支持: support@supabase.com
- Vercel 支持: vercel.com/support
