var $ = require("jquery"),
	moment = require("moment");
	
function pageObj(){}

function clock(){}

clock.prototype.calcSeconds = function(objDate, el) {
	var sec = objDate.getSeconds() + 1;
	var percent = (100/60*sec).toFixed(2) + "%";
	el.height(percent);
};

clock.prototype.calcMinutes = function(objDate, el) {
	var min = objDate.getMinutes() + 1;
	var percent = (100/60*min).toFixed(2) + "%";
	el.height(percent);
};

clock.prototype.calcHours = function(objDate, el) {
	var hour = objDate.getHours();
	var percent = (100/24*hour).toFixed(2) + "%";
	el.height(percent);
};

clock.prototype.fillHoursDial = function(el, dialCount) {
	var html = "";
	var	heightPercent = (100/dialCount).toFixed(5) + "%";
	for (var i = 0; i < dialCount; i++) {
		html += "<div style=\"height:"+heightPercent+";\" class=\"dial\"><span class=\"dial-show\"></span><span class=\"number\">"+(dialCount-i)+"</span></div>";
	}
	el.append($(html));
};
clock.prototype.fillMinutesDial = function(el, dialCount) {
	var obj = null,
		objSpanDial = null,
		objSpanHour = null,
		min = 0;
	var	heightPercent = (100/dialCount).toFixed(5) + "%";
	for (var i = 0; i < dialCount; i++) {
		min = (0 == (dialCount-i)%5) ? (dialCount-i) : "";
		obj = $("<div class='dial'></div>");
		obj.height(heightPercent);
		objSpanDial = min ? $("<span class='dial-show long'></span>") : $("<span class='dial-show'></span>");
		obj.append(objSpanDial);
		objSpanHour = $("<span class='number'>"+min+"</span>");
		obj.append(objSpanHour);
		el.append(obj);
	}
};
clock.prototype.fillSecondsDial = function(el, dialCount) {
	var obj = null,
		objSpanDial = null,
		objSpanHour = null,
		seconds = 0;
	var	heightPercent = (100/dialCount).toFixed(5) + "%";
	for (var i = 0; i < dialCount; i++) {
		seconds = (0 == (dialCount-i)%5) ? (dialCount-i) : "";
		obj = $("<div class='dial'></div>");
		obj.height(heightPercent);
		objSpanDial = seconds ? $("<span class='dial-show long'></span>") : $("<span class='dial-show'></span>");
		obj.append(objSpanDial);
		objSpanHour = $("<span class='number'>"+seconds+"</span>");
		obj.append(objSpanHour);
		el.append(obj);
	}
};
pageObj.prototype.handle = function() {

	var clockObj = new clock();
	// 初始化刻度
	clockObj.fillHoursDial($("#hour"), 24);
	clockObj.fillMinutesDial($("#minutes"), 60);
	clockObj.fillSecondsDial($("#seconds"), 60);
	this.initFontSize();
	setInterval(function(){
		var objDate = new Date();
		clockObj.calcSeconds(objDate, $("#seconds>.item"));
		clockObj.calcMinutes(objDate, $("#minutes>.item"));
		clockObj.calcHours(objDate, $("#hour>.item"));
	}, 1000);
};

pageObj.prototype.initFontSize = function() {
	var clockHeight = $("#clock").height();
	$(".number").css("font-size", (clockHeight/40).toFixed(2) + "px");
};

pageObj.prototype.resize = function() {
	// init font-size
	var me = this;
	$(window).resize(function(){
		me.initFontSize();
	});
};

var obj = new pageObj();
obj.resize();
obj.handle();