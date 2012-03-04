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
	dataType:"json",
	success: function(data) {
	    ret = jQuery.map(data, function(n, i) {
		return([[i, n["temp"]]]);
	    });
	}
    });
    return [ret];
};
 



