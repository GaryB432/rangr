describe("Rangr", () => {
	let ranger: Rangr.Parser;
	beforeEach(() => {
		ranger = new Rangr.Parser();
	})
	it("should return empty array on empty input", () => {
		expect(ranger.parse("")).toEqual([]);
		expect(ranger.parse(null)).toEqual([]);
		expect(ranger.parse(undefined)).toEqual([]);
	})
	it("should throw when given NaN", () => {
		expect(() => ranger.parse("2,four,8")).toThrowError("Cannot parse \"four\".");
	})
	it("should parse properly", () => {
		expect(ranger.parse("2,4-6,8")).toEqual([2, 4, 5, 6, 8]);
	})
	it("should parse properly", () => {
		expect(ranger.parse("1-3,4-5,6,7,8-9,10")).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	})
	it("should parse properly", () => {
		expect(ranger.parse("1-4,  5 ,6-  10")).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	})
	describe("Max Exceeded", () => {
		let p: Rangr.Parser;
		beforeEach(() => {
			p = new Rangr.Parser({ max: 4 });
		})

		it("should respect max range", () => {
			expect(() => p.parse("2,4-6,8")).toThrowError("Range too long.");
		})
		it("should respect max numbers", () => {
			expect(() => p.parse("1,2,3,4,5")).toThrowError("Range too long.");
		})
	})
})