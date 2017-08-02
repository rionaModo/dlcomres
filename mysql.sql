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

CREATE TABLE `publicity` (
  `update_people` varchar(32) DEFAULT NULL,
  `create_people` varchar(32) DEFAULT NULL,
  `publicity_name` varchar(64) NOT NULL COMMENT '名称',
  `id` varchar(32) NOT NULL,
  `create_time` datetime DEFAULT NULL COMMENT '类型，0：text，1：img',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='宣传语表';

