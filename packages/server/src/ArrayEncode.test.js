const ArrayEncode = require('./ArrayEncode.js');


test('ArrayEncode produces the correct base64 string for binary [1, 2, 3, 4]', () => {
    const arr = [
	false, false, false, false, false, false, false,  true, // 00000001
	false, false, false, false, false, false,  true, false, // 00000010
	false, false, false, false, false, false,  true,  true, // 00000011
	false, false, false, false, false,  true, false, false, // 00000100
    ];
    expect(ArrayEncode(arr)).toBe('AQIDBA==');
});
