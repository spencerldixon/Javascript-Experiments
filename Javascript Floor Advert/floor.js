var Floor = function(jsonConfig){
	var defaultConfig = {
		"height"			: {
				"collapsed"	: 40,
				"expanded"	: 100
		},
		"backgroundColor"	: "#234485",
		"textColor"			: "#FFFFFF",
		"divId" 			: "floorAd",
		"stylesheet" 		: "style.css",
		"collapsedHeadline" : "<h3>Default: Hover here to view</h3>",				// Static will use this too
		"expandedHeadline" 	: "<h3>Default: Click here for more information</h3>",
		"targetUrl" 		: "http://www.github.com/spencerldixon",				// Click through URL
		"delays"			: {
				"mouseOver"	: 500,
				"expansion" : 500,
				"collapse"	: 750
		}
	};

	var json = jsonConfig || defaultConfig;
	this.config = JSON.parse(JSON.stringify(json));	
};

Floor.prototype = {	
	render : function(type){
		var delayHandler;
		var config = this.config;

		$('body').append("<div id='" + config.divId + "''></div>");
		$('head').append("<link rel='stylesheet' type='text/css' href='" + config.stylesheet + "'>");
		$("#floorAd").html(config.collapsedHeadline);

		if (type == "expanding"){
			// On mouse enter
			$("#floorAd").hover(function(){
				delayHandler = setTimeout(function(){
					$("#floorAd").html(config.expandedHeadline).animate({bottom: "0px"}, config.delays.expansion);
				}, config.delays.mouseOver);

			// On mouse leave
			}, function(){						
				clearTimeout(delayHandler);
				$("#floorAd").html(config.collapsedHeadline).animate({bottom: "-80px"}, config.delays.collapse);
			});

			// On click
			$("#floorAd").click(function(){
				window.open(config.targetUrl);
			});
		} else if (type == "static"){
			$("#floorAd").hover(function(){
				delayHandler = setTimeout(function(){
					$("#floorAd").html(config.expandedHeadline);
				}, config.delays.mouseOver);

			// On mouse leave
			}, function(){						
				clearTimeout(delayHandler);
				$("#floorAd").html(config.collapsedHeadline);
			});

			// On click
			$("#floorAd").click(function(){
				window.open(config.targetUrl);
			});
		}
	},

	hide : function(){
		$("#floorAd").hide();
	}
};