CREATE TABLE `learn_list` (
  `id` varchar(32) NOT NULL,
  `theme` varchar(256) NOT NULL,
  `content` varchar(512) NOT NULL,
  `type` varchar(32) DEFAULT NULL COMMENT '1:开发流程术，2：测试流程，3：技术小点，4：工作心得，5：生活分享',
  `enable` tinyint(2) NOT NULL DEFAULT '1' COMMENT '逻辑删除，是否显示记录 1：显示，0：不显示',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `publicity` (
  `enable` int(2) DEFAULT '0' COMMENT '是否启动 0：启动，1：停用',
  `update_people` varchar(32) DEFAULT NULL,
  `create_people` varchar(32) DEFAULT NULL,
  `publicity_name` varchar(64) NOT NULL COMMENT '名称',
  `id` varchar(32) NOT NULL,
  `create_time` datetime DEFAULT NULL COMMENT '类型，0：text，1：img',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='宣传语表';

CREATE TABLE `publicity_content` (
  `publicity_id` varchar(32) NOT NULL,
  `publicity_first_content` varchar(512) NOT NULL,
  `publicity_first_mark` tinyint(2) NOT NULL DEFAULT '0' COMMENT 'publicity_first_content宣传内容类型 。0:text,1:img,2:link',
  `publicity_second_content` varchar(512) DEFAULT NULL,
  `publicity_second_mark` tinyint(2) DEFAULT NULL COMMENT 'publicity_second_content宣传内容类型 。0:text,1:img,2:link',
  `publicity_thirsty_content` varchar(512) DEFAULT NULL,
  `publicity_thirsty_mark` tinyint(2) DEFAULT NULL COMMENT 'publicity_thirsty_content宣传内容类型 。0:text,1:img,2:link',
  PRIMARY KEY (`publicity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='宣传内容';

