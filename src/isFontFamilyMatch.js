var cleanup = require( "./fontFamilyCleanup" );

function isFontFamilyMatch(haystack, needle) {
	needle = needle.toLowerCase();

	return cleanup( haystack ).filter(function( family ) {
		return family.toLowerCase() === needle;
	}).length > 0;
}

module.exports = isFontFamilyMatch;
