<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Moodle global Settings file for atto_qrcode.
 *
 * @package    atto_qrcode
 * @copyright  2021 Brain Station 23 Ltd. <brainstation-23.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 *
 */

defined('MOODLE_INTERNAL') || die();

$ADMIN->add('editoratto', new admin_category('atto_qrcode', new lang_string('qrcode_settings', 'atto_qrcode')));

if ($ADMIN->fulltree) {
    $qrcode_size_desc = get_string('qrcode_size_desc', 'atto_qrcode');
    $default = 300;

    $settings->add(new admin_setting_configtext('atto_qrcode/qrcode_size', get_string('qrcode_size', 'atto_qrcode'),
        $qrcode_size_desc, $default, PARAM_INT, 20));

    $desc_qrcode_margin = get_string('qrcode_margin_desc', 'atto_qrcode');
    $settings->add(new admin_setting_configtext('atto_qrcode/qrcode_margin', get_string('qrcode_margin', 'atto_qrcode'),
        $desc_qrcode_margin, 10, PARAM_INT, 20));

    $settings->add(new admin_setting_heading('bgcolor_rgb', get_string('bgcolor_rgb','atto_qrcode'),''));

    $settings->add(new admin_setting_configtext('atto_qrcode/bgcolor_r', get_string('red', 'atto_qrcode'),
        get_string('bgcolor_r','atto_qrcode'), 255, PARAM_INT, 3));
    $settings->add(new admin_setting_configtext('atto_qrcode/bgcolor_g', get_string('green', 'atto_qrcode'),
        get_string('bgcolor_g','atto_qrcode'), 255, PARAM_INT, 3));
    $settings->add(new admin_setting_configtext('atto_qrcode/bgcolor_b', get_string('blue', 'atto_qrcode'),
        get_string('bgcolor_b','atto_qrcode'), 255, PARAM_INT, 3));
    $settings->add(new admin_setting_configtext('atto_qrcode/bgcolor_a', get_string('alpha', 'atto_qrcode'),
        get_string('bgcolor_a','atto_qrcode'), 0, PARAM_INT, 3));

    $settings->add(new admin_setting_heading('color_rgb',get_string('color_rgb','atto_qrcode'),''));

    $settings->add(new admin_setting_configtext('atto_qrcode/color_r', get_string('red', 'atto_qrcode'),
        get_string('color_r','atto_qrcode'), 0, PARAM_INT, 3));
    $settings->add(new admin_setting_configtext('atto_qrcode/color_g', get_string('green', 'atto_qrcode'),
        get_string('color_g','atto_qrcode'), 0, PARAM_INT, 3));
    $settings->add(new admin_setting_configtext('atto_qrcode/color_b', get_string('blue', 'atto_qrcode'),
        get_string('color_b','atto_qrcode'), 0, PARAM_INT, 3));
    $settings->add(new admin_setting_configtext('atto_qrcode/color_a', get_string('alpha', 'atto_qrcode'),
        get_string('color_a','atto_qrcode'), 0, PARAM_INT, 3));


}
