//create the application namespace
define(
		[ "jquery", "core/com", "core/utils", "core/loader" ],
		function($, Communication, Utilities, Loader) {

			// private
			var modules = {};
			
			var register = function(moduleId, parentId, binding) {
				//console.log("Registering:" + moduleID + " " + parentId);
				modules[moduleId] = {
					"id" : moduleId,
					"parentId" : parentId,
					"binding" : binding,
					"visited" : false
				};
			};
			
			var registerAllContainers = function() {
				
				var selector = "[data-type='container']";
				
				//register all
				$(selector).each(function(indx, el) {
					register(
							el.getAttribute("id"), 
							$(el).parent().attr("id"),
							el.getAttribute("data-bind")
					);
				});
	
			};

			var loadGadgets = function(that, id) {
				var it = that;
				var selector;
				if (id) {
					selector = "#" + id + " [data-type='gadget']"
				} else {
					selector = "[data-type='gadget']";
				}
				$(selector).each(function(indx, el) {
					register(
							el.getAttribute("id"), 
							$(selector).attr("id"),
							el.getAttribute("data-bind")
					);
					it.startModule(el.getAttribute("id"));
				});
			};

			return {
				
				Communication : Communication,
				Utilities : Utilities,
				Loader : Loader,
				
				loadContainers : function(that, id, htmlBuffer, callback) {
					
					var selector;
					if (id) {
						selector = "#" + id;
					} else {
						id = page;
						selector ="#container";
					}
										
					var module;
					
					//get unvisited child module if exists
					$(selector).children("[data-type='container']").each(function(indx, el) {					
						if (modules[el.getAttribute("id")].visited == false) {
							module = modules[el.getAttribute("id")];
							return false;
						}
					});

					//if no unvisited child module exists, 
					//1: load end of current container
					//2: visit parent node
					if (module == undefined) {						
						module = modules[$(selector).attr("id")];
						
						//load start of current container
						that.startContainer(module.id, htmlBuffer, function(id, that, htmlBuffer) {	
							console.log("container start loading complete: " + module.id);
							//loadGadgets(that, module.id);
							var path = "container/" + module.binding.replace(/\./g, "/");
							Loader.loadContainer(module.id, path + "_end", htmlBuffer, function(htmlBuffer) {
								
								console.log("container end loading complete: " + module.id);

								Loader.loadController(module, path, function(controller) {
								
									console.log("Container Started:" + module.id);
									controller.display();
									if (module.parentId != "container") {
										that.loadContainers(that, module.parentId, htmlBuffer, function() {
											loadGadgets(that);
										});
									} else {
										//end traversal
										$("#" + module.parentId).html(htmlBuffer);
										callback(that);
									}																																						
								});
							});
						});

						
					} else {	
					//if an unvisited child exists
						
						//1: mark module as visited
						module.visited = true;		
							
						//2: loads nested containers	
						that.loadContainers(that, module.id, htmlBuffer);
										
					}		
				},
				
				startModule : function(id) {
					console.log("Starting Module:" + id);
					if (!modules.hasOwnProperty(id)) {
						throw "Module not found!";
					}
					var module = modules[id];
					var path = "gadget/" + module.binding.replace(/\./g, "/");
					var mdeps = [ path + ".js" ];
					Loader.loadView(module, path, function() {

						// Loads nested portlets
						loadGadgets(this, module.id);
					});
					Loader.loadController(module, path, function(controller) {
						controller.display();
					});
					console.log("Modue Started:" + id);
				},
				
				startContainer : function(id, htmlBuffer, callback) {
					
					var self = this;
					var module = modules[id];
					
					console.log("Starting Container:" + module.id);
					if (!modules.hasOwnProperty(id)) {
						throw "Module not found!";
					}
					
					var path = "container/" + module.binding.replace(/\./g, "/");
					var mdeps = [ path + ".js" ];
					Loader.loadContainer(module, path + "_start", htmlBuffer, function(htmlBuffer) {						
						callback(id, self, htmlBuffer);						
					});				
					
				},

				stop : function(moduleID) {
					var data = modules[moduleID];
					if (data.instance) {
						data.instance.destroy();
						data.instance = null;
					}
					var el = document
							.getElementById(modules[moduleID].parentId);
					while (el.hasChildNodes()) {
						el.removeChild(el.lastChild);
					}
				},
				startAll : function(that) {
					var htmlBuffer = "";
					registerAllContainers();
					this.loadContainers(this, undefined, htmlBuffer, function(that) {
						loadGadgets(that);
					});
					
				},
				stopAll : function() {
					for ( var moduleID in modules) {
						if (modules.hasOwnProperty(moduleID)) {
							this.stop(moduleID);
						}
					}
				},

				getModuleData : function(moduleId) {
					return modules[moduleId];
				},

				/**
				 * Returns the namespace specified and creates it if it doesn't
				 * exist
				 * 
				 * @method namespace
				 * @param {string*}
				 *            arguments 1-n namespaces to create
				 * @return {object} A reference to the last namespace object
				 *         created
				 */
				namespace : function() {
					var a = arguments, o = null, i, j, d;
					for (i = 0; i < a.length; i = i + 1) {
						d = ("" + a[i]).split(".");
						o = this;
						for (j = (d[0] == "app") ? 1 : 0; j < d.length; j = j + 1) {
							o[d[j]] = o[d[j]] || {};
							o = o[d[j]];
						}
					}
					return o;
				}
			};
		});