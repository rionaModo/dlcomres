<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<table>
    <?php if(is_array($publicity_list)): foreach($publicity_list as $k=>$val): ?><tr>
        <td><?php echo ($val["publicity_name"]); ?></td>
        <td><?php echo ($val["create_time"]); ?></td>
        <td><?php echo ($val["create_people"]); ?></td>
    </tr><?php endforeach; endif; ?>
</table>
</body>
</html>