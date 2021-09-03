# Moodle Proctoring

Moodle Atto QR Code is a Atto sub-plugin to easily create and integrate QR Code to Moodle Atto form.

This library helps you generate QR codes in a jiffy. Makes use of bacon/bacon-qr-code to generate the matrix and khanamiryan/qrcode-detector-decoder for validating generated QR codes.
<p align="center">
<img src="https://imgur.com/OpW0BVz.png">
</p>


## Features
- Easy qrcode integration
- Flexible to customize
  - QR Code size
  - QR Code Margin
  - Background and Foreground color of QR Code
- Global setting page to avoid overwhelming input

## Configuration

You can install this plugin from [Moodle plugins directory](https://moodle.org/plugins) or can download from [Github](https://github.com/eLearning-BS23/moodle-atto_qrcode).

## Toolbar Settings
- Go to site administration > plugins overview > Atto HTML editor
- Go to `settings`
- Scroll down and from `Toolbar config` add `qrcode` to your desired toolbar 


> After installing the plugin, you can use the plugin by following:


- Go to Atto TML editor:
- Click on QR-code icon from Toolbar
- Insert QR-Code content
- Insert width, margin, background and foreground color (Optional) of qrcode
- Done!
```
  Dashboard->My courses->Your Course Name->Lesson->Quiz Name->Edit settings
```
<p align="center">
<img src="https://i.imgur.com/rwTYQ9M.png" width="80%">
</p>

> Now you can attempt your quiz like this:
<p align="center">
<img src="https://imgur.com/Zef3eqn.png" width="40%">
</p>

> You can check the report from Admin Site:
<p align="center">
<img src="https://imgur.com/QJ7yVTL.png">
</p>

# usages
- go to atto editor
- you can see qr-code logo on toolbar
- click on the logo
- Pop-up will be shown
- insert your account id, video id and optional player id
- done!

# Global Setting page

- Go to site administration > plugins overview > QR Code
- Go to `settings`
- you can define your default QR-Code size, Margin, RGBA (Red, Green, Blue, Alpha) Background and ForeGround color


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
