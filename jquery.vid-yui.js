(function(a){a.fn.vid=function(){var b={type:"youtube",videoId:"4wGR4-SeuJ0",autoPlay:false,loop:false,hq:true,chromeless:false,resize:true};if(arguments[0]){a.extend(b,arguments[0])}this.each(function(){var f=a(this);var d="";var c={};switch(b.type){case"youtube":d+="youtube.com/"+(b.chromeless?"apiplayer":"v/"+b.videoId)+"?enablejsapi=1&version=3&autoplay="+(b.autoPlay?"1":"0")+"&loop="+(b.loop?"1":"0")+(b.hq?"&hd=1":"");break;case"vimeo":d+="vimeo.com/moogaloop.swf?clip_id="+b.videoId+"&js_api=1"+(b.hq?"":"&hd_off=1");break;case"dailymotion":d+="dailymotion.com/swf/"+b.videoId+"?enablejsapi=1&autoplay="+(b.autoPlay?"1":"0");break;case"1click2fame":d+="1click2fame.com/flash/Player.swf?videoID="+b.videoId+"&autoPlay="+b.autoPlay;break}f.flash({swf:"http://"+d,height:f.height(),width:f.width(),flashvars:c});if(b.resize){a(this).parent().resize(function(){var e=[a("object",f),a("embed",f)];a(e).each(function(){a(this).attr("height",f.height());a(this).attr("width",f.width())})})}});return this}})(jQuery);(function(e,b){var c=function(g){var f,h=[];for(f in g){h.push(f+'="'+g[f]+'"')}return h.join("")},d=function(h){var f,j,i=[],g;for(f in h){if(typeof h[f]=="object"){g=[];for(j in h[f]){g.push([j,"=",encodeURIComponent(h[f][j])].join(""))}h[f]=g.join("&amp;")}i.push(['<param name="',f,'" value="',h[f],'" />'].join(""))}return i.join("")},a=false;e[b]=(function(){var f="0,0,0",g=navigator.plugins["Shockwave Flash"]||ActiveXObject;f=g.description||(function(){try{return(new g("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")}catch(h){}}());f=f.match(/^[A-Za-z\s]*?(\d+)[\.|,](\d+)(?:\s+r|,)(\d+)/);return{available:f[1]>0,activeX:!g.name,version:{major:f[1]*1,minor:f[2]*1,release:f[3]*1},hasVersion:function(i){var l=this.version,j="major",k="minor",h="release";i=(/string|number/.test(typeof i))?i.toString().split("."):i||[0,0,0];i=[i[j]||i[0]||l[j],i[k]||i[1]||l[k],i[h]||i[2]||l[h]];return(i[0]<l[j])||(i[0]==l[j]&&i[1]<l[k])||(i[0]==l[j]&&i[1]==l[k]&&i[2]<=l[h])},expressInstall:"expressInstall.swf",create:function(h){if(!e[b].available||a||!typeof h=="object"||!h.swf){return false}if(h.hasVersion&&!e[b].hasVersion(h.hasVersion)){h={swf:h.expressInstall||e[b].expressInstall,attrs:{id:"SWFObjectExprInst",height:Math.max(h.height||137),width:Math.max(h.width||214)},params:{flashvars:{MMredirectURL:location.href,MMplayerType:(e[b].activeX)?"ActiveX":"PlugIn",MMdoctitle:document.title.slice(0,47)+" - Flash Player Installation"}}};a=true}else{h=e.extend(true,{attrs:{height:h.height||180,width:h.width||320},params:{wmode:h.wmode||"opaque",flashvars:h.flashvars}},h)}return"<object "+(c(h.attrs))+(e[b].activeX?' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name="movie" value="'+h.swf+'" />':' type="application/x-shockwave-flash" data="'+h.swf+'">')+(d(h.params))+"</object>"}}}());e.fn[b]=function(f){if(typeof f=="object"){this.each(function(){var g=document.createElement(b);g.innerHTML=e[b].create(f);if(g.childNodes[0]){this.appendChild(g.childNodes[0])}})}else{if(typeof f=="function"){this.find("object").andSelf().filter("object").each(function(){var h=this,g="jsInteractionTimeoutMs";h[g]=h[g]||0;if(h[g]<660){if(h.clientWidth||h.clientHeight){f.call(this)}else{setTimeout(function(){e(h)[b](f)},h[g]+66)}}})}}return this}}(jQuery,"flash"));