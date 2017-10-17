var isFontFamilyMatch = require( "./isFontFamilyMatch" );

function hasAnyWebFontFamily(families, fontFamilyProp) {
	return families.filter(function(family) {
		return isFontFamilyMatch(fontFamilyProp, family);
	}).length > 0;
}

module.exports = hasAnyWebFontFamily;
