'use strict';
if (typeof jQuery === 'undefined') {
  throw new Error('CsmLTE requires jQuery');
} else {
	var $ = window.jQuery;
}

$.CsmLTE = {};

/* ----------------------------------
 * - Initialize the CsmLTE Object -
 * ----------------------------------
**/
function _init() {
	
	// LAYOUT FIXER
	$.CsmLTE.layout = {
    activate: function () {
      var _this = this;
      _this.fix();
      _this.fixSidebar();
      $(window, '.wrapper').resize(function () {
        _this.fix();
        _this.fixSidebar();
      });
    },
    fix: function () {
      //Get window height and the wrapper height
      var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
      var window_height = $(window).height();
      var sidebar_height = $('.sidebar').height();
      //Set the min-height of the content and sidebar based on the
      //the height of the document.
      if ($('body').hasClass('fixed')) {
        $('.content-wrapper').css('min-height', window_height - $('.main-footer').outerHeight());
      } else {
        var postSetWidth;
        if (window_height >= sidebar_height) {
          $('.content-wrapper').css('min-height', window_height - neg);
          postSetWidth = window_height - neg;
        } else {
          $('.content-wrapper').css('min-height', sidebar_height);
          postSetWidth = sidebar_height;
        }

        //Fix for the control sidebar height
        var controlSidebar = $($.CsmLTE.options.controlSidebarOptions.selector);
        if (typeof controlSidebar !== 'undefined') {
          if (controlSidebar.height() > postSetWidth) {
						$('.content-wrapper').css('min-height', controlSidebar.height());
					}
        }

      }
    },
    fixSidebar: function () {
      //Make sure the body tag has the .fixed class
      if (!$('body').hasClass('fixed')) {
        
      }
    }
  };

	// TREE NAVIGATOR
	$.CsmLTE.tree = function (menu) {
    var _this = this;
    var animationSpeed = $.CsmLTE.options.animationSpeed;
    $(document).on('click', menu + ' li a', function (e) {
      //Get the clicked link and the next element
      var $this = $(this);
      var checkElement = $this.next();

      //Check if the next element is a menu and is visible
      if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
        //Close the menu
        checkElement.slideUp(animationSpeed, function () {
          checkElement.removeClass('menu-open');
          //Fix the layout in case the sidebar stretches over the height of the window
          //_this.layout.fix();
        });
        checkElement.parent('li').removeClass('active');
      }
      //If the menu is not visible
      else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
        //Get the parent menu
        var parent = $this.parents('ul').first();
        //Close all open menus within the parent
        var ul = parent.find('ul:visible').slideUp(animationSpeed);
        //Remove the menu-open class from the parent
        ul.removeClass('menu-open');
        //Get the parent li
        var parent_li = $this.parent('li');

        //Open the target menu and add the menu-open class
        checkElement.slideDown(animationSpeed, function () {
          //Add the class active to the parent li
          checkElement.addClass('menu-open');
          parent.find('li.active').removeClass('active');
          parent_li.addClass('active');
          //Fix the layout in case the sidebar stretches over the height of the window
          _this.layout.fix();
        });
      }
      //if this isn't a link, prevent the page from being redirected
      if (checkElement.is('.treeview-menu')) {
        e.preventDefault();
      }
    });
  };

	// BOXY LADY
	$.CsmLTE.boxWidget = {
    selectors: $.CsmLTE.options.boxWidgetOptions.boxWidgetSelectors,
    icons: $.CsmLTE.options.boxWidgetOptions.boxWidgetIcons,
    animationSpeed: $.CsmLTE.options.animationSpeed,
    activate: function (_box) {
      var _this = this;
      if (!_box) {
        _box = document; // activate all boxes per default
      }
      //Listen for collapse event triggers
      $(_box).on('click', _this.selectors.collapse, function (e) {
        e.preventDefault();
        _this.collapse($(this));
      });

      //Listen for remove event triggers
      $(_box).on('click', _this.selectors.remove, function (e) {
        e.preventDefault();
        _this.remove($(this));
      });
    },
    collapse: function (element) {
      var _this = this;
      //Find the box parent
      var box = element.parents('.bx').first();
      //Find the body and the footer
      var box_content = box.find('> .bx-body, > .bx-footer, > form  >.bx-body, > form > .bx-footer');
      if (!box.hasClass('collapsed-box')) {
        //Convert minus into plus
        element.children(':first')
            .removeClass(_this.icons.collapse)
            .addClass(_this.icons.open);
        //Hide the content
        box_content.slideUp(_this.animationSpeed, function () {
          box.addClass('collapsed-box');
        });
      } else {
        //Convert plus into minus
        element.children(':first')
            .removeClass(_this.icons.open)
            .addClass(_this.icons.collapse);
        //Show the content
        box_content.slideDown(_this.animationSpeed, function () {
          box.removeClass('collapsed-box');
        });
      }
    },
    remove: function (element) {
      //Find the box parent
      var box = element.parents('.box').first();
      box.slideUp(this.animationSpeed);
    }
  };
}

$.CsmLTE.options = {

  //General animation speed for JS animated elements such as box collapse/expand and
  //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
  //'fast', 'normal', or 'slow'
  animationSpeed: 500,
  //Sidebar push menu toggle button selector
  sidebarToggleSelector: '[data-toggle="offcanvas"]',
  //Activate sidebar push menu
  sidebarPushMenu: true,

  //Enable sidebar expand on hover effect for sidebar mini
  //This option is forced to true if both the fixed layout and sidebar mini
  //are used together
  sidebarExpandOnHover: false,

  //Bootstrap.js tooltip
  enableBSToppltip: true,
  BSTooltipSelector: '[data-toggle="tooltip"]',
	
  controlSidebarOptions: {
    //Which button should trigger the open/close event
    toggleBtnSelector: '[data-toggle="control-sidebar"]',
    //The sidebar selector
    selector: '.control-sidebar',
    //Enable slide over content
    slide: true
  },
  //Box Widget Plugin. Enable this plugin
  //to allow boxes to be collapsed and/or removed
  enableBoxWidget: true,
  //Box Widget plugin options
  boxWidgetOptions: {
    boxWidgetIcons: {
      //Collapse icon
      collapse: 'fa-minus',
      //Open icon
      open: 'fa-plus',
      //Remove icon
      remove: 'fa-times'
    },
    boxWidgetSelectors: {
      //Remove button selector
      remove: '[data-widget="remove"]',
      //Collapse button selector
      collapse: '[data-widget="collapse"]'
    }
  },
  //Define the set of colors to use globally around the website
  colors: {
    lightBlue: '#3c8dbc',
    red: '#f56954',
    green: '#00a65a',
    aqua: '#00c0ef',
    yellow: '#f39c12',
    blue: '#0073b7',
    navy: '#001F3F',
    teal: '#39CCCC',
    olive: '#3D9970',
    lime: '#01FF70',
    orange: '#FF851B',
    fuchsia: '#F012BE',
    purple: '#8E24AA',
    maroon: '#D81B60',
    black: '#222222',
    gray: '#d2d6de'
  },
  //The standard screen sizes that bootstrap uses.
  //If you change these in the variables.less file, change
  //them here too.
  screenSizes: {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200
  }
};

/* ------------------
 * - Implementation -
 * ------------------
**/
$(function() {

	//Easy access to options
  var o = $.CsmLTE.options;

  //Set up the object
  _init();

  //Activate the layout maker
  $.CsmLTE.layout.activate();

  //Enable sidebar tree view controls
  $.CsmLTE.tree('.sidebar');

	  //Activate Bootstrap tooltip
  if (o.enableBSToppltip) {
    $('body').tooltip({
      selector: o.BSTooltipSelector
    });
  }

	  //Activate box widget
  if (o.enableBoxWidget) {
    $.CsmLTE.boxWidget.activate();
  }

});

// HIGHCHARTS GLOBAL
(function (Highcharts) {
	
	Highcharts.theme = {
		chart : {
			backgroundColor : {
				radialGradient : {
					cx : 0.5,
					cy : 0.3,
					r : 0.7
				},
				stops : [
					[0, '#484e55'],
					[1, '#3a3f44'],
					[2, '#313539']
				]
			},
			plotBorderColor : '#606063',
			panning: true,
			zoomType: 'x',
			panKey: 'shift'
		},
		title: {
      style: {
         color: '#E0E0E3'
      }
   },
		subtitle: {
			style: {
				 color: '#E0E0E3'
			}
		},
		xAxis: {
			gridLineColor: '#707073',
			labels: {
				 style: {
						color: '#E0E0E3'
				 }
			},
			lineColor: '#707073',
			minorGridLineColor: '#505053',
			tickColor: '#707073',
			title: {
				 style: {
						color: '#A0A0A3'

				 }
			}
		},
		yAxis: {
			gridLineColor: '#707073',
			labels: {
				 style: {
						color: '#E0E0E3'
				 }
			},
			lineColor: '#707073',
			minorGridLineColor: '#505053',
			tickColor: '#707073',
			tickWidth: 1,
			title: {
				 style: {
						color: '#A0A0A3'
				 }
			}
		},
		tooltip: {
			backgroundColor: 'rgba(0, 0, 0, 0.85)',
			style: {
				 color: '#F0F0F0'
			}
		},
		plotOptions: {
			series: {
				borderColor : null,
				 dataLabels: {
						color: '#B0B0B3'
				 },
				 marker: {
						lineColor: '#333'
				 }
			},
			boxplot: {
				 fillColor: '#505053'
			},
			candlestick: {
				 lineColor: 'white'
			},
			errorbar: {
				 color: 'white'
			},
			pie : {
				borderColor : null,
				borderWidth: 1
			}
		},
		legend: {
			itemStyle: {
				 color: '#E0E0E3'
			},
			itemHoverStyle: {
				 color: '#FFF'
			},
			itemHiddenStyle: {
				 color: '#606063'
			}
		},
		labels: {
			style: {
				 color: '#707073'
			}
		},
		drilldown: {
			activeAxisLabelStyle: {
				 color: '#F0F0F3'
			},
			activeDataLabelStyle: {
				 color: '#F0F0F3'
			}
		},
		navigation: {
			buttonOptions: {
				 symbolStroke: '#DDDDDD',
				 theme: {
						fill: '#505053'
				 }
			}
		},
		// scroll charts
		rangeSelector: {
			buttonTheme: {
				 fill: '#505053',
				 stroke: '#000000',
				 style: {
						color: '#CCC'
				 },
				 states: {
						hover: {
							 fill: '#707073',
							 stroke: '#000000',
							 style: {
									color: 'white'
							 }
						},
						select: {
							 fill: '#000003',
							 stroke: '#000000',
							 style: {
									color: 'white'
							 }
						}
				 }
			},
			inputBoxBorderColor: '#505053',
			inputStyle: {
				 backgroundColor: '#333',
				 color: 'silver'
			},
			labelStyle: {
				 color: 'silver'
			}
		},

		navigator: {
			handles: {
				 backgroundColor: '#666',
				 borderColor: '#AAA'
			},
			outlineColor: '#CCC',
			maskFill: 'rgba(255,255,255,0.1)',
			series: {
				 color: '#7798BF',
				 lineColor: '#A6C7ED'
			},
			xAxis: {
				 gridLineColor: '#505053'
			}
		},

		scrollbar: {
			barBackgroundColor: '#808083',
			barBorderColor: '#808083',
			buttonArrowColor: '#CCC',
			buttonBackgroundColor: '#606063',
			buttonBorderColor: '#606063',
			rifleColor: '#FFF',
			trackBackgroundColor: '#404043',
			trackBorderColor: '#404043'
		},

		// special colors
		legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
		background2: '#505053',
		dataLabelsColor: '#B0B0B3',
		textColor: '#C0C0C0',
		contrastTextColor: '#F0F0F3',
		maskColor: 'rgba(255,255,255,0.3)'
		};
	
	Highcharts.setOptions({
		lang : {
			contextButtonTitle : 'ACA context menu',
			decimalPoint : '.',
			downloadJPEG : 'Export as JPG',
			downloadPDF : 'Export as PDF',
			downloadSVG : 'Export as SVG',
			drillUpText : 'Back to {series.name}',
			loading : 'This will be awesome...',
			months : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			noData : 'No data to display',
			numericSymbols : ['k', 'M', 'G', 'T', 'P', 'E'],
			printChart : 'Export Chart',
			resetZoom : 'Reset zoom',
			resetZoomTitle : 'Reset zoom level 1:1',
			shortMonths : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			thousandsSep : ',',
			weekdays : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		},
		
		//colors: ['#7AC36A', '#F15A60', '#5A9BD4', '#737373', '#9E67AB', '#FAA75B', '#B8D2EC', '#D9E4AA', '#F2AFAD', '#CCCCCC', '#E7B2D4', '#F3D1B0'],
		colors : ['#257cb5', '#1c1e22', '#2bcc6f', '#f15a60', '#6472c5', '#fa9a3b', '#f7c051', '#0aa1a1', '#f45b5b'],
		
		credits : {
			enabled : true,
			href : 'mailto:ariel.andrade@stefanini.com?subject=Stefanini Dashboard Query',
			text : 'Created by ACAndrade',
			style : {
				fontSize : '10px',
				fontFamily : 'Roboto, "Helvetica Neue", Helvetica, Arial',
				color : '#808080'
			}
		},
		
		title : {
			style : {
				fontSize : '14px',
				fontFamily : 'Roboto, "Helvetica Neue", Helvetica, Arial',
				color : '#394243'
			}
		},
		
		subtitle : {
			style : {
				fontSize : '10px',
				fontFamily : 'Roboto, "Helvetica Neue", Helvetica, Arial',
				fontStyle : 'italic',
				color : '#808080'
			}
		},
		
		plotOptions : {
			series : {
				groupPadding : 0
			},
			column : {
				borderWidth : 0,
				borderRadius : 1,
				states : {
					hover : {
						enabled : true
					}
				}
			},
			spline : {
				dataLabels : {
					style : {
						color : '#808080',
						fontWeight : 'regular',
						fontSize : '10px',
						fontFamily : 'Roboto, "Helvetica Neue", Helvetica, Arial'
					}
				}
			}
		},
		
		exporting : {
			buttons : {
				contextButton : {
					menuItems : [{
							text : 'Export to PNG (small)',
							onclick : function () {
								this.exportChart({
									width : 250
								});
							}
						}, {
							text : 'Export to PNG (large)',
							onclick : function () {
								this.exportChart();
							},
							separator : false
						}
					]
				}
			}
		},
		
		legend : {
			title : {
				text : '<span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>',
				style : {
					fontStyle : 'italic'
				}
			},
			itemStyle : {
				fontSize : '10px',
				fontWeight : 'normal',
				fontFamily : 'Verdana',
				fontStyle : 'italic',
				color : '#808080',
				cursor : 'pointer'
			}
		},
		
		yAxis : {
			gridLineWidth : 1
		},
		
		xAxis : {
			labels : {
				style : {
					fontSize : '12px',
					fontWeight : 'normal',
					color : '#808080'
				}
			},
			startOnTick : false,
			endOnTick : false,
			lineColor : '#000000',
			tickColor : '#000000'
		},
		
		tooltip : {
			backgroundColor : {
				linearGradient : [0, 0, 0, 60],
				stops : [
					[0, '#FFFFFF'],
					[1, '#DEEBF7']
				]
			},
			style : {
				fontSize : '11px'
			}
		}
	});
	
	Highcharts.setOptions(Highcharts.theme);

	Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
		return {
			linearGradient: {				
				cx: 0.5,
				cy: 0.3,
				r: 0.9
			},
			stops: [
				[0, color],
				[1, Highcharts.Color(color).brighten(-0.2).get('rgb')] // darken
			]
		};
	});

})(window.Highcharts);

