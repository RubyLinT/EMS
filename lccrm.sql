/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50715
Source Host           : localhost:3306
Source Database       : lccrm

Target Server Type    : MYSQL
Target Server Version : 50715
File Encoding         : 65001

Date: 2017-02-07 15:24:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_contactinfo
-- ----------------------------
DROP TABLE IF EXISTS `t_contactinfo`;
CREATE TABLE `t_contactinfo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增长列',
  `linkMan` varchar(50) NOT NULL COMMENT '联系人姓名',
  `customId` varchar(12) NOT NULL COMMENT '客户Id（联系人所在单位）',
  `contactPost` varchar(200) DEFAULT NULL COMMENT '联系人职务',
  `contactCall` varchar(100) DEFAULT NULL COMMENT '联系人称呼',
  `contactCellPhone` varchar(20) DEFAULT NULL COMMENT '联系人手机',
  `contactPhone` varchar(20) DEFAULT NULL COMMENT '联系人座机',
  `contactEmail` varchar(50) DEFAULT NULL COMMENT '联系人邮箱',
  `contactQQ` varchar(18) DEFAULT NULL COMMENT '联系人QQ',
  `contactFax` varchar(20) DEFAULT NULL COMMENT '联系人传真',
  `contactRemark` varchar(1000) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_contactinfo
-- ----------------------------
INSERT INTO `t_contactinfo` VALUES ('1', '小明', '1', '经理', 'ming', '13152636665', '110', '631950859@qq.com', '6666666', null, null);
INSERT INTO `t_contactinfo` VALUES ('2', '小张', '3', null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for t_customerinfo
-- ----------------------------
DROP TABLE IF EXISTS `t_customerinfo`;
CREATE TABLE `t_customerinfo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增加列',
  `customId` varchar(12) DEFAULT NULL COMMENT '客户id',
  `addTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '客户入库时间，新建时取当前时间',
  `addPeople` bigint(20) DEFAULT NULL COMMENT '添加客户的账号,取用户表的nickname',
  `workUnit` varchar(100) DEFAULT NULL COMMENT '单位名称',
  `customCity` bigint(20) DEFAULT NULL COMMENT '所在城市，取字典表id为szcs的id',
  `industry` bigint(20) DEFAULT NULL COMMENT '行业，取字典表id为khhy的id',
  `address` varchar(200) DEFAULT NULL COMMENT '公司地址',
  `workPhone` bigint(20) DEFAULT NULL COMMENT '公司座机',
  `customType` bigint(20) DEFAULT NULL COMMENT '客户类别，取字典表id为khlb的id',
  `customState` bigint(20) DEFAULT NULL COMMENT '客户状态，取字典表id为khzt的id',
  `customFrom` bigint(20) DEFAULT NULL COMMENT '客户来源，取字典表id为khly的id',
  `ascription` varchar(128) DEFAULT NULL COMMENT '所属业务员的账号',
  `ascriptionTime` datetime DEFAULT NULL COMMENT '归属时间',
  `summary` varchar(500) DEFAULT NULL COMMENT '客户简介',
  `delFlag` varchar(1) DEFAULT '1' COMMENT '逻辑删除标志位，0为删除,1有效',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_customerinfo
-- ----------------------------
INSERT INTO `t_customerinfo` VALUES ('1', '1', '2016-12-21 16:53:34', '11', '大连拆船厂', '18', '10', '海外学子A座', '64658028', '15', '12', '13', 'yelc@qq.com', '2017-01-12 15:04:33', 'hhh ', '1');
INSERT INTO `t_customerinfo` VALUES ('2', '2', '2016-12-06 15:38:23', '12', '立创科技', '18', '20', '海外学子B座', '23456789', '15', '12', '22', null, null, '很好的合作伙伴', '0');
INSERT INTO `t_customerinfo` VALUES ('3', '3', '2016-12-13 15:38:28', '15', '海外学子创业园物业办公室', '18', '21', '海外学子B座', '6569865', '9', '16', '13', null, null, '很好的合作伙伴', '1');
INSERT INTO `t_customerinfo` VALUES ('4', '4', '2016-12-27 15:38:33', '1', '大连高新区综合办公室', '18', '20', '海外学子D座', '13056585554', '14', '12', '22', 'ceshi', '2016-12-27 15:58:40', '很好的合作伙伴', '1');
INSERT INTO `t_customerinfo` VALUES ('5', '5', '2016-12-21 15:38:43', '13', '三星驻大连办事处', '19', '10', '三星大厦15层', '16598887445', '9', '16', '13', null, null, '很好的合作伙伴', '1');
INSERT INTO `t_customerinfo` VALUES ('6', '6', '2017-01-05 15:38:46', '16', '大连皮革厂', '11', '21', '北京街354号803', '13056585556', '14', '12', '13', 'chendf@163.com', '2016-12-27 15:58:45', '很好的合作伙伴', '1');
INSERT INTO `t_customerinfo` VALUES ('7', '7', '2016-12-15 15:38:50', '17', '江南破鞋厂', '18', '21', '兴工街354号8-8-8', '8956231', '14', '16', '13', 'chendf@163.com', '2016-12-27 15:58:47', '6565', '1');
INSERT INTO `t_customerinfo` VALUES ('8', '8', '2016-12-23 15:38:54', '18', '中南海保镖有限公司', '19', '20', '中南海', '7845856', '9', '16', '22', 'chendf@163.com', '2016-12-06 14:13:30', '使得各国各地广电公司的', '1');
INSERT INTO `t_customerinfo` VALUES ('9', '9', '2016-12-19 15:38:59', '16', '人民大会堂下属保洁公司', '19', '10', '人民大会堂', '4116956854', '9', '12', '13', 'chendf@163.com', '2016-12-27 15:58:54', '防范化解', '1');
INSERT INTO `t_customerinfo` VALUES ('10', '10', '2016-12-21 11:53:36', '16', '大连机床厂', '18', '10', '大连经济开发区10-12-13', null, '9', '12', '13', null, '2016-12-30 13:28:43', '664411', '1');
INSERT INTO `t_customerinfo` VALUES ('11', '11', '2016-12-29 11:53:30', '16', '大商集团（北京总部）', '19', '10', '北京东城区金融街88号大商未来大厦', null, '15', '12', '13', 'admin', '2017-01-09 10:39:43', '231', '1');
INSERT INTO `t_customerinfo` VALUES ('19', '19', '2016-12-30 11:41:37', '16', '213211', '17', '20', '大连经济开发区10-12-13', null, '14', '16', '22', null, null, '321', '1');
INSERT INTO `t_customerinfo` VALUES ('21', '21', '2016-12-30 16:09:55', '16', '555555', '18', '10', '555555', '55555', '14', '12', '22', 'chendf@163.com', '2016-12-30 16:09:55', '66', '1');
INSERT INTO `t_customerinfo` VALUES ('22', '22', '2016-12-30 16:10:54', '1', '北京王氏鸡大腿理财公司', '19', '20', '大连经济开发区10-12-13', null, '15', '12', '13', 'chendf@163.com', '2016-12-30 16:10:54', '13', '1');
INSERT INTO `t_customerinfo` VALUES ('23', '23', '2017-01-03 10:07:04', '1', 'KPL', '11', '10', '大连经济开发区10-12-13', null, '9', '12', '13', 'ceshi', '2017-01-03 10:07:04', '1', '1');
INSERT INTO `t_customerinfo` VALUES ('24', '24', '2017-01-03 11:19:21', '1', 'abc', '11', '10', '大连经济开发区10-12-13', null, '9', '12', '13', null, '2017-01-03 11:19:21', '321', '1');
INSERT INTO `t_customerinfo` VALUES ('25', '25', '2017-01-03 11:22:00', '1', 'bbb', '11', '20', '大连经济开发区10-12-13', null, '14', '12', '22', null, '2017-01-03 11:22:00', '55', '1');
INSERT INTO `t_customerinfo` VALUES ('26', '26', '2017-01-03 11:25:31', '1', '成都磷酸钙i哦零食批发1', '17', '21', '56565665', null, '14', '12', '13', 'ceshi', '2017-01-06 11:39:36', '21', '1');
INSERT INTO `t_customerinfo` VALUES ('27', '27', '2017-01-03 11:28:34', '16', 'aaa', '11', '10', '大连经济开发区10-12-13', null, '15', '16', '13', 'ceshi', '2017-01-06 12:46:18', '1', '1');
INSERT INTO `t_customerinfo` VALUES ('31', '31', '2017-01-03 11:53:47', '16', 'sss', '11', '10', '1', '1', '9', '12', '1', 'chendf@163.com', '2017-01-03 11:53:47', '2', '1');
INSERT INTO `t_customerinfo` VALUES ('32', '32', '2017-01-03 13:57:07', '16', 'ccc', '11', '10', '大连经济开发区10-12-13', null, '9', '12', '1', 'chendf@163.com', '2017-01-03 13:57:07', '123', '1');
INSERT INTO `t_customerinfo` VALUES ('33', '33', '2017-01-03 14:03:27', '16', 'fff', '11', '10', '大连经济开发区10-12-13', null, '9', '12', '13', 'chendf@163.com', '2017-01-04 13:17:21', '132', '1');
INSERT INTO `t_customerinfo` VALUES ('34', '34', '2017-01-03 14:08:09', '1', 'ddd', '11', '10', '大连经济开发区10-12-13', null, '9', '12', '1', null, null, '32', '1');
INSERT INTO `t_customerinfo` VALUES ('35', '35', '2017-01-05 10:08:14', '16', 'MJ', '18', '10', '8888', null, '15', '12', '13', 'yelc@qq.com', '2017-01-17 15:33:14', '1', '0');
INSERT INTO `t_customerinfo` VALUES ('36', '36', '2017-01-06 11:38:06', '16', '大连萨瑟兰科技', '11', '21', '对对对快点快点看', '13052426662', '14', '16', '13', 'ceshi', '2017-01-06 11:38:06', '13', '1');
INSERT INTO `t_customerinfo` VALUES ('37', '37', '2017-01-06 11:50:28', '16', '地对地导弹', '11', '10', '嘎嘎嘎地方', '13056242556', '9', '12', '13', 'ceshi', '2017-01-06 11:50:28', '三司使', '1');
INSERT INTO `t_customerinfo` VALUES ('38', '38', '2017-01-06 13:04:58', '16', '阿阿萨斯', '11', '10', '打断点', '13056584442', '9', '12', '13', null, null, '222222', '1');
INSERT INTO `t_customerinfo` VALUES ('39', '39', '2017-01-06 13:14:55', '1', '阿道夫洗发水', '11', '10', '爱爱', '13052464660', '9', '12', '13', 'yelc@qq.com', '2017-02-07 10:12:00', 'dd', '1');
INSERT INTO `t_customerinfo` VALUES ('40', '40', '2017-01-06 13:18:26', '1', '广告公司', '11', '10', '777', '13052521212', '14', '12', '13', null, null, 'ddfffff', '1');
INSERT INTO `t_customerinfo` VALUES ('41', '41', '2017-01-06 13:30:16', '1', '大河', '11', '10', '沈阳', '2465658028', '9', '16', '22', 'admin', '2017-01-09 10:39:48', 'ffsss', '1');
INSERT INTO `t_customerinfo` VALUES ('42', '42', '2017-01-06 13:32:51', '1', '123', '17', '20', '999', null, '9', '12', '13', 'admin', '2017-01-09 10:38:09', 'dewer', '1');
INSERT INTO `t_customerinfo` VALUES ('43', '43', '2017-01-06 14:57:14', '1', '呜呜呜呜', '17', '10', '1010', null, '14', '12', '13', null, null, 'gfe', '1');
INSERT INTO `t_customerinfo` VALUES ('44', '44', '2017-01-09 09:19:14', '1', 'MT', '18', '20', '1111', null, '15', '12', '13', 'yelc@qq.com', '2017-01-13 11:53:33', 'bb', '1');
INSERT INTO `t_customerinfo` VALUES ('45', '45', '2017-01-09 09:41:42', '1', '有', '17', '10', '222', null, '9', '12', '22', null, null, 'bcvsseeee', '0');
INSERT INTO `t_customerinfo` VALUES ('46', '46', '2017-01-09 11:37:17', '1', 'a1212', '11', '10', '', null, '9', '12', '13', null, null, 'oo', '1');
INSERT INTO `t_customerinfo` VALUES ('47', '47', '2017-01-09 11:38:43', '1', 'a1313', '11', '10', '', null, '9', '12', '13', null, null, 'pp', '1');
INSERT INTO `t_customerinfo` VALUES ('48', '48', '2017-01-09 14:43:12', '16', '456789', '11', '10', '2222', null, '9', '12', '13', 'yelc@qq.com', '2017-01-13 11:53:13', 'll', '1');
INSERT INTO `t_customerinfo` VALUES ('49', '49', '2017-01-09 15:52:38', '1', 'hhh', '17', '20', '', null, '9', '16', '22', null, null, '', '1');
INSERT INTO `t_customerinfo` VALUES ('50', '50', '2017-01-09 15:57:33', '1', '擎天柱科技', '11', '20', '', null, '14', '16', '13', null, null, '', '1');
INSERT INTO `t_customerinfo` VALUES ('51', '51', '2017-01-21 10:41:42', '1', '福音', '17', '10', '不知道', '15524750502', '9', '12', '13', null, null, '', '1');
INSERT INTO `t_customerinfo` VALUES ('52', '52', '2017-01-21 13:57:37', '1', '二', '11', '10', '', null, '9', '16', '13', null, null, '', '1');

-- ----------------------------
-- Table structure for t_department
-- ----------------------------
DROP TABLE IF EXISTS `t_department`;
CREATE TABLE `t_department` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增长列部门id',
  `departName` varchar(20) NOT NULL COMMENT '部门名称',
  `higherDepartId` varchar(8) NOT NULL COMMENT '上级部门id',
  `remark` varchar(1000) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COMMENT='部门表';

-- ----------------------------
-- Records of t_department
-- ----------------------------
INSERT INTO `t_department` VALUES ('1', '北京丹斯克科技', '0', null);
INSERT INTO `t_department` VALUES ('2', '财务部', '1', null);
INSERT INTO `t_department` VALUES ('3', '综合部', '1', null);
INSERT INTO `t_department` VALUES ('4', '人力资部', '1', '21');
INSERT INTO `t_department` VALUES ('5', '市场部', '1', null);
INSERT INTO `t_department` VALUES ('6', '督察部', '1', '00');
INSERT INTO `t_department` VALUES ('7', '技术部', '1', null);
INSERT INTO `t_department` VALUES ('8', '门卫', '3', null);
INSERT INTO `t_department` VALUES ('9', '食堂', '3', null);
INSERT INTO `t_department` VALUES ('10', '业务部', '5', null);
INSERT INTO `t_department` VALUES ('11', '营销部', '5', null);
INSERT INTO `t_department` VALUES ('12', '大客户部', '5', null);
INSERT INTO `t_department` VALUES ('13', '调度室', '7', null);
INSERT INTO `t_department` VALUES ('14', '工程部', '7', null);
INSERT INTO `t_department` VALUES ('15', '研发中心', '7', null);
INSERT INTO `t_department` VALUES ('19', '研发中心001', '15', '研发中心001');
INSERT INTO `t_department` VALUES ('20', '研发中心0011', '19', '研发中心0011');
INSERT INTO `t_department` VALUES ('21', '研发中心002', '20', '002');
INSERT INTO `t_department` VALUES ('22', '研发中心003', '21', '3');
INSERT INTO `t_department` VALUES ('24', '000', '19', '');
INSERT INTO `t_department` VALUES ('25', '88', '20', '123');
INSERT INTO `t_department` VALUES ('26', '010102', '20', '32');
INSERT INTO `t_department` VALUES ('28', '01011', '20', '');
INSERT INTO `t_department` VALUES ('29', 'dgd', '24', '555');
INSERT INTO `t_department` VALUES ('30', 'we', '29', 'we');
INSERT INTO `t_department` VALUES ('31', 'eee', '30', 'eee');

-- ----------------------------
-- Table structure for t_dictionary
-- ----------------------------
DROP TABLE IF EXISTS `t_dictionary`;
CREATE TABLE `t_dictionary` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增长列',
  `dicId` varchar(12) NOT NULL COMMENT '字典Id',
  `higherId` bigint(12) DEFAULT NULL COMMENT '上级id',
  `dicName` varchar(50) DEFAULT NULL COMMENT '字典名称',
  `dicTitle` varchar(100) DEFAULT NULL COMMENT '字典内容',
  `orderNum` int(4) DEFAULT NULL COMMENT '内容序号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_dictionary
-- ----------------------------
INSERT INTO `t_dictionary` VALUES ('1', 'khlx', null, '客户类型', '潜在客户', '2');
INSERT INTO `t_dictionary` VALUES ('3', 'khlx', null, '客户类型', '意向客户', '3');
INSERT INTO `t_dictionary` VALUES ('6', 'khlx', null, '客户类型', '已流失客户', '0');
INSERT INTO `t_dictionary` VALUES ('9', 'khlb', null, '客户类别', '国企', '9');
INSERT INTO `t_dictionary` VALUES ('10', 'khhy', null, '客户行业', '制造业', '10');
INSERT INTO `t_dictionary` VALUES ('11', 'szcs', null, '所在城市', '大连', '11');
INSERT INTO `t_dictionary` VALUES ('12', 'khzt', null, '客户状态', '合作中', '12');
INSERT INTO `t_dictionary` VALUES ('13', 'khly', null, '客户来源', '自己寻找', '13');
INSERT INTO `t_dictionary` VALUES ('14', 'khlb', null, '客户类别', '公私合营', '14');
INSERT INTO `t_dictionary` VALUES ('15', 'khlb', null, '客户类别', '私企', '15');
INSERT INTO `t_dictionary` VALUES ('16', 'khzt', null, '客户状态', '未合作', '16');
INSERT INTO `t_dictionary` VALUES ('17', 'szcs', null, '所在城市', '成都', '16');
INSERT INTO `t_dictionary` VALUES ('18', 'szcs', null, '所在城市', '上海', '18');
INSERT INTO `t_dictionary` VALUES ('19', 'szcs', null, '所在城市', '北京', '0');
INSERT INTO `t_dictionary` VALUES ('20', 'khhy', null, '客户行业', '金融业', '20');
INSERT INTO `t_dictionary` VALUES ('21', 'khhy', null, '客户行业', '零售业', '21');
INSERT INTO `t_dictionary` VALUES ('22', 'khly', null, '客户来源', '朋友介绍', '22');
INSERT INTO `t_dictionary` VALUES ('26', 'wshr', null, '我是好人', '222', '44');
INSERT INTO `t_dictionary` VALUES ('28', 'www', null, '我问问', '222', '1');
INSERT INTO `t_dictionary` VALUES ('30', 'pohyg', null, '我是好人', '我问问', '111');
INSERT INTO `t_dictionary` VALUES ('32', 'ygzw', null, '员工职务', '部门经理', '2');
INSERT INTO `t_dictionary` VALUES ('33', 'ygzw', null, '员工职务', '总经理', '3');
INSERT INTO `t_dictionary` VALUES ('34', 'ygzw', null, '员工职务', '一级研究员', '6');
INSERT INTO `t_dictionary` VALUES ('35', 'ygzw', null, '员工职务', '二级研究员', '5');
INSERT INTO `t_dictionary` VALUES ('36', 'ygzw', null, '员工职务', '副总经理', '4');
INSERT INTO `t_dictionary` VALUES ('37', 'ygzw', null, '员工职务', '秘书', '2');
INSERT INTO `t_dictionary` VALUES ('38', 'bzd', null, '不知道', '333', null);
INSERT INTO `t_dictionary` VALUES ('39', 'ttt', null, '通天塔', '通天塔', null);

-- ----------------------------
-- Table structure for t_employeeinfo
-- ----------------------------
DROP TABLE IF EXISTS `t_employeeinfo`;
CREATE TABLE `t_employeeinfo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL COMMENT '用户id=用户表的主键id',
  `employeeName` varchar(100) NOT NULL COMMENT '姓名',
  `employeePost` bigint(12) DEFAULT NULL COMMENT '职务ID，字典表中名为ygzw的字典id',
  `department` bigint(12) DEFAULT NULL COMMENT '部门ID，部门表中的部门id',
  `roleId` bigint(20) DEFAULT NULL COMMENT '角色ID',
  `employeeCellPhone` varchar(20) DEFAULT NULL COMMENT '手机',
  `employeeEmail` varchar(50) DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COMMENT='员工信息表';

-- ----------------------------
-- Records of t_employeeinfo
-- ----------------------------
INSERT INTO `t_employeeinfo` VALUES ('3', '11', '斯蒂芬', '32', '9', '1', '', '');
INSERT INTO `t_employeeinfo` VALUES ('5', '18', '腥红之月', '32', '10', null, '13056563321', '4562183@124.com');
INSERT INTO `t_employeeinfo` VALUES ('6', '18', '王二', '32', '2', null, '13056468992', '');
INSERT INTO `t_employeeinfo` VALUES ('7', '18', '张三', '33', '8', null, '13564854552', '');
INSERT INTO `t_employeeinfo` VALUES ('8', '16', '李四', '32', '4', null, '13056468998', '');
INSERT INTO `t_employeeinfo` VALUES ('9', '18', '王五', '32', '11', null, '13056468999', '');
INSERT INTO `t_employeeinfo` VALUES ('10', '1', '刘老六', '32', '12', null, '13056468977', 'lll@ll.ll');
INSERT INTO `t_employeeinfo` VALUES ('11', '18', '小强', '33', '6', null, '13056468992', '');
INSERT INTO `t_employeeinfo` VALUES ('12', '18', '张飞', '36', '13', null, '13056468992', '');
INSERT INTO `t_employeeinfo` VALUES ('13', '17', '刘备', '33', '14', null, '13056563321', '');
INSERT INTO `t_employeeinfo` VALUES ('14', '16', '关羽', '32', '22', null, '13564854552', '631950877@1.com');
INSERT INTO `t_employeeinfo` VALUES ('15', '1', '曹操', '33', '25', null, '', '');
INSERT INTO `t_employeeinfo` VALUES ('16', '17', '周瑜', '36', '26', null, '13056468992', '');
INSERT INTO `t_employeeinfo` VALUES ('17', '16', '大娃', '37', '24', null, '13056563321', '');
INSERT INTO `t_employeeinfo` VALUES ('18', '1', '二娃', '34', '28', null, '', '');
INSERT INTO `t_employeeinfo` VALUES ('19', '17', '三娃', '35', '9', null, '13564854552', '');
INSERT INTO `t_employeeinfo` VALUES ('20', '16', '四娃', '33', '2', null, '13056563321', '');
INSERT INTO `t_employeeinfo` VALUES ('21', '1', '五娃', '33', '22', null, '', '');
INSERT INTO `t_employeeinfo` VALUES ('22', '17', '六娃', '35', '4', null, '13564854552', '');
INSERT INTO `t_employeeinfo` VALUES ('23', '16', '七娃', '35', '14', null, '13056563321', '');
INSERT INTO `t_employeeinfo` VALUES ('24', '1', '精钢葫芦娃', '33', '6', null, '13564854552', '');
INSERT INTO `t_employeeinfo` VALUES ('25', '17', '蛇精', '37', '9', null, '13056563321', '');
INSERT INTO `t_employeeinfo` VALUES ('26', '1', '蝎子精', '36', '13', null, '', '');
INSERT INTO `t_employeeinfo` VALUES ('27', '16', '蛤蟆精1', '37', '13', null, '13056563321', '');
INSERT INTO `t_employeeinfo` VALUES ('28', '18', '蛤蟆精2', '37', '9', null, '', '');
INSERT INTO `t_employeeinfo` VALUES ('29', '18', '叶良辰', '32', '2', null, null, '2222@ww.com');

-- ----------------------------
-- Table structure for t_notice
-- ----------------------------
DROP TABLE IF EXISTS `t_notice`;
CREATE TABLE `t_notice` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL COMMENT '标题',
  `content` varchar(500) DEFAULT NULL COMMENT '内容',
  `publisher` varchar(20) DEFAULT NULL COMMENT '发布者',
  `publishTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '发布时间 ',
  `isPush` bigint(1) DEFAULT '1' COMMENT '是否推送（0：是，1：否）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='公告表';

-- ----------------------------
-- Records of t_notice
-- ----------------------------
INSERT INTO `t_notice` VALUES ('1', 'a', 'a', 'admin', '2017-02-06 14:25:02', '0');
INSERT INTO `t_notice` VALUES ('2', 'ccc', 'ccc', 'ceshi', '2017-01-20 15:21:18', '1');
INSERT INTO `t_notice` VALUES ('3', '艾丝凡', '哥啊郭德纲', 'ceshi', '2017-01-21 10:39:42', '0');
INSERT INTO `t_notice` VALUES ('4', 'b', 'b', 'ceshi', '2017-01-21 10:39:45', '0');
INSERT INTO `t_notice` VALUES ('5', '98989', '989898', 'yelc@qq.com', '2017-01-21 16:46:24', '1');
INSERT INTO `t_notice` VALUES ('6', '98988', '989898', 'yelc@qq.com', '2017-02-06 10:04:48', '1');
INSERT INTO `t_notice` VALUES ('7', '00222', '000222', 'yelc@qq.com', '2017-02-06 09:46:31', '0');
INSERT INTO `t_notice` VALUES ('9', '发放房贷的的', '斯蒂芬斯蒂芬斯蒂芬', 'yelc@qq.com', '2017-02-06 14:30:41', '1');
INSERT INTO `t_notice` VALUES ('10', '爱爱爱', 'aaaaaaaaaa', 'yelc@qq.com', '2017-02-06 17:19:34', '0');
INSERT INTO `t_notice` VALUES ('11', 'uuu', 'uuu', 'yelc@qq.com', '2017-02-06 17:23:16', '0');
INSERT INTO `t_notice` VALUES ('12', 'QQ', 'QQ', 'yelc@qq.com', '2017-02-06 17:24:39', '0');
INSERT INTO `t_notice` VALUES ('13', 'Z', 'Z', 'yelc@qq.com', '2017-02-06 17:35:02', '0');
INSERT INTO `t_notice` VALUES ('14', 'X', 'X', 'yelc@qq.com', '2017-02-06 17:37:28', '0');
INSERT INTO `t_notice` VALUES ('15', 'Q', 'Q', 'yelc@qq.com', '2017-02-06 17:52:34', '0');
INSERT INTO `t_notice` VALUES ('16', '方芳芳', '反反复复方法', 'yelc@qq.com', '2017-02-07 12:00:52', '0');

-- ----------------------------
-- Table structure for t_reminder
-- ----------------------------
DROP TABLE IF EXISTS `t_reminder`;
CREATE TABLE `t_reminder` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `remindType` varchar(3) NOT NULL COMMENT '提醒分类：001.跟进，',
  `remindDate` varchar(8) NOT NULL COMMENT '提醒时间',
  `remindObj` varchar(1000) DEFAULT NULL COMMENT '提醒对象账号（多个用逗号分割），如果为空，则是所有人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='信息提醒表';

-- ----------------------------
-- Records of t_reminder
-- ----------------------------

-- ----------------------------
-- Table structure for t_tracking
-- ----------------------------
DROP TABLE IF EXISTS `t_tracking`;
CREATE TABLE `t_tracking` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customId` varchar(12) NOT NULL COMMENT '客户ID',
  `ascription` varchar(128) NOT NULL COMMENT '跟踪人，即记录此条记录的业务员账号',
  `recordTime` datetime DEFAULT NULL COMMENT '记录时间',
  `contactId` bigint(20) DEFAULT NULL COMMENT '联系人ID=联系人信息表的主键id',
  `trackContent` varchar(1000) DEFAULT NULL COMMENT '跟进内容，富文本，可文字和图片',
  `trackFile` varchar(1000) DEFAULT NULL COMMENT '附件地址，要求相对路径，不可用c:d：之类的绝对路径',
  `nextTrackDate` varchar(8) DEFAULT '' COMMENT 'yyyymmdd，预计下次跟进时间',
  `nextComtent` varchar(1000) DEFAULT NULL COMMENT '预计跟进内容，纯文本',
  `reminderDate` bigint(1) DEFAULT NULL COMMENT '提前几天提醒，可不选，选择了就录入提醒表',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='客户跟进表';

-- ----------------------------
-- Records of t_tracking
-- ----------------------------
INSERT INTO `t_tracking` VALUES ('1', '1', 'yelc@qq.com', '2017-01-02 10:36:25', '2', '1', null, '20170207', null, null);
INSERT INTO `t_tracking` VALUES ('2', '10', 'ceshi', '2017-01-20 11:18:01', '1', '10', '10', '20170201', '10', '10');
INSERT INTO `t_tracking` VALUES ('3', '1', 'chendf@163.com', '2017-01-03 11:18:04', '2', '4', '5', '20170202', '7', '1');
INSERT INTO `t_tracking` VALUES ('4', '1', 'chendf@163.com', '2017-01-24 15:35:00', '2', '4', '5', '20170203', '7', '1');
INSERT INTO `t_tracking` VALUES ('5', '2', 'yelc@qq.com', '2017-01-20 00:00:00', '1', '哈哈哈<img src=\"/lccrm/attached/image/20170120/20170120103211_710.png\" alt=\"\" />', '', '20170205', '哈哈', '0');
INSERT INTO `t_tracking` VALUES ('6', '1', 'yelc@qq.com', '2017-01-11 00:00:00', '1', '小明的记录<img src=\"/lccrm/attached/image/20170120/20170120112221_72.jpg\" alt=\"\" />', '', '20170207', '小明抢了小李的鸡蛋', '1');
INSERT INTO `t_tracking` VALUES ('7', '5', 'admin', '2017-02-06 00:00:00', '1', '<img src=\"http://localhost:8080/lccrm/js/common/kindeditor/js/kindeditor/plugins/emoticons/images/20.gif\" border=\"0\" alt=\"\" />', '', '20170208', '继续跟进', '0');
INSERT INTO `t_tracking` VALUES ('8', '1', '8446666@qq.com', '2017-02-07 11:13:59', '1', '<img src=\"/lccrm/attached/image/20170206/20170206113553_506.jpg\" alt=\"\" />', '', '', '', '0');
INSERT INTO `t_tracking` VALUES ('9', '22', 'admin', '2017-02-06 00:00:00', '1', '<img src=\"http://localhost:8080/lccrm/js/common/kindeditor/js/kindeditor/plugins/emoticons/images/4.gif\" border=\"0\" alt=\"\" />', '', '20170207', '', '0');
INSERT INTO `t_tracking` VALUES ('10', '19', 'yelc@qq.com', '2017-02-01 00:00:00', '1', 'ylc<img src=\"/lccrm/attached/image/20170207/20170207110648_519.jpg\" alt=\"\" />', '', '', '', '0');

-- ----------------------------
-- Table structure for t_usernotice
-- ----------------------------
DROP TABLE IF EXISTS `t_usernotice`;
CREATE TABLE `t_usernotice` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) DEFAULT NULL COMMENT '用户表Id',
  `noticeId` bigint(20) DEFAULT NULL COMMENT '公告表Id',
  `isRead` bigint(1) DEFAULT '1' COMMENT '是否阅读（0：已阅读；1：未阅读）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COMMENT='公告与用户关联表';

-- ----------------------------
-- Records of t_usernotice
-- ----------------------------
INSERT INTO `t_usernotice` VALUES ('1', '16', '1', '0');
INSERT INTO `t_usernotice` VALUES ('2', '17', '2', '1');
INSERT INTO `t_usernotice` VALUES ('3', '18', '2', '1');
INSERT INTO `t_usernotice` VALUES ('4', '16', '3', '1');
INSERT INTO `t_usernotice` VALUES ('5', '16', '4', '1');
INSERT INTO `t_usernotice` VALUES ('6', '17', '1', '1');
INSERT INTO `t_usernotice` VALUES ('7', '18', '3', '0');
INSERT INTO `t_usernotice` VALUES ('8', '18', '4', '0');
INSERT INTO `t_usernotice` VALUES ('9', '16', '2', '1');
INSERT INTO `t_usernotice` VALUES ('10', '1', '5', '1');
INSERT INTO `t_usernotice` VALUES ('11', '1', '6', '1');
INSERT INTO `t_usernotice` VALUES ('12', '1', '7', '1');
INSERT INTO `t_usernotice` VALUES ('13', '2', '7', '1');
INSERT INTO `t_usernotice` VALUES ('14', '3', '7', '1');
INSERT INTO `t_usernotice` VALUES ('15', '17', '7', '1');
INSERT INTO `t_usernotice` VALUES ('16', '18', '7', '1');
INSERT INTO `t_usernotice` VALUES ('17', '29', '11', '1');
INSERT INTO `t_usernotice` VALUES ('18', '29', '12', '1');
INSERT INTO `t_usernotice` VALUES ('19', '18', '13', '1');
INSERT INTO `t_usernotice` VALUES ('20', '18', '14', '1');
INSERT INTO `t_usernotice` VALUES ('21', '18', '15', '1');
INSERT INTO `t_usernotice` VALUES ('22', '18', '16', '1');

-- ----------------------------
-- Table structure for u_permission
-- ----------------------------
DROP TABLE IF EXISTS `u_permission`;
CREATE TABLE `u_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(256) DEFAULT NULL COMMENT 'url地址',
  `name` varchar(64) DEFAULT NULL COMMENT 'url描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of u_permission
-- ----------------------------
INSERT INTO `u_permission` VALUES ('4', '/permission/index.shtml', '权限列表');
INSERT INTO `u_permission` VALUES ('6', '/permission/addPermission.shtml', '权限添加');
INSERT INTO `u_permission` VALUES ('7', '/permission/deletePermissionById.shtml', '权限删除');
INSERT INTO `u_permission` VALUES ('8', '/member/list.shtml', '用户列表');
INSERT INTO `u_permission` VALUES ('9', '/member/online.shtml', '在线用户');
INSERT INTO `u_permission` VALUES ('10', '/member/changeSessionStatus.shtml', '用户Session踢出');
INSERT INTO `u_permission` VALUES ('11', '/member/forbidUserById.shtml', '用户激活&禁止');
INSERT INTO `u_permission` VALUES ('12', '/member/deleteUserById.shtml', '用户删除');
INSERT INTO `u_permission` VALUES ('13', '/permission/addPermission2Role.shtml', '权限分配');
INSERT INTO `u_permission` VALUES ('14', '/role/clearRoleByUserIds.shtml', '用户角色分配清空');
INSERT INTO `u_permission` VALUES ('15', '/role/addRole2User.shtml', '角色分配保存');
INSERT INTO `u_permission` VALUES ('16', '/role/deleteRoleById.shtml', '角色列表删除');
INSERT INTO `u_permission` VALUES ('17', '/role/addRole.shtml', '角色列表添加');
INSERT INTO `u_permission` VALUES ('18', '/role/index.shtml', '角色列表');
INSERT INTO `u_permission` VALUES ('19', '/permission/allocation.shtml', '权限分配');
INSERT INTO `u_permission` VALUES ('20', '/role/allocation.shtml', '角色分配');
INSERT INTO `u_permission` VALUES ('21', '/system/list.shtml', '字典列表');
INSERT INTO `u_permission` VALUES ('22', '/customer/list.shtml', '客户列表');
INSERT INTO `u_permission` VALUES ('23', '/system/dictionary.shtml', 'dictionary.html');

-- ----------------------------
-- Table structure for u_role
-- ----------------------------
DROP TABLE IF EXISTS `u_role`;
CREATE TABLE `u_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL COMMENT '角色名称',
  `type` varchar(10) DEFAULT NULL COMMENT '角色类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of u_role
-- ----------------------------
INSERT INTO `u_role` VALUES ('1', '系统管理员', '888888');
INSERT INTO `u_role` VALUES ('3', '权限角色', '100003');
INSERT INTO `u_role` VALUES ('4', '用户中心', '100002');

-- ----------------------------
-- Table structure for u_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `u_role_permission`;
CREATE TABLE `u_role_permission` (
  `rid` bigint(20) DEFAULT NULL COMMENT '角色ID',
  `pid` bigint(20) DEFAULT NULL COMMENT '权限ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of u_role_permission
-- ----------------------------
INSERT INTO `u_role_permission` VALUES ('4', '8');
INSERT INTO `u_role_permission` VALUES ('4', '9');
INSERT INTO `u_role_permission` VALUES ('4', '10');
INSERT INTO `u_role_permission` VALUES ('4', '11');
INSERT INTO `u_role_permission` VALUES ('4', '12');
INSERT INTO `u_role_permission` VALUES ('3', '4');
INSERT INTO `u_role_permission` VALUES ('3', '6');
INSERT INTO `u_role_permission` VALUES ('3', '7');
INSERT INTO `u_role_permission` VALUES ('3', '13');
INSERT INTO `u_role_permission` VALUES ('3', '14');
INSERT INTO `u_role_permission` VALUES ('3', '15');
INSERT INTO `u_role_permission` VALUES ('3', '16');
INSERT INTO `u_role_permission` VALUES ('3', '17');
INSERT INTO `u_role_permission` VALUES ('3', '18');
INSERT INTO `u_role_permission` VALUES ('3', '19');
INSERT INTO `u_role_permission` VALUES ('3', '20');
INSERT INTO `u_role_permission` VALUES ('1', '4');
INSERT INTO `u_role_permission` VALUES ('1', '6');
INSERT INTO `u_role_permission` VALUES ('1', '7');
INSERT INTO `u_role_permission` VALUES ('1', '8');
INSERT INTO `u_role_permission` VALUES ('1', '9');
INSERT INTO `u_role_permission` VALUES ('1', '10');
INSERT INTO `u_role_permission` VALUES ('1', '11');
INSERT INTO `u_role_permission` VALUES ('1', '12');
INSERT INTO `u_role_permission` VALUES ('1', '13');
INSERT INTO `u_role_permission` VALUES ('1', '14');
INSERT INTO `u_role_permission` VALUES ('1', '15');
INSERT INTO `u_role_permission` VALUES ('1', '16');
INSERT INTO `u_role_permission` VALUES ('1', '17');
INSERT INTO `u_role_permission` VALUES ('1', '18');
INSERT INTO `u_role_permission` VALUES ('1', '19');
INSERT INTO `u_role_permission` VALUES ('1', '20');
INSERT INTO `u_role_permission` VALUES ('1', '21');
INSERT INTO `u_role_permission` VALUES ('1', '22');
INSERT INTO `u_role_permission` VALUES ('1', '23');

-- ----------------------------
-- Table structure for u_user
-- ----------------------------
DROP TABLE IF EXISTS `u_user`;
CREATE TABLE `u_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(20) DEFAULT NULL COMMENT '用户昵称',
  `email` varchar(128) DEFAULT NULL COMMENT '邮箱|登录帐号',
  `pswd` varchar(32) DEFAULT NULL COMMENT '密码',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `status` bigint(1) DEFAULT '1' COMMENT '1:有效，0:禁止登录',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of u_user
-- ----------------------------
INSERT INTO `u_user` VALUES ('1', '管理员', 'admin', '57eb72e6b78a87a12d46a7f5e9315138', '2016-06-16 11:15:33', '2017-02-07 15:14:19', '1');
INSERT INTO `u_user` VALUES ('11', 'soso', '8446666@qq.com', '57eb72e6b78a87a12d46a7f5e9315138', '2016-05-26 20:50:54', '2016-06-16 11:24:35', '1');
INSERT INTO `u_user` VALUES ('12', '8446666', '8446666', '4afdc875a67a55528c224ce088be2ab8', '2016-05-27 22:34:19', '2016-06-15 17:03:16', '1');
INSERT INTO `u_user` VALUES ('16', 'ceshi', 'ceshi', '98c216e7207a08dd1b0532cf7c580588', '2017-01-04 10:49:44', '2017-01-09 10:33:05', '1');
INSERT INTO `u_user` VALUES ('17', 'chendf', 'chendf@163.com', 'd34d039c51a86bdfa1c9bcf3bd711e03', '2017-01-06 11:08:49', '2017-01-12 15:01:59', '1');
INSERT INTO `u_user` VALUES ('18', '叶良辰', 'yelc@qq.com', 'faef19ae91de74e150518519ca18ff80', '2017-01-12 15:03:37', '2017-02-07 14:33:51', '1');

-- ----------------------------
-- Table structure for u_user_role
-- ----------------------------
DROP TABLE IF EXISTS `u_user_role`;
CREATE TABLE `u_user_role` (
  `uid` bigint(20) DEFAULT NULL COMMENT '用户ID',
  `rid` bigint(20) DEFAULT NULL COMMENT '角色ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of u_user_role
-- ----------------------------
INSERT INTO `u_user_role` VALUES ('12', '4');
INSERT INTO `u_user_role` VALUES ('11', '3');
INSERT INTO `u_user_role` VALUES ('11', '4');
INSERT INTO `u_user_role` VALUES ('1', '1');
INSERT INTO `u_user_role` VALUES ('15', '1');
INSERT INTO `u_user_role` VALUES ('15', '3');
INSERT INTO `u_user_role` VALUES ('15', '4');

-- ----------------------------
-- Procedure structure for init_shiro_demo
-- ----------------------------
DROP PROCEDURE IF EXISTS `init_shiro_demo`;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `init_shiro_demo`()
BEGIN	
/*
SQLyog 企业版 - MySQL GUI v7.14 
MySQL - 5.6.16-log : Database - 
*********************************************************************
*/
/*表结构插入*/
DROP TABLE IF EXISTS `u_permission`;
CREATE TABLE `u_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(256) DEFAULT NULL COMMENT 'url地址',
  `name` varchar(64) DEFAULT NULL COMMENT 'url描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*Table structure for table `u_role` */
DROP TABLE IF EXISTS `u_role`;
CREATE TABLE `u_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL COMMENT '角色名称',
  `type` varchar(10) DEFAULT NULL COMMENT '角色类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*Table structure for table `u_role_permission` */
DROP TABLE IF EXISTS `u_role_permission`;
CREATE TABLE `u_role_permission` (
  `rid` bigint(20) DEFAULT NULL COMMENT '角色ID',
  `pid` bigint(20) DEFAULT NULL COMMENT '权限ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*Table structure for table `u_user` */
DROP TABLE IF EXISTS `u_user`;
CREATE TABLE `u_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(20) DEFAULT NULL COMMENT '用户昵称',
  `email` varchar(128) DEFAULT NULL COMMENT '邮箱|登录帐号',
  `pswd` varchar(32) DEFAULT NULL COMMENT '密码',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `status` bigint(1) DEFAULT '1' COMMENT '1:有效，0:禁止登录',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*Table structure for table `u_user_role` */
DROP TABLE IF EXISTS `u_user_role`;
CREATE TABLE `u_user_role` (
  `uid` bigint(20) DEFAULT NULL COMMENT '用户ID',
  `rid` bigint(20) DEFAULT NULL COMMENT '角色ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*
SQLyog 企业版 - MySQL GUI v7.14 
MySQL - 5.6.16-log : Database - i_wenyiba_com
*********************************************************************
*/
/*所有的表数据插入*/
/*Data for the table `u_permission` */
insert  into `u_permission`(`id`,`url`,`name`) values (4,'/permission/index.shtml','权限列表'),(6,'/permission/addPermission.shtml','权限添加'),(7,'/permission/deletePermissionById.shtml','权限删除'),(8,'/member/list.shtml','用户列表'),(9,'/member/online.shtml','在线用户'),(10,'/member/changeSessionStatus.shtml','用户Session踢出'),(11,'/member/forbidUserById.shtml','用户激活&禁止'),(12,'/member/deleteUserById.shtml','用户删除'),(13,'/permission/addPermission2Role.shtml','权限分配'),(14,'/role/clearRoleByUserIds.shtml','用户角色分配清空'),(15,'/role/addRole2User.shtml','角色分配保存'),(16,'/role/deleteRoleById.shtml','角色列表删除'),(17,'/role/addRole.shtml','角色列表添加'),(18,'/role/index.shtml','角色列表'),(19,'/permission/allocation.shtml','权限分配'),(20,'/role/allocation.shtml','角色分配');
/*Data for the table `u_role` */
insert  into `u_role`(`id`,`name`,`type`) values (1,'系统管理员','888888'),(3,'权限角色','100003'),(4,'用户中心','100002');
/*Data for the table `u_role_permission` */
insert  into `u_role_permission`(`rid`,`pid`) values (4,8),(4,9),(4,10),(4,11),(4,12),(3,4),(3,6),(3,7),(3,13),(3,14),(3,15),(3,16),(3,17),(3,18),(3,19),(3,20),(1,4),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20);
/*Data for the table `u_user` */
insert  into `u_user`(`id`,`nickname`,`email`,`pswd`,`create_time`,`last_login_time`,`status`) values (1,'管理员','admin','9c3250081c7b1f5c6cbb8096e3e1cd04','2016-06-16 11:15:33','2016-06-16 11:24:10',1),(11,'soso','8446666@qq.com','d57ffbe486910dd5b26d0167d034f9ad','2016-05-26 20:50:54','2016-06-16 11:24:35',1),(12,'8446666','8446666','4afdc875a67a55528c224ce088be2ab8','2016-05-27 22:34:19','2016-06-15 17:03:16',1);
/*Data for the table `u_user_role` */
insert  into `u_user_role`(`uid`,`rid`) values (12,4),(11,3),(11,4),(1,1);
   
    END
;;
DELIMITER ;
