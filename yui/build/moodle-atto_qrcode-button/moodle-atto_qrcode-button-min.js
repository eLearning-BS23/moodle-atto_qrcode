YUI.add("moodle-atto_qrcode-button",function(l,e){var t="atto_qrcode",o='<form class="mform atto_form atto_qrcode" id="atto_qrcode_form"><label for="brightcove_accountid_entry">'+M.str.atto_qrcode.enter_account_id+'</label><input class="form-control fullwidth " type="text" id="brightcove_accountid_entry"size="32" required="true" value="{{brightcoveAccount}}"/><label for="brightcove_videoid_entry">'+M.str.atto_qrcode.enter_video_id+'</label><input class="form-control fullwidth " type="text" id="brightcove_videoid_entry"size="32" required="true"/><label for="brightcove_playerid_entry">'+M.str.atto_qrcode.enter_player_id+'</label><input class="form-control fullwidth " type="text" id="brightcove_playerid_entry"size="32" required="true" value="{{brightcovePlayer}}"/><div class="mb-1"><label for="brightcove_sizing" class="full-width-labels">'+M.str.atto_qrcode.video_sizing+'</label><br><div class="form-check form-check-inline">  <input class="form-check-input" type="radio" name="brightcove_sizing" id="inlineRadio1" value="res" checked>  <label class="form-check-label" for="inlineRadio1">'+M.str.atto_qrcode.video_responsive+'</label></div><div class="form-check form-check-inline">  <input class="form-check-input" type="radio" name="brightcove_sizing" id="inlineRadio2" value="fix">  <label class="form-check-label" for="inlineRadio2">'+M.str.atto_qrcode.video_fixed+'</label></div></div><div class="mb-1" >    <label>'+M.str.atto_qrcode.video_size+'</label>    <div class="form-inline " >        <label class="accesshide">'+M.str.atto_qrcode.video_width+'</label>        <input type="text" class="form-control mr-1  input-mini" size="4" id="brightcove_width" value="960"> x        <label class="accesshide">'+M.str.atto_qrcode.video_height+'</label>        <input type="text" class="form-control ml-1 input-mini" size="4" id="brightcove_height" value="540">        <label class="accesshide">Unit</label>        <select class="form-control ml-1 input-mini"  id="brightcove_width_unit">            <option value="px" selected>px</option>            <option value="cm" >cm</option>            <option value="%" >%</option>        </select>    </div></div><div class="clearfix"></div><div class="mdl-align"><br><button class="btn btn-secondary submit" type="submit">'+M.str.atto_qrcode.insert_brightcove_video+"</button></div></form>";l.use("core/event").namespace("M.atto_qrcode").Button=l.Base.create("button",l.M.editor_atto.EditorPlugin,[],{_currentSelection:null,initializer:function(){this.get("disabled")||this.addButton({icon:"qrcode",iconComponent:t,callback:this._handleQrCodeGenerator,callbackArgs:"qrcode"})},_handleQrCodeGenerator:function(){this.getDialogue({headerContent:M.util.get_string("insertqrcode",t),focusAfterHide:!0,width:660}).set("bodyContent",this._getDialogueContent(this.get("host").getSelection())).show()},_getDialogueContent:function(e){var t={brightcovePlayer:this.get("brightcovePlayer"),brightcoveAccount:this.get("brightcoveAccount")},i=l.Node.create(l.Handlebars.compile(o)(t));return this._attachEvents(i,e)},_attachEvents:function(e,a){return e.one(".submit").on("click",function(e){var t,i,o=e.currentTarget.ancestor(".atto_form"),r=o.one("#brightcove_accountid_entry").get("value"),c=o.one("#brightcove_videoid_entry").get("value"),l=o.one("#brightcove_playerid_entry").get("value");r&&c&&l&&(e.preventDefault(),t=this._getMediaHTMLBrightcove(e.currentTarget.ancestor(".atto_form")),i=this.get("host"),this.getDialogue({focusAfterHide:null}).hide(),t&&(i.setSelection(a),i.insertContentAtFocusPoint(t),this.markUpdated()))},this),e},_getMediaHTMLBrightcove:function(e){var t=e.one("#brightcove_width_unit").get("value")||"px",i=e.one("#brightcove_width").get("value")+t,o=e.one("#brightcove_height").get("value")+t,r=document.querySelector('input[name="brightcove_sizing"]:checked').value,c={accountId:"12313",videoId:"12313",playerId:"12313",display_video:"block",display_thumb:"none"};return"res"===r?c.brightcoveResWidth=i:(c.brightcoveWidth=i,c.brightcoveHeight=o),c.videoId?l.Handlebars.compile("")(c):""}},{ATTRS:{disabled:{value:!1},brightcovePlayer:{value:null},brightcoveAccount:{value:null}}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});