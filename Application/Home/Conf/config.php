<?php

//define('BASE_URL','http://192.168.100.67:6600');
define('BASE_URL','');
return array(
    'TMPL_PARSE_STRING'  =>array(
        '__CSS__' =>  BASE_URL.'/resoures/css',
         '__JS__' => BASE_URL.'/resoures/js',
         '__CPT__'=>BASE_URL.'/resoures/components',
         '__IMAGE__' =>  BASE_URL.'/resoures/images'
    )
);