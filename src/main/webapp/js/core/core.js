//create the application namespace
define(
		[ "jquery", "core/com", "core/utils", "core/loader" ],
		function($, Communication, Utilities, Loader) {

			// private
			var modules = {};
			
			var register = function(moduleID, parentId) {
				//console.log("Registering:" + moduleID + " " + parentId);
				modules[moduleID] = {
					"parentId" : parentId
				};
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
					register(el.getAttribute("data-bind"), el
									.getAttribute("id"));
							it.startModule(el.getAttribute("data-bind"));
						});
			};

			return {
				
				Communication : Communication,
				Utilities : Utilities,
				Loader : Loader,
				
				loadContainers : function(that, id, htmlBuffer, callback) {
					
					var selector;
					if (id) {
						selector = "#" + id + " [data-type='container']"
					} else {
						id = page;
						selector ="#page";
					}
				
					if ($(selector)[0] != undefined) {
						register($(selector)[0].getAttribute("data-bind"), $(selector)[0].getAttribute("id"));											
						var module = modules[$(selector)[0].getAttribute("data-bind")];
						
						// Loads nested containers
						that.loadContainers(that, module.parentId, htmlBuffer, function() {								
							that.startContainer($(selector)[0].getAttribute("data-bind"), htmlBuffer, function(id, that, htmlBuffer) {
																
								console.log("container start loading complete: " + module.parentId);
				
								var path = "container/" + id.replace(/\./g, "/");
								Loader.loadContainer(module, path + "_end", htmlBuffer, function(htmlBuffer) {
									$("#" + module.parentId).html(htmlBuffer);
									console.log("container end loading complete: " + module.parentId);

									Loader.loadController(module, path, function(controller) {
										
											console.log("Container Started:" + module.parentId);
											controller.display();
											callback(that, module.parentId, function() {
												loadGadgets(that);
												
											});										
																		
									});
									
								});
									
							});
						});
					} else {
						callback();
					}			
				},
				
				startModule : function(id) {
					//console.log("Starting Module:" + id);
					if (!modules.hasOwnProperty(id)) {
						throw "Module not found!";
					}
					var module = modules[id];
					var path = "gadget/" + id.replace(/\./g, "/");
					var mdeps = [ path + ".js" ];
					Loader.loadView(module, path, function() {

						// Loads nested portlets
						loadGadgets(this, module.parentId);
					});
					Loader.loadController(module, path, function(controller) {
						controller.display();
					});
					//console.log("Modue Started:" + id);
				},
				
				startContainer : function(id, htmlBuffer, callback) {
					
					var self = this;
					var module = modules[id];
					
					console.log("Starting Container:" + module.parentId);
					if (!modules.hasOwnProperty(id)) {
						throw "Module not found!";
					}
					
					var path = "container/" + id.replace(/\./g, "/");
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