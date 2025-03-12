//=============================================================================
// GT50 Plugins - EquipSuitCore Extension - EquipSuitAdded7
// GT_X_EquipSuitAdded7.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_X_EquipSuitAdded7 = true;

var GT = GT || {};
GT.ESAdded7 = GT.ESAdded7 || {};
GT.ESAdded7.version = 1.0;

//=============================================================================
/*:
 * @plugindesc [v1.0]        装备 - 套装系统 - 套装数扩展7
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
 * @param Suit List 701-725
 * @text ----套装列表701-725----
 * @default
 *
 * @param Suit 701
 * @text 套装701
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 702
 * @text 套装702
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 703
 * @text 套装703
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 704
 * @text 套装704
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 705
 * @text 套装705
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 706
 * @text 套装706
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 707
 * @text 套装707
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 708
 * @text 套装708
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 709
 * @text 套装709
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 710
 * @text 套装710
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 711
 * @text 套装711
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 712
 * @text 套装712
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 713
 * @text 套装713
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 714
 * @text 套装714
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 715
 * @text 套装715
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 716
 * @text 套装716
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 717
 * @text 套装717
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 718
 * @text 套装718
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 719
 * @text 套装719
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 720
 * @text 套装720
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 721
 * @text 套装721
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 722
 * @text 套装722
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 723
 * @text 套装723
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 724
 * @text 套装724
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 725
 * @text 套装725
 * @parent Suit List 701-725
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 726-750
 * @text ----套装列表726-750----
 * @default
 *
 * @param Suit 726
 * @text 套装726
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 727
 * @text 套装727
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 728
 * @text 套装728
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 729
 * @text 套装729
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 730
 * @text 套装730
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 731
 * @text 套装731
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 732
 * @text 套装732
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 733
 * @text 套装733
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 734
 * @text 套装734
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 735
 * @text 套装735
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 736
 * @text 套装736
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 737
 * @text 套装737
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 738
 * @text 套装738
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 739
 * @text 套装739
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 740
 * @text 套装740
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 741
 * @text 套装741
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 742
 * @text 套装742
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 743
 * @text 套装743
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 744
 * @text 套装744
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 745
 * @text 套装745
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 746
 * @text 套装746
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 747
 * @text 套装747
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 748
 * @text 套装748
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 749
 * @text 套装749
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 750
 * @text 套装750
 * @parent Suit List 726-750
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit List 751-775
 * @text ----套装列表751-775----
 * @default
 *
 * @param Suit 751
 * @text 套装751
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 752
 * @text 套装752
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 753
 * @text 套装753
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 754
 * @text 套装754
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 755
 * @text 套装755
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 756
 * @text 套装756
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 757
 * @text 套装757
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 758
 * @text 套装758
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 759
 * @text 套装759
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 760
 * @text 套装760
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 761
 * @text 套装761
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 762
 * @text 套装762
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 763
 * @text 套装763
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 764
 * @text 套装764
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 765
 * @text 套装765
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 766
 * @text 套装766
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 767
 * @text 套装767
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 768
 * @text 套装768
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 769
 * @text 套装769
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 770
 * @text 套装770
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 771
 * @text 套装771
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 772
 * @text 套装772
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 773
 * @text 套装773
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 774
 * @text 套装774
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 775
 * @text 套装775
 * @parent Suit List 751-775
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 776-800
 * @text ----套装列表776-800----
 * @default
 *
 * @param Suit 776
 * @text 套装776
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 777
 * @text 套装777
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 778
 * @text 套装778
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 779
 * @text 套装779
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 780
 * @text 套装780
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 781
 * @text 套装781
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 782
 * @text 套装782
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 783
 * @text 套装783
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 784
 * @text 套装784
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 785
 * @text 套装785
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 786
 * @text 套装786
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 787
 * @text 套装787
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 788
 * @text 套装788
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 789
 * @text 套装789
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 790
 * @text 套装790
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 791
 * @text 套装791
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 792
 * @text 套装792
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 793
 * @text 套装793
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 794
 * @text 套装794
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 795
 * @text 套装795
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 796
 * @text 套装796
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 797
 * @text 套装797
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 798
 * @text 套装798
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 799
 * @text 套装799
 * @parent Suit List 776-800
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 800
 * @text 套装800
 * @parent Suit List 776-800
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

GT.Parameters = PluginManager.parameters('GT_X_EquipSuitAdded7');
GT.Param = GT.Param || {};

GT.Param.EquipSuitData7 = GT.Parameters;

//=============================================================================
// DataManager
//=============================================================================

GT.ESAdded7.DataManager_equipSuitDatabaseCreate = DataManager.equipSuitDatabaseCreate;
DataManager.equipSuitDatabaseCreate = function() {
	GT.ESAdded7.DataManager_equipSuitDatabaseCreate.call(this);
    $dataEquipSuits = $dataEquipSuits || [null];
    for (var i = 701; i <= 800; ++i) {
        var equipSuitData = JSON.parse(GT.Param.EquipSuitData7['Suit ' + i] || 'null');
        if (equipSuitData) {
			this.equipSuitDatabaseAdd(i, equipSuitData);
		}
    }
	GT.Param.EquipSuitData7 = {};
};

//=============================================================================
// End of File
//=============================================================================
} else {
	
var text = '警告，你试图在没有安装GT_EquipSuitCore的情况下运行GT_X_EquipSuitAdded7，\n请安装GT_EquipSuitCore。';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.GT_EquipSuitCore
	