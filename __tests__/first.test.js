test('Dog says bark.', () => {
	let objA = { animal: "dog",
			says: "bark" };
	let objB = { says: "bark",
			animal: "dog" };
	expect(objA). toEqual(objB);
});
