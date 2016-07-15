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