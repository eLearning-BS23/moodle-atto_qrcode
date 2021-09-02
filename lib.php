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
 * Atto QRCdoe library function.
 *
 * @package    atto_qrcode
 * @copyright  2021 Brain Station 23 Ltd. <brainstation-23.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 *
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Set params for this plugin.
 * @param string $elementid
 * @param stdClass $options
 * @param stdClass $fpoptions
 * @return array
 * @throws coding_exception
 * @throws dml_exception
 */
function atto_qrcode_params_for_js($elementid, $options, $fpoptions) {
    global $USER;

    $qrcode_size = get_config('atto_qrcode', 'qrcode_size');
    $margin = get_config('atto_qrcode', 'qrcode_margin');
    $bgcolor_r = get_config('atto_qrcode', 'bgcolor_r');
    $bgcolor_g = get_config('atto_qrcode', 'bgcolor_g');
    $bgcolor_b = get_config('atto_qrcode', 'bgcolor_b');
    $bgcolor_a = get_config('atto_qrcode', 'bgcolor_a');
    $color_r = get_config('atto_qrcode', 'color_r');
    $color_g = get_config('atto_qrcode', 'color_g');
    $color_b = get_config('atto_qrcode', 'color_b');
    $color_a = get_config('atto_qrcode', 'color_a');

    // Disabled if:
    // - Not logged in or guest.
    $disabled = !isloggedin() || isguestuser() ;

    $context = $options['context'];
    if (!$context) {
        $context = context_system::instance();
    }

    return array(
        'disabled' => $disabled,
        'contextid' => $context->id,
        'size' => $qrcode_size,
        'margin' => $margin,
        'bgcolor_r' => $bgcolor_r,
        'bgcolor_g' => $bgcolor_g,
        'bgcolor_b' => $bgcolor_b,
        'bgcolor_a' => $bgcolor_a,
        'color_r' => $color_r,
        'color_g' => $color_g,
        'color_b' => $color_b,
        'color_a' => $color_a,
    );

}

/**
 * Initialise the js strings required for this module.
 */
function atto_qrcode_strings_for_js() {
    global $PAGE;

    $PAGE->requires->strings_for_js(
        array(
            'pluginname',
            'qrcode_size',
            'qrcode_margin',
            'insertqrcode',
            'qrcodecontent',
            'insertqrcode',
            'backgroundcolor',
            'forgroungcolor',
            'red',
            'green',
            'blue',
            'alpha',
        ),
        'atto_qrcode'
    );
}