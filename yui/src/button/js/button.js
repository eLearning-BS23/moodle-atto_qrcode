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
//

/**
 * Atto QRCode js library functions
 *
 * @package    atto_qrcode
 * @copyright  2021 Brain Station 23 Ltd. <brainstation-23.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 *
 */

/**
 * @module moodle-atto_qrcode-button
 */

/**
 * Atto text editor recordrtc plugin.
 *
 * @namespace M.atto_qrcode
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

// ESLint directives.
/* eslint-disable camelcase, spaced-comment */

// JSHint directives.
/*global M */
/*jshint onevar: false */

// Scrutinizer CI directives.
/** global: Y */
/** global: M */

var PLUGINNAME= 'atto_qrcode',
    CSS = {
        BUTTON: 'atto_qrcode_button',
        DOM_SELECTOR: 'atto_qrcode_selector'
    };

Y.namespace('M.atto_qrcode').Button = Y.Base.create('button',Y.M.editor_atto.EditorPlugin,[], {

    _lang: 'en',

    _currentSelection: null,

    initializer: function () {
        this.addButton({
            icon: 'qrcode',
            iconComponent: PLUGINNAME,
            callback: this._displayDialogue()
        });
    },
    _displayDialogue: function () {
        this._currentSelection = this.get('host').getSelection();
        if (this._currentSelection === false) {
            return false;
        }

        var dialouge = this.getDialogue({
            headerContent: M.util.get_string('insertqrcode', PLUGINNAME),
            focusAfterHide: true
        });

        dialouge.set('bodycontent', this._getDialogueContent())
                 .show();

    },
    _getDialogueContent: function () {
        var template = Y.Handlebars.compile(
            '<div class="{{CSS.DOM_SELECTOR}}">' +

            '</div>>'
        );

        var content = Y.Node.create(template({
            component: PLUGINNAME,
            CSS: CSS
        }));

        content.delegate('click', this._insertQrCode, '.'+CSS.BUTTON, this);

        return content;
    },

    _insertQrCode:function (e) {

        var character = e.target.getData('character');

        // Hide the dialogue.
        this.getDialogue({
            focusAfterHide: null
        }).hide();

        var host = this.get('host');

        // Focus on the last point.
        host.setSelection(this._currentSelection);

        // And add the qrcode.
        host.insertContentAtFocusPoint(character);

        // Mark the text area updated.
        this.markUpdated();
    }
},
{
    ATTRS: {

    }

});