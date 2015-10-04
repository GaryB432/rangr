namespace Rangr {
	class RangrParseError extends Error {
		constructor(part: string) {
			super();
			this.message = `Cannot parse "${part}".`;
		}
	}
	class RangrLengthError extends Error {
		constructor() {
			super();
			this.message = "Range too long.";
		}
	}
	export interface IParserOptions {
		max: number;
	}

	export class Parser {
		constructor(public opts: IParserOptions = { max: undefined }) {
			this.opts.max = this.opts.max || 10;
		}
		parse(text: string): number[] {
			let answer: number[] = [];

			var csvParts = text.split(",", 100);

			for (let csv of csvParts) {
				let subRange = this.parseSubrange(csv);
				for (let n of subRange) {
					if (answer.length === this.opts.max) {
						throw new RangrLengthError();
					}
					answer.push(n)
				}
			}
			return answer;

		}
		private parseSubrange(part: string): number[] {
			let n = Number(part)
			if (isNaN(n)) {
				return this.parseNaN(part);
			}
			else {
				return [n]
			}
		}
		private parseNaN(part: string): number[] {
			let p = part.split("-", 2);
			if (p.length === 2) {
				return this.doRange(Number(p[0]), Number(p[1]), this.opts.max)
			} else {
				throw new RangrParseError(part);
			}
		}
		private doRange(start: number, end: number, max: number): number[] {
			let answer: number[] = [];
			for (let n = start; !(n > end); n++) {
				if (answer.length === max) {
					throw new RangrLengthError();
				}
				answer.push(n)
			}
			return answer;
		}
	}
}

if (typeof jQuery != "undefined") {
	jQuery(() => {
		jQuery.widget("Rangr.rangr", {
			options: {
				max: 10
			},
			_create() {
				this.ranger = new Rangr.Parser(this.options);
			},
			_detroy() {
				this.ranger = null;
			},

			range(value?: number[]): number[] {
				if (value === undefined) {
					return this.ranger.parse(this.element.val());
				}
				throw new Error("Setter not supported.");
			}
		});
	});
}