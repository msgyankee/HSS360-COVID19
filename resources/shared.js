//useful conversions
var mi2km = 1.60934;
var mi2m = 1609.34;
var km2ft = 3280.84;
var m2ft = 3.28084;
var ft2m = 0.3048;
var ft2km = 0.0003048;
var ft2mi = 0.000189394;
var m2mi = 0.000621371;
var mi2ft = 5280;
var km2mi = 0.621371;
var km2m = 1000;

var rad2deg = 180/Math.PI;
var deg2rad = Math.PI/180;

// 'improve' Math.round() to support a second argument
var _round = Math.round;
Math.round = function(number, decimals /* optional, default 0 */) {
  if (arguments.length == 1)
    return _round(number);
  var multiplier = Math.pow(10, decimals);
  return _round(number * multiplier) / multiplier;
}

//adds commas to a numeric value (for display only -- turns it into a string);
function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

//removes commas from a string, allowing it to be parsed as a number
function removeCommas(nStr) {
	return nStr.replace(/,/g, '');
}

//this is just useful -- turning month numbers to names; 1 = January, 12 = December
var monthNames = ["","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

//turn US state abbreviations into verbose names
function state_name(state_abbr) {
	if(typeof state_abbr=="undefined") return false;
	for(var i in state_fips) {
		if(state_fips[i].abbr == state_abbr.toUpperCase()) {
			return state_fips[i].name;
		}
	}
	return "";
}

//turns verbose US state names into abbreviations
function state_abbr(state_name) {	
	for(var i in state_fips) {
		if(state_fips[i].name.toUpperCase() == state_name.toUpperCase()) {
			return state_fips[i].abbr;
		}
	}
	return "";
}

//gets US state FIPS id from state abbreviation
function state_id_from_abbr(state_abbr) {
	for(var i in state_fips) {
		if(state_fips[i].abbr == state_abbr.toUpperCase()) {
			return state_fips[i].id;
		}
	}
	return "";
}

//gets US state FIPS id from verbose state name
function state_id_from_name(state_name) {
	for(var i in state_fips) {
		if(state_fips[i].abbr == state_abbr(state_name).toUpperCase()) {
			return state_fips[i].id;
		}
	}
	return "";
}

//gets US state abbreviation from FIPS id
function state_abbr_from_id(state_id) {
	for(var i in state_fips) {
		if(state_fips[i].id == state_id) {
			return state_fips[i].abbr;
		}
	}
	return "";
}

var state_fips = [
	{id:1,abbr:"AL",name:"Alabama"},
	{id:2,abbr:"AK",name:"Alaska"},
	{id:4,abbr:"AZ",name:"Arizona"},
	{id:5,abbr:"AR",name:"Arkansas"},
	{id:6,abbr:"CA",name:"California"},
	{id:8,abbr:"CO",name:"Colorado"},
	{id:9,abbr:"CT",name:"Connecticut"},
	{id:10,abbr:"DE",name:"Delaware"},
	{id:11,abbr:"DC",name:"District of Columbia"},
	{id:12,abbr:"FL",name:"Florida"},
	{id:13,abbr:"GA",name:"Georgia"},
	{id:15,abbr:"HI",name:"Hawaii"},
	{id:16,abbr:"ID",name:"Idaho"},
	{id:17,abbr:"IL",name:"Illinois"},
	{id:18,abbr:"IN",name:"Indiana"},
	{id:19,abbr:"IA",name:"Iowa"},
	{id:20,abbr:"KS",name:"Kansas"},
	{id:21,abbr:"KY",name:"Kentucky"},
	{id:22,abbr:"LA",name:"Louisiana"},
	{id:23,abbr:"ME",name:"Maine"},
	{id:24,abbr:"MD",name:"Maryland"},
	{id:25,abbr:"MA",name:"Massachusetts"},
	{id:26,abbr:"MI",name:"Michigan"},
	{id:27,abbr:"MN",name:"Minnesota"},
	{id:28,abbr:"MS",name:"Mississippi"},
	{id:29,abbr:"MO",name:"Missouri"},
	{id:30,abbr:"MT",name:"Montana"},
	{id:31,abbr:"NE",name:"Nebraska"},
	{id:32,abbr:"NV",name:"Nevada"},
	{id:33,abbr:"NH",name:"New Hampshire"},
	{id:34,abbr:"NJ",name:"New Jersey"},
	{id:35,abbr:"NM",name:"New Mexico"},
	{id:36,abbr:"NY",name:"New York"},
	{id:37,abbr:"NC",name:"North Carolina"},
	{id:38,abbr:"ND",name:"North Dakota"},
	{id:39,abbr:"OH",name:"Ohio"},
	{id:40,abbr:"OK",name:"Oklahoma"},
	{id:41,abbr:"OR",name:"Oregon"},
	{id:42,abbr:"PA",name:"Pennsylvania"},
	{id:44,abbr:"RI",name:"Rhode Island"},
	{id:45,abbr:"SC",name:"South Carolina"},
	{id:46,abbr:"SD",name:"South Dakota"},
	{id:47,abbr:"TN",name:"Tennessee"},
	{id:48,abbr:"TX",name:"Texas"},
	{id:49,abbr:"UT",name:"Utah"},
	{id:50,abbr:"VT",name:"Vermont"},
	{id:51,abbr:"VA",name:"Virginia"},
	{id:53,abbr:"WA",name:"Washington"},
	{id:54,abbr:"WV",name:"West Virginia"},
	{id:55,abbr:"WI",name:"Wisconsin"},
	{id:56,abbr:"WY",name:"Wyoming"},
	{id:60,abbr:"AS",name:"American Samoa"},
	{id:66,abbr:"GU",name:"Guam"},
	{id:72,abbr:"PR",name:"Puerto Rico"},
	{id:78,abbr:"VI",name:"Virgin Islands"}
]

var iso_3166_1_abbr = [
	{id:4, a2:"AF", a3:"AFG"},
	{id:8, a2:"AL", a3:"ALB"},
	{id:12, a2:"DZ", a3:"DZA"},
	{id:16, a2:"AS", a3:"ASM"},
	{id:20, a2:"AD", a3:"AND"},
	{id:24, a2:"AO", a3:"AGO"},
	{id:660, a2:"AI", a3:"AIA"},
	{id:10, a2:"AQ", a3:"ATA"},
	{id:28, a2:"AG", a3:"ATG"},
	{id:32, a2:"AR", a3:"ARG"},
	{id:51, a2:"AM", a3:"ARM"},
	{id:533, a2:"AW", a3:"ABW"},
	{id:36, a2:"AU", a3:"AUS"},
	{id:40, a2:"AT", a3:"AUT"},
	{id:31, a2:"AZ", a3:"AZE"},
	{id:44, a2:"BS", a3:"BHS"},
	{id:48, a2:"BH", a3:"BHR"},
	{id:50, a2:"BD", a3:"BGD"},
	{id:52, a2:"BB", a3:"BRB"},
	{id:112, a2:"BY", a3:"BLR"},
	{id:56, a2:"BE", a3:"BEL"},
	{id:84, a2:"BZ", a3:"BLZ"},
	{id:204, a2:"BJ", a3:"BEN"},
	{id:60, a2:"BM", a3:"BMU"},
	{id:64, a2:"BT", a3:"BTN"},
	{id:68, a2:"BO", a3:"BOL"},
	{id:70, a2:"BA", a3:"BIH"},
	{id:72, a2:"BW", a3:"BWA"},
	{id:74, a2:"BV", a3:"BVT"},
	{id:76, a2:"BR", a3:"BRA"},
	{id:86, a2:"IO", a3:"IOT"},
	{id:96, a2:"BN", a3:"BRN"},
	{id:100, a2:"BG", a3:"BGR"},
	{id:854, a2:"BF", a3:"BFA"},
	{id:108, a2:"BI", a3:"BDI"},
	{id:116, a2:"KH", a3:"KHM"},
	{id:120, a2:"CM", a3:"CMR"},
	{id:124, a2:"CA", a3:"CAN"},
	{id:132, a2:"CV", a3:"CPV"},
	{id:136, a2:"KY", a3:"CYM"},
	{id:140, a2:"CF", a3:"CAF"},
	{id:148, a2:"TD", a3:"TCD"},
	{id:152, a2:"CL", a3:"CHL"},
	{id:156, a2:"CN", a3:"CHN"},
	{id:162, a2:"CX", a3:"CXR"},
	{id:166, a2:"CC", a3:"CCK"},
	{id:170, a2:"CO", a3:"COL"},
	{id:174, a2:"KM", a3:"COM"},
	{id:178, a2:"CG", a3:"COG"},
	{id:180, a2:"CD", a3:"COD"},
	{id:184, a2:"CK", a3:"COK"},
	{id:188, a2:"CR", a3:"CRI"},
	{id:384, a2:"CI", a3:"CIV"},
	{id:191, a2:"HR", a3:"HRV"},
	{id:192, a2:"CU", a3:"CUB"},
	{id:196, a2:"CY", a3:"CYP"},
	{id:203, a2:"CZ", a3:"CZE"},
	{id:208, a2:"DK", a3:"DNK"},
	{id:262, a2:"DJ", a3:"DJI"},
	{id:212, a2:"DM", a3:"DMA"},
	{id:214, a2:"DO", a3:"DOM"},
	{id:218, a2:"EC", a3:"ECU"},
	{id:818, a2:"EG", a3:"EGY"},
	{id:222, a2:"SV", a3:"SLV"},
	{id:226, a2:"GQ", a3:"GNQ"},
	{id:232, a2:"ER", a3:"ERI"},
	{id:233, a2:"EE", a3:"EST"},
	{id:231, a2:"ET", a3:"ETH"},
	{id:238, a2:"FK", a3:"FLK"},
	{id:234, a2:"FO", a3:"FRO"},
	{id:242, a2:"FJ", a3:"FJI"},
	{id:246, a2:"FI", a3:"FIN"},
	{id:250, a2:"FR", a3:"FRA"},
	{id:254, a2:"GF", a3:"GUF"},
	{id:258, a2:"PF", a3:"PYF"},
	{id:260, a2:"TF", a3:"ATF"},
	{id:266, a2:"GA", a3:"GAB"},
	{id:270, a2:"GM", a3:"GMB"},
	{id:268, a2:"GE", a3:"GEO"},
	{id:276, a2:"DE", a3:"DEU"},
	{id:288, a2:"GH", a3:"GHA"},
	{id:292, a2:"GI", a3:"GIB"},
	{id:300, a2:"GR", a3:"GRC"},
	{id:304, a2:"GL", a3:"GRL"},
	{id:308, a2:"GD", a3:"GRD"},
	{id:312, a2:"GP", a3:"GLP"},
	{id:316, a2:"GU", a3:"GUM"},
	{id:320, a2:"GT", a3:"GTM"},
	{id:831, a2:"GG", a3:"GGY"},
	{id:324, a2:"GN", a3:"GIN"},
	{id:624, a2:"GW", a3:"GNB"},
	{id:328, a2:"GY", a3:"GUY"},
	{id:332, a2:"HT", a3:"HTI"},
	{id:334, a2:"HM", a3:"HMD"},
	{id:336, a2:"VA", a3:"VAT"},
	{id:340, a2:"HN", a3:"HND"},
	{id:344, a2:"HK", a3:"HKG"},
	{id:348, a2:"HU", a3:"HUN"},
	{id:352, a2:"IS", a3:"ISL"},
	{id:356, a2:"IN", a3:"IND"},
	{id:360, a2:"ID", a3:"IDN"},
	{id:364, a2:"IR", a3:"IRN"},
	{id:368, a2:"IQ", a3:"IRQ"},
	{id:372, a2:"IE", a3:"IRL"},
	{id:833, a2:"IM", a3:"IMN"},
	{id:376, a2:"IL", a3:"ISR"},
	{id:380, a2:"IT", a3:"ITA"},
	{id:388, a2:"JM", a3:"JAM"},
	{id:392, a2:"JP", a3:"JPN"},
	{id:832, a2:"JE", a3:"JEY"},
	{id:400, a2:"JO", a3:"JOR"},
	{id:398, a2:"KZ", a3:"KAZ"},
	{id:404, a2:"KE", a3:"KEN"},
	{id:296, a2:"KI", a3:"KIR"},
	{id:408, a2:"KP", a3:"PRK"},
	{id:410, a2:"KR", a3:"KOR"},
	{id:414, a2:"KW", a3:"KWT"},
	{id:417, a2:"KG", a3:"KGZ"},
	{id:418, a2:"LA", a3:"LAO"},
	{id:428, a2:"LV", a3:"LVA"},
	{id:422, a2:"LB", a3:"LBN"},
	{id:426, a2:"LS", a3:"LSO"},
	{id:430, a2:"LR", a3:"LBR"},
	{id:434, a2:"LY", a3:"LBY"},
	{id:438, a2:"LI", a3:"LIE"},
	{id:440, a2:"LT", a3:"LTU"},
	{id:442, a2:"LU", a3:"LUX"},
	{id:446, a2:"MO", a3:"MAC"},
	{id:807, a2:"MK", a3:"MKD"},
	{id:450, a2:"MG", a3:"MDG"},
	{id:454, a2:"MW", a3:"MWI"},
	{id:458, a2:"MY", a3:"MYS"},
	{id:462, a2:"MV", a3:"MDV"},
	{id:466, a2:"ML", a3:"MLI"},
	{id:470, a2:"MT", a3:"MLT"},
	{id:584, a2:"MH", a3:"MHL"},
	{id:474, a2:"MQ", a3:"MTQ"},
	{id:478, a2:"MR", a3:"MRT"},
	{id:480, a2:"MU", a3:"MUS"},
	{id:175, a2:"YT", a3:"MYT"},
	{id:484, a2:"MX", a3:"MEX"},
	{id:583, a2:"FM", a3:"FSM"},
	{id:498, a2:"MD", a3:"MDA"},
	{id:492, a2:"MC", a3:"MCO"},
	{id:496, a2:"MN", a3:"MNG"},
	{id:499, a2:"ME", a3:"MNE"},
	{id:500, a2:"MS", a3:"MSR"},
	{id:504, a2:"MA", a3:"MAR"},
	{id:508, a2:"MZ", a3:"MOZ"},
	{id:104, a2:"MM", a3:"MMR"},
	{id:516, a2:"NA", a3:"NAM"},
	{id:520, a2:"NR", a3:"NRU"},
	{id:524, a2:"NP", a3:"NPL"},
	{id:528, a2:"NL", a3:"NLD"},
	{id:530, a2:"AN", a3:"ANT"},
	{id:540, a2:"NC", a3:"NCL"},
	{id:554, a2:"NZ", a3:"NZL"},
	{id:558, a2:"NI", a3:"NIC"},
	{id:562, a2:"NE", a3:"NER"},
	{id:566, a2:"NG", a3:"NGA"},
	{id:570, a2:"NU", a3:"NIU"},
	{id:574, a2:"NF", a3:"NFK"},
	{id:580, a2:"MP", a3:"MNP"},
	{id:578, a2:"NO", a3:"NOR"},
	{id:512, a2:"OM", a3:"OMN"},
	{id:586, a2:"PK", a3:"PAK"},
	{id:585, a2:"PW", a3:"PLW"},
	{id:275, a2:"PS", a3:"PSE"},
	{id:591, a2:"PA", a3:"PAN"},
	{id:598, a2:"PG", a3:"PNG"},
	{id:600, a2:"PY", a3:"PRY"},
	{id:604, a2:"PE", a3:"PER"},
	{id:608, a2:"PH", a3:"PHL"},
	{id:612, a2:"PN", a3:"PCN"},
	{id:616, a2:"PL", a3:"POL"},
	{id:620, a2:"PT", a3:"PRT"},
	{id:630, a2:"PR", a3:"PRI"},
	{id:634, a2:"QA", a3:"QAT"},
	{id:638, a2:"RE", a3:"REU"},
	{id:642, a2:"RO", a3:"ROU"},
	{id:643, a2:"RU", a3:"RUS"},
	{id:646, a2:"RW", a3:"RWA"},
	{id:654, a2:"SH", a3:"SHN"},
	{id:659, a2:"KN", a3:"KNA"},
	{id:662, a2:"LC", a3:"LCA"},
	{id:666, a2:"PM", a3:"SPM"},
	{id:670, a2:"VC", a3:"VCT"},
	{id:882, a2:"WS", a3:"WSM"},
	{id:674, a2:"SM", a3:"SMR"},
	{id:678, a2:"ST", a3:"STP"},
	{id:682, a2:"SA", a3:"SAU"},
	{id:686, a2:"SN", a3:"SEN"},
	{id:688, a2:"RS", a3:"SRB"},
	{id:690, a2:"SC", a3:"SYC"},
	{id:694, a2:"SL", a3:"SLE"},
	{id:702, a2:"SG", a3:"SGP"},
	{id:703, a2:"SK", a3:"SVK"},
	{id:705, a2:"SI", a3:"SVN"},
	{id:90, a2:"SB", a3:"SLB"},
	{id:706, a2:"SO", a3:"SOM"},
	{id:710, a2:"ZA", a3:"ZAF"},
	{id:239, a2:"GS", a3:"SGS"},
	{id:724, a2:"ES", a3:"ESP"},
	{id:144, a2:"LK", a3:"LKA"},
	{id:736, a2:"SD", a3:"SDN"},
	{id:740, a2:"SR", a3:"SUR"},
	{id:744, a2:"SJ", a3:"SJM"},
	{id:748, a2:"SZ", a3:"SWZ"},
	{id:752, a2:"SE", a3:"SWE"},
	{id:756, a2:"CH", a3:"CHE"},
	{id:760, a2:"SY", a3:"SYR"},
	{id:158, a2:"TW", a3:"TWN"},
	{id:762, a2:"TJ", a3:"TJK"},
	{id:834, a2:"TZ", a3:"TZA"},
	{id:764, a2:"TH", a3:"THA"},
	{id:626, a2:"TL", a3:"TLS"},
	{id:768, a2:"TG", a3:"TGO"},
	{id:772, a2:"TK", a3:"TKL"},
	{id:776, a2:"TO", a3:"TON"},
	{id:780, a2:"TT", a3:"TTO"},
	{id:788, a2:"TN", a3:"TUN"},
	{id:792, a2:"TR", a3:"TUR"},
	{id:795, a2:"TM", a3:"TKM"},
	{id:796, a2:"TC", a3:"TCA"},
	{id:798, a2:"TV", a3:"TUV"},
	{id:800, a2:"UG", a3:"UGA"},
	{id:804, a2:"UA", a3:"UKR"},
	{id:784, a2:"AE", a3:"ARE"},
	{id:826, a2:"GB", a3:"GBR"},
	{id:840, a2:"US", a3:"USA"},
	{id:581, a2:"UM", a3:"UMI"},
	{id:858, a2:"UY", a3:"URY"},
	{id:860, a2:"UZ", a3:"UZB"},
	{id:548, a2:"VU", a3:"VUT"},
	{id:862, a2:"VE", a3:"VEN"},
	{id:704, a2:"VN", a3:"VNM"},
	{id:92, a2:"VG", a3:"VGB"},
	{id:850, a2:"VI", a3:"VIR"},
	{id:876, a2:"WF", a3:"WLF"},
	{id:732, a2:"EH", a3:"ESH"},
	{id:887, a2:"YE", a3:"YEM"},
	{id:894, a2:"ZM", a3:"ZMB"},
	{id:716, a2:"ZW", a3:"ZWE"},
	{id:-99, a2:"KO", a3:"KOS"},
	{id:728, a2:"SS", a3:"SSD"},
	{id:729, a2:"SD", a3:"SDN"},
	{id:275, a2:"PS", a3:"PSE"},
];

var iso_3166_1 = [
	{id:-99, name:"Kosovo"},
	{id:4, name:"Afghanistan"},
	{id:8, name:"Albania"},
	{id:10, name:"Antarctica"},
	{id:12, name:"Algeria"},
	{id:16, name:"American Samoa"},
	{id:20, name:"Andorra"},
	{id:24, name:"Angola"},
	{id:28, name:"Antigua and Barbuda"},
	{id:31, name:"Azerbaijan"},
	{id:32, name:"Argentina"},
	{id:36, name:"Australia"},
	{id:40, name:"Austria"},
	{id:44, name:"Bahamas"},
	{id:48, name:"Bahrain"},
	{id:50, name:"Bangladesh"},
	{id:51, name:"Armenia"},
	{id:52, name:"Barbados"},
	{id:56, name:"Belgium"},
	{id:60, name:"Bermuda"},
	{id:64, name:"Bhutan"},
	{id:68, name:"Bolivia"},
	{id:68, name:"Bolivia, Plurinational State of"},
	{id:70, name:"Bosnia and Herzegovina"},
	{id:72, name:"Botswana"},
	{id:74, name:"Bouvet Island"},
	{id:76, name:"Brazil"},
	{id:84, name:"Belize"},
	{id:86, name:"British Indian Ocean Territory"},
	{id:90, name:"Solomon Islands"},
	{id:92, name:"Virgin Islands, British"},
	{id:96, name:"Brunei Darussalam"},
	{id:100, name:"Bulgaria"},
	{id:104, name:"Myanmar"},
	{id:108, name:"Burundi"},
	{id:112, name:"Belarus"},
	{id:116, name:"Cambodia"},
	{id:120, name:"Cameroon"},
	{id:124, name:"Canada"},
	{id:132, name:"Cabo Verde"},
	{id:136, name:"Cayman Islands"},
	{id:140, name:"Central African Republic"},
	{id:144, name:"Sri Lanka"},
	{id:148, name:"Chad"},
	{id:152, name:"Chile"},
	{id:156, name:"China"},
	{id:158, name:"Taiwan, Province of China"},
	{id:162, name:"Christmas Island"},
	{id:166, name:"Cocos (Keeling) Islands"},
	{id:170, name:"Colombia"},
	{id:174, name:"Comoros"},
	{id:175, name:"Mayotte"},
	{id:178, name:"Congo"},
	{id:180, name:"Congo, the Democratic Republic of the"},
	{id:180, name:"Democratic Republic of the Congo"},
	{id:184, name:"Cook Islands"},
	{id:188, name:"Costa Rica"},
	{id:191, name:"Croatia"},
	{id:192, name:"Cuba"},
	{id:196, name:"Cyprus"},
	{id:203, name:"Czech Republic"},
	{id:204, name:"Benin"},
	{id:208, name:"Denmark"},
	{id:212, name:"Dominica"},
	{id:214, name:"Dominican Republic"},
	{id:218, name:"Ecuador"},
	{id:222, name:"El Salvador"},
	{id:226, name:"Equatorial Guinea"},
	{id:231, name:"Ethiopia"},
	{id:232, name:"Eritrea"},
	{id:233, name:"Estonia"},
	{id:234, name:"Faroe Islands"},
	{id:238, name:"Falkland Islands (Malvinas)"},
	{id:238, name:"Malvinas"},
	{id:238, name:"Falkland Islands"},
	{id:239, name:"South Georgia and the South Sandwich Islands"},
	{id:242, name:"Fiji"},
	{id:246, name:"Finland"},
	{id:248, name:"Åland Islands"},
	{id:250, name:"France"},
	{id:254, name:"French Guiana"},
	{id:258, name:"French Polynesia"},
	{id:260, name:"French Southern Territories"},
	{id:262, name:"Djibouti"},
	{id:266, name:"Gabon"},
	{id:268, name:"Georgia"},
	{id:270, name:"Gambia"},
	{id:275, name:"Palestine, State of"},
	{id:275, name:"Palestine"},
	{id:276, name:"Germany"},
	{id:288, name:"Ghana"},
	{id:292, name:"Gibraltar"},
	{id:296, name:"Kiribati"},
	{id:300, name:"Greece"},
	{id:304, name:"Greenland"},
	{id:308, name:"Grenada"},
	{id:312, name:"Guadeloupe"},
	{id:316, name:"Guam"},
	{id:320, name:"Guatemala"},
	{id:324, name:"Guinea"},
	{id:328, name:"Guyana"},
	{id:332, name:"Haiti"},
	{id:334, name:"Heard Island and McDonald Islands"},
	{id:336, name:"Holy See (Vatican City State)"},
	{id:336, name:"Vatican City"},
	{id:340, name:"Honduras"},
	{id:344, name:"Hong Kong"},
	{id:348, name:"Hungary"},
	{id:352, name:"Iceland"},
	{id:356, name:"India"},
	{id:360, name:"Indonesia"},
	{id:364, name:"Iran, Islamic Republic of"},
	{id:364, name:"Iran"},
	{id:368, name:"Iraq"},
	{id:372, name:"Ireland"},
	{id:376, name:"Israel"},
	{id:380, name:"Italy"},
	{id:384, name:"Côte d'Ivoire"},
	{id:388, name:"Jamaica"},
	{id:392, name:"Japan"},
	{id:398, name:"Kazakhstan"},
	{id:400, name:"Jordan"},
	{id:404, name:"Kenya"},
	{id:408, name:"Korea, Democratic People's Republic of"},
	{id:410, name:"Korea, Republic of"},
	{id:408, name:"North Korea"},
	{id:410, name:"South Korea"},
	{id:414, name:"Kuwait"},
	{id:417, name:"Kyrgyzstan"},
	{id:418, name:"Lao People's Democratic Republic"},
	{id:422, name:"Lebanon"},
	{id:426, name:"Lesotho"},
	{id:428, name:"Latvia"},
	{id:430, name:"Liberia"},
	{id:434, name:"Libya"},
	{id:438, name:"Liechtenstein"},
	{id:440, name:"Lithuania"},
	{id:442, name:"Luxembourg"},
	{id:446, name:"Macao"},
	{id:450, name:"Madagascar"},
	{id:454, name:"Malawi"},
	{id:458, name:"Malaysia"},
	{id:462, name:"Maldives"},
	{id:466, name:"Mali"},
	{id:470, name:"Malta"},
	{id:474, name:"Martinique"},
	{id:478, name:"Mauritania"},
	{id:480, name:"Mauritius"},
	{id:484, name:"Mexico"},
	{id:492, name:"Monaco"},
	{id:496, name:"Mongolia"},
	{id:498, name:"Moldova, Republic of"},
	{id:498, name:"Moldova"},
	{id:499, name:"Montenegro"},
	{id:500, name:"Montserrat"},
	{id:504, name:"Morocco"},
	{id:508, name:"Mozambique"},
	{id:512, name:"Oman"},
	{id:516, name:"Namibia"},
	{id:520, name:"Nauru"},
	{id:524, name:"Nepal"},
	{id:528, name:"Netherlands"},
	{id:531, name:"Curaçao"},
	{id:533, name:"Aruba"},
	{id:534, name:"Sint Maarten (Dutch part)"},
	{id:534, name:"Sint Maarten"},
	{id:535, name:"Bonaire, Sint Eustatius and Saba"},
	{id:540, name:"New Caledonia"},
	{id:548, name:"Vanuatu"},
	{id:554, name:"New Zealand"},
	{id:558, name:"Nicaragua"},
	{id:562, name:"Niger"},
	{id:566, name:"Nigeria"},
	{id:570, name:"Niue"},
	{id:574, name:"Norfolk Island"},
	{id:578, name:"Norway"},
	{id:580, name:"Northern Mariana Islands"},
	{id:581, name:"United States Minor Outlying Islands"},
	{id:583, name:"Micronesia, Federated States of"},
	{id:583, name:"Micronesia"},
	{id:584, name:"Marshall Islands"},
	{id:585, name:"Palau"},
	{id:586, name:"Pakistan"},
	{id:591, name:"Panama"},
	{id:598, name:"Papua New Guinea"},
	{id:600, name:"Paraguay"},
	{id:604, name:"Peru"},
	{id:608, name:"Philippines"},
	{id:612, name:"Pitcairn"},
	{id:616, name:"Poland"},
	{id:620, name:"Portugal"},
	{id:624, name:"Guinea-Bissau"},
	{id:626, name:"Timor-Leste"},
	{id:630, name:"Puerto Rico"},
	{id:634, name:"Qatar"},
	{id:638, name:"Réunion"},
	{id:642, name:"Romania"},
	{id:643, name:"Russian Federation"},
	{id:643, name:"Russia"},
	{id:646, name:"Rwanda"},
	{id:652, name:"Saint Barthélemy"},
	{id:654, name:"Saint Helena, Ascension and Tristan da Cunha"},
	{id:659, name:"Saint Kitts and Nevis"},
	{id:660, name:"Anguilla"},
	{id:662, name:"Saint Lucia"},
	{id:663, name:"Saint Martin (French part)"},
	{id:663, name:"Saint Martin"},
	{id:666, name:"Saint Pierre and Miquelon"},
	{id:670, name:"Saint Vincent and the Grenadines"},
	{id:674, name:"San Marino"},
	{id:678, name:"Sao Tome and Principe"},
	{id:682, name:"Saudi Arabia"},
	{id:686, name:"Senegal"},
	{id:688, name:"Serbia"},
	{id:690, name:"Seychelles"},
	{id:694, name:"Sierra Leone"},
	{id:702, name:"Singapore"},
	{id:703, name:"Slovakia"},
	{id:704, name:"Viet Nam"},
	{id:705, name:"Slovenia"},
	{id:706, name:"Somalia"},
	{id:710, name:"South Africa"},
	{id:716, name:"Zimbabwe"},
	{id:724, name:"Spain"},
	{id:728, name:"South Sudan"},
	{id:729, name:"Sudan"},
	{id:732, name:"Western Sahara"},
	{id:740, name:"Suriname"},
	{id:744, name:"Svalbard and Jan Mayen"},
	{id:748, name:"Swaziland"},
	{id:752, name:"Sweden"},
	{id:756, name:"Switzerland"},
	{id:760, name:"Syrian Arab Republic"},
	{id:760, name:"Syria"},
	{id:762, name:"Tajikistan"},
	{id:764, name:"Thailand"},
	{id:768, name:"Togo"},
	{id:772, name:"Tokelau"},
	{id:776, name:"Tonga"},
	{id:780, name:"Trinidad and Tobago"},
	{id:784, name:"United Arab Emirates"},
	{id:784, name:"UAE"},
	{id:788, name:"Tunisia"},
	{id:792, name:"Turkey"},
	{id:795, name:"Turkmenistan"},
	{id:796, name:"Turks and Caicos Islands"},
	{id:798, name:"Tuvalu"},
	{id:800, name:"Uganda"},
	{id:804, name:"Ukraine"},
	{id:807, name:"Macedonia, the former Yugoslav Republic of"},
	{id:807, name:"Macedonia"},
	{id:818, name:"Egypt"},
	{id:826, name:"United Kingdom"},
	{id:831, name:"Guernsey"},
	{id:832, name:"Jersey"},
	{id:833, name:"Isle of Man"},
	{id:834, name:"Tanzania, United Republic of"},
	{id:834, name:"Tanzania"},
	{id:840, name:"United States"},
	{id:840, name:"United States of America"},
	{id:840, name:"USA"},
	{id:850, name:"Virgin Islands, U.S."},
	{id:850, name:"Virgin Islands"},
	{id:854, name:"Burkina Faso"},
	{id:858, name:"Uruguay"},
	{id:860, name:"Uzbekistan"},
	{id:862, name:"Venezuela, Bolivarian Republic of"},
	{id:862, name:"Venezuela"},
	{id:876, name:"Wallis and Futuna"},
	{id:882, name:"Samoa"},
	{id:887, name:"Yemen"},
	{id:894, name:"Zambia"}
];

var county_fips = [{id:"01001",name:"Autauga County"}, {id:"01003",name:"Baldwin County"}, {id:"01005",name:"Barbour County"}, {id:"01007",name:"Bibb County"}, {id:"01009",name:"Blount County"}, {id:"01011",name:"Bullock County"}, {id:"01013",name:"Butler County"}, {id:"01015",name:"Calhoun County"}, {id:"01017",name:"Chambers County"}, {id:"01019",name:"Cherokee County"}, {id:"01021",name:"Chilton County"}, {id:"01023",name:"Choctaw County"}, {id:"01025",name:"Clarke County"}, {id:"01027",name:"Clay County"}, {id:"01029",name:"Cleburne County"}, {id:"01031",name:"Coffee County"}, {id:"01033",name:"Colbert County"}, {id:"01035",name:"Conecuh County"}, {id:"01037",name:"Coosa County"}, {id:"01039",name:"Covington County"}, {id:"01041",name:"Crenshaw County"}, {id:"01043",name:"Cullman County"}, {id:"01045",name:"Dale County"}, {id:"01047",name:"Dallas County"}, {id:"01049",name:"DeKalb County"}, {id:"01051",name:"Elmore County"}, {id:"01053",name:"Escambia County"}, {id:"01055",name:"Etowah County"}, {id:"01057",name:"Fayette County"}, {id:"01059",name:"Franklin County"}, {id:"01061",name:"Geneva County"}, {id:"01063",name:"Greene County"}, {id:"01065",name:"Hale County"}, {id:"01067",name:"Henry County"}, {id:"01069",name:"Houston County"}, {id:"01071",name:"Jackson County"}, {id:"01073",name:"Jefferson County"}, {id:"01075",name:"Lamar County"}, {id:"01077",name:"Lauderdale County"}, {id:"01079",name:"Lawrence County"}, {id:"01081",name:"Lee County"}, {id:"01083",name:"Limestone County"}, {id:"01085",name:"Lowndes County"}, {id:"01087",name:"Macon County"}, {id:"01089",name:"Madison County"}, {id:"01091",name:"Marengo County"}, {id:"01093",name:"Marion County"}, {id:"01095",name:"Marshall County"}, {id:"01097",name:"Mobile County"}, {id:"01099",name:"Monroe County"}, {id:"01101",name:"Montgomery County"}, {id:"01103",name:"Morgan County"}, {id:"01105",name:"Perry County"}, {id:"01107",name:"Pickens County"}, {id:"01109",name:"Pike County"}, {id:"01111",name:"Randolph County"}, {id:"01113",name:"Russell County"}, {id:"01115",name:"St. Clair County"}, {id:"01117",name:"Shelby County"}, {id:"01119",name:"Sumter County"}, {id:"01121",name:"Talladega County"}, {id:"01123",name:"Tallapoosa County"}, {id:"01125",name:"Tuscaloosa County"}, {id:"01127",name:"Walker County"}, {id:"01129",name:"Washington County"}, {id:"01131",name:"Wilcox County"}, {id:"01133",name:"Winston County"}, {id:"02013",name:"Aleutians East Borough"}, {id:"02016",name:"Aleutians West Census Area"}, {id:"02020",name:"Anchorage Municipality"}, {id:"02050",name:"Bethel Census Area"}, {id:"02060",name:"Bristol Bay Borough"}, {id:"02068",name:"Denali Borough"}, {id:"02070",name:"Dillingham Census Area"}, {id:"02090",name:"Fairbanks North Star Borough"}, {id:"02100",name:"Haines Borough"}, {id:"02105",name:"Hoonah-Angoon Census Area"}, {id:"02110",name:"Juneau City and Borough"}, {id:"02122",name:"Kenai Peninsula Borough"}, {id:"02130",name:"Ketchikan Gateway Borough"}, {id:"02150",name:"Kodiak Island Borough"}, {id:"02164",name:"Lake and Peninsula Borough"}, {id:"02170",name:"Matanuska-Susitna Borough"}, {id:"02180",name:"Nome Census Area"}, {id:"02185",name:"North Slope Borough"}, {id:"02188",name:"Northwest Arctic Borough"}, {id:"02195",name:"Petersburg Census Area"}, {id:"02198",name:"Prince of Wales-Hyder Census Area"}, {id:"02220",name:"Sitka City and Borough"}, {id:"02230",name:"Skagway Municipality"}, {id:"02240",name:"Southeast Fairbanks Census Area"}, {id:"02261",name:"Valdez-Cordova Census Area"}, {id:"02270",name:"Wade Hampton Census Area"}, {id:"02275",name:"Wrangell City and Borough"}, {id:"02282",name:"Yakutat City and Borough"}, {id:"02290",name:"Yukon-Koyukuk Census Area"}, {id:"04001",name:"Apache County"}, {id:"04003",name:"Cochise County"}, {id:"04005",name:"Coconino County"}, {id:"04007",name:"Gila County"}, {id:"04009",name:"Graham County"}, {id:"04011",name:"Greenlee County"}, {id:"04012",name:"La Paz County"}, {id:"04013",name:"Maricopa County"}, {id:"04015",name:"Mohave County"}, {id:"04017",name:"Navajo County"}, {id:"04019",name:"Pima County"}, {id:"04021",name:"Pinal County"}, {id:"04023",name:"Santa Cruz County"}, {id:"04025",name:"Yavapai County"}, {id:"04027",name:"Yuma County"}, {id:"05001",name:"Arkansas County"}, {id:"05003",name:"Ashley County"}, {id:"05005",name:"Baxter County"}, {id:"05007",name:"Benton County"}, {id:"05009",name:"Boone County"}, {id:"05011",name:"Bradley County"}, {id:"05013",name:"Calhoun County"}, {id:"05015",name:"Carroll County"}, {id:"05017",name:"Chicot County"}, {id:"05019",name:"Clark County"}, {id:"05021",name:"Clay County"}, {id:"05023",name:"Cleburne County"}, {id:"05025",name:"Cleveland County"}, {id:"05027",name:"Columbia County"}, {id:"05029",name:"Conway County"}, {id:"05031",name:"Craighead County"}, {id:"05033",name:"Crawford County"}, {id:"05035",name:"Crittenden County"}, {id:"05037",name:"Cross County"}, {id:"05039",name:"Dallas County"}, {id:"05041",name:"Desha County"}, {id:"05043",name:"Drew County"}, {id:"05045",name:"Faulkner County"}, {id:"05047",name:"Franklin County"}, {id:"05049",name:"Fulton County"}, {id:"05051",name:"Garland County"}, {id:"05053",name:"Grant County"}, {id:"05055",name:"Greene County"}, {id:"05057",name:"Hempstead County"}, {id:"05059",name:"Hot Spring County"}, {id:"05061",name:"Howard County"}, {id:"05063",name:"Independence County"}, {id:"05065",name:"Izard County"}, {id:"05067",name:"Jackson County"}, {id:"05069",name:"Jefferson County"}, {id:"05071",name:"Johnson County"}, {id:"05073",name:"Lafayette County"}, {id:"05075",name:"Lawrence County"}, {id:"05077",name:"Lee County"}, {id:"05079",name:"Lincoln County"}, {id:"05081",name:"Little River County"}, {id:"05083",name:"Logan County"}, {id:"05085",name:"Lonoke County"}, {id:"05087",name:"Madison County"}, {id:"05089",name:"Marion County"}, {id:"05091",name:"Miller County"}, {id:"05093",name:"Mississippi County"}, {id:"05095",name:"Monroe County"}, {id:"05097",name:"Montgomery County"}, {id:"05099",name:"Nevada County"}, {id:"05101",name:"Newton County"}, {id:"05103",name:"Ouachita County"}, {id:"05105",name:"Perry County"}, {id:"05107",name:"Phillips County"}, {id:"05109",name:"Pike County"}, {id:"05111",name:"Poinsett County"}, {id:"05113",name:"Polk County"}, {id:"05115",name:"Pope County"}, {id:"05117",name:"Prairie County"}, {id:"05119",name:"Pulaski County"}, {id:"05121",name:"Randolph County"}, {id:"05123",name:"St. Francis County"}, {id:"05125",name:"Saline County"}, {id:"05127",name:"Scott County"}, {id:"05129",name:"Searcy County"}, {id:"05131",name:"Sebastian County"}, {id:"05133",name:"Sevier County"}, {id:"05135",name:"Sharp County"}, {id:"05137",name:"Stone County"}, {id:"05139",name:"Union County"}, {id:"05141",name:"Van Buren County"}, {id:"05143",name:"Washington County"}, {id:"05145",name:"White County"}, {id:"05147",name:"Woodruff County"}, {id:"05149",name:"Yell County"}, {id:"06001",name:"Alameda County"}, {id:"06003",name:"Alpine County"}, {id:"06005",name:"Amador County"}, {id:"06007",name:"Butte County"}, {id:"06009",name:"Calaveras County"}, {id:"06011",name:"Colusa County"}, {id:"06013",name:"Contra Costa County"}, {id:"06015",name:"Del Norte County"}, {id:"06017",name:"El Dorado County"}, {id:"06019",name:"Fresno County"}, {id:"06021",name:"Glenn County"}, {id:"06023",name:"Humboldt County"}, {id:"06025",name:"Imperial County"}, {id:"06027",name:"Inyo County"}, {id:"06029",name:"Kern County"}, {id:"06031",name:"Kings County"}, {id:"06033",name:"Lake County"}, {id:"06035",name:"Lassen County"}, {id:"06037",name:"Los Angeles County"}, {id:"06039",name:"Madera County"}, {id:"06041",name:"Marin County"}, {id:"06043",name:"Mariposa County"}, {id:"06045",name:"Mendocino County"}, {id:"06047",name:"Merced County"}, {id:"06049",name:"Modoc County"}, {id:"06051",name:"Mono County"}, {id:"06053",name:"Monterey County"}, {id:"06055",name:"Napa County"}, {id:"06057",name:"Nevada County"}, {id:"06059",name:"Orange County"}, {id:"06061",name:"Placer County"}, {id:"06063",name:"Plumas County"}, {id:"06065",name:"Riverside County"}, {id:"06067",name:"Sacramento County"}, {id:"06069",name:"San Benito County"}, {id:"06071",name:"San Bernardino County"}, {id:"06073",name:"San Diego County"}, {id:"06075",name:"San Francisco County"}, {id:"06077",name:"San Joaquin County"}, {id:"06079",name:"San Luis Obispo County"}, {id:"06081",name:"San Mateo County"}, {id:"06083",name:"Santa Barbara County"}, {id:"06085",name:"Santa Clara County"}, {id:"06087",name:"Santa Cruz County"}, {id:"06089",name:"Shasta County"}, {id:"06091",name:"Sierra County"}, {id:"06093",name:"Siskiyou County"}, {id:"06095",name:"Solano County"}, {id:"06097",name:"Sonoma County"}, {id:"06099",name:"Stanislaus County"}, {id:"06101",name:"Sutter County"}, {id:"06103",name:"Tehama County"}, {id:"06105",name:"Trinity County"}, {id:"06107",name:"Tulare County"}, {id:"06109",name:"Tuolumne County"}, {id:"06111",name:"Ventura County"}, {id:"06113",name:"Yolo County"}, {id:"06115",name:"Yuba County"}, {id:"08001",name:"Adams County"}, {id:"08003",name:"Alamosa County"}, {id:"08005",name:"Arapahoe County"}, {id:"08007",name:"Archuleta County"}, {id:"08009",name:"Baca County"}, {id:"08011",name:"Bent County"}, {id:"08013",name:"Boulder County"}, {id:"08014",name:"Broomfield County"}, {id:"08015",name:"Chaffee County"}, {id:"08017",name:"Cheyenne County"}, {id:"08019",name:"Clear Creek County"}, {id:"08021",name:"Conejos County"}, {id:"08023",name:"Costilla County"}, {id:"08025",name:"Crowley County"}, {id:"08027",name:"Custer County"}, {id:"08029",name:"Delta County"}, {id:"08031",name:"Denver County"}, {id:"08033",name:"Dolores County"}, {id:"08035",name:"Douglas County"}, {id:"08037",name:"Eagle County"}, {id:"08039",name:"Elbert County"}, {id:"08041",name:"El Paso County"}, {id:"08043",name:"Fremont County"}, {id:"08045",name:"Garfield County"}, {id:"08047",name:"Gilpin County"}, {id:"08049",name:"Grand County"}, {id:"08051",name:"Gunnison County"}, {id:"08053",name:"Hinsdale County"}, {id:"08055",name:"Huerfano County"}, {id:"08057",name:"Jackson County"}, {id:"08059",name:"Jefferson County"}, {id:"08061",name:"Kiowa County"}, {id:"08063",name:"Kit Carson County"}, {id:"08065",name:"Lake County"}, {id:"08067",name:"La Plata County"}, {id:"08069",name:"Larimer County"}, {id:"08071",name:"Las Animas County"}, {id:"08073",name:"Lincoln County"}, {id:"08075",name:"Logan County"}, {id:"08077",name:"Mesa County"}, {id:"08079",name:"Mineral County"}, {id:"08081",name:"Moffat County"}, {id:"08083",name:"Montezuma County"}, {id:"08085",name:"Montrose County"}, {id:"08087",name:"Morgan County"}, {id:"08089",name:"Otero County"}, {id:"08091",name:"Ouray County"}, {id:"08093",name:"Park County"}, {id:"08095",name:"Phillips County"}, {id:"08097",name:"Pitkin County"}, {id:"08099",name:"Prowers County"}, {id:"08101",name:"Pueblo County"}, {id:"08103",name:"Rio Blanco County"}, {id:"08105",name:"Rio Grande County"}, {id:"08107",name:"Routt County"}, {id:"08109",name:"Saguache County"}, {id:"08111",name:"San Juan County"}, {id:"08113",name:"San Miguel County"}, {id:"08115",name:"Sedgwick County"}, {id:"08117",name:"Summit County"}, {id:"08119",name:"Teller County"}, {id:"08121",name:"Washington County"}, {id:"08123",name:"Weld County"}, {id:"08125",name:"Yuma County"}, {id:"09001",name:"Fairfield County"}, {id:"09003",name:"Hartford County"}, {id:"09005",name:"Litchfield County"}, {id:"09007",name:"Middlesex County"}, {id:"09009",name:"New Haven County"}, {id:"09011",name:"New London County"}, {id:"09013",name:"Tolland County"}, {id:"09015",name:"Windham County"}, {id:"10001",name:"Kent County"}, {id:"10003",name:"New Castle County"}, {id:"10005",name:"Sussex County"}, {id:"11001",name:"District of Columbia"}, {id:"12001",name:"Alachua County"}, {id:"12003",name:"Baker County"}, {id:"12005",name:"Bay County"}, {id:"12007",name:"Bradford County"}, {id:"12009",name:"Brevard County"}, {id:"12011",name:"Broward County"}, {id:"12013",name:"Calhoun County"}, {id:"12015",name:"Charlotte County"}, {id:"12017",name:"Citrus County"}, {id:"12019",name:"Clay County"}, {id:"12021",name:"Collier County"}, {id:"12023",name:"Columbia County"}, {id:"12027",name:"DeSoto County"}, {id:"12029",name:"Dixie County"}, {id:"12031",name:"Duval County"}, {id:"12033",name:"Escambia County"}, {id:"12035",name:"Flagler County"}, {id:"12037",name:"Franklin County"}, {id:"12039",name:"Gadsden County"}, {id:"12041",name:"Gilchrist County"}, {id:"12043",name:"Glades County"}, {id:"12045",name:"Gulf County"}, {id:"12047",name:"Hamilton County"}, {id:"12049",name:"Hardee County"}, {id:"12051",name:"Hendry County"}, {id:"12053",name:"Hernando County"}, {id:"12055",name:"Highlands County"}, {id:"12057",name:"Hillsborough County"}, {id:"12059",name:"Holmes County"}, {id:"12061",name:"Indian River County"}, {id:"12063",name:"Jackson County"}, {id:"12065",name:"Jefferson County"}, {id:"12067",name:"Lafayette County"}, {id:"12069",name:"Lake County"}, {id:"12071",name:"Lee County"}, {id:"12073",name:"Leon County"}, {id:"12075",name:"Levy County"}, {id:"12077",name:"Liberty County"}, {id:"12079",name:"Madison County"}, {id:"12081",name:"Manatee County"}, {id:"12083",name:"Marion County"}, {id:"12085",name:"Martin County"}, {id:"12086",name:"Miami-Dade County"}, {id:"12087",name:"Monroe County"}, {id:"12089",name:"Nassau County"}, {id:"12091",name:"Okaloosa County"}, {id:"12093",name:"Okeechobee County"}, {id:"12095",name:"Orange County"}, {id:"12097",name:"Osceola County"}, {id:"12099",name:"Palm Beach County"}, {id:"12101",name:"Pasco County"}, {id:"12103",name:"Pinellas County"}, {id:"12105",name:"Polk County"}, {id:"12107",name:"Putnam County"}, {id:"12109",name:"St. Johns County"}, {id:"12111",name:"St. Lucie County"}, {id:"12113",name:"Santa Rosa County"}, {id:"12115",name:"Sarasota County"}, {id:"12117",name:"Seminole County"}, {id:"12119",name:"Sumter County"}, {id:"12121",name:"Suwannee County"}, {id:"12123",name:"Taylor County"}, {id:"12125",name:"Union County"}, {id:"12127",name:"Volusia County"}, {id:"12129",name:"Wakulla County"}, {id:"12131",name:"Walton County"}, {id:"12133",name:"Washington County"}, {id:"13001",name:"Appling County"}, {id:"13003",name:"Atkinson County"}, {id:"13005",name:"Bacon County"}, {id:"13007",name:"Baker County"}, {id:"13009",name:"Baldwin County"}, {id:"13011",name:"Banks County"}, {id:"13013",name:"Barrow County"}, {id:"13015",name:"Bartow County"}, {id:"13017",name:"Ben Hill County"}, {id:"13019",name:"Berrien County"}, {id:"13021",name:"Bibb County"}, {id:"13023",name:"Bleckley County"}, {id:"13025",name:"Brantley County"}, {id:"13027",name:"Brooks County"}, {id:"13029",name:"Bryan County"}, {id:"13031",name:"Bulloch County"}, {id:"13033",name:"Burke County"}, {id:"13035",name:"Butts County"}, {id:"13037",name:"Calhoun County"}, {id:"13039",name:"Camden County"}, {id:"13043",name:"Candler County"}, {id:"13045",name:"Carroll County"}, {id:"13047",name:"Catoosa County"}, {id:"13049",name:"Charlton County"}, {id:"13051",name:"Chatham County"}, {id:"13053",name:"Chattahoochee County"}, {id:"13055",name:"Chattooga County"}, {id:"13057",name:"Cherokee County"}, {id:"13059",name:"Clarke County"}, {id:"13061",name:"Clay County"}, {id:"13063",name:"Clayton County"}, {id:"13065",name:"Clinch County"}, {id:"13067",name:"Cobb County"}, {id:"13069",name:"Coffee County"}, {id:"13071",name:"Colquitt County"}, {id:"13073",name:"Columbia County"}, {id:"13075",name:"Cook County"}, {id:"13077",name:"Coweta County"}, {id:"13079",name:"Crawford County"}, {id:"13081",name:"Crisp County"}, {id:"13083",name:"Dade County"}, {id:"13085",name:"Dawson County"}, {id:"13087",name:"Decatur County"}, {id:"13089",name:"DeKalb County"}, {id:"13091",name:"Dodge County"}, {id:"13093",name:"Dooly County"}, {id:"13095",name:"Dougherty County"}, {id:"13097",name:"Douglas County"}, {id:"13099",name:"Early County"}, {id:"13101",name:"Echols County"}, {id:"13103",name:"Effingham County"}, {id:"13105",name:"Elbert County"}, {id:"13107",name:"Emanuel County"}, {id:"13109",name:"Evans County"}, {id:"13111",name:"Fannin County"}, {id:"13113",name:"Fayette County"}, {id:"13115",name:"Floyd County"}, {id:"13117",name:"Forsyth County"}, {id:"13119",name:"Franklin County"}, {id:"13121",name:"Fulton County"}, {id:"13123",name:"Gilmer County"}, {id:"13125",name:"Glascock County"}, {id:"13127",name:"Glynn County"}, {id:"13129",name:"Gordon County"}, {id:"13131",name:"Grady County"}, {id:"13133",name:"Greene County"}, {id:"13135",name:"Gwinnett County"}, {id:"13137",name:"Habersham County"}, {id:"13139",name:"Hall County"}, {id:"13141",name:"Hancock County"}, {id:"13143",name:"Haralson County"}, {id:"13145",name:"Harris County"}, {id:"13147",name:"Hart County"}, {id:"13149",name:"Heard County"}, {id:"13151",name:"Henry County"}, {id:"13153",name:"Houston County"}, {id:"13155",name:"Irwin County"}, {id:"13157",name:"Jackson County"}, {id:"13159",name:"Jasper County"}, {id:"13161",name:"Jeff Davis County"}, {id:"13163",name:"Jefferson County"}, {id:"13165",name:"Jenkins County"}, {id:"13167",name:"Johnson County"}, {id:"13169",name:"Jones County"}, {id:"13171",name:"Lamar County"}, {id:"13173",name:"Lanier County"}, {id:"13175",name:"Laurens County"}, {id:"13177",name:"Lee County"}, {id:"13179",name:"Liberty County"}, {id:"13181",name:"Lincoln County"}, {id:"13183",name:"Long County"}, {id:"13185",name:"Lowndes County"}, {id:"13187",name:"Lumpkin County"}, {id:"13189",name:"McDuffie County"}, {id:"13191",name:"McIntosh County"}, {id:"13193",name:"Macon County"}, {id:"13195",name:"Madison County"}, {id:"13197",name:"Marion County"}, {id:"13199",name:"Meriwether County"}, {id:"13201",name:"Miller County"}, {id:"13205",name:"Mitchell County"}, {id:"13207",name:"Monroe County"}, {id:"13209",name:"Montgomery County"}, {id:"13211",name:"Morgan County"}, {id:"13213",name:"Murray County"}, {id:"13215",name:"Muscogee County"}, {id:"13217",name:"Newton County"}, {id:"13219",name:"Oconee County"}, {id:"13221",name:"Oglethorpe County"}, {id:"13223",name:"Paulding County"}, {id:"13225",name:"Peach County"}, {id:"13227",name:"Pickens County"}, {id:"13229",name:"Pierce County"}, {id:"13231",name:"Pike County"}, {id:"13233",name:"Polk County"}, {id:"13235",name:"Pulaski County"}, {id:"13237",name:"Putnam County"}, {id:"13239",name:"Quitman County"}, {id:"13241",name:"Rabun County"}, {id:"13243",name:"Randolph County"}, {id:"13245",name:"Richmond County"}, {id:"13247",name:"Rockdale County"}, {id:"13249",name:"Schley County"}, {id:"13251",name:"Screven County"}, {id:"13253",name:"Seminole County"}, {id:"13255",name:"Spalding County"}, {id:"13257",name:"Stephens County"}, {id:"13259",name:"Stewart County"}, {id:"13261",name:"Sumter County"}, {id:"13263",name:"Talbot County"}, {id:"13265",name:"Taliaferro County"}, {id:"13267",name:"Tattnall County"}, {id:"13269",name:"Taylor County"}, {id:"13271",name:"Telfair County"}, {id:"13273",name:"Terrell County"}, {id:"13275",name:"Thomas County"}, {id:"13277",name:"Tift County"}, {id:"13279",name:"Toombs County"}, {id:"13281",name:"Towns County"}, {id:"13283",name:"Treutlen County"}, {id:"13285",name:"Troup County"}, {id:"13287",name:"Turner County"}, {id:"13289",name:"Twiggs County"}, {id:"13291",name:"Union County"}, {id:"13293",name:"Upson County"}, {id:"13295",name:"Walker County"}, {id:"13297",name:"Walton County"}, {id:"13299",name:"Ware County"}, {id:"13301",name:"Warren County"}, {id:"13303",name:"Washington County"}, {id:"13305",name:"Wayne County"}, {id:"13307",name:"Webster County"}, {id:"13309",name:"Wheeler County"}, {id:"13311",name:"White County"}, {id:"13313",name:"Whitfield County"}, {id:"13315",name:"Wilcox County"}, {id:"13317",name:"Wilkes County"}, {id:"13319",name:"Wilkinson County"}, {id:"13321",name:"Worth County"}, {id:"15001",name:"Hawaii County"}, {id:"15003",name:"Honolulu County"}, {id:"15005",name:"Kalawao County"}, {id:"15007",name:"Kauai County"}, {id:"15009",name:"Maui County"}, {id:"16001",name:"Ada County"}, {id:"16003",name:"Adams County"}, {id:"16005",name:"Bannock County"}, {id:"16007",name:"Bear Lake County"}, {id:"16009",name:"Benewah County"}, {id:"16011",name:"Bingham County"}, {id:"16013",name:"Blaine County"}, {id:"16015",name:"Boise County"}, {id:"16017",name:"Bonner County"}, {id:"16019",name:"Bonneville County"}, {id:"16021",name:"Boundary County"}, {id:"16023",name:"Butte County"}, {id:"16025",name:"Camas County"}, {id:"16027",name:"Canyon County"}, {id:"16029",name:"Caribou County"}, {id:"16031",name:"Cassia County"}, {id:"16033",name:"Clark County"}, {id:"16035",name:"Clearwater County"}, {id:"16037",name:"Custer County"}, {id:"16039",name:"Elmore County"}, {id:"16041",name:"Franklin County"}, {id:"16043",name:"Fremont County"}, {id:"16045",name:"Gem County"}, {id:"16047",name:"Gooding County"}, {id:"16049",name:"Idaho County"}, {id:"16051",name:"Jefferson County"}, {id:"16053",name:"Jerome County"}, {id:"16055",name:"Kootenai County"}, {id:"16057",name:"Latah County"}, {id:"16059",name:"Lemhi County"}, {id:"16061",name:"Lewis County"}, {id:"16063",name:"Lincoln County"}, {id:"16065",name:"Madison County"}, {id:"16067",name:"Minidoka County"}, {id:"16069",name:"Nez Perce County"}, {id:"16071",name:"Oneida County"}, {id:"16073",name:"Owyhee County"}, {id:"16075",name:"Payette County"}, {id:"16077",name:"Power County"}, {id:"16079",name:"Shoshone County"}, {id:"16081",name:"Teton County"}, {id:"16083",name:"Twin Falls County"}, {id:"16085",name:"Valley County"}, {id:"16087",name:"Washington County"}, {id:"17001",name:"Adams County"}, {id:"17003",name:"Alexander County"}, {id:"17005",name:"Bond County"}, {id:"17007",name:"Boone County"}, {id:"17009",name:"Brown County"}, {id:"17011",name:"Bureau County"}, {id:"17013",name:"Calhoun County"}, {id:"17015",name:"Carroll County"}, {id:"17017",name:"Cass County"}, {id:"17019",name:"Champaign County"}, {id:"17021",name:"Christian County"}, {id:"17023",name:"Clark County"}, {id:"17025",name:"Clay County"}, {id:"17027",name:"Clinton County"}, {id:"17029",name:"Coles County"}, {id:"17031",name:"Cook County"}, {id:"17033",name:"Crawford County"}, {id:"17035",name:"Cumberland County"}, {id:"17037",name:"DeKalb County"}, {id:"17039",name:"De Witt County"}, {id:"17041",name:"Douglas County"}, {id:"17043",name:"DuPage County"}, {id:"17045",name:"Edgar County"}, {id:"17047",name:"Edwards County"}, {id:"17049",name:"Effingham County"}, {id:"17051",name:"Fayette County"}, {id:"17053",name:"Ford County"}, {id:"17055",name:"Franklin County"}, {id:"17057",name:"Fulton County"}, {id:"17059",name:"Gallatin County"}, {id:"17061",name:"Greene County"}, {id:"17063",name:"Grundy County"}, {id:"17065",name:"Hamilton County"}, {id:"17067",name:"Hancock County"}, {id:"17069",name:"Hardin County"}, {id:"17071",name:"Henderson County"}, {id:"17073",name:"Henry County"}, {id:"17075",name:"Iroquois County"}, {id:"17077",name:"Jackson County"}, {id:"17079",name:"Jasper County"}, {id:"17081",name:"Jefferson County"}, {id:"17083",name:"Jersey County"}, {id:"17085",name:"Jo Daviess County"}, {id:"17087",name:"Johnson County"}, {id:"17089",name:"Kane County"}, {id:"17091",name:"Kankakee County"}, {id:"17093",name:"Kendall County"}, {id:"17095",name:"Knox County"}, {id:"17097",name:"Lake County"}, {id:"17099",name:"LaSalle County"}, {id:"17101",name:"Lawrence County"}, {id:"17103",name:"Lee County"}, {id:"17105",name:"Livingston County"}, {id:"17107",name:"Logan County"}, {id:"17109",name:"McDonough County"}, {id:"17111",name:"McHenry County"}, {id:"17113",name:"McLean County"}, {id:"17115",name:"Macon County"}, {id:"17117",name:"Macoupin County"}, {id:"17119",name:"Madison County"}, {id:"17121",name:"Marion County"}, {id:"17123",name:"Marshall County"}, {id:"17125",name:"Mason County"}, {id:"17127",name:"Massac County"}, {id:"17129",name:"Menard County"}, {id:"17131",name:"Mercer County"}, {id:"17133",name:"Monroe County"}, {id:"17135",name:"Montgomery County"}, {id:"17137",name:"Morgan County"}, {id:"17139",name:"Moultrie County"}, {id:"17141",name:"Ogle County"}, {id:"17143",name:"Peoria County"}, {id:"17145",name:"Perry County"}, {id:"17147",name:"Piatt County"}, {id:"17149",name:"Pike County"}, {id:"17151",name:"Pope County"}, {id:"17153",name:"Pulaski County"}, {id:"17155",name:"Putnam County"}, {id:"17157",name:"Randolph County"}, {id:"17159",name:"Richland County"}, {id:"17161",name:"Rock Island County"}, {id:"17163",name:"St. Clair County"}, {id:"17165",name:"Saline County"}, {id:"17167",name:"Sangamon County"}, {id:"17169",name:"Schuyler County"}, {id:"17171",name:"Scott County"}, {id:"17173",name:"Shelby County"}, {id:"17175",name:"Stark County"}, {id:"17177",name:"Stephenson County"}, {id:"17179",name:"Tazewell County"}, {id:"17181",name:"Union County"}, {id:"17183",name:"Vermilion County"}, {id:"17185",name:"Wabash County"}, {id:"17187",name:"Warren County"}, {id:"17189",name:"Washington County"}, {id:"17191",name:"Wayne County"}, {id:"17193",name:"White County"}, {id:"17195",name:"Whiteside County"}, {id:"17197",name:"Will County"}, {id:"17199",name:"Williamson County"}, {id:"17201",name:"Winnebago County"}, {id:"17203",name:"Woodford County"}, {id:"18001",name:"Adams County"}, {id:"18003",name:"Allen County"}, {id:"18005",name:"Bartholomew County"}, {id:"18007",name:"Benton County"}, {id:"18009",name:"Blackford County"}, {id:"18011",name:"Boone County"}, {id:"18013",name:"Brown County"}, {id:"18015",name:"Carroll County"}, {id:"18017",name:"Cass County"}, {id:"18019",name:"Clark County"}, {id:"18021",name:"Clay County"}, {id:"18023",name:"Clinton County"}, {id:"18025",name:"Crawford County"}, {id:"18027",name:"Daviess County"}, {id:"18029",name:"Dearborn County"}, {id:"18031",name:"Decatur County"}, {id:"18033",name:"DeKalb County"}, {id:"18035",name:"Delaware County"}, {id:"18037",name:"Dubois County"}, {id:"18039",name:"Elkhart County"}, {id:"18041",name:"Fayette County"}, {id:"18043",name:"Floyd County"}, {id:"18045",name:"Fountain County"}, {id:"18047",name:"Franklin County"}, {id:"18049",name:"Fulton County"}, {id:"18051",name:"Gibson County"}, {id:"18053",name:"Grant County"}, {id:"18055",name:"Greene County"}, {id:"18057",name:"Hamilton County"}, {id:"18059",name:"Hancock County"}, {id:"18061",name:"Harrison County"}, {id:"18063",name:"Hendricks County"}, {id:"18065",name:"Henry County"}, {id:"18067",name:"Howard County"}, {id:"18069",name:"Huntington County"}, {id:"18071",name:"Jackson County"}, {id:"18073",name:"Jasper County"}, {id:"18075",name:"Jay County"}, {id:"18077",name:"Jefferson County"}, {id:"18079",name:"Jennings County"}, {id:"18081",name:"Johnson County"}, {id:"18083",name:"Knox County"}, {id:"18085",name:"Kosciusko County"}, {id:"18087",name:"LaGrange County"}, {id:"18089",name:"Lake County"}, {id:"18091",name:"LaPorte County"}, {id:"18093",name:"Lawrence County"}, {id:"18095",name:"Madison County"}, {id:"18097",name:"Marion County"}, {id:"18099",name:"Marshall County"}, {id:"18101",name:"Martin County"}, {id:"18103",name:"Miami County"}, {id:"18105",name:"Monroe County"}, {id:"18107",name:"Montgomery County"}, {id:"18109",name:"Morgan County"}, {id:"18111",name:"Newton County"}, {id:"18113",name:"Noble County"}, {id:"18115",name:"Ohio County"}, {id:"18117",name:"Orange County"}, {id:"18119",name:"Owen County"}, {id:"18121",name:"Parke County"}, {id:"18123",name:"Perry County"}, {id:"18125",name:"Pike County"}, {id:"18127",name:"Porter County"}, {id:"18129",name:"Posey County"}, {id:"18131",name:"Pulaski County"}, {id:"18133",name:"Putnam County"}, {id:"18135",name:"Randolph County"}, {id:"18137",name:"Ripley County"}, {id:"18139",name:"Rush County"}, {id:"18141",name:"St. Joseph County"}, {id:"18143",name:"Scott County"}, {id:"18145",name:"Shelby County"}, {id:"18147",name:"Spencer County"}, {id:"18149",name:"Starke County"}, {id:"18151",name:"Steuben County"}, {id:"18153",name:"Sullivan County"}, {id:"18155",name:"Switzerland County"}, {id:"18157",name:"Tippecanoe County"}, {id:"18159",name:"Tipton County"}, {id:"18161",name:"Union County"}, {id:"18163",name:"Vanderburgh County"}, {id:"18165",name:"Vermillion County"}, {id:"18167",name:"Vigo County"}, {id:"18169",name:"Wabash County"}, {id:"18171",name:"Warren County"}, {id:"18173",name:"Warrick County"}, {id:"18175",name:"Washington County"}, {id:"18177",name:"Wayne County"}, {id:"18179",name:"Wells County"}, {id:"18181",name:"White County"}, {id:"18183",name:"Whitley County"}, {id:"19001",name:"Adair County"}, {id:"19003",name:"Adams County"}, {id:"19005",name:"Allamakee County"}, {id:"19007",name:"Appanoose County"}, {id:"19009",name:"Audubon County"}, {id:"19011",name:"Benton County"}, {id:"19013",name:"Black Hawk County"}, {id:"19015",name:"Boone County"}, {id:"19017",name:"Bremer County"}, {id:"19019",name:"Buchanan County"}, {id:"19021",name:"Buena Vista County"}, {id:"19023",name:"Butler County"}, {id:"19025",name:"Calhoun County"}, {id:"19027",name:"Carroll County"}, {id:"19029",name:"Cass County"}, {id:"19031",name:"Cedar County"}, {id:"19033",name:"Cerro Gordo County"}, {id:"19035",name:"Cherokee County"}, {id:"19037",name:"Chickasaw County"}, {id:"19039",name:"Clarke County"}, {id:"19041",name:"Clay County"}, {id:"19043",name:"Clayton County"}, {id:"19045",name:"Clinton County"}, {id:"19047",name:"Crawford County"}, {id:"19049",name:"Dallas County"}, {id:"19051",name:"Davis County"}, {id:"19053",name:"Decatur County"}, {id:"19055",name:"Delaware County"}, {id:"19057",name:"Des Moines County"}, {id:"19059",name:"Dickinson County"}, {id:"19061",name:"Dubuque County"}, {id:"19063",name:"Emmet County"}, {id:"19065",name:"Fayette County"}, {id:"19067",name:"Floyd County"}, {id:"19069",name:"Franklin County"}, {id:"19071",name:"Fremont County"}, {id:"19073",name:"Greene County"}, {id:"19075",name:"Grundy County"}, {id:"19077",name:"Guthrie County"}, {id:"19079",name:"Hamilton County"}, {id:"19081",name:"Hancock County"}, {id:"19083",name:"Hardin County"}, {id:"19085",name:"Harrison County"}, {id:"19087",name:"Henry County"}, {id:"19089",name:"Howard County"}, {id:"19091",name:"Humboldt County"}, {id:"19093",name:"Ida County"}, {id:"19095",name:"Iowa County"}, {id:"19097",name:"Jackson County"}, {id:"19099",name:"Jasper County"}, {id:"19101",name:"Jefferson County"}, {id:"19103",name:"Johnson County"}, {id:"19105",name:"Jones County"}, {id:"19107",name:"Keokuk County"}, {id:"19109",name:"Kossuth County"}, {id:"19111",name:"Lee County"}, {id:"19113",name:"Linn County"}, {id:"19115",name:"Louisa County"}, {id:"19117",name:"Lucas County"}, {id:"19119",name:"Lyon County"}, {id:"19121",name:"Madison County"}, {id:"19123",name:"Mahaska County"}, {id:"19125",name:"Marion County"}, {id:"19127",name:"Marshall County"}, {id:"19129",name:"Mills County"}, {id:"19131",name:"Mitchell County"}, {id:"19133",name:"Monona County"}, {id:"19135",name:"Monroe County"}, {id:"19137",name:"Montgomery County"}, {id:"19139",name:"Muscatine County"}, {id:"19141",name:"O'Brien County"}, {id:"19143",name:"Osceola County"}, {id:"19145",name:"Page County"}, {id:"19147",name:"Palo Alto County"}, {id:"19149",name:"Plymouth County"}, {id:"19151",name:"Pocahontas County"}, {id:"19153",name:"Polk County"}, {id:"19155",name:"Pottawattamie County"}, {id:"19157",name:"Poweshiek County"}, {id:"19159",name:"Ringgold County"}, {id:"19161",name:"Sac County"}, {id:"19163",name:"Scott County"}, {id:"19165",name:"Shelby County"}, {id:"19167",name:"Sioux County"}, {id:"19169",name:"Story County"}, {id:"19171",name:"Tama County"}, {id:"19173",name:"Taylor County"}, {id:"19175",name:"Union County"}, {id:"19177",name:"Van Buren County"}, {id:"19179",name:"Wapello County"}, {id:"19181",name:"Warren County"}, {id:"19183",name:"Washington County"}, {id:"19185",name:"Wayne County"}, {id:"19187",name:"Webster County"}, {id:"19189",name:"Winnebago County"}, {id:"19191",name:"Winneshiek County"}, {id:"19193",name:"Woodbury County"}, {id:"19195",name:"Worth County"}, {id:"19197",name:"Wright County"}, {id:"20001",name:"Allen County"}, {id:"20003",name:"Anderson County"}, {id:"20005",name:"Atchison County"}, {id:"20007",name:"Barber County"}, {id:"20009",name:"Barton County"}, {id:"20011",name:"Bourbon County"}, {id:"20013",name:"Brown County"}, {id:"20015",name:"Butler County"}, {id:"20017",name:"Chase County"}, {id:"20019",name:"Chautauqua County"}, {id:"20021",name:"Cherokee County"}, {id:"20023",name:"Cheyenne County"}, {id:"20025",name:"Clark County"}, {id:"20027",name:"Clay County"}, {id:"20029",name:"Cloud County"}, {id:"20031",name:"Coffey County"}, {id:"20033",name:"Comanche County"}, {id:"20035",name:"Cowley County"}, {id:"20037",name:"Crawford County"}, {id:"20039",name:"Decatur County"}, {id:"20041",name:"Dickinson County"}, {id:"20043",name:"Doniphan County"}, {id:"20045",name:"Douglas County"}, {id:"20047",name:"Edwards County"}, {id:"20049",name:"Elk County"}, {id:"20051",name:"Ellis County"}, {id:"20053",name:"Ellsworth County"}, {id:"20055",name:"Finney County"}, {id:"20057",name:"Ford County"}, {id:"20059",name:"Franklin County"}, {id:"20061",name:"Geary County"}, {id:"20063",name:"Gove County"}, {id:"20065",name:"Graham County"}, {id:"20067",name:"Grant County"}, {id:"20069",name:"Gray County"}, {id:"20071",name:"Greeley County"}, {id:"20073",name:"Greenwood County"}, {id:"20075",name:"Hamilton County"}, {id:"20077",name:"Harper County"}, {id:"20079",name:"Harvey County"}, {id:"20081",name:"Haskell County"}, {id:"20083",name:"Hodgeman County"}, {id:"20085",name:"Jackson County"}, {id:"20087",name:"Jefferson County"}, {id:"20089",name:"Jewell County"}, {id:"20091",name:"Johnson County"}, {id:"20093",name:"Kearny County"}, {id:"20095",name:"Kingman County"}, {id:"20097",name:"Kiowa County"}, {id:"20099",name:"Labette County"}, {id:"20101",name:"Lane County"}, {id:"20103",name:"Leavenworth County"}, {id:"20105",name:"Lincoln County"}, {id:"20107",name:"Linn County"}, {id:"20109",name:"Logan County"}, {id:"20111",name:"Lyon County"}, {id:"20113",name:"McPherson County"}, {id:"20115",name:"Marion County"}, {id:"20117",name:"Marshall County"}, {id:"20119",name:"Meade County"}, {id:"20121",name:"Miami County"}, {id:"20123",name:"Mitchell County"}, {id:"20125",name:"Montgomery County"}, {id:"20127",name:"Morris County"}, {id:"20129",name:"Morton County"}, {id:"20131",name:"Nemaha County"}, {id:"20133",name:"Neosho County"}, {id:"20135",name:"Ness County"}, {id:"20137",name:"Norton County"}, {id:"20139",name:"Osage County"}, {id:"20141",name:"Osborne County"}, {id:"20143",name:"Ottawa County"}, {id:"20145",name:"Pawnee County"}, {id:"20147",name:"Phillips County"}, {id:"20149",name:"Pottawatomie County"}, {id:"20151",name:"Pratt County"}, {id:"20153",name:"Rawlins County"}, {id:"20155",name:"Reno County"}, {id:"20157",name:"Republic County"}, {id:"20159",name:"Rice County"}, {id:"20161",name:"Riley County"}, {id:"20163",name:"Rooks County"}, {id:"20165",name:"Rush County"}, {id:"20167",name:"Russell County"}, {id:"20169",name:"Saline County"}, {id:"20171",name:"Scott County"}, {id:"20173",name:"Sedgwick County"}, {id:"20175",name:"Seward County"}, {id:"20177",name:"Shawnee County"}, {id:"20179",name:"Sheridan County"}, {id:"20181",name:"Sherman County"}, {id:"20183",name:"Smith County"}, {id:"20185",name:"Stafford County"}, {id:"20187",name:"Stanton County"}, {id:"20189",name:"Stevens County"}, {id:"20191",name:"Sumner County"}, {id:"20193",name:"Thomas County"}, {id:"20195",name:"Trego County"}, {id:"20197",name:"Wabaunsee County"}, {id:"20199",name:"Wallace County"}, {id:"20201",name:"Washington County"}, {id:"20203",name:"Wichita County"}, {id:"20205",name:"Wilson County"}, {id:"20207",name:"Woodson County"}, {id:"20209",name:"Wyandotte County"}, {id:"21001",name:"Adair County"}, {id:"21003",name:"Allen County"}, {id:"21005",name:"Anderson County"}, {id:"21007",name:"Ballard County"}, {id:"21009",name:"Barren County"}, {id:"21011",name:"Bath County"}, {id:"21013",name:"Bell County"}, {id:"21015",name:"Boone County"}, {id:"21017",name:"Bourbon County"}, {id:"21019",name:"Boyd County"}, {id:"21021",name:"Boyle County"}, {id:"21023",name:"Bracken County"}, {id:"21025",name:"Breathitt County"}, {id:"21027",name:"Breckinridge County"}, {id:"21029",name:"Bullitt County"}, {id:"21031",name:"Butler County"}, {id:"21033",name:"Caldwell County"}, {id:"21035",name:"Calloway County"}, {id:"21037",name:"Campbell County"}, {id:"21039",name:"Carlisle County"}, {id:"21041",name:"Carroll County"}, {id:"21043",name:"Carter County"}, {id:"21045",name:"Casey County"}, {id:"21047",name:"Christian County"}, {id:"21049",name:"Clark County"}, {id:"21051",name:"Clay County"}, {id:"21053",name:"Clinton County"}, {id:"21055",name:"Crittenden County"}, {id:"21057",name:"Cumberland County"}, {id:"21059",name:"Daviess County"}, {id:"21061",name:"Edmonson County"}, {id:"21063",name:"Elliott County"}, {id:"21065",name:"Estill County"}, {id:"21067",name:"Fayette County"}, {id:"21069",name:"Fleming County"}, {id:"21071",name:"Floyd County"}, {id:"21073",name:"Franklin County"}, {id:"21075",name:"Fulton County"}, {id:"21077",name:"Gallatin County"}, {id:"21079",name:"Garrard County"}, {id:"21081",name:"Grant County"}, {id:"21083",name:"Graves County"}, {id:"21085",name:"Grayson County"}, {id:"21087",name:"Green County"}, {id:"21089",name:"Greenup County"}, {id:"21091",name:"Hancock County"}, {id:"21093",name:"Hardin County"}, {id:"21095",name:"Harlan County"}, {id:"21097",name:"Harrison County"}, {id:"21099",name:"Hart County"}, {id:"21101",name:"Henderson County"}, {id:"21103",name:"Henry County"}, {id:"21105",name:"Hickman County"}, {id:"21107",name:"Hopkins County"}, {id:"21109",name:"Jackson County"}, {id:"21111",name:"Jefferson County"}, {id:"21113",name:"Jessamine County"}, {id:"21115",name:"Johnson County"}, {id:"21117",name:"Kenton County"}, {id:"21119",name:"Knott County"}, {id:"21121",name:"Knox County"}, {id:"21123",name:"Larue County"}, {id:"21125",name:"Laurel County"}, {id:"21127",name:"Lawrence County"}, {id:"21129",name:"Lee County"}, {id:"21131",name:"Leslie County"}, {id:"21133",name:"Letcher County"}, {id:"21135",name:"Lewis County"}, {id:"21137",name:"Lincoln County"}, {id:"21139",name:"Livingston County"}, {id:"21141",name:"Logan County"}, {id:"21143",name:"Lyon County"}, {id:"21145",name:"McCracken County"}, {id:"21147",name:"McCreary County"}, {id:"21149",name:"McLean County"}, {id:"21151",name:"Madison County"}, {id:"21153",name:"Magoffin County"}, {id:"21155",name:"Marion County"}, {id:"21157",name:"Marshall County"}, {id:"21159",name:"Martin County"}, {id:"21161",name:"Mason County"}, {id:"21163",name:"Meade County"}, {id:"21165",name:"Menifee County"}, {id:"21167",name:"Mercer County"}, {id:"21169",name:"Metcalfe County"}, {id:"21171",name:"Monroe County"}, {id:"21173",name:"Montgomery County"}, {id:"21175",name:"Morgan County"}, {id:"21177",name:"Muhlenberg County"}, {id:"21179",name:"Nelson County"}, {id:"21181",name:"Nicholas County"}, {id:"21183",name:"Ohio County"}, {id:"21185",name:"Oldham County"}, {id:"21187",name:"Owen County"}, {id:"21189",name:"Owsley County"}, {id:"21191",name:"Pendleton County"}, {id:"21193",name:"Perry County"}, {id:"21195",name:"Pike County"}, {id:"21197",name:"Powell County"}, {id:"21199",name:"Pulaski County"}, {id:"21201",name:"Robertson County"}, {id:"21203",name:"Rockcastle County"}, {id:"21205",name:"Rowan County"}, {id:"21207",name:"Russell County"}, {id:"21209",name:"Scott County"}, {id:"21211",name:"Shelby County"}, {id:"21213",name:"Simpson County"}, {id:"21215",name:"Spencer County"}, {id:"21217",name:"Taylor County"}, {id:"21219",name:"Todd County"}, {id:"21221",name:"Trigg County"}, {id:"21223",name:"Trimble County"}, {id:"21225",name:"Union County"}, {id:"21227",name:"Warren County"}, {id:"21229",name:"Washington County"}, {id:"21231",name:"Wayne County"}, {id:"21233",name:"Webster County"}, {id:"21235",name:"Whitley County"}, {id:"21237",name:"Wolfe County"}, {id:"21239",name:"Woodford County"}, {id:"22001",name:"Acadia Parish"}, {id:"22003",name:"Allen Parish"}, {id:"22005",name:"Ascension Parish"}, {id:"22007",name:"Assumption Parish"}, {id:"22009",name:"Avoyelles Parish"}, {id:"22011",name:"Beauregard Parish"}, {id:"22013",name:"Bienville Parish"}, {id:"22015",name:"Bossier Parish"}, {id:"22017",name:"Caddo Parish"}, {id:"22019",name:"Calcasieu Parish"}, {id:"22021",name:"Caldwell Parish"}, {id:"22023",name:"Cameron Parish"}, {id:"22025",name:"Catahoula Parish"}, {id:"22027",name:"Claiborne Parish"}, {id:"22029",name:"Concordia Parish"}, {id:"22031",name:"De Soto Parish"}, {id:"22033",name:"East Baton Rouge Parish"}, {id:"22035",name:"East Carroll Parish"}, {id:"22037",name:"East Feliciana Parish"}, {id:"22039",name:"Evangeline Parish"}, {id:"22041",name:"Franklin Parish"}, {id:"22043",name:"Grant Parish"}, {id:"22045",name:"Iberia Parish"}, {id:"22047",name:"Iberville Parish"}, {id:"22049",name:"Jackson Parish"}, {id:"22051",name:"Jefferson Parish"}, {id:"22053",name:"Jefferson Davis Parish"}, {id:"22055",name:"Lafayette Parish"}, {id:"22057",name:"Lafourche Parish"}, {id:"22059",name:"La Salle Parish"}, {id:"22061",name:"Lincoln Parish"}, {id:"22063",name:"Livingston Parish"}, {id:"22065",name:"Madison Parish"}, {id:"22067",name:"Morehouse Parish"}, {id:"22069",name:"Natchitoches Parish"}, {id:"22071",name:"Orleans Parish"}, {id:"22073",name:"Ouachita Parish"}, {id:"22075",name:"Plaquemines Parish"}, {id:"22077",name:"Pointe Coupee Parish"}, {id:"22079",name:"Rapides Parish"}, {id:"22081",name:"Red River Parish"}, {id:"22083",name:"Richland Parish"}, {id:"22085",name:"Sabine Parish"}, {id:"22087",name:"St. Bernard Parish"}, {id:"22089",name:"St. Charles Parish"}, {id:"22091",name:"St. Helena Parish"}, {id:"22093",name:"St. James Parish"}, {id:"22095",name:"St. John the Baptist Parish"}, {id:"22097",name:"St. Landry Parish"}, {id:"22099",name:"St. Martin Parish"}, {id:"22101",name:"St. Mary Parish"}, {id:"22103",name:"St. Tammany Parish"}, {id:"22105",name:"Tangipahoa Parish"}, {id:"22107",name:"Tensas Parish"}, {id:"22109",name:"Terrebonne Parish"}, {id:"22111",name:"Union Parish"}, {id:"22113",name:"Vermilion Parish"}, {id:"22115",name:"Vernon Parish"}, {id:"22117",name:"Washington Parish"}, {id:"22119",name:"Webster Parish"}, {id:"22121",name:"West Baton Rouge Parish"}, {id:"22123",name:"West Carroll Parish"}, {id:"22125",name:"West Feliciana Parish"}, {id:"22127",name:"Winn Parish"}, {id:"23001",name:"Androscoggin County"}, {id:"23003",name:"Aroostook County"}, {id:"23005",name:"Cumberland County"}, {id:"23007",name:"Franklin County"}, {id:"23009",name:"Hancock County"}, {id:"23011",name:"Kennebec County"}, {id:"23013",name:"Knox County"}, {id:"23015",name:"Lincoln County"}, {id:"23017",name:"Oxford County"}, {id:"23019",name:"Penobscot County"}, {id:"23021",name:"Piscataquis County"}, {id:"23023",name:"Sagadahoc County"}, {id:"23025",name:"Somerset County"}, {id:"23027",name:"Waldo County"}, {id:"23029",name:"Washington County"}, {id:"23031",name:"York County"}, {id:"24001",name:"Allegany County"}, {id:"24003",name:"Anne Arundel County"}, {id:"24005",name:"Baltimore County"}, {id:"24009",name:"Calvert County"}, {id:"24011",name:"Caroline County"}, {id:"24013",name:"Carroll County"}, {id:"24015",name:"Cecil County"}, {id:"24017",name:"Charles County"}, {id:"24019",name:"Dorchester County"}, {id:"24021",name:"Frederick County"}, {id:"24023",name:"Garrett County"}, {id:"24025",name:"Harford County"}, {id:"24027",name:"Howard County"}, {id:"24029",name:"Kent County"}, {id:"24031",name:"Montgomery County"}, {id:"24033",name:"Prince George's County"}, {id:"24035",name:"Queen Anne's County"}, {id:"24037",name:"St. Mary's County"}, {id:"24039",name:"Somerset County"}, {id:"24041",name:"Talbot County"}, {id:"24043",name:"Washington County"}, {id:"24045",name:"Wicomico County"}, {id:"24047",name:"Worcester County"}, {id:"24510",name:"Baltimore city"}, {id:"25001",name:"Barnstable County"}, {id:"25003",name:"Berkshire County"}, {id:"25005",name:"Bristol County"}, {id:"25007",name:"Dukes County"}, {id:"25009",name:"Essex County"}, {id:"25011",name:"Franklin County"}, {id:"25013",name:"Hampden County"}, {id:"25015",name:"Hampshire County"}, {id:"25017",name:"Middlesex County"}, {id:"25019",name:"Nantucket County"}, {id:"25021",name:"Norfolk County"}, {id:"25023",name:"Plymouth County"}, {id:"25025",name:"Suffolk County"}, {id:"25027",name:"Worcester County"}, {id:"26001",name:"Alcona County"}, {id:"26003",name:"Alger County"}, {id:"26005",name:"Allegan County"}, {id:"26007",name:"Alpena County"}, {id:"26009",name:"Antrim County"}, {id:"26011",name:"Arenac County"}, {id:"26013",name:"Baraga County"}, {id:"26015",name:"Barry County"}, {id:"26017",name:"Bay County"}, {id:"26019",name:"Benzie County"}, {id:"26021",name:"Berrien County"}, {id:"26023",name:"Branch County"}, {id:"26025",name:"Calhoun County"}, {id:"26027",name:"Cass County"}, {id:"26029",name:"Charlevoix County"}, {id:"26031",name:"Cheboygan County"}, {id:"26033",name:"Chippewa County"}, {id:"26035",name:"Clare County"}, {id:"26037",name:"Clinton County"}, {id:"26039",name:"Crawford County"}, {id:"26041",name:"Delta County"}, {id:"26043",name:"Dickinson County"}, {id:"26045",name:"Eaton County"}, {id:"26047",name:"Emmet County"}, {id:"26049",name:"Genesee County"}, {id:"26051",name:"Gladwin County"}, {id:"26053",name:"Gogebic County"}, {id:"26055",name:"Grand Traverse County"}, {id:"26057",name:"Gratiot County"}, {id:"26059",name:"Hillsdale County"}, {id:"26061",name:"Houghton County"}, {id:"26063",name:"Huron County"}, {id:"26065",name:"Ingham County"}, {id:"26067",name:"Ionia County"}, {id:"26069",name:"Iosco County"}, {id:"26071",name:"Iron County"}, {id:"26073",name:"Isabella County"}, {id:"26075",name:"Jackson County"}, {id:"26077",name:"Kalamazoo County"}, {id:"26079",name:"Kalkaska County"}, {id:"26081",name:"Kent County"}, {id:"26083",name:"Keweenaw County"}, {id:"26085",name:"Lake County"}, {id:"26087",name:"Lapeer County"}, {id:"26089",name:"Leelanau County"}, {id:"26091",name:"Lenawee County"}, {id:"26093",name:"Livingston County"}, {id:"26095",name:"Luce County"}, {id:"26097",name:"Mackinac County"}, {id:"26099",name:"Macomb County"}, {id:"26101",name:"Manistee County"}, {id:"26103",name:"Marquette County"}, {id:"26105",name:"Mason County"}, {id:"26107",name:"Mecosta County"}, {id:"26109",name:"Menominee County"}, {id:"26111",name:"Midland County"}, {id:"26113",name:"Missaukee County"}, {id:"26115",name:"Monroe County"}, {id:"26117",name:"Montcalm County"}, {id:"26119",name:"Montmorency County"}, {id:"26121",name:"Muskegon County"}, {id:"26123",name:"Newaygo County"}, {id:"26125",name:"Oakland County"}, {id:"26127",name:"Oceana County"}, {id:"26129",name:"Ogemaw County"}, {id:"26131",name:"Ontonagon County"}, {id:"26133",name:"Osceola County"}, {id:"26135",name:"Oscoda County"}, {id:"26137",name:"Otsego County"}, {id:"26139",name:"Ottawa County"}, {id:"26141",name:"Presque Isle County"}, {id:"26143",name:"Roscommon County"}, {id:"26145",name:"Saginaw County"}, {id:"26147",name:"St. Clair County"}, {id:"26149",name:"St. Joseph County"}, {id:"26151",name:"Sanilac County"}, {id:"26153",name:"Schoolcraft County"}, {id:"26155",name:"Shiawassee County"}, {id:"26157",name:"Tuscola County"}, {id:"26159",name:"Van Buren County"}, {id:"26161",name:"Washtenaw County"}, {id:"26163",name:"Wayne County"}, {id:"26165",name:"Wexford County"}, {id:"27001",name:"Aitkin County"}, {id:"27003",name:"Anoka County"}, {id:"27005",name:"Becker County"}, {id:"27007",name:"Beltrami County"}, {id:"27009",name:"Benton County"}, {id:"27011",name:"Big Stone County"}, {id:"27013",name:"Blue Earth County"}, {id:"27015",name:"Brown County"}, {id:"27017",name:"Carlton County"}, {id:"27019",name:"Carver County"}, {id:"27021",name:"Cass County"}, {id:"27023",name:"Chippewa County"}, {id:"27025",name:"Chisago County"}, {id:"27027",name:"Clay County"}, {id:"27029",name:"Clearwater County"}, {id:"27031",name:"Cook County"}, {id:"27033",name:"Cottonwood County"}, {id:"27035",name:"Crow Wing County"}, {id:"27037",name:"Dakota County"}, {id:"27039",name:"Dodge County"}, {id:"27041",name:"Douglas County"}, {id:"27043",name:"Faribault County"}, {id:"27045",name:"Fillmore County"}, {id:"27047",name:"Freeborn County"}, {id:"27049",name:"Goodhue County"}, {id:"27051",name:"Grant County"}, {id:"27053",name:"Hennepin County"}, {id:"27055",name:"Houston County"}, {id:"27057",name:"Hubbard County"}, {id:"27059",name:"Isanti County"}, {id:"27061",name:"Itasca County"}, {id:"27063",name:"Jackson County"}, {id:"27065",name:"Kanabec County"}, {id:"27067",name:"Kandiyohi County"}, {id:"27069",name:"Kittson County"}, {id:"27071",name:"Koochiching County"}, {id:"27073",name:"Lac qui Parle County"}, {id:"27075",name:"Lake County"}, {id:"27077",name:"Lake of the Woods County"}, {id:"27079",name:"Le Sueur County"}, {id:"27081",name:"Lincoln County"}, {id:"27083",name:"Lyon County"}, {id:"27085",name:"McLeod County"}, {id:"27087",name:"Mahnomen County"}, {id:"27089",name:"Marshall County"}, {id:"27091",name:"Martin County"}, {id:"27093",name:"Meeker County"}, {id:"27095",name:"Mille Lacs County"}, {id:"27097",name:"Morrison County"}, {id:"27099",name:"Mower County"}, {id:"27101",name:"Murray County"}, {id:"27103",name:"Nicollet County"}, {id:"27105",name:"Nobles County"}, {id:"27107",name:"Norman County"}, {id:"27109",name:"Olmsted County"}, {id:"27111",name:"Otter Tail County"}, {id:"27113",name:"Pennington County"}, {id:"27115",name:"Pine County"}, {id:"27117",name:"Pipestone County"}, {id:"27119",name:"Polk County"}, {id:"27121",name:"Pope County"}, {id:"27123",name:"Ramsey County"}, {id:"27125",name:"Red Lake County"}, {id:"27127",name:"Redwood County"}, {id:"27129",name:"Renville County"}, {id:"27131",name:"Rice County"}, {id:"27133",name:"Rock County"}, {id:"27135",name:"Roseau County"}, {id:"27137",name:"St. Louis County"}, {id:"27139",name:"Scott County"}, {id:"27141",name:"Sherburne County"}, {id:"27143",name:"Sibley County"}, {id:"27145",name:"Stearns County"}, {id:"27147",name:"Steele County"}, {id:"27149",name:"Stevens County"}, {id:"27151",name:"Swift County"}, {id:"27153",name:"Todd County"}, {id:"27155",name:"Traverse County"}, {id:"27157",name:"Wabasha County"}, {id:"27159",name:"Wadena County"}, {id:"27161",name:"Waseca County"}, {id:"27163",name:"Washington County"}, {id:"27165",name:"Watonwan County"}, {id:"27167",name:"Wilkin County"}, {id:"27169",name:"Winona County"}, {id:"27171",name:"Wright County"}, {id:"27173",name:"Yellow Medicine County"}, {id:"28001",name:"Adams County"}, {id:"28003",name:"Alcorn County"}, {id:"28005",name:"Amite County"}, {id:"28007",name:"Attala County"}, {id:"28009",name:"Benton County"}, {id:"28011",name:"Bolivar County"}, {id:"28013",name:"Calhoun County"}, {id:"28015",name:"Carroll County"}, {id:"28017",name:"Chickasaw County"}, {id:"28019",name:"Choctaw County"}, {id:"28021",name:"Claiborne County"}, {id:"28023",name:"Clarke County"}, {id:"28025",name:"Clay County"}, {id:"28027",name:"Coahoma County"}, {id:"28029",name:"Copiah County"}, {id:"28031",name:"Covington County"}, {id:"28033",name:"DeSoto County"}, {id:"28035",name:"Forrest County"}, {id:"28037",name:"Franklin County"}, {id:"28039",name:"George County"}, {id:"28041",name:"Greene County"}, {id:"28043",name:"Grenada County"}, {id:"28045",name:"Hancock County"}, {id:"28047",name:"Harrison County"}, {id:"28049",name:"Hinds County"}, {id:"28051",name:"Holmes County"}, {id:"28053",name:"Humphreys County"}, {id:"28055",name:"Issaquena County"}, {id:"28057",name:"Itawamba County"}, {id:"28059",name:"Jackson County"}, {id:"28061",name:"Jasper County"}, {id:"28063",name:"Jefferson County"}, {id:"28065",name:"Jefferson Davis County"}, {id:"28067",name:"Jones County"}, {id:"28069",name:"Kemper County"}, {id:"28071",name:"Lafayette County"}, {id:"28073",name:"Lamar County"}, {id:"28075",name:"Lauderdale County"}, {id:"28077",name:"Lawrence County"}, {id:"28079",name:"Leake County"}, {id:"28081",name:"Lee County"}, {id:"28083",name:"Leflore County"}, {id:"28085",name:"Lincoln County"}, {id:"28087",name:"Lowndes County"}, {id:"28089",name:"Madison County"}, {id:"28091",name:"Marion County"}, {id:"28093",name:"Marshall County"}, {id:"28095",name:"Monroe County"}, {id:"28097",name:"Montgomery County"}, {id:"28099",name:"Neshoba County"}, {id:"28101",name:"Newton County"}, {id:"28103",name:"Noxubee County"}, {id:"28105",name:"Oktibbeha County"}, {id:"28107",name:"Panola County"}, {id:"28109",name:"Pearl River County"}, {id:"28111",name:"Perry County"}, {id:"28113",name:"Pike County"}, {id:"28115",name:"Pontotoc County"}, {id:"28117",name:"Prentiss County"}, {id:"28119",name:"Quitman County"}, {id:"28121",name:"Rankin County"}, {id:"28123",name:"Scott County"}, {id:"28125",name:"Sharkey County"}, {id:"28127",name:"Simpson County"}, {id:"28129",name:"Smith County"}, {id:"28131",name:"Stone County"}, {id:"28133",name:"Sunflower County"}, {id:"28135",name:"Tallahatchie County"}, {id:"28137",name:"Tate County"}, {id:"28139",name:"Tippah County"}, {id:"28141",name:"Tishomingo County"}, {id:"28143",name:"Tunica County"}, {id:"28145",name:"Union County"}, {id:"28147",name:"Walthall County"}, {id:"28149",name:"Warren County"}, {id:"28151",name:"Washington County"}, {id:"28153",name:"Wayne County"}, {id:"28155",name:"Webster County"}, {id:"28157",name:"Wilkinson County"}, {id:"28159",name:"Winston County"}, {id:"28161",name:"Yalobusha County"}, {id:"28163",name:"Yazoo County"}, {id:"29001",name:"Adair County"}, {id:"29003",name:"Andrew County"}, {id:"29005",name:"Atchison County"}, {id:"29007",name:"Audrain County"}, {id:"29009",name:"Barry County"}, {id:"29011",name:"Barton County"}, {id:"29013",name:"Bates County"}, {id:"29015",name:"Benton County"}, {id:"29017",name:"Bollinger County"}, {id:"29019",name:"Boone County"}, {id:"29021",name:"Buchanan County"}, {id:"29023",name:"Butler County"}, {id:"29025",name:"Caldwell County"}, {id:"29027",name:"Callaway County"}, {id:"29029",name:"Camden County"}, {id:"29031",name:"Cape Girardeau County"}, {id:"29033",name:"Carroll County"}, {id:"29035",name:"Carter County"}, {id:"29037",name:"Cass County"}, {id:"29039",name:"Cedar County"}, {id:"29041",name:"Chariton County"}, {id:"29043",name:"Christian County"}, {id:"29045",name:"Clark County"}, {id:"29047",name:"Clay County"}, {id:"29049",name:"Clinton County"}, {id:"29051",name:"Cole County"}, {id:"29053",name:"Cooper County"}, {id:"29055",name:"Crawford County"}, {id:"29057",name:"Dade County"}, {id:"29059",name:"Dallas County"}, {id:"29061",name:"Daviess County"}, {id:"29063",name:"DeKalb County"}, {id:"29065",name:"Dent County"}, {id:"29067",name:"Douglas County"}, {id:"29069",name:"Dunklin County"}, {id:"29071",name:"Franklin County"}, {id:"29073",name:"Gasconade County"}, {id:"29075",name:"Gentry County"}, {id:"29077",name:"Greene County"}, {id:"29079",name:"Grundy County"}, {id:"29081",name:"Harrison County"}, {id:"29083",name:"Henry County"}, {id:"29085",name:"Hickory County"}, {id:"29087",name:"Holt County"}, {id:"29089",name:"Howard County"}, {id:"29091",name:"Howell County"}, {id:"29093",name:"Iron County"}, {id:"29095",name:"Jackson County"}, {id:"29097",name:"Jasper County"}, {id:"29099",name:"Jefferson County"}, {id:"29101",name:"Johnson County"}, {id:"29103",name:"Knox County"}, {id:"29105",name:"Laclede County"}, {id:"29107",name:"Lafayette County"}, {id:"29109",name:"Lawrence County"}, {id:"29111",name:"Lewis County"}, {id:"29113",name:"Lincoln County"}, {id:"29115",name:"Linn County"}, {id:"29117",name:"Livingston County"}, {id:"29119",name:"McDonald County"}, {id:"29121",name:"Macon County"}, {id:"29123",name:"Madison County"}, {id:"29125",name:"Maries County"}, {id:"29127",name:"Marion County"}, {id:"29129",name:"Mercer County"}, {id:"29131",name:"Miller County"}, {id:"29133",name:"Mississippi County"}, {id:"29135",name:"Moniteau County"}, {id:"29137",name:"Monroe County"}, {id:"29139",name:"Montgomery County"}, {id:"29141",name:"Morgan County"}, {id:"29143",name:"New Madrid County"}, {id:"29145",name:"Newton County"}, {id:"29147",name:"Nodaway County"}, {id:"29149",name:"Oregon County"}, {id:"29151",name:"Osage County"}, {id:"29153",name:"Ozark County"}, {id:"29155",name:"Pemiscot County"}, {id:"29157",name:"Perry County"}, {id:"29159",name:"Pettis County"}, {id:"29161",name:"Phelps County"}, {id:"29163",name:"Pike County"}, {id:"29165",name:"Platte County"}, {id:"29167",name:"Polk County"}, {id:"29169",name:"Pulaski County"}, {id:"29171",name:"Putnam County"}, {id:"29173",name:"Ralls County"}, {id:"29175",name:"Randolph County"}, {id:"29177",name:"Ray County"}, {id:"29179",name:"Reynolds County"}, {id:"29181",name:"Ripley County"}, {id:"29183",name:"St. Charles County"}, {id:"29185",name:"St. Clair County"}, {id:"29186",name:"Ste. Genevieve County"}, {id:"29187",name:"St. Francois County"}, {id:"29189",name:"St. Louis County"}, {id:"29195",name:"Saline County"}, {id:"29197",name:"Schuyler County"}, {id:"29199",name:"Scotland County"}, {id:"29201",name:"Scott County"}, {id:"29203",name:"Shannon County"}, {id:"29205",name:"Shelby County"}, {id:"29207",name:"Stoddard County"}, {id:"29209",name:"Stone County"}, {id:"29211",name:"Sullivan County"}, {id:"29213",name:"Taney County"}, {id:"29215",name:"Texas County"}, {id:"29217",name:"Vernon County"}, {id:"29219",name:"Warren County"}, {id:"29221",name:"Washington County"}, {id:"29223",name:"Wayne County"}, {id:"29225",name:"Webster County"}, {id:"29227",name:"Worth County"}, {id:"29229",name:"Wright County"}, {id:"29510",name:"St. Louis city"}, {id:"30001",name:"Beaverhead County"}, {id:"30003",name:"Big Horn County"}, {id:"30005",name:"Blaine County"}, {id:"30007",name:"Broadwater County"}, {id:"30009",name:"Carbon County"}, {id:"30011",name:"Carter County"}, {id:"30013",name:"Cascade County"}, {id:"30015",name:"Chouteau County"}, {id:"30017",name:"Custer County"}, {id:"30019",name:"Daniels County"}, {id:"30021",name:"Dawson County"}, {id:"30023",name:"Deer Lodge County"}, {id:"30025",name:"Fallon County"}, {id:"30027",name:"Fergus County"}, {id:"30029",name:"Flathead County"}, {id:"30031",name:"Gallatin County"}, {id:"30033",name:"Garfield County"}, {id:"30035",name:"Glacier County"}, {id:"30037",name:"Golden Valley County"}, {id:"30039",name:"Granite County"}, {id:"30041",name:"Hill County"}, {id:"30043",name:"Jefferson County"}, {id:"30045",name:"Judith Basin County"}, {id:"30047",name:"Lake County"}, {id:"30049",name:"Lewis and Clark County"}, {id:"30051",name:"Liberty County"}, {id:"30053",name:"Lincoln County"}, {id:"30055",name:"McCone County"}, {id:"30057",name:"Madison County"}, {id:"30059",name:"Meagher County"}, {id:"30061",name:"Mineral County"}, {id:"30063",name:"Missoula County"}, {id:"30065",name:"Musselshell County"}, {id:"30067",name:"Park County"}, {id:"30069",name:"Petroleum County"}, {id:"30071",name:"Phillips County"}, {id:"30073",name:"Pondera County"}, {id:"30075",name:"Powder River County"}, {id:"30077",name:"Powell County"}, {id:"30079",name:"Prairie County"}, {id:"30081",name:"Ravalli County"}, {id:"30083",name:"Richland County"}, {id:"30085",name:"Roosevelt County"}, {id:"30087",name:"Rosebud County"}, {id:"30089",name:"Sanders County"}, {id:"30091",name:"Sheridan County"}, {id:"30093",name:"Silver Bow County"}, {id:"30095",name:"Stillwater County"}, {id:"30097",name:"Sweet Grass County"}, {id:"30099",name:"Teton County"}, {id:"30101",name:"Toole County"}, {id:"30103",name:"Treasure County"}, {id:"30105",name:"Valley County"}, {id:"30107",name:"Wheatland County"}, {id:"30109",name:"Wibaux County"}, {id:"30111",name:"Yellowstone County"}, {id:"31001",name:"Adams County"}, {id:"31003",name:"Antelope County"}, {id:"31005",name:"Arthur County"}, {id:"31007",name:"Banner County"}, {id:"31009",name:"Blaine County"}, {id:"31011",name:"Boone County"}, {id:"31013",name:"Box Butte County"}, {id:"31015",name:"Boyd County"}, {id:"31017",name:"Brown County"}, {id:"31019",name:"Buffalo County"}, {id:"31021",name:"Burt County"}, {id:"31023",name:"Butler County"}, {id:"31025",name:"Cass County"}, {id:"31027",name:"Cedar County"}, {id:"31029",name:"Chase County"}, {id:"31031",name:"Cherry County"}, {id:"31033",name:"Cheyenne County"}, {id:"31035",name:"Clay County"}, {id:"31037",name:"Colfax County"}, {id:"31039",name:"Cuming County"}, {id:"31041",name:"Custer County"}, {id:"31043",name:"Dakota County"}, {id:"31045",name:"Dawes County"}, {id:"31047",name:"Dawson County"}, {id:"31049",name:"Deuel County"}, {id:"31051",name:"Dixon County"}, {id:"31053",name:"Dodge County"}, {id:"31055",name:"Douglas County"}, {id:"31057",name:"Dundy County"}, {id:"31059",name:"Fillmore County"}, {id:"31061",name:"Franklin County"}, {id:"31063",name:"Frontier County"}, {id:"31065",name:"Furnas County"}, {id:"31067",name:"Gage County"}, {id:"31069",name:"Garden County"}, {id:"31071",name:"Garfield County"}, {id:"31073",name:"Gosper County"}, {id:"31075",name:"Grant County"}, {id:"31077",name:"Greeley County"}, {id:"31079",name:"Hall County"}, {id:"31081",name:"Hamilton County"}, {id:"31083",name:"Harlan County"}, {id:"31085",name:"Hayes County"}, {id:"31087",name:"Hitchcock County"}, {id:"31089",name:"Holt County"}, {id:"31091",name:"Hooker County"}, {id:"31093",name:"Howard County"}, {id:"31095",name:"Jefferson County"}, {id:"31097",name:"Johnson County"}, {id:"31099",name:"Kearney County"}, {id:"31101",name:"Keith County"}, {id:"31103",name:"Keya Paha County"}, {id:"31105",name:"Kimball County"}, {id:"31107",name:"Knox County"}, {id:"31109",name:"Lancaster County"}, {id:"31111",name:"Lincoln County"}, {id:"31113",name:"Logan County"}, {id:"31115",name:"Loup County"}, {id:"31117",name:"McPherson County"}, {id:"31119",name:"Madison County"}, {id:"31121",name:"Merrick County"}, {id:"31123",name:"Morrill County"}, {id:"31125",name:"Nance County"}, {id:"31127",name:"Nemaha County"}, {id:"31129",name:"Nuckolls County"}, {id:"31131",name:"Otoe County"}, {id:"31133",name:"Pawnee County"}, {id:"31135",name:"Perkins County"}, {id:"31137",name:"Phelps County"}, {id:"31139",name:"Pierce County"}, {id:"31141",name:"Platte County"}, {id:"31143",name:"Polk County"}, {id:"31145",name:"Red Willow County"}, {id:"31147",name:"Richardson County"}, {id:"31149",name:"Rock County"}, {id:"31151",name:"Saline County"}, {id:"31153",name:"Sarpy County"}, {id:"31155",name:"Saunders County"}, {id:"31157",name:"Scotts Bluff County"}, {id:"31159",name:"Seward County"}, {id:"31161",name:"Sheridan County"}, {id:"31163",name:"Sherman County"}, {id:"31165",name:"Sioux County"}, {id:"31167",name:"Stanton County"}, {id:"31169",name:"Thayer County"}, {id:"31171",name:"Thomas County"}, {id:"31173",name:"Thurston County"}, {id:"31175",name:"Valley County"}, {id:"31177",name:"Washington County"}, {id:"31179",name:"Wayne County"}, {id:"31181",name:"Webster County"}, {id:"31183",name:"Wheeler County"}, {id:"31185",name:"York County"}, {id:"32001",name:"Churchill County"}, {id:"32003",name:"Clark County"}, {id:"32005",name:"Douglas County"}, {id:"32007",name:"Elko County"}, {id:"32009",name:"Esmeralda County"}, {id:"32011",name:"Eureka County"}, {id:"32013",name:"Humboldt County"}, {id:"32015",name:"Lander County"}, {id:"32017",name:"Lincoln County"}, {id:"32019",name:"Lyon County"}, {id:"32021",name:"Mineral County"}, {id:"32023",name:"Nye County"}, {id:"32027",name:"Pershing County"}, {id:"32029",name:"Storey County"}, {id:"32031",name:"Washoe County"}, {id:"32033",name:"White Pine County"}, {id:"32510",name:"Carson City"}, {id:"33001",name:"Belknap County"}, {id:"33003",name:"Carroll County"}, {id:"33005",name:"Cheshire County"}, {id:"33007",name:"Coos County"}, {id:"33009",name:"Grafton County"}, {id:"33011",name:"Hillsborough County"}, {id:"33013",name:"Merrimack County"}, {id:"33015",name:"Rockingham County"}, {id:"33017",name:"Strafford County"}, {id:"33019",name:"Sullivan County"}, {id:"34001",name:"Atlantic County"}, {id:"34003",name:"Bergen County"}, {id:"34005",name:"Burlington County"}, {id:"34007",name:"Camden County"}, {id:"34009",name:"Cape May County"}, {id:"34011",name:"Cumberland County"}, {id:"34013",name:"Essex County"}, {id:"34015",name:"Gloucester County"}, {id:"34017",name:"Hudson County"}, {id:"34019",name:"Hunterdon County"}, {id:"34021",name:"Mercer County"}, {id:"34023",name:"Middlesex County"}, {id:"34025",name:"Monmouth County"}, {id:"34027",name:"Morris County"}, {id:"34029",name:"Ocean County"}, {id:"34031",name:"Passaic County"}, {id:"34033",name:"Salem County"}, {id:"34035",name:"Somerset County"}, {id:"34037",name:"Sussex County"}, {id:"34039",name:"Union County"}, {id:"34041",name:"Warren County"}, {id:"35001",name:"Bernalillo County"}, {id:"35003",name:"Catron County"}, {id:"35005",name:"Chaves County"}, {id:"35006",name:"Cibola County"}, {id:"35007",name:"Colfax County"}, {id:"35009",name:"Curry County"}, {id:"35011",name:"De Baca County"}, {id:"35013",name:"Dona Ana County"}, {id:"35015",name:"Eddy County"}, {id:"35017",name:"Grant County"}, {id:"35019",name:"Guadalupe County"}, {id:"35021",name:"Harding County"}, {id:"35023",name:"Hidalgo County"}, {id:"35025",name:"Lea County"}, {id:"35027",name:"Lincoln County"}, {id:"35028",name:"Los Alamos County"}, {id:"35029",name:"Luna County"}, {id:"35031",name:"McKinley County"}, {id:"35033",name:"Mora County"}, {id:"35035",name:"Otero County"}, {id:"35037",name:"Quay County"}, {id:"35039",name:"Rio Arriba County"}, {id:"35041",name:"Roosevelt County"}, {id:"35043",name:"Sandoval County"}, {id:"35045",name:"San Juan County"}, {id:"35047",name:"San Miguel County"}, {id:"35049",name:"Santa Fe County"}, {id:"35051",name:"Sierra County"}, {id:"35053",name:"Socorro County"}, {id:"35055",name:"Taos County"}, {id:"35057",name:"Torrance County"}, {id:"35059",name:"Union County"}, {id:"35061",name:"Valencia County"}, {id:"36001",name:"Albany County"}, {id:"36003",name:"Allegany County"}, {id:"36005",name:"Bronx County"}, {id:"36007",name:"Broome County"}, {id:"36009",name:"Cattaraugus County"}, {id:"36011",name:"Cayuga County"}, {id:"36013",name:"Chautauqua County"}, {id:"36015",name:"Chemung County"}, {id:"36017",name:"Chenango County"}, {id:"36019",name:"Clinton County"}, {id:"36021",name:"Columbia County"}, {id:"36023",name:"Cortland County"}, {id:"36025",name:"Delaware County"}, {id:"36027",name:"Dutchess County"}, {id:"36029",name:"Erie County"}, {id:"36031",name:"Essex County"}, {id:"36033",name:"Franklin County"}, {id:"36035",name:"Fulton County"}, {id:"36037",name:"Genesee County"}, {id:"36039",name:"Greene County"}, {id:"36041",name:"Hamilton County"}, {id:"36043",name:"Herkimer County"}, {id:"36045",name:"Jefferson County"}, {id:"36047",name:"Kings County"}, {id:"36049",name:"Lewis County"}, {id:"36051",name:"Livingston County"}, {id:"36053",name:"Madison County"}, {id:"36055",name:"Monroe County"}, {id:"36057",name:"Montgomery County"}, {id:"36059",name:"Nassau County"}, {id:"36061",name:"New York County"}, {id:"36063",name:"Niagara County"}, {id:"36065",name:"Oneida County"}, {id:"36067",name:"Onondaga County"}, {id:"36069",name:"Ontario County"}, {id:"36071",name:"Orange County"}, {id:"36073",name:"Orleans County"}, {id:"36075",name:"Oswego County"}, {id:"36077",name:"Otsego County"}, {id:"36079",name:"Putnam County"}, {id:"36081",name:"Queens County"}, {id:"36083",name:"Rensselaer County"}, {id:"36085",name:"Richmond County"}, {id:"36087",name:"Rockland County"}, {id:"36089",name:"St. Lawrence County"}, {id:"36091",name:"Saratoga County"}, {id:"36093",name:"Schenectady County"}, {id:"36095",name:"Schoharie County"}, {id:"36097",name:"Schuyler County"}, {id:"36099",name:"Seneca County"}, {id:"36101",name:"Steuben County"}, {id:"36103",name:"Suffolk County"}, {id:"36105",name:"Sullivan County"}, {id:"36107",name:"Tioga County"}, {id:"36109",name:"Tompkins County"}, {id:"36111",name:"Ulster County"}, {id:"36113",name:"Warren County"}, {id:"36115",name:"Washington County"}, {id:"36117",name:"Wayne County"}, {id:"36119",name:"Westchester County"}, {id:"36121",name:"Wyoming County"}, {id:"36123",name:"Yates County"}, {id:"37001",name:"Alamance County"}, {id:"37003",name:"Alexander County"}, {id:"37005",name:"Alleghany County"}, {id:"37007",name:"Anson County"}, {id:"37009",name:"Ashe County"}, {id:"37011",name:"Avery County"}, {id:"37013",name:"Beaufort County"}, {id:"37015",name:"Bertie County"}, {id:"37017",name:"Bladen County"}, {id:"37019",name:"Brunswick County"}, {id:"37021",name:"Buncombe County"}, {id:"37023",name:"Burke County"}, {id:"37025",name:"Cabarrus County"}, {id:"37027",name:"Caldwell County"}, {id:"37029",name:"Camden County"}, {id:"37031",name:"Carteret County"}, {id:"37033",name:"Caswell County"}, {id:"37035",name:"Catawba County"}, {id:"37037",name:"Chatham County"}, {id:"37039",name:"Cherokee County"}, {id:"37041",name:"Chowan County"}, {id:"37043",name:"Clay County"}, {id:"37045",name:"Cleveland County"}, {id:"37047",name:"Columbus County"}, {id:"37049",name:"Craven County"}, {id:"37051",name:"Cumberland County"}, {id:"37053",name:"Currituck County"}, {id:"37055",name:"Dare County"}, {id:"37057",name:"Davidson County"}, {id:"37059",name:"Davie County"}, {id:"37061",name:"Duplin County"}, {id:"37063",name:"Durham County"}, {id:"37065",name:"Edgecombe County"}, {id:"37067",name:"Forsyth County"}, {id:"37069",name:"Franklin County"}, {id:"37071",name:"Gaston County"}, {id:"37073",name:"Gates County"}, {id:"37075",name:"Graham County"}, {id:"37077",name:"Granville County"}, {id:"37079",name:"Greene County"}, {id:"37081",name:"Guilford County"}, {id:"37083",name:"Halifax County"}, {id:"37085",name:"Harnett County"}, {id:"37087",name:"Haywood County"}, {id:"37089",name:"Henderson County"}, {id:"37091",name:"Hertford County"}, {id:"37093",name:"Hoke County"}, {id:"37095",name:"Hyde County"}, {id:"37097",name:"Iredell County"}, {id:"37099",name:"Jackson County"}, {id:"37101",name:"Johnston County"}, {id:"37103",name:"Jones County"}, {id:"37105",name:"Lee County"}, {id:"37107",name:"Lenoir County"}, {id:"37109",name:"Lincoln County"}, {id:"37111",name:"McDowell County"}, {id:"37113",name:"Macon County"}, {id:"37115",name:"Madison County"}, {id:"37117",name:"Martin County"}, {id:"37119",name:"Mecklenburg County"}, {id:"37121",name:"Mitchell County"}, {id:"37123",name:"Montgomery County"}, {id:"37125",name:"Moore County"}, {id:"37127",name:"Nash County"}, {id:"37129",name:"New Hanover County"}, {id:"37131",name:"Northampton County"}, {id:"37133",name:"Onslow County"}, {id:"37135",name:"Orange County"}, {id:"37137",name:"Pamlico County"}, {id:"37139",name:"Pasquotank County"}, {id:"37141",name:"Pender County"}, {id:"37143",name:"Perquimans County"}, {id:"37145",name:"Person County"}, {id:"37147",name:"Pitt County"}, {id:"37149",name:"Polk County"}, {id:"37151",name:"Randolph County"}, {id:"37153",name:"Richmond County"}, {id:"37155",name:"Robeson County"}, {id:"37157",name:"Rockingham County"}, {id:"37159",name:"Rowan County"}, {id:"37161",name:"Rutherford County"}, {id:"37163",name:"Sampson County"}, {id:"37165",name:"Scotland County"}, {id:"37167",name:"Stanly County"}, {id:"37169",name:"Stokes County"}, {id:"37171",name:"Surry County"}, {id:"37173",name:"Swain County"}, {id:"37175",name:"Transylvania County"}, {id:"37177",name:"Tyrrell County"}, {id:"37179",name:"Union County"}, {id:"37181",name:"Vance County"}, {id:"37183",name:"Wake County"}, {id:"37185",name:"Warren County"}, {id:"37187",name:"Washington County"}, {id:"37189",name:"Watauga County"}, {id:"37191",name:"Wayne County"}, {id:"37193",name:"Wilkes County"}, {id:"37195",name:"Wilson County"}, {id:"37197",name:"Yadkin County"}, {id:"37199",name:"Yancey County"}, {id:"38001",name:"Adams County"}, {id:"38003",name:"Barnes County"}, {id:"38005",name:"Benson County"}, {id:"38007",name:"Billings County"}, {id:"38009",name:"Bottineau County"}, {id:"38011",name:"Bowman County"}, {id:"38013",name:"Burke County"}, {id:"38015",name:"Burleigh County"}, {id:"38017",name:"Cass County"}, {id:"38019",name:"Cavalier County"}, {id:"38021",name:"Dickey County"}, {id:"38023",name:"Divide County"}, {id:"38025",name:"Dunn County"}, {id:"38027",name:"Eddy County"}, {id:"38029",name:"Emmons County"}, {id:"38031",name:"Foster County"}, {id:"38033",name:"Golden Valley County"}, {id:"38035",name:"Grand Forks County"}, {id:"38037",name:"Grant County"}, {id:"38039",name:"Griggs County"}, {id:"38041",name:"Hettinger County"}, {id:"38043",name:"Kidder County"}, {id:"38045",name:"LaMoure County"}, {id:"38047",name:"Logan County"}, {id:"38049",name:"McHenry County"}, {id:"38051",name:"McIntosh County"}, {id:"38053",name:"McKenzie County"}, {id:"38055",name:"McLean County"}, {id:"38057",name:"Mercer County"}, {id:"38059",name:"Morton County"}, {id:"38061",name:"Mountrail County"}, {id:"38063",name:"Nelson County"}, {id:"38065",name:"Oliver County"}, {id:"38067",name:"Pembina County"}, {id:"38069",name:"Pierce County"}, {id:"38071",name:"Ramsey County"}, {id:"38073",name:"Ransom County"}, {id:"38075",name:"Renville County"}, {id:"38077",name:"Richland County"}, {id:"38079",name:"Rolette County"}, {id:"38081",name:"Sargent County"}, {id:"38083",name:"Sheridan County"}, {id:"38085",name:"Sioux County"}, {id:"38087",name:"Slope County"}, {id:"38089",name:"Stark County"}, {id:"38091",name:"Steele County"}, {id:"38093",name:"Stutsman County"}, {id:"38095",name:"Towner County"}, {id:"38097",name:"Traill County"}, {id:"38099",name:"Walsh County"}, {id:"38101",name:"Ward County"}, {id:"38103",name:"Wells County"}, {id:"38105",name:"Williams County"}, {id:"39001",name:"Adams County"}, {id:"39003",name:"Allen County"}, {id:"39005",name:"Ashland County"}, {id:"39007",name:"Ashtabula County"}, {id:"39009",name:"Athens County"}, {id:"39011",name:"Auglaize County"}, {id:"39013",name:"Belmont County"}, {id:"39015",name:"Brown County"}, {id:"39017",name:"Butler County"}, {id:"39019",name:"Carroll County"}, {id:"39021",name:"Champaign County"}, {id:"39023",name:"Clark County"}, {id:"39025",name:"Clermont County"}, {id:"39027",name:"Clinton County"}, {id:"39029",name:"Columbiana County"}, {id:"39031",name:"Coshocton County"}, {id:"39033",name:"Crawford County"}, {id:"39035",name:"Cuyahoga County"}, {id:"39037",name:"Darke County"}, {id:"39039",name:"Defiance County"}, {id:"39041",name:"Delaware County"}, {id:"39043",name:"Erie County"}, {id:"39045",name:"Fairfield County"}, {id:"39047",name:"Fayette County"}, {id:"39049",name:"Franklin County"}, {id:"39051",name:"Fulton County"}, {id:"39053",name:"Gallia County"}, {id:"39055",name:"Geauga County"}, {id:"39057",name:"Greene County"}, {id:"39059",name:"Guernsey County"}, {id:"39061",name:"Hamilton County"}, {id:"39063",name:"Hancock County"}, {id:"39065",name:"Hardin County"}, {id:"39067",name:"Harrison County"}, {id:"39069",name:"Henry County"}, {id:"39071",name:"Highland County"}, {id:"39073",name:"Hocking County"}, {id:"39075",name:"Holmes County"}, {id:"39077",name:"Huron County"}, {id:"39079",name:"Jackson County"}, {id:"39081",name:"Jefferson County"}, {id:"39083",name:"Knox County"}, {id:"39085",name:"Lake County"}, {id:"39087",name:"Lawrence County"}, {id:"39089",name:"Licking County"}, {id:"39091",name:"Logan County"}, {id:"39093",name:"Lorain County"}, {id:"39095",name:"Lucas County"}, {id:"39097",name:"Madison County"}, {id:"39099",name:"Mahoning County"}, {id:"39101",name:"Marion County"}, {id:"39103",name:"Medina County"}, {id:"39105",name:"Meigs County"}, {id:"39107",name:"Mercer County"}, {id:"39109",name:"Miami County"}, {id:"39111",name:"Monroe County"}, {id:"39113",name:"Montgomery County"}, {id:"39115",name:"Morgan County"}, {id:"39117",name:"Morrow County"}, {id:"39119",name:"Muskingum County"}, {id:"39121",name:"Noble County"}, {id:"39123",name:"Ottawa County"}, {id:"39125",name:"Paulding County"}, {id:"39127",name:"Perry County"}, {id:"39129",name:"Pickaway County"}, {id:"39131",name:"Pike County"}, {id:"39133",name:"Portage County"}, {id:"39135",name:"Preble County"}, {id:"39137",name:"Putnam County"}, {id:"39139",name:"Richland County"}, {id:"39141",name:"Ross County"}, {id:"39143",name:"Sandusky County"}, {id:"39145",name:"Scioto County"}, {id:"39147",name:"Seneca County"}, {id:"39149",name:"Shelby County"}, {id:"39151",name:"Stark County"}, {id:"39153",name:"Summit County"}, {id:"39155",name:"Trumbull County"}, {id:"39157",name:"Tuscarawas County"}, {id:"39159",name:"Union County"}, {id:"39161",name:"Van Wert County"}, {id:"39163",name:"Vinton County"}, {id:"39165",name:"Warren County"}, {id:"39167",name:"Washington County"}, {id:"39169",name:"Wayne County"}, {id:"39171",name:"Williams County"}, {id:"39173",name:"Wood County"}, {id:"39175",name:"Wyandot County"}, {id:"40001",name:"Adair County"}, {id:"40003",name:"Alfalfa County"}, {id:"40005",name:"Atoka County"}, {id:"40007",name:"Beaver County"}, {id:"40009",name:"Beckham County"}, {id:"40011",name:"Blaine County"}, {id:"40013",name:"Bryan County"}, {id:"40015",name:"Caddo County"}, {id:"40017",name:"Canadian County"}, {id:"40019",name:"Carter County"}, {id:"40021",name:"Cherokee County"}, {id:"40023",name:"Choctaw County"}, {id:"40025",name:"Cimarron County"}, {id:"40027",name:"Cleveland County"}, {id:"40029",name:"Coal County"}, {id:"40031",name:"Comanche County"}, {id:"40033",name:"Cotton County"}, {id:"40035",name:"Craig County"}, {id:"40037",name:"Creek County"}, {id:"40039",name:"Custer County"}, {id:"40041",name:"Delaware County"}, {id:"40043",name:"Dewey County"}, {id:"40045",name:"Ellis County"}, {id:"40047",name:"Garfield County"}, {id:"40049",name:"Garvin County"}, {id:"40051",name:"Grady County"}, {id:"40053",name:"Grant County"}, {id:"40055",name:"Greer County"}, {id:"40057",name:"Harmon County"}, {id:"40059",name:"Harper County"}, {id:"40061",name:"Haskell County"}, {id:"40063",name:"Hughes County"}, {id:"40065",name:"Jackson County"}, {id:"40067",name:"Jefferson County"}, {id:"40069",name:"Johnston County"}, {id:"40071",name:"Kay County"}, {id:"40073",name:"Kingfisher County"}, {id:"40075",name:"Kiowa County"}, {id:"40077",name:"Latimer County"}, {id:"40079",name:"Le Flore County"}, {id:"40081",name:"Lincoln County"}, {id:"40083",name:"Logan County"}, {id:"40085",name:"Love County"}, {id:"40087",name:"McClain County"}, {id:"40089",name:"McCurtain County"}, {id:"40091",name:"McIntosh County"}, {id:"40093",name:"Major County"}, {id:"40095",name:"Marshall County"}, {id:"40097",name:"Mayes County"}, {id:"40099",name:"Murray County"}, {id:"40101",name:"Muskogee County"}, {id:"40103",name:"Noble County"}, {id:"40105",name:"Nowata County"}, {id:"40107",name:"Okfuskee County"}, {id:"40109",name:"Oklahoma County"}, {id:"40111",name:"Okmulgee County"}, {id:"40113",name:"Osage County"}, {id:"40115",name:"Ottawa County"}, {id:"40117",name:"Pawnee County"}, {id:"40119",name:"Payne County"}, {id:"40121",name:"Pittsburg County"}, {id:"40123",name:"Pontotoc County"}, {id:"40125",name:"Pottawatomie County"}, {id:"40127",name:"Pushmataha County"}, {id:"40129",name:"Roger Mills County"}, {id:"40131",name:"Rogers County"}, {id:"40133",name:"Seminole County"}, {id:"40135",name:"Sequoyah County"}, {id:"40137",name:"Stephens County"}, {id:"40139",name:"Texas County"}, {id:"40141",name:"Tillman County"}, {id:"40143",name:"Tulsa County"}, {id:"40145",name:"Wagoner County"}, {id:"40147",name:"Washington County"}, {id:"40149",name:"Washita County"}, {id:"40151",name:"Woods County"}, {id:"40153",name:"Woodward County"}, {id:"41001",name:"Baker County"}, {id:"41003",name:"Benton County"}, {id:"41005",name:"Clackamas County"}, {id:"41007",name:"Clatsop County"}, {id:"41009",name:"Columbia County"}, {id:"41011",name:"Coos County"}, {id:"41013",name:"Crook County"}, {id:"41015",name:"Curry County"}, {id:"41017",name:"Deschutes County"}, {id:"41019",name:"Douglas County"}, {id:"41021",name:"Gilliam County"}, {id:"41023",name:"Grant County"}, {id:"41025",name:"Harney County"}, {id:"41027",name:"Hood River County"}, {id:"41029",name:"Jackson County"}, {id:"41031",name:"Jefferson County"}, {id:"41033",name:"Josephine County"}, {id:"41035",name:"Klamath County"}, {id:"41037",name:"Lake County"}, {id:"41039",name:"Lane County"}, {id:"41041",name:"Lincoln County"}, {id:"41043",name:"Linn County"}, {id:"41045",name:"Malheur County"}, {id:"41047",name:"Marion County"}, {id:"41049",name:"Morrow County"}, {id:"41051",name:"Multnomah County"}, {id:"41053",name:"Polk County"}, {id:"41055",name:"Sherman County"}, {id:"41057",name:"Tillamook County"}, {id:"41059",name:"Umatilla County"}, {id:"41061",name:"Union County"}, {id:"41063",name:"Wallowa County"}, {id:"41065",name:"Wasco County"}, {id:"41067",name:"Washington County"}, {id:"41069",name:"Wheeler County"}, {id:"41071",name:"Yamhill County"}, {id:"42001",name:"Adams County"}, {id:"42003",name:"Allegheny County"}, {id:"42005",name:"Armstrong County"}, {id:"42007",name:"Beaver County"}, {id:"42009",name:"Bedford County"}, {id:"42011",name:"Berks County"}, {id:"42013",name:"Blair County"}, {id:"42015",name:"Bradford County"}, {id:"42017",name:"Bucks County"}, {id:"42019",name:"Butler County"}, {id:"42021",name:"Cambria County"}, {id:"42023",name:"Cameron County"}, {id:"42025",name:"Carbon County"}, {id:"42027",name:"Centre County"}, {id:"42029",name:"Chester County"}, {id:"42031",name:"Clarion County"}, {id:"42033",name:"Clearfield County"}, {id:"42035",name:"Clinton County"}, {id:"42037",name:"Columbia County"}, {id:"42039",name:"Crawford County"}, {id:"42041",name:"Cumberland County"}, {id:"42043",name:"Dauphin County"}, {id:"42045",name:"Delaware County"}, {id:"42047",name:"Elk County"}, {id:"42049",name:"Erie County"}, {id:"42051",name:"Fayette County"}, {id:"42053",name:"Forest County"}, {id:"42055",name:"Franklin County"}, {id:"42057",name:"Fulton County"}, {id:"42059",name:"Greene County"}, {id:"42061",name:"Huntingdon County"}, {id:"42063",name:"Indiana County"}, {id:"42065",name:"Jefferson County"}, {id:"42067",name:"Juniata County"}, {id:"42069",name:"Lackawanna County"}, {id:"42071",name:"Lancaster County"}, {id:"42073",name:"Lawrence County"}, {id:"42075",name:"Lebanon County"}, {id:"42077",name:"Lehigh County"}, {id:"42079",name:"Luzerne County"}, {id:"42081",name:"Lycoming County"}, {id:"42083",name:"McKean County"}, {id:"42085",name:"Mercer County"}, {id:"42087",name:"Mifflin County"}, {id:"42089",name:"Monroe County"}, {id:"42091",name:"Montgomery County"}, {id:"42093",name:"Montour County"}, {id:"42095",name:"Northampton County"}, {id:"42097",name:"Northumberland County"}, {id:"42099",name:"Perry County"}, {id:"42101",name:"Philadelphia County"}, {id:"42103",name:"Pike County"}, {id:"42105",name:"Potter County"}, {id:"42107",name:"Schuylkill County"}, {id:"42109",name:"Snyder County"}, {id:"42111",name:"Somerset County"}, {id:"42113",name:"Sullivan County"}, {id:"42115",name:"Susquehanna County"}, {id:"42117",name:"Tioga County"}, {id:"42119",name:"Union County"}, {id:"42121",name:"Venango County"}, {id:"42123",name:"Warren County"}, {id:"42125",name:"Washington County"}, {id:"42127",name:"Wayne County"}, {id:"42129",name:"Westmoreland County"}, {id:"42131",name:"Wyoming County"}, {id:"42133",name:"York County"}, {id:"44001",name:"Bristol County"}, {id:"44003",name:"Kent County"}, {id:"44005",name:"Newport County"}, {id:"44007",name:"Providence County"}, {id:"44009",name:"Washington County"}, {id:"45001",name:"Abbeville County"}, {id:"45003",name:"Aiken County"}, {id:"45005",name:"Allendale County"}, {id:"45007",name:"Anderson County"}, {id:"45009",name:"Bamberg County"}, {id:"45011",name:"Barnwell County"}, {id:"45013",name:"Beaufort County"}, {id:"45015",name:"Berkeley County"}, {id:"45017",name:"Calhoun County"}, {id:"45019",name:"Charleston County"}, {id:"45021",name:"Cherokee County"}, {id:"45023",name:"Chester County"}, {id:"45025",name:"Chesterfield County"}, {id:"45027",name:"Clarendon County"}, {id:"45029",name:"Colleton County"}, {id:"45031",name:"Darlington County"}, {id:"45033",name:"Dillon County"}, {id:"45035",name:"Dorchester County"}, {id:"45037",name:"Edgefield County"}, {id:"45039",name:"Fairfield County"}, {id:"45041",name:"Florence County"}, {id:"45043",name:"Georgetown County"}, {id:"45045",name:"Greenville County"}, {id:"45047",name:"Greenwood County"}, {id:"45049",name:"Hampton County"}, {id:"45051",name:"Horry County"}, {id:"45053",name:"Jasper County"}, {id:"45055",name:"Kershaw County"}, {id:"45057",name:"Lancaster County"}, {id:"45059",name:"Laurens County"}, {id:"45061",name:"Lee County"}, {id:"45063",name:"Lexington County"}, {id:"45065",name:"McCormick County"}, {id:"45067",name:"Marion County"}, {id:"45069",name:"Marlboro County"}, {id:"45071",name:"Newberry County"}, {id:"45073",name:"Oconee County"}, {id:"45075",name:"Orangeburg County"}, {id:"45077",name:"Pickens County"}, {id:"45079",name:"Richland County"}, {id:"45081",name:"Saluda County"}, {id:"45083",name:"Spartanburg County"}, {id:"45085",name:"Sumter County"}, {id:"45087",name:"Union County"}, {id:"45089",name:"Williamsburg County"}, {id:"45091",name:"York County"}, {id:"46003",name:"Aurora County"}, {id:"46005",name:"Beadle County"}, {id:"46007",name:"Bennett County"}, {id:"46009",name:"Bon Homme County"}, {id:"46011",name:"Brookings County"}, {id:"46013",name:"Brown County"}, {id:"46015",name:"Brule County"}, {id:"46017",name:"Buffalo County"}, {id:"46019",name:"Butte County"}, {id:"46021",name:"Campbell County"}, {id:"46023",name:"Charles Mix County"}, {id:"46025",name:"Clark County"}, {id:"46027",name:"Clay County"}, {id:"46029",name:"Codington County"}, {id:"46031",name:"Corson County"}, {id:"46033",name:"Custer County"}, {id:"46035",name:"Davison County"}, {id:"46037",name:"Day County"}, {id:"46039",name:"Deuel County"}, {id:"46041",name:"Dewey County"}, {id:"46043",name:"Douglas County"}, {id:"46045",name:"Edmunds County"}, {id:"46047",name:"Fall River County"}, {id:"46049",name:"Faulk County"}, {id:"46051",name:"Grant County"}, {id:"46053",name:"Gregory County"}, {id:"46055",name:"Haakon County"}, {id:"46057",name:"Hamlin County"}, {id:"46059",name:"Hand County"}, {id:"46061",name:"Hanson County"}, {id:"46063",name:"Harding County"}, {id:"46065",name:"Hughes County"}, {id:"46067",name:"Hutchinson County"}, {id:"46069",name:"Hyde County"}, {id:"46071",name:"Jackson County"}, {id:"46073",name:"Jerauld County"}, {id:"46075",name:"Jones County"}, {id:"46077",name:"Kingsbury County"}, {id:"46079",name:"Lake County"}, {id:"46081",name:"Lawrence County"}, {id:"46083",name:"Lincoln County"}, {id:"46085",name:"Lyman County"}, {id:"46087",name:"McCook County"}, {id:"46089",name:"McPherson County"}, {id:"46091",name:"Marshall County"}, {id:"46093",name:"Meade County"}, {id:"46095",name:"Mellette County"}, {id:"46097",name:"Miner County"}, {id:"46099",name:"Minnehaha County"}, {id:"46101",name:"Moody County"}, {id:"46103",name:"Pennington County"}, {id:"46105",name:"Perkins County"}, {id:"46107",name:"Potter County"}, {id:"46109",name:"Roberts County"}, {id:"46111",name:"Sanborn County"}, {id:"46113",name:"Shannon County"}, {id:"46115",name:"Spink County"}, {id:"46117",name:"Stanley County"}, {id:"46119",name:"Sully County"}, {id:"46121",name:"Todd County"}, {id:"46123",name:"Tripp County"}, {id:"46125",name:"Turner County"}, {id:"46127",name:"Union County"}, {id:"46129",name:"Walworth County"}, {id:"46135",name:"Yankton County"}, {id:"46137",name:"Ziebach County"}, {id:"47001",name:"Anderson County"}, {id:"47003",name:"Bedford County"}, {id:"47005",name:"Benton County"}, {id:"47007",name:"Bledsoe County"}, {id:"47009",name:"Blount County"}, {id:"47011",name:"Bradley County"}, {id:"47013",name:"Campbell County"}, {id:"47015",name:"Cannon County"}, {id:"47017",name:"Carroll County"}, {id:"47019",name:"Carter County"}, {id:"47021",name:"Cheatham County"}, {id:"47023",name:"Chester County"}, {id:"47025",name:"Claiborne County"}, {id:"47027",name:"Clay County"}, {id:"47029",name:"Cocke County"}, {id:"47031",name:"Coffee County"}, {id:"47033",name:"Crockett County"}, {id:"47035",name:"Cumberland County"}, {id:"47037",name:"Davidson County"}, {id:"47039",name:"Decatur County"}, {id:"47041",name:"DeKalb County"}, {id:"47043",name:"Dickson County"}, {id:"47045",name:"Dyer County"}, {id:"47047",name:"Fayette County"}, {id:"47049",name:"Fentress County"}, {id:"47051",name:"Franklin County"}, {id:"47053",name:"Gibson County"}, {id:"47055",name:"Giles County"}, {id:"47057",name:"Grainger County"}, {id:"47059",name:"Greene County"}, {id:"47061",name:"Grundy County"}, {id:"47063",name:"Hamblen County"}, {id:"47065",name:"Hamilton County"}, {id:"47067",name:"Hancock County"}, {id:"47069",name:"Hardeman County"}, {id:"47071",name:"Hardin County"}, {id:"47073",name:"Hawkins County"}, {id:"47075",name:"Haywood County"}, {id:"47077",name:"Henderson County"}, {id:"47079",name:"Henry County"}, {id:"47081",name:"Hickman County"}, {id:"47083",name:"Houston County"}, {id:"47085",name:"Humphreys County"}, {id:"47087",name:"Jackson County"}, {id:"47089",name:"Jefferson County"}, {id:"47091",name:"Johnson County"}, {id:"47093",name:"Knox County"}, {id:"47095",name:"Lake County"}, {id:"47097",name:"Lauderdale County"}, {id:"47099",name:"Lawrence County"}, {id:"47101",name:"Lewis County"}, {id:"47103",name:"Lincoln County"}, {id:"47105",name:"Loudon County"}, {id:"47107",name:"McMinn County"}, {id:"47109",name:"McNairy County"}, {id:"47111",name:"Macon County"}, {id:"47113",name:"Madison County"}, {id:"47115",name:"Marion County"}, {id:"47117",name:"Marshall County"}, {id:"47119",name:"Maury County"}, {id:"47121",name:"Meigs County"}, {id:"47123",name:"Monroe County"}, {id:"47125",name:"Montgomery County"}, {id:"47127",name:"Moore County"}, {id:"47129",name:"Morgan County"}, {id:"47131",name:"Obion County"}, {id:"47133",name:"Overton County"}, {id:"47135",name:"Perry County"}, {id:"47137",name:"Pickett County"}, {id:"47139",name:"Polk County"}, {id:"47141",name:"Putnam County"}, {id:"47143",name:"Rhea County"}, {id:"47145",name:"Roane County"}, {id:"47147",name:"Robertson County"}, {id:"47149",name:"Rutherford County"}, {id:"47151",name:"Scott County"}, {id:"47153",name:"Sequatchie County"}, {id:"47155",name:"Sevier County"}, {id:"47157",name:"Shelby County"}, {id:"47159",name:"Smith County"}, {id:"47161",name:"Stewart County"}, {id:"47163",name:"Sullivan County"}, {id:"47165",name:"Sumner County"}, {id:"47167",name:"Tipton County"}, {id:"47169",name:"Trousdale County"}, {id:"47171",name:"Unicoi County"}, {id:"47173",name:"Union County"}, {id:"47175",name:"Van Buren County"}, {id:"47177",name:"Warren County"}, {id:"47179",name:"Washington County"}, {id:"47181",name:"Wayne County"}, {id:"47183",name:"Weakley County"}, {id:"47185",name:"White County"}, {id:"47187",name:"Williamson County"}, {id:"47189",name:"Wilson County"}, {id:"48001",name:"Anderson County"}, {id:"48003",name:"Andrews County"}, {id:"48005",name:"Angelina County"}, {id:"48007",name:"Aransas County"}, {id:"48009",name:"Archer County"}, {id:"48011",name:"Armstrong County"}, {id:"48013",name:"Atascosa County"}, {id:"48015",name:"Austin County"}, {id:"48017",name:"Bailey County"}, {id:"48019",name:"Bandera County"}, {id:"48021",name:"Bastrop County"}, {id:"48023",name:"Baylor County"}, {id:"48025",name:"Bee County"}, {id:"48027",name:"Bell County"}, {id:"48029",name:"Bexar County"}, {id:"48031",name:"Blanco County"}, {id:"48033",name:"Borden County"}, {id:"48035",name:"Bosque County"}, {id:"48037",name:"Bowie County"}, {id:"48039",name:"Brazoria County"}, {id:"48041",name:"Brazos County"}, {id:"48043",name:"Brewster County"}, {id:"48045",name:"Briscoe County"}, {id:"48047",name:"Brooks County"}, {id:"48049",name:"Brown County"}, {id:"48051",name:"Burleson County"}, {id:"48053",name:"Burnet County"}, {id:"48055",name:"Caldwell County"}, {id:"48057",name:"Calhoun County"}, {id:"48059",name:"Callahan County"}, {id:"48061",name:"Cameron County"}, {id:"48063",name:"Camp County"}, {id:"48065",name:"Carson County"}, {id:"48067",name:"Cass County"}, {id:"48069",name:"Castro County"}, {id:"48071",name:"Chambers County"}, {id:"48073",name:"Cherokee County"}, {id:"48075",name:"Childress County"}, {id:"48077",name:"Clay County"}, {id:"48079",name:"Cochran County"}, {id:"48081",name:"Coke County"}, {id:"48083",name:"Coleman County"}, {id:"48085",name:"Collin County"}, {id:"48087",name:"Collingsworth County"}, {id:"48089",name:"Colorado County"}, {id:"48091",name:"Comal County"}, {id:"48093",name:"Comanche County"}, {id:"48095",name:"Concho County"}, {id:"48097",name:"Cooke County"}, {id:"48099",name:"Coryell County"}, {id:"48101",name:"Cottle County"}, {id:"48103",name:"Crane County"}, {id:"48105",name:"Crockett County"}, {id:"48107",name:"Crosby County"}, {id:"48109",name:"Culberson County"}, {id:"48111",name:"Dallam County"}, {id:"48113",name:"Dallas County"}, {id:"48115",name:"Dawson County"}, {id:"48117",name:"Deaf Smith County"}, {id:"48119",name:"Delta County"}, {id:"48121",name:"Denton County"}, {id:"48123",name:"DeWitt County"}, {id:"48125",name:"Dickens County"}, {id:"48127",name:"Dimmit County"}, {id:"48129",name:"Donley County"}, {id:"48131",name:"Duval County"}, {id:"48133",name:"Eastland County"}, {id:"48135",name:"Ector County"}, {id:"48137",name:"Edwards County"}, {id:"48139",name:"Ellis County"}, {id:"48141",name:"El Paso County"}, {id:"48143",name:"Erath County"}, {id:"48145",name:"Falls County"}, {id:"48147",name:"Fannin County"}, {id:"48149",name:"Fayette County"}, {id:"48151",name:"Fisher County"}, {id:"48153",name:"Floyd County"}, {id:"48155",name:"Foard County"}, {id:"48157",name:"Fort Bend County"}, {id:"48159",name:"Franklin County"}, {id:"48161",name:"Freestone County"}, {id:"48163",name:"Frio County"}, {id:"48165",name:"Gaines County"}, {id:"48167",name:"Galveston County"}, {id:"48169",name:"Garza County"}, {id:"48171",name:"Gillespie County"}, {id:"48173",name:"Glasscock County"}, {id:"48175",name:"Goliad County"}, {id:"48177",name:"Gonzales County"}, {id:"48179",name:"Gray County"}, {id:"48181",name:"Grayson County"}, {id:"48183",name:"Gregg County"}, {id:"48185",name:"Grimes County"}, {id:"48187",name:"Guadalupe County"}, {id:"48189",name:"Hale County"}, {id:"48191",name:"Hall County"}, {id:"48193",name:"Hamilton County"}, {id:"48195",name:"Hansford County"}, {id:"48197",name:"Hardeman County"}, {id:"48199",name:"Hardin County"}, {id:"48201",name:"Harris County"}, {id:"48203",name:"Harrison County"}, {id:"48205",name:"Hartley County"}, {id:"48207",name:"Haskell County"}, {id:"48209",name:"Hays County"}, {id:"48211",name:"Hemphill County"}, {id:"48213",name:"Henderson County"}, {id:"48215",name:"Hidalgo County"}, {id:"48217",name:"Hill County"}, {id:"48219",name:"Hockley County"}, {id:"48221",name:"Hood County"}, {id:"48223",name:"Hopkins County"}, {id:"48225",name:"Houston County"}, {id:"48227",name:"Howard County"}, {id:"48229",name:"Hudspeth County"}, {id:"48231",name:"Hunt County"}, {id:"48233",name:"Hutchinson County"}, {id:"48235",name:"Irion County"}, {id:"48237",name:"Jack County"}, {id:"48239",name:"Jackson County"}, {id:"48241",name:"Jasper County"}, {id:"48243",name:"Jeff Davis County"}, {id:"48245",name:"Jefferson County"}, {id:"48247",name:"Jim Hogg County"}, {id:"48249",name:"Jim Wells County"}, {id:"48251",name:"Johnson County"}, {id:"48253",name:"Jones County"}, {id:"48255",name:"Karnes County"}, {id:"48257",name:"Kaufman County"}, {id:"48259",name:"Kendall County"}, {id:"48261",name:"Kenedy County"}, {id:"48263",name:"Kent County"}, {id:"48265",name:"Kerr County"}, {id:"48267",name:"Kimble County"}, {id:"48269",name:"King County"}, {id:"48271",name:"Kinney County"}, {id:"48273",name:"Kleberg County"}, {id:"48275",name:"Knox County"}, {id:"48277",name:"Lamar County"}, {id:"48279",name:"Lamb County"}, {id:"48281",name:"Lampasas County"}, {id:"48283",name:"La Salle County"}, {id:"48285",name:"Lavaca County"}, {id:"48287",name:"Lee County"}, {id:"48289",name:"Leon County"}, {id:"48291",name:"Liberty County"}, {id:"48293",name:"Limestone County"}, {id:"48295",name:"Lipscomb County"}, {id:"48297",name:"Live Oak County"}, {id:"48299",name:"Llano County"}, {id:"48301",name:"Loving County"}, {id:"48303",name:"Lubbock County"}, {id:"48305",name:"Lynn County"}, {id:"48307",name:"McCulloch County"}, {id:"48309",name:"McLennan County"}, {id:"48311",name:"McMullen County"}, {id:"48313",name:"Madison County"}, {id:"48315",name:"Marion County"}, {id:"48317",name:"Martin County"}, {id:"48319",name:"Mason County"}, {id:"48321",name:"Matagorda County"}, {id:"48323",name:"Maverick County"}, {id:"48325",name:"Medina County"}, {id:"48327",name:"Menard County"}, {id:"48329",name:"Midland County"}, {id:"48331",name:"Milam County"}, {id:"48333",name:"Mills County"}, {id:"48335",name:"Mitchell County"}, {id:"48337",name:"Montague County"}, {id:"48339",name:"Montgomery County"}, {id:"48341",name:"Moore County"}, {id:"48343",name:"Morris County"}, {id:"48345",name:"Motley County"}, {id:"48347",name:"Nacogdoches County"}, {id:"48349",name:"Navarro County"}, {id:"48351",name:"Newton County"}, {id:"48353",name:"Nolan County"}, {id:"48355",name:"Nueces County"}, {id:"48357",name:"Ochiltree County"}, {id:"48359",name:"Oldham County"}, {id:"48361",name:"Orange County"}, {id:"48363",name:"Palo Pinto County"}, {id:"48365",name:"Panola County"}, {id:"48367",name:"Parker County"}, {id:"48369",name:"Parmer County"}, {id:"48371",name:"Pecos County"}, {id:"48373",name:"Polk County"}, {id:"48375",name:"Potter County"}, {id:"48377",name:"Presidio County"}, {id:"48379",name:"Rains County"}, {id:"48381",name:"Randall County"}, {id:"48383",name:"Reagan County"}, {id:"48385",name:"Real County"}, {id:"48387",name:"Red River County"}, {id:"48389",name:"Reeves County"}, {id:"48391",name:"Refugio County"}, {id:"48393",name:"Roberts County"}, {id:"48395",name:"Robertson County"}, {id:"48397",name:"Rockwall County"}, {id:"48399",name:"Runnels County"}, {id:"48401",name:"Rusk County"}, {id:"48403",name:"Sabine County"}, {id:"48405",name:"San Augustine County"}, {id:"48407",name:"San Jacinto County"}, {id:"48409",name:"San Patricio County"}, {id:"48411",name:"San Saba County"}, {id:"48413",name:"Schleicher County"}, {id:"48415",name:"Scurry County"}, {id:"48417",name:"Shackelford County"}, {id:"48419",name:"Shelby County"}, {id:"48421",name:"Sherman County"}, {id:"48423",name:"Smith County"}, {id:"48425",name:"Somervell County"}, {id:"48427",name:"Starr County"}, {id:"48429",name:"Stephens County"}, {id:"48431",name:"Sterling County"}, {id:"48433",name:"Stonewall County"}, {id:"48435",name:"Sutton County"}, {id:"48437",name:"Swisher County"}, {id:"48439",name:"Tarrant County"}, {id:"48441",name:"Taylor County"}, {id:"48443",name:"Terrell County"}, {id:"48445",name:"Terry County"}, {id:"48447",name:"Throckmorton County"}, {id:"48449",name:"Titus County"}, {id:"48451",name:"Tom Green County"}, {id:"48453",name:"Travis County"}, {id:"48455",name:"Trinity County"}, {id:"48457",name:"Tyler County"}, {id:"48459",name:"Upshur County"}, {id:"48461",name:"Upton County"}, {id:"48463",name:"Uvalde County"}, {id:"48465",name:"Val Verde County"}, {id:"48467",name:"Van Zandt County"}, {id:"48469",name:"Victoria County"}, {id:"48471",name:"Walker County"}, {id:"48473",name:"Waller County"}, {id:"48475",name:"Ward County"}, {id:"48477",name:"Washington County"}, {id:"48479",name:"Webb County"}, {id:"48481",name:"Wharton County"}, {id:"48483",name:"Wheeler County"}, {id:"48485",name:"Wichita County"}, {id:"48487",name:"Wilbarger County"}, {id:"48489",name:"Willacy County"}, {id:"48491",name:"Williamson County"}, {id:"48493",name:"Wilson County"}, {id:"48495",name:"Winkler County"}, {id:"48497",name:"Wise County"}, {id:"48499",name:"Wood County"}, {id:"48501",name:"Yoakum County"}, {id:"48503",name:"Young County"}, {id:"48505",name:"Zapata County"}, {id:"48507",name:"Zavala County"}, {id:"49001",name:"Beaver County"}, {id:"49003",name:"Box Elder County"}, {id:"49005",name:"Cache County"}, {id:"49007",name:"Carbon County"}, {id:"49009",name:"Daggett County"}, {id:"49011",name:"Davis County"}, {id:"49013",name:"Duchesne County"}, {id:"49015",name:"Emery County"}, {id:"49017",name:"Garfield County"}, {id:"49019",name:"Grand County"}, {id:"49021",name:"Iron County"}, {id:"49023",name:"Juab County"}, {id:"49025",name:"Kane County"}, {id:"49027",name:"Millard County"}, {id:"49029",name:"Morgan County"}, {id:"49031",name:"Piute County"}, {id:"49033",name:"Rich County"}, {id:"49035",name:"Salt Lake County"}, {id:"49037",name:"San Juan County"}, {id:"49039",name:"Sanpete County"}, {id:"49041",name:"Sevier County"}, {id:"49043",name:"Summit County"}, {id:"49045",name:"Tooele County"}, {id:"49047",name:"Uintah County"}, {id:"49049",name:"Utah County"}, {id:"49051",name:"Wasatch County"}, {id:"49053",name:"Washington County"}, {id:"49055",name:"Wayne County"}, {id:"49057",name:"Weber County"}, {id:"50001",name:"Addison County"}, {id:"50003",name:"Bennington County"}, {id:"50005",name:"Caledonia County"}, {id:"50007",name:"Chittenden County"}, {id:"50009",name:"Essex County"}, {id:"50011",name:"Franklin County"}, {id:"50013",name:"Grand Isle County"}, {id:"50015",name:"Lamoille County"}, {id:"50017",name:"Orange County"}, {id:"50019",name:"Orleans County"}, {id:"50021",name:"Rutland County"}, {id:"50023",name:"Washington County"}, {id:"50025",name:"Windham County"}, {id:"50027",name:"Windsor County"}, {id:"51001",name:"Accomack County"}, {id:"51003",name:"Albemarle County"}, {id:"51005",name:"Alleghany County"}, {id:"51007",name:"Amelia County"}, {id:"51009",name:"Amherst County"}, {id:"51011",name:"Appomattox County"}, {id:"51013",name:"Arlington County"}, {id:"51015",name:"Augusta County"}, {id:"51017",name:"Bath County"}, {id:"51019",name:"Bedford County"}, {id:"51021",name:"Bland County"}, {id:"51023",name:"Botetourt County"}, {id:"51025",name:"Brunswick County"}, {id:"51027",name:"Buchanan County"}, {id:"51029",name:"Buckingham County"}, {id:"51031",name:"Campbell County"}, {id:"51033",name:"Caroline County"}, {id:"51035",name:"Carroll County"}, {id:"51036",name:"Charles City County"}, {id:"51037",name:"Charlotte County"}, {id:"51041",name:"Chesterfield County"}, {id:"51043",name:"Clarke County"}, {id:"51045",name:"Craig County"}, {id:"51047",name:"Culpeper County"}, {id:"51049",name:"Cumberland County"}, {id:"51051",name:"Dickenson County"}, {id:"51053",name:"Dinwiddie County"}, {id:"51057",name:"Essex County"}, {id:"51059",name:"Fairfax County"}, {id:"51061",name:"Fauquier County"}, {id:"51063",name:"Floyd County"}, {id:"51065",name:"Fluvanna County"}, {id:"51067",name:"Franklin County"}, {id:"51069",name:"Frederick County"}, {id:"51071",name:"Giles County"}, {id:"51073",name:"Gloucester County"}, {id:"51075",name:"Goochland County"}, {id:"51077",name:"Grayson County"}, {id:"51079",name:"Greene County"}, {id:"51081",name:"Greensville County"}, {id:"51083",name:"Halifax County"}, {id:"51085",name:"Hanover County"}, {id:"51087",name:"Henrico County"}, {id:"51089",name:"Henry County"}, {id:"51091",name:"Highland County"}, {id:"51093",name:"Isle of Wight County"}, {id:"51095",name:"James City County"}, {id:"51097",name:"King and Queen County"}, {id:"51099",name:"King George County"}, {id:"51101",name:"King William County"}, {id:"51103",name:"Lancaster County"}, {id:"51105",name:"Lee County"}, {id:"51107",name:"Loudoun County"}, {id:"51109",name:"Louisa County"}, {id:"51111",name:"Lunenburg County"}, {id:"51113",name:"Madison County"}, {id:"51115",name:"Mathews County"}, {id:"51117",name:"Mecklenburg County"}, {id:"51119",name:"Middlesex County"}, {id:"51121",name:"Montgomery County"}, {id:"51125",name:"Nelson County"}, {id:"51127",name:"New Kent County"}, {id:"51131",name:"Northampton County"}, {id:"51133",name:"Northumberland County"}, {id:"51135",name:"Nottoway County"}, {id:"51137",name:"Orange County"}, {id:"51139",name:"Page County"}, {id:"51141",name:"Patrick County"}, {id:"51143",name:"Pittsylvania County"}, {id:"51145",name:"Powhatan County"}, {id:"51147",name:"Prince Edward County"}, {id:"51149",name:"Prince George County"}, {id:"51153",name:"Prince William County"}, {id:"51155",name:"Pulaski County"}, {id:"51157",name:"Rappahannock County"}, {id:"51159",name:"Richmond County"}, {id:"51161",name:"Roanoke County"}, {id:"51163",name:"Rockbridge County"}, {id:"51165",name:"Rockingham County"}, {id:"51167",name:"Russell County"}, {id:"51169",name:"Scott County"}, {id:"51171",name:"Shenandoah County"}, {id:"51173",name:"Smyth County"}, {id:"51175",name:"Southampton County"}, {id:"51177",name:"Spotsylvania County"}, {id:"51179",name:"Stafford County"}, {id:"51181",name:"Surry County"}, {id:"51183",name:"Sussex County"}, {id:"51185",name:"Tazewell County"}, {id:"51187",name:"Warren County"}, {id:"51191",name:"Washington County"}, {id:"51193",name:"Westmoreland County"}, {id:"51195",name:"Wise County"}, {id:"51197",name:"Wythe County"}, {id:"51199",name:"York County"}, {id:"51510",name:"Alexandria city"}, {id:"51515",name:"Bedford city"}, {id:"51520",name:"Bristol city"}, {id:"51530",name:"Buena Vista city"}, {id:"51540",name:"Charlottesville city"}, {id:"51550",name:"Chesapeake city"}, {id:"51570",name:"Colonial Heights city"}, {id:"51580",name:"Covington city"}, {id:"51590",name:"Danville city"}, {id:"51595",name:"Emporia city"}, {id:"51600",name:"Fairfax city"}, {id:"51610",name:"Falls Church city"}, {id:"51620",name:"Franklin city"}, {id:"51630",name:"Fredericksburg city"}, {id:"51640",name:"Galax city"}, {id:"51650",name:"Hampton city"}, {id:"51660",name:"Harrisonburg city"}, {id:"51670",name:"Hopewell city"}, {id:"51678",name:"Lexington city"}, {id:"51680",name:"Lynchburg city"}, {id:"51683",name:"Manassas city"}, {id:"51685",name:"Manassas Park city"}, {id:"51690",name:"Martinsville city"}, {id:"51700",name:"Newport News city"}, {id:"51710",name:"Norfolk city"}, {id:"51720",name:"Norton city"}, {id:"51730",name:"Petersburg city"}, {id:"51735",name:"Poquoson city"}, {id:"51740",name:"Portsmouth city"}, {id:"51750",name:"Radford city"}, {id:"51760",name:"Richmond city"}, {id:"51770",name:"Roanoke city"}, {id:"51775",name:"Salem city"}, {id:"51790",name:"Staunton city"}, {id:"51800",name:"Suffolk city"}, {id:"51810",name:"Virginia Beach city"}, {id:"51820",name:"Waynesboro city"}, {id:"51830",name:"Williamsburg city"}, {id:"51840",name:"Winchester city"}, {id:"53001",name:"Adams County"}, {id:"53003",name:"Asotin County"}, {id:"53005",name:"Benton County"}, {id:"53007",name:"Chelan County"}, {id:"53009",name:"Clallam County"}, {id:"53011",name:"Clark County"}, {id:"53013",name:"Columbia County"}, {id:"53015",name:"Cowlitz County"}, {id:"53017",name:"Douglas County"}, {id:"53019",name:"Ferry County"}, {id:"53021",name:"Franklin County"}, {id:"53023",name:"Garfield County"}, {id:"53025",name:"Grant County"}, {id:"53027",name:"Grays Harbor County"}, {id:"53029",name:"Island County"}, {id:"53031",name:"Jefferson County"}, {id:"53033",name:"King County"}, {id:"53035",name:"Kitsap County"}, {id:"53037",name:"Kittitas County"}, {id:"53039",name:"Klickitat County"}, {id:"53041",name:"Lewis County"}, {id:"53043",name:"Lincoln County"}, {id:"53045",name:"Mason County"}, {id:"53047",name:"Okanogan County"}, {id:"53049",name:"Pacific County"}, {id:"53051",name:"Pend Oreille County"}, {id:"53053",name:"Pierce County"}, {id:"53055",name:"San Juan County"}, {id:"53057",name:"Skagit County"}, {id:"53059",name:"Skamania County"}, {id:"53061",name:"Snohomish County"}, {id:"53063",name:"Spokane County"}, {id:"53065",name:"Stevens County"}, {id:"53067",name:"Thurston County"}, {id:"53069",name:"Wahkiakum County"}, {id:"53071",name:"Walla Walla County"}, {id:"53073",name:"Whatcom County"}, {id:"53075",name:"Whitman County"}, {id:"53077",name:"Yakima County"}, {id:"54001",name:"Barbour County"}, {id:"54003",name:"Berkeley County"}, {id:"54005",name:"Boone County"}, {id:"54007",name:"Braxton County"}, {id:"54009",name:"Brooke County"}, {id:"54011",name:"Cabell County"}, {id:"54013",name:"Calhoun County"}, {id:"54015",name:"Clay County"}, {id:"54017",name:"Doddridge County"}, {id:"54019",name:"Fayette County"}, {id:"54021",name:"Gilmer County"}, {id:"54023",name:"Grant County"}, {id:"54025",name:"Greenbrier County"}, {id:"54027",name:"Hampshire County"}, {id:"54029",name:"Hancock County"}, {id:"54031",name:"Hardy County"}, {id:"54033",name:"Harrison County"}, {id:"54035",name:"Jackson County"}, {id:"54037",name:"Jefferson County"}, {id:"54039",name:"Kanawha County"}, {id:"54041",name:"Lewis County"}, {id:"54043",name:"Lincoln County"}, {id:"54045",name:"Logan County"}, {id:"54047",name:"McDowell County"}, {id:"54049",name:"Marion County"}, {id:"54051",name:"Marshall County"}, {id:"54053",name:"Mason County"}, {id:"54055",name:"Mercer County"}, {id:"54057",name:"Mineral County"}, {id:"54059",name:"Mingo County"}, {id:"54061",name:"Monongalia County"}, {id:"54063",name:"Monroe County"}, {id:"54065",name:"Morgan County"}, {id:"54067",name:"Nicholas County"}, {id:"54069",name:"Ohio County"}, {id:"54071",name:"Pendleton County"}, {id:"54073",name:"Pleasants County"}, {id:"54075",name:"Pocahontas County"}, {id:"54077",name:"Preston County"}, {id:"54079",name:"Putnam County"}, {id:"54081",name:"Raleigh County"}, {id:"54083",name:"Randolph County"}, {id:"54085",name:"Ritchie County"}, {id:"54087",name:"Roane County"}, {id:"54089",name:"Summers County"}, {id:"54091",name:"Taylor County"}, {id:"54093",name:"Tucker County"}, {id:"54095",name:"Tyler County"}, {id:"54097",name:"Upshur County"}, {id:"54099",name:"Wayne County"}, {id:"54101",name:"Webster County"}, {id:"54103",name:"Wetzel County"}, {id:"54105",name:"Wirt County"}, {id:"54107",name:"Wood County"}, {id:"54109",name:"Wyoming County"}, {id:"55001",name:"Adams County"}, {id:"55003",name:"Ashland County"}, {id:"55005",name:"Barron County"}, {id:"55007",name:"Bayfield County"}, {id:"55009",name:"Brown County"}, {id:"55011",name:"Buffalo County"}, {id:"55013",name:"Burnett County"}, {id:"55015",name:"Calumet County"}, {id:"55017",name:"Chippewa County"}, {id:"55019",name:"Clark County"}, {id:"55021",name:"Columbia County"}, {id:"55023",name:"Crawford County"}, {id:"55025",name:"Dane County"}, {id:"55027",name:"Dodge County"}, {id:"55029",name:"Door County"}, {id:"55031",name:"Douglas County"}, {id:"55033",name:"Dunn County"}, {id:"55035",name:"Eau Claire County"}, {id:"55037",name:"Florence County"}, {id:"55039",name:"Fond du Lac County"}, {id:"55041",name:"Forest County"}, {id:"55043",name:"Grant County"}, {id:"55045",name:"Green County"}, {id:"55047",name:"Green Lake County"}, {id:"55049",name:"Iowa County"}, {id:"55051",name:"Iron County"}, {id:"55053",name:"Jackson County"}, {id:"55055",name:"Jefferson County"}, {id:"55057",name:"Juneau County"}, {id:"55059",name:"Kenosha County"}, {id:"55061",name:"Kewaunee County"}, {id:"55063",name:"La Crosse County"}, {id:"55065",name:"Lafayette County"}, {id:"55067",name:"Langlade County"}, {id:"55069",name:"Lincoln County"}, {id:"55071",name:"Manitowoc County"}, {id:"55073",name:"Marathon County"}, {id:"55075",name:"Marinette County"}, {id:"55077",name:"Marquette County"}, {id:"55078",name:"Menominee County"}, {id:"55079",name:"Milwaukee County"}, {id:"55081",name:"Monroe County"}, {id:"55083",name:"Oconto County"}, {id:"55085",name:"Oneida County"}, {id:"55087",name:"Outagamie County"}, {id:"55089",name:"Ozaukee County"}, {id:"55091",name:"Pepin County"}, {id:"55093",name:"Pierce County"}, {id:"55095",name:"Polk County"}, {id:"55097",name:"Portage County"}, {id:"55099",name:"Price County"}, {id:"55101",name:"Racine County"}, {id:"55103",name:"Richland County"}, {id:"55105",name:"Rock County"}, {id:"55107",name:"Rusk County"}, {id:"55109",name:"St. Croix County"}, {id:"55111",name:"Sauk County"}, {id:"55113",name:"Sawyer County"}, {id:"55115",name:"Shawano County"}, {id:"55117",name:"Sheboygan County"}, {id:"55119",name:"Taylor County"}, {id:"55121",name:"Trempealeau County"}, {id:"55123",name:"Vernon County"}, {id:"55125",name:"Vilas County"}, {id:"55127",name:"Walworth County"}, {id:"55129",name:"Washburn County"}, {id:"55131",name:"Washington County"}, {id:"55133",name:"Waukesha County"}, {id:"55135",name:"Waupaca County"}, {id:"55137",name:"Waushara County"}, {id:"55139",name:"Winnebago County"}, {id:"55141",name:"Wood County"}, {id:"56001",name:"Albany County"}, {id:"56003",name:"Big Horn County"}, {id:"56005",name:"Campbell County"}, {id:"56007",name:"Carbon County"}, {id:"56009",name:"Converse County"}, {id:"56011",name:"Crook County"}, {id:"56013",name:"Fremont County"}, {id:"56015",name:"Goshen County"}, {id:"56017",name:"Hot Springs County"}, {id:"56019",name:"Johnson County"}, {id:"56021",name:"Laramie County"}, {id:"56023",name:"Lincoln County"}, {id:"56025",name:"Natrona County"}, {id:"56027",name:"Niobrara County"}, {id:"56029",name:"Park County"}, {id:"56031",name:"Platte County"}, {id:"56033",name:"Sheridan County"}, {id:"56035",name:"Sublette County"}, {id:"56037",name:"Sweetwater County"}, {id:"56039",name:"Teton County"}, {id:"56041",name:"Uinta County"}, {id:"56043",name:"Washakie County"}, {id:"56045",name:"Weston County"}, {id:"60010",name:"Eastern District"}, {id:"60020",name:"Manu'a District"}, {id:"60030",name:"Rose Island"}, {id:"60040",name:"Swains Island"}, {id:"60050",name:"Western District"}, {id:"66010",name:"Guam"}, {id:"69085",name:"Northern Islands Municipality"}, {id:"69100",name:"Rota Municipality"}, {id:"69110",name:"Saipan Municipality"}, {id:"69120",name:"Tinian Municipality"}, {id:"72001",name:"Adjuntas Municipio"}, {id:"72003",name:"Aguada Municipio"}, {id:"72005",name:"Aguadilla Municipio"}, {id:"72007",name:"Aguas Buenas Municipio"}, {id:"72009",name:"Aibonito Municipio"}, {id:"72011",name:"Anasco Municipio"}, {id:"72013",name:"Arecibo Municipio"}, {id:"72015",name:"Arroyo Municipio"}, {id:"72017",name:"Barceloneta Municipio"}, {id:"72019",name:"Barranquitas Municipio"}, {id:"72021",name:"Bayamon Municipio"}, {id:"72023",name:"Cabo Rojo Municipio"}, {id:"72025",name:"Caguas Municipio"}, {id:"72027",name:"Camuy Municipio"}, {id:"72029",name:"Canovanas Municipio"}, {id:"72031",name:"Carolina Municipio"}, {id:"72033",name:"Catano Municipio"}, {id:"72035",name:"Cayey Municipio"}, {id:"72037",name:"Ceiba Municipio"}, {id:"72039",name:"Ciales Municipio"}, {id:"72041",name:"Cidra Municipio"}, {id:"72043",name:"Coamo Municipio"}, {id:"72045",name:"Comerio Municipio"}, {id:"72047",name:"Corozal Municipio"}, {id:"72049",name:"Culebra Municipio"}, {id:"72051",name:"Dorado Municipio"}, {id:"72053",name:"Fajardo Municipio"}, {id:"72054",name:"Florida Municipio"}, {id:"72055",name:"Guanica Municipio"}, {id:"72057",name:"Guayama Municipio"}, {id:"72059",name:"Guayanilla Municipio"}, {id:"72061",name:"Guaynabo Municipio"}, {id:"72063",name:"Gurabo Municipio"}, {id:"72065",name:"Hatillo Municipio"}, {id:"72067",name:"Hormigueros Municipio"}, {id:"72069",name:"Humacao Municipio"}, {id:"72071",name:"Isabela Municipio"}, {id:"72073",name:"Jayuya Municipio"}, {id:"72075",name:"Juana Diaz Municipio"}, {id:"72077",name:"Juncos Municipio"}, {id:"72079",name:"Lajas Municipio"}, {id:"72081",name:"Lares Municipio"}, {id:"72083",name:"Las Marias Municipio"}, {id:"72085",name:"Las Piedras Municipio"}, {id:"72087",name:"Loiza Municipio"}, {id:"72089",name:"Luquillo Municipio"}, {id:"72091",name:"Manati Municipio"}, {id:"72093",name:"Maricao Municipio"}, {id:"72095",name:"Maunabo Municipio"}, {id:"72097",name:"Mayaguez Municipio"}, {id:"72099",name:"Moca Municipio"}, {id:"72101",name:"Morovis Municipio"}, {id:"72103",name:"Naguabo Municipio"}, {id:"72105",name:"Naranjito Municipio"}, {id:"72107",name:"Orocovis Municipio"}, {id:"72109",name:"Patillas Municipio"}, {id:"72111",name:"Penuelas Municipio"}, {id:"72113",name:"Ponce Municipio"}, {id:"72115",name:"Quebradillas Municipio"}, {id:"72117",name:"Rincon Municipio"}, {id:"72119",name:"Rio Grande Municipio"}, {id:"72121",name:"Sabana Grande Municipio"}, {id:"72123",name:"Salinas Municipio"}, {id:"72125",name:"San German Municipio"}, {id:"72127",name:"San Juan Municipio"}, {id:"72129",name:"San Lorenzo Municipio"}, {id:"72131",name:"San Sebastian Municipio"}, {id:"72133",name:"Santa Isabel Municipio"}, {id:"72135",name:"Toa Alta Municipio"}, {id:"72137",name:"Toa Baja Municipio"}, {id:"72139",name:"Trujillo Alto Municipio"}, {id:"72141",name:"Utuado Municipio"}, {id:"72143",name:"Vega Alta Municipio"}, {id:"72145",name:"Vega Baja Municipio"}, {id:"72147",name:"Vieques Municipio"}, {id:"72149",name:"Villalba Municipio"}, {id:"72151",name:"Yabucoa Municipio"}, {id:"72153",name:"Yauco Municipio"}, {id:"74300",name:"Midway Islands"}, {id:"78010",name:"St. Croix Island"}, {id:"78020",name:"St. John Island"}, {id:"78030",name:"St. Thomas Island"}];
function county_name(fips_code) {
	for(var i in county_fips) {
		if(parseInt(county_fips[i].id) == parseInt(fips_code)) {
			return county_fips[i].name;
		}
	}
	return "";
}

function county_fips(state_fips,county_name) {
	for(var i in county_fips) {
		if((parseInt(county_fips[i].id.slice(0,2)) == parseInt(state_fips)) && (county_fips[i].name.toUpperCase() == county_name.toUpperCase())) {
			return county_fips[i].id;
		}
	}
	return "";
}

function ISO_3166_1_from_abbr(abbr) {
	if(typeof abbr == "undefined") return false;
	for(var i in iso_3166_1_abbr) {
		if(iso_3166_1_abbr[i].a2 == abbr.toUpperCase()||iso_3166_1_abbr[i].a3 == abbr.toUpperCase()) {
			return iso_3166_1_abbr[i].id;
		}
	}
	return false;
}


function ISO_3166_1_to_countryname(iso) {
	for(var i in iso_3166_1) {
		if(iso_3166_1[i].id==iso) return iso_3166_1[i].name;
	}
	return false;
}

function countryname_to_ISO_3166_1(countryname) {
	for(var i in iso_3166_1) {
		if(iso_3166_1[i].name.toUpperCase()==countryname.toUpperCase()) return iso_3166_1[i].id;
	}
	return false;
}


//this function generates the points for the path. If a projection is specified, it will
//automatically convert them to it. If not, it returns lat/lon positions.
//from http://stackoverflow.com/questions/20130186/d3-geo-buffer-around-a-feature with modifications
function circlePath(lat, lon, radius, projection) {
	var intervals = 72;
	var intervalAngle = (360 / intervals);
	var pointsData = [];
	for(var i = 0; i < intervals; i++){
		pointsData.push(getDestinationPoint(lat, lon, i * intervalAngle, radius));
	}
	if(projection) {
		pointsData2 = [];
		for(i in pointsData) {
			pointsData2.push([projection([pointsData[i][1],pointsData[i][0]])[0],projection([pointsData[i][1],pointsData[i][0]])[1]]);
		}
		return pointsData2;
	} else {
		return pointsData;
	}
}

//function to get destination points given an initial lat/lon, bearing, distance
//from http://www.movable-type.co.uk/scripts/latlong.html
function getDestinationPoint(lat,lon, brng, d) {
	var R = 6371; //earth's radius in km — change to whatever unit you plan on using (e.g. miles = 3959) 
	brng*=deg2rad; lat*=deg2rad; lon*=deg2rad; 
	var lat2 = Math.asin( Math.sin(lat)*Math.cos(d/R) +
						Math.cos(lat)*Math.sin(d/R)*Math.cos(brng) );
	var lon2 = lon + Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(lat),
							 Math.cos(d/R)-Math.sin(lat)*Math.sin(lat2));
	return  [lat2*rad2deg, lon2*rad2deg];              
}

//from http://www.movable-type.co.uk/scripts/latlong.html
function distanceBetweenPoints(lat1,lon1,lat2,lon2) {
	var R = 6371; // earth's radius in km
	lat1*=deg2rad;
	lat2*=deg2rad;
	var dlat = (lat2-lat1);
	var dlon = (lon2-lon1)*deg2rad;
	var a = Math.sin(dlat/2) * Math.sin(dlat/2) +
			Math.cos(lat1) * Math.cos(lat2) *
			Math.sin(dlon/2) * Math.sin(dlon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	return d;
}

function getUrlVars() {
    var vars = Array();
    var hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
 	if((hashes.length==1) && (hashes[0]==window.location.href)) {
		return false;
	} 
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars[hash[0]] = hash[1];
    }
    return vars;
}
