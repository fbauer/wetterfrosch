/*
 * Names of keys in json schema are not yet set in stone. Use global
 * variables for them.
 */
var ch='Ch';
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
    var output = [[[new Date("2012-09-01"), 2.0], [new Date("2012-09-02"), 3.0]]
		 ];
    deepEqual(extractTemp(input), output, 
	      "Data for single plot is aggregated in first sub-array");
 
    input = [{ch: 1, temp: 2.0, ts: "2012-09-01"},
	     {ch: 1, temp: 3.0, ts: "2012-09-02"}
	    ];
    console.debug(extractTemp(input).toString());
    console.debug(output.toString());
    deepEqual(extractTemp(input), output, 
	      "Time stamps given as string are converted to Date");
});

test("RFC 3339", function() {
    $.each(["2012-03-04T13:04:59+0100",
	   "2012-03-04T12:04:59Z"],
	   function(index, datestring) {
	       console.debug(datestring);
	       var input = new Date(datestring);
	       equal(input.toString(), "Sun Mar 04 2012 13:04:59 GMT+0100 (CET)", "sanity check" );
	       var my_jsdate = new $.jsDate(input);
	       equal(my_jsdate.toString(), "Sun Mar 04 2012 13:04:59 GMT+0100 (CET)", "calling jsDate with a Date instance works" );
	       my_jsdate = new $.jsDate(datestring);
	       equal(my_jsdate.toString(), "NaN", "calling jsDate with an RFC 3339 timestamp results in a NaN" );
	   }
	  )
	}
    );