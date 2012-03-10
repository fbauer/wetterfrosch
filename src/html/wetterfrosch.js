// Our ajax data renderer which here retrieves a text file.
// it could contact any source and pull data, however.
// The options argument isn't used in this renderer.
ajaxDataRenderer = function(url, plot, options) {
    var ret = null;
    $.ajax({
    // have to use synchronous here, else the function
    // will return before the data is fetched
    async: false,
    url: url,
    dataType: 'json',
    success: function(data) {
        ret = extractTemp(data);
    }
    });
    return ret;
};

var isodate = MochiKit.DateTime.isoTimestamp;

var extractTemp = function(data) {
    var accu = {};
    var channels = [];
    jQuery.each(data,
        function(i, n) {
            var chan = n['ch'];
            if (!(chan in accu)) {
            accu[chan] = [];
            channels.push(chan);
            }
            accu[chan].push([isodate(n['ts']), n['temp']]);
        });
    var result = [];
    var max_chan = Math.max.apply(Math, channels);
    for (var i = 1; i <= max_chan; i++) {
    if (i in accu) {
        result.push(accu[i]);
    }
    else {
        result.push([]);
    }
    }
    return (result);
};


$(document).ready(function(){

  // The url for our json data
  var jsonurl = "./jsondata.txt";

  // passing in the url string as the jqPlot data argument is a handy
  // shortcut for our renderer.  You could also have used the
  // "dataRendererOptions" option to pass in the url.
  var plot2 = $.jqplot('tchart', jsonurl,{
    title: "Temperature",
    dataRenderer: ajaxDataRenderer,
    dataRendererOptions: {
      unusedOptionalUrl: jsonurl
    },
    axes:{xaxis: {renderer:$.jqplot.DateAxisRenderer,
                  label: "time",
                  labelRenderer: $.jqplot.CanvasAxisLabelRenderer},
          yaxis: {label: "Temperature (°C)",
                  labelRenderer: $.jqplot.CanvasAxisLabelRenderer}},
    series: [{label: "kitchen"},
             {label: "attic"},
             {label: "outside"}
             ],
    legend: {show: true, location: 'nw'}
    });
});

