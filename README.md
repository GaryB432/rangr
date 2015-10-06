# Range Parsing

Parses a string range such as `1,2,3-7,9` into the array `[1,2,3,4,5,6,7,9]`

## Install

$ bower install rangr

## Usage

```javascript
var p = new Rangr.Parser({ max: 10 });
console.log(p.parse("1,2,3-5,6")); // [1,2,3,4,5,6]
```

### constructor(options)
#### options.max
The maximum number of entries in the returned array

Type: `Number`<br><br>Default: 10

### JQuery UI Widget

```javascript
$(document).ready(function(){
    var $range = $("#range-input").rangr({ max: 15 });
    
    $("#seeRange").click(function(){
        console.log($range.rangr("range"));
    });
});
```
Copy the [jQuery Widget Rangr demo](jqdemo.html) locally and experiment with your browser console visible.

# Contributing

Contributions to the project are welcome. Feel free to fork and improve. I accept pull requests and issues, especially when tests are included.

# License

## Internet Systems Consortium license
Copyright (c) 2015, Gary Bortosky and contributers

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
