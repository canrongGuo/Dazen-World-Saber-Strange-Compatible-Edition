//=============================================================================
//  GT50 Plugins - SuperShopSystem
//  GT_SuperShopSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_SuperShopSystem = true;

var GT = GT || {};
GT.SSS = GT.SSS || {};
GT.SSS.version = 1.0;

//=============================================================================
/*:
 * @plugindesc [v1.0]        物品 - 超级商店系统
 * @author ganfly
 *
 * @help
 * ============================================================================
 *  介绍
 * ============================================================================
 *
 * 超级商店系统，这是对默认商店系统的整合和加强，
 * 新增以下功能：
 *      商店库存限制
 *      自定义价格/售出价格
 *      出售独立随机物品
 *      购买物品时操作开关
 *      价格控制/折扣
 *      出售到商店的物品仍会留存在商店中
 *      商店货币限制
 *      购买/售出货币统计
 *      开关控制商品是否在商店中显示
 *
 * 注意：本插件取代了BO_Shops，YEP_ShopMenuCore，YEP_X_CondShopPrices，
 * YEP_X_HideShowShopItems，BBS_TrackShopping的功能，请移除这些插件
 *
 * ============================================================================
 *  备注
 * ============================================================================
 *
 * ---物品/武器/防具备注
 *
 *    <Price: x>
 *      - 设定该物品的价格，可以超过数据库位数上限
 *      x替换为数值
 *
 *    <Sell Price: x>
 *      - 设定该物品的售出价格，x替换为数值
 *    
 *    <Cannot Sell>
 *      - 这个物品强制无法出售
 *
 *    <Can Sell>
 *      - 只要商店有足够的货币，则这个物品一定可以出售
 *
 *    <Shop Switch x: On>
 *    <Shop Switch x: Off>
 *    <Shop Switch x: Switch>
 *      - 购买这个物品时，改为操作x号开关
 *      On代表每次购买时都打开
 *      Off代表每次购买时都关闭
 *      Switch代表每次购买时都切换
 *
 *    <Base Price Variable: x>
 *      - 将该物品的价格改为x号变量的值
 *
 *    <Percent Price Variable: x>
 *      - 令该物品价格乘以x号变量的值/100
 *      可以用多个该备注，所有的倍率将会相乘
 *
 *    <Increase Price Variable: x>
 *      - 令该物品价格加上x号变量的值
 *      可以用多个该备注，所有的加成将会相加
 *
 *    <Exact Price Variable: x>
 *      - 将该物品的价格强制改为x号变量的值
 *      这个物品的价格将不会受到其他变量的影响
 *
 *    <Price Minimum: x>
 *    <Price Maximum: x>
 *    <Price Min: x>
 *    <Price Max: x>
 *      - 设置该物品价格的上下限
 *      Minimum/Min为下限
 *      Maximum/Max为上限
 *
 *    !!注意：所有影响物品价格的变量和代码也会影响售出价格
 *
 *    <Shop Hide if Switch On: x>
 *    <Shop Hide if Switch Off: x>
 *      - 当x号开关处于开启/关闭状态时，在商店中隐藏该物品
 *      可以写多条相同备注来设定更多开关
 * 
 *    <Shop Hide if Any Switch On: x>
 *    <Shop Hide if Any Switch On: x, x, x>
 *    <Shop Hide if Any Switch Off: x>
 *    <Shop Hide if Any Switch Off: x, x, x>
 *      - 当所有x号开关中有一个处于开启/关闭状态时，
 *      在商店中隐藏该物品
 *      可以写多条相同备注来设定更多开关
 * 
 *    <Shop Hide if All Switches On: x>
 *    <Shop Hide if All Switches On: x, x, x>
 *    <Shop Hide if All Switches Off: x>
 *    <Shop Hide if All Switches Off: x, x, x>
 *      - 当所有x号开关均处于开启/关闭状态时，
 *      在商店中隐藏该物品
 *      可以写多条相同备注来设定更多开关
 *
 * ============================================================================
 * 价格的计算顺序
 * ============================================================================
 *
 * 物品价格/售出价格将会按照以下顺序计算:
 * 
 *  1. 物品的默认价格
 *  2. 物品的商店指定价格
 *  3. 商店折扣
 *  4. <Base Price Variable: x>
 *  5. 插件参数中的全局价格倍率变量
 *  6. 每个商店的专属倍率变量
 *  7. 所有的<Percent Price Variable: x>
 *  8. 插件参数中的全局价格加成变量
 *  9. 所有的<Increase Price Variable: x>
 * 10. <Exact Price Variable: x>覆盖以上所有变动
 * 11. 插件参数中的全局价格最终调整
 * 12. <Price Minimum: x>和<Price Maximum: x>的上下限调整
 *
 *
 * ============================================================================
 *  脚本
 * ============================================================================
 *
 *     GT.SSS.totalCount
 *      返回商店的数量
 *
 * ============================================================================
 *  插件指令
 * ============================================================================
 *
 *     OpenShop x
 *       进入x号商店的界面
 *
 *     CloseShop x
 *       删除保存的x号商店的数据，下一次开启该商店将会回到初始状态
 *
 *     RefillShopStock x x x
 *       补充x号商店的所有库存(包括货币)
 *     
 *     RefillItemStock shopId itemId quantity
 *     RefillWeaponStock shopId itemId quantity
 *     RefillArmorStock shopId itemId quantity
 *       补充商店的特定物品/武器/防具，
 *       shopId替换为商店id
 *       itemId替换为物品/武器/防具id
 *       quantity替换为补充数量
 *     !!注意：当开启了出售独立物品后，这条插件指令会无效
 *     
 *     RefillMoneyStock x x x
 *       补充x号商店的货币
 *
 * ============================================================================
 *  兼容性
 * ============================================================================
 * 
 * 不兼容以下插件，因为已经取代了其功能
 *      BO_Shops
 *      BBS_TrackShopping
 *      YEP_ShopMenuCore
 *      YEP_X_CondShopPrices
 *      YEP_X_HideShowShopItems
 *
 * ============================================================================
 *  用户规约
 * ============================================================================
 *
 *  MIT规约。
 *  如果你使用了本插件，请在致谢中包含'ganfly'或者'gt50'，谢啦！
 *
 * ============================================================================
 *  更新日志
 * ============================================================================
 *
 * [v1.0] 完成插件。
 *
 * ============================================================================
 *  帮助结束
 * ============================================================================
 *
 *
 * @param General
 * @text ----常规设置----
 * @default
 *
 * @param DisplaySoldOutItems
 * @text 是否显示已售空商品
 * @parent General
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否显示已售空商品
 * @default true
 *
 * @param SoldIndpendItem
 * @text 是否出售独立物品
 * @parent General
 * @type boolean
 * @on 是
 * @off 否
 * @desc 是否出售独立物品(需要 YEP_ItemCore).
 * @default true
 *
 * @param ExCommandList
 * @text 额外命令列表
 * @parent General
 * @type text[]
 * @desc 额外命令列表，可填Equip, Custom, Cancel
 * @default ["Equip","Custom","Cancel"]
 *
 * @param GlobalPriceRateVar
 * @text 全局价格倍率变量
 * @parent General
 * @type variable
 * @desc 所有物品的最终价格都会乘以这个变量的值/100，设为0则不使用.
 * @default 0
 *
 * @param GlobalPriceFlatVar
 * @text 全局价格加成变量
 * @parent General
 * @type variable
 * @desc 所有物品的最终价格都会加上这个变量的值，设为0则不使用.
 * @default 0
 *
 * @param GlobalPriceFinalize
 * @text 全局价格最终调整
 * @parent General
 * @type note
 * @desc JavaScript代码，这会在物品价格最后再做一次调整.
 * @default "//可以使用以下变量.\n// item - 要调整的物品\n// price - 返回物品的最终价格\n\n// 例如：设定价格上下限.\n//price = price.clamp(0, $gameParty.maxGold());"
 *
 * @param BuyTrackVar
 * @text 购买货币量追踪变量
 * @parent General
 * @type variable
 * @desc 这个变量会记录在商店总共花了多少钱，设为0则不使用.
 * @default 0
 *
 * @param SellTrackVar
 * @text 出售货币量追踪变量
 * @parent General
 * @type variable
 * @desc 这个变量会记录在商店出售东西总共进账多少钱，设为0则不使用.
 * @default 0
 *
 * @param GlobalShowFinalize
 * @text 显示隐藏商品最终调整
 * @parent General
 * @type note
 * @desc JavaScript代码，将会对物品是否在商店中显示做最后的全局调整
 * @default "//可以使用以下变量.\n// item - 要调整的物品\n// show - 返回是否显示该商品\n\n//例如：不显示名字为空的商品.\n//show = item.name.trim() !== '';"
 *
 * @param Text
 * @text ----用语设置----
 * @default
 *
 * @param StockQuantityText
 * @text 库存量用语
 * @parent Text
 * @desc 商品的库存量用语
 * @default 库存量:
 *
 * @param SoldOutText
 * @text 已售空用语
 * @parent Text
 * @desc 商品的已售空用语
 * @default 已售空
 *
 * @param Shop List 1-25
 * @text ----商店列表1-25----
 * @default
 *
 * @param Shop 1
 * @text 商店1
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default
 *
 * @param Shop 2
 * @text 商店2
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default
 *
 * @param Shop 3
 * @text 商店3
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default
 *
 * @param Shop 4
 * @text 商店4
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 5
 * @text 商店5
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 6
 * @text 商店6
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 7
 * @text 商店7
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 8
 * @text 商店8
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 9
 * @text 商店9
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 10
 * @text 商店10
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 11
 * @text 商店11
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 12
 * @text 商店12
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 13
 * @text 商店13
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 14
 * @text 商店14
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 15
 * @text 商店15
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 16
 * @text 商店16
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 17
 * @text 商店17
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 18
 * @text 商店18
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 19
 * @text 商店19
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 20
 * @text 商店20
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 21
 * @text 商店21
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default
 *
 * @param Shop 22
 * @text 商店22
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default
 *
 * @param Shop 23
 * @text 商店23
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default
 *
 * @param Shop 24
 * @text 商店24
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 25
 * @text 商店25
 * @parent Shop List 1-25
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop List 26-50
 * @text ----商店列表26-50----
 * @default
 *
 * @param Shop 26
 * @text 商店26
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 27
 * @text 商店27
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 28
 * @text 商店28
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 29
 * @text 商店29
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 30
 * @text 商店30
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 31
 * @text 商店31
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 32
 * @text 商店32
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 33
 * @text 商店33
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 34
 * @text 商店34
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 35
 * @text 商店35
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 36
 * @text 商店36
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 37
 * @text 商店37
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 38
 * @text 商店38
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 39
 * @text 商店39
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 40
 * @text 商店40
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 41
 * @text 商店41
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default
 *
 * @param Shop 42
 * @text 商店42
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default
 *
 * @param Shop 43
 * @text 商店43
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default
 *
 * @param Shop 44
 * @text 商店44
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 45
 * @text 商店45
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 46
 * @text 商店46
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 47
 * @text 商店47
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 48
 * @text 商店48
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 49
 * @text 商店49
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default 
 *
 * @param Shop 50
 * @text 商店50
 * @parent Shop List 26-50
 * @type struct<Shop>
 * @desc 编辑商店参数
 * @default
 *
 */
/* ---------------------------------------------------------------------------
 * struct<Shop>
 * ---------------------------------------------------------------------------
 */
/*~struct~Shop:
 *
 * @param Name
 * @text 商店名
 * @type text
 * @desc 商店的名字.
 *
 * @param ShopType
 * @text 商店类型
 * @type select
 * @option 出售+购买
 * @value SellAndBuy
 * @option 仅购买
 * @value BuyOnly
 * @option 仅出售
 * @value SellOnly
 * @desc 商店的类型.
 * @default SellAndBuy
 *
 * @param ShopWaitress
 * @text 商店服务员
 * @type number
 * @min 0
 * @desc 该商店的服务员，填入配置的服务员id，0表示没有服务员。
 * @default 0
 *
 * @param RestrictSales
 * @text 是否限制出售的商品
 * @type boolean
 * @default false
 * @on 是
 * @off 否
 * @desc 限定只能出售商店中可以购买的商品
 *
 * @param AvaiableMoney
 * @text 初始货币存量
 * @type number
 * @min 0
 * @desc 该商店的货币存量.
 * @default 0
 *
 * @param Items
 * @text 商品-物品
 * @type struct<ShopGoodItem>[]
 * @desc 商店中可以购买的物品.
 * @default []
 *
 * @param Weapons
 * @text 商品-武器
 * @type struct<ShopGoodWeapon>[]
 * @desc 商店中可以购买的武器.
 * @default []
 *
 * @param Armor
 * @text 商品-防具
 * @type struct<ShopGoodArmor>[]
 * @desc 商店中可以购买的防具.
 * @default []
 *
 * @param RefillType
 * @text 自动补充库存的类型
 * @type select
 * @option 不自动补充
 * @value Never
 * @option 定时补充
 * @value After time
 * @option 自定义补充
 * @value Custom
 * @desc 自动补充库存的类型.
 * @default Never
 *
 * @param RefillTime
 * @text 定时补充的时间间隔
 * @type number
 * @default 7200
 * @desc 定时补充的时间间隔(单位/秒)，只有在定时补充情况下起作用.
 *
 * @param RefillCond
 * @text 自定义补充的条件
 * @type note
 * @desc 自定义补充的js代码条件，只有在自定义补充情况下起作用.
 * @default "false"
 *
 * @param PriceRateVar
 * @text 价格倍率变量
 * @type variable
 * @desc 本商店所有商品价格都会乘这个变量的值/100，设为0则不使用.
 * @default 0
 *
 * @param Discounts
 * @text 折扣
 * @type struct<Discount>[]
 * @desc 本商店的折扣列表.
 * @default []
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ShopGoodItem>
 * ---------------------------------------------------------------------------
 */
/*~struct~ShopGoodItem:
 *
 * @param Item
 * @text 商品-物品
 * @type item
 * @desc 商品-物品
 * @default 1
 *
 * @param UseCustomPrice
 * @text 商品是否指定价格
 * @type boolean
 * @on 指定价格
 * @off 原价
 * @default false
 * @desc 商品是否指定价格
 *
 * @param Price
 * @text 指定价格
 * @type number
 * @min 0
 * @desc 商品的指定价格.
 * @default 0
 *
 * @param UseCustomSellingPrice
 * @text 商品是否指定出售价格
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 * @desc 商品是否指定出售价格
 *
 * @param SellingPrice
 * @text 指定出售价格
 * @type number
 * @min 0
 * @desc 商品的指定出售价格
 * @default 0
 *
 * @param StockQuantityType
 * @text 库存数量类型
 * @type select
 * @option 数量
 * @value Amount
 * @option 变量
 * @value Variable
 * @desc 库存数量类型
 * @default Amount
 *
 * @param StockQuantity
 * @text 库存数量
 * @type number
 * @min 0
 * @max 99
 * @desc 如果库存类型为数量，这一项代表数值，为变量，这一项代表变量id，0代表无库存限制.
 * @default 0
 *
 * @param AvailabilityCond
 * @text 显示该商品的条件
 * @type note
 * @desc 显示该商品的js代码条件，表达式的值代表是否显示.
 * @default "true"
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ShopGoodWeapon>
 * ---------------------------------------------------------------------------
 */
/*~struct~ShopGoodWeapon:
 *
 * @param Weapon
 * @text 商品-武器
 * @type weapon
 * @desc 商品-武器
 * @default 1
 *
 * @param UseCustomPrice
 * @text 商品是否指定价格
 * @type boolean
 * @on 指定价格
 * @off 原价
 * @default false
 * @desc 商品是否指定价格
 *
 * @param Price
 * @text 指定价格
 * @type number
 * @min 0
 * @desc 商品的指定价格.
 * @default 0
 *
 * @param UseCustomSellingPrice
 * @text 商品是否指定出售价格
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 * @desc 商品是否指定出售价格
 *
 * @param SellingPrice
 * @text 指定出售价格
 * @type number
 * @min 0
 * @desc 商品的指定出售价格
 * @default 0
 *
 * @param StockQuantityType
 * @text 库存数量类型
 * @type select
 * @option 数量
 * @value Amount
 * @option 变量
 * @value Variable
 * @desc 库存数量类型
 * @default Amount
 *
 * @param StockQuantity
 * @text 库存数量
 * @type number
 * @min 0
 * @max 99
 * @desc 如果库存类型为数量，这一项代表数值，为变量，这一项代表变量id，0代表无库存限制.
 * @default 0
 *
 * @param AvailabilityCond
 * @text 显示该商品的条件
 * @type note
 * @desc 显示该商品的js代码条件，表达式的值代表是否显示.
 * @default "true"
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ShopGoodArmor>
 * ---------------------------------------------------------------------------
 */
/*~struct~ShopGoodArmor:
 *
 * @param Armor
 * @text 商品-防具
 * @type armor
 * @desc 商品-防具
 * @default 1
 *
 * @param UseCustomPrice
 * @text 商品是否指定价格
 * @type boolean
 * @on 指定价格
 * @off 原价
 * @default false
 * @desc 商品是否指定价格
 *
 * @param Price
 * @text 指定价格
 * @type number
 * @min 0
 * @desc 商品的指定价格.
 * @default 0
 *
 * @param UseCustomSellingPrice
 * @text 商品是否指定出售价格
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 * @desc 商品是否指定出售价格
 *
 * @param SellingPrice
 * @text 指定出售价格
 * @type number
 * @min 0
 * @desc 商品的指定出售价格
 * @default 0
 *
 * @param StockQuantityType
 * @text 库存数量类型
 * @type select
 * @option 数量
 * @value Amount
 * @option 变量
 * @value Variable
 * @desc 库存数量类型
 * @default Amount
 *
 * @param StockQuantity
 * @text 库存数量
 * @type number
 * @min 0
 * @max 99
 * @desc 如果库存类型为数量，这一项代表数值，为变量，这一项代表变量id，0代表无库存限制.
 * @default 0
 *
 * @param AvailabilityCond
 * @text 显示该商品的条件
 * @type note
 * @desc 显示该商品的js代码条件，表达式的值代表是否显示.
 * @default "true"
 *
 */
/* ---------------------------------------------------------------------------
 * struct<Discount>
 * ---------------------------------------------------------------------------
 */
/*~struct~Discount:
 *
 * @param Condition
 * @text 该折扣的条件
 * @type note
 * @desc 享受该折扣的js代码条件
 * @default false
 *
 * @param Percentage
 * @type number
 * @min 0
 * @max 100
 * @desc 折扣量，100代表价格*100%，70代表价格*70%
 * @default 100
 *
 */

//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

GT.Parameters = PluginManager.parameters('GT_SuperShopSystem');
GT.Param = GT.Param || {};

GT.Param.dataShops = GT.Parameters;

GT.Param.DisplaySoldOutItems = eval(GT.Parameters['DisplaySoldOutItems']);
GT.Param.SoldIndpendItem = eval(GT.Parameters['SoldIndpendItem']);
GT.Param.SSSExCommandList = JSON.parse(GT.Parameters['ExCommandList']);
GT.Param.SSSGlobalPriceRateVar = Number(GT.Parameters['GlobalPriceRateVar']);
GT.Param.SSSGlobalPriceFlatVar = Number(GT.Parameters['GlobalPriceFlatVar']);
GT.Param.SSSFinalizePriceEval = JSON.parse(GT.Parameters['GlobalPriceFinalize']);
GT.Param.SSSBuyTrackVar = Number(GT.Parameters['BuyTrackVar']);
GT.Param.SSSSellTrackVar = Number(GT.Parameters['SellTrackVar']);
GT.Param.SSSFinalizeShowEval = JSON.parse(GT.Parameters['GlobalShowFinalize']);

GT.Param.StockQuantityText = String(GT.Parameters['StockQuantityText']);
GT.Param.SoldOutText = String(GT.Parameters['SoldOutText']);


//=============================================================================
// DataManager
//=============================================================================

var $dataShops = [null];
var $gameShops = null;
GT.SSS.totalCount = 0;

GT.SSS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!GT.SSS.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!GT._loaded_GT_SSS) {
		this.shopDatabaseCreate();
		this.processSShopSystemNotetags($dataItems);
		this.processSShopSystemNotetags($dataWeapons);
		this.processSShopSystemNotetags($dataArmors);
		GT._loaded_GT_SSS = true;
    }
    return true;
};

DataManager.processSShopSystemNotetags = function (group) {
    for (var i = 1; i < group.length; i++) {
        var obj = group[i];
        this.setupSShopSystemNotetags(obj);
    }
};

DataManager.setupSShopSystemNotetags = function (obj) {
	var note1 = /<(?:PRICE):[ ](\d+)>/i;
	var note2 = /<(?:SELL PRICE):[ ](\d+)>/i;
	var note3 = /<(?:CANNOT SELL)>/i;
	var note4 = /<(?:CAN SELL)>/i;
	var note5 = /<(?:SHOP SWITCH)[ ](\d+):[ ](.*)>/i;
	
	var note6 = /<(.*) PRICE VARIABLE:[ ](\d+)>/i;
	var note7 = /<Price (?:MIN|MINIMUM):[ ](\d+)>/i;
	var note8 = /<Price (?:MAX|MAXIMUM):[ ](\d+)>/i;
	
    var notedata = obj.note.split(/[\r\n]+/);
	obj.shopSwitch = [];
	obj.sellPrice = undefined;
	obj.cannotSell = false;
    obj.canSell = false;
	obj.priceVariable = {};
	obj.priceMin = undefined;
	obj.priceMax = undefined;
	
    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
		if (line.match(note1)) {
			obj.price = parseInt(RegExp.$1);
		} else if (line.match(note2)) {
			obj.sellPrice = parseInt(RegExp.$1);
		} else if (line.match(note3)) {
			obj.cannotSell = true;
		} else if (line.match(note4)) {
			obj.canSell = true;
		} else if (line.match(note5)) {
			var switchId = parseInt(RegExp.$1);
			var SwitchType = String(RegExp.$2).toUpperCase().trim();
			if (SwitchType === 'ON') 
				SwitchType = 1;
			else if (SwitchType === 'OFF') 
				SwitchType = 2;
			else if (SwitchType === 'SWITCH') 
				SwitchType = 3;
			if ([1, 2, 3].contains(SwitchType))
				obj.shopSwitch.push([switchId, SwitchType]);
        } else if (line.match(note6)) {
			var varType = String(RegExp.$1).toLowerCase().trim();
			if (varType === 'base') {
				obj.priceVariable.base = parseInt(RegExp.$2);
			} else if (varType === 'percent'){
				obj.priceVariable.percent = obj.priceVariable.percent || [];
				obj.priceVariable.percent.push(parseInt(RegExp.$2));
			} else if (varType === 'increase'){
				obj.priceVariable.increase = obj.priceVariable.increase || [];
				obj.priceVariable.increase.push(parseInt(RegExp.$2));
			} else if (varType === 'exact') {
				obj.priceVariable.exact = parseInt(RegExp.$2);
			}
		} else if (line.match(note7)) {
			obj.priceMin = parseInt(RegExp.$1);
		} else if (line.match(note8)) {
			obj.priceMax = parseInt(RegExp.$1);
		}  
    }
	if (!obj.shopSwitch.length)
		delete obj.shopSwitch;
};

GT.SSS.DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function () {
    GT.SSS.DataManager_createGameObjects.call(this);
    $gameShops = new Game_Shops();
};

GT.SSS.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
    var contents = GT.SSS.DataManager_makeSaveContents.call(this);
    contents.gameShops = $gameShops;
    return contents;
};

GT.SSS.DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents) {
    GT.SSS.DataManager_extractSaveContents.call(this, contents);
    $gameShops = contents.gameShops || (new Game_Shops());
};

DataManager.shopDatabaseCreate = function() {
    $dataShops = [null];
	for (var i = 1; i <= 50; ++i) {
        var shopData = JSON.parse(GT.Param.dataShops['Shop ' + i] || 'null');
        if (shopData) {
			this.shopDatabaseAdd(i, shopData);
		}
    }
};

DataManager.shopDatabaseAdd = function(id, data) {
    if (!data) return $dataShops.push(null);
    $dataShops[id] = new Data_Shop(id, data);
    GT.SSS.totalCount += 1;
};

//=============================================================================
// Data_Shop
//=============================================================================

Data_Shop = function () {
    this.initialize.apply(this, arguments);
}

Data_Shop.prototype = Object.create(Object.prototype);
Data_Shop.prototype.constructor = Data_Shop;

Data_Shop.prototype.initialize = function (id, data) {
	this.id = id;
    this.name = String(data.Name);
    this.shopType = String(data.ShopType);
    this.RestrictSales = eval(data.RestrictSales);
    this.RefillType = String(data.RefillType);
    this.RefillTime = Number(data.RefillTime);
    this.RefillCond = JSON.parse(data.RefillCond);
	this.PriceRateVar = Number(data.PriceRateVar);
	this._avaiableMoney = Number(data.AvaiableMoney);
    this._allGoods = [];
    if (data.Items !== "") {
        var goods = JSON.parse(data.Items);
        for (var i = 0; i < goods.length; i++) {
            var item = JSON.parse(goods[i]);
            this._allGoods.push(new Data_ShopGood(item, 'Item'));
        }
    }
    if (data.Weapons !== "") {
        var goods = JSON.parse(data.Weapons);
        for (var i = 0; i < goods.length; i++) {
            var item = JSON.parse(goods[i]);
            this._allGoods.push(new Data_ShopGood(item, 'Weapon'));
        }
    }
    if (data.Armor !== "") {
        var goods = JSON.parse(data.Armor);
        for (var i = 0; i < goods.length; i++) {
            var item = JSON.parse(goods[i]);
            this._allGoods.push(new Data_ShopGood(item, 'Armor'));
        }
    }
    this._discounts = [];
    if (data.Discounts !== "") {
        var discounts = JSON.parse(data.Discounts);
        for (var i = 0; i < discounts.length; i++) {
            var discount = JSON.parse(discounts[i]);
            this._discounts.push(new Data_ShopDiscount(discount));
        }
    }
};

//=============================================================================
// Data_ShopGood
//=============================================================================

Data_ShopGood = function () {
    this.initialize.apply(this, arguments);
}

Data_ShopGood.prototype = Object.create(Object.prototype);
Data_ShopGood.prototype.constructor = Data_ShopGood;

Data_ShopGood.prototype.initialize = function (data, kind) {
    this.kind = kind;
    switch (kind) {
    case 'Item':
        this.id = Number(data.Item);
        this.name = $dataItems[this.id].name;
        break;
    case 'Weapon':
        this.id = Number(data.Weapon);
        this.name = $dataWeapons[this.id].name;
        break;
    case 'Armor':
        this.id = Number(data.Armor);
        this.name = $dataArmors[this.id].name;
        break;
    }
	this.UseCustomPrice = eval(data.UseCustomPrice);
	this.price = Number(data.Price);
	this.StockQuantityType = String(data.StockQuantityType);
	this.StockQuantity = Number(data.StockQuantity);
	this.AvailabilityCond = JSON.parse(data.AvailabilityCond);
	this.UseCustomSellingPrice = eval(data.UseCustomSellingPrice);
	this.SellingPrice = Number(data.SellingPrice);
};

Data_ShopGood.prototype.isIndependentAndLimited = function () {
    if (!Imported.YEP_ItemCore) return false;
    if (this.StockQuantity <= 0) return false;
    var item = null;
    switch (this.kind) {
    case 'Item':
        item = $dataItems[this.id];
        break;
    case 'Weapon':
        item = $dataWeapons[this.id];
        break;
    case 'Armor':
        item = $dataArmors[this.id];
        break;
    default:
        return false;
    }
    return DataManager.isIndependent(item);
};

//=============================================================================
// Data_ShopDiscount
//=============================================================================

Data_ShopDiscount = function () {
    this.initialize.apply(this, arguments);
}

Data_ShopDiscount.prototype = Object.create(Object.prototype);
Data_ShopDiscount.prototype.constructor = Data_ShopDiscount;

Data_ShopDiscount.prototype.initialize = function (discount) {
    this.condition = JSON.parse(discount.Condition);
    this.percentage = discount.Percentage;
};

//=============================================================================
// Game_Shops
//=============================================================================

function Game_Shops() {
    this.initialize.apply(this, arguments);
}

Game_Shops.prototype = Object.create(Object.prototype);
Game_Shops.prototype.constructor = Game_Shops;

Game_Shops.prototype.initialize = function () {
	this._shops = {};
};

Game_Shops.prototype.shop = function (shopId) {
    if (!this._shops[shopId])
		this._shops[shopId] = new Game_Shop($dataShops[shopId]);
    return this._shops[shopId];
};

Game_Shops.prototype.deleteShop = function (shopId) {
    delete this._shops[shopId];
};

Game_Shops.prototype.openShop = function (shopId) {
    var shop = this.shop(shopId);
	if (!shop) return;
	$gameTemp.setActiveShop(shop);
	shop.OpenShop();
	SceneManager.push(Scene_Shop);
	SceneManager.prepareNextScene(shop._goods, shop.shopType === 'BuyOnly');
};

Game_Shops.prototype.refillShopStock = function (args) {
	for (var i = 0; i < args.length; ++i) {
		var shop = this.shop(args[i]);
		shop.refillStock();
	}
};

Game_Shops.prototype.refillGoodStock = function (args, type) {
	if (GT.Param.SoldIndpendItem) return;
	if (args.length < 3) return;
	var shopId = Number(args[0]);
	var id = Number(args[1]);
	var quantity = Number(args[2]);
	if (!shopId || !id || !quantity) return;
	var shop = this.shop(shopId);
	shop.refillGood(type, id, quantity);
};

Game_Shops.prototype.refillShopMoney = function (args) {
	for (var i = 0; i < args.length; ++i) {
		var shop = this.shop(args[i]);
		shop.refillMoney();
	}
};

//=============================================================================
// Game_Shop
//=============================================================================

function Game_Shop() {
    this.initialize.apply(this, arguments);
}

Game_Shop.prototype = Object.create(Object.prototype);
Game_Shop.prototype.constructor = Game_Shop;

Game_Shop.prototype.initialize = function (dataShop) {
	this.id = dataShop.id;
    this.name = dataShop.name;
    this.shopType = dataShop.shopType;
    this.RestrictSales = dataShop.RestrictSales;
    this.RefillType = dataShop.RefillType;
    this.RefillTime = dataShop.RefillTime;
    this.RefillCond = dataShop.RefillCond;
	this.PriceRateVar = dataShop.PriceRateVar;
    this._discounts = dataShop._discounts;
    this._totalItemsBought = 0;
    this._itemsBought = {};
    this._weaponsBought = {};
    this._armorBought = {};
    this._nrOfVisits = 0;
	this._avaiableMoney = 0;
    this._allGoods = [];
    this._goods = [];
    this.refillStock();
};

Game_Shop.prototype.shop = function () {
	return $dataShops[this.id];
};

Game_Shop.prototype.refillStock = function () {
    this.lastStockRefillTime = $gameSystem.playtime();
    if (GT.Param.SoldIndpendItem) {
        for (var i = 0; i < this._allGoods.length; i++) {
            this.removeIfIndendentItem(this._allGoods[i]);
        }
    }
    this._allGoods = [];
    for (var i = 0; i < this.shop()._allGoods.length; i++) {
		var good = this.shop()._allGoods[i];
		if (GT.Param.SoldIndpendItem && Imported.YEP_ItemCore && good.isIndependentAndLimited()) {
            for (var q = 0; q < good.StockQuantity; q++) {
                this._allGoods.push(new Game_ShopGood(good));
            }
        } else {
            this._allGoods.push(new Game_ShopGood(good));
        }
    }
	this.refillMoney();
};

Game_Shop.prototype.refillMoney = function () {
	this._avaiableMoney = Math.max(this.shop()._avaiableMoney, this._avaiableMoney);
};

Game_Shop.prototype.changeMoney = function (quantity) {
	this._avaiableMoney += quantity;
	this._avaiableMoney = Math.max(this._avaiableMoney, 0);
};

Game_Shop.prototype.refillGood = function (kind, id, quantity) {
    for (var i = 0; i < this._allGoods.length; i++) {
		var realGood = this._allGoods[i];
		var good = this.shop()._allGoods[i];
		kind = kind.toLowerCase();
        if (!realGood.kind.toLowerCase() == kind || !realGood.id == id) 
			continue;
		var maxStockQuantity;
		if (good.StockQuantityType === 'Amount') {
			maxStockQuantity = good.StockQuantity;
			if (maxStockQuantity === 0)
				maxStockQuantity = -1; // For endless stock
		} else {
			maxStockQuantity = $gameVariables.value(good.StockQuantity);
			if (maxStockQuantity < 0)
				maxStockQuantity = -1; // For endless stock
		}
		if (maxStockQuantity >= 0) {
			realGood.StockQuantity += quantity;
			realGood.StockQuantity = realGood.StockQuantity.clamp(0, maxStockQuantity);
		}
    }
};

Game_Shop.prototype.setActualGoods = function () {
    this._goods = [];
    for (var i = 0; i < this._allGoods.length; i++) {
        var shopGood = this._allGoods[i];
		if (!eval(shopGood.AvailabilityCond)) continue;
        if (GT.Param.DisplaySoldOutItems || Math.abs(shopGood.StockQuantity) > 0) {
            for (var g = 0; g < this._goods.length; g++) {
                if (!this._goods[g][0] === shopGood.getShopGoodKind())
					continue;
				if (this._goods[g][1] === shopGood.id)
                    break;
            }
            if (g === this._goods.length) {
                this._goods.push([
					shopGood.getShopGoodKind(), 
					shopGood.id, 
					shopGood.UseCustomPrice ? 1 : 0,
					shopGood.price, 
					shopGood.StockQuantity, 
					this.defineSellingPrice(shopGood), 
					shopGood
				]);
            } else {
                this._goods[g][2] = this._goods[g][2] || shopGood.UseCustomPrice;
                this._goods[g][3] = Math.max(this._goods[g][3], shopGood.price);
                if (this._goods[g][4] >= 0) {
                    if (shopGood.StockQuantity >= 0) {
                        this._goods[g][4] += shopGood.StockQuantity;
                    } else {
                        this._goods[g][4] = shopGood.StockQuantity;
                    }
                }
                this._goods[g][5] = Math.max(this._goods[g][5], this.defineSellingPrice(shopGood));
            }
        }
    }

    for (var g = 0; g < this._goods.length; g++) {
        var kind = this._goods[g][0];
        var id = this._goods[g][1];
        var discountFact = 1.0;
        for (var d = 0; d < this._discounts.length; d++) {
            if (eval(this._discounts[d].condition)) {
                discountFact *= this._discounts[d].percentage / 100.0;
            }
        }
        if (discountFact != 1.0) {
            var customPrice = this._goods[g][2];
            var price = 0;
            if (customPrice == 1) {
                price = this._goods[g][3];
            } else {
                if (kind == 0)
                    price = $dataItems[id].price;
                else if (kind == 1)
                    price = $dataWeapons[id].price;
                else if (kind == 2)
                    price = $dataArmor[id].price;
                else
                    price = NaN;
            }
            this._goods[g][2] = 1;
            this._goods[g][3] = Math.floor(price * discountFact);
        }
    }
};

Game_Shop.prototype.pushSellGoods = function (item, number) {
	if (!item) return;
	var kind;
    if (DataManager.isWeapon(item))
        kind = 'Weapon';
    else if (DataManager.isArmor(item))
        kind = 'Armor';
	else 
		kind = 'Item';
	var dataShopGood = {
		kind: kind,
		id: item.id,
		name: item.name,
		UseCustomPrice: false,
		price: item.price,
		UseCustomSellingPrice: false,
		SellingPrice: Math.floor(item.price / 2.0),
		StockQuantityType: 'Amount',
		StockQuantity: number,
		AvailabilityCond: true,
		isSellGoods: true
	}
	var shopGood = new Game_ShopGood(dataShopGood);
	this._allGoods.push(shopGood);
	this.setActualGoods();
};

Game_Shop.prototype.OpenShop = function () {
    if (this.RefillType == 'After time' && $gameSystem.playtime() - this.lastStockRefillTime >= this.RefillTime)
        this.refillStock();
    if (this.RefillType == 'Custom' && eval(this.RefillCond))
        this.refillStock();
    this._nrOfVisits++;
    this.setActualGoods();
};

Game_Shop.prototype.defineSellingPrice = function (shopGood) {
    if (shopGood.UseCustomSellingPrice) {
        return shopGood.SellingPrice;
    } 
	var item = this.getDataObject(shopGood);
	if (!item) {
		return 0;
	} else {
		if (item.sellPrice !== undefined)
			return item.sellPrice;
		if (shopGood.UseCustomPrice)
			return Math.floor(shopGood.price / 2.0);
		return Math.floor(item.price / 2.0);
	}
};

Game_Shop.prototype.removeIfIndendentItem = function (shopGood) {
    if (!Imported.YEP_ItemCore) return;
    var item = this.getDataObject(shopGood);
	if (!item) return;
	if (!DataManager.isIndependent(item)) return;
    if ($gameParty.hasItem(item, true)) return;
	DataManager.removeIndependentItem(item);
};

Game_Shop.prototype.getDataObject = function (shopGood) {
    var item = null;
    switch (shopGood.getShopGoodKind()) {
    case 0:
        item = $dataItems[shopGood.id];
        break;
    case 1:
        item = $dataWeapons[shopGood.id];
        break;
    case 2:
        item = $dataArmors[shopGood.id];
        break;
    }
    return item;
};

Game_Shop.prototype.getStockQuantity = function (item) {
    if (!item) return -1;
    var kind = 0;
    if (DataManager.isWeapon(item))
        kind = 1;
    else if (DataManager.isArmor(item))
        kind = 2;
    for (var i = 0; i < this._goods.length; i++) {
        if (this._goods[i][0] === kind && this._goods[i][1] === item.id)
            return this._goods[i][4];
    }
    return -1; // Endless stock
};

Game_Shop.prototype.getSellingPrice = function (item) {
    if (!item) return -1;
    var kind = 0;
    if (DataManager.isWeapon(item))
        kind = 1;
    else if (DataManager.isArmor(item))
        kind = 2;
    for (var i = 0; i < this._goods.length; i++) {
        if (this._goods[i][0] === kind && this._goods[i][1] === item.id)
            return this._goods[i][5];
    }
    if (item.sellPrice !== undefined) return item.sellPrice;
    return Math.floor(item.price / 2);
};

Game_Shop.prototype.getNumberBoughtOf = function (kind, id) {
    if (kind === 0)
        return this._itemsBought[id];
    else if (kind === 1)
        return this._weaponsBought[id];
    else if (kind === 2)
        return this._armorBought[id];
    else
        return null;
};

Game_Shop.prototype.loseStock = function (item, number) {
    if (!item) return;
    var kind = 0;
    if (DataManager.isWeapon(item))
        kind = 1;
    else if (DataManager.isArmor(item))
        kind = 2;
    this._totalItemsBought += number;
    if (kind == 0) {
        this._itemsBought[item.id] = (this._itemsBought[item.id] || 0) + number;
    } else if (kind == 1) {
        this._weaponsBought[item.id] = (this._weaponsBought[item.id] || 0) + number;
    } else if (kind == 2) {
        this._armorBought[item.id] = (this._armorBought[item.id] || 0) + number;
    }
    for (var i = 0; i < this._goods.length; i++) {
        if (this._goods[i][0] === kind && this._goods[i][1] === item.id) {
            if (this._goods[i][4] > 0) {
                this._goods[i][4] -= number;
            }
            break;
        }
    }
    for (var i = 0; i < this._allGoods.length; i++) {
		var good = this._allGoods[i];
        if (good.getShopGoodKind() === kind && good.id === item.id) {
            if (good.StockQuantity > 0) {
                if (number >= good.StockQuantity) {
                    number -= good.StockQuantity;
                    good.StockQuantity = 0;
                } else {
                    good.StockQuantity -= number;
                    break;
                }
            }
            if (number === 0)
                break;
        }
    }
};

Game_Shop.prototype.offers = function (item) {
    if (!item) return true;
    var kind = 0;
    if (DataManager.isWeapon(item))
        kind = 1;
    else if (DataManager.isArmor(item))
        kind = 2;
    for (var i = 0; i < this._goods.length; i++) {
		var good = this._goods[i];
        if (good[0] === kind && good[1] === item.id)
            return true;
		if (!Imported.YEP_ItemCore) continue;
        if (good[0] === kind && good[1] === item.baseItemId)
            return true;
    }
    return false;
};

//=============================================================================
// Game_ShopGood
//=============================================================================

function Game_ShopGood() {
    this.initialize.apply(this, arguments);
}

Game_ShopGood.prototype = Object.create(Object.prototype);
Game_ShopGood.prototype.constructor = Game_ShopGood;

Game_ShopGood.prototype.initialize = function (data) {
    this.kind = data.kind;
    this.id = data.id;
    this.name = data.name;
    this.UseCustomPrice = data.UseCustomPrice;
    this.price = data.price;
    this.UseCustomSellingPrice = data.UseCustomSellingPrice;
    this.SellingPrice = data.SellingPrice;
    if (data.StockQuantityType === 'Amount') {
        this.StockQuantity = data.StockQuantity;
        if (this.StockQuantity === 0)
            this.StockQuantity = -1; // For endless stock
    } else {
        this.StockQuantity = $gameVariables.value(data.StockQuantity);
        if (this.StockQuantity < 0)
            this.StockQuantity = -1; // For endless stock
    }
    this.AvailabilityCond = data.AvailabilityCond;
    if (GT.Param.SoldIndpendItem && !data.isSellGoods && data.isIndependentAndLimited()) {
        this.makeIndepentGoods();
    }
};

Game_ShopGood.prototype.getShopGoodKind = function () {
    if (this.kind === 'Item')
        return 0;
    if (this.kind === 'Weapon')
        return 1;
    if (this.kind === 'Armor')
        return 2;
    return null;
};

Game_ShopGood.prototype.makeIndepentGoods = function () {
    var baseItem = null;
    if (this.kind === 'Item') {
        baseItem = $dataItems[this.id];
    } else if (this.kind === 'Weapon') {
        baseItem = $dataWeapons[this.id];
    } else {
        baseItem = $dataArmors[this.id];
    }
    var newItem = DataManager.registerNewItem(baseItem);
    this.id = newItem.id;
    this.StockQuantity = 1;
};

//=============================================================================
// Game_Temp
//=============================================================================

GT.SSS.Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function () {
    GT.SSS.Game_Temp_initialize.call(this);
    this._activeShop = null;
};

Game_Temp.prototype.setActiveShop = function (shop) {
    this._activeShop = shop;
};

Game_Temp.prototype.getActiveShop = function (shop) {
    return this._activeShop;
};

Game_Temp.prototype.registerShopGoods = function() {
    var scene = SceneManager._scene;
    this._shopGoods = scene._goods;
    this._shopPurchaseOnly = scene._purchaseOnly;
};

Game_Temp.prototype.clearShopGoods = function() {
    this._shopGoods = undefined;
    this._shopPurchaseOnly = undefined;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

GT.SSS.Game_Interpreter_processShopCommand = Game_Interpreter.prototype.command302;
Game_Interpreter.prototype.command302 = function () {
    $gameTemp.setActiveShop(null);
    return GT.SSS.Game_Interpreter_processShopCommand.call(this);
};

GT.SSS.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    GT.SSS.Game_Interpreter_pluginCommand.call(this, command, args);
	switch (command) {
	case 'OpenShop':
		$gameShops.openShop(args[0]);
		break;
	case 'CloseShop':
		$gameShops.deleteShop(args[0]);
		break;
	case 'RefillShopStock':
		$gameShops.refillShopStock(args);
		break;
	case 'RefillItemStock':
		$gameShops.refillGoodStock(args, 'Item');
		break;
	case 'RefillArmorStock':
		$gameShops.refillGoodStock(args, 'Armor');
		break;
	case 'RefillWeaponStock':
		$gameShops.refillGoodStock(args, 'Weapon');
		break;
	case 'RefillMoneyStock':
		$gameShops.refillShopMoney(args);
		break;
	}
};

//=============================================================================
// Game_System
//=============================================================================

GT.SSS.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
    GT.SSS.Game_System_initialize.call(this);
    this.initConditionalShopPricesSettings();
};

Game_System.prototype.initConditionalShopPricesSettings = function () {
    if (!$gameVariables) return;
    this._initiatedConditionalShopPriceVariables = true;
    if (GT.Param.SSSGlobalPriceRateVar > 0) {
        $gameVariables.setValue(GT.Param.SSSGlobalPriceRateVar, 100);
    }
    if (GT.Param.SSSGlobalPriceFlatVar > 0) {
        $gameVariables.setValue(GT.Param.SSSGlobalPriceFlatVar, 0);
    }
	this.initShopPrivatePriceRateVar();
};

Game_System.prototype.initShopPrivatePriceRateVar = function () {
	for (var i = 0; i < $dataShops.length; i++) {
		var data = $dataShops[i];
		if (!data) continue;
		if (data.PriceRateVar && data.PriceRateVar > 0) {
			$gameVariables.setValue(data.PriceRateVar, 100);
		}
	}
};

Game_System.prototype.getGlobalPriceRate = function () {
    if (this._initiatedConditionalShopPriceVariables === undefined) {
        this.initConditionalShopPricesSettings();
    }
    if (GT.Param.SSSGlobalPriceRateVar > 0) {
        return $gameVariables.value(GT.Param.SSSGlobalPriceRateVar) / 100;
    } else {
        return 1;
    }
};

Game_System.prototype.getGlobalPriceFlat = function () {
    if (this._initiatedConditionalShopPriceVariables === undefined) {
        this.initConditionalShopPricesSettings();
    }
    if (GT.Param.SSSGlobalPriceFlatVar > 0) {
        return $gameVariables.value(GT.Param.SSSGlobalPriceFlatVar);
    } else {
        return 0;
    }
};

//=============================================================================
// Scene_Map
//=============================================================================

GT.SSS.Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function () {
    GT.SSS.Scene_Map_createDisplayObjects.call(this);
    $gameSystem.initConditionalShopPricesSettings();
};

//=============================================================================
// Window_ShopCommand
//=============================================================================

Window_ShopCommand.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_ShopCommand.prototype.maxCols = function() {
    return 4;
};

Window_ShopCommand.prototype.makeCommandList = function () {
    var activeShop = $gameTemp.getActiveShop();
    if (activeShop) {
		if (activeShop.shopType !== 'SellOnly') {
            this.addCommand(TextManager.buy, 'buy');
        }
        if (activeShop.shopType !== 'BuyOnly') {
            this.addCommand(TextManager.sell, 'sell', !this._purchaseOnly);
        }
    }
	else {
        this.addCommand(TextManager.buy, 'buy');
		this.addCommand(TextManager.sell, 'sell', !this._purchaseOnly);
    }
	this.makeExCommandList();
};

Window_ShopCommand.prototype.makeExCommandList = function () {
	var exCommandList = GT.Param.SSSExCommandList;
    for (var i = 0; i < exCommandList.length; ++i) {
      var command = String(exCommandList[i]);
      this.createExCommand(command);
    }
};

Window_ShopCommand.prototype.createExCommand = function(command) {
    command = command.toUpperCase();
    if (command === 'CANCEL') {
      this.addCommand(TextManager.cancel, 'cancel');
    } else if (['CUSTOM', 'ORIGINAL'].contains(command)) {
      this.addCustomCommands();
    } else if (command === 'EQUIP') {
      this.addCommand(TextManager.equip, 'equip');
    }
};

Window_ShopCommand.prototype.addCustomCommands = function () {
    if (Imported.NPCDialogueShop) {
        var params = PluginManager.parameters('NPCDialogueShop');
        var commonEventName = params['Common Event Name'];
        this.addCommand(commonEventName, 'event');
    }
};

//=============================================================================
// Window_ShopNumber
//=============================================================================

Window_ShopNumber.prototype.windowWidth = function() {
    return Graphics.boxWidth / 2;
};

Window_ShopNumber.prototype.refresh = function () {
	this.contents.clear();
    this._index = 0;
    this.resetFontSettings();
    this.drawItemName(this._item, 0, this.lineHeight(), this.contents.width);
    this.drawMultiplicationSign();
    this.drawNumber();
    this.drawTotalPrice();
	if ($gameTemp.getActiveShop() && !this.isSelling()) {
		this.drawAvailableStock();
	}
};

Window_ShopNumber.prototype.itemY = function() {
    return this.lineHeight() * 2;
};

Window_ShopNumber.prototype.drawTotalPrice = function() {
    var ww = this.contents.width - this.textPadding();
    var wy = this.itemY();
    this.drawHorzLine(this.lineHeight() * 3);
    this.drawTotalCurrency(ww, wy + this.lineHeight() * 1);
    this.drawTotalCost(ww, wy + this.lineHeight() * 2);
    this.drawHorzLine(wy + this.lineHeight() * 3);
    this.drawTotalAfter(ww, wy + this.lineHeight() * 3);
};

Window_ShopNumber.prototype.drawTotalCurrency = function(ww, wy) {
    var value = Yanfly.Util.toGroup(this.getTotalCurrency());
    this.drawCurrencyValue(value, this._currencyUnit, 0, wy, ww);
};

Window_ShopNumber.prototype.getTotalCurrency = function() {
    if (this._currencyUnit === TextManager.currencyUnit) {
      return $gameParty.gold();
    }
    return 0;
};

Window_ShopNumber.prototype.drawTotalCost = function(ww, wy) {
    var value = this._price * this._number;
    if (!this.isSelling()) value *= -1;
    value = Yanfly.Util.toGroup(value);
    if (this.isSelling()) value = '+' + value;
    this.drawCurrencyValue(value, this._currencyUnit, 0, wy, ww);
};

Window_ShopNumber.prototype.drawHorzLine = function(y) {
  this.contents.paintOpacity = 128;
  this.contents.fillRect(0, y, this.contentsWidth(), 2, this.normalColor());
  this.contents.paintOpacity = 255;
};

Window_ShopNumber.prototype.drawTotalAfter = function(ww, wy) {
    var value = this.getTotalCurrency();
    value += (this._price * this._number) * (!this.isSelling() ? -1 : 1);
    value = Yanfly.Util.toGroup(value);
    this.drawCurrencyValue(value, this._currencyUnit, 0, wy, ww);
};

Window_ShopNumber.prototype.isSelling = function() {
    return SceneManager._scene.isSelling();
};

Window_ShopNumber.prototype.cursorWidth = function() {
    this.resetFontSettings();
    var item = this._item
    if (this._item && this._item.proxyBuy) {
      var id = this._item.proxyBuy;
      if (DataManager.isItem(this._item)) item = $dataItems[id];
      if (DataManager.isWeapon(this._item)) item = $dataWeapons[id];
      if (DataManager.isArmor(this._item)) item = $dataArmors[id];
    }
    var value = $gameParty.maxItems(item);
    var digitWidth = this.textWidth(Yanfly.Util.toGroup(value));
    return digitWidth + this.textPadding() * 2;
};

Window_ShopNumber.prototype.drawAvailableStock = function () {
    var shop = $gameTemp.getActiveShop();
    var stock = shop.getStockQuantity(this._item);
    var x = this.textPadding();
    var y = 0;
	if (stock < 0) return;
    var amountText = String(stock - this._number);
    this.changeTextColor(this.systemColor());
    this.drawText(GT.Param.StockQuantityText, x, y, this.contents.width - this.textPadding() * 2, 'left');
    this.resetTextColor();
    this.drawText(amountText, x, y, this.contents.width - this.textPadding() * 2, 'right');
};

//=============================================================================
// Window_ShopCategory
//=============================================================================

function Window_ShopCategory() {
    this.initialize.apply(this, arguments);
}

Window_ShopCategory.prototype = Object.create(Window_ItemCategory.prototype);
Window_ShopCategory.prototype.constructor = Window_ShopCategory;

Window_ShopCategory.prototype.initialize = function() {
    Window_ItemCategory.prototype.initialize.call(this);
};

Window_ShopCategory.prototype.windowWidth = function() {
    return Graphics.boxWidth / 2;
};

Window_ShopCategory.prototype.numVisibleRows = function() {
    return 1;
};

Window_ShopCategory.prototype.maxCols = function() {
    return 4;
};

Window_ShopCategory.prototype.itemTextAlign = function() {
    return 'center';
};

//=============================================================================
// Window_ShopBuy
//=============================================================================

Window_ShopBuy.prototype.windowWidth = function() {
    return Graphics.boxWidth / 2;
};

GT.SSS.Window_ShopBuy_price = Window_ShopBuy.prototype.price;
Window_ShopBuy.prototype.price = function (item) {
    var price = GT.SSS.Window_ShopBuy_price.call(this, item);
	price = this.processConditionalShopPrices(item, price);
	return price;
};

Window_ShopBuy.prototype.processConditionalShopPrices = function (item, price) {
    var priceVariable = item.priceVariable;
    if (priceVariable && priceVariable.base) {
        price = $gameVariables.value(priceVariable.base);
    }
    price *= $gameSystem.getGlobalPriceRate();
	if ($gameTemp.getActiveShop()) {
		var shopPriceRateVar = $gameTemp.getActiveShop().PriceRateVar;
		if (shopPriceRateVar)
			price *= $gameVariables.value(shopPriceRateVar) / 100;
	}
	if (priceVariable && priceVariable.percent && priceVariable.percent.length) {
		for (var i = 0; i < priceVariable.percent.length; i++) {
			price *= $gameVariables.value(priceVariable.percent[i]) / 100;
		}
	}
    price += $gameSystem.getGlobalPriceFlat();
	if (priceVariable && priceVariable.increase && priceVariable.increase.length) {
		for (var i = 0; i < priceVariable.percent.length; i++) {
			price += $gameVariables.value(priceVariable.increase[i]);
		}
	}
	if (priceVariable && priceVariable.exact) {
        price = $gameVariables.value(priceVariable.exact);
    }
	eval(GT.Param.SSSFinalizePriceEval);
    if (item.priceMin !== undefined) {
        price = Math.max(item.priceMin, price);
    }
    if (item.priceMax !== undefined) {
        price = Math.min(item.priceMax, price);
    }
    return Math.max(0, Math.round(price));
};

GT.SSS.Window_ShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
Window_ShopBuy.prototype.isEnabled = function (item) {
    var enabled = GT.SSS.Window_ShopBuy_isEnabled.call(this, item);
    if (enabled && $gameTemp.getActiveShop() !== null) {
        enabled = Math.abs($gameTemp.getActiveShop().getStockQuantity(item)) > 0;
    }
    return enabled;
};

Window_ShopBuy.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
    this.drawBuyItem(item, rect);
    this.drawBuyPrice(item, rect);
    this.changePaintOpacity(true);
    this.resetFontSettings();
};

Window_ShopBuy.prototype.drawBuyItem = function(item, rect) {
    this.drawItemName(item, rect.x, rect.y, rect.width);
};

Window_ShopBuy.prototype.drawBuyPrice = function(item, rect) {
    if (Imported.YEP_CoreEngine) {
		this.contents.fontSize = Yanfly.Param.GoldFontSize;
    }
	if ($gameTemp.getActiveShop()) {
		var stockQuantity = $gameTemp.getActiveShop().getStockQuantity(item);
        if (Math.abs(stockQuantity) === 0)
			return this.drawSoldOutText(rect.x, rect.y, rect.width);
    } 
	this.drawAllCurrency(item, rect);
};

Window_Base.prototype.drawSoldOutText = function(x, y, width) {
	var text = GT.Param.SoldOutText;
    this.resetTextColor();
    this.drawText(text, x, y, width - 6, 'right');
};

Window_ShopBuy.prototype.drawAllCurrency = function(item, rect) {
	this.drawCurrencyValue(this.price(item), this.currencyUnit(), rect.x, rect.y,
        rect.width);
};

Window_ShopBuy.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

//=============================================================================
// Window_ShopSell
//=============================================================================

Window_ShopSell.prototype.maxCols = function() {
    return 1;
};

GT.SSS.Window_ShopSell_includes = Window_ShopSell.prototype.includes;
Window_ShopSell.prototype.includes = function (item) {
    var includes = GT.SSS.Window_ShopSell_includes.call(this, item);
	var shop = $gameTemp.getActiveShop();
    if (includes && shop && shop.RestrictSales) {
        includes = shop.offers(item);
    }
    return includes;
};

GT.SSS.Window_ShopSell_isEnabled = Window_ShopSell.prototype.isEnabled;
Window_ShopSell.prototype.isEnabled = function (item) {
    var enabled = GT.SSS.Window_ShopSell_isEnabled.call(this, item);
	if (!item) return enabled;
	if ($gamePlayer.isDebugThrough()) return true;
	if (item.cannotSell) return false;
	var sellingPrice = 0;
	var shop = $gameTemp.getActiveShop();
	if (shop) {
		sellingPrice = shop.getSellingPrice(item);
		var forceEnable = shop._avaiableMoney >= sellingPrice;
		if (!forceEnable) return false;
	} else if (item.sellPrice !== undefined) {
		sellingPrice = item.sellPrice;
	}
	return enabled || (sellingPrice > 0) || item.canSell;
};

Window_ShopSell.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};

GT.SSS.Window_ShopSell_updateHelp = Window_ShopSell.prototype.updateHelp;
Window_ShopSell.prototype.updateHelp = function() {
    GT.SSS.Window_ShopSell_updateHelp.call(this);
    if (this._statusWindow) this._statusWindow.setItem(this.item());
};

//=============================================================================
// Window_ShopName
//=============================================================================

function Window_ShopName() {
    this.initialize.apply(this, arguments);
}

Window_ShopName.prototype = Object.create(Window_Base.prototype);
Window_ShopName.prototype.constructor = Window_ShopName;

Window_ShopName.prototype.initialize = function(x, y, width, name, money) {
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
	this._name = name;
	this._money = money;
    this.refresh();
};

Window_ShopName.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_ShopName.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
	this.drawText(this._name, this.textPadding(), 0);
    this.drawCurrencyValue(this._money, this.currencyUnit(), x, 0, width);
};

Window_ShopName.prototype.currencyUnit = function() {
    return TextManager.currencyUnit;
};

Window_ShopName.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

//=============================================================================
// Scene_Shop
//=============================================================================

GT.SSS.Scene_Shop_prepare = Scene_Shop.prototype.prepare;
Scene_Shop.prototype.prepare = function (goods, purchaseOnly) {
    goods = JsonEx.makeDeepCopy(goods);
    GT.SSS.Scene_Shop_prepare.call(this, goods, purchaseOnly);
    this.adjustHideShowGoods();
};

Scene_Shop.prototype.adjustHideShowGoods = function () {
    var length = this._goods.length;
    for (var i = 0; i < length; ++i) {
        var good = this._goods[i];
        if (this.isGoodShown(good)) continue;
        this._goods[i][0] = -1;
    }
};

Scene_Shop.prototype.isGoodShown = function (good) {
	var typeList = [$dataItems, $dataWeapons, $dataArmors];
	if (![0, 1, 2].contains(good[0])) return false;
	var item = typeList[good[0]][good[1]];
    if (!item) return false;
	if (item.baseItemId) 
		item = DataManager.getBaseItem(item);
    if (item.note === undefined || item.note === null) return false;
	
	var note1 = /<SHOP HIDE IF SWITCH ON:[ ](\d+)>/i;
	var note2 = /<SHOP HIDE IF SWITCH OFF:[ ](\d+)>/i;
	var note3 = /<SHOP HIDE IF ANY SWITCH ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
	var note4 = /<SHOP HIDE IF ANY SWITCH OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
	var note5 = /<SHOP HIDE IF ALL SWITCHES ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
	var note6 = /<SHOP HIDE IF ALL SWITCHES OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
	
    var notedata = item.note.split(/[\r\n]+/);
    for (var i = 0; i < notedata.length; ++i) {
        var line = notedata[i];
        if (line.match(note1)) {
            var hide = $gameSwitches.value(Number(RegExp.$1));
            if (hide) return false;    
        } else if (line.match(note2)) {
            var hide = !$gameSwitches.value(Number(RegExp.$1));
            if (hide) return false;            
        } else if (line.match(note3)) {
            var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            var hide = false;
            for (var j = 0; j < array.length; ++j) {
                hide = hide || $gameSwitches.value(array[j]);
            }
            if (hide) return false;         
        } else if (line.match(note4)) {
            var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            var hide = false;
            for (var j = 0; j < array.length; ++j) {
                hide = hide || !$gameSwitches.value(array[j]);
            }
            if (hide) return false;           
        } else if (line.match(note5)) {
            var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            var hide = true;
            for (var j = 0; j < array.length; ++j) {
				hide = hide && $gameSwitches.value(array[j]);
            }
            if (hide) return false;            
        } else if (line.match(note6)) {
            var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            var hide = true;
            for (var j = 0; j < array.length; ++j) {
                hide = hide && !$gameSwitches.value(array[j]);
            }
            if (hide) return false;           
        }
    }
	var show = true;
	eval(GT.Param.SSSFinalizeShowEval);
    return show;
};

Scene_Shop.prototype.failSafeGoods = function () {
    if (this._goods === undefined) {
        var goods = $gameTemp._shopGoods;
        var purchaseOnly = $gameTemp._shopPurchaseOnly;
        this.prepare(goods, purchaseOnly);
    }
    $gameTemp.clearShopGoods();
};

GT.SSS.Scene_Shop_popScene = Scene_Shop.prototype.popScene;
Scene_Shop.prototype.popScene = function () {
	if (this._shop)
		this._shop._goods = [];
    $gameTemp.setActiveShop(null);
    GT.SSS.Scene_Shop_popScene.call(this);
};

GT.SSS.Scene_Shop_initialize = Scene_Shop.prototype.initialize;
Scene_Shop.prototype.initialize = function () {
	GT.SSS.Scene_Shop_initialize.call(this);
	this._shop = $gameTemp.getActiveShop();
};

Scene_Shop.prototype.create = function () {
	Scene_MenuBase.prototype.create.call(this);
	this.failSafeGoods();
	this.createHelpWindow();
    this.createCommandWindow();
    this.createDummyWindow();
    this.createNumberWindow();
    this.createBuyWindow();
    this.createCategoryWindow();
    this.createSellWindow();
    this.createGoldWindow();
    this.createStatusWindow();
	this.createShopNameWindow();
	this.createActorWindow();
};

Scene_Shop.prototype.createCommandWindow = function () {
	this._commandWindow = new Window_ShopCommand(0, this._purchaseOnly);
	this._commandWindow.y = this._helpWindow.height;
	this._commandWindow.setHandler('buy',    this.commandBuy.bind(this));
    this._commandWindow.setHandler('sell',   this.commandSell.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
	this._commandWindow.setHandler('equip',  this.commandEquip.bind(this));
	this.addWindow(this._commandWindow);
};

Scene_Shop.prototype.createDummyWindow = function() {
    var wy = this._commandWindow.y + this._commandWindow.height;
    var wh = Graphics.boxHeight - wy;
	if (this._shop) {
		wh -= this._helpWindow.fittingHeight(1);
	}
    var ww = Graphics.boxWidth / 2;
    this._dummyWindow = new Window_Base(0, wy, ww, wh);
    this.addWindow(this._dummyWindow);
};

Scene_Shop.prototype.createBuyWindow = function() {
    var wy = this._dummyWindow.y;
    var wh = this._dummyWindow.height;
    this._buyWindow = new Window_ShopBuy(0, wy, wh, this._goods);
    this._buyWindow.setHelpWindow(this._helpWindow);
    this._buyWindow.hide();
    this._buyWindow.setHandler('ok',     this.onBuyOk.bind(this));
    this._buyWindow.setHandler('cancel', this.onBuyCancel.bind(this));
    this.addWindow(this._buyWindow);
};

Scene_Shop.prototype.createCategoryWindow = function() {
    this._categoryWindow = new Window_ShopCategory();
    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._categoryWindow.y = this._commandWindow.y + this._commandWindow.height;
    this._categoryWindow.hide();
    this._categoryWindow.deactivate();
    this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
    this.addWindow(this._categoryWindow);
};

Scene_Shop.prototype.createSellWindow = function() {
    var wy = this._categoryWindow.y + this._categoryWindow.height;
    var ww = this._dummyWindow.width;
    var wh = Graphics.boxHeight - wy;
	if (this._shop) {
		wh -= this._helpWindow.fittingHeight(1);
	}
    this._sellWindow = new Window_ShopSell(0, wy, ww, wh);
    this._sellWindow.setHelpWindow(this._helpWindow);
    this._sellWindow.hide();
    this._sellWindow.setHandler('ok',     this.onSellOk.bind(this));
    this._sellWindow.setHandler('cancel', this.onSellCancel.bind(this));
    this._categoryWindow.setItemWindow(this._sellWindow);
    this.addWindow(this._sellWindow);
};

Scene_Shop.prototype.createGoldWindow = function() {
    this._goldWindow = new Window_Gold(0, 0);
	if (this._shop) {
		this._goldWindow.x = 0;
		this._goldWindow.width = this._buyWindow.width;
	}
	else {
		this._goldWindow.x = this._buyWindow.width;
		this._goldWindow.width = Graphics.boxWidth - this._goldWindow.x;
	}
	this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
    this._goldWindow.createContents();
    this._goldWindow.refresh();
    this.addWindow(this._goldWindow);
};

Scene_Shop.prototype.createStatusWindow = function() {
    var wx = this._dummyWindow.width;
    var wy = this._dummyWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = this._dummyWindow.height;
	if (!this._shop) {
		wh -= this._goldWindow.height;
	}
    this._statusWindow = new Window_ShopStatus(wx, wy, ww, wh);
    this.addWindow(this._statusWindow);
    this._buyWindow.setStatusWindow(this._statusWindow);
    this._sellWindow.setStatusWindow(this._statusWindow);
};

Scene_Shop.prototype.createShopNameWindow = function() {
	if (!this._shop) return;
	var wx = this._goldWindow.width;
	var wy = this._goldWindow.y;
	var ww = this._goldWindow.width;
	var shopName = this._shop.name;
	var money = this._shop._avaiableMoney;
	this._nameWindow = new Window_ShopName(wx, wy, ww, shopName, money);
	this.addWindow(this._nameWindow);
};

GT.SSS.Scene_Shop_onBuyCancel = Scene_Shop.prototype.onBuyCancel;
Scene_Shop.prototype.onBuyCancel = function() {
    GT.SSS.Scene_Shop_onBuyCancel.call(this);
    this._statusWindow.show();
};

GT.SSS.Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
Scene_Shop.prototype.maxBuy = function () {
    var maxBuy = GT.SSS.Scene_Shop_maxBuy.call(this);
    if (!this._shop) return maxBuy;
	var stock = this._shop.getStockQuantity(this._item);
	if (stock === -1) return maxBuy;
	return Math.max(Math.min(maxBuy, stock), 0);
};

GT.SSS.Scene_Shop_maxSell = Scene_Shop.prototype.maxSell;
Scene_Shop.prototype.maxSell = function () {
    var maxSell = GT.SSS.Scene_Shop_maxSell.call(this);
    if (!this._shop) return maxSell;
	var money = this._shop._avaiableMoney;
	var number = Math.floor(money / this.sellingPrice());
	return Math.max(Math.min(maxSell, number), 0);
};

Scene_Shop.prototype.doBuy = function (number) {
	if (Imported.YEP_ItemCore) $gameTemp.enableVarianceStock();
	this.doBuyGold(number);
	this.doBuyItem(number);
	if (Imported.YEP_ItemCore) $gameTemp.disableVarianceStock();
};

Scene_Shop.prototype.doBuyGold = function(number) {
    $gameParty.loseGold(number * this.buyingPrice());
	if (this._shop) {
		this._shop.changeMoney(number * this.buyingPrice());
		this._nameWindow._money = this._shop._avaiableMoney;
		this._nameWindow.refresh();
    }
	if (GT.Param.SSSBuyTrackVar > 0) {
		var num = $gameVariables.value(GT.Param.SSSBuyTrackVar);
		num += (number * this.buyingPrice());
		$gameVariables.setValue(GT.Param.SSSBuyTrackVar, num);
	}
};

Scene_Shop.prototype.doBuyItem = function(number) {
	if (this._shop) {
		this._shop.loseStock(this._item, number);
	}
	if (this._item.shopSwitch) {
		for (var i = 0; i < this._item.shopSwitch.length; i++) {
			var switchId = this._item.shopSwitch[i][0];
			var SwitchType = this._item.shopSwitch[i][1];
			if (SwitchType === 1)
				$gameSwitches.setValue(switchId, true);
			else if (SwitchType === 2)
				$gameSwitches.setValue(switchId, false);
			else
				$gameSwitches.setValue(switchId, !$gameSwitches.value(switchId));
		}
    } 
	else {
		$gameParty.gainItem(this._item, number);
	}
};

Scene_Shop.prototype.doSell = function (number) {
	this.doSellGold(number);
    this.doSellItem(number);
	if (this._shop) return;
    if (!Imported.YEP_ItemCore) return;
    if (!DataManager.isIndependent(this._item)) return;
    DataManager.removeIndependentItem(this._item);
};

Scene_Shop.prototype.doSellGold = function(number) {
    $gameParty.gainGold(number * this.sellingPrice());
	if (this._shop) {
		this._shop.changeMoney(-number * this.sellingPrice());
		this._nameWindow._money = this._shop._avaiableMoney;
		this._nameWindow.refresh();
    }
	if (GT.Param.SSSSellTrackVar > 0) {
		var num = $gameVariables.value(GT.Param.SSSSellTrackVar);
		num += (number * this.sellingPrice());
		$gameVariables.setValue(GT.Param.SSSSellTrackVar, num);
	}
};

Scene_Shop.prototype.doSellItem = function(number) {
    $gameParty.loseItem(this._item, number);
	if (this._shop) {
		this._shop.pushSellGoods(this._item, number);
		this._goods = this._shop._goods;
		if (this._buyWindow) {
			this._buyWindow._shopGoods = this._goods;
			this._buyWindow.refresh();
		}
    }
};

GT.SSS.Scene_Shop_activateSellWindow = Scene_Shop.prototype.activateSellWindow;
Scene_Shop.prototype.activateSellWindow = function() {
    GT.SSS.Scene_Shop_activateSellWindow.call(this);
    this._statusWindow.show();
};

Scene_Shop.prototype.isSelling = function() {
    return this._commandWindow.currentSymbol() === 'sell';
};

Scene_Shop.prototype.createActorWindow = function() {
    this._actorWindow = new Window_MenuActor();
    this._actorWindow.setHandler('ok',     this.onActorOk.bind(this));
    this._actorWindow.setHandler('cancel', this.onActorCancel.bind(this));
    this.addWindow(this._actorWindow);
};

Scene_Shop.prototype.commandEquip = function() {  
    this._actorWindow.activate();
    this._actorWindow.show();
    this._actorWindow.select(0);
};

Scene_Shop.prototype.onActorOk = function() {
    this.onActorCommon();
    if (this._commandWindow.currentSymbol() === 'equip') {
      SceneManager.push(Scene_Equip);
    }
};

Scene_Shop.prototype.onActorCancel = function() {
    this._actorWindow.hide();
    this._actorWindow.deselect();
    this._commandWindow.activate();
};

Scene_Shop.prototype.onActorCommon = function() {
    $gameTemp.registerShopGoods();
    var index = this._actorWindow.index();
    var actor = $gameParty.members()[index];
    $gameParty.setMenuActor(actor);
    SoundManager.playOk();
};

GT.SSS.Scene_Shop_sellingPrice = Scene_Shop.prototype.sellingPrice;
Scene_Shop.prototype.sellingPrice = function () {
	var sellPrice = GT.SSS.Scene_Shop_sellingPrice.call(this);
	if (this._item && this._item.sellPrice !== undefined) {
		sellPrice = this._item.sellPrice;
    }
    if (this._shop) 
        sellPrice = this._shop.getSellingPrice(this._item);
	if (this._item)
		sellPrice = this._buyWindow.processConditionalShopPrices(this._item, sellPrice * 2) / 2;
    return sellPrice;
};

//=============================================================================
// Utilities
//=============================================================================

GT.Util = GT.Util || {};

GT.Util.getRange = function (n, m) {
    var result = [];
    for (var i = n; i <= m; ++i)
        result.push(i);
    return result;
};

GT.SSS.AlterPrices = function (prices, variance) {
    if (prices === undefined)
        return;
    for (var pr in prices) {
        prices[pr] = Math.round(Math.max(prices[pr] * (1 + variance), 0));
    }
};
//=============================================================================
// End of File
//=============================================================================
