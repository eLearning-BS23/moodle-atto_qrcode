YUI.add('moodle-atto_qrcode-button', function (Y, NAME) {

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

/*
 * @package     atto_qrcode
 * @copyright   2021 Brain station 23 ltd. <https://brainstation-23.com/>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_qrcode-button
 * @namespace M.atto_qrcode
 * @class Button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_qrcode',
    // @codingStandardsIgnoreStart
    IMAGETEMPLATE = '',
    TEMPLATES = '<form class="mform atto_form atto_qrcode" id="atto_qrcode_form">' +
        '<label for="brightcove_accountid_entry">'+M.str.atto_qrcode.enter_account_id+'</label>' +
        '<input class="form-control fullwidth " type="text" id="brightcove_accountid_entry"' +
        'size="32" required="true" value="{{brightcoveAccount}}"/>' +
        '<label for="brightcove_videoid_entry">'+M.str.atto_qrcode.enter_video_id+'</label>' +
        '<input class="form-control fullwidth " type="text" id="brightcove_videoid_entry"' +
        'size="32" required="true"/>' +
        '<label for="brightcove_playerid_entry">'+M.str.atto_qrcode.enter_player_id+'</label>' +
        '<input class="form-control fullwidth " type="text" id="brightcove_playerid_entry"' +
        'size="32" required="true" value="{{brightcovePlayer}}"/>' +
        '<div class="mb-1">' +
        '<label for="brightcove_sizing" class="full-width-labels">'+M.str.atto_qrcode.video_sizing+'</label><br>' +
        '<div class="form-check form-check-inline">' +
        '  <input class="form-check-input" type="radio" name="brightcove_sizing" id="inlineRadio1" value="res" checked>' +
        '  <label class="form-check-label" for="inlineRadio1">'+M.str.atto_qrcode.video_responsive+'</label>' +
        '</div>' +
        '<div class="form-check form-check-inline">' +
        '  <input class="form-check-input" type="radio" name="brightcove_sizing" id="inlineRadio2" value="fix">' +
        '  <label class="form-check-label" for="inlineRadio2">'+M.str.atto_qrcode.video_fixed+'</label>' +
        '</div>' +
        '</div>' +
        '<div class="mb-1" >' +
        '    <label>'+M.str.atto_qrcode.video_size+'</label>' +
        '    <div class="form-inline " >' +
        '        <label class="accesshide">'+M.str.atto_qrcode.video_width+'</label>' +
        '        <input type="text" class="form-control mr-1  input-mini" size="4" id="brightcove_width" value="960"> x' +
        '        <label class="accesshide">'+M.str.atto_qrcode.video_height+'</label>' +
        '        <input type="text" class="form-control ml-1 input-mini" size="4" id="brightcove_height" value="540">' +
        '        <label class="accesshide">Unit</label>' +
        '        <select class="form-control ml-1 input-mini"  id="brightcove_width_unit">' +
        '            <option value="px" selected>px</option>' +
        '            <option value="cm" >cm</option>' +
        '            <option value="%" >%</option>' +
        '        </select>' +
        '    </div>' +
        '</div>' +
        '<div class="clearfix"></div>' +
        '<div class="mdl-align">' +
        '<br>' +
        '<button class="btn btn-secondary submit" type="submit">'+M.str.atto_qrcode.insert_brightcove_video+'</button>' +
        '</div>' +
        '</form>',
    THUMBIMAGE = '';
// @codingStandardsIgnoreEnd

Y.use('core/event')
    .namespace('M.atto_qrcode').Button = Y.Base
    .create('button', Y.M.editor_atto.EditorPlugin, [], {
    /**
     * A reference to the current selection at the time that the dialogue
     * was opened.
     *
     * @property _currentSelection
     * @type Range
     * @private
     */
    _currentSelection: null,
    /**
     * Add event listeners.
     *
     * @method initializer
     */

    initializer: function() {

        // If we don't have the capability to view then give up.
        if (this.get('disabled')) {
            return;
        }
        this.addButton({
            icon: 'qrcode',
            iconComponent: COMPONENTNAME,
            callback: this._handleQrCodeGenerator,
            callbackArgs: 'qrcode'
        });
    },

    /**
     * Handle qrcode video contetn import to text area
     * @method _handleQrCodeGenerator
     * @private
     */
    _handleQrCodeGenerator: function() {
        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('insertqrcode', COMPONENTNAME),
            focusAfterHide: true,
            width: 660
        });

        dialogue.set('bodyContent', this._getDialogueContent(this.get('host').getSelection())).show();
        // M.form.shortforms({formid: 'atto_qrcode_form'});
    },

    /**
     * Returns the dialogue content for the tool.
     *
     * @method _getDialogueContent
     * @param  {WrappedRange[]} selection Current editor selection
     * @return {Y.Node}
     * @private
     */
    _getDialogueContent: function(selection) {
        var context = {
            brightcovePlayer: this.get('brightcovePlayer'),
            brightcoveAccount: this.get('brightcoveAccount')
        };
        var content = Y.Node.create(
            Y.Handlebars.compile(TEMPLATES)(context)
        );
        return this._attachEvents(content, selection);
    },
    /**
     * Attaches required events to the content node.
     *
     * @method _attachEvents
     * @param  {Y.Node}         content The content to which events will be attached
     * @param  {WrappedRange[]} selection Current editor selection
     * @return {Y.Node}
     * @private
     */
    _attachEvents: function(content, selection) {
        content.one('.submit').on('click', function(e) {
            var atto_form_content = e.currentTarget.ancestor('.atto_form');
            var account_id = atto_form_content.one("#brightcove_accountid_entry").get('value');
            var video_id = atto_form_content.one("#brightcove_videoid_entry").get('value');
            var player_id = atto_form_content.one("#brightcove_playerid_entry").get('value');

            if (!account_id || !video_id || !player_id) {
                return;
            }
            e.preventDefault();
            var mediaHTML = this._getMediaHTMLBrightcove(e.currentTarget.ancestor('.atto_form')),
                host = this.get('host');


            this.getDialogue({
                focusAfterHide: null
            }).hide();
            if (mediaHTML) {
                host.setSelection(selection);
                host.insertContentAtFocusPoint(mediaHTML);
                this.markUpdated();
            }
        }, this);

        return content;
    },
    /**
     * Returns the HTML to be inserted to the text area for the link tab.
     *
     * @method _getMediaHTMLLink
     * @param  {Y.Node} tab The tab from which to extract data
     * @return {String} The compiled markup
     * @private
     */
    _getMediaHTMLBrightcove: function(tab) {
        var brightcoveWidthUnit = tab.one("#brightcove_width_unit").get('value') || 'px';
        var brightcoveWidth = tab.one("#brightcove_width").get('value') + brightcoveWidthUnit;
        var brightcoveHeight = tab.one("#brightcove_height").get('value') + brightcoveWidthUnit;
        var brightcoveSizing = document.querySelector('input[name="brightcove_sizing"]:checked').value;

        var context = {
            accountId: '12313',
            videoId: '12313',
            playerId: '12313',
            display_video  : 'block',
            display_thumb  : 'none'
        };
        if (brightcoveSizing === 'res') {
            context.brightcoveResWidth = brightcoveWidth;
        } else {
            context.brightcoveWidth = brightcoveWidth;
            context.brightcoveHeight = brightcoveHeight;
        }

        return context.videoId ? Y.Handlebars.compile(IMAGETEMPLATE)(context) : '';
    },



}, {
    ATTRS: {
        disabled: {
            value: false
        },
        brightcovePlayer: {
            value: null
        },
        brightcoveAccount: {
            value: null
        }
    }
});



}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
