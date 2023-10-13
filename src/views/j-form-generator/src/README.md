## 核心思路

左侧生成需要哪些formItem，中间主体遍历展示formItem，右侧配置对应属性。

属性配置，需要划分为通用属性和组件独有属性。
还需要事件处理。

## 实施步骤

左侧字段，中间主体 -> 右侧配置 -> 头部

### 左侧字段 FormComponents.vue √

- 描述表单组件元信息 interface FormComponentMeta
  - label: 叫什么名字,
    type: 是哪个组件,

### 中间主体 MainForm.vue √

- 基本拖拽功能 √
  - **深拷贝**左侧字段 drop 过来的元数据，进一步处理得到能够完整描述表单item的新元数据，彼此状态隔离 interface FormItemMeta
- 复制 √
  - **深拷贝**当前active form item
  - push
  - 聚焦
- 删除 √
  - splice
- 焦点（currentFormItem）√
  - add时候聚焦
  - 删除时候失焦，焦点下移，如果没有下一个元素，就上移

### 右侧配置 Setting.vue

- 基本属性配置：
  - 所有表单组件通用的属性
- 表单item属性
  - label
  - label-position
  - span
  - default value
  - disable
  - hide
  - require
- 表单组件属性
  - 表单组件独有的属性
- 事件配置
  - 引入minac editor

### 头部 Header.vue

- 撤销恢复
  - 历史记录采用顺序表
- 导入导出
  - 轻松实现
- 预览
- 配合j form组件轻松实现
- 清空
  - 清空当前form
