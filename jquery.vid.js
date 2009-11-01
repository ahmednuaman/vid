(function($)
{
	$.fn.vid 		= function() 
	{
    	var c 		= {
			// required
			type			: 'youtube',			// String 		- defines the service, possible values are: youtube, vimeo, dailymotion, 1click2fame; for anymore, just fork the project or email me.
			videoId			: '4wGR4-SeuJ0',		// String		- defines the unique video identifier
			// optional
			autoPlay		: false,				// Boolean		- defines whether to autoplay the video or not
			loop			: false,				// Boolean		- defines whether to loop the video or not
			hq				: true,					// Boolean		- defines whether to play the highest quality version, so HD or HQ, rather than SD
			chromeless		: false					// Boolean		- defines whether to use the chromless player for youtube only
		};
	
		if ( arguments[ 0 ] )
		{
			$.extend( c, arguments[ 0 ] );
		}

		this.each( function() 
		{
			var h	= '';
			var v	= { };
			
			switch ( c.type )
			{
				case 'youtube':
				h	+= 'youtube.com/v/' + c.videoId + '?enablejsapi=1&autoplay=' + ( c.autoPlay ? '1' : '0' ) + '&loop=' + ( c.loop ? '1' : '0' ) + ( c.hq ? '&hd=1' : '' ) + ( c.chromless ? '&version=3' : '' );
				
				break;
				
				case 'vimeo':
				h	+= 'vimeo.com/moogaloop.swf?clip_id=' + c.videoId + '&js_api=1' + ( c.hq ? '' : '&hd_off=1' );
				
				break;
				
				case 'dailymotion':
				h	+= 'ailymotion.com/swf/' + c.videoId + '?enablejsapi=1&autoplay=' + ( c.autoPlay ? '1' : '0' );
				
				break;
				
				case '1click2fame':
				h	+= '1click2fame.com/flash/Player.swf?videoID=' + c.videoId + '&autoPlay=' + ( c.autoPlay ? '1' : '0' );
				
				break;
			}
			
			$( this ).flash({
				swf			: 'http://' + h,
				width		: $( this ).width(),
				height		: $( this ).height(),
				flashvars	: v
			});
		});
		
		return this;
	};
})(jQuery);

// Including the jQuery SWFObject plugin by Jonathan Neal: http://jquery.thewikies.com/swfobject/
(function ($, flash) {
	var createAttrs = function (obj) {
		var aEach,
		aArray = [];

		for (aEach in obj) {
			aArray.push(aEach + '="' + obj[aEach] + '"');
		}

		return aArray.join('');
	},
	createParams = function (obj) {
		var aEach,
		bEach,
		aArray = [],
		bArray;

		for (aEach in obj) {
			if (typeof obj[aEach] == 'object') {
				bArray = [];

				for (bEach in obj[aEach]) {
					bArray.push([bEach, '=', encodeURIComponent(obj[aEach][bEach])].join(''));
				}

				obj[aEach] = bArray.join('&amp;');
			}

			aArray.push(['<param name="', aEach, '" value="', obj[aEach], '" />'].join(''));
		}

		return aArray.join('');
	},
	expressInstallIsActive = false;

	$[flash] = (function () {
		var flashVersion = '0,0,0',
		Plugin = navigator.plugins['Shockwave Flash'] || ActiveXObject;

		flashVersion = Plugin.description || (function () {
			try {
				return (new Plugin('ShockwaveFlash.ShockwaveFlash')).GetVariable('$version');
			}
			catch (eIE) {}
		}());

		flashVersion = flashVersion.match(/^[A-Za-z\s]*?(\d+)[\.|,](\d+)(?:\s+r|,)(\d+)/);

		return {
			available: flashVersion[1] > 0,

			activeX: !Plugin.name,

			version: {
				major: flashVersion[1] * 1,
				minor: flashVersion[2] * 1, 
				release: flashVersion[3] * 1
			},

			hasVersion: function (version) {
				var versionCompare = this.version,
				major = 'major',
				minor = 'minor',
				release = 'release';

				version = (/string|number/.test(typeof version)) ? version.toString().split('.') : version || [0, 0, 0];

				version = [
					version[major] || version[0] || versionCompare[major],
					version[minor] || version[1] || versionCompare[minor],
					version[release] || version[2] || versionCompare[release]
				];

				return (version[0] < versionCompare[major]) || (version[0] == versionCompare[major] && version[1] < versionCompare[minor]) || (version[0] == versionCompare[major] && version[1] == versionCompare[minor] && version[2] <= versionCompare[release]);
			},

			expressInstall: 'expressInstall.swf',

			create: function (obj) {
				if (!$[flash].available || expressInstallIsActive || !typeof obj == 'object' || !obj.swf) {
					return false;
				}

				if (obj.hasVersion && !$[flash].hasVersion(obj.hasVersion)) {
					obj = {
						swf: obj.expressInstall || $[flash].expressInstall,
						attrs: {
							id: 'SWFObjectExprInst',
							height: Math.max(obj.height || 137),
							width: Math.max(obj.width || 214)
						},
						params: {
							flashvars: {
								MMredirectURL: location.href,
								MMplayerType: ($[flash].activeX) ? 'ActiveX': 'PlugIn',
								MMdoctitle: document.title.slice(0, 47) + ' - Flash Player Installation'
							}
						}
					};

					expressInstallIsActive = true;
				}
				else {
					obj = $.extend(
						true,
						{
							attrs: {
								height: obj.height || 180,
								width: obj.width || 320
							},
							params: {
								wmode: obj.wmode || 'opaque',
								flashvars: obj.flashvars
							}
						},
						obj
					);
				}

				return '<object ' + (
					createAttrs(obj.attrs)
				) + (
					$[flash].activeX ? ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">' + '<param name="movie" value="' + obj.swf + '" />' : ' type="application/x-shockwave-flash" data="' + obj.swf + '">'
				) + (
					createParams(obj.params)
				) + '</object>';
			}
		};
	}());

	$.fn[flash] = function (args) {
		if (typeof args == 'object') { 
			this.each(
				function () {
					var test = document.createElement(flash);

					test.innerHTML = $[flash].create(args);

					if (test.childNodes[0]) {
						this.appendChild(test.childNodes[0]);
					}
				}
			);
		}
		else if (typeof args == 'function') {
			this.find('object').andSelf().filter('object').each(
				function () {
					var elem = this,
					jsInteractionTimeoutMs = 'jsInteractionTimeoutMs';

					elem[jsInteractionTimeoutMs] = elem[jsInteractionTimeoutMs] || 0;

					if (elem[jsInteractionTimeoutMs] < 660) {
						if (elem.clientWidth || elem.clientHeight) {
							args.call(this);
						}
						else {
							setTimeout(
								function () {
									$(elem)[flash](args);
								},
								elem[jsInteractionTimeoutMs] + 66
							);
						}
					}
				}
			);
		}

		return this;
	};
}(jQuery, 'flash'));