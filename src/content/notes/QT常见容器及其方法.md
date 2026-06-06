---
title: "QT常见容器及其方法"
slug: "QT常见容器及其方法"
date: "2026-06-06"
tags: ["Qt6", "C++"]
summary: "QT常见容器及其方法"
type: "note"
draft: false
---






Qt的容器类提供了一套比 STL 更轻量、安全且易于使用的模板容器[](https://doc.qt.ac.cn/qt-6/containers.html#assignable-data-types)[](https://www.e-com-net.com/article/1726370894521118720.htm)。按存储方式分为两大类：

- **顺序容器**：数据按添加顺序线性存储[](https://doc.qt.ac.cn/qt-6/containers.html#assignable-data-types)。
    
- **关联容器**：以键值对（Key-Value）形式存储，便于通过键快速查找值[](https://doc.qt.ac.cn/qt-6/containers.html#assignable-data-types)。
    

---

### 🗂️ 顺序容器

| 容器                 | 描述                                                                                                                                                  | 适用场景                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **QList<T>**       | **最常用**的动态数组，基于数组实现，支持快速索引访问[](https://bbs.huaweicloud.com/blogs/367798)。                                                                           | **通用列表**，99% 场景的首选[](https://doc.qt.ac.cn/qt-6/containers.html#assignable-data-types)。 |
| **QStringList**    | `QList<QString>` 的子类，专门用于处理字符串列表[](https://doc.qt.ac.cn/qt-6/qstringlist.html#QStringList-1)。                                                       | 字符串列表操作，如路径、文件名列表。                                                                     |
| **QLinkedList<T>** | 链式存储。                                                                                                                                               | **列表中间需频繁插入/删除**。                                                                      |
| **QVector<T>**     | 连续内存存储的动态数组，类似于 `std::vector`[](https://bbs.huaweicloud.com/blogs/367798)。                                                                          | **需要与C++ API交互**或强调数据连续性。                                                              |
| **QStack<T>**      | `QVector` 的便捷子类，提供**后进先出（LIFO）** 语义[](https://doc.qt.ac.cn/qt-6/containers.html#assignable-data-types)[](https://bbs.huaweicloud.com/blogs/367798)。 | 函数调用栈、撤销/重做操作。                                                                         |
| **QQueue<T>**      | `QList` 的便捷子类，提供**先进先出（FIFO）** 语义[](https://doc.qt.ac.cn/qt-6/containers.html#assignable-data-types)[](https://bbs.huaweicloud.com/blogs/367798)。   | 任务队列、消息队列。                                                                             |

> **注意**：自 Qt 6 起，`QVector` 已成为 `QList` 的别名，在代码中可直接使用 `QList`。 `QLinkedList` 在 Qt 6 中已**被移除**，如确需链式结构，建议使用 `std::list`[](https://doc.qt.ac.cn/qt-6/containers.html#assignable-data-types)。

#### 📝 顺序容器通用方法

**`QList`/`QStringList`**：

- **添加元素**：`append()`（尾增）、`prepend()`（头增）、`insert()`（指定位置插入）[](https://bbs.huaweicloud.com/blogs/367798)。
    
- **访问元素**：`at()` 或 `[]` 运算符[](https://www.e-com-net.com/article/1726370894521118720.htm)。
    
- **删除元素**：`removeAt()`、`removeFirst()`、`removeLast()` 等[](https://www.e-com-net.com/article/1726370894521118720.htm)。
    
- **查询状态**：`isEmpty()` 判空、`size()`/`count()` 取长。
    
- **查找元素**：`indexOf()`、`contains()`。
    
- **字符串专属**（仅 `QStringList`）：`filter()`（筛选）、`join()`（拼接）、`contains()`（搜索）[](https://doc.qt.ac.cn/qt-6/qstringlist.html#QStringList-1)。
    

**`QStack`**：

- `push()` 入栈、`pop()` 出栈、`top()` 取栈顶元素。
    

**`QQueue`**：

- `enqueue()` 入队、`dequeue()` 出队、`head()` 取队头元素。
    

---

### 🔑 关联容器

|容器|底层实现|描述|适用场景|
|---|---|---|---|
|**QMap<Key, T>**|**平衡二叉树**（红黑树）|**有序**存储唯一键值对[](https://cloud.baidu.com/article/2827783)。|**需按键排序**访问元素。|
|**QHash<Key, T>**|**哈希表**|**无序**存储唯一键值对，查找速度快[](https://doc.qt.ac.cn/qt-6/containers.html#assignable-data-types)。|**对查找速度要求高**，不关心顺序。|
|**QSet<T>**|哈希表|**无序**存储唯一值，数学意义上的集合[](https://bbs.huaweicloud.com/blogs/367798)。|**元素去重**、**快速成员检测**。|
|**QMultiMap<Key, T>**|平衡二叉树|**有序**存储，允许一个键对应**多个**值[](https://bbs.huaweicloud.com/blogs/367798)。|需存储重复键的场景，如一个作者多本书。|
|**QMultiHash<Key, T>**|哈希表|**无序**存储，允许一个键对应**多个**值[](https://bbs.huaweicloud.com/blogs/367798)。|需快速查找且允许重复键。|

> **如何选择**：`QMap` 有序但稍慢；`QHash` 无序但极快；`QSet` 仅存值，用于去重与成员检测。

#### 📝 关联容器通用方法

**`QMap`/`QHash`**：

- **插入/删除**：`insert()` 或 `[]` 运算符；`remove()` 按键删除；`clear()` 清空[](https://bbs.huaweicloud.com/blogs/4d453af31db44a0fb5104f4075ff7e67)。
    
- **查找**：`value()` 取值；`contains()` 判断存在；`keys()` 获取键列表；`values()` 获取值列表[](https://bbs.huaweicloud.com/blogs/4d453af31db44a0fb5104f4075ff7e67)。
    
- **查询状态**：`isEmpty()`、`size()`。
    

**`QSet`**：

- **修改**：`insert()`、`remove()`、`clear()`。
    
- **查询**：`contains()` 判存[](https://www.e-com-net.com/article/1726370894521118720.htm)。
    
- **集合运算**：`intersect()`（交集）、`unite()`（并集）、`subtract()`（差集）等。
    

---

### 💎 总结与建议

- **首选容器**：对于大多数情况，`QList` 是通用列表的优先选择[](https://doc.qt.ac.cn/qt-6/containers.html#assignable-data-types)。
    
- **关联容器**：需要根据键快速查找，优先考虑 `QHash`；若数据需要排序，则使用 `QMap`。
    
- **性能优化**：Qt 容器支持**隐式共享**（写时拷贝），按值传递性能高且安全[](https://doc.qt.ac.cn/qt-6/containers.html#assignable-data-types)[](https://www.e-com-net.com/article/1726370894521118720.htm)。
    
- **线程安全**：当多个线程**只读**访问时，Qt 容器是线程安全的[](https://doc.qt.ac.cn/qt-6/containers.html#assignable-data-types)。
    
- **迭代器**：Qt 同时提供了 Java 风格和 STL 风格的迭代器。其中 **STL 风格迭代器**因其与 Qt 和 STL 通用算法的兼容性而更高效，是官方推荐的首选[](https://doc.qt.ac.cn/qt-6/containers.html#assignable-data-types)。