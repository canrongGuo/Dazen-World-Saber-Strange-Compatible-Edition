//=============================================================================
// GT50 Plugins - EquipSuitCore Extension - EquipSuitAdded8
// GT_X_EquipSuitAdded8.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_X_EquipSuitAdded8 = true;

var GT = GT || {};
GT.ESAdded8 = GT.ESAdded8 || {};
GT.ESAdded8.version = 1.0;

//=============================================================================
/*:
 * @plugindesc [v1.0]        装备 - 套装系统 - 套装数扩展8
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
 * @param Suit List 801-825
 * @text ----套装列表801-825----
 * @default
 *
 * @param Suit 801
 * @text 套装801
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 802
 * @text 套装802
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 803
 * @text 套装803
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 804
 * @text 套装804
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 805
 * @text 套装805
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 806
 * @text 套装806
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 807
 * @text 套装807
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 808
 * @text 套装808
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 809
 * @text 套装809
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 810
 * @text 套装810
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 811
 * @text 套装811
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 812
 * @text 套装812
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 813
 * @text 套装813
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 814
 * @text 套装814
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 815
 * @text 套装815
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 816
 * @text 套装816
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 817
 * @text 套装817
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 818
 * @text 套装818
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 819
 * @text 套装819
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 820
 * @text 套装820
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 821
 * @text 套装821
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 822
 * @text 套装822
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 823
 * @text 套装823
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 824
 * @text 套装824
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 825
 * @text 套装825
 * @parent Suit List 801-825
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 826-850
 * @text ----套装列表826-850----
 * @default
 *
 * @param Suit 826
 * @text 套装826
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 827
 * @text 套装827
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 828
 * @text 套装828
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 829
 * @text 套装829
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 830
 * @text 套装830
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 831
 * @text 套装831
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 832
 * @text 套装832
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 833
 * @text 套装833
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 834
 * @text 套装834
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 835
 * @text 套装835
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 836
 * @text 套装836
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 837
 * @text 套装837
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 838
 * @text 套装838
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 839
 * @text 套装839
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 840
 * @text 套装840
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 841
 * @text 套装841
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 842
 * @text 套装842
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 843
 * @text 套装843
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 844
 * @text 套装844
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 845
 * @text 套装845
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 846
 * @text 套装846
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 847
 * @text 套装847
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 848
 * @text 套装848
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 849
 * @text 套装849
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 850
 * @text 套装850
 * @parent Suit List 826-850
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit List 851-875
 * @text ----套装列表851-875----
 * @default
 *
 * @param Suit 851
 * @text 套装851
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 852
 * @text 套装852
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 853
 * @text 套装853
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 854
 * @text 套装854
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 855
 * @text 套装855
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 856
 * @text 套装856
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 857
 * @text 套装857
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 858
 * @text 套装858
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 859
 * @text 套装859
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 860
 * @text 套装860
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 861
 * @text 套装861
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 862
 * @text 套装862
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 863
 * @text 套装863
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 864
 * @text 套装864
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 865
 * @text 套装865
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 866
 * @text 套装866
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 867
 * @text 套装867
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 868
 * @text 套装868
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 869
 * @text 套装869
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 870
 * @text 套装870
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 871
 * @text 套装871
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 872
 * @text 套装872
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 873
 * @text 套装873
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 874
 * @text 套装874
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 875
 * @text 套装875
 * @parent Suit List 851-875
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 876-900
 * @text ----套装列表876-900----
 * @default
 *
 * @param Suit 876
 * @text 套装876
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 877
 * @text 套装877
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 878
 * @text 套装878
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 879
 * @text 套装879
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 880
 * @text 套装880
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 881
 * @text 套装881
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 882
 * @text 套装882
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 883
 * @text 套装883
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 884
 * @text 套装884
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 885
 * @text 套装885
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 886
 * @text 套装886
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 887
 * @text 套装887
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 888
 * @text 套装888
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 889
 * @text 套装889
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 890
 * @text 套装890
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 891
 * @text 套装891
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 892
 * @text 套装892
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 893
 * @text 套装893
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 894
 * @text 套装894
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 895
 * @text 套装895
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 896
 * @text 套装896
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 897
 * @text 套装897
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 898
 * @text 套装898
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 899
 * @text 套装899
 * @parent Suit List 876-900
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 900
 * @text 套装900
 * @parent Suit List 876-900
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

GT.Parameters = PluginManager.parameters('GT_X_EquipSuitAdded8');
GT.Param = GT.Param || {};

GT.Param.EquipSuitData8 = GT.Parameters;

//=============================================================================
// DataManager
//=============================================================================

GT.ESAdded8.DataManager_equipSuitDatabaseCreate = DataManager.equipSuitDatabaseCreate;
DataManager.equipSuitDatabaseCreate = function() {
	GT.ESAdded8.DataManager_equipSuitDatabaseCreate.call(this);
    $dataEquipSuits = $dataEquipSuits || [null];
    for (var i = 801; i <= 900; ++i) {
        var equipSuitData = JSON.parse(GT.Param.EquipSuitData8['Suit ' + i] || 'null');
        if (equipSuitData) {
			this.equipSuitDatabaseAdd(i, equipSuitData);
		}
    }
	GT.Param.EquipSuitData8 = {};
};


//=============================================================================
// End of File
//=============================================================================
} else {
	
var text = '警告，你试图在没有安装GT_EquipSuitCore的情况下运行GT_X_EquipSuitAdded8，\n请安装GT_EquipSuitCore。';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.GT_EquipSuitCore
	