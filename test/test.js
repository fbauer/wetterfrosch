/*
 * Names of keys in json schema are not yet set in stone. Use global
 * variables for them.
 */
var ch='ch';
var temp='temp';
var humidity='hum';
var ts='ts';


test("extractTemp", function() {
    var input = [];
    deepEqual(extractTemp(input), [],
	      "Empty lists should be handled correctly");
    input = [{ch: 1, temp: 2.0, ts: new Date("2012-09-01")},
	     {ch: 1, temp: 3.0, ts: new Date("2012-09-02")}
	    ];
    var output = [[[new Date("2012-09-01"), 2.0],
                   [new Date("2012-09-02"), 3.0]]];
    deepEqual(extractTemp(input), output,
	      "Data for single plot is aggregated in first sub-array");

    input = [{ch: 1, temp: 2.0, ts: "2012-09-01"},
	     {ch: 1, temp: 3.0, ts: "2012-09-02"}
	    ];
    deepEqual(extractTemp(input), output,
	      "Time stamps given as string are converted to Date");

    var input2ch = [{ch: 1, temp: 2.0, ts: "2012-09-01"},
		    {ch: 2, temp: 3.0, ts: "2012-09-02"},
		    {ch: 1, temp: 3.0, ts: "2012-09-02"}
		   ];
    var output2ch = [[[new Date("2012-09-01"), 2.0],
                      [new Date("2012-09-02"), 3.0]],
		     [[new Date("2012-09-02"), 3.0]]];
    deepEqual(extractTemp(input2ch), output2ch,
	      "Input objects are sorted according to their channel ch");

    var input2ch_sparse = [{ch: 1, temp: 2.0, ts: "2012-09-01"},
			   {ch: 3, temp: 3.0, ts: "2012-09-02"},
			   {ch: 1, temp: 3.0, ts: "2012-09-02"}
			  ];
    var output2ch_sparse = [[[new Date("2012-09-01"), 2.0],
                             [new Date("2012-09-02"), 3.0]],
			    [],
			    [[new Date("2012-09-02"), 3.0]]];
    deepEqual(extractTemp(input2ch_sparse), output2ch_sparse,
	      "Missing channels are filled with an empty array");
    input = [{ch: 1, temp: 3.0, ts: "2012 09 02"}];

    raises(extractTemp(input), "a",
	   "raise Exception in case of malformed date format");
});

var toISOTimestamp = function(date) {
                         return(MochiKit.DateTime.toISOTimestamp(date, true));};

test("RFC 3339", function() {
    var datestring = "2012-03-04T12:04:59Z";
    var input = MochiKit.DateTime.isoTimestamp(datestring);
    equal(toISOTimestamp(input), "2012-03-04T12:04:59Z", "sanity check");
    var my_jsdate = new $.jsDate(input);
    equal(toISOTimestamp(my_jsdate),
          "2012-03-04T12:04:59Z",
	  "calling jsDate with a Date instance works" );
    my_jsdate = new $.jsDate(datestring);
    equal(my_jsdate.toString(),
          "NaN",
	  "calling jsDate with an RFC 3339 timestamp results in a NaN" );
});



