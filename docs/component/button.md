<style>
    .example{
        border: 1px solid #f5f5f5;
        border-radius: 5px;
        padding:20px
    }
    .ea-button {
        margin-right: 10px 5px
    }
    
    details > summary:first-of-type {
        font-size: 10px;
        padding: 8px 0;
        cursor: pointer;
        color: #1989fa;
    }
</style>

# Button 按钮

## 基础用法

使用 type、plain、round 和 circle 来定义按钮的样式。

<div class="example">
    <div>
        <ea-button>默认按钮</ea-button>
        <ea-button type="primary">主要按钮</ea-button>
    </div>

</div>

<details>
<summary>展开查看</summary>

```vue
<template>
    <div>
        <ea-button>默认按钮</ea-button>
        <ea-button type="primary">主要按钮</ea-button>
    </div>
</template>
<script lang="ts" setup></script>
<style></style>
```

</details>

## API

### Button Props

| 名称  | 类型             | 默认值    | 说明     |
| ----- | ---------------- | --------- | -------- |
| type | string           | default | 类型 |
