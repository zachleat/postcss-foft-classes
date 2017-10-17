import test from "ava";
import stripQuotes from "../src/stripQuotes";
import fontFamilyCleanup from "../src/fontFamilyCleanup";
import isFontFamilyMatch from "../src/isFontFamilyMatch";
import hasFamily from "../src/hasAnyWebFontFamily";
import removeFamily from "../src/removeFontFamily";

test("strip quotes", t => {
	t.is(stripQuotes("Elena"), "Elena");
	t.is(stripQuotes("'Elena'"), "Elena");
	t.is(stripQuotes('"Elena"'), "Elena");
	t.is(stripQuotes("Elena, sans-serif"), "Elena, sans-serif");
	t.is(stripQuotes("'Elena', sans-serif"), "Elena, sans-serif");
	t.is(stripQuotes('"Elena", sans-serif'), "Elena, sans-serif");
});

test("family cleanup", t => {
	t.deepEqual(fontFamilyCleanup("Elena, sans-serif"), ["Elena", "sans-serif"]);
	t.deepEqual(fontFamilyCleanup("'Elena', sans-serif"), ["Elena", "sans-serif"]);
	t.deepEqual(fontFamilyCleanup('"Elena", sans-serif'), ["Elena", "sans-serif"]);
});

test("is match, no quotes", t => {
	t.true(isFontFamilyMatch("Elena, sans-serif", "Elena"));
	t.true(isFontFamilyMatch("Elena, sans-serif", "sans-serif"));
	t.false(isFontFamilyMatch("Elena, sans-serif", "serif"));
	t.false(isFontFamilyMatch("Elena, sans-serif", "Lato"));
});

test("is match, single quotes", t => {
	t.true(isFontFamilyMatch("'Elena', sans-serif", "Elena"));
	t.false(isFontFamilyMatch("'Elena', sans-serif", "Lato"));
});

test("is match, double quotes", t => {
	t.true(isFontFamilyMatch('"Elena", sans-serif', "Elena"));
	t.false(isFontFamilyMatch('"Elena", sans-serif', "Lato"));
});

test("has family: single test class", t => {
	t.true(hasFamily(["Elena"], "Elena, sans-serif"));
	t.false(hasFamily(["Open Sans"], "Elena, sans-serif"));
});

test("has family: multiple test classes", t => {
	t.true(hasFamily(["Elena", "Mija"], "Elena, sans-serif"));
	t.true(hasFamily(["Elena", "Mija"], "Elena, Mija, sans-serif"));
	t.true(hasFamily(["Elena", "Open Sans"], "Elena, sans-serif"));
	t.false(hasFamily(["Lato", "Open Sans"], "Elena, sans-serif"));
});

test("remove family", t => {
	t.is( removeFamily( "Elena", "Elena" ), "" );
	t.is( removeFamily( "Elena, sans-serif", "Elena" ), "sans-serif" );
	t.is( removeFamily( "Elena, Mija, sans-serif", "Mija" ), "Elena, sans-serif" );
});

test("remove multiple families", t => {
	t.is( removeFamily( "Elena, sans-serif", [ "Elena", "sans-serif" ] ), "" );
	t.is( removeFamily( "Elena, Mija, sans-serif", [ "Elena", "Mija" ] ), "sans-serif" );
	t.is( removeFamily( "Lato, Elena, Mija, sans-serif", [ "Elena", "Mija", "sans-serif" ] ), "Lato" );
});