(function($)
{
	$.fn.vid 	= function(settings) 
	{
    	var c 	= {
			'type'		: 'youtube',
			'autoPlay'	: true,
			'videoId'	: ''
		};

    if (settings) $.extend(config, settings);

    this.each(function() {
      // element-specific code here
    });

    return this;

  };

})(jQuery);