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
 * This file contains a class that provides functions for generate a QR code.
 *
 * @package    atto_qrcode
 * @copyright  2021 Brain Station 23 Ltd. <brainstation-23.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace atto_qrcode;

use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelLow;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\RoundBlockSizeMode\RoundBlockSizeModeMargin;
use Endroid\QrCode\Writer\PngWriter;
use DOMDocument;

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/lib/editor/atto/plugins/qrcode/thirdparty/vendor/autoload.php');
require_once($CFG->dirroot . '/course/lib.php');

/**
 * Class output_image
 *
 * Output QR code.
 *
 * @package    atto_qrcode
 * @copyright  2021 Brain Station 23 Ltd. <brainstation-23.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class output_image
{
    /**
     * QR code is saved in this file.
     * @var string
     */
    protected $file;

    /**
     * Output file type.
     * 0 - png, 1 - svg
     * @var int
     */
    protected $format;


    protected $margin;

    /**
     * Size of qrcode (downloaded image).
     * Only for png.
     * @var int
     */
    protected $size;

    /**
     * Filepath for logo.
     * @var string
     */
    protected $logopath;

    /**
     * Course for which the qrcode is created.
     * @var \stdClass
     */
    protected $context;

    /**
     * output_image constructor.
     * @param int $format file type
     * @param int $size image size
     * @param $context
     * @param int $margin
     */
    public function __construct($format, $size, $context, $margin = 10)
    {
        global $CFG;
        $this->format = $format;
        $this->size = (int)$size;
        $this->context = $context;
        $this->margin = $margin;
        $this->logopath = null;
        $file = $CFG->localcachedir . '/atto_qrcode/context-' .
            (int)$context->id . '-' . $this->size; // Set file path.


// Add file ending.
        if ($format == 1) {
            $file .= '.svg';
        } else {
            $file .= '.png';
        }

        $this->file = $file;
    }

    /**
     * @param string $data
     * @param array $bgcolor_rgba
     * @param array $color_rgb
     * @param string $encoding
     * @return string
     * @throws \Exception
     */
    public function create_image(string $data, array $bgcolor_rgba= [], array $color_rgba=[], $encoding= 'UTF-8')
    {
        global $CFG;
        list($bgcolor_r , $bgcolor_g, $bgcolor_b, $bgcolor_a) = $bgcolor_rgba;
        list($color_r , $color_g, $color_b, $color_a) = $color_rgba;

        $bgcolor_r = $bgcolor_r ?? 255;
        $bgcolor_g = $bgcolor_g ?? 255;
        $bgcolor_b = $bgcolor_b ?? 255;
        $bgcolor_a = $bgcolor_a ?? 0;

        $color_r = $color_r ?? 0;
        $color_g = $color_g ?? 0;
        $color_b = $color_b ?? 0;
        $color_a = $color_a ?? 0;


        $writer = new PngWriter();

        // Create QR code.
        $qrCode = QrCode::create($data)
            ->setEncoding(new Encoding($encoding))
            ->setErrorCorrectionLevel(new ErrorCorrectionLevelLow())
            ->setSize($this->size)
            ->setMargin($this->margin)
            ->setRoundBlockSizeMode(new RoundBlockSizeModeMargin())
            ->setForegroundColor(new Color($color_r, $color_g, $color_b, $color_a))
            ->setBackgroundColor(new Color($bgcolor_r, $bgcolor_g, $bgcolor_b, $bgcolor_a));
        $result = $writer->write($qrCode);
        return $result->getDataUri();

    }

}
