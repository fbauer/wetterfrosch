//****************************************************************************
//
// This file is part of wetterfrosch.
//

// Copyright 2012 Florian Bauer
//
// wetterfrosch is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// wetterfrosch is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with wetterfrosch.  If not, see <http://www.gnu.org/licenses/>.
//
//****************************************************************************

// Our ajax data renderer
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

