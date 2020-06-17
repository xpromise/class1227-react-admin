# 按钮级别权限管理

## 整体组件
* App
  * Layout 整体布局组件
    * PublicLayout 公开布局组件
      * 渲染公开的路由表 constantRoutes
    * PrimaryLayout 私有布局组件
      * 从后台请求用户数据 + 权限数据来生成 asyncRoutes 从而渲染

* 私有
  * Authorized 负责请求数据（用户数据 + 权限数据）
    * Loading 负责渲染loading图
      * PrimaryLayout 主要布局组件
        * SideMenu 左侧导航
        * Layout 右边布局
          * Header 头部
          * Content 内容区
            * AuthorizedRouter 渲染私有路由表（根据后台返回数据生成）

