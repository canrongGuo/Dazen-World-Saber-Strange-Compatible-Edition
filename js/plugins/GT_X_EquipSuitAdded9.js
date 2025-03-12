//=============================================================================
// GT50 Plugins - EquipSuitCore Extension - EquipSuitAdded9
// GT_X_EquipSuitAdded9.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_X_EquipSuitAdded9 = true;

var GT = GT || {};
GT.ESAdded9 = GT.ESAdded9 || {};
GT.ESAdded9.version = 1.0;

//=============================================================================
/*:
 * @plugindesc [v1.0]        装备 - 套装系统 - 套装数扩展9
 * @author ganfly
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 * 
 * 本组插件为装备套装系统的套装数扩展，可以将套装核心的100个套装扩展
 * 到更多，必须安装GT_EquipSuitCore才能运行。
 * 本组插件参考了YEP插件
 *
 *     GT_X_EquipSuitAdded1 扩展101-200号套装。
 *     GT_X_EquipSuitAdded2 扩展201-300号套装。
 *     GT_X_EquipSuitAdded3 扩展301-400号套装。
 *     GT_X_EquipSuitAdded4 扩展401-500号套装。
 *     GT_X_EquipSuitAdded5 扩展501-600号套装。
 *     GT_X_EquipSuitAdded6 扩展601-700号套装。
 *     GT_X_EquipSuitAdded7 扩展701-800号套装。
 *     GT_X_EquipSuitAdded8 扩展801-900号套装。
 *     GT_X_EquipSuitAdded9 扩展901-1000号套装。
 *
 * ============================================================================
 * 参数对照表及公式
 * ============================================================================
 *
 *  Base代表基础值，Plus代表参数加成，Rate代表参数倍率
 * 
 *  基础参数      公式：(Base + Plus) * Rate
 *  MHP 最大生命
 *  MMP 最大魔法
 *  ATK 攻击力
 *  DEF 防御力
 *  MAT 魔法攻击力
 *  MDF 魔法防御力
 *  AGI 敏捷
 *  LUK 幸运
 *
 *  额外参数      公式：(Base + Plus) * Rate
 *  HIT 命中率
 *  EVA 闪避率
 *  CRI 暴击率
 *  CEV 暴击闪避率
 *  MEV 魔法闪避率
 *  MRF 魔法反射率
 *  CNT 反击率
 *  HRG 生命自动回复率
 *  MRG 魔法自动回复率
 *  TRG 怒气自动回复率
 * 
 *  特殊参数      公式：(Base + Plus) * Rate
 *  TGR 受到攻击几率
 *  GRD 防御效果
 *  REC 回复效果
 *  PHA 药理知识
 *  MCR 魔法消耗率
 *  TCR 怒气补充率
 *  PDR 物理伤害率
 *  MDR 魔法伤害率
 *  FDR 地形伤害率
 *  EXR 经验率
 *  
 *  战斗结算      公式：(Base + Base * Plus) * Rate
 *  EXP 经验获得量
 *  GOLD 金币获得量
 *  ITEM 物品爆率
 * 
 * ============================================================================
 * 用户规约
 * ============================================================================
 * 
 *  MIT规约。
 *  如果你使用了本插件，请在致谢中包含'ganfly'或者'gt50'，谢啦！
 * 
 * ============================================================================
 * 更新日志
 * ============================================================================
 * 
 * [v1.0] 完成插件。
 * 
 * ============================================================================
 * 帮助结束
 * ============================================================================
 *
 * @param Suit List 901-925
 * @text ----套装列表901-925----
 * @default
 *
 * @param Suit 901
 * @text 套装901
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 902
 * @text 套装902
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 903
 * @text 套装903
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 904
 * @text 套装904
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 905
 * @text 套装905
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 906
 * @text 套装906
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 907
 * @text 套装907
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 908
 * @text 套装908
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 909
 * @text 套装909
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 910
 * @text 套装910
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 911
 * @text 套装911
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 912
 * @text 套装912
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 913
 * @text 套装913
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 914
 * @text 套装914
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 915
 * @text 套装915
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 916
 * @text 套装916
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 917
 * @text 套装917
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 918
 * @text 套装918
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 919
 * @text 套装919
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 920
 * @text 套装920
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 921
 * @text 套装921
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 922
 * @text 套装922
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 923
 * @text 套装923
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 924
 * @text 套装924
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 925
 * @text 套装925
 * @parent Suit List 901-925
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 926-950
 * @text ----套装列表926-950----
 * @default
 *
 * @param Suit 926
 * @text 套装926
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 927
 * @text 套装927
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 928
 * @text 套装928
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 929
 * @text 套装929
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 930
 * @text 套装930
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 931
 * @text 套装931
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 932
 * @text 套装932
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 933
 * @text 套装933
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 934
 * @text 套装934
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 935
 * @text 套装935
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 936
 * @text 套装936
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 937
 * @text 套装937
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 938
 * @text 套装938
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 939
 * @text 套装939
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 940
 * @text 套装940
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 941
 * @text 套装941
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 942
 * @text 套装942
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 943
 * @text 套装943
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 944
 * @text 套装944
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 945
 * @text 套装945
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 946
 * @text 套装946
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 947
 * @text 套装947
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 948
 * @text 套装948
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 949
 * @text 套装949
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 950
 * @text 套装950
 * @parent Suit List 926-950
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit List 951-975
 * @text ----套装列表951-975----
 * @default
 *
 * @param Suit 951
 * @text 套装951
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 952
 * @text 套装952
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 953
 * @text 套装953
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 954
 * @text 套装954
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 955
 * @text 套装955
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 956
 * @text 套装956
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 957
 * @text 套装957
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 958
 * @text 套装958
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 959
 * @text 套装959
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 960
 * @text 套装960
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 961
 * @text 套装961
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 962
 * @text 套装962
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 963
 * @text 套装963
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 964
 * @text 套装964
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 965
 * @text 套装965
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 966
 * @text 套装966
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 967
 * @text 套装967
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 968
 * @text 套装968
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 969
 * @text 套装969
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 970
 * @text 套装970
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 971
 * @text 套装971
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 972
 * @text 套装972
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 973
 * @text 套装973
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 974
 * @text 套装974
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 975
 * @text 套装975
 * @parent Suit List 951-975
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 976-1000
 * @text ----套装列表976-1000----
 * @default
 *
 * @param Suit 976
 * @text 套装976
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 977
 * @text 套装977
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 978
 * @text 套装978
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 979
 * @text 套装979
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 980
 * @text 套装980
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 981
 * @text 套装981
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 982
 * @text 套装982
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 983
 * @text 套装983
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 984
 * @text 套装984
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 985
 * @text 套装985
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 986
 * @text 套装986
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 987
 * @text 套装987
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 988
 * @text 套装988
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 989
 * @text 套装989
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 990
 * @text 套装990
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 991
 * @text 套装991
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 992
 * @text 套装992
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 993
 * @text 套装993
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 994
 * @text 套装994
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 995
 * @text 套装995
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 996
 * @text 套装996
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 997
 * @text 套装997
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 998
 * @text 套装998
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 999
 * @text 套装999
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 1000
 * @text 套装1000
 * @parent Suit List 976-1000
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 */
/* ---------------------------------------------------------------------------
 * struct<Suit>
 * ---------------------------------------------------------------------------
 */
/*~struct~Suit:
 *
 * @param SuitName
 * @text 套装名称
 * @desc 套装名称，可以使用文字代码。
 * @default xx套装
 *
 * @param SuitDescription
 * @text 套装额外说明
 * @type note
 * @desc 对整个套装的额外说明，可以使用文字代码。
 * @default
 *
 * @param SuitBonuses
 * @text 套装增益效果
 * @type struct<SuitPieces>[]
 * @desc 套装的分层效果。
 * @default []
 *
 * @param SuitNote
 * @text 套装备注
 * @type note
 * @desc 套装备注，无游戏内效果，仅用于制作套装时标记用
 * 比如可以写一下套装包含的装备，方便查找
 * @default
 */
/* ---------------------------------------------------------------------------
 * struct<SuitPieces>[]
 * ---------------------------------------------------------------------------
 */
/*~struct~SuitPieces:
 *
 * @param RequirePieces
 * @text 效果所需装备件数
 * @type number
 * @min 1
 * @desc 效果所需装备件数
 * @default 1
 *
 * @param Text
 * @text 本层效果说明
 * @type note
 * @desc 本层效果的额外说明，可以使用文字代码。
 * @default
 *
 * @param ShowText
 * @text 是否显示这层效果?
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否显示这层效果?
 * @default true
 *
 * @param PiecesBonuses
 * @text ----增益效果----
 *
 * @param PassiveStates
 * @text 被动状态
 * @parent PiecesBonuses
 * @type State[]
 * @desc 达到装备数要求时，自动给角色附加的状态，兼容YEP_AutoPassiveStates的状态备注条件。
 * @default []
 *
 * @param StatesResist
 * @text 状态免疫
 * @parent PiecesBonuses
 * @type State[]
 * @desc 达到装备数要求时，角色免疫的状态。
 * @default []
 *
 * @param AddSkills
 * @text 学习技能
 * @parent PiecesBonuses
 * @type Skill[]
 * @desc 达到装备数要求时，角色学习的技能。
 * @default []
 *
 * @param ParamBonuses
 * @text 基础参数增益
 * @parent PiecesBonuses
 * @type struct<ParamBonuses>[]
 * @desc 达到装备数要求时，角色的基础参数增益。
 * @default []
 *
 * @param XParamBonuses
 * @text 额外参数增益
 * @parent PiecesBonuses
 * @type struct<XParamBonuses>[]
 * @desc 达到装备数要求时，角色的额外参数增益。
 * @default []
 *
 * @param SParamBonuses
 * @text 特殊参数增益
 * @parent PiecesBonuses
 * @type struct<SParamBonuses>[]
 * @desc 达到装备数要求时，角色的特殊参数增益。
 * @default []
 *
 * @param BResultBonuses
 * @text 战斗结算增益
 * @parent PiecesBonuses
 * @type struct<BResultBonuses>[]
 * @desc 达到装备数要求时，队伍的战斗结算增益。
 * @default []
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ParamBonuses>[]
 * ---------------------------------------------------------------------------
 */
/*~struct~ParamBonuses:
 *
 * @param ParamName
 * @text 参数名称
 * @type combo
 * @option MHP
 * @option MMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc 参数名称，参照帮助中的缩写和参数名对照表
 * @default MHP
 *
 * @param ParamRate
 * @text 参数倍率
 * @desc 参数乘的倍率，1.0就是乘100%
 * @default 1.0
 *
 * @param ParamPlus
 * @text 参数加成
 * @desc 参数改变的值，可为负数，0代表加0，1代表加1，-1代表减1
 * @default 0
 *
 */
/* ---------------------------------------------------------------------------
 * struct<XParamBonuses>[]
 * ---------------------------------------------------------------------------
 */
/*~struct~XParamBonuses:
 *
 * @param ParamName
 * @text 参数名称
 * @type combo
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @desc 参数名称，参照帮助中的缩写和参数名对照表
 * @default HIT
 *
 * @param ParamRate
 * @text 参数倍率
 * @desc 参数乘的倍率，1.0就是乘100%
 * @default 1.0
 *
 * @param ParamPlus
 * @text 参数加成
 * @desc 参数改变的值，可为负数，0代表加0%，1代表加1%，-1代表减1%
 * @default 0
 *
 */
/* ---------------------------------------------------------------------------
 * struct<SParamBonuses>[]
 * ---------------------------------------------------------------------------
 */
/*~struct~SParamBonuses:
 *
 * @param ParamName
 * @text 参数名称
 * @type combo
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc 参数名称，参照帮助中的缩写和参数名对照表
 * @default TGR
 *
 * @param ParamRate
 * @text 参数倍率
 * @desc 参数乘的倍率，1.0就是乘100%
 * @default 1.0
 *
 * @param ParamPlus
 * @text 参数加成
 * @desc 参数改变的值，可为负数，0代表加0%，1代表加1%，-1代表减1%
 * @default 0
 *
 */
/* ---------------------------------------------------------------------------
 * struct<BResultBonuses>[]
 * ---------------------------------------------------------------------------
 */
/*~struct~BResultBonuses:
 *
 * @param ParamName
 * @text 参数名称
 * @type combo
 * @option EXP
 * @option GOLD
 * @option ITEM
 * @desc 参数名称，参照帮助中的缩写和参数名对照表
 * @default EXP
 *
 * @param ParamRate
 * @text 参数倍率
 * @desc 参数乘的倍率，1.0就是乘100%
 * @default 1.0
 *
 * @param ParamPlus
 * @text 参数加成
 * @desc 参数改变的值，可为负数，0代表加0%，1代表加1%，-1代表减1%
 * @default 0
 *
 */
//=============================================================================

if (Imported.GT_EquipSuitCore) {
	
//=============================================================================
// Parameter Variables
//=============================================================================

GT.Parameters = PluginManager.parameters('GT_X_EquipSuitAdded9');
GT.Param = GT.Param || {};

GT.Param.EquipSuitData9 = GT.Parameters;

//=============================================================================
// DataManager
//=============================================================================

GT.ESAdded9.DataManager_equipSuitDatabaseCreate = DataManager.equipSuitDatabaseCreate;
DataManager.equipSuitDatabaseCreate = function() {
	GT.ESAdded9.DataManager_equipSuitDatabaseCreate.call(this);
    $dataEquipSuits = $dataEquipSuits || [null];
    for (var i = 901; i <= 1000; ++i) {
        var equipSuitData = JSON.parse(GT.Param.EquipSuitData9['Suit ' + i] || 'null');
        if (equipSuitData) {
			this.equipSuitDatabaseAdd(i, equipSuitData);
		}
    }
	GT.Param.EquipSuitData9 = {};
};

//=============================================================================
// End of File
//=============================================================================
} else {
	
var text = '警告，你试图在没有安装GT_EquipSuitCore的情况下运行GT_X_EquipSuitAdded9，\n请安装GT_EquipSuitCore。';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.GT_EquipSuitCore
	