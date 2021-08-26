<?php

$functions = array(
    'atto_qrcode_get_qrcode' => array(
        'classname'   => 'core_auth_external',
        'methodname'  => 'confirm_user',
        'description' => 'Confirm a user account.',
        'type'        => 'write',
        'ajax'          => true,
        'loginrequired' => false,
    )
);
