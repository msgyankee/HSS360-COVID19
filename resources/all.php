//load d3viz.js
/* Alex Wellerstein's basic D3 Vizualization Template -- designed to make the creation of D3 vizualizations more modular 

v.3.0 (2017) -- now supports Google Maps


*/


var d3VizObj = {
	//holds data objects
	data: new Array(), //datasets
	maps: new Array(), //maps
	viz: new Array(), //visualizations
	controls: new Array(), //other things (filters, etc.)
	//hooks
	runHook: function(hook_name, hook_var) { //runs a hook function
		if(typeof d3VizObj.hooks[hook_name]!=="undefined") {
			if(debug) console.log("Hook: "+hook_name+" ["+d3VizObj.hooks[hook_name].length+"]");
			if(d3VizObj.hooks[hook_name].length>0) {
				for(var i in d3VizObj.hooks[hook_name]) {
					if(typeof d3VizObj.hooks[hook_name][i] == "function") d3VizObj.hooks[hook_name][i](hook_var);
				}			
			}
			//console.log(d3VizObj.hooks[hook_name]);
		} else {
			if(debug) console.log("Hook: "+hook_name+" [0]");
		}
	},
	addHook: function(hook_name, func) { //add a hook function
		if(typeof d3VizObj.hooks[hook_name]=="undefined") d3VizObj.hooks[hook_name] = [];
		d3VizObj.hooks[hook_name].push(func);
	},
	hooks: new Array(), //holder of hooks
	map_loaded: 0, //counts maps as they load
	data_loaded: 0, //counts datasets as they load
	viz_loaded: 0, //counts viz objects as they load
	datas_hook_run: 0, //records whether run_after_datas_loaded has run already 
	maps_hook_run: 0, //records whether run_after_maps_loaded has run already
	datas_maps_hook_run: 0, //records whether both have run
	is_loaded: function(obj) {
		if(obj.type=="map") this.map_loaded++;
		if(obj.type=="data") this.data_loaded++;
		if(obj.type=="viz") this.viz_loaded++;
		if((this.map_loaded>=d3VizObj.maps.length)&&(!this.maps_hook_run)) {
			d3VizObj.runHook("run_after_maps_loaded");
			this.maps_hook_run = true;
		}
		if((this.data_loaded>=d3VizObj.data.length)&&(!this.datas_hook_run)) {
			d3VizObj.runHook("run_after_datas_loaded");
			this.datas_hook_run = true;
		}
		if((this.map_loaded>=d3VizObj.maps.length)&&(this.data_loaded>=d3VizObj.data.length)&&(!this.datas_maps_hook_run)) {
			d3VizObj.runHook("run_after_data_and_map_loaded");
			this.datas_maps_hook_run = true;
		}
		if((this.map_loaded>=d3VizObj.maps.length)&&(this.data_loaded>=d3VizObj.data.length)&&(this.viz_loaded>=d3VizObj.viz.length)) {
			d3VizObj.runHook("run_after_everything");
			if(debug) console.log("D3Viz has finished all hooks");
		}
	},
	load: function() { //two for one -- loads maps and data in one go
		if(typeof debug == "undefined") debug = false;
		if(typeof debug_verbose == "undefined") debug_verbose = false;
		if(debug&&!debug_verbose) console.log("D3Viz object loading -- debug enabled");
		if(debug_verbose) console.log("D3Viz object loading -- verbose debug enabled");
	
		d3VizObj.addHook("run_after_map_loaded",function() { d3VizObj.loadData(); });
		d3VizObj.loadMaps();
	},
	loadMaps: function() { //load all the maps
		d3VizObj.runHook("run_before_maps_loaded");
		if(debug) console.log("Loading map(s): "+this.maps.length);
		if(this.maps.length) {
			for(var i in this.maps) {
				d3VizObj.runHook("run_before_map_loaded",this.maps[i]);
				if(debug) console.log("Loading map "+i);
				this.maps[i].load();
			}
		}
	},
	loadData: function() { //load all the data
		d3VizObj.runHook("run_before_datas_loaded");
		if(debug) console.log("Loading dataset(s): "+this.data.length);
		if(this.data.length) {
			for(var i in this.data) {
				d3VizObj.runHook("run_before_data_loaded",this.data[i]);
				if(debug) console.log("Loading dataset "+i);
				this.data[i].load();
			}
		}
	},
};

function d3Viz(constructor) { //basic constructor for data, controls, etc.
	this.constructor = constructor;
	this.loadOptions = function(options) { //moves options into main scope
		for(var i in options) {
			this[i] = options[i];
		}
	}
}

function d3Data(options) {
	var obj = this;
	obj.loadOptions(options);

	if(typeof obj.debug == "undefined") obj.debug=false;

	this.type = "data";

	d3VizObj.data.push(this);
	this.id = d3VizObj.data.length-1;
	
	this.load = function () {
		if(obj.csv) {
			this.delim = ",";
			this.file = obj.csv;
			this.filetype = "CSV";
		} else if(obj.tsv) {
			this.delim = "\t";
			this.file = obj.tsv;
			this.filetype = "TSV";
		} 
		if(typeof this.mimetype == "undefined") this.mimetype = "text/plain";
		if(this.delim&&this.file) { 
			if(typeof this.filetype == "undefined") this.filetype="USERDEFINED";
			if(debug||obj.debug) console.log("Trying to load data from "+obj.file+" ("+obj.filetype+")");
			var dsv = d3.dsv(this.delim,this.mimetype);
			dsv(obj.file, function(datarows) {
				obj.data = new Array();
				if(datarows == null) alert("Could not load "+obj.file+" - check that file path is valid and you are using a browser that allows for file requests");
				var i = 0; //just a counter
				datarows.forEach(function (d) {
					d.i = parseInt(i); //keep track of row number
					if((debug&&debug_verbose)||obj.debug) console.log("Parsing row "+i);
					if(typeof obj.each == "function") {
						d = obj.each(d);
					}
					d3VizObj.runHook("run_on_each_data_row",{d,i,obj});
					if(d) { //if object still exists 
						obj.data.push(d);
						i++;
					}
				})
                if(debug) console.log(obj.data);
				d3VizObj.runHook("run_after_data_loaded",obj);
				d3VizObj.is_loaded(obj);
			})
		} else {
			if(debug||obj.debug) console.log("No file specified!"); //maybe someday add other types of support
			d3VizObj.is_loaded(this);
		}	
	}		
}
d3Data.prototype = new d3Viz(d3Data);


//SVG map -- JSON file
function d3SVGMap(options) {
	var obj = this;
	obj.loadOptions(options);

	obj.type = "map";
	obj.maptype = "SVG"; 
	obj.zoom_factor = 1; //keeps track of zooming for SVG elements

	if(typeof obj.debug == "undefined") obj.debug=false;

	obj.projection = d3.geo[obj.projection_name](); //set projection
	if(obj.projection_rotate) obj.projection.rotate(obj.projection_rotate) //rotates the world
	if(obj.projection_scale) obj.projection.scale(obj.projection_scale) 			 //sets the zoom factor 
	if(obj.projection_translate) obj.projection.translate(obj.projection_translate); //moves the map 
	
	d3VizObj.maps.push(obj); obj.id = d3VizObj.maps.length-1;

	//resizes map when window resizes
	this.updateWindow = function (obj) { 
		var w = window;
		var window_width = w.innerWidth || e.clientWidth || g.clientWidth;
		var window_height = w.innerHeight|| e.clientHeight|| g.clientHeight;
		obj.svg.attr("height", window_height);	
	}

	//loads map
	this.load = function() {
		//create a path to manipulate
		obj.path = d3.geo.path().projection(this.projection);

		//create a svg object, add to div
		obj.svg = d3.selectAll(obj.div).append('svg')
				.attr('width',obj.width)
				.attr('height',obj.height)
				.attr("viewBox","0 0 "+obj.width+" "+obj.height) //this last line makes it resize along with the browser window
		
		//make it resize with window -- can be override by setting noUpdate to true
		if(!obj.noUpdate) {
			window.onresize = function() { obj.updateWindow(obj) }
		}

		//creates various object groups we can later manipulate
		//you should not change these base three -- stage, landforms, and captions -- but you can add others
		this.addGroup("stage",obj.svg); //a basic group that other things are attached to -- useful for zooming
		this.addGroup("landforms",obj.stage); //where the base map lives

		if(typeof obj.graticule_function == "function") {
			this.addGroup("graticule",obj.stage); //where the graticule will live
			obj.graticule.append("path")
				.datum(obj.graticule_function)
				.attr("id", "map_"+obj.id+"_graticule")
				.attr("d", obj.path);
		}
		
		//run an onload if it exists
		if(typeof obj.onload == "function") obj.onload();
		
		//if we have map file
		if(obj.mapfile) {
			//load the json...
			d3.json(obj.mapfile, function(error, world) {
				if(debug) console.log("Loading mapfile ("+(obj.mapfile)+")");
				obj.topology = world;
				//this "switch" just makes this compatible with the two main types of map files
				switch(world.type) {
					case "FeatureCollection": 
					if(debug||obj.debug) console.log("Loading FeatureCollection");
					obj.landforms.append("g").attr("id","paths_"+obj.id)
						.selectAll(".land_boundaries")
						.data(world.features)
						.enter()
						.append("path")
						  .attr("id",function(d,i) {
							if(typeof obj.setid == "function") {
								return obj.setid(d);
							} else {
								return "id_"+obj.id+"_"+i;
							}
						  })
						  .each(function(d,i) {
							if(typeof obj.each == "function") {
								obj.each(d,i,this);
							}
						})
						.classed("boundaries",true)
						  .classed("map_"+obj.id,true)
						  .classed("map",true)
						  .classed("boundary",true)
						.attr("d", obj.path)
						.on("mouseover", function(d){ obj.mapMouseover(d,this) })  //what to do when the mouse goes over
						.on("mousemove", function(d){ obj.mapMousemove(d,this) })  //what to do when the mouse goes over
						.on("mouseout",  function(d){ obj.mapMouseout(d,this); }) //what to do when the mouse is no longer over it
						.on("click", function(d) { obj.mapMouseclick(d,this); }); //what to do if clicked
						;
					break;
					case "Topology":
						if(debug||obj.debug) console.log("Loading Topology");
						for(objectname in world.objects) {
							if(typeof obj.loadobjects == "undefined") {
								var loadobject = true;
							} else {
								if(obj.loadobjects.indexOf(objectname)>-1) {
									var loadobject = true;
								} else {
									var loadobject = false;
								}
							}
							if(debug||obj.debug) console.log("Found map object: "+objectname);
							if(loadobject) {
							if(debug||obj.debug) console.log("Loading map object: "+objectname);
								obj.addGroup(objectname,obj.landforms,"#"+objectname);
								for(item in world.objects[objectname]) {
									switch(world.objects[objectname].type) {
										case "MultiPolygon":
											d3.select("#"+objectname)
												.datum(topojson.feature(world,world.objects[objectname]))
												.append("path")
												.each(function(d,i) {
													if(typeof obj.each == "function") {
														obj.each(d,i,this);
													}
												  })
												.attr("d",obj.path)
										break;
										case "GeometryCollection":
											d3.select("#"+objectname).selectAll("path")
												.data(topojson.feature(world,world.objects[objectname]).features)
												.enter()
												.append("path")
												.attr("id",function(d,i) {
													if(typeof obj.setid=="function") {
														return obj.setid(d,objectname);
													} else {
														return "id_"+obj.id+"_"+objectname+"_"+i;
													}
												})
												.attr("class",function(d) {
													if(typeof obj.class == "function") {
														return obj.class(d);
													}else if(typeof obj.class=="undefined") {
														return "geojson_path";
													} else {
														return obj.class;
													}
												})
												.each(function(d,i) {
													if(typeof obj.each == "function") {
														obj.each(d,i,this);
													}
												  })
												.attr("d",obj.path)
										break;
										default:
											if(debug||obj.debug) {
												console.log("Unexpected geoJSON type:" + world.objects[objectname].type);
											}
										break;
									}
								}
							}	
						}
						/*
						obj.addGroup("land",obj.landforms,".land");
						obj.addGroup("boundaries",obj.landforms,".boundaries");
						//try to load all the map objects
						var xx = []; 
						for(x in world.objects) xx.push(x);
						for(y in xx) {
							x = xx[y];
							if(world.objects[x].type=="MultiPolygon") {
							  if(debug) console.log("Loading map object: "+x);
							  obj.land.append("path")
								  .datum(topojson.feature(world, world.objects[x]))
								  .classed("map_"+x,true)
								  .classed("map",true)
								  .classed("map_polygon",true)
								  .attr("id",function(d) {
								  	if(typeof obj.setid == "function") {
								  		console.log(d,obj.setid(d), d.id);
								  		return String(obj.setid(d));
								  	} else {
								  		return "id_"+obj.id+"_"+x;
								  	}
								  })
								  .attr("d", obj.path)
								  ;	
							} else if(world.objects[x].type=="GeometryCollection") {
							  if(debug) console.log("Loading map object: "+x);
							  obj.boundaries.selectAll(".boundaries")
								  .data(topojson.feature(world, world.objects[x]).features)
								  .enter()
								  .append("path")
								  .attr("id",function(d,i) {
								  	if(typeof obj.setid == "function") {
								  		return String(obj.setid(d));
								  	} else {
								  		if(typeof d.id!=="undefined") {
								  			return "id_"+String(d.id).replaceAll(" ","_");
								  		} else {
								  			if(typeof d.properties!=="undefined") {
								  				if(d.properties.id!=="undefined") {
								  					return "id_"+String(d.properties.id).replaceAll(" ","_");
								  				} else {
										  			return "id_"+i;						  				
								  				}
								  			} else {
									  			return "id_"+i;
									  		}
								  		}
								  	}
								  })
								  .each(function(d,i) {
								  	if(typeof obj.each == "function") {
								  		obj.each(d,i,this);
								  	}
								  })
								  .classed("map_"+x,true)
								  .classed("map",true)
								  .classed("boundary",true)
								  .attr("d", obj.path)
								  ;	
							} else {
								if(debug) console.log("Unknown map object: "+world.objects[x]);
							}
					}*/
					 break;
					 default:
					 	if(debug||obj.debug) console.log("Unknown world type ("+world.type+")");
					 break;
				}
				if(debug) console.log("Mapfile loaded ("+obj.mapfile+")");
				//run hook
				d3VizObj.runHook("run_after_map_loaded",obj);
				d3VizObj.is_loaded(obj);
			});
		} else {
			//no map file.. move on
			if(debug) console.log("Mapfile not loaded -- no mapfile defined!");
			d3VizObj.runHook("run_after_map_loaded");
			d3VizObj.is_loaded(this);
		} 
	}
	//adds a svg group
	this.addGroup = function(id, parent, label) {
		if(typeof label=="undefined") {
			this[id] = parent.append("g").attr("id",id);
		} else {
			if(label[0]=="#") {
				this[id] = parent.append("g").attr("id",label.substr(1,label.length));			
			} else if (label[0]==".") { 
				this[id] = parent.append("g").attr("class",label.substr(1,label.length));			
			}
		}
		return this[id];
	}

	this.mapMouseover = function(d,shape) {
		if(typeof obj.mouseover_caption == "function") {
			var shape_id = d3.select(shape).attr("id");
			d3.select("#"+obj.caption_id).html(obj.mouseover_caption(obj.data.data[obj.index[shape_id]],d,shape));
		} else if(obj.mouseover_caption) {
			d3.select("#"+obj.caption_id).html(obj.mouseover_caption);
		}
		if(typeof obj.mouseover == "function") {
			var shape_id = d3.select(shape).attr("id");
			obj.mouseover(obj.data.data[obj.index[shape_id]],d,shape);
		}	
	}
	this.mapMousemove = function(d,shape) {
		if(typeof obj.mousemove == "function") {
			var shape_id = d3.select(shape).attr("id");
			obj.mousemove(obj.data.data[obj.index[shape_id]],d,shape);
		}
	}
	this.mapMouseout = function(d,shape) {
		if(typeof obj.mouseover_caption == "function") {
			d3.select("#"+obj.caption_id).html("");
		}
		if(typeof obj.mouseout == "function") {
			obj.mouseout(shape);
		}
	}
	this.mapMouseclick = function(d,shape) {
		if(typeof obj.mouseclick == "function") {
			var shape_id = d3.select(shape).attr("id");
			obj.mouseclick(obj.data.data[obj.index[shape_id]],d,shape);
		}	
	}


}
d3SVGMap.prototype = new d3Viz(d3SVGMap);

//Google Map -- 
function d3GMap(options) {
	var obj = this;
	obj.loadOptions(options);
	obj.type = "map";
	obj.maptype = "GMap";
	d3VizObj.maps.push(obj); obj.id = d3VizObj.maps.length-1;
	if(typeof obj.debug == "undefined") obj.debug=false;
	if(typeof obj.padding == "undefined") obj.padding = 50; //padding to extend boundary so markers aren't cut -- can be modified

	this.load = function () {
		if(debug) console.log("Loading Google Map");
		this.mapObj = new google.maps.Map(d3.select(obj.div).node(), obj.mapOptions);

		obj.overlay = new google.maps.OverlayView();
		obj.overlay.setMap(this.mapObj);

		obj.bounds = new google.maps.LatLngBounds();	

		//this runs when the overlay is first ready to use
		obj.overlay.onAdd = function() {
			obj.svg = d3.select(this.getPanes().overlayMouseTarget)
				.append("svg")
				.attr('id','svg')
				.attr('class','gmap')
			obj.addGroup("stage",obj.svg); //a basic group that other things are attached to -- useful for zooming
			d3VizObj.runHook("run_after_map_loaded",obj);
			d3VizObj.is_loaded(obj);
		}

		this.overlay.draw = function() {
			if(debug) console.log("Redrawing overlay");
				obj.projection = obj.overlay.getProjection();
				obj.sw = obj.projection.fromLatLngToDivPixel(obj.bounds.getSouthWest());
				obj.ne = obj.projection.fromLatLngToDivPixel(obj.bounds.getNorthEast());
				// extend the boundaries so that markers on the edge aren't cut in half
				obj.sw.x -= obj.padding;
				obj.sw.y += obj.padding;
				obj.ne.x += obj.padding;
				obj.ne.y -= obj.padding;

			//positions the SVG within the overlay
				d3.select("#svg")
					.attr('width',Math.max(obj.ne.x - obj.sw.x,0) + 'px')
					.attr('height',Math.max(obj.sw.y - obj.ne.y,0) + 'px')
					.style('position','absolute')
					.style('left',obj.sw.x+'px')
					.style('top',obj.ne.y+'px');

			d3VizObj.runHook("overlay_draw",obj);

		}

		//run an onload if it exists
		if(typeof obj.onload == "function") obj.onload();
	
	}

	//adds a svg group
	this.addGroup = function(id, parent, label) {
		if(typeof label=="undefined") {
			this[id] = parent.append("g").attr("id",id);
		} else {
			if(label[0]=="#") {
				this[id] = parent.append("g").attr("id",label.substr(1,label.length));			
			} else if (label[0]==".") { 
				this[id] = parent.append("g").attr("class",label.substr(1,label.length));			
			}
		}
		return this[id];
	}
	
	this.gprojection = function() {
	  return function(lnglat) {
	  	var prj = obj.overlay.getProjection();
		var ret = prj.fromLatLngToDivPixel(new google.maps.LatLng(lnglat[1],lnglat[0]));
		return [ret.x, ret.y]
	  };
}
	
}
d3GMap.prototype = new d3Viz(d3GMap);

//automates making a select element
function make_selector(settings) {
	var dv = document.createElement("div");
	if(settings.div_id) dv.id = settings.div_id;
	if(settings.div_class) dv.className = settings.div_class;
	if(settings.caption) {
		var cap = document.createTextNode(settings.caption);
		dv.appendChild(cap);
	}
	var sel = document.createElement("select");
	if(settings.select_id) sel.id = settings.select_id;
	if(settings.dataindex) sel.dataindex = settings.dataindex;
	if(settings.onchange) {
		sel.onchange = settings.onchange;
	}
	for(var i in settings.selector_options) {
		var opt = document.createElement("option");
		opt.text = settings.selector_options[i][0];
		opt.value = i;
		if(settings.default_option) {
			if(i==default_option) opt.selected = true;
		}
		sel.add(opt);
	}
	dv.appendChild(sel);
	if(settings.post_caption) {
		var cap2 = document.createTextNode(settings.post_caption);
		dv.appendChild(cap2);
	}
	if(settings.attach_to_id) {
		document.getElementById(settings.attach_to_id).appendChild(dv);
	} else if(settings.attach_to_element) {
		document[settings.attach_to_element].appendChild(dv);
	}
}

//allows to move an SVG object around
d3.selection.prototype.moveUp = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

//loads a script on the fly
function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}


//this is just a generic custom sorting function whose only thing going for it is that it can distinguish alphabetic vs. numeric sorting
function sort_it(a,b) {
    if(isNaN(a)) {
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
    } else {
        return a - b;
    }
}

//I get so tired of asking if something is undefined
function undef(obj) {
	return typeof obj =="undefined";
}

//sets a default value if something is undefined
function setdefault(obj, value) {
	if(undef(obj)) {
		return value;
	} else {
		return obj;
	}
}

// toggles a given class on or out of a typical class list
// this is similar to d3's .classed() function but can be used within attr("class") which is easier for a lot of cases
// it works by understanding that classes are just lists separated by spaces, so it converts that to an array, parses the array, recombines it into a string
function toggleClass(classlist,classname,toggle) {
	classes = classlist.split(" ");
	if(toggle) {
		if(classes.indexOf(classname)==-1) {
			classes.push(classname);
		}
	} else {
		if(classes.indexOf(classname)>-1) {
			classes.splice(classes.indexOf(classname),1);
		}
	}
	return classes.join(" ");
}

//extends replace so it will replace all
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

if(window.debug) console.log("d3viz framework loaded");
//load data_datacircles.js
/* LAT/LNG SVG CIRCLE POINT DATA - by Alex Wellerstein, v3.0 

This data mode is for displaying data that can be plotted with latitude and longitude pairs as SVG. These will be represented by
circles on the map. Their radius and color can be separately set based on either fixed values, or dynamically
according to rows in the dataset. Putting the mouse over a datapoint can trigger a tooltip event.

v3.0 -- now works with GMap type

*/

function dataCircles(options) {
	if(typeof options.load!="undefined" && options.load == false) return false; //aborted

	var obj = this;
	obj.loadOptions(options);
	this.type = "viz";
	d3VizObj.viz.push(obj); obj.id = d3VizObj.viz.length-1;
	if(typeof obj.target=="undefined") obj.target="circle";
	if(typeof obj.debug=="undefined") obj.debug = false;

	if(typeof obj.autosort=="undefined") obj.autosort = true;
	if(typeof obj.colortarget=="undefined") obj.colortarget = "fill";
	if(typeof obj.group_id=="undefined") obj.group_id = "circles_"+obj.id;
	if(typeof this.data_prefix == "undefined") this.data_prefix = "d";

	if(typeof obj.data_class=="undefined") {
		obj.target_class == "circledata";
	} else {
		obj.target_class = obj.data_class;
	}

	//sets up the radius size selector
	if(typeof obj.radius_selector_options!=="undefined") {

		if(typeof obj.radius_selector_attach_id=="undefined") {
			obj.radius_selector_attach_id = "options";
		}
	
		//this has to run after the main body element has loaded because it relies on a div to attach
		d3VizObj.addHook("run_before_map_loaded",
			function() {
				make_selector({
					div_id: "circles_radius_"+obj.id,
					div_class: "circles_radius_div",
					caption: obj.radius_selector_caption?obj.radius_selector_caption:"Radius: ",
					select_id: "circles_radius_select_"+obj.id,
					onchange: function() { obj.updateRadius(this.value); },
					attach_to_id: obj.radius_selector_attach_id,
					selector_options: obj.radius_selector_options,
					default_option: obj.radius_selector_default,
					caption: obj.radius_selector_caption
				}
				);	
				;
			});
	}

	this.processData = function (r) {
		if(r.obj.id==obj.data.id) {
			if(!r.d.positions) {
				//pick out the lat/lon fields
				if(typeof obj.latLon == "function") {
					var lat = (obj.latLon(r.d)[0]);
					var lon = (obj.latLon(r.d)[1]);
				} else if(typeof r.obj.latLon == "function") {
					var lat = (r.obj.latLon(r.d)[0]);
					var lon = (r.obj.latLon(r.d)[1]);
				} else {
					var lat = null; var lon= null;
				}
				//check if the lat/lon are valid
				if(isNaN(lat)||isNaN(lon)) {
					if(debug||obj.debug) console.log("Ignored row "+r.i+" because lat or lon were not a number");
					r.d = ""; //ignore the data row
				} else {
					if(obj.map.maptype=="SVG") {
						r.d.positions = obj.map.projection([lon,lat]); //create the pixel positions and add them to the data object 
					} else if(obj.map.maptype=="GMap") {
						obj.map.bounds.extend(r.d._LatLng = new google.maps.LatLng(lat, lon));
					}
					if((debug&&debug_verbose)||obj.debug) console.log("Adding data for row "+r.i+" at "+lat+", "+lon);
				}
			}
		}
	}
	
	this.showData = function(r) {
		if(d3.select("#"+obj.group_id)[0][0] == null) {
			obj.group = obj.map.addGroup(obj.group_id,obj.map.stage);
		} else {
			obj.group = d3.select("#"+obj.group_id);
		}
		if(debug||obj.debug) console.log("Creating circles for dataset "+obj.data.id);

		 obj.group.selectAll(obj.target)
			.data(obj.data.data, function(d) { return obj.data_prefix+"_"+obj.data.id+"_"+d.i;} ) //use the data to draw the circles...
			  .enter().append(obj.target)
			  	.each(function(d) {
			  		if(obj.map.maptype=="GMap") {
						return d3.select(this)
							.attr("cx", function(d, i) { return obj.xpos(d); }) //x position
							.attr("cy", function(d, i) { return obj.ypos(d); }) //y position			
			  		}
			  		if(typeof obj.each =="function") obj.each(d,i,this);
			  	})
				.classed(obj.target_class,true) 
				.attr("id", function(d, i) { return obj.data_prefix+"_"+obj.id+"_"+d.i; }) //set an individual id for each circle
				.attr("i", function(d, i) { return d.i; }) //same as the above but just a number -- sometime useful to have access to which number it is in the set			
				.attr("cx", function(d, i) { return obj.xpos(d); }) //x position
				.attr("cy", function(d, i) { return obj.ypos(d); }) //y position			
				.style(obj.colortarget, function(d,i) { return obj.dataColor(d); }) //fill color, based on a function above
				.attr("r", function(d, i) { return obj.dataRadius(d); }) //set the radius, based on the radius option function above			
				.on("mouseover", function(d,i){ obj.dataMouseOver(d,d.i,this); })  //what to do when the mouse goes over
				.on("mouseout",  function(d,i){ obj.dataMouseOut(d,d.i,this); }) //what to do when the mouse is no longer over it
			;
		if(obj.autosort) obj.sortByRadius(obj.dataRadius); //sort	

		if(obj.map.maptype=="GMap") {
			d3VizObj.addHook("overlay_draw",function() {
				obj.group.selectAll(obj.target)
					.data(obj.data.data, function(d) { return obj.data_prefix+"_"+obj.data.id+"_"+d.i;} )
					.each(function(d) {
						return d3.select(this)
							.attr("cx", function(d, i) { return obj.xpos(d); }) //x position
							.attr("cy", function(d, i) { return obj.ypos(d); }) //y position			
					})
					.attr("cx", function(d, i) { return obj.xpos(d); }) //x position
					.attr("cy", function(d, i) { return obj.ypos(d); }) //y position			
			});
			obj.map.overlay.draw();
		}

	}

	this.xpos = function(d) {
		if(typeof obj.xpos_func == "function") {
			return obj.xpos_func(d,i);
		}
		if(this.map.maptype=="SVG") {
			if(typeof d.positions!="undefined") {
				return d.positions[0];
			} else {
				return -100;
			}
		} else if(this.map.maptype=="GMap") {
			z = obj.map.projection.fromLatLngToDivPixel(d._LatLng); //calculates from google maps projection
			return z.x-obj.map.sw.x;
			
		}
	}
	this.ypos = function(d) {
		if(typeof obj.ypos_func == "function") {
			return obj.ypos_func(d,i);
		}
		if(this.map.maptype=="SVG") {
			if(typeof d.positions!="undefined") {
				return d.positions[1];
			} else {
				return -100;
			}
		} else if(this.map.maptype=="GMap") {
			z = obj.map.projection.fromLatLngToDivPixel(d._LatLng); //calculates from google maps projection
			return z.y-obj.map.ne.y;
			
		}
	}

	
	this.dataRadius = function (d) {
		if(obj.radius) {
			if(typeof obj.radius == "function") {
				return obj.radius(d);
			} else {
				return obj.radius;
			}
		}
		if(obj.radius_selector_options) {
			var radiusOption = document.getElementById("circles_radius_select_"+obj.id).value;
			return Math.max(obj.radius_selector_options[radiusOption][1](d),0);
		}
	}

	this.dataColor = function (d) {
		if(obj.color) {
			if(typeof obj.color =="function") {
				return obj.color(d);
			} else {
				return obj.color;
			}
		} else if(obj.color_field) {
			if(obj.color_scale) {
				return obj.color_scale(d[obj.color_field]);
			} else {
				return d[obj.color_field];		
			}
		}
	}
	
	this.dataMouseOver = function (d,i,shape) {
		d3.select(shape).classed("mouseover",true);
		if(typeof obj.mouseover == "function") {
			return obj.mouseover(d,i);
		} else if(typeof obj.mouseover_caption == "function") {
			obj.map.tooltip.html(obj.mouseover_caption(d,i));
		} else if(obj.mouseover_caption) {
			obj.map.tooltip.html(obj.mouseover_caption);
		}
	}

	this.dataMouseOut = function (d,i,shape) {
		d3.select(shape).classed("mouseover",false);
		if(typeof obj.mouseout == "function") {
			obj.mouseout(d,i);
		} else {
			obj.map.tooltip.html("");
		}
	}

	this.updateRadius = function (value) {
		if(debug||obj.debug) console.log("Changing circle radii");
		if(value===false) {
			//if there is no selector, just refresh based on the circle_radius settings
			obj.map.svg.selectAll("."+obj.target_class) //for each of the circles...
				.transition()	//adding this means it will make the radius change in a smooth way
				.style("fill", function(d,i) { return obj.dataColor(d); }) // change the color (if needed)
				.attr("r", function(d, i) { return obj.dataRadius(d); });
			if(obj.autosort) this.sortByRadius(obj.dataRadius);
		} else {
			//otherwise use the provided value
			obj.map.svg.selectAll("."+obj.target_class) //for each of the circles...
				.transition()	//adding this means it will make the radius change in a smooth way
				.style("fill", function(d,i) { return obj.dataColor(d); }) // change the color (if needed)
				.attr("r", function(d, i) { 
					return Math.max(obj.radius_selector_options[value][1](d),0); });	
			if(obj.autosort) this.sortByRadius(obj.radius_selector_options[value][1]);
		}
	}
	this.sortByRadius = function(radfunc) {	
		//sorts so that smallest radius always on top
		obj.map.svg.selectAll("."+obj.target_class) //for each of the items...
		.sort(function (a,b) { //resort so bigger items on bottom
			return radfunc(b) - radfunc(a);
		})
		;
	}
	
	this.id_prefix = function(id) {
		return obj.data_prefix+"_"+obj.id+"_"+id;
	},
	
	this.locate = function (id) {
		obj.map.svg.selectAll("."+obj.target_class) //unselect all
			.classed("selected",false);
		if(id) { //select the id
				svg.select("#"+obj.data_prefix+"_"+obj.id+"_"+id)
					.classed("selected",true);
			for(var i in obj.data.data) {
				if(obj.data.data[i].i==i) { //shows the caption of the datapoint selected (it has to search for it, because the data might be sorted)
					obj.map.tooltip.html(caption_text(obj.data.data[i]));
					break;
				}
			}
		}
	}

	d3VizObj.addHook("run_on_each_data_row",this.processData);
	d3VizObj.addHook("run_after_data_and_map_loaded",this.showData);
	d3VizObj.is_loaded(obj);
}
dataCircles.prototype = new d3Viz(dataCircles);

if(window.debug) console.log("dataCircles script loaded");
//load data_choropleth.js
/* SVG CHOROPLETH - by Alex Wellerstein, v2.0 

This allows you to assign colors to map path objects. The TopoJSON map file must have a field in it
that corresponds with a county or country or whatever. So the worldmap-50m.json file has an "id" field
for each country which corresponds to the ISO 3166-1 numerica country code (http://en.wikipedia.org/wiki/ISO_3166-1). 
The us.counties.json file maps US counties and states based on FIPS codes (http://en.wikipedia.org/wiki/FIPS_county_code). Note that the first two numbers of a county FIPS code is its state FIPS code.

The shared.js file has functions for converting country names to ISO codes (and vice versa) and state/counties to FIPS (and vice versa)


*/

function SVGChoropleth(options) {
	if(typeof options.load!="undefined" && options.load == false) return false; //aborted
	var obj = this;
	obj.loadOptions(options);
	this.type = "viz";
	d3VizObj.viz.push(obj); obj.id = d3VizObj.viz.length-1;
	obj.index = []; //ids to data
	obj.index2 = []; 

	/*if(typeof obj.color_target == "undefined") obj.color_target = "fill";
	if(typeof obj.caption_id == "undefined") obj.caption_id = "tooltip";
	if(typeof obj.target_mode == " undefined") obj.target_mode = "id";*/

	obj.color_target = setdefault(obj.color_target,"fill");
	obj.caption_id = setdefault(obj.caption_id,"tooltip");
	obj.target_mode = setdefault(obj.target_mode,"id");

	obj.each_once_fired = false;

	this.showData = function() {
		if(debug||obj.debug) console.log("Initiating choropleth on dataset "+obj.data.id);
		for(var d in obj.data.data) { //parse over data	
			if(typeof obj.id_field =="function") {
				var dd = obj.id_field(obj.data.data[d]);
			} else {
				var dd = obj.data.data[d][obj.id_field];
			}
			if(Array.isArray(dd)) {
				for(var i in dd) {
					var ddd = dd[i];
					obj.index[ddd] = d;
					d3.select("#"+d)
						.datum(function(dd) { //add the new data to the existing geoJSON data -- we hide it away so it doesn't conflict with existing data
							dd._boundData = obj.data.data[d];
							return dd;
						})
						.style(obj.color_target,obj.color_scale(obj.color_field(obj.data.data[d],ddd))) //make it the right color
						.each(function(x,i) {
							if(typeof obj.each_once == "function" && obj.each_once_fired == false) {
								obj.each_once(x._boundData,i,this,d3.select(this).datum());
							}
							if(typeof obj.each == "function") {
								obj.each(x._boundData,i,this,d3.select(this).datum());
							}
						})
						.on("mouseover", function(d){ obj.choroMouseover(d,this) })  //what to do when the mouse goes over
						.on("mousemove", function(d){ obj.choroMousemove(d,this) })  //what to do when the mouse goes over
						.on("mouseout",  function(d){ obj.choroMouseout(d,this); }) //what to do when the mouse is no longer over it
						.on("click", function(d) { obj.choroMouseclick(d,this); }); //what to do if clicked
						; 
				}
			} else {
				obj.index[dd] = d;
				if(obj.target_mode == "class") {
					var d_target = "."+dd;
				} else {
					var d_target = "#"+dd;
				}
				d3.selectAll(d_target) 
					.datum(function(dd) { //add the new data to the existing geoJSON data
						dd._boundData = obj.data.data[d];
						return dd;
					}) 
					.style(obj.color_target,obj.color_scale(obj.color_field(obj.data.data[d],dd))) //make it the right color
					.each(function(d,i) {
						if(typeof obj.each_once == "function" && obj.each_once_fired == false) {
							obj.each_once(d._boundData,i,this,d3.select(this).datum());
						}
						if(typeof obj.each == "function") {
							obj.each(d._boundData,i,this, d3.select(this).datum());
						}
					})
					.on("mouseover", function(d){ obj.choroMouseover(d,this) })  //what to do when the mouse goes over
					.on("mousemove", function(d){ obj.choroMousemove(d,this) })  //what to do when the mouse goes over
					.on("mouseout",  function(d){ obj.choroMouseout(d,this); }) //what to do when the mouse is no longer over it
					.on("click", function(d) { obj.choroMouseclick(d,this); }); //what to do if clicked
					; 
			}
		}
		this.each_once_fired = true; //signal we've run this whole function once
		if(typeof obj.loaded == "function"){
			obj.loaded();
		}
	}
	this.choroMouseover = function(d,shape) {
		if(typeof obj.mouseover_caption == "function") {
			var shape_id = d3.select(shape).attr("id");
			d3.select("#"+obj.caption_id).html(obj.mouseover_caption(obj.data.data[obj.index[shape_id]],d,shape));
		} else if(obj.mouseover_caption) {
			d3.select("#"+obj.caption_id).html(obj.mouseover_caption);
		}
		if(typeof obj.mouseover == "function") {
			var shape_id = d3.select(shape).attr("id");
			obj.mouseover(obj.data.data[obj.index[shape_id]],d,shape);
		}	
	}
	this.choroMousemove = function(d,shape) {
		if(typeof obj.mousemove == "function") {
			var shape_id = d3.select(shape).attr("id");
			obj.mousemove(obj.data.data[obj.index[shape_id]],d,shape);
		}
	}
	this.choroMouseout = function(d,shape) {
		if(typeof obj.mouseover_caption == "function") {
			d3.select("#"+obj.caption_id).html("");
		}
		if(typeof obj.mouseout == "function") {
			obj.mouseout(shape);
		}
	}
	this.choroMouseclick = function(d,shape) {
		if(typeof obj.mouseclick == "function") {
			var shape_id = d3.select(shape).attr("id");
			obj.mouseclick(obj.data.data[obj.index[shape_id]],d,shape);
		}	
	}
	d3VizObj.addHook("run_after_data_and_map_loaded",this.showData);
	d3VizObj.is_loaded(obj);
}
SVGChoropleth.prototype = new d3Viz(SVGChoropleth);
if(window.debug) console.log("SVGChoropleth script loaded");
//load data_timeline.js
/* Timeline support — allows you to have an animated timeline of events, coded by date or time v.2.0

*/


function Timeline(options) {
	var obj = this;
	obj.loadOptions(options);

	this.type = "control";

	d3VizObj.controls.push(obj); obj.id = d3VizObj.controls.length-1;

	this.currentDate = this.stopDate;
	this.lastDate = [];
	this.index = [];
	
	if(typeof this.use_index == "undefined") this.use_index = true;

	if(typeof this.debug == "undefined") this.debug == false;

	if(typeof this.default_speed == "undefined") {
		this.timer_tick = 300; //default timer tick (300 ms)
	} else {
		this.timer_tick = this.default_speed;
	}

	if(typeof this.data_prefix == "undefined") this.data_prefix = "d";

	if(this.actOn) {
		this.data_id_prefix = this.data_prefix+"_"+this.actOn.id+"_"; //this is how it finds ids — shouldn't need to be changed if you use this template	
	} else {
		this.data_id_prefix = this.data_prefix+"d_"+obj.id+"_"; //this is how it finds ids — shouldn't need to be changed if you use this template	
	}


	this.timer_paused = false;
	this.timer_playing = false;
	this.timer = false;
	
	if(typeof this.date_past_class == "undefined") this.date_past_class = "data_date_past";
	if(typeof this.date_future_class == "undefined") this.date_future_class = "data_date_future";
	if(typeof this.date_now_class == "undefined") this.date_now_class = "data_date_now";
	
	//create the datetime objects
	this.dateObj = new DateTimeArray();
	this.dateObjStopCompare = DateArrayToNumber(this.stopDate);

	this.addSlider = function() {
		obj.slider_index = [];
		var dob = new DateTimeArray();
		dob.setDateTime(obj.startDate);
		while(DateArrayToNumber(dob.getDateTime())<=DateArrayToNumber(obj.stopDate)) {
			obj.slider_index.push(DateArrayToNumber(dob.getDateTime()));
			dob.addDateTime(obj.dateTick);
		}
		var d = document.createElement("input");
		d.type = "range";
		d.min = 0;
		d.max = obj.slider_index.length-1;
		d.step = 1;
		d.value = obj.slider_index.length-1;
		d.id = "timeline_"+obj.id+"_slider";
		d.className = "timeline_slider";
		d.onchange = obj.timelineSliderChange;			
		document.getElementById(obj.sliderAttachId).appendChild(d); //add it to the document
	}
	if(obj.sliderAttachId) d3VizObj.addHook("run_before_map_loaded",this.addSlider);
	
	//this function creates an array, this.index, that contains all of the data ids coded to their location in the timeline
	//the precision of the index is inferred from the dateInfo option
	this.makeIndex = function () {
		//get the precision of the date change
		for(x = obj.dateTick.length-1; x>=0; x--)  {
			if(obj.dateTick[x]!=0) {
				obj.date_precision = x;
			}
		}

		if(typeof obj.dateInfo=="undefined") {
			obj.index = []; //no index -- only used if this is not how data is being parsed
		} else {
			//set up a function to iterate over the date, grab its information
			d3VizObj.addHook("run_on_each_data_row",
				function(r,i) {
					r.d.timerDate = obj.dateInfo(r.d,i);
					var tindex = "";
					for(var x=0;x<=obj.date_precision;x++) {
						tindex+=r.d.timerDate[x];
						if(x<obj.date_precision) tindex+="-";
					}
					if(typeof obj.index[tindex] == "undefined") {
						obj.index[tindex] = [];
					}
					obj.index[tindex].push(r.d.i);
				}
			);
		}	
	}
	if(this.use_index) this.makeIndex();

	this.addPlaybackInterface = function() {
		var anim = document.getElementById(obj.animatorAttachId);
		//this is crap -- will improve later
		var d = document.createElement("div");
		d.id = "timeline_anim_"+obj.id;
		d.className = "timeline_anim";
		var da = document.createElement("a");
		da.href = "#";
		da.title = "Start animation";
		da.onclick = function() { obj.startTimer();};
		var aT = document.createTextNode("\u25B6");
		da.appendChild(aT);
		d.appendChild(da);
		var aT = document.createTextNode(" "); d.appendChild(aT);
		var da = document.createElement("a");
		da.href = "#";
		da.title = "Pause animation";
		da.onclick = function() { obj.pauseTimer();};
		var aT = document.createTextNode("\u275A\u275A");
		da.appendChild(aT);
		d.appendChild(da);
		var aT = document.createTextNode(" "); d.appendChild(aT);

		if(typeof obj.speeds == "undefined") {
			var speeds = [1,100,200,300,500,1000];
		} else {
			var speeds = obj.speeds;
		}
		if(speeds.length>1) {
			var da = document.createElement("select");
			da.onchange = function() { obj.timeSpeedChange(this.value); };
			da.title = "Animation speed (ms)";
			for(s in speeds) {
				var dao = document.createElement("option");
				dao.text = speeds[s];
				dao.value = speeds[s];
				if(speeds[s]==obj.timer_tick) dao.selected = true;
				da.appendChild(dao);
			}
			d.appendChild(da);
			var aT = document.createTextNode(" "); d.appendChild(aT);
		}
		if(typeof obj.reset =="undefined") {
			var da = document.createElement("a");
			da.href = "#";
			da.title = "Reset all data";
			da.onclick = function() { obj.timeShowAll();};
			var aT = document.createTextNode("Reset");
			da.appendChild(aT);
		} else {
			if(obj.reset==true) {
				var da = document.createElement("a");
				da.href = "#";
				da.title = "Reset all data";
				da.onclick = function() { obj.timeShowAll();};
				var aT = document.createTextNode("Reset");
				da.appendChild(aT);				
			}
		}
		d.appendChild(da);
		anim.appendChild(d);
	};
	if(obj.animatorAttachId) d3VizObj.addHook("run_before_map_loaded",this.addPlaybackInterface);

	//shows the data for a given year
	this.dataDateTick = function() {
		var curDate = obj.dateObj.getDateTime();

		if((debug&&debug_verbose)||obj.debug) console.log("Timeline showing date for "+obj.dateObj.formatDate());

		var tindex = "";
		tindex+=curDate[0];
		if(obj.date_precision>0) tindex+="-"+curDate[1];
		if(obj.date_precision>1) tindex+="-"+curDate[2];
		if(obj.date_precision>2) tindex+="-"+curDate[3];
		if(obj.date_precision>3) tindex+="-"+curDate[4];
		if(obj.date_precision>4) tindex+="-"+curDate[5];

		//tag dates that are in the past
		if(obj.lastDate.length) {
			for(var i in obj.lastDate) {
				 obj.map.svg.selectAll("#"+obj.data_id_prefix+obj.lastDate[i])
					.classed("data_date_past",true)
					.classed("data_date_now",false)
			}	
		}
	
		if(typeof obj.index[tindex]!=="undefined") {
			if(obj.index[tindex].length) {
				for(var i in obj.index[tindex]) {
					//change to now
					 obj.map.svg.selectAll("#"+obj.data_id_prefix+obj.index[tindex][i])
						.classed("data_date_now",true)
						.classed("data_date_future",false);
				}
				obj.lastDate = obj.index[tindex]; 
			}
		}
		//move the slider, if it exists
		if(obj.sliderAttachId) {
			document.getElementById("timeline_"+obj.id+"_slider").value = obj.slider_index.indexOf(obj.dateObj.compareDate());
		}
		//run onDateTick function on data if desired
		if(typeof obj.onDateTick =="function") {
			obj.onDateTick(obj.currentDate);
		}
	}

	this.startTimer = function() {
		if(!obj.timer_playing) {
			if(debug||obj.debug) console.log("Timeline timer started ("+obj.timer_tick+")");
			obj.timer_playing = true;
			obj.currentDate = obj.startDate; //reset the timer
			obj.dateObj.setDateTime(obj.currentDate);
			if(typeof obj.svgElement !=="undefined") {
				obj.map.svg.selectAll(obj.svgElement) //reset all date classes
					.classed(obj.date_future_class,true)
					.classed(obj.date_past_class,false)
					.classed(obj.date_now_class,false)
			}
			obj.dataDateTick(); //display the data for the current time
			obj.timer = setInterval(obj.nextTime,obj.timer_tick); //start timer
			obj.timer_paused = false;
			//move the slider, if it exists
			if(obj.sliderAttachId) document.getElementById("timeline_"+obj.id+"_slider").value = obj.slider_index.indexOf(obj.dateObj.compareDate());
		} else {
			if(obj.timer_paused) { //if it's paused
				if(obj.sliderAttachId) {
					obj.dateObj.currentDate = NumberToDateArray(obj.slider_index[document.getElementById("timeline_"+obj.id+"_slider").value]);
					obj.dataDateTick(); //display the data for the current time
				}
				obj.timer_paused = false; //unpause
				obj.timer = setInterval(obj.nextTime,obj.timer_tick); //start timer
			}
		}	
	}

	this.pauseTimer = function() {
		if(obj.timer_playing) {
			if(obj.timer_paused) { //if it's already paused
				if(debug||obj.debug) console.log("Timeline unpaused");
				obj.timer_paused = false; //unpause
				obj.timer = setInterval(obj.nextTime,obj.timer_tick);
			} else {
				if(debug||obj.debug) console.log("Timeline paused");
				if(obj.timer) { //if a timer exists
					clearInterval(obj.timer); //stop the timer ticking
					obj.timer_paused = true; //indicate it is paused
				}
			}
		}
	}

	//function that is called every time tick interval
	this.nextTime = function() {
		if((debug_verbose&&debug)||obj.debug) console.log("Timeline tick for dataset "+obj.id+" ("+obj.datObj.formatDate()+")");

		//we can use the Date/Time object to generate very large numbers that will allow comparisons between dates
		var compareNow  = obj.dateObj.compareDate();
		var compareStop = obj.dateObjStopCompare;

		if(compareNow >= compareStop) { //is now equal or greater to the end? 
			if((debug_verbose&&debug)||obj.debug) console.log("Timeline has finished"); 
			clearInterval(obj.timer); //if the current time is greater or equal to the stop time, we stop ticking
			obj.timer_playing = false;
			if(obj.loop) {
				if(typeof obj.on_loop == "function") {
					obj.on_loop();
				} else {
					obj.startTimer(); //loop?
				}
			}
		} else { //otherwise, advance the date one tick
			obj.dateObj.addDateTime(obj.dateTick);
			obj.currentDate = obj.dateObj.getDateTime();		
			obj.dataDateTick(); //register the new tick
		}
	}

	//updates the timer speed, pauses and unpauses
	this.timeSpeedChange = function(newTime) {
		if(debug||obj.debug) console.log("Timeline speed changed to "+newTime);
		obj.timer_tick = newTime; //set the new time
		obj.pauseTimer(); //pause it once
		obj.pauseTimer(); //then unpause it
	}


	//resets the timer situation, showing all the data
	this.timeShowAll = function() {
		if(debug||obj.debug) console.log("Timeline showing all data");
		obj.timer_playing=false;
		if(obj.timer) clearInterval(obj.timer);
		obj.timer_paused = false;
		obj.dateObj.setDateTime(obj.stopDate);
		if(typeof obj.svgElement !=="undefined") {
			obj.map.svg.selectAll(obj.svgElement) //clear all classes
				.classed(obj.data_future_class,false)
				.classed(obj.data_now_class,false)
				.classed(obj.data_past_class,false)
			;
		}
		//move the slider, if it exists
		if(obj.sliderAttachId) document.getElementById("timeline_"+obj.id+"_slider").value = obj.slider_index.indexOf(obj.dateObj.compareDate());
	}

	this.setTime = function(val) { //val should be a time string 
		if(Array.isArray(val)) {
			val = DateArrayToNumber(val);
		}
		if(debug||obj.debug) console.log("Setting view to match "+val+"...");
			obj.currentDate = NumberToDateArray(val);
			obj.dateObj.setDateTime(obj.currentDate);
			if(typeof obj.svgElement !=="undefined") {
				if(d3.select(obj.svgElement)[0][0]!==null) {
					d3.selectAll(obj.svgElement) //reset all date classes
						.classed(obj.date_future_class,true)
						.classed(obj.date_past_class,false)
						.classed(obj.date_now_class,false)

				}
			}
			obj.dataDateTick();

			//this is kind of lame but I don't know a better way — looks at all entries in the
			//timelineindex, sees how they compare to the current setting. In theory you could
			//optimize this, if Javascripts indexing order was reliable, but it is not.
			var current = obj.dateObj.compareDate();
			if(obj.index.length>0) {
				for(var x in obj.index) {
					var indexdate = (DateArrayToNumber(x.split("-")));
					if(indexdate<current) {
						for(var i in obj.index[x]) {
								console.log("#"+obj.data_id_prefix+obj.index[x][i]);
							 d3.selectAll("#"+obj.data_id_prefix+obj.index[x][i])
								.classed(obj.date_past_class,true)
								.classed(obj.date_future_class,false)
						}
					} else if(indexdate==current) {
						for(var i in obj.index[x]) {
							d3.selectAll("#"+obj.data_id_prefix+obj.index[x][i])
								.classed(obj.date_now_class,true)
								.classed(obj.date_future_class,false)
						}
					}
				}
			}
		if(debug||obj.debug) console.log("View is set");	
	
	}

	//updates based on the slider changing
	this.timelineSliderChange = function() {
		if(obj.timer_playing) {
			if(!obj.timer_paused) {
				obj.pauseTimer();
			}
		}
	
		obj.timer_playing = true;
		obj.timer_paused = true;

		var val = obj.slider_index[document.getElementById("timeline_"+obj.id+"_slider").value];
	
		obj.setTime(val);
	}
	if(window.debug||obj.debug) console.log("Timeline initialized");
}
Timeline.prototype = new d3Viz(Timeline);


//version of the compareDate function below that can be run on arbitrary, unvalidated arrays
function DateArrayToNumber(arr) {
	var cd = "";
	cd+= arr[0]?String("0000"+arr[0]).slice(-4):"0000";
	cd+= arr[1]?String("00"+arr[1]).slice(-2):"00";
	cd+= arr[2]?String("00"+arr[2]).slice(-2):"00";
	cd+= arr[3]?String("00"+arr[3]).slice(-2):"00";
	cd+= arr[4]?String("00"+arr[4]).slice(-2):"00";
	cd+= arr[5]?String("00"+arr[5]).slice(-2):"00";
	return +cd;
}

//opposite of the function above — takes one of those long numbers and turns it into a date
function NumberToDateArray(num) {
	var c = [];
	num = String("00000000000000"+num).slice(-14);
	c.push(+num.slice(0,4));//year
	c.push(+num.slice(4,6));//month
	c.push(+num.slice(6,8));//day
	c.push(+num.slice(8,10));//hour
	c.push(+num.slice(10,12));//min
	c.push(+num.slice(12,14));//sec
	return c;
}

//An array-based date/time object. Ignores time zones and daylight savings. Useful only in very specific contexts,
//like this template, where the time zone aspects of the Javascript Date() object become too much of a pain in the neck.
//This stores dates and times as an array of increasing specificity, i.e. [year,month,day,hour,minute,second]
//Note: it uses 24 hour format (so 00 to 23), and months are by their common numbering (1 = January). 
//By Alex Wellerstein.

function DateTimeArray() {
	var dateTime = [1,2,3];
	this.setDateTime = function(init) {
		dateTime = [];
		if(!init.length) return false;
		dateTime[0] = init[0]; //year
		dateTime[1] = (init.length>1)?init[1]:1; //month
		dateTime[2] = (init.length>2)?init[2]:1; //day
		dateTime[3] = (init.length>3)?init[3]:0; //hour
		dateTime[4] = (init.length>4)?init[4]:0; //minute
		dateTime[5] = (init.length>5)?init[5]:0; //second
		validate();
	}
	
	//adds an array date to the current date. so if the array date added is [0,0,1] it would add one day.
	//if it was [1,0,0] it would add one year. 
	this.addDateTime = function (arr) {
		for(var i = arr.length-1; i>=0; i--) {
			dateTime[i]+=arr[i];
		}
		validate();
	}

	//accessor for the array at its core
	this.getDateTime = function () {
		return dateTime;
	}
	
	//validates a date -- e.g. shifts it around until it is valid
	//currently only counts UP
	function validate() {
		if(typeof dateTime == "undefined") return false;
		if(!dateTime.length) return false;
		//check if too big
		if(dateTime[5]>59) adjustUp(5,59); //second
		if(dateTime[4]>59) adjustUp(4,59); //minute
		if(dateTime[3]>23) adjustUp(3,23); //hour
		if(dateTime[2]>monthMax(dateTime[1],dateTime[0])) adjustUp(2,monthMax(dateTime[1],dateTime[0])-1); //day
		if(dateTime[1]>12) adjustUp(1,11); //month
		//check if too small
		if(dateTime[5]<0) adjustDown(5,0,59); //second
		if(dateTime[4]<0) adjustDown(4,0,59); //minute
		if(dateTime[3]<0) adjustDown(3,0,23); //hour
		if(dateTime[2]<1) adjustDown(2,1,monthMax(dateTime[1]-1,dateTime[0])); //day
		if(dateTime[1]<1) adjustDown(1,1,12); //month
	}
	
	//gets the max days of a month, accounts for leap years
	function monthMax(month,year) {
		while (month<1) month = 12+month;
		switch(month) {
			case 1: case 3: case 5: case 7: case 8: case 10: case 12:
				return 31; break;
			case 4: case 6: case 9: case 11:
				return 30; break;
			case 2: //february, always being a pill
				if(year % 4 !== 0) {
					return 28;
				} else if( year % 100!== 0) {
					return 29;
				} else if( year % 400!== 0) {
					return 28;
				} else {
					return 29;
				}
			break;
		}
	}
	
	//internal adjusters
	function adjustUp(index,max) {
		while(dateTime[index]>max) {
			dateTime[index]-=max+1;
			dateTime[index-1]++;
		}
	}
	function adjustDown(index,min,max) {
		while(dateTime[index]<min) {
			dateTime[index-1]-=1;
			dateTime[index]+=max;
		}
	}
	
	//returns a big number that corresponds with the date info — allows comparisons
	this.compareDate = function() {
		var cd = dateTime[0];
		for(var i = 1; i<dateTime.length;i++) {
			cd+=String("00"+dateTime[i]).slice(-2);
		}
		return +cd;
	}
	
	//outputs an iso8601 formatted date (which can be read by Javascript's Date() object)
	this.formatDate = function() {
		if(typeof dateTime == "undefined") return false;
		if(!dateTime.length) return false;
		var dl = dateTime.length;
		var iso8601 = "";
		iso8601+=dateTime[0]; //year
		if(dl>1) iso8601+="-"+String("00"+Math.max(1,dateTime[1])).slice(-2); //month
		if(dl>2) iso8601+="-"+String("00"+Math.max(1,dateTime[2])).slice(-2); //day
		if(dl>3) iso8601+="T"+String("00"+dateTime[3]).slice(-2); //hour
		if(dl>4) iso8601+=":"+String("00"+dateTime[4]).slice(-2); //min
		return iso8601;
	}
}

if(window.debug) console.log("Timeline script loaded");
//load data_heatmap.js
/* Heatmap - by Alex Wellerstein, v2.0 

This data mode is for displaying data that can be plotted with latitude and longitude pairs. These will be represented by
circles ("dots") on the map. Their radius and color can be separately set based on either fixed values, or dynamically
according to rows in the dataset. Putting the mouse over a datapoint can trigger a tooltip event.

*/


function SVGHeatmap(options) {
	var obj = this;
	obj.loadOptions(options);
	this.type = "viz";
	d3VizObj.viz.push(obj); obj.id = d3VizObj.viz.length-1;

	//heatmap display settings (defaults)
	this.heatmapMaxDefault = 9500; 
	this.heatmapMinDefault = 0; 
	this.heatmapRadiusDefault = 16; 
	this.heatmapGradientDefault = { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"}; 
	this.heatmapBlurDefault = .85; 

	//objects to be used
	var heatmapInstance = Array();
	var heatmapPoints = Array();
	var heatmapCanvas;
	var heatmapOptions = Array();
	var heatmapLat = Array();
	var heatmapLon = Array();
	var heatmapVal = Array(); 
	var heatmapMax = Array();
	var heatmapMin = Array();
	var heatmapRadius = Array(); 

	if(typeof obj.max =="undefined") obj.max = this.heatmapMaxDefault;
	if(typeof obj.min =="undefined") obj.min = this.heatmapMinDefault;
	if(typeof obj.radius =="undefined") obj.radius = this.heatmapRadiusDefault;
	if(typeof obj.gradient == "undefined") obj.gradient = this.heatmapGradientDefault;
	if(typeof obj.blur == "undefined") obj.blur = this.heatmapBlurDefault;

	this.points = [];

	if(window.debug||obj.debug) console.log("Initializing a heatmap for dataset "+obj.data.id);

	//makes sure we have position data, creates the points database
	this.ProcessData = function(r) {
		if(r.obj.id==obj.data.id) {

			if(!r.d.positions) { //we may have already calculated these...
				//pick out the lat/lon fields
				var lat = (r.obj.latLon(r.d)[0]);
				var lon = (r.obj.latLon(r.d)[1]);

				//check if the lat/lon are valid
				if(isNaN(lat)||isNaN(lon)) {
					if(debug) console.log("Ignored row "+r.i+" because lat or lon were not a number ("+lat+","+lon+")");
					r.d = ""; //ignore the data row
				} else {
					r.d.positions = obj.map.projection([lon,lat]); //create the pixel positions and add them to the data object 
					if(debug&&debug_verbose) console.log("Adding data for row "+r.i+" at "+lat+", "+lon);
				}
			}
			if(typeof r.d.positions!="undefined") {
				var point = {
					x: r.d.positions[0],
					y: r.d.positions[1],
					value: obj.val(r.d),
				}
				obj.points.push(point);
			}
		}
	}

	//function that initializes the heatmap once data is loaded
	this.showData = function(r) {
		if(debug||obj.debug) console.log("Adding heatmap layer for dataset "+obj.data.id);
		//create a heatmap div
		var div = document.createElement("div");
		div.id = "heatmap_"+obj.id;
		div.className = "heatmap";
		div.width = map.width;
		div.height = map.height;
		div.style.visibility = "hidden"; //we hide this!
		div.style.position = "absolute !important"; 
		div.style.top = 0;
		div.style.left = 0;
		div.style.right = 0;
		div.style.bottom=  0;
		div.style.pointerEvents = "none"; //this div should not be clickable
		document.body.appendChild(div); //add it to the body
	
		if(d3.select('#heatmap-canvas_heatmap_'+obj.id)[0][0]!==null) {
			d3.select('#heatmap-canvas_heatmap_'+obj.id).remove();
		};

		obj.instance = h337.create({
		  radius: obj.radius,
		  container: document.getElementById('heatmap_'+obj.id),
		  gradient: obj.gradient,
		  blur: obj.blur,
		});

		//render the image from data
		obj.heatmapData = { 
		  max: obj.max,
		  min: obj.min, 
		  data: obj.points,
		};
		obj.instance.setData(obj.heatmapData);
		obj.loadHeatmapImage(); //add image to map	
	}

	this.loadHeatmapImage = function() {
		if(debug||obj.debug) console.log("Loading heatmap image to map for dataset "+obj.data.id);
	
		//OK, our heatmap is created, but still hidden

		//get the canvas element of the hidden div
		obj.canvas = document.getElementById('heatmap-canvas_heatmap_'+obj.id);
		obj.context = obj.canvas.getContext('2d');

		//get the image data from it
		obj.imgURL = obj.canvas.toDataURL(); 

		//add the image data to the SVG stage as an image, so it will scale with everything else

		if(d3.select('#heatmapSVG_'+obj.id)[0][0] == null) {
			obj.map.stage.append("svg:image")
				.attr('id','heatmapSVG_'+obj.id)
				.attr('class','heatmapSVG')
				.attr('x',0)
				.attr('y',0)
				.attr('width', obj.canvas.width)
				.attr('height', obj.canvas.height)
				.attr("xlink:href",obj.imgURL)
				;
		} else {
			d3.select('#heatmapSVG_'+obj.id)
				.attr('width', obj.canvas.width)
				.attr('height', obj.canvas.height)
				.attr("xlink:href",obj.imgURL)
				;
		}
	
		//and we're done!
		if(debug) console.log("Heatmap created");		
	}
	
	this.reload = function () {
	
		d3.select('#heatmap-canvas_heatmap_'+heatmap.id).remove(); //delete the old heatmap canvas element 
		
		obj.instance = h337.create({
		  radius: obj.radius,
		  container: document.getElementById('heatmap_'+obj.id),
		  gradient: obj.gradient,
		  blur: obj.blur,
		});

		//render the image from data
		obj.heatmapData = { 
		  max: obj.max,
		  min: obj.min, 
		  data: obj.points,
		};
		
		obj.instance.setData(obj.heatmapData);

		obj.loadHeatmapImage(); //add image to map	
	}
	
	d3VizObj.is_loaded(obj);
	d3VizObj.addHook("run_on_each_data_row",this.ProcessData);
	d3VizObj.addHook("run_after_data_and_map_loaded",this.showData);
}
SVGHeatmap.prototype = new d3Viz(SVGHeatmap);
if(window.debug) console.log("SVGHeatmap script loaded");


/* below is from heatmap.js */

/*
 * heatmap.js v2.0.0 | JavaScript Heatmap Library
 *
 * Copyright 2008-2014 Patrick Wied <heatmapjs@patrick-wied.at> - All rights reserved.
 * Dual licensed under MIT and Beerware license 
 *
 * :: 2014-10-31 21:16
 */
;(function (name, context, factory) {

  // Supports UMD. AMD, CommonJS/Node.js and browser context
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define(factory);
  } else {
    context[name] = factory();
  }

})("h337", this, function () {

// Heatmap Config stores default values and will be merged with instance config
var HeatmapConfig = {
  defaultRadius: 40,
  defaultRenderer: 'canvas2d',
  defaultGradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
  defaultMaxOpacity: 1,
  defaultMinOpacity: 0,
  defaultBlur: .85,
  defaultXField: 'x',
  defaultYField: 'y',
  defaultValueField: 'value', 
  plugins: {}
};
var Store = (function StoreClosure() {

  var Store = function Store(config) {
    this._coordinator = {};
    this._data = [];
    this._radi = [];
    this._min = 0;
    this._max = 1;
    this._xField = config['xField'] || config.defaultXField;
    this._yField = config['yField'] || config.defaultYField;
    this._valueField = config['valueField'] || config.defaultValueField;

    if (config["radius"]) {
      this._cfgRadius = config["radius"];
    }
  };

  var defaultRadius = HeatmapConfig.defaultRadius;

  Store.prototype = {
    // when forceRender = false -> called from setData, omits renderall event
    _organiseData: function(dataPoint, forceRender) {
        var x = dataPoint[this._xField];
        var y = dataPoint[this._yField];
        var radi = this._radi;
        var store = this._data;
        var max = this._max;
        var min = this._min;
        var value = dataPoint[this._valueField] || 1;
        var radius = dataPoint.radius || this._cfgRadius || defaultRadius;

        if (!store[x]) {
          store[x] = [];
          radi[x] = [];
        }

        if (!store[x][y]) {
          store[x][y] = value;
          radi[x][y] = radius;
        } else {
          store[x][y] += value;
        }

        if (store[x][y] > max) {
          if (!forceRender) {
            this._max = store[x][y];
          } else {
            this.setDataMax(store[x][y]);
          }
          return false;
        } else{
          return { 
            x: x, 
            y: y,
            value: value, 
            radius: radius,
            min: min,
            max: max 
          };
        }
    },
    _unOrganizeData: function() {
      var unorganizedData = [];
      var data = this._data;
      var radi = this._radi;

      for (var x in data) {
        for (var y in data[x]) {

          unorganizedData.push({
            x: x,
            y: y,
            radius: radi[x][y],
            value: data[x][y]
          });

        }
      }
      return {
        min: this._min,
        max: this._max,
        data: unorganizedData
      };
    },
    _onExtremaChange: function() {
      this._coordinator.emit('extremachange', {
        min: this._min,
        max: this._max
      });
    },
    addData: function() {
      if (arguments[0].length > 0) {
        var dataArr = arguments[0];
        var dataLen = dataArr.length;
        while (dataLen--) {
          this.addData.call(this, dataArr[dataLen]);
        }
      } else {
        // add to store  
        var organisedEntry = this._organiseData(arguments[0], true);
        if (organisedEntry) {
          this._coordinator.emit('renderpartial', {
            min: this._min,
            max: this._max,
            data: [organisedEntry]
          });
        }
      }
      return this;
    },
    setData: function(data) {
      var dataPoints = data.data;
      var pointsLen = dataPoints.length;
      if(typeof data.gradient!="undefined" && data.gradient) {
      	this.config.gradient = data.gradient;
      }

      // reset data arrays
      this._data = [];
      this._radi = [];

      for(var i = 0; i < pointsLen; i++) {
        this._organiseData(dataPoints[i], false);
      }
      this._max = data.max;
      this._min = data.min || 0;
      
      this._onExtremaChange();
      this._coordinator.emit('renderall', this._getInternalData());
      return this;
    },
    removeData: function() {
      // TODO: implement
    },
    setDataMax: function(max) {
      this._max = max;
      this._onExtremaChange();
      this._coordinator.emit('renderall', this._getInternalData());
      return this;
    },
    setDataMin: function(min) {
      this._min = min;
      this._onExtremaChange();
      this._coordinator.emit('renderall', this._getInternalData());
      return this;
    },
    setCoordinator: function(coordinator) {
      this._coordinator = coordinator;
    },
    _getInternalData: function() {
      return { 
        max: this._max,
        min: this._min, 
        data: this._data,
        radi: this._radi 
      };
    },
    getData: function() {
      return this._unOrganizeData();
    }/*,

      TODO: rethink.

    getValueAt: function(point) {
      var value;
      var radius = 100;
      var x = point.x;
      var y = point.y;
      var data = this._data;

      if (data[x] && data[x][y]) {
        return data[x][y];
      } else {
        var values = [];
        // radial search for datapoints based on default radius
        for(var distance = 1; distance < radius; distance++) {
          var neighbors = distance * 2 +1;
          var startX = x - distance;
          var startY = y - distance;

          for(var i = 0; i < neighbors; i++) {
            for (var o = 0; o < neighbors; o++) {
              if ((i == 0 || i == neighbors-1) || (o == 0 || o == neighbors-1)) {
                if (data[startY+i] && data[startY+i][startX+o]) {
                  values.push(data[startY+i][startX+o]);
                }
              } else {
                continue;
              } 
            }
          }
        }
        if (values.length > 0) {
          return Math.max.apply(Math, values);
        }
      }
      return false;
    }*/
  };


  return Store;
})();

var Canvas2dRenderer = (function Canvas2dRendererClosure() {
  
  var _getColorPalette = function(config) {
    var gradientConfig = config.gradient || config.defaultGradient;
    var paletteCanvas = document.createElement('canvas');
    var paletteCtx = paletteCanvas.getContext('2d');

    paletteCanvas.width = 256;
    paletteCanvas.height = 1;

    var gradient = paletteCtx.createLinearGradient(0, 0, 256, 1);
    for (var key in gradientConfig) {
      gradient.addColorStop(key, gradientConfig[key]);
    }

    paletteCtx.fillStyle = gradient;
    paletteCtx.fillRect(0, 0, 256, 1);

    return paletteCtx.getImageData(0, 0, 256, 1).data;
  };

  var _getPointTemplate = function(radius, blurFactor) {
    var tplCanvas = document.createElement('canvas');
    var tplCtx = tplCanvas.getContext('2d');
    var x = radius;
    var y = radius;
    tplCanvas.width = tplCanvas.height = radius*2;

    if (blurFactor == 1) {
      tplCtx.beginPath();
      tplCtx.arc(x, y, radius, 0, 2 * Math.PI, false);
      tplCtx.fillStyle = 'rgba(0,0,0,1)';
      tplCtx.fill();
    } else {
      var gradient = tplCtx.createRadialGradient(x, y, radius*blurFactor, x, y, radius);
      gradient.addColorStop(0, 'rgba(0,0,0,1)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      tplCtx.fillStyle = gradient;
      tplCtx.fillRect(0, 0, 2*radius, 2*radius);
    }
    
    

    return tplCanvas;
  };

  var _prepareData = function(data) {
    var renderData = [];
    var min = data.min;
    var max = data.max;
    var radi = data.radi;
    var data = data.data;
    
    var xValues = Object.keys(data);
    var xValuesLen = xValues.length;

    while(xValuesLen--) {
      var xValue = xValues[xValuesLen];
      var yValues = Object.keys(data[xValue]);
      var yValuesLen = yValues.length;
      while(yValuesLen--) {
        var yValue = yValues[yValuesLen];
        var value = data[xValue][yValue];
        var radius = radi[xValue][yValue];
        renderData.push({
          x: xValue,
          y: yValue,
          value: value,
          radius: radius
        });
      }
    }

    return {
      min: min,
      max: max,
      data: renderData
    };
  };


  function Canvas2dRenderer(config) {
    var container = config.container;
    var shadowCanvas = this.shadowCanvas = document.createElement('canvas');
    var canvas = this.canvas = config.canvas || document.createElement('canvas');
    var renderBoundaries = this._renderBoundaries = [10000, 10000, 0, 0];

    var computed = getComputedStyle(config.container) || {};

    canvas.className = 'heatmap-canvas';
    canvas.id = 'heatmap-canvas_'+config.container.id;

    this._width = canvas.width = shadowCanvas.width = +(computed.width.replace(/px/,''));
    this._height = canvas.height = shadowCanvas.height = +(computed.height.replace(/px/,''));

    this.shadowCtx = shadowCanvas.getContext('2d');
    this.ctx = canvas.getContext('2d');

    // @TODO:
    // conditional wrapper

    canvas.style.cssText = shadowCanvas.style.cssText = 'position:absolute;left:0;top:0;';

    container.style.position = 'relative';
    container.appendChild(canvas);

    this._palette = _getColorPalette(config);
    this._templates = {};

    this._setStyles(config);
  };

  Canvas2dRenderer.prototype = {
    renderPartial: function(data) {
      this._drawAlpha(data);
      this._colorize();
    },
    renderAll: function(data) {
      // reset render boundaries
      this._clear();
      this._drawAlpha(_prepareData(data));
      this._colorize();
    },
    _updateGradient: function(config) {
      this._palette = _getColorPalette(config);
    },
    updateConfig: function(config) {
      if (config['gradient']) {
        this._updateGradient(config);
      }
      this._setStyles(config);
    },
    setDimensions: function(width, height) {
      this._width = width;
      this._height = height;
      this.canvas.width = this.shadowCanvas.width = width;
      this.canvas.height = this.shadowCanvas.height = height;
    },
    _clear: function() {
      this.shadowCtx.clearRect(0, 0, this._width, this._height);
      this.ctx.clearRect(0, 0, this._width, this._height);
    },
    _setStyles: function(config) {
      this._blur = (config.blur == 0)?0:(config.blur || config.defaultBlur);

      if (config.backgroundColor) {
        this.canvas.style.backgroundColor = config.backgroundColor;
      }

      this._opacity = (config.opacity || 0) * 255;
      this._maxOpacity = (config.maxOpacity || config.defaultMaxOpacity) * 255;
      this._minOpacity = (config.minOpacity || config.defaultMinOpacity) * 255;
      this._useGradientOpacity = !!config.useGradientOpacity;
    },
    _drawAlpha: function(data) {
      var min = this._min = data.min;
      var max = this._max = data.max;
      var data = data.data || [];
      var dataLen = data.length;
      // on a point basis?
      var blur = 1 - this._blur;

      while(dataLen--) {

        var point = data[dataLen];

        var x = point.x;
        var y = point.y;
        var radius = point.radius;
        // if value is bigger than max
        // use max as value
        var value = Math.min(point.value, max);
        var rectX = x - radius;
        var rectY = y - radius;
        var shadowCtx = this.shadowCtx;




        var tpl;
        if (!this._templates[radius]) {
          this._templates[radius] = tpl = _getPointTemplate(radius, blur);
        } else {
          tpl = this._templates[radius];
        }
        // value from minimum / value range
        // => [0, 1]
        shadowCtx.globalAlpha = (value-min)/(max-min);

        shadowCtx.drawImage(tpl, rectX, rectY);

        // update renderBoundaries
        if (rectX < this._renderBoundaries[0]) {
            this._renderBoundaries[0] = rectX;
          } 
          if (rectY < this._renderBoundaries[1]) {
            this._renderBoundaries[1] = rectY;
          }
          if (rectX + 2*radius > this._renderBoundaries[2]) {
            this._renderBoundaries[2] = rectX + 2*radius;
          }
          if (rectY + 2*radius > this._renderBoundaries[3]) {
            this._renderBoundaries[3] = rectY + 2*radius;
          }

      }
    },
    _colorize: function() {
      var x = this._renderBoundaries[0];
      var y = this._renderBoundaries[1];
      var width = this._renderBoundaries[2] - x;
      var height = this._renderBoundaries[3] - y;
      var maxWidth = this._width;
      var maxHeight = this._height;
      var opacity = this._opacity;
      var maxOpacity = this._maxOpacity;
      var minOpacity = this._minOpacity;
      var useGradientOpacity = this._useGradientOpacity;

      if (x < 0) {
        x = 0;
      }
      if (y < 0) {
        y = 0;
      }
      if (x + width > maxWidth) {
        width = maxWidth - x;
      }
      if (y + height > maxHeight) {
        height = maxHeight - y;
      }

      var img = this.shadowCtx.getImageData(x, y, width, height);
      var imgData = img.data;
      var len = imgData.length;
      var palette = this._palette;


      for (var i = 3; i < len; i+= 4) {
        var alpha = imgData[i];
        var offset = alpha * 4;


        if (!offset) {
          continue;
        }

        var finalAlpha;
        if (opacity > 0) {
          finalAlpha = opacity;
        } else {
          if (alpha < maxOpacity) {
            if (alpha < minOpacity) {
              finalAlpha = minOpacity;
            } else {
              finalAlpha = alpha;
            }
          } else {
            finalAlpha = maxOpacity;
          }
        }

        imgData[i-3] = palette[offset];
        imgData[i-2] = palette[offset + 1];
        imgData[i-1] = palette[offset + 2];
        imgData[i] = useGradientOpacity ? palette[offset + 3] : finalAlpha;

      }

      img.data = imgData;
      this.ctx.putImageData(img, x, y);

      this._renderBoundaries = [1000, 1000, 0, 0];

    },
    getValueAt: function(point) {
      var value;
      var shadowCtx = this.shadowCtx;
      var img = shadowCtx.getImageData(point.x, point.y, 1, 1);
      var data = img.data[3];
      var max = this._max;
      var min = this._min;

      value = (Math.abs(max-min) * (data/255)) >> 0;

      return value;
    },
    getDataURL: function() {
      return this.canvas.toDataURL();
    }
  };


  return Canvas2dRenderer;
})();

var Renderer = (function RendererClosure() {

  var rendererFn = false;

  if (HeatmapConfig['defaultRenderer'] === 'canvas2d') {
    rendererFn = Canvas2dRenderer;
  }

  return rendererFn;
})();


var Util = {
  merge: function() {
    var merged = {};
    var argsLen = arguments.length;
    for (var i = 0; i < argsLen; i++) {
      var obj = arguments[i]
      for (var key in obj) {
        merged[key] = obj[key];
      }
    }
    return merged;
  }
};
// Heatmap Constructor
var Heatmap = (function HeatmapClosure() {

  var Coordinator = (function CoordinatorClosure() {

    function Coordinator() {
      this.cStore = {};
    };

    Coordinator.prototype = {
      on: function(evtName, callback, scope) {
        var cStore = this.cStore;

        if (!cStore[evtName]) {
          cStore[evtName] = [];
        }
        cStore[evtName].push((function(data) {
            return callback.call(scope, data);
        }));
      },
      emit: function(evtName, data) {
        var cStore = this.cStore;
        if (cStore[evtName]) {
          var len = cStore[evtName].length;
          for (var i=0; i<len; i++) {
            var callback = cStore[evtName][i];
            callback(data);
          }
        }
      }
    };

    return Coordinator;
  })();


  var _connect = function(scope) {
    var renderer = scope._renderer;
    var coordinator = scope._coordinator;
    var store = scope._store;

    coordinator.on('renderpartial', renderer.renderPartial, renderer);
    coordinator.on('renderall', renderer.renderAll, renderer);
    coordinator.on('extremachange', function(data) {
      scope._config.onExtremaChange &&
      scope._config.onExtremaChange({
        min: data.min,
        max: data.max,
        gradient: scope._config['gradient'] || scope._config['defaultGradient']
      });
    });
    store.setCoordinator(coordinator);
  };


  function Heatmap() {
    var config = this._config = Util.merge(HeatmapConfig, arguments[0] || {});
    this._coordinator = new Coordinator();
    if (config['plugin']) {
      var pluginToLoad = config['plugin'];
      if (!HeatmapConfig.plugins[pluginToLoad]) {
        throw new Error('Plugin \''+ pluginToLoad + '\' not found. Maybe it was not registered.');
      } else {
        var plugin = HeatmapConfig.plugins[pluginToLoad];
        // set plugin renderer and store
        this._renderer = new plugin.renderer(config);
        this._store = new plugin.store(config);
      }
    } else {
      this._renderer = new Renderer(config);
      this._store = new Store(config);
    }
    _connect(this);
  };

  // @TODO:
  // add API documentation
  Heatmap.prototype = {
    addData: function() {
      this._store.addData.apply(this._store, arguments);
      return this;
    },
    removeData: function() {
      this._store.removeData && this._store.removeData.apply(this._store, arguments);
      return this;
    },
    setData: function() {
      this._store.setData.apply(this._store, arguments);
      return this;
    },
    setDataMax: function() {
      this._store.setDataMax.apply(this._store, arguments);
      return this;
    },
    setDataMin: function() {
      this._store.setDataMin.apply(this._store, arguments);
      return this;
    },
    configure: function(config) {
      this._config = Util.merge(this._config, config);
      this._renderer.updateConfig(this._config);
      this._coordinator.emit('renderall', this._store._getInternalData());
      return this;
    },
    repaint: function() {
      this._coordinator.emit('renderall', this._store._getInternalData());
      return this;
    },
    getData: function() {
      return this._store.getData();
    },
    getDataURL: function() {
      return this._renderer.getDataURL();
    },
    getValueAt: function(point) {

      if (this._store.getValueAt) {
        return this._store.getValueAt(point);
      } else  if (this._renderer.getValueAt) {
        return this._renderer.getValueAt(point);
      } else {
        return null;
      }
    }
  };

  return Heatmap;

})();


// core
var heatmapFactory = {
  create: function(config) {
    return new Heatmap(config);
  },
  register: function(pluginKey, plugin) {
    HeatmapConfig.plugins[pluginKey] = plugin;
  }
};

return heatmapFactory;


});


//load data_paths.js


function SVGPath(options) {
	var obj = this;
	obj.loadOptions(options);
	this.type = "viz";
	d3VizObj.viz.push(obj); obj.id = d3VizObj.viz.length-1;
	if(typeof obj.target=="undefined") obj.target="path";
	if(typeof obj.debug=="undefined") obj.debug = false;

	if(typeof obj.svg=="undefined") obj.svg = "stage";
	if(typeof obj.pathgroup=="undefined") obj.pathgroup = "lines";
	if(typeof obj.interpolate =="undefined") obj.interpolate = "linear";
	if(typeof obj.autosort =="undefined") obj.autosort = "true";
	obj.lineData = [];
	obj.lineGroup = [];

	if(typeof obj.group_id=="undefined") obj.group_id = "paths_"+obj.id;

	if(typeof obj.path_class=="undefined") {
		obj.target_class == "pathdata";
	} else {
		obj.target_class = obj.path_class;
	}

	if(typeof obj.caption_id == "undefined") obj.caption_id = "tooltip";

	this.processData = function (r) {
		if(typeof obj.data !=="undefined") {
			if(r.obj.id==obj.data.id) {
				if(obj.group_by) {
					if(typeof obj.lineGroup[r.d[obj.group_by]] == "undefined") obj.lineGroup[r.d[obj.group_by]] = [];
					obj.lineGroup[r.d[obj.group_by]].push(r.d.i);
				}
				if(obj.map.projection) {
					obj.lineData[r.d.i] = [];
					var latLonArray = obj.lineLatLons(r.d);
					for(var x in latLonArray) {
						var xy = obj.map.projection([latLonArray[x][1],latLonArray[x][0]]);
						obj.lineData[r.d.i].push({x:xy[0],y:xy[1]});
					}
				}						
			}	
		}
	}
		
	this.load = function(r) {
		switch(obj.map.maptype) {
			case "SVG":
				obj.projection = map.projection;
			break;
			case "GMap":
				obj.projection = map.gprojection;
			break;
		}

		if(d3.select("#"+obj.group_id)[0][0] == null) {
			obj.group = obj.map.addGroup(obj.group_id,obj.map.stage);
		} else {
			obj.group = d3.select("#"+obj.group_id);
		}
		
		obj.path = d3.geo.path().projection(obj.projection);

		if(typeof obj.data !== "undefined") {

			if(debug) console.log("Showing line data");
		
			obj.pathlayer = obj.map.addGroup(obj.pathgroup+"_"+obj.id,map[obj.svg]);
			obj.pathlayer.classed(obj.pathgroup,true);

			obj.linePaths = [];
			obj.line = d3.svg.line()
				.x(function(d) { return d.x})
				.y(function(d) { return d.y})
				.interpolate(obj.interpolate);

			for(var x in obj.data.data) {
				var d = obj.data.data[x];
				console.log(obj.lineData[x]);
				obj.linePaths[d.i] = 
					obj.pathlayer.append("path")
					.datum(d,function(d) { return "d_"+obj.data.id+"_"+d.i; }) //bind data to line object?
					.attr("id", "line_"+obj.id+"_"+d.i)
					.attr("i", d.i)
					.attr("class","line_"+obj.id)
					.classed("linegroup_"+obj.id+"_"+(typeof obj.group_by=="undefined"?"":obj.data.data[x][obj.group_by]),typeof obj.group_by=="undefined"?false:true)
					.attr("d", obj.line(obj.lineData[x]))
					.attr("stroke", function(d) { return obj.pathStrokeColor(obj.data.data[x],x,this); })
					.attr("stroke-width", function(d) { return obj.pathStrokeWidth(obj.data.data[x],x,this); })
					.on("mouseover", function(d){ obj.pathMouseover(this.id,this); ; })  //what to do when the mouse goes over
					.on("mouseout",  function(d){ obj.pathMouseout(this.id,this);  }) //what to do when the mouse is no longer over it		
			}
			if(obj.autosort) obj.sortByStrokeWidth(obj.pathStrokeWidth);		
		
		
		
		}

		if(obj.geoJSON) {

			if(obj.map.maptype=="GMap") {
				console.log("GMap not yet supported for geoJSON objects"); 
				//return false;
			}

			d3.json(obj.geoJSON, function(error, world) {
				if(debug||obj.debug) console.log("Loading geoJSON ("+(obj.geoJSON)+")");
				obj.topology = world;
				if(debug||obj.debug) console.log("geoJSON type:" +world.type);
				switch(world.type) {
					case "FeatureCollection":
					 d3.select("#"+obj.group_id).selectAll(obj.target)
						.data(world.features)
						  .enter()
						  .append(obj.target)
							.attr("class",obj.target_class) 
							  .attr("id",function(d,i) {
								if(typeof obj.setid == "function") {
									return obj.setid(d);
								} else {
									return "id_"+obj.id+"_"+i;
								}
							})
							.attr("i", function(d, i) { return d.i; }) //same as the above but just a number -- sometime useful to have access to which number it is in the set			
							.each(function(d,i) {
								if(typeof obj.each =="function") obj.each(d,i,this);
								if(obj.map.maptype=="GMap") {
									if(typeof d.geometry.coordinates !=="undefined") {
										for(var i in d.geometry.coordinates) {
											for(var ii in d.geometry.coordinates[i]) {
												var lat = d.geometry.coordinates[i][1];
												var lon = d.geometry.coordinates[i][0];
												//obj.map.bounds.extend(r.d._LatLng = new google.maps.LatLng(lat, lon));
												obj.map.bounds.extend(new google.maps.LatLng(lat, lon));
											}
										}
									}
								}
							})
							.attr("d", obj.path)
							.on("mouseover", function(d){ obj.mouseover_func(d,this) })  //what to do when the mouse goes over
							.on("mousemove", function(d){ obj.mousemove_func(d,this) })  //what to do when the mouse goes over
							.on("mouseout",  function(d){ obj.mouseout_func(d,this); }) //what to do when the mouse is no longer over it
							.on("click", function(d) { obj.mouseclick_func(d,this); }); //what to do if clicked
					break;
				}
				d3VizObj.is_loaded(obj);
			})
		}	
	}

	this.mouseover_func = function(d,shape) {
		if(typeof obj.mouseover_caption == "function") {
			d3.select("#"+obj.caption_id).html(obj.mouseover_caption(d,shape));
		} else if(obj.mouseover_caption) {
			d3.select("#"+obj.caption_id).html(obj.mouseover_caption);
		}
		if(typeof obj.mouseover == "function") {
			obj.mouseover(d,shape);
		}	
	},

	this.mousemove_func = function(d,shape) {
		if(typeof obj.mousemove == "function") {
			obj.mousemove(d,shape);
		}
	},

	this.mouseout_func = function(d,shape) {
		if(typeof obj.mouseover_caption == "function") {
			d3.select("#"+obj.caption_id).html("");
		}
		if(typeof obj.mouseout == "function") {
			obj.mouseout(d,shape);
		}
	},

	this.mouseclick_func = function(d,shape) {
		if(typeof obj.mouseclick == "function") {
			obj.mouseout(d,shape);
		}
	},

	this.pathStrokeWidth = function(d,i) {
		if(typeof obj.strokeWidth == "undefined") {
			return 1;
		} else if(typeof obj.strokeWidth == "function") {
			return obj.strokeWidth(d,i);
		} else {
			return obj.strokeWidth;
		}
	}
	this.pathStrokeColor = function(d,i) {
		if(typeof obj.strokeColor == "undefined") {
			return "#000";
		} else if(typeof obj.strokeColor == "function") {
			return obj.strokeColor(d,i);
		} else {
			return obj.strokeColor;
		}
	}
	this.pathMouseover = function(path_id,shape) {
		var i = d3.select(shape).attr("i");
		d3.select(shape).classed("mouseover",true);
		var d = obj.data.data[i];
		if(typeof obj.mouseover == "function") {
			return obj.mouseover(d,i,obj,path_id,shape);
		} else if(typeof obj.mouseover_caption == "function") {
			obj.map.tooltip.html(obj.mouseover_caption(d,i,obj,path_id,shape));
		} else if(obj.mouseover_caption) {
			obj.map.tooltip.html(obj.mouseover_caption,shape);
		}
	}
	this.pathMouseout = function(path_id,shape) {
		var i = d3.select(shape).attr("i");
		d3.select(shape).classed("mouseover",false);
		var d = obj.data.data[i];
		if(typeof obj.mouseout == "function") {
			return obj.mouseout(d,i,obj,path_id,shape);
		}
	}
	this.sortByStrokeWidth = function(strokefunc) {	
		//sorts so that smallest radius always on top
		obj.map.svg.selectAll(".line_"+obj.id) //for each of the paths...
		.sort(function (a,b) { //resort so bigger circles on bottom
			return strokefunc(b) - strokefunc(a);
		});
	}


	d3VizObj.addHook("run_on_each_data_row",this.processData);
	d3VizObj.addHook("run_after_data_and_map_loaded",this.load);
}
SVGPath.prototype = new d3Viz(SVGPath);

if(window.debug) console.log("SVGPath script loaded");
//load text_controls.js
/* TEXT CONTROLS - by Alex Wellerstein, v.1.0

A constructor that allows for a few types of text additions to d3Viz projects.

To do: 

- data-driven captions (both viz objects and choropleth forms?)
- add interactivity to captions (mouseover, etc.)

*/

function textCaptions(options) {
	if(typeof options.load!="undefined" && options.load == false) return false; //aborted

	var obj = this; 
	obj.loadOptions(options);
	this.type = "viz";
	d3VizObj.viz.push(obj); obj.id = d3VizObj.viz.length-1;

	obj.debug = setdefault(obj.debug,false);
	
	obj.angle = setdefault(obj.angle,0);
	obj.xoffset = setdefault(obj.xoffset,0);
	obj.yoffset = setdefault(obj.yoffset,0);
	obj.fontsize = setdefault(obj.fontsize,"");
	obj.class = setdefault(obj.class,"caption");
	obj.group_id = setdefault(obj.group_id, "captions_"+obj.id);

	this.textCaptionsRun = function() {
		if(typeof obj.viz == "function") {
			obj.viz = obj.viz();
		} 
		if(typeof obj.target == "function") {
			obj.target = obj.target();
		} 

		if(undef(obj.data)) {
			if(!undef(obj.viz)) {
				obj.data = obj.viz.data;
			}
		}

		if(debug||obj.debug) console.log("Starting to add captions");
		if(d3.select("#"+obj.group_id)[0][0] == null) {
			obj.group = obj.map.addGroup(obj.group_id,obj.map.stage);
		} else {
			obj.group = d3.select("#"+obj.group_id);
		}
		obj.caption_count = 0;
		if(typeof obj.captions !== "undefined" && obj.captions.length>0) {
			if(debug||obj.debug) console.log("Adding "+obj.captions.length+" captions manually");
			for(var i in obj.captions) {
				obj.addCaption(obj.captions[i]);
				obj.caption_count++;
			}
		}
		if(typeof obj.target !== "undefined") {
			console.log(obj.target);
			d3.selectAll(obj.target)
				.each(function(d) {
					console.log(d);
				})
		}
		
		/*
		if(typeof obj.caption == "function") {
			console.log(obj.viz);
			if(typeof obj.data !== "undefined") {
				for(var i in obj.data.data) {
					var d = obj.data.data[i];
					var cap = obj.caption(d);
				}
			} else {
				var cap = obj.caption();
			}

		
		}*/
	}

	this.addCaption = function(options) {
		if(undef(options)) {
			if(debug||obj.debug) console.log("Text caption (#"+obj.caption_count+") could not be placed no arguments were passed.");
			return false;
		}
		if(undef(options.lat)||undef(options.lon)) {
			if(undef(options.x)||undef(options.y)) {
				if(debug||obj.debug) console.log("Could not place text caption: missing position information (lat,lon or x,y).");			
				return false;
			}
		}
		if(undef(options.caption)) {
				if(debug||obj.debug) console.log("Could not place text caption: missing caption property.");		
				return false;
		}

		if(undef(obj.map)) {
			if(debug||obj.debug) console.log("Text caption could not be placed -- no map specified");
			return false;
		}

		options.angle = setdefault(options.angle, obj.angle);
		options.xoffset = setdefault(options.xoffset, obj.xoffset);
		options.yoffset = setdefault(options.yoffset, obj.yoffset);
		options.fontsize = setdefault(options.fontsize, obj.fontsize);

		if(undef(options.lat)||undef(options.lon)){
			var pos = [options.x,options.y];
		} else {
			var lat = options.lat;
			var lon = options.lon;
			var pos = obj.map.projection([lon,lat]);
		}
		var caption = options.caption;
		
		var gpoint = obj.group.append("g").attr("class",obj.class+"_g").attr("id",obj.class+"_g_"+obj.id+"_"+obj.caption_count);
		
		if(caption.length>0){
			gpoint.append("text")
				.attr("transform", function() {
					console.log(options.angle); 
					return "translate("+(pos[0]+options.xoffset)+","+(pos[1]+options.yoffset)+") rotate("+options.angle+")";
				})
				.style("font-size", function() { return (options.fontsize?(options.fontsize+"px"):""); })
				.attr("class",obj.class)
				.attr("id",obj.class+"_"+obj.id+"_"+obj.caption_count)
				.text(caption);
		}
	
	},
	this.clear = function () { //clears all captions
		d3.selectAll(obj.class).remove();
	},	
	d3VizObj.addHook("run_after_data_and_map_loaded",this.textCaptionsRun); 
	d3VizObj.is_loaded(obj);
}
textCaptions.prototype = new d3Viz(textCaptions);


function dataLocator(options) {
	var obj = this; 
	obj.loadOptions(options);

	if(typeof obj.debug == "undefined") obj.debug = false;

	this.type = "viz";
	d3VizObj.controls.push(obj); obj.id = d3VizObj.controls.length-1;

	if(typeof obj.selected_class == "undefined") obj.selected_class = "selected";
	if(obj.viz !== "undefined") {
		if(typeof obj.data == "undefined") obj.data = obj.viz.data;
	}
	if(typeof obj.sort_alpha == "undefined") obj.sort_alpha = true;

	this.locate = function(val) {
		if(obj.viz!=="undefined" && obj.selected_class!="") {
			d3.selectAll("."+obj.viz.data_class).classed(obj.selected_class, false); //reset class
		}
		if(val!==false ) { //clear
			var id = obj.viz.id_prefix(val);
			if(obj.viz!=="undefined" && obj.selected_class!="") {
				var baseclass = toggleClass(d3.select("#"+id).attr("class"),obj.selected_class,true); 
				d3.select("#"+id).attr("class", baseclass);	
			}
		}
		if(typeof obj.selected_function == "function") {
			obj.selected_function(obj.viz,obj.data.data[val]);
		}
	},

	this.dataLocatorPlaceSelect = function() {
		if(obj.selector_id) {
			if(debug||obj.debug) console.log("Placing the data locator menu");
			var insert = document.getElementById(obj.selector_id);
			if(!insert) {
				if(debug||obj.debug) console.log("Could not find HTML entity with the id '"+obj.selector_id);
			} else {
				var div = document.createElement("div");
				div.id = "dataLocator_"+obj.id;
				div.class = "dataLocator";
				var cap = document.createElement("span");
				if(obj.selector_caption) {
					cap_content = document.createTextNode(obj.selector_caption);
					cap.appendChild(cap_content);
				}
				cap.id = "dataLocator_"+obj.id+"_label";
				div.appendChild(cap);
				var sel = document.createElement("select");
				sel.onchange = function() { obj.locate(this.value) };
				sel.id = "dataLocator_selector_"+obj.id;
				for(i in obj.selector_options) {
					var opt = document.createElement("option");
					opt.text = obj.selector_options[i][0];
					opt.value = obj.selector_options[i][1];
					if(i==obj.selector_selected) opt.selected = true;
					sel.add(opt);
				}
				div.appendChild(sel);
				insert.appendChild(div);

			}
		}
	}

	this.dataLocatorBuildSelect = function() {
		if(obj.selector_id) {
			if(debug||obj.debug) console.log("Populating the data locator menu");
			var sel = document.getElementById("dataLocator_selector_"+obj.id);
			if(!sel) {
				if(debug||obj.debug) console.log("Could not find HTML entity with the id "+"dataLocator_selector_"+obj.id);
			} else {
				if(!obj.data) {
					if(debug||obj.debug) console.log("No data object associated with the data locator");
				} else {
					obj.d = obj.data.data;
					if(obj.selector_sort_field) {
						obj.d = [...obj.data.data]; //make a copy so we don't alter the original
						if(obj.sort_alpha) {
							obj.d.sort(function(a,b) {
								if(a[obj.selector_sort_field] > b[obj.selector_sort_field]) {
									return 1;
								} else {
									return -1
								}
							})
						} else {
							obj.d.sort(function(a,b) {
								if(+a[obj.selector_sort_field] > +b[obj.selector_sort_field]) {
									return 1;
								} else {
									return -1
								}
							})
						}
					}
					for(i in obj.d) {
						var opt = document.createElement("option");
						opt.text = obj.selector_captions(obj.d[i]);
						opt.value = obj.d[i].i;
						if(i==obj.selector_selected) opt.selected = true;
						sel.add(opt);
					
					}
				}
			}
		}
	}

	this.selectorValue = function(selector_index) {
		obj.selector_selected = selector_index;
		var val = obj.selector_options[selector_index][1];
		return val;
	}

	// toggles a given class on or out of a typical class list
	// this is similar to d3's .classed() function but can be used within attr("class") which is easier for a lot of cases
	// it works by understanding that classes are just lists separated by spaces, so it converts that to an array, parses the array, recombines it into a string
	this.toggleClass = function(classlist,classname,toggle) {
		var classes = classlist.split(" ");
		if(toggle) {
			if(classes.indexOf(classname)==-1) {
				classes.push(classname);
			}
		} else {
			if(classes.indexOf(classname)>-1) {
				classes.splice(classes.indexOf(classname),1);
			}
		}
		return classes.join(" ");
	}

	d3VizObj.addHook("run_before_map_loaded",this.dataLocatorPlaceSelect); //we place before we build, to lock in the location
	d3VizObj.addHook("run_after_datas_loaded",this.dataLocatorBuildSelect); //once the data is loaded, we can build it
	d3VizObj.is_loaded(obj);
}
dataLocator.prototype = new d3Viz(dataLocator);

if(window.debug) console.log("Text controls script loaded");
//load filter_data.js
/* DATA FILTERING - by Alex Wellerstein, v.3.0

Allows for filtering of data by a variety of means. By default, it does this by changing the class of elements.

*/

const FILTERTYPE_USERDEFINED = 0; //user defined
/*

A user-defined filter will turn things on or off based on your own custom function that evaluates the data.

*/

const FILTERTYPE_TEXTSEARCH = 1; //text search
/*

A text search filter will allow you to apply classes to D3.js data objects based on whether a field of data contains
a given fragment of text or not.  

*/

const FILTERTYPE_KEYWORDS = 2; //keywords
/*

A keyword filter will allow you to apply classes to D3.js data objects based on whether a delineated field contains or does
not contain a given value. For example, you might have data that consisted of stores, and "store_keywords" might be a list of 
terms separated by a delimiter like a semicolor, e.g. "restaurant; cheap;" or "baker; expensive;". Keyword filter understands
that items separated by a delimiter are part of a structured vocabulary.

*/

const FILTERTYPE_RANGE = 3;
/*

A range-based filter will allow you to apply classes to D3.js data objects based on whether a numerical value of the data
is within a given numerical range. For example, you might filter data based on whether the price is less than $5, between
$5 and $10, or greater than $10.

*/

function dataFilter(options) {
	var obj = this; 
	obj.loadOptions(options);

	if(typeof obj.debug == "undefined") obj.debug = false;

	if(typeof obj.filter_type == "undefined") {
		if(window.debug) console.log("Data filter cannot load -- no filter type specified");
		return false;
	} else {
		if(window.debug) console.log("Data filter loaded (type "+obj.filter_type+")");
	}
	this.type = "control";
	d3VizObj.controls.push(obj); obj.id = d3VizObj.controls.length-1;
	if(typeof obj.found_class == "undefined") obj.found_class = "data_has_text";
	if(typeof obj.lacks_class == "undefined") obj.lacks_class = "data_lacks_text";
	if(typeof obj.case_insensitive == "undefined") obj.case_insensitive = true;


	this.filterFunction = [
		//user-defined
		function(data_field,filter_value,d) {
			if(typeof obj.custom_filter == "function") {
				return obj.custom_filter(data_field,filter_value,d);
			}
		},
		//text search
		function(data_field,filter_value,d) {
			if(typeof filter_value == "function") { //if the value is a function
				if(filter_value(data_field,d)) {
					return true;
				} else {
					return false;
				}
			} else {
				if(data_field.indexOf(filter_value)>-1) { //indexOf gives the first instance of a piece of text in another piece of text, with -1 being returned if it isn't there
					return true; //text is found
				} else {                
					return false; //text is not found
				}
			}
		},
		//keyword search
		function(data_field,filter_value,d) {
			var keywords = data_field.split(obj.delimiter);
			for(var i in keywords) { //format keywords
				keywords[i] = keywords[i].trim(); 
				if(obj.case_insensitive) keywords[i] = keywords[i].toLowerCase();
			} 
			if(typeof filter_value == "function") { //if the value is a function
				if(filter_value(keywords,d)) {
					return true;
				} else {
					return false;
				}
			} else { //otherwise, search it ourselves
				if(keywords.indexOf(filter_value)>-1) { //indexOf gives the first instance of a piece of text in another piece of text, with -1 being returned if it isn't there
					return true;
				} else {                
					return false;
				}
			}
		},
		//range search
		function(data_field,filter_value,d) {
			if(typeof filter_value == "function") {
				return filter_value(data_field,d);
			} else if(filter_value==0) { //if "all" is selected
				return false; //just make it a regular dot
			} else { //but if something else is selected
				var min = filter_value[0];
				var max = filter_value[1];
				if(min===max) { //exact match
					if(+data_field==min) {
						return true;
					} else {
						return false;
					}
				} else if (min===false) { //if it is a "less than" situation 
					if(+data_field<max) {
						return true;
					} else {
						return false;
					}
				} else if(max===false) { //if it is a "more than" situation				
					if(+data_field>min) {
						return true;
					} else {
						return false;
					}
				} else { //if it is a "between" situation
					if((+data_field>min)&&(+data_field<max)) {
						return true;
					} else {
						return false;
					}
				}
			}		
		},
	];

	this.dataFilterBuildSelect = function() {
		if(obj.selector_id) {
			if(debug||obj.debug) console.log("Building the text filter menu");
			var insert = document.getElementById(obj.selector_id);
			if(!insert) {
				if(debug||obj.debug) console.log("Could not find HTML entity with the id '"+obj.selector_id);
			} else {
				var div = document.createElement("div");
				div.id = "dataFilter_"+obj.id;
				div.class = "dataFilter";
				var cap = document.createElement("span");
				if(obj.selector_caption) {
					cap_content = document.createTextNode(obj.selector_caption);
					cap.appendChild(cap_content);
				}
				cap.id = "dataFilter_"+obj.id+"_label";
				div.appendChild(cap);
				var sel = document.createElement("select");
				sel.onchange = function() { obj.filter(obj.selectorValue(this.value)) };			
				for(i in obj.selector_options) {
					var opt = document.createElement("option");
					opt.text = obj.selector_options[i][0];
					opt.value = i;
					if(i==obj.selector_selected) opt.selected = true;
					sel.add(opt);
				}
				div.appendChild(sel);
				insert.appendChild(div);
			}
		}
	}

	this.selectorValue = function(selector_index) {
		obj.selector_selected = selector_index;
		var val = obj.selector_options[selector_index][1];
		return val;
	}

	this.filter = function(val) {
		d3.selectAll(obj.filter_target) //select all the data by the class given
			.each(function(d) {
				var baseclass = toggleClass(d3.select(this).attr("class"),obj.found_class,false); 
				baseclass = toggleClass(baseclass,obj.lacks_class,false);
				if(val===false) { //if the value is equal to FALSE
					d3.select(this).attr("class", baseclass); //just set the class to default ("all")
					return;
				}
				var t = d[obj.filter_field];
				if(typeof obj.before_comparing == "function") t = obj.before_comparing(t); //run the "before_comparing" function on the text if we need to
				if(typeof t == "string") {
					if(obj.case_insensitive) t = t.toLowerCase();
				}
				if(typeof val =="string") {
					if(obj.case_insensitive) val = val.toLowerCase();
				}
				if(obj.filterFunction[obj.filter_type](t,val,d)) {
					if(typeof obj.filter_function == "function") {
						obj.filter_function(this,true);
					} else {
						d3.select(this).attr("class", obj.toggleClass(baseclass,obj.found_class,true)); //default behavior is to change the class
					}
				} else {
					if(typeof obj.filter_function == "function") {
						obj.filter_function(this,false);
					} else {
						d3.select(this).attr("class", obj.toggleClass(baseclass,obj.lacks_class,true));
					}
				}
			})
	}

	// toggles a given class on or out of a typical class list
	// this is similar to d3's .classed() function but can be used within attr("class") which is easier for a lot of cases
	// it works by understanding that classes are just lists separated by spaces, so it converts that to an array, parses the array, recombines it into a string
	this.toggleClass = function(classlist,classname,toggle) {
		var classes = classlist.split(" ");
		if(toggle) {
			if(classes.indexOf(classname)==-1) {
				classes.push(classname);
			}
		} else {
			if(classes.indexOf(classname)>-1) {
				classes.splice(classes.indexOf(classname),1);
			}
		}
		return classes.join(" ");
	}


	d3VizObj.addHook("run_before_map_loaded",this.dataFilterBuildSelect);
}
dataFilter.prototype = new d3Viz(dataFilter);

if(window.debug) console.log("Data filter script loaded");
//load filter_range.js
/* RANGE FILTERING - by Alex Wellerstein, v2.0 

Range filtering is when you have some kind of quantitative (number-based) field that you want to be able to toggle on and
off based on what contents are in the field, by criteria like "less than 100" or "between 100 and 200." For example, if you
had a dataset of school test scores that range from 0 to 1000, you might want to break it into categories like "<100", "100-200",
"201-300","301-400", and so on, up to "901-1000".

The filtering itself works by assigning classes to the data point. So if the data has the range searched for, it will
get the class "data_in_range". If it doesn't, it gets "data_out_range". You can use the stylesheet to toggle
what these classes then do (e.g. hide or show). 

Note that this field will force any value supplied to be read as a number, which may result in it being understood as "0" if
it is text based or the Javascript can't understand it.

*/

function filterRange(options) {
	var obj = this; 
	obj.loadOptions(options);
	d3VizObj.controls.push(obj); obj.id = d3VizObj.controls.length-1;
	
	this.rangeFilterBuildSelect = function() {
		if(debug) console.log("Building the range filter menu");
		var insert = document.getElementById(obj.rangeFilterInsertId);
		if(!insert) {
			if(debug) console.log("Could not find HTML entity with the id '"+obj.rangeFilterInsertId);
		} else {
			var div = document.createElement("div");
			div.id = "selectFilter_"+obj.id;
			div.class = "selectFilter";
			var cap = document.createElement("span");
			var cap_content = document.createTextNode(obj.rangeFilterCaption);
			cap.appendChild(cap_content);
			cap.id = "selectFilter_"+obj.id+"_label";
			div.appendChild(cap);
			var sel = document.createElement("select");
			sel.onchange = function() { obj.rangeFilter(this.value) };
			for(i in obj.range_filter_options) {
				var opt = document.createElement("option");
				opt.text = obj.range_filter_options[i][0];
				opt.value = i;
				if(i==obj.range_filter_default) opt.selected = true;
				sel.add(opt);
			}
			div.appendChild(sel);
			insert.appendChild(div);
		}	
	}
	this.rangeFilter = function(value) {
		if(debug) console.log("Filtering by range "+value);
		obj.map.svg //with the stage
			.selectAll(obj.range_filter_data_class) //select all data
			.data(obj.data.data, function(d) { return "d_"+obj.data.id+"_"+d.i; }) //parse the data again 
			.classed("data_in_range",function(d) { //change the class based on the field
				if(value==0) { //if "all" is selected
					return false; //just make it a regular dot
				} else { //but if something else is selected
					var min = obj.range_filter_options[value][1]()[0];
					var max = obj.range_filter_options[value][1]()[1];
					if(min===max) { //exact match
						if(+d[obj.range_filter_field]==min) {
							return true;
						} else {
							return false;
						}
					} else if (min===false) { //if it is a "less than" situation 
						if(+d[obj.range_filter_field]<max) {
							return true;
						} else {
							return false;
						}
					} else if(max===false) { //if it is a "more than" situation				
						if(+d[obj.range_filter_field]>min) {
							return true;
						} else {
							return false;
						}
					} else { //if it is a "between" situation
						if((+d[obj.range_filter_field]>min)&&(+d[obj.range_filter_field]<max)) {
							return true;
						} else {
							return false;
						}
					}
				}
			})
			.classed("data_out_range",function(d) { //change the class based on the field
				if(value==0) { //if "all" is selected
					return false; //just make it a regular dot
				} else { //but if something else is selected
					var min = obj.range_filter_options[value][1]()[0];
					var max = obj.range_filter_options[value][1]()[1];
					if(min===max) { //exact match
						if(+d[obj.range_filter_field]==min) {
							return false;
						} else {
							return true;
						}
					} else if (min===false) { //if it is a "less than" situation 
						if(+d[obj.range_filter_field]<max) {
							return false;
						} else {
							return true;
						}
					} else if(max===false) { //if it is a "more than" situation				
						if(+d[obj.range_filter_field]>min) {
							return false;
						} else {
							return true;
						}
					} else { //if it is a "between" situation
						if((+d[obj.range_filter_field]>min)&&(+d[obj.range_filter_field]<max)) {
							return false;
						} else {
							return true;
						}
					}
				}
			})

		;	
	}
	d3VizObj.addHook("run_before_map_loaded",this.rangeFilterBuildSelect);

}
filterRange.prototype = new d3Viz(filterRange);

if(window.debug) console.log("Filter by range script loaded");
//load mouse_zoomer.js
/* Mouse Zoomer -- makes it so that you can set certain objects so that if you click on them, it will zoom in/out on them. */
//v. 2.0

/* To use -- first select which objects (by class, element, or id) to attach the zoom events to */
//objects to apply the zoom event to -- by class or element or id

function mouseZoomer(options) {
	var obj = this; 
	obj.loadOptions(options);
	if(obj.map.maptype!="SVG") {
		if(debug||obj.debug) console.log("Map zoomer only works on SVG maps -- not loading");
		return false;
	}
	d3VizObj.controls.push(obj); obj.id = d3VizObj.controls.length-1;
	if(typeof obj.click_event=="undefined") obj.click_event = "click";
	if(typeof obj.zoom_factor=="undefined") obj.zoom_factor = 3;
	if(typeof obj.positions_zoom_factor=="undefined") obj.positions_zoom_factor = 5;
	if(typeof obj.zoom_transition_speed=="undefined") obj.zoom_transition_speed = 700;
	if(typeof obj.preserve_strokes == "undefined") obj.preserve_strokes = []; //no longer necessary


	obj.centered = null;
	obj.strokes = [];
	if(typeof obj.svg=="undefined") obj.svg = "stage";

	this.addZoomEvents = function() {
		if(debug||obj.debug) console.log("Attaching zoom events");
		for(var i in obj.zoom_if_clicked) {
			if(debug||obj.debug) console.log("Attaching to "+obj.zoom_if_clicked[i]);
			obj.map[obj.svg].selectAll(obj.zoom_if_clicked[i])
				.on(obj.click_event, obj.zoom) //let it take clicks
			;
		}
		if(debug||obj.debug) console.log("Done attaching");
	}

	if(obj.preserve_strokes.length) {
		this.preserveStrokes = function() {
			if(debug||obj.debug) console.log("Zoomer: Preserving strokes");
			for(var i in obj.preserve_strokes) {
				if((typeof window[obj.preserve_strokes[i]] !="undefined")||(typeof obj.preserve_strokes[i] !="undefined")||(obj.map[obj.svg].selectAll(obj.preserve_strokes[i]).length>0)) {
				   try {
					d3.selectAll(obj.preserve_strokes[i]).attr("_z_stroke-width",function(d) { return parseFloat(window.getComputedStyle(this).strokeWidth); });
					obj.strokes[i] = parseFloat(obj.map[obj.svg].select(obj.preserve_strokes[i]).style("stroke-width"));
				   } catch(err) {
					if(debug||obj.debug) console.log("Mouse zoomer tried to get the stroke of items '" + obj.preserve_strokes[i]+"' but failed (it might not exist)");
				   }
				}
			}
		}
	}
		
	this.zoom = function(d) {
		var x, y;
		var zoom_out = false;
		//x and y are the pixel positions to center on
		//k is the zoom level
		if(!d&& !obj.centered) {
			x = d3.mouse(this)[0];
			y = d3.mouse(this)[1];
			obj.map.zoom_factor = obj.zoom_factor;
			obj.centered = true;
		} else if(!d && obj.centered) {	//special case for clicking on things without positions
			x = obj.map.width / 2;
			y = obj.map.height / 2;
			obj.map.zoom_factor = 1;
			obj.centered = null;
		} else if(d.positions && obj.centered !==d) { //if you click on something that has a "positions" property, it will center on it â€” this makes circles clickable
			x = d.positions[0];
			y = d.positions[1];
			obj.map.zoom_factor = obj.positions_zoom_factor;
			obj.centered = d;
		} else if (d && obj.centered !== d) { //if you click on anything else that had position data (like a landform), it will figure out the center of it and them zoom on it
			if(obj.zoom_to_centroid) {
				var centroid = obj.map.path.centroid(d);
				x = centroid[0];
				y = centroid[1];
			} else {
				x = d3.mouse(this)[0];
				y = d3.mouse(this)[1];
			}
			obj.map.zoom_factor = obj.zoom_factor;
			obj.centered = d;
		} else { //if it detects it is already zoomed it, it zooms back out
			zoom_out = true;
			x = obj.map.width / 2;
			y = obj.map.height / 2;
			obj.map.zoom_factor = 1;
			obj.centered = null;
		}
		var zoom_functions = 0;

		obj.map[obj.svg].selectAll("path")
		  .classed("active", obj.centered && function(d) { return d === obj.centered; });
		
		if(obj.preserve_strokes.length) {
			obj.map[obj.svg]
			  .transition()
			  .duration(obj.zoom_transition_speed)
			  .attr("transform", "translate(" + obj.map.width / 2 + "," + obj.map.height / 2 + ")scale(" + obj.map.zoom_factor + ")translate(" + -x + "," + -y + ")")
			  .selectAll(obj.preserve_strokes[0])
				.style("stroke-width",function() {
						if(typeof d3.select("#"+this.id).attr("_z_stroke-width")!=="undefined") {
						return d3.select("#"+this.id).attr("_z_stroke-width")/obj.map.zoom_factor;
					} else {
						return obj.strokes[0]/obj.map.zoom_factor;
					}
				})
			;
			if(obj.preserve_strokes.length>1) {
				for(var i in obj.preserve_strokes) {
					if(i>0) {
						obj.map[obj.svg].selectAll(obj.preserve_strokes[i])
							.transition()
							.duration(obj.zoom_transition_speed)
							.style("stroke-width",function() {
								if(typeof d3.select("#"+this.id).attr("_z_stroke-width")!=="undefined") {
									return d3.select("#"+this.id).attr("_z_stroke-width")/obj.map.zoom_factor;
								} else {
									return obj.strokes[0]/obj.map.zoom_factor;
								}
							})								
						; 
					}
				}
			}
		} else {
			obj.map[obj.svg].transition()
			  .duration(obj.zoom_transition_speed)
			  .attr("transform", "translate(" + obj.map.width / 2 + "," + obj.map.height / 2 + ")scale(" + obj.map.zoom_factor + ")translate(" + -x + "," + -y + ")")
		}

		if(zoom_out) {
			if(typeof obj.zoomOut == "function") {
				obj.zoomOut(d,x,y);
			}
		} else {
			if(typeof obj.zoomIn == "function") {
				obj.zoomIn(d,x,y);
			}
		}					

	}
	d3VizObj.addHook("run_after_everything",this.addZoomEvents);
	if(obj.preserve_strokes.length) {
		d3VizObj.addHook("run_after_everything",this.preserveStrokes);	
	}
}
mouseZoomer.prototype = new d3Viz(mouseZoomer);


if(window.debug) console.log("Mouse zoomer script loaded");
