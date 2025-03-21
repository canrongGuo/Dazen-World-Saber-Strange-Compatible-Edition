//=============================================================================
// Drill_MenuBackground.js
//=============================================================================

/*:
 * @plugindesc [v1.5]        主菜单 - 多层菜单背景
 * @author Drill_up
 * 
 * @Drill_LE_param "背景-%d"
 * @Drill_LE_parentKey "---背景组%d至%d---"
 * @Drill_LE_var "DrillUp.g_MBa_list_length"
 *
 * @help
 * =============================================================================
 * +++ Drill_MenuBackground +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在任意菜单界面中放置一个或者多个背景。
 * ★★必须放在 各菜单界面、菜单插件 的前面★★
 * 【支持插件关联资源的打包、加密】
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   可以放置在菜单前面层或者菜单后面层。
 * 2.该插件可以装饰其他菜单插件。要了解更详细的组合方法，
 *   去看看"多层组合背景,粒子,魔法圈,gif,视频.docx"。
 * 关键字：
 *   (1.插件通过关键字识别菜单，并对指定菜单进行装饰。
 *      具体去看看"菜单关键字.docx"。
 *   (2.背景对一些自带背景的菜单插件可能不起作用，因为有些插件自己设
 *      置了底图，会把菜单的功能覆盖掉。
 * 底图：
 *   (1.底图是界面最底层的一张贴图，菜单界面中，底图是地图的截图背景。
 *      如果去掉底图，那么将只剩下全黑的画面。
 *   (2.菜单背景在底图的前面。
 * 默认背景：
 *   (1.默认背景作用于所有菜单界面。
 *      如果菜单界面没有配置任何背景，那么将自动使用默认背景。
 *   (2.默认背景也可以隐藏，隐藏后就能看到底图。
 * 设计：
 *   (1.你可以在同一个菜单里面加入非常多的平铺背景。
 *      结合 速度/背景遮罩 制作出不同的动态效果。
 *   (2.如果你想制作同一个菜单，有不同的风格。可以先配置两种不同风格
 *      的背景，然后使用显示/隐藏背景指令来进行风格切换。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__layer （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__layer文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 资源-默认背景
 * 
 * 背景1 资源-背景
 * 背景2 资源-背景
 * 背景3 资源-背景
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制菜单背景的显示情况：
 * 
 * 插件指令：>菜单背景 : 背景[3] : 显示
 * 插件指令：>菜单背景 : 背景[4] : 隐藏
 * 
 * 插件指令：>菜单背景 : 默认背景 : 显示
 * 插件指令：>菜单背景 : 默认背景 : 隐藏
 * 插件指令：>菜单背景 : 默认背景 : 复制样式 : 背景[3]
 * 插件指令：>菜单背景 : 默认背景 : 还原样式
 * 
 * 1.默认背景作用于所有菜单界面。
 *   你可以修改默认背景的样式与复制的背景一样。
 * 2.如果你想制作同一个菜单，有不同的风格，可以先配置两种不同风格的
 *   背景，然后使用显示/隐藏背景指令来进行风格切换。
 *
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 测试仪器：   4G 内存，Intel Core i5-2520M CPU 2.5GHz 处理器
 *              Intel(R) HD Graphics 3000 集显 的垃圾笔记本
 *              (笔记本的3dmark综合分：571，鲁大师综合分：48456)
 * 总时段：     20000.00ms左右
 * 对照表：     0.00ms  - 40.00ms （几乎无消耗）
 *              40.00ms - 80.00ms （低消耗）
 *              80.00ms - 120.00ms（中消耗）
 *              120.00ms以上      （高消耗）
 * 工作类型：   持续执行
 * 时间复杂度： o(n)*o(贴图处理) 每帧
 * 测试方法：   打开主菜单界面，进行性能测试。
 * 测试结果：   主菜单中，背景消耗为：【6.37ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.菜单背景相当于单张运动的图片，消耗不多。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 使得你可以通过插件指令控制菜单背景的显示。
 * [v1.2]
 * 规范了插件指令设置。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 * [v1.4]
 * 优化了内部结构，修改了插件指令格式。
 * 添加了背景遮罩功能。
 * [v1.5]
 * 优化了内部结构。
 *
 *
 * @param 底图设置
 * @type boolean
 * @on 地图画面
 * @off 全黑
 * @desc true - 地图画面，false - 全黑。进入菜单后，看到的是当前地图的图片。你也可以设置成全黑。
 * @default false
 *
 * @param 默认背景
 * @type struct<MenuBackgroundDefault>
 * @desc 默认背景的配置信息。
 * @default {"初始是否显示":"true","资源-背景":"背景-默认背景","资源-背景遮罩":"","平移-背景 X":"0","平移-背景 Y":"0","透明度":"255","混合模式":"0","背景X速度":"0.5","背景Y速度":"0.5","图片层级":"0"}
 *
 * @param ---背景组 1至20---
 * @default
 *
 * @param 背景-1
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-2
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-3
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-4
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-5
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-6
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-7
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-8
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-9
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-10
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-11
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-12
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-13
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-14
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-15
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-16
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-17
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-18
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-19
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-20
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景组21至40---
 * @default
 *
 * @param 背景-21
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-22
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-23
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-24
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-25
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-26
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-27
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-28
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-29
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-30
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-31
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-32
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-33
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-34
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-35
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-36
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-37
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-38
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-39
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-40
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景组41至60---
 * @default
 *
 * @param 背景-41
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-42
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-43
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-44
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-45
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-46
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-47
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-48
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-49
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-50
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-51
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-52
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-53
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-54
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-55
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-56
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-57
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-58
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-59
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-60
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景组61至80---
 * @default
 *
 * @param 背景-61
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-62
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-63
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-64
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-65
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-66
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-67
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-68
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-69
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-70
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-71
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-72
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-73
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-74
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-75
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-76
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-77
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-78
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-79
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-80
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 */
/*~struct~MenuBackground:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的菜单背景==
 *
 * @param 所属菜单
 * @type select
 * @option 主菜单(Scene_Menu)
 * @value 主菜单
 * @option 道具(Scene_Item)
 * @value 道具
 * @option 技能(Scene_Skill)
 * @value 技能
 * @option 装备(Scene_Equip)
 * @value 装备
 * @option 状态(Scene_Status)
 * @value 状态
 * @option 选项(Scene_Options)
 * @value 选项
 * @option 载入(Scene_Load)
 * @value 载入
 * @option 保存(Scene_Save)
 * @value 保存
 * @option 游戏结束(Scene_GameEnd)
 * @value 游戏结束
 * @option 商店(Scene_Shop)
 * @value 商店
 * @option 输入名称(Scene_Name)
 * @value 输入名称
 * @option 测试查值(Scene_Debug)
 * @value 测试查值
 * @option 自定义(Scene_……)
 * @value 自定义
 * @desc 填入所属的标准菜单。如果为插件的特殊关键字，那么要填写自定义关键字。具体去看看"菜单关键字.docx"。
 * @default 主菜单
 * 
 * @param 自定义关键字
 * @parent 所属菜单
 * @desc 设置所属菜单为自定义时，将根据此关键字找到对应的菜单。具体去看看"菜单关键字.docx"。
 * @default 
 *
 * @param 初始是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param 资源-背景
 * @desc 背景的图片资源。
 * @default 背景-默认背景
 * @require 1
 * @dir img/Menu__layer/
 * @type file
 *
 * @param 资源-背景遮罩
 * @desc 背景遮罩的图片资源。白色为显示部分，黑色为隐藏部分，用于图层减去。
 * @default 
 * @require 1
 * @dir img/Menu__layer/
 * @type file
 *
 * @param 平移-背景 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 平移-背景 Y
 * @desc x轴方向平移，单位像素。0为贴在最上面。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @type select
 * @option 普通
 * @value 0
 * @option 叠加
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * @default 0
 *
 * @param 背景X速度
 * @desc 背景按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0
 *
 * @param 背景Y速度
 * @desc 背景按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * @default 0
 *
 * @param 菜单层级
 * @type select
 * @option 菜单后面层
 * @value 0
 * @option 菜单前面层
 * @value 1
 * @desc 背景所属的菜单层级。
 * @default 0
 *
 * @param 图片层级
 * @type number
 * @min 0
 * @desc 背景在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 0
 * 
 *
 */
/*~struct~MenuBackgroundDefault:
 *
 * @param 初始是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param 资源-背景
 * @desc 背景的图片资源。
 * @default 背景-默认背景
 * @require 1
 * @dir img/Menu__layer/
 * @type file
 *
 * @param 资源-背景遮罩
 * @desc 背景遮罩的图片资源。白色为显示部分，黑色为隐藏部分，用于图层减去。
 * @default 
 * @require 1
 * @dir img/Menu__layer/
 * @type file
 *
 * @param 平移-背景 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 平移-背景 Y
 * @desc x轴方向平移，单位像素。0为贴在最上面。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @type select
 * @option 普通
 * @value 0
 * @option 叠加
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * @default 0
 *
 * @param 背景X速度
 * @desc 背景按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0
 *
 * @param 背景Y速度
 * @desc 背景按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * @default 0
 * 
 * @param 图片层级
 * @type number
 * @min 0
 * @desc 背景在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 0
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		MBa（Menu_Background）
//		临时全局变量	DrillUp.g_MBa_xxx
//		临时局部变量	this._drill_MBa_xxx
//		存储数据变量	$gameSystem._drill_MBa_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n)*o(贴图处理)
//		性能测试因素	主菜单界面
//		性能测试消耗	4.78ms 6.37ms
//		最坏情况		无
//		备注			无
//
//插件记录：
//		★大体框架与功能如下：
//			菜单背景：
//				->菜单层级
//				->显示/隐藏
//				->默认背景
//				->背景遮罩
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.插件结构并不复杂，但是坑多，需要理清楚下面变量的关系：
//				DrillUp.g_MBa_list		获取的值（80个）
//				this._drill_MBa_dataTank	符合的值（小于80个，不要将数组二者混合使用）
//				this._drill_MBa_spriteTank		符合的图片（小于80个）
//				temp_sprite			临时图片
//				temp_sprite_data	临时的值
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MenuBackground = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_MenuBackground');
	
	//==============================
	// * 变量获取 - 默认背景
	//				（~struct~MenuBackgroundDefault）
	//==============================
	DrillUp.drill_MBa_backgroundDefaultInit = function( dataFrom ) {
		var data = {};
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['src_img'] = String( dataFrom["资源-背景"] || "");
		data['src_img_mask'] = String( dataFrom["资源-背景遮罩"] || "");
		data['x'] = Number( dataFrom["平移-背景 X"] || 0);
		data['y'] = Number( dataFrom["平移-背景 Y"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['x_speed'] = Number( dataFrom["背景X速度"] || 0);
		data['y_speed'] = Number( dataFrom["背景Y速度"] || 0);
		//data['menu_index'] = Number( dataFrom["菜单层级"] || 0);
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		return data;
	}
	//==============================
	// * 变量获取 - 背景
	//				（~struct~MenuBackground）
	//==============================
	DrillUp.drill_MBa_backgroundInit = function( dataFrom ) {
		var data = {};
		data['menu'] = String( dataFrom["所属菜单"] || "");
		data['menu_key'] = String( dataFrom["自定义关键字"] || "");
		data['visible'] = String( dataFrom["初始是否显示"] || "true") == "true";
		data['src_img'] = String( dataFrom["资源-背景"] || "");
		data['src_img_mask'] = String( dataFrom["资源-背景遮罩"] || "");
		data['x'] = Number( dataFrom["平移-背景 X"] || 0);
		data['y'] = Number( dataFrom["平移-背景 Y"] || 0);
		data['opacity'] = Number( dataFrom["透明度"] || 255);
		data['blendMode'] = Number( dataFrom["混合模式"] || 0);
		data['x_speed'] = Number( dataFrom["背景X速度"] || 0);
		data['y_speed'] = Number( dataFrom["背景Y速度"] || 0);
		data['menu_index'] = Number( dataFrom["菜单层级"] || 0);
		data['zIndex'] = Number( dataFrom["图片层级"] || 0);
		return data;
	}
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_MBa_backgrounds_bottom_visible = String(DrillUp.parameters['底图设置'] || "true") === "true";	
	if( DrillUp.parameters["默认背景"] != undefined && 
		DrillUp.parameters["默认背景"] != "" ){
		var temp = JSON.parse(DrillUp.parameters["默认背景"]);
		DrillUp.g_MBa_default = DrillUp.drill_MBa_backgroundDefaultInit( temp );
		DrillUp.g_MBa_default['id'] = 0;
		DrillUp.g_MBa_default['inited'] = true;
	}else{   
		DrillUp.g_MBa_default = DrillUp.drill_MBa_backgroundDefaultInit( {} );
		DrillUp.g_MBa_default['id'] = 0;
		DrillUp.g_MBa_default['inited'] = false;
	}
	
	/*-----------------背景------------------*/
	DrillUp.g_MBa_list_length = 80;
	DrillUp.g_MBa_list = [];
	DrillUp.g_MBa_list[0] = DrillUp.g_MBa_default;
	for (var i = 1; i <= DrillUp.g_MBa_list_length; i++) {
		if( DrillUp.parameters["背景-" + String(i) ] != undefined &&
			DrillUp.parameters["背景-" + String(i) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters["背景-" + String(i) ]);
			DrillUp.g_MBa_list[i] = DrillUp.drill_MBa_backgroundInit( temp );
			DrillUp.g_MBa_list[i]['id'] = Number(i);
			DrillUp.g_MBa_list[i]['inited'] = true;
		}else{
			DrillUp.g_MBa_list[i] = DrillUp.drill_MBa_backgroundInit( {} );
			DrillUp.g_MBa_list[i]['id'] = Number(i);
			DrillUp.g_MBa_list[i]['inited'] = false;
		}
	}
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MenuLayer = function(filename) {
    return this.loadBitmap('img/Menu__layer/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_MBa_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_MBa_pluginCommand.call(this, command, args);
	if (command === ">菜单背景") {
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var b_id = -1;
			if( temp1 == "默认背景" ){
				b_id = 0;
			}else{
				temp1 = temp1.replace("背景[","");
				temp1 = temp1.replace("]","");
				b_id = Number(temp1);
			}
			
			if( b_id >= 0 && type === "显示" ){
				$gameSystem._drill_MBa_visible[b_id] = true;
			}
			if( b_id >= 0 && type === "隐藏" ){
				$gameSystem._drill_MBa_visible[b_id] = false;
			}
			if( b_id == 0 && type === "还原样式" ){
				$gameSystem._drill_MBa_default = 0;
			}
			if( b_id >= 0 && type === "设为默认" ){		//旧指令：>菜单背景 : 2 : 设为默认
				$gameSystem._drill_MBa_default = b_id;
			}
		}
		if(args.length == 6){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			var temp2 = String(args[5]);
			if( temp1 === "默认背景" && type === "复制样式" ){
				temp2 = temp2.replace("背景[","");
				temp2 = temp2.replace("]","");
				var b_id = Number(temp2);
				$gameSystem._drill_MBa_default = b_id;
			}
		}
	}
};

//=============================================================================
// ** 存储数据初始化
//=============================================================================
var _drill_MBa_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {	
	_drill_MBa_sys_initialize.call(this);
	this._drill_MBa_default = 0;					//默认背景
	this._drill_MBa_visible = [];					//显示控制
	for(var i = 0; i< DrillUp.g_MBa_list.length ;i++){
		var temp_data = DrillUp.g_MBa_list[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['inited'] != true ){ continue; }
		
		this._drill_MBa_visible[i] = temp_data['visible'];
	}
};

//=============================================================================
// ** 菜单
//=============================================================================
//==============================
// ** 菜单 - 创建背景
//==============================
var _drill_MBa_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	// > 背景初始化
	SceneManager._drill_MBa_created = false;	
   	this._drill_MBa_spriteTank = [];
   	this._drill_MBa_dataTank = [];	//注意，该数组与DrillUp.g_MBa_list数组的下标不同步，要使用data
	
	_drill_MBa_createBackground.call(this);
	
	// > 底图
	if( this._backgroundSprite && !DrillUp.g_MBa_backgrounds_bottom_visible ){
		var temp_bitmap = new Bitmap(Graphics.boxWidth,Graphics.boxHeight);
		temp_bitmap.fillAll("#000000");
		this._backgroundSprite.bitmap = temp_bitmap;		//底图不能为null，不然黑边背景就透出来了
	};
};
//==============================
// ** 菜单 - 退出界面
//==============================
var _drill_MBa_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_MBa_terminate.call(this);			//设置需要下次重新创建
	SceneManager._drill_MBa_created = false;
};
//==============================
// ** 菜单 - 层级排序
//==============================
Scene_MenuBase.prototype.drill_MBa_sortByZIndex = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//==============================
// * 菜单 - 帧刷新
//==============================
var _drill_MBa_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_MBa_update.call(this);
	
	if( SceneManager.isCurrentSceneStarted() && !SceneManager._drill_MBa_created ) {
		this.drill_MBa_create();				//创建，进入界面后只执行一次
	}
	if( SceneManager._drill_MBa_created ){
		this.drill_MBa_update();
	};
};

//=============================================================================
// ** 背景
//=============================================================================
//==============================
// * 背景 - 创建
//==============================
Scene_MenuBase.prototype.drill_MBa_create = function() {	
	SceneManager._drill_MBa_created = true;
	
	if(!this._drill_MBa_spriteTank){
		this._drill_MBa_spriteTank = [];	//防止某些覆写的菜单报错
		this._drill_MBa_dataTank = [];
	}
	if( !this._backgroundSprite ){		//菜单后面层
		this._backgroundSprite = new Sprite();
	}
	if( !this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		//this.addChild(this._foregroundSprite);
	}
	
	// > 配置的背景
	for (var i = 1; i < DrillUp.g_MBa_list.length; i++) {
		var temp_data = DrillUp.g_MBa_list[i];
		if( temp_data == undefined ){ continue; }
		if( temp_data['inited'] != true ){ continue; }
		
		if( this.drill_MBa_checkKeyword( temp_data ) ){
			
			// > 背景贴图
			var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));		//深拷贝数据（杜绝引用造成的修改）
			var temp_sprite = new TilingSprite(ImageManager.load_MenuLayer(temp_sprite_data['src_img']));	//TilingSprite平铺图层
			temp_sprite.move(0, 0, Graphics.width, Graphics.height);
			temp_sprite.origin.x = temp_sprite_data['x'];
			temp_sprite.origin.y = temp_sprite_data['y'];
			temp_sprite.opacity = temp_sprite_data['opacity'];
			temp_sprite.blendMode = temp_sprite_data['blendMode'];
			temp_sprite.visible = $gameSystem._drill_MBa_visible[i] || false;
			this._drill_MBa_spriteTank.push(temp_sprite);
			this._drill_MBa_dataTank.push(temp_sprite_data);
			
			// > 背景父级
			var temp_layer = new Sprite();
			temp_layer.addChild(temp_sprite);
			temp_layer.zIndex = temp_sprite_data['zIndex'];
			
			// > 背景遮罩
			if( temp_sprite_data['src_img_mask'] != "" ){
				var temp_mask = new Sprite(ImageManager.load_MenuLayer(temp_sprite_data['src_img_mask']));
				temp_layer.addChild(temp_mask);
				temp_layer.mask = temp_mask;
			}
			
			if( temp_sprite_data['menu_index'] == 0 ){
				this._backgroundSprite.addChild(temp_layer);
			}else{
				this._foregroundSprite.addChild(temp_layer);
			}
		}
	}
	
	// > 默认背景
	if(this._drill_MBa_spriteTank.length == 0 ){
		var i = $gameSystem._drill_MBa_default;
		var temp_data = DrillUp.g_MBa_list[i];
		if( temp_data == undefined ){ return; }
		if( temp_data['inited'] != true ){ return; }
		
		// > 背景贴图
		var temp_sprite_data = JSON.parse(JSON.stringify( temp_data ));			//深拷贝数据（杜绝引用造成的修改）
		var temp_sprite = new TilingSprite(ImageManager.load_MenuLayer(temp_sprite_data['src_img']));	//TilingSprite平铺图层
		temp_sprite.move(0, 0, Graphics.width, Graphics.height);
		temp_sprite.origin.x = temp_sprite_data['x'];
		temp_sprite.origin.y = temp_sprite_data['y'];
		temp_sprite.opacity = temp_sprite_data['opacity'];
		temp_sprite.blendMode = temp_sprite_data['blendMode'];
		temp_sprite.visible = $gameSystem._drill_MBa_visible[i] || false;
		this._drill_MBa_spriteTank.push(temp_sprite);
		this._drill_MBa_dataTank.push(temp_sprite_data);
		
		// > 背景父级
		var temp_layer = new Sprite();
		temp_layer.addChild(temp_sprite);
		temp_layer.zIndex = temp_sprite_data['zIndex'];
		
		// > 背景遮罩
		if( temp_sprite_data['src_img_mask'] != "" ){
			var temp_mask = new Sprite(ImageManager.load_MenuLayer(temp_sprite_data['src_img_mask']));
			temp_layer.addChild(temp_mask);
			temp_layer.mask = temp_mask;
		}
		
		this._backgroundSprite.addChild(temp_layer);
		
	}
	this.drill_MBa_sortByZIndex();
};
//==============================
// * 背景 - 检查位置
//==============================
Scene_MenuBase.prototype.drill_MBa_checkKeyword = function( temp_sprite_data ){
	
	/*---------------标准----------------*/
	if( SceneManager._scene.constructor.name === "Scene_Menu" && temp_sprite_data['menu'] == "主菜单" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Item" && temp_sprite_data['menu'] == "道具" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Skill" && temp_sprite_data['menu'] == "技能" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Equip" && temp_sprite_data['menu'] == "装备" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Status" && temp_sprite_data['menu'] == "状态" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Options" && temp_sprite_data['menu'] == "选项" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Load" && temp_sprite_data['menu'] == "载入" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Save" && temp_sprite_data['menu'] == "保存" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_GameEnd" && temp_sprite_data['menu'] == "游戏结束" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Shop" && temp_sprite_data['menu'] == "商店" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Name" && temp_sprite_data['menu'] == "输入名称" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Debug" && temp_sprite_data['menu'] == "测试查值" ){
		return true;
	/*---------------旧选项----------------*/
	}else if( (SceneManager._scene.constructor.name === "Scene_Party" || SceneManager._scene.constructor.name === "Scene_Drill_SMa_Formation") && temp_sprite_data['menu'] == "队形"  ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_EnemyBook" && temp_sprite_data['menu'] == "敌人图鉴" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_ItemBook" && temp_sprite_data['menu'] == "物品图鉴" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Picture_Gallery" && temp_sprite_data['menu'] == "画廊" ){
		return true;
	}else{
		/*---------------自定义----------------*/
		if( SceneManager._scene.constructor.name === temp_sprite_data['menu_key'] ){
			return true;
		}
	}
	return false;
};
//==============================
// * 背景 - 帧刷新
//==============================
Scene_MenuBase.prototype.drill_MBa_update = function() {
	for (var i = 0; i < this._drill_MBa_spriteTank.length; i++) {
		this._drill_MBa_spriteTank[i].origin.x += this._drill_MBa_dataTank[i]['x_speed'];
		this._drill_MBa_spriteTank[i].origin.y += this._drill_MBa_dataTank[i]['y_speed'];
	};
};


