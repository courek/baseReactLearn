#接口管理工具基本上有 rap,swagger,moco,yapi

// 真的是 30s 就创建完成.
// 本项目使用的是 node 本地的 json-server. 还要使用 rest api 的设计风格(其实无所谓). 就是说语义化,不然的话全程 post 就行了.
// 安装 npm i json-server -g 然后创建一个 db.json 文件. 最后 json-server --watch db.json 运行. //https://github.com/typicode/json-server

// 启动 watch 的时候要检查端口是不是重复了, 如果是重复端口的话,就会出现错误了. 404 的那种. // 但是一会正常一会失败,比较神奇

#### 文件夹取名字, 比如 **Json**server\_\_mock 就是告诉别人,这个文件跟其他代码没有什么关系 之类的. 作为辅助存在的.可以使用 scripts 来进行启动

// 管理 git 提交比较好的工具. git cz Commitizen 使用方法 https://segmentfault.com/a/1190000020924364

commit 的几种类型选项，如下：
feat 新功能
fix Bug 修复
docs 文档更新
style 代码的格式，标点符号的更新
refactor 代码重构
perf 性能优化
test 测试更新
build 构建系统或者包依赖更新
ci CI 配置，脚本文件等更新
chore 非 src 或者 测试文件的更新
revert commit 回退

//git pull origin master --allow-unrelated-histories 这样才能让两个 git 融合, 一般是创建 git 仓库的时候. 本地+github 上独立的 git 合并需要

//screens 文件夹 包含页面级别的代码

DRY 全称：Don't Repeat Yourself （摘自 wikipedia），是指编程过程中不写重复代码，将能够公共的部分抽象出来，封装成工具类或者用“abstraction”类来抽象公有的东西，降低代码的耦合性，这样不仅提高代码的灵活性、健壮性以及可读性，也方便后期的维护或者修改。
