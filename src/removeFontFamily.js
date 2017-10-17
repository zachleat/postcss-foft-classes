var cleanup = require( "./fontFamilyCleanup" );

function removeFontFamily( existingProp, searchFor ) {
	return cleanup( existingProp ).filter(function( family ) {
		family = family.toLowerCase();

		if( typeof searchFor === 'string' ) {
			searchFor = [ searchFor ];
		}

		return searchFor.filter(function( fam ) {
			return family === fam.toLowerCase();
		}).length === 0;
	}).join( ", " );
};

module.exports = removeFontFamily;