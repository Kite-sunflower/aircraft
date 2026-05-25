# 飞机维修管理系统 API 文档（Node.js + Express + MongoDB）

---

# 1. 统一响应格式

```json
{
"code": 200,
"message": "success",
"data": {}
}

---

# 2. 用户模块（Auth）

---

## 注册

POST /api/auth/register

请求：
{
"username": "test",
"password": "123456a1"
}

响应：
{
"code": 200,
"message": "注册成功",
"data": {
"_id": "userId",
"username": "test",
"role": "worker",
"status": "active"
}
}

---

## 登录

POST /api/auth/login

请求：
{
"username": "admin",
"password": "123456a1"
}

响应：
{
"code": 200,
"message": "登录成功",
"data": {
"user": {
"_id": "userId",
"username": "admin",
"role": "admin"
},
"token": "jwt_token"
}
}

---

## 个人信息

GET /api/auth/profile

响应：
{
"code": 200,
"message": "success",
"data": {
"_id": "userId",
"username": "admin",
"role": "admin"
}
}

---

## 修改密码

PUT /api/auth/password

请求：
{
"oldPwd": "123456a1",
"newPwd": "abc12345"
}

响应：
{
"code": 200,
"message": "修改成功",
"data": true
}

---

# 3. 用户管理模块

---

## 获取用户列表

GET /api/user

响应：
{
"code": 200,
"message": "success",
"data": {
"list": [],
"total": 0
}
}

---

## 用户详情

GET /api/user/:id

响应：
{
"code": 200,
"message": "success",
"data": {
"_id": "userId",
"username": "tom",
"role": "worker",
"status": "active"
}
}

---

## 创建用户

POST /api/user/create

请求：
{
"username": "tom",
"password": "123456a1",
"role": "worker"
}

响应：
{
"code": 200,
"message": "创建成功",
"data": {
"_id": "userId",
"username": "tom",
"role": "worker"
}
}

---

## 更新用户

PUT /api/user/:id/update

请求：
{
"username": "tom2"
}

响应：
{
"code": 200,
"message": "更新成功",
"data": {
"_id": "userId",
"username": "tom2"
}
}

---

## 删除用户

DELETE /api/user/:id/delete

响应：
{
"code": 200,
"message": "删除成功",
"data": true
}

---

## 批量删除用户

POST /api/user/batch/delete

请求：
{
"ids": ["id1", "id2"]
}

响应：
{
"code": 200,
"message": "删除成功",
"data": true
}

---

## 修改角色

PUT /api/user/:id/role

请求：
{
"role": "toolManager"
}

响应：
{
"code": 200,
"message": "修改成功",
"data": {
"_id": "userId",
"role": "toolManager"
}
}

---

# 4. 工具模块

---

## 工具结构

{
"_id": "toolId",
"name": "电钻",
"stock": 10,
"availableStock": 6,
"status": "available"
}

---

## 获取工具列表

GET /api/tool

响应：
{
"code": 200,
"message": "success",
"data": {
"list": [],
"total": 0
}
}

---

## 工具详情

GET /api/tool/:id

响应：
{
"code": 200,
"message": "success",
"data": {
"_id": "toolId",
"name": "电钻"
}
}

---

## 创建工具

POST /api/tool/create

请求：
{
"name": "电钻",
"stock": 10
}

响应：
{
"code": 200,
"message": "创建成功",
"data": {
"_id": "toolId",
"name": "电钻",
"stock": 10,
"availableStock": 10,
"status": "available"
}
}

---

## 更新工具

PUT /api/tool/:id/update

请求：
{
"name": "电钻Pro"
}

响应：
{
"code": 200,
"message": "更新成功",
"data": {
"_id": "toolId",
"name": "电钻Pro"
}
}

---

## 删除工具

DELETE /api/tool/:id/delete

响应：
{
"code": 200,
"message": "删除成功",
"data": true
}

---

## 修改状态

PUT /api/tool/:id/status

请求：
{
"status": "repair"
}

响应：
{
"code": 200,
"message": "修改成功",
"data": {
"_id": "toolId",
"status": "repair"
}
}

---

## 借工具

POST /api/tool/:id/borrow

请求：
{
"borrower": "userId",
"lender": "userId",
"quantity": 2
}

响应：
{
"code": 200,
"message": "借用成功",
"data": {
"_id": "recordId",
"tool": "toolId",
"borrower": "userId",
"lender": "userId",
"quantity": 2,
"status": "borrowing",
"borrowAt": "2026-05-20T10:00:00Z"
}
}

---

## 还工具

POST /api/tool/:id/return

请求：
{
"returner": "userId"
}

响应：
{
"code": 200,
"message": "归还成功",
"data": {
"_id": "recordId",
"status": "returned",
"returnAt": "2026-05-20T12:00:00Z",
"returner": "userId"
}
}

---

# 5. 物料模块

---

## 物料结构

{
"_id": "materialId",
"name": "钢材",
"stock": 100,
"availableStock": 80
}

---

## 发放物料

POST /api/material/:id/distribute

请求：
{
"receiverId": "userId",
"quantity": 10
}

响应：
{
"code": 200,
"message": "发放成功",
"data": {
"_id": "recordId",
"material": "materialId",
"receiver": "userId",
"quantity": 10,
"receivedAt": "2026-05-20T10:00:00Z"
}
}

---

# 6. 任务模块

---

## 任务结构

{
"_id": "taskId",
"title": "修复Bug",
"description": "登录异常",
"status": "pending"
}

---

## 创建任务

POST /api/task/create

请求：
{
"title": "修复Bug",
"description": "登录异常"
}

响应：
{
"code": 200,
"message": "创建成功",
"data": {
"_id": "taskId",
"status": "pending"
}
}

---

## 分配任务

PUT /api/task/:id/distribute

请求：
{
"workerId": "userId"
}

响应：
{
"code": 200,
"message": "分配成功",
"data": {
"_id": "taskId",
"worker": "userId",
"status": "doing",
"assignedAt": "2026-05-20T10:00:00Z"
}
}

---

## 完成任务

PUT /api/task/:id/finish

响应：
{
"code": 200,
"message": "完成成功",
"data": {
"_id": "taskId",
"status": "finished",
"finishedAt": "2026-05-20T12:00:00Z"
}
}

---

# 7. 数据记录

---

## ToolBorrowRecord

{
"tool": "toolId",
"lender": "userId",
"borrower": "userId",
"returner": "userId",
"quantity": 2,
"status": "borrowing"
}

---

## MaterialReceiveRecord

{
"material": "materialId",
"distributor": "userId",
"receiver": "userId",
"quantity": 10,
"receivedAt": "2026-05-20T10:00:00Z"
}

---

# 8. 业务流程

工具：
借出 → 扣库存 → 创建记录
归还 → 加库存 → 更新记录

物料：
发放 → 扣库存 → 创建记录

任务：
pending → doing → finished

---

# 9. 权限系统

- admin：全部权限
- toolManager：工具管理
- materialManager：物料管理
- worker：任务执行

---

# 10. 项目总结

本系统实现：

- RBAC权限系统
- 工具借还系统
- 物料发放系统
- 任务流程系统
- 操作记录系统

属于企业级资源管理系统（ERP-lite）
```
