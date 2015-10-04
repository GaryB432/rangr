var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rangr;
(function (Rangr) {
    var RangrParseError = (function (_super) {
        __extends(RangrParseError, _super);
        function RangrParseError(part) {
            _super.call(this);
            this.message = "Cannot parse \"" + part + "\".";
        }
        return RangrParseError;
    })(Error);
    var RangrLengthError = (function (_super) {
        __extends(RangrLengthError, _super);
        function RangrLengthError() {
            _super.call(this);
            this.message = "Range too long.";
        }
        return RangrLengthError;
    })(Error);
    var Parser = (function () {
        function Parser(opts) {
            if (opts === void 0) { opts = { max: undefined }; }
            this.opts = opts;
            this.opts.max = this.opts.max || 10;
        }
        Parser.prototype.parse = function (text) {
            var answer = [];
            var csvParts = text.split(",", 100);
            for (var _i = 0; _i < csvParts.length; _i++) {
                var csv = csvParts[_i];
                var subRange = this.parseSubrange(csv);
                for (var _a = 0; _a < subRange.length; _a++) {
                    var n = subRange[_a];
                    if (answer.length === this.opts.max) {
                        throw new RangrLengthError();
                    }
                    answer.push(n);
                }
            }
            return answer;
        };
        Parser.prototype.parseSubrange = function (part) {
            var n = Number(part);
            if (isNaN(n)) {
                return this.parseNaN(part);
            }
            else {
                return [n];
            }
        };
        Parser.prototype.parseNaN = function (part) {
            var p = part.split("-", 2);
            if (p.length === 2) {
                return this.doRange(Number(p[0]), Number(p[1]), this.opts.max);
            }
            else {
                throw new RangrParseError(part);
            }
        };
        Parser.prototype.doRange = function (start, end, max) {
            var answer = [];
            for (var n = start; !(n > end); n++) {
                if (answer.length === max) {
                    throw new RangrLengthError();
                }
                answer.push(n);
            }
            return answer;
        };
        return Parser;
    })();
    Rangr.Parser = Parser;
})(Rangr || (Rangr = {}));
if (typeof jQuery != "undefined") {
    jQuery(function () {
        jQuery.widget("Rangr.rangr", {
            options: {
                max: 10
            },
            _create: function () {
                this.ranger = new Rangr.Parser(this.options);
            },
            _detroy: function () {
                this.ranger = null;
            },
            range: function (value) {
                if (value === undefined) {
                    return this.ranger.parse(this.element.val());
                }
                throw new Error("Setter not supported.");
            }
        });
    });
}
//# sourceMappingURL=rangr.js.map