/*!
	FitPlain- one page Creative portfolio Template
	Copyright (c) 2013, Subramanian 

	Author: Subramanian
	Profile: themeforest.net/user/FMedia/

	Version: 1.0.0
	Release Date: July 2013
	
	Built using: jQuery 		version:1.6.2	http://jquery.com/
	jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
	
 */


(function( $ ){	
	
	function mainFm(selector, params){
		
		var defaults = $.extend({}, {
				
				// default variables
				
				onePage : true,						// Set whether this template will work as one page or separate page 				
				
				currentPage : "!home",					// Set the current page

				animationSpeed : 1000,				// Default animation speed
				
				slideshowSpeed : 5000,				// Flexslider slideshow delaytime on porfolio detail page 
				
				homeSliderThumbnail : false			// Home slider thumbnail 
				
			} , params);

			
// Initialize required variables and objects
			var self = this;
			self.pageHolderHeight_desktop = self.pgHigDesk = "100%";
			self.pageHolderHeight_ipad = self.pgHigIpad = "100%";
			self.winWidth =   $(window).width();
			self.winHeight =   $(window).height();
			self.IE_old = $.browser.msie;
			self.mobile = $(window).width() <= 959;
			self.midMobile = $(window).width() <= 767 && $(window).width() > 479;
			self.minMobile = $(window).width() <= 480;
			self.mobileDevice = screen.width < 1024 && screen.height < 1024;
			ipad = ($(window).width() === 768 || $(window).height() === 768) && ($(window).width() === 1024 || $(window).height() === 1024) ;
			self.ipadPort = (self.winWidth >= 768 &&  self.winWidth < 1024);
			self.navTop = $(window).width() <= 959;	
			self.aniSpeed = defaults.animationSpeed;
			self.flxDelay =  flxDelay = defaults.slideshowSpeed;
						
			self.headerFixedHig = $(".navbar").outerHeight();
						
			self.isoAniFin = false;
			
			self.onePage = defaults.onePage;
		
			if(!self.onePage){
				siteStartOpen = true;
			}
			
			self.bdy = $("body");

			self.foot = $(".footer");		
			self.navUl = $('.nav');
			self.backPage  = $('#backArea');
			
			self.bdy.data("width", Number($(window).width()));
			self.bdy.data("height", Number($(window).height()));

			self.pageLoaded = false;
			self.homePage = defaults.currentPage;
			self.pageLoadfinished = false;
			self.projFm = false;
			self.apis = [];
			self.ff = -1;
			
			self.singleBg = true;
			
			self.cM = $('.contentWrapper [data-id="'+"#"+self.homePg+'"]').parent();
			self.cM_= $('.contentWrapper [data-id="'+"#"+self.homePg+'"]');

			
			// create Menu fadeout layer
			self.headerFad = $(".pageFade");
			self.contClose = $(".closeBtn");
			
			self.TopMenu = $(".logo").hasClass("logoStayTop");
			self.bottomMenu =  $(".header").hasClass("stayBottom");
			
			self.TopMenu = true;

			self.bdy.prepend('<div id="dumDiv" style="position:absolute"> </div>');	
			self.dumDiv = self.bdy.children(':first-child');
			
			self.menuColor = self.dumDiv .css('color');
			self.dumDiv .toggleClass('menu_highlight_color', 'menu_color');
			
			self.menuHighlightColor = self.dumDiv .css('color');
			
			self.navArry = [];
			$('.contentWrapper').each(function(){
				var n_spt = $(this);
				if(n_spt.attr("data-id") !== undefined){
					self.navArry.push($(this));
				}					
			});
			
			
			// Scroll bar added for require div
			var scroll_bar = '<div id="scrollbar_holder"> <div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div> <div class="viewport"> <div class="overview" ></div> </div> </div>';		
			self.bdy.find('.add_scroll').each(function(){
				var aa = $(this).children();
				$(this).wrapInner( scroll_bar);
				$(this).find('.overview').append(aa);
			});
						
			// Initialize the site after the required time interval

			$("#supersized").css({"opacity":0});
			
			self.bdy.css("display","block");			

			var intV = setInterval(function() {
					
					  if(siteStartOpen){
						  clearInterval(intV);
						  setTimeout( function(){ 
							
							self.headerFixedHig = $(".navbar").outerHeight();
							self.initialize();
							
							if($("#supersized").height() !== null){
								if(!self.mobile){
									$("#supersized").animate({"opacity":1}, 1500, "easeInOutQuart" );
									$("#superNav").fadeIn(1000, "easeInOutQuart" );								
									$(".supersized-nav").fadeIn(500, "easeInOutQuart" );
								}else{
									$("#supersized").show().css({"opacity":1});
									$("#superNav").show();					
									$(".supersized-nav").show();
								}							
								if(typeof api !== 'undefined' && defaults.homeSliderThumbnail ){
									api.min_thumb();
									}
							}				
						
							if(!self.mobile){
								$(".header").fadeIn(500, "easeInOutQuart" );
								$(".homeSlider .homepage_con").fadeIn(500, "easeInOutQuart" );
							}else{
								$(".header").show();
								$(".homeSlider .homepage_con").show();
							}						
							
							
							if(!self.onePage){		
								$("body").find('.addVideo').each(function(){
									var vid = $(this);
									var kk = false;
									$(this).find('img').each(function(){
										kk = true;
									});
									if(!kk ){
										vid.data("added", true);
										var W = vid.attr('data-width') ? vid.attr('data-width') : "100%";
										var H = vid.attr('data-height') ? vid.attr('data-height') : "100%";
										var A = vid.attr('data-autoplay') === "true" && !self.mobileDevice? true : false;
										if(H === "100%"){
											vid.css({"height":"100%"});
										}
										vid.prepend('<div class="vid"></div>');
										vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A);
									}
								});
								
								$("body").data("bgType",isMobileChk);
	
								$("body").find('.parallax').each(function(){
									var img = !isMobileChk ? $(this).attr("data-src") : ($(this).attr("data-src-small")? $(this).attr("data-src-small")  : $(this).attr("data-src"));	
									var imgAtt = !isTouch ? "fixed" : "scroll";
									if(img !== undefined){
										$(this).css({"background-image":"url("+img+")", "background-attachment": imgAtt});
									}
								});
							}
				
						}, 200);
					}

			},10);

			

// Page buttons ==================================================================
			
			
			// Page scrollUp button
			self.pgScrUp =  $(".move_up, .goTop");
			
			$(".pgScrollUp, .move_up, .goTop").click(function(){
				if(self.url !== self.homePg){
					window.location.href = "#"+self.homePg;
				}else{
					self.scrollObj.stop().animate({ scrollTop: "0px" }, 500, "easeInOutQuart" );
				}
			});
			
			// Cache the Window object
			self.scrollObj = $("body, html");
			self.$html = $("html");
			self.$window = $("body");
			
			self.knobAni = false;
			try{		
				if(!isTouch){	
					$("body").find('.knob').each(function(){
						var selK = $(this);	
						selK.data("val", selK.attr("value"));			
						selK.data("ani", selK.append($('<div><div/>')).children(":last-child"));
						selK.data("ani").css({"top":0,"position":"absolute"});
						self.knobAni = true;
					});	
				}
			} catch (e) { self.knobAni = false; }	
			
			
			// Window scroll event
			$(window).scroll(function() {
				
				clearInterval(self.scrIntr);
				self.scrIntr = setInterval(function(){
					clearInterval(self.scrIntr);
					self.scrollPos = scrollPos = self.$html.scrollTop() > 0 ?  self.$html.scrollTop() :  self.$window.scrollTop();
					if(self.scrollPos > 150){
						$(".previousPage, .nextPage").removeClass("autoPosition");
						$(".pgScrollUp").fadeIn(200);
					}else{
						$(".previousPage, .nextPage").addClass("autoPosition");
						$(".pgScrollUp").fadeOut(200);
					}
					
					if(self.scrollPos > self.winHeight+50){
						$("#supersized .prevslide, #supersized .activeslide").css({"visibility":"hidden", "opacity":0});
					}else{
						$("#supersized .prevslide, #supersized .activeslide").css({"visibility":"visible"});
						$("#supersized .prevslide, #supersized .activeslide").animate({"opacity":1});
					}
				
				},200);
				
			});
			
			$(".homeSlider").css({"height":self.winHeight});
			
			var caa = $(window).height() - (self.headerFixedHig  + $(".contactPage .titleTop").outerHeight() + $(".footer").outerHeight() + $(".contactUsPg").outerHeight());
			caa = caa > 20 ? caa : 20;
			$(".contactPage .footer_fit").css({ "min-height": caa } );
			
	}	
	
	
	mainFm.prototype = {

		// Initialize the require objects and variables 
		initialize : function(){
			
			var self = this;
			
			self.prePg = "";
			self.curPg = "";
			self.menuList = [];
			
			// Loading object added
			self.bdy.prepend('<div id="preloadImg" style="width:150px; height:150px; visibility:hidden; position:absolute; left:0; top:0; overflow:hidden"> </div>');
			self.dumDiv.addClass('email_loading');
			self.dumDiv.removeClass('email_loading');

			$(".isotope_option").show();
				
			self.masonry();
			
			
			
			self.nexButton_detailPg = $("a.next_button");
			self.preButton_detailPg = $("a.previous_button");
			
// Initialize the menu navigation action
			var kk = -1;
			var qq = -1;
			self.rez = false;
			
			if( parseInt($.browser.version, 10) === 7 && $.browser.msie){
				$(".header").css({"background":"","filter":"none"});
				self.dumDiv.addClass("mobile_menuBg_ie");
				$(".header").css({"background-color": self.dumDiv.css("background-color")});
			}
			
			try {
				document.createEvent('TouchEvent');
				$(".lightStyle, .darkStyle, .contentWrapper").bind('click', function() {
				});
			} catch (e) {
				// nothing to do			
			}			
			
			
			self.navUl.children().each(function() {			

				var slf = $(this).children();
				qq++;
				slf.bind('click', function() {
						
					var gg =  String($(this).attr("href")).split("#");
					if(gg[1] === self.url){
						self.page_position();
					}
					
					$(".header .nav li a").removeClass("active");
					$(this).addClass("active");
				});
								
			});
			
			
			$("body").find(".move_down, .move_down_white").each(function(){
				$(this).bind('click', function() {
					var gg =  $(this).attr("href").split("#");
					if(gg[1] === self.url){
						self.page_position();
					}
				});
			});			
			
			
			if(!isTouch){
				$("html").niceScroll({ zindex : 90000000, cursorborder : "0px", cursorcolor : self.scrollColor, cursorwidth:"7px", scrollspeed :70, horizrailenabled:false });
			}

			self.homePg = self.homePage === "" ? self.menuList[0].substr(1, self.menuList[0].length): self.homePage;
			self.cM = $('.contentWrapper [data-id="'+"#"+self.menuList[0]+'"]').parent();

			$('.contentWrapper [data-id="'+"#"+self.homePg+'"]').css("visibility","visible");			
			$('.contentWrapper [data-id="'+"#"+self.homePg+'"]').hide();
			
			
			// Initialize the mobile button action
			self.navUl.data('view',false);
			
			self.navEvent = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';
			
			self.bdy.find('img').each(function() {
				$(this).data("src",$(this).attr('src'));
			});			
			
			// Initialize the video	
			self.intVideoObject(self.bdy);
			
			// Enable/disable the image scale animation
			if(isTouch){
				$(".fmSliderNode img").removeClass("enableTransition"); 
				$(".circle_large").removeClass("enableTransition");  
			}else{
				$(".fmSliderNode img").addClass("enableTransition"); 
				$(".circle_large").addClass("enableTransition"); 
			}
			
			// Initialize the window resize function
			clearInterval(self.intr);
			$(window).resize(function() {	
				clearInterval(self.intr);
				self.intr = setInterval(function(){clearInterval(self.intr); self.windowRez();},100);
			});
			
			//Initialize the mobile orientationchange function
			$(window).bind( 'orientationchange', function(){
				self.windowRez();
			});
			
			
			
			self.site_display();
			
			var chkInt = setInterval(function() {
				clearInterval(chkInt);
				self.history();
				self.page_setup();
				for(var ik=0; ik < self.navArry.length; ik++){
					if(self.navArry[ik].attr("data-id") === self.url){
						self.updatePage(self.navArry[ik]);
						}
					}
			}, 300);
			
			// display isotope item
			$('.isotope_items').show();		
			
			
			if(self.headerFad){
				self.headerFad.delay(100).fadeOut(1000, "easeInOutQuart", function(){ 
					self.headerFad.remove();
					//api.options.slideshow = true;
					api.playToggle();
					//$.supersized.vars.autoplay = 1;
					
				});
			}
			
			$("body").find(".contentWrapper.full-Height").each(function(){
				if(!self.mobile){
					$(this).css({"min-height": self.winHeight});
				}else{
					$(this).css({"min-height": "auto"});
				}				
			});	
			
			
			if(iPhoneDevice){
				$(".homeSlider").css({"min-height": self.winHeight+100});	
			}else{
				$(".homeSlider").css({"height": self.winHeight});	
			}
			
			$(".previousPage span, .nextPage span").bind('click', function() {
				if($(this).data("url")){
					if($(this).data("url") !== self.url){
						window.location.href = "#"+$(this).data("url");
						}else{
							self.page_position();
					}
					if($('.nav a[href$="#'+$(this).data("url")+'"]').length > 0){
						$(".nav li a").removeClass("active");
						$('.nav a[href$="#'+$(this).data("url")+'"]').addClass("active");
					}
				}
			});
	

			$(".fadeAfterLoad").delay(200).fadeIn(300, function(){
				self.headerFixedHig = $(".navbar").outerHeight();
				self.page_position();
				});
			
			$('.contentWrapper').each(function(i) {
				var position = $(this).position();
				// console.log(position);
				// console.log('min: ' + position.top + ' / max: ' + parseInt(position.top + $(this).height()));
				
				$(this).scrollspy({
					min: position.top,
					max: position.top + $(this).height(),
					onEnter: function(element, position) {
						self.updatePage($(element));
						for(var ik=0; ik < self.navArry.length; ik++){
							if(self.navArry[ik].attr("data-id") === $(element).attr("data-id")){
								if(self.navArry[ik-1]){
									$(".previousPage span").data( "url" , self.navArry[ik-1].attr("data-id") );
									}
									if(self.navArry[ik+1]){
										$(".nextPage span").data( "url" , self.navArry[ik+1].attr("data-id") );
										}
							}
						}
					},
					
					onLeave: function(element, position) {
						// if(console) console.log('entering ' +  $(element).attr("data-id") + " - " +position.top);
						// if(console) console.log('leaving ' +   $(element).attr("data-id"));
					}
				});
			});
		},
		
		
		updatePage : function(ele){
			
			var self = this;
			
			var menuDefined = false;
			
			if($('.nav a[href$="#'+ ele.attr("data-id")+'"]').length > 0){
				menuDefined = true;
				$(".nav li a").removeClass("active");
				$('.nav a[href$="#'+ele.attr("data-id")+'"]').addClass("active");
			}
			if(!menuDefined){
				if($('.nav a[href$="#'+ele.attr("data-continue-page")+'"]').length > 0){
					$(".nav li a").removeClass("active");
					$('.nav a[href$="#'+ele.attr("data-continue-page")+'"]').addClass("active");
					}
				}
				
			$("body").find('.contentWrapper').each(function(){
				try{  $(this).find('.flexslider').data("slid").pause(); } catch (e) { }
			});
			
			try{ 
				var fc = ele.find('.flexslider');
				if(fc.data("loadInPop") === undefined){
					fc.data("slid").resume();
					}
			} catch (e) { }
			
			if(!isTouch){
				$("body").find('.graph_container li').each(function() {
					$(this).each(function() {
						$(this).children(':first-child').css("width","0px");
					});
				});
				
				ele.find('.graph_container').each(function(){
					self.graph_display($(this));
				});
				
				try{
					if(self.knobAni){
						$("body").find('.knob').each(function(){	
							if($(this).attr("value") !== 0){
								$(this).attr("value", 0);
								$(".knob").change();
							}
						});
						
						ele.find('.knob').each(function(){			
							var selK = $(this);
								selK.data("ani").css({"top":0})
								$(selK.data("ani")).animate({
									'top': selK.data("val")
								  },
								  {
									step: function(now, fx) {	
									  selK.attr("value", now);
									  selK.change();							 
									},
									duration: 1500, 
									easing: "easeInOutQuad"							 
								  });	
						});
					}
				} catch (e) { }	
			
			}
			
			
			
			

			
			
		
		},
		
		
		
		// Initialize video cover image
		intVideoObject : function(obj){
			var self = this;
			obj.find('.addVideo').each(function(){		
				var addCover = false;							
				$(this).find('.video_hover').each(function(){
									
					addCover = true;			
					$(this).hover(function() {
						$(this).stop().animate({opacity:0}, 200);
					}, function() {
						$(this).stop().animate({opacity:1}, 200);
					});
									
					var vid = $(this).parent();
					vid.data("added", true);
									
					vid.click(function(){
						$("body").find('.addVideo').each(function(){
							if($(this).parent().hasClass("tabVideo")){
								return;
							}
							$(this).find('.vid').remove();
							if(!$(this).data("added")){
								var vid = $(this);
								var W = vid.attr('data-width') ? vid.attr('data-width') : "100%";
								var H = vid.attr('data-height') ? vid.attr('data-height') : "100%";
								var A = vid.attr('data-autoplay') === "true" && !self.mobileDevice? true : false;
								vid.prepend('<div class="vid" ></div>');
								vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A);
							}			
							$(this).find('img').fadeIn();
							$(this).find('.video_hover').fadeIn();
							$(this).find('.video_hover').css({"z-index":"5"});
						});
			
						$(this).prepend('<div class="vid" ></div>');
						$(this).find('.video_hover').css({"z-index":"-1"});
						$(this).find('img').fadeOut(100,function(){
							var vid = $(this).parent();
							vid.children(':first-child').embedPlayer(vid.attr('data-url'), vid.width()+"px", vid.height()+"px", vid.width(), false);
						});			
					});
				});	
							
			});
			
		},
		
		videoRest : function(obj){
			$("body").find('.addVideo').each(function(){
				$(this).find('.vid').each(function(){
					$(this).remove();
				});
				$(this).find('img').show();
				$(this).find('.video_hover').show();
				$(this).find('.video_hover').css({"z-index":"5"});
			});
			$("body").find('.addVideo').each(function(){
				var vid = $(this);
				var kk = false;
				$(this).find('img').each(function(){
					kk = true;
				});
				if(!kk ){
					vid.data("added", true);
					var W = vid.attr('data-width') ? vid.attr('data-width') : "100%";
					var H = vid.attr('data-height') ? vid.attr('data-height') : "100%";
					var A = vid.attr('data-autoplay') === "true" && !self.mobileDevice? true : false;
					if(H === "100%"){
						vid.css({"height":"100%"});
					}
					vid.prepend('<div class="vid"></div>');
					vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A);
				}
			});
		},


// Page Background load function
		
		site_display : function(){
			
			var self = this;			

			if(!self.IE_old){
				$(".isotope_items .item a .img_text").css("visibility","visible");
			}

			$("body").data("bgType",isMobileChk);

			$("body").find('.parallax').each(function(){
				var img = !isMobileChk ? $(this).attr("data-src") : ($(this).attr("data-src-small")? $(this).attr("data-src-small")  : $(this).attr("data-src"));	
				var imgAtt = !isTouch ? "fixed" : "scroll";
				if(img !== undefined){
					$(this).css({"background-image":"url("+img+")", "background-attachment": imgAtt});
				}
			});
			
			$(".contentWrapper").find('#mapWrapper').each(function(){
				if(!self.IE_old){
					$(this).parent().prepend($(this).data('map'));
					$(this).parent().children(":first-child").addClass('mapStyle');
					$(this).remove();
				}
			});			
			
			$('body').find('.flexSlideshow').each(function(){
				var laz = $(this).hasClass('flexslider');
				if(!laz){  $(this).addClass("flexslider"); }
				var ffx = $(this);
				ffx.removeClass('flexSlideshow');
				ffx.append('<div class="slider_loading" ></div>');
				$(this).find(" a.lazyload").each(function(){
					self.lazyLoadInt($(this));
				});
				
				if(!laz){
					var flexs = $(this);
					flexs.flexslider({
					slideshow: true,
					slideshowSpeed: 5000,
					start: function(slider){
						flexs.data("slid",slider);
						flexs.find(".slider_loading").remove();
						slider.pause();
						}
					});
				}
			});

			$("body").find('.contentWrapper').each(function(){
				if($(this).attr("data-id") === self.url){
					isInCont = $(this);
				}
			});
			
			try{
				map_initialize(); 
			} catch (e) {
				$("#map_canvas").html($(this).data("con"));			
			}
			mapResizer();
		},
		
		
		page_position : function (e){
			var self = this;			
			
			self.kko = self.kko === undefined ? 1 : self.kko+1;

			if(self.rez){
				self.page_setup();
			}

			self.openYes = true;

			var isInCont = undefined;
			$("body").find('.contentWrapper').each(function(){
				if($(this).attr("data-id") === self.url){
					isInCont = $(this);
				}
			});
			
			self.videoRest();
					
			self.scrollObj.stop();

			if($("#supersized").height() !== null && typeof api !== 'undefined' ){				
				if(self.url === self.homePg){
					setTimeout(function(){
						if($.supersized.vars.is_paused){	
											
							api.playToggle();
						}
					},1000);
				}else{				
					setTimeout(function(){
						if(!$.supersized.vars.is_paused){	
											
							api.playToggle();
						}
					},1000);						
					
				}
				
			}			
			
			
			var posT = 0;
			var ddm = self.winWidth < 768 ? self.headerFixedHig-1  : self.headerFixedHig -1;
			posT = isInCont !== undefined ? parseInt(isInCont.position().top, 10)-ddm : 0;

			self.scrollObj.stop().animate({ scrollTop: posT }, self.aniSpeed, "easeInOutQuart");
			
			setTimeout(function(){  
				if(!isTouch){ $("html").getNiceScroll().resize(); }
			},20);
		
		},


// The entire page can be reposition, resize and modified by page_setup function
		page_setup : function (){
			
			var self = this;

			self.winWidth =   $(window).width();
			self.winHeight =   $(window).height();
			
			self.ipadPort = (self.winWidth >= 768 &&  self.winWidth < 1024);
			self.mobile = self.winWidth <= 959 && !self.ipadPort;
			self.midMobile = self.winWidth <= 767 && self.winWidth > 479;
			self.minMobile = self.winWidth <= 480;
			isMobileChk = self.winWidth < 768;
			lowResDesktop = self.winWidth <= 979;
			self.navTop = true;	
			self.headerFixedHig = $(".navbar").outerHeight();

			
			// Reset the required variable
			
			self.pgHeight = "100%";
			self.pgHeight =  "100%";
			
			$("#bodyContent").css({"width": "100%"});
			
			// Change the default image in img tag, if mobile version(data-src-small) image is assign on the img tag
			self.bdy.find('img').each(function() {
				var thsImg = $(this);
				var mobVer = thsImg.hasClass("lowResSupport") ? (self.winWidth <= 979 ? true : false) : self.mobile;
				
				if($(this).attr('data-src-small')){		
					if(!mobVer || !$(this).attr('data-src-small')){
						var img_Src = $(this).data('src').split(".");
						var iimg = $(this).attr('data-retina') === "yes" && retinaDevice ? img_Src[0]+"@2x."+ img_Src[1] : $(this).data('src');	
							if(String($(this).attr('src')) !== iimg){
								$(this).attr("src", iimg);
								$(this).data("i_src",$(this).data('src'));
							}			
					}else{
						if($(this).attr('data-src-small')){
							img_Src = $(this).attr('data-src-small').split(".");
							iimg = $(this).attr('data-retina') === "yes" && retinaDevice ? img_Src[0]+"@2x."+ img_Src[1] : $(this).attr('data-src-small');
							if(String($(this).attr('src')) !== String($(this).attr('data-src-small')) && String($(this).attr('src')) !== iimg){
								$(this).attr("src",iimg);
								$(this).data("i_src",$(this).attr('data-src-small'));
							}
						}
					}
				}
			});
			
			
			// Resize the portfolio
			$("body").find('.isotope_items').each(function(){
				if(!self.IE_old){
					var gaIt = $('.isotope_items .item');
					if(self.midMobile){
						gaIt.removeClass('large');
						gaIt.removeClass('small');
						gaIt.addClass('medium');
					}else if(self.minMobile){
						gaIt.removeClass('medium');
						gaIt.removeClass('large');
						gaIt.addClass('small');
					}else{
						gaIt.removeClass('medium');
						gaIt.removeClass('small');
						gaIt.addClass('large');
					}
				}
				$(this).isotope( {itemSelector : '.item', layoutMode : 'fitRows',
						animationOptions: {
							complete: function() { 
								if(!self.isoAniFin){ 
									self.isoAniFin = true;
									self.page_position();  
								}}
							}
						}, 'reLayout' );						 
			});
			
			if(self.rez){
				$(self.contClose.attr("data-content")).css({"top":"0px"});
				self.contClose.children(":first-child").children(":first-child").css({"right" : "-40px"});
			}
			
			if(self.rez && $("body").data("bgType") !== isMobileChk && $("body").data("bgType") !== undefined){
				$("body").data("bgType",isMobileChk);
				$("body").find('.parallax').each(function(){
					var img = !isMobileChk ? $(this).attr("data-src") : ($(this).attr("data-src-small")? $(this).attr("data-src-small")  : $(this).attr("data-src"));	
					var imgAtt = !isTouch ? "fixed" : "scroll";
					if(img !== undefined){
						$(this).css({"background-image":"url("+img+")", "background-attachment": imgAtt});
					}
				});
			}

			var tppp = 0;
			
			$("body").find(".contentWrapper.full-Height").each(function(){
				if(!self.mobile){
					$(this).css({"min-height": self.winHeight});
				}else{
					$(this).css({"min-height": "auto"});
				}				
			});	
			
			if(iPhoneDevice){
				$(".homeSlider").css({"min-height": self.winHeight+100});	
			}else{
				$(".homeSlider").css({"height": self.winHeight});	
			}

			
			var caa = $(window).height() - (self.headerFixedHig  + $(".contactPage .titleTop").outerHeight() + $(".footer").outerHeight() + $(".contactUsPg").outerHeight());
			caa = caa > 20 ? caa : 20;
			$(".contactPage .footer_fit").css({ "min-height": caa } );
			
			self.masonNum = self.winWidth < 1149? (self.mobile ? (self.midMobile ? 2 : 1) : 3) : (self.winWidth > 1360 ? 5 : 4);
			self.masonPer = (100/self.masonNum)-0.1+"%";

			$("body").find(".masonry_container").each(function(){
				$(this).find(".item").css({"width":self.masonPer});
				if(!isTouch  || ipadDevice){
					$(this).masonry({ 
						columnWidth: function( containerWidth ) {
							return containerWidth / self.masonNum;
						}
					});
				}
			});
		},
		
		
		
// The page_load function is used to position the page as per current menu 
		page_load : function (e){
				
			var self = this;
			self.url = e  ? e : self.homePg;
			self.cM = $('a[href$="#'+self.url+'"]').parent();
			self.cM_= !self.onePage ? $('a[href="'+self.url+'"]') : $('a[href$="#'+self.url+'"]');
			self.pgViewed = false;
			
			for(var ik=0; ik < self.navArry.length; ik++){
				if(self.navArry[ik].attr("data-id") === self.url){
					if(self.navArry[ik-1]){
						$(".previousPage span").data( "url" , self.navArry[ik-1].attr("data-id") );
						}
					if(self.navArry[ik+1]){
						$(".nextPage span").data( "url" , self.navArry[ik+1].attr("data-id") );
					}
				}
			}			 
						 			 
			var isInCont = undefined;
			$("body").find('.contentWrapper').each(function(){
				if($(this).attr("data-id") === self.url){
					isInCont = $(this);
					try{ 
						var fc = $(this).find('.flexslider');
						if(fc.data("loadInPop") === undefined){												
							fc.data("slid").resume();
						}
					} catch (e) { }
					
				}else{
					try{ $(this).find('.flexslider').data("slid").pause(); } catch (e) { }
				}
			});

			self.page_position();
					
			if(isInCont !== undefined ){
				if(self.curPg === ""){
					self.curPg = self.prePg = self.url;	
					if(self.pgSub === undefined && self.onePage){
						window.location.href = "#"+self.url;	
					}
					self.cM = $('a[href$="#'+self.curPg+'"]').parent();
				}
				return;
			}
			
			self.firstScrol = true;
			
			// Check the previous and current page
			
			if(self.prePg === self.curPg){
				
				try { self.fflod.remove(); } catch (e) { }
												
				// Initialize to load the opening page as per history
				if(self.curPg === "" ){						
					self.curPg = self.prePg = self.url;	
					if(self.pgSub === undefined && self.onePage){
						window.location.href = "#"+self.url;	
					}
					self.cM = $('a[href$="#'+self.curPg+'"]').parent();
					self.scrollObj.stop().animate({ scrollTop: "0px" }, 0, "easeInOutQuart");	
				}else{	
					// Initialize to load current page, background and animate to left side			
					self.curPg = self.url;
					var pagScrl_Speed = window.pageYOffset !== 0 ? self.aniSpeed : 50;
					var con_Speed = 0;
					if(self.prePg !== self.url){
						self.scrollObj.stop().animate({ scrollTop: "0px" }, pagScrl_Speed, "easeInOutQuart" ,function(){ });
					}else{
						if(isInCont != undefined || self.openYes){
							self.page_position();
						}
						self.scrollObj.stop().animate({ scrollTop: 0 }, 500, "easeInOutQuart" );
					}
				}
			}

		},
		
		
		masonry : function(){
			var self = this;
			
			self.masonNum = self.winWidth < 1149? (self.mobile ? (self.midMobile ? 2 : 1) : 3) : (self.winWidth > 1360 ? 5 : 4);
			self.masonPer = (100/self.masonNum)-0.1+"%";

			$("body").find('.masonry_container').each(function(){	
				self.manso = $(this);
				$(this).find(".item").css({"width":self.masonPer});
				
				
				$(this).find(".item").children(":first-child").find("img").each(function(){
					var $img = $(this);
                  

					$img.load(function() {
						if(!isTouch || ipadDevice){
							self.manso.masonry({ 
								columnWidth: function( containerWidth ) {
                                  return containerWidth / self.masonNum; 
								}
							});	
						}else{
							self.page_setup();
						}
						if(!isTouch){ $("html").getNiceScroll().resize(); }
						
						
						if(!self.manso.data('loading') ){
							self.manso.data({'loading': true});	
							setTimeout(function(){ 
								$("body").css({"overflow-y":"auto"}); 
								if(!isTouch){ $("html").getNiceScroll().resize(); }
							},2500);					
						}
								
					}).error(function () { 
						$(this).fadeIn(1000);
					}).each(function() {
                      if(this.complete) { $(this).trigger('load'); }
					});	
				});	
				
				if(isTouch  && !ipadDevice){
					$(this).find(".item").css({"position":"relative"});
					$(this).find(".item").addClass("enablHardwareAcc");
				}
				
			});
		},
		
		
		lazyLoadInt : function(obj){
			var self = this;
			var imSrc = !self.mobileDevice ? obj.attr("href") : (obj.attr("data-src-small")? obj.attr("data-src-small")  :obj.attr("href"));
			var lodr = obj.parent().hasClass('large_image');
			lodr = !lodr ? obj.parent().hasClass('medium_image') : lodr;
			lodr = !lodr ? obj.parent().hasClass('fixedHeight') : lodr;
			lodr = !lodr ? obj.hasClass('lazyload_single') : lodr;

			if(obj.parent().hasClass('imgBorder')){
				lodr = !lodr ? obj.parent().parent().hasClass('fixedHeight') : lodr;
			}			
			var cc = obj.attr('class');
			var st = obj.attr('style');
			if(st){
				var $img = $('<img class="'+cc+' style="'+st+'" />');
			}else{
				$img = $('<img class="'+cc+'" />');
			}

			$img.removeClass('lazyload_single');
			$img.removeClass('lazyload');
			obj.replaceWith($img);
			$img.hide();	
				
			if(lodr){
				$img.parent().append('<div class="slider_loading"></div>');
				if($img.parent().height() > 50){
					$img.parent().children(":last-child").css({"top":$img.parent().height()/2-15});
				}
				$img.attr('src', imSrc).load(function() {
					$(this).parent().find(".slider_loading").remove();
					$(this).fadeIn(300);
					if(!isTouch){ $("html").getNiceScroll().resize(); }
				}).error(function () { 
					$(this).parent().find(".slider_loading").remove();
				}).each(function() {
                  if(this.complete) { $(this).trigger('load'); }
				});
            }else{ 
				
				if($img.parent().hasClass('projImgPop')){
					$img.parent().append('<div class="slider_loading"></div>');
					$img.parent().children(":last-child").css({"top":$img.parent().height()/2-15});
					$img.parent().children(":last-child").css({"left":$img.parent().width()/2-15});
				}
				
				$img.attr('src', imSrc).load(function() {
					$(this).parent().find(".slider_loading").remove();
					$(this).fadeIn(300);
					var pim = $img.parent().parent().hasClass('projImgs');
					pim = pim ? pim : $img.parent().parent().parent().parent().hasClass('projImgs');
					if(pim){
						self.resizeImg($(this));
					}else{
						
						var posY = $(this).hasClass("scale_fill");
						posY = !posY ? $(this).hasClass("scale_fit") : posY;
						posY = !posY ? $(this).hasClass("scale_cover") : posY;
						
						if(posY){							
							if($(this).width() > $(this).parent().width()+5	){
								$(this).css({"left":-($(this).width()-$(this).parent().width())/2});
							}
							$(this).css({"top":-($(this).height()-$(this).parent().height())/2});
						}
							
					}
					if(!isTouch){ $("html").getNiceScroll().resize(); }
				}).error(function () {
					$(this).parent().find(".slider_loading").remove();
				}).each(function() {
                  if(this.complete) { $(this).trigger('load'); }
				});	
			}
			
		},
		
		
// Initialize the History 
		history : function(){
			var self = this;

			(function($){
				var origContent = "";			
				function loadContent(hash2) {
					window.location.href.substr(0, window.location.href.indexOf('#'));
					var splt = hash2.split("?");
					var hash = !self.onePage ? self.homePg : splt[0];
					self.pgSub = splt[1];

					if(hash !== "") {
						if(origContent === ""  && self.curPg === "") {
							origContent = $('.contentWrapper [data-id="'+"#"+self.homePg+'"]');
						}
						if(self.hisPath !== hash ){
							self.hisPath = hash;
							self.page_load(hash);
						}else{
							
							if(self.pgSub !== undefined && self.projFm){
								var p2 = self.pgSub.split("=");
								if((Number(p2[1]) !== self.curSlide)){
									self.curFmSlider = $(".pageHolder .fmSlides").data("sArry");
									self.curSlide = Number(p2[1]);
									self.showDetailPage(self.curFmSlider[Number(p2[1])]);
								}
							}
						}
					} else {

						if(origContent !== "" && self.curPg === "") {
							if(self.hisPath !== hash ){
								self.hisPath = hash;
								self.page_load(self.homePg);
							}
						}else{
							if(!self.onePage){
								if(self.pgSub !== undefined && self.projFm){
									p2 = self.pgSub.split("=");
									
									if((Number(p2[1]) !== self.curSlide)){
										self.curFmSlider = $(".pageHolder .fmSlides").data("sArry");
										self.curSlide = Number(p2[1]);
										self.showDetailPage(self.curFmSlider[Number(p2[1])]);
									}
								}
							}
						}
					}
					
					if(hash === "" && self.curPg === ""){
						self.page_load(self.homePg);
					}
					
					
				}

				$(document).ready(function() {
					$.history.init(loadContent);
					$('#navigation a').not('.external-link').click(function() {
						var url = $(this).attr('href');
						url = url.replace(/^.*#/, '');
						$.history.load(url);
						return false;
					});
				});
				
			})(jQuery);
			
		},

		
// Graph display function
		graph_display : function (e){
			e.find('li').each(function() {
				$(this).each(function() {
					$(this).children(':first-child').css("width","0px");
					$(this).children(':first-child').stop();
					$(this).children(':first-child').animate( { width: $(this).attr('data-level') },  1500, "easeInOutQuart");
				});
			});
		},
		
// Window Resize function
		windowRez : function (){			
			var self = this;
			if(Number(self.bdy.data("width")) !== Number($(window).width()) || Number(self.bdy.data("height")) !== Number($(window).height())){
				self.bdy.data("width", Number($(window).width()));
				self.bdy.data("height", Number($(window).height()));
				self.rez = true;
				self.page_setup();
				self.rez = false;
			}
		}
	};
	

		
// Initizlize and create the main plug-in
	$.fn.mainFm = function(params) {
	var $fm = $(this);
		var instance = $fm.data('GBInstance');
		if (!instance) {
			if (typeof params === 'object' || !params){
				return $fm.data('GBInstance',  new mainFm($fm, params));	
			}
		} else {
			if (instance[params]) {					
				return instance[params].apply(instance, Array.prototype.slice.call(arguments, 1));
			}
		}
	};

	
})( jQuery );