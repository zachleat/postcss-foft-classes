var stripQuotes = require( "./stripQuotes" );

function fontFamilyCleanup(prop) {
	return prop
		.split(",")
		.map(function(family) {
			return stripQuotes( family.trim() );
		});
}

module.exports = fontFamilyCleanup;
