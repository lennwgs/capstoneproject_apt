/* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */

			//////////////////////////////////////////////////////////////
			//////////////////////// Set-Up //////////////////////////////
			//////////////////////////////////////////////////////////////

			var margin = {top: 100, right: 100, bottom: 100, left: 100},
				width = Math.min(500, window.innerWidth - 10) - margin.left - margin.right,
				height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

			//Legend titles
			var LegendOptions = ['Apt A','Apt B'];

			//////////////////////////////////////////////////////////////
			////////////////////////// Data //////////////////////////////
			//////////////////////////////////////////////////////////////
			/*var factors2 = ["Rent",
											"Safety Index",
											"No Grocery (.5 mi)",
											"Time to Purdue (car)",
											"Time to Purdue (bus)",
											"Time to Purdue (walk)",
											"No bus to Purdue",
											"Bus Wait Time"]

			var data2 = [
					  [//iPhone
						{axis:factors2[0],value:0.22},
						{axis:factors2[1],value:0.28},
						{axis:factors2[2],value:0.29},
						{axis:factors2[3],value:0.17},
						{axis:factors2[4],value:0.22},
						{axis:factors2[5],value:0.50},
						{axis:factors2[6],value:0.02},
						{axis:factors2[7],value:0.21}
					  ],[//Samsung
						{axis:factors2[0],value:0.27},
						{axis:factors2[1],value:0.16},
						{axis:factors2[2],value:0.35},
						{axis:factors2[3],value:0.13},
						{axis:factors2[4],value:0.20},
						{axis:factors2[5],value:0.13},
						{axis:factors2[6],value:0.35},
						{axis:factors2[7],value:0.38}
					  ]
					];
				var factors = ["Rent",
												"# Bedroom",
												"# Bathroom",
												"Area(sq-ft)",
												"Safety Index",
												"# Grocery (.5 mi)",
												"Distance to Purdue (mi)"]
				var value1 = [0.0262,0.4,0.2,.14,.5,0.5,0.546]//,0.21]
				var value2 = [.1379,0.1,0.1,0.0519,.8,0.2,0.733]//,0.38]
				var data = [
						  [//apt 1
							{axis:factors[0],value:value1[0]},
							{axis:factors[1],value:value1[1]},
							{axis:factors[2],value:value1[2]},
							{axis:factors[3],value:value1[3]},
							{axis:factors[4],value:value1[4]},
							{axis:factors[5],value:value1[5]},
							{axis:factors[6],value:value1[6]}//,
							//{axis:factors[7],value:value1[7]}
						],[//apt 2
							{axis:factors[0],value:value2[0]},
							{axis:factors[1],value:value2[1]},
							{axis:factors[2],value:value2[2]},
							{axis:factors[3],value:value2[3]},
							{axis:factors[4],value:value2[4]},
							{axis:factors[5],value:value2[5]},
							{axis:factors[6],value:value2[6]}//,
							//{axis:factors[7],value:value2[7]}
						  ]
						];*/

			//////////////////////////////////////////////////////////////
			//////////////////// Draw the Chart //////////////////////////
			//////////////////////////////////////////////////////////////
			var w = 600;
			var h = 600;
			var radarChartOptions = {
		    w: width,
		    h: height,
		    margin: margin,
		    maxValue: 0.5,
		    levels: 5,
		    roundStrokes: true,
		    color: d3.scale.ordinal().range(["#FDF373","#24E456","#8E6CF9"])
		  };


			//Call function to draw the Radar chart
			RadarChart(".radarChart", data, radarChartOptions);
