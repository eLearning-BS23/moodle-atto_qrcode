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
 * Renders text with the active filters and returns it. Used to create previews of equations
 * using whatever tex filters are enabled.
 *
 * @package    atto_equation
 * @copyright  2014 Damyon Wiese
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

use atto_qrcode\output_image;

define('AJAX_SCRIPT', true);

require_once(__DIR__ . '/../../../../../config.php');

$contextid = required_param('contextid', PARAM_INT);

list($context, $course, $cm) = get_context_info_array($contextid);
$PAGE->set_url('/lib/editor/atto/plugins/qrcode/ajax.php');
$PAGE->set_context($context);

require_login($course, false, $cm);
require_sesskey();

$output_image = new output_image(2, 30, $context);

try {
    $base64string = $output_image->create_image('http://localhost:8000/lib/editor/atto/plugins/qrcode/ajax.php?sesskey=WO3NyDIXFm&contextid=31');

    header('Content-Type: application/json');
    echo json_encode([
        'data' => $base64string
    ]);

    die();
}catch (Exception $exception){
    print_error('invalidarguments');
}
