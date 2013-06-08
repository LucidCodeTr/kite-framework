//create the application namespace
define(
		[ "jquery", "core/com", "core/utils", "core/loader" ],
		function($, Communication, Utilities, Loader) {

			// private
			var modules = {};
			
		    // Listeners
		    var listenerList = {};
			
			var register = function(moduleId, parentId, binding) {
				//console.log("Registering:" + moduleID + " " + parentId);
				modules[moduleId] = {
					"id" : moduleId,
					"parentId" : parentId,
					"binding" : binding,
					"visited" : false,
					"instance" : null
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
				Utils : Utilities,
				Loader : Loader,
				
				loadContainers : function(that, id, callback) {
					
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

						var path = "container/" + module.binding.replace(/\./g, "/");

						Loader.loadController(module, path, function(controller) {								
							console.log("Container Started:" + module.id);
							controller.init(module.id);
							if (module.parentId != "container") {
								that.loadContainers(that, module.parentId, function() {
									loadGadgets(that);
								});
							} else {
								//end traversal
								callback(that);
							}																																						
						});
						

						
					} else {	
					//if an unvisited child exists
						
						//1: mark module as visited
						module.visited = true;		
							
						//2: loads nested containers	
						that.loadContainers(that, module.id);
										
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
						controller.init(module.id);
					});
					console.log("Modue Started:" + id);
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
					registerAllContainers();
					this.loadContainers(this, undefined, function(that) {
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
				
				registerContainerInstance : function(controller) {
					modules[controller.data.id].instance = controller;
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