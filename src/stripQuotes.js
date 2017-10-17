function stripQuotes( str ) {
	return str.replace( /"/g, "" ).replace( /'/g, "" );
}

module.exports = stripQuotes;