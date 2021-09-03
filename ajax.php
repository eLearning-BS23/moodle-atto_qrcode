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
 * Generate the QR code.
 *
 * @package    atto_qrcode
 * @copyright  2021 Brain Station 23 Ltd. <brainstation-23.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 *
 */
use atto_qrcode\output_image;

define('AJAX_SCRIPT', true);

require_once(__DIR__ . '/../../../../../config.php');

$contextid = required_param('contextid', PARAM_INT);
$content = required_param('content', PARAM_RAW);
$size = required_param('size', PARAM_INT);
$margin= required_param('margin', PARAM_INT);
$bgcolor_r = optional_param('bgcolor_r', 255,PARAM_INT);
$bgcolor_g = optional_param('bgcolor_g', 255,PARAM_INT);
$bgcolor_b = optional_param('bgcolor_b', 255,PARAM_INT);
$bgcolor_a = optional_param('bgcolor_a', 0,PARAM_INT);

$color_r = optional_param('color_r', 0,PARAM_INT);
$color_g = optional_param('color_g', 0,PARAM_INT);
$color_b = optional_param('color_b', 0,PARAM_INT);
$color_a = optional_param('color_a', 0,PARAM_INT);


list($context, $course, $cm) = get_context_info_array($contextid);
$PAGE->set_url('/lib/editor/atto/plugins/qrcode/ajax.php');
$PAGE->set_context($context);

require_login($course, false, $cm);
require_sesskey();

$output_image = new output_image(2, $size, $context, $margin);

try {
    $base64string = $output_image->create_image($content,
        [$bgcolor_r,$bgcolor_g, $bgcolor_b, $bgcolor_a],
        [$color_r,$color_g, $color_b, $color_a]
    );

    header('Content-Type: application/json');
    echo json_encode([
        'data' => $base64string
    ]);

    die();
}catch (Exception $exception){
    print_error('invalidarguments');
}
