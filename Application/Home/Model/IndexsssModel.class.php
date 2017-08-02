<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2016/8/2
 * Time: 15:21
 */

namespace Home\Model;


use Think\Model;
use Think\Page;

/**
 * 首页的模型文件
 * Class InviteModel
 * @package Admin\Model
 */
class PublicityModel extends Model {
    protected $trueTableName  = 'publicity_content';
    protected $tableName = 'publicity_content';
}
class PublicityContentModel extends Model {

    protected $trueTableName  = 'publicity_content';




}