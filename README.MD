# Moodle atto-qrcode

Moodle Atto qr-code is an atto sub-plugin to easily create and integrate QRCode to Moodle atto editor.

This library helps you generate QR codes in a jiffy. Makes use of bacon/bacon-qr-code to generate the matrix and khanamiryan/qrcode-detector-decoder for validating generated QR codes.

<img src="https://i.imgur.com/MT6mGaE.png">

## Features
- Easy qrcode integration
- Flexible to customize
  - QR Code size
  - QR Code Margin
  - Background and Foreground color of QR Code
- Global setting page to avoid overwhelming input

## Configuration

You can install this plugin from [Moodle plugins directory](https://moodle.org/plugins) or can download from [Github](https://github.com/eLearning-BS23/moodle-atto_qrcode).

# Global Setting page
```
Dashboard -> Site administration -> Plugins -> Text editors -> Atto HTML editor -> QR Code
```
- Define your default QR-Code size, Margin, RGBA (Red, Green, Blue, Alpha) Background and ForeGround color.

<img src="https://imgur.com/XzqWPvs.png">
<img src="https://i.imgur.com/ZRlXfzv.png">


## Toolbar Settings
```
 Dashboard -> Site administration -> Plugins -> Text editors -> Atto HTML editor -> Atto toolbar settings
```
<img src="https://i.imgur.com/XQgWkiB.png" alt="toolbar-config-settings"/>

## usages
> After installing the plugin, you can use the plugin by following:

- Go to Atto HTML editor:
- Click on QR-code icon from Toolbar
- Insert QR-Code content
- Insert width, margin, background and foreground color (Optional) of qrcode
- Done!

<img src="https://i.imgur.com/LlZeBLG.png">



## License

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program.  If not, see <http://www.gnu.org/licenses/>.
