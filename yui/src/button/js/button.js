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
    IMAGETEMPLATE = '<img src="{{base64qrcode}}" alt="" />',
    TEMPLATES = '<form class="mform atto_form atto_qrcode" id="atto_qrcode_form">' +
        '<label for="qrcodecontent">'+M.str.atto_qrcode.qrcodecontent+'</label>' +
        '<input class="form-control fullwidth " type="text" id="qrcodecontent"' +
        'required="true"/>' +
        '<label for="qrcode_size">'+M.str.atto_qrcode.qrcode_size+'</label>' +
        '<input class="form-control fullwidth " type="number" id="qrcode_size"' +
        'required="true" size="10" value="{{qrcode_size_default}}" min="5" max="100000"/>' +
        '<label for="qrcode_margin">'+M.str.atto_qrcode.qrcode_margin+'</label>' +
        '<input class="form-control fullwidth " type="number" id="qrcode_margin"' +
        'size="10"  min="5" max="100" required="true" value="{{qrcode_margin_default}}"/>' +
        '<div class="clearfix"></div>' +
        '<label for="qrcode_margin">'+M.str.atto_qrcode.backgroundcolor+'</label>' +
        '<div class="input-group">' +
        '<div class="input-group-prepend"> <span class="input-group-text">'+M.str.atto_qrcode.red+'</span></div>' +
        '<input required type="number" class="form-control" value="{{bgcolor_r}}" id="bgcolor_r" aria-label="Red">' +
        '<div class="input-group-prepend"> <span class="input-group-text">'+M.str.atto_qrcode.green+'</span></div>' +
        '<input required type="number" class="form-control" value="{{bgcolor_g}}" id="bgcolor_g"  aria-label="Green">' +
        '<div class="input-group-prepend"> <span class="input-group-text">'+M.str.atto_qrcode.blue+'</span></div>' +
        '<input required type="number" class="form-control" value="{{bgcolor_b}}" id="bgcolor_b" aria-label="Blue">' +
        '<div class="input-group-prepend"> <span class="input-group-text">'+M.str.atto_qrcode.alpha+'</span></div>' +
        '<input required type="number" class="form-control" value="{{bgcolor_a}}" id="bgcolor_a" aria-label="Alpha">' +
        '</div>' +
        '<div class="clearfix"></div>' +
        '<label for="qrcode_margin">'+M.str.atto_qrcode.forgroungcolor+'</label>' +
        '<div class="input-group">' +
        '<div class="input-group-prepend"> <span class="input-group-text">'+M.str.atto_qrcode.red+'</span></div>' +
        '<input required type="number" class="form-control" id="color_r" value="{{color_r}}" aria-label="Red">' +
        '<div class="input-group-prepend"> <span class="input-group-text">'+M.str.atto_qrcode.green+'</span></div>' +
        '<input required type="number" class="form-control" id="color_g" value="{{color_g}}" aria-label="Green">' +
        '<div class="input-group-prepend"> <span class="input-group-text">'+M.str.atto_qrcode.blue+'</span></div>' +
        '<input required type="number" class="form-control" id="color_b" value="{{color_b}}" aria-label="Blue">' +
        '<div class="input-group-prepend"> <span class="input-group-text">'+M.str.atto_qrcode.alpha+'</span></div>' +
        '<input required type="number" class="form-control" id="color_a" value="{{color_a}}" aria-label="Alpha">' +
        '</div>' +
        '<div class="clearfix"></div>' +
        '<div class="mdl-align">' +
        '<br>' +
        '<button class="btn btn-secondary submit" type="submit">'+M.str.atto_qrcode.insertqrcode+'</button>' +
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
            qrcode_size_default: this.get('size'),
            qrcode_margin_default: this.get('margin'),
            color_r: this.get('color_r'),
            color_g: this.get('color_g'),
            color_b: this.get('color_b'),
            color_a: this.get('color_a'),
            bgcolor_r: this.get('bgcolor_r'),
            bgcolor_g: this.get('bgcolor_g'),
            bgcolor_b: this.get('bgcolor_b'),
            bgcolor_a: this.get('bgcolor_a'),
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
            var qrcodecontent = atto_form_content.one("#qrcodecontent").get('value');
            var qrcode_size = atto_form_content.one("#qrcode_size").get('value');
            var qrcode_margin = atto_form_content.one("#qrcode_margin").get('value');
            var bgcolor_r = atto_form_content.one("#bgcolor_r").get('value');
            var bgcolor_g = atto_form_content.one("#bgcolor_g").get('value');
            var bgcolor_b = atto_form_content.one("#bgcolor_b").get('value');
            var bgcolor_a = atto_form_content.one("#bgcolor_a").get('value');
            var color_r = atto_form_content.one("#color_r").get('value');
            var color_g = atto_form_content.one("#color_g").get('value');
            var color_b = atto_form_content.one("#color_b").get('value');
            var color_a = atto_form_content.one("#color_a").get('value');

            var color = {
                bgcolor_r: bgcolor_r,
                bgcolor_g: bgcolor_g,
                bgcolor_b: bgcolor_b,
                bgcolor_a: bgcolor_a,
                color_r: color_r,
                color_g: color_g,
                color_b: color_b,
                color_a: color_a
            };

            if (!qrcodecontent || !qrcode_size || !qrcode_margin) {
                return;
            }
            e.preventDefault();
            this._getMediaHTMLQrcode(selection, qrcodecontent, qrcode_size, qrcode_margin, color);
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
    _getMediaHTMLQrcode: function(selection, qrcode_content, qrcode_size, qrcode_margin, color) {
        var parentContext = this;
        var qcodePromise = this._getQrCode(qrcode_content, qrcode_size, qrcode_margin, color);
        // eslint-disable-next-line promise/catch-or-return
        qcodePromise.then(function (response) {
            var context = {
                base64qrcode: response.data
            };
            var mediaHTML = Y.Handlebars.compile(IMAGETEMPLATE)(context);

            var host = parentContext.get('host');

            parentContext.getDialogue({
                focusAfterHide: null
            }).hide();
            // eslint-disable-next-line promise/always-return
            if (mediaHTML) {
                host.setSelection(selection);
                host.insertContentAtFocusPoint(mediaHTML);
                parentContext.markUpdated();
            }
        }).catch(function(err) {
            // Return null;
        });


    },
    _getQrCode: function(qrcode_content, qrcode_size, qrcode_margin, color) {
        var buttonContext = this;
        return new Y.Promise(function(resolve, reject) {
            Y.io(M.cfg.wwwroot + '/lib/editor/atto/plugins/qrcode/ajax.php', {
                context: buttonContext,
                data: Y.merge({
                    sesskey: M.cfg.sesskey,
                    contextid: buttonContext.get('contextid'),
                    content: qrcode_content,
                    size: qrcode_size,
                    margin: qrcode_margin,
                }, color),
                timeout: 500,
                on: {
                    success: function (id, o, args) {
                        try {
                            resolve(Y.JSON.parse(o.response));
                        } catch (e) {
                            // any failure to produce the value is a rejection
                            reject(e);
                        }
                    },
                    failure: function (id, o, args) {
                        reject(new Error(o));
                    }
                }
            });
        });
    }
}, {
    ATTRS: {
        disabled: {
            value: false
        },
        contextid: {
            value: null
        },
        size: {
            value: 300
        },
        margin: {
            value: 10
        },
        bgcolor_r: {
            value: 255
        },
        bgcolor_g: {
            value: 255
        },
        bgcolor_b: {
            value: 255
        },
        bgcolor_a: {
            value: 0
        },
        color_r: {
            value: 0
        },
        color_g: {
            value: 0
        },
        color_b: {
            value: 0
        },
        color_a: {
            value: 0
        }
    }
});

