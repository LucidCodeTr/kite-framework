/*
 *  JqueryAsynchImageLoader (JAIL) : plugin for jQuery
 *
 * Developed by
 * Sebastiano Armeli-Battana (@sebarmeli) - http://www.sebastianoarmelibattana.com
 * Dual licensed under the MIT or GPL Version 3 licenses.
 */
define(
		[ "jquery" ],
		function() {
			(function($) {
				var $window = $(window);
				$.fn.asynchImageLoader = $.fn.jail = function(options) {
					options = $.extend({
						timeout : 10,
						effect : false,
						speed : 400,
						selector : null,
						offset : 0,
						event : "load+scroll",
						callback : jQuery.noop,
						callbackAfterEachImage : jQuery.noop,
						placeholder : false,
						container : window
					}, options);
					var images = this;
					$.jail.initialStack = this;
					this.data("triggerEl",
							(options.selector) ? $(options.selector) : $window);
					if (options.placeholder !== false) {
						images.each(function() {
							$(this).attr("src", options.placeholder);
						});
					}
					if (/^load/.test(options.event)) {
						$.asynchImageLoader.later.call(this, options);
					} else {
						$.asynchImageLoader.onEvent.call(this, options, images);
					}
					return this;
				};
				$.asynchImageLoader = $.jail = {
					_purgeStack : function(stack) {
						var i = 0;
						while (true) {
							if (i === stack.length) {
								break;
							} else {
								if (stack[i].getAttribute("data-href")) {
									i++;
								} else {
									stack.splice(i, 1);
								}
							}
						}
					},
					_loadOnEvent : function(e) {
						var $img = $(this), options = e.data.options, images = e.data.images;
						$.asynchImageLoader._loadImage(options, $img);
						$img.unbind(options.event,
								$.asynchImageLoader._loadOnEvent);
						$.asynchImageLoader._purgeStack(images);
						if (!!options.callback) {
							$.asynchImageLoader
									._purgeStack($.jail.initialStack);
							$.asynchImageLoader._launchCallback(
									$.jail.initialStack, options);
						}
					},
					_bufferedEventListener : function(e) {
						var images = e.data.images, options = e.data.options, triggerEl = images
								.data("triggerEl");
						clearTimeout(images.data("poller"));
						images.data("poller", setTimeout(function() {
							images.each(function _imageLoader() {
								$.asynchImageLoader._loadImageIfVisible(
										options, this, triggerEl);
							});
							$.asynchImageLoader._purgeStack(images);
							if (!!options.callback) {
								$.asynchImageLoader
										._purgeStack($.jail.initialStack);
								$.asynchImageLoader._launchCallback(
										$.jail.initialStack, options);
							}
						}, options.timeout));
					},
					onEvent : function(options, images) {
						images = images || this;
						if (options.event === "scroll" || options.selector) {
							var triggerEl = images.data("triggerEl");
							if (images.length > 0) {
								triggerEl.bind(options.event, {
									images : images,
									options : options
								}, $.asynchImageLoader._bufferedEventListener);
								if (options.event === "scroll"
										|| !options.selector) {
									$window
											.resize(
													{
														images : images,
														options : options
													},
													$.asynchImageLoader._bufferedEventListener);
								}
								return;
							} else {
								if (!!triggerEl) {
									triggerEl
											.unbind(
													options.event,
													$.asynchImageLoader._bufferedEventListener);
								}
							}
						} else {
							images.bind(options.event, {
								options : options,
								images : images
							}, $.asynchImageLoader._loadOnEvent);
						}
					},
					later : function(options) {
						var images = this;
						if (options.event === "load") {
							images.each(function() {
								$.asynchImageLoader
										._loadImageIfVisible(options, this,
												images.data("triggerEl"));
							});
						}
						$.asynchImageLoader._purgeStack(images);
						$.asynchImageLoader._launchCallback(images, options);
						setTimeout(function() {
							if (options.event === "load") {
								images.each(function() {
									$.asynchImageLoader._loadImage(options,
											$(this));
								});
							} else {
								images.each(function() {
									$.asynchImageLoader._loadImageIfVisible(
											options, this, images
													.data("triggerEl"));
								});
							}
							$.asynchImageLoader._purgeStack(images);
							$.asynchImageLoader
									._launchCallback(images, options);
							if (options.event === "load+scroll") {
								options.event = "scroll";
								$.asynchImageLoader.onEvent(options, images);
							}
						}, options.timeout);
					},
					_launchCallback : function(images, options) {
						if (images.length === 0 && !$.jail.isCallback) {
							options.callback.call(this, options);
							$.jail.isCallback = true;
						}
					},
					_loadImageIfVisible : function(options, image, triggerEl) {
						var $img = $(image), container = (/scroll/i
								.test(options.event)) ? triggerEl : $window;
						if ($.asynchImageLoader._isInTheScreen(container, $img,
								options.offset)) {
							$.asynchImageLoader._loadImage(options, $img);
						}
					},
					_isInTheScreen : function($ct, $img, optionOffset) {
						var is_ct_window = $ct[0] === window, ct_offset = (is_ct_window ? {
							top : 0,
							left : 0
						}
								: $ct.offset()), ct_top = ct_offset.top
								+ (is_ct_window ? $ct.scrollTop() : 0), ct_left = ct_offset.left
								+ (is_ct_window ? $ct.scrollLeft() : 0), ct_right = ct_left
								+ $ct.width(), ct_bottom = ct_top
								+ $ct.height(), img_offset = $img.offset(), img_width = $img
								.width(), img_height = $img.height();
						return (ct_top - optionOffset) <= (img_offset.top + img_height)
								&& (ct_bottom + optionOffset) >= img_offset.top
								&& (ct_left - optionOffset) <= (img_offset.left + img_width)
								&& (ct_right + optionOffset) >= img_offset.left;
					},
					_loadImage : function(options, $img) {
						$img.hide();
						$img.attr("src", $img.attr("data-href"));
						$img.removeAttr("data-href");
						if (options.effect) {
							if (options.speed) {
								$img[options.effect](options.speed);
							} else {
								$img[options.effect]();
							}
						} else {
							$img.show();
						}
						options.callbackAfterEachImage
								.call(this, $img, options);
					}
				};
			}(jQuery));
			jQuery.cookie = function(name, value, options) {
				if (typeof value != "undefined") {
					options = options || {};
					if (value === null) {
						value = "";
						options.expires = -1;
					}
					var expires = "";
					if (options.expires
							&& (typeof options.expires == "number" || options.expires.toUTCString)) {
						var date;
						if (typeof options.expires == "number") {
							date = new Date();
							date.setTime(date.getTime()
									+ (options.expires * 24 * 60 * 60 * 1000));
						} else {
							date = options.expires;
						}
						expires = "; expires=" + date.toUTCString();
					}
					var path = options.path ? "; path=" + (options.path) : "";
					var domain = options.domain ? "; domain="
							+ (options.domain) : "";
					var secure = options.secure ? "; secure" : "";
					document.cookie = [ name, "=", encodeURIComponent(value),
							expires, path, domain, secure ].join("");
				} else {
					var cookieValue = null;
					if (document.cookie && document.cookie != "") {
						var cookies = document.cookie.split(";");
						for ( var i = 0; i < cookies.length; i++) {
							var cookie = jQuery.trim(cookies[i]);
							if (cookie.substring(0, name.length + 1) == (name + "=")) {
								cookieValue = decodeURIComponent(cookie
										.substring(name.length + 1));
								break;
							}
						}
					}
					return cookieValue;
				}
			};
			$(document)
					.ready(
							function() {
								var r = document.referrer.toLowerCase();
								if (r.indexOf("stumbleupon.com") != -1) {
									var msg = 'Hello, I noticed you came from StumbleUpon! Like this page? <a href="http://www.stumbleupon.com/submit?url='
											+ encodeURIComponent(window.location)
											+ '" target="_blank" rel="nofollow" onclick="$(\'#greeting\').hide();">Stumble it</a>';
									var img = '<img src="http://s3.amazonaws.com/wrapbootstrap/live/imgs/greeting_stumbleupon.png" width="40" height="40" title="">';
									$("body").append(
											'<div id="greeting"><div class="close-button">Close</div>'
													+ img + "<p>" + msg
													+ "</p></div>");
									$("#greeting").delay(2000)
											.fadeTo("slow", 1);
								}
								if (r.indexOf("facebook.com") != -1) {
									var msg = 'Hello, I noticed you came from Facebook! Like this page? <a href="http://www.facebook.com/sharer/sharer.php?url='
											+ encodeURIComponent(window.location)
											+ '" target="_blank" rel="nofollow" onclick="window.open(\'http://www.facebook.com/sharer/sharer.php?url='
											+ encodeURIComponent(window.location)
											+ "','email','scrollbars=yes,width=640,height=400'); $('#greeting').hide(); return false;\">Share it</a>";
									var img = '<img src="http://s3.amazonaws.com/wrapbootstrap/live/imgs/greeting_facebook.png" width="40" height="40" title="">';
									$("body").append(
											'<div id="greeting"><div class="close-button">Close</div>'
													+ img + "<p>" + msg
													+ "</p></div>");
									$("#greeting").delay(2000)
											.fadeTo("slow", 1);
								} else {
									if (r.indexOf("twitter.com") != -1
											|| r.indexOf("http://t.co/") != -1
											|| r.indexOf("https://t.co/") != -1) {
										var status = window.location + "";
										var msg = 'Hello, I noticed you came from Twitter! Like this page? <a href="http://twitter.com/?status='
												+ encodeURIComponent(status)
												+ '" target="_blank" rel="nofollow" onclick="window.open(\'http://twitter.com/?status='
												+ encodeURIComponent(status)
												+ "','email','scrollbars=yes,width=640,height=400'); $('#greeting').hide(); return false;\">Tweet it</a>";
										var img = '<img src="http://s3.amazonaws.com/wrapbootstrap/live/imgs/greeting_twitter.png" width="40" height="40" title="">';
										$("body").append(
												'<div id="greeting"><div class="close-button">Close</div>'
														+ img + "<p>" + msg
														+ "</p></div>");
										$("#greeting").delay(2000).fadeTo(
												"slow", 1);
									}
								}
								$(".close-button").click(function() {
									$("#greeting").hide();
								});
							});
			var qq = qq || {};
			qq.extend = function(first, second) {
				for ( var prop in second) {
					first[prop] = second[prop];
				}
			};
			qq.indexOf = function(arr, elt, from) {
				if (arr.indexOf) {
					return arr.indexOf(elt, from);
				}
				from = from || 0;
				var len = arr.length;
				if (from < 0) {
					from += len;
				}
				for (; from < len; from++) {
					if (from in arr && arr[from] === elt) {
						return from;
					}
				}
				return -1;
			};
			qq.getUniqueId = (function() {
				var id = 0;
				return function() {
					return id++;
				};
			})();
			qq.attach = function(element, type, fn) {
				if (element.addEventListener) {
					element.addEventListener(type, fn, false);
				} else {
					if (element.attachEvent) {
						element.attachEvent("on" + type, fn);
					}
				}
			};
			qq.detach = function(element, type, fn) {
				if (element.removeEventListener) {
					element.removeEventListener(type, fn, false);
				} else {
					if (element.attachEvent) {
						element.detachEvent("on" + type, fn);
					}
				}
			};
			qq.preventDefault = function(e) {
				if (e.preventDefault) {
					e.preventDefault();
				} else {
					e.returnValue = false;
				}
			};
			qq.insertBefore = function(a, b) {
				b.parentNode.insertBefore(a, b);
			};
			qq.remove = function(element) {
				element.parentNode.removeChild(element);
			};
			qq.contains = function(parent, descendant) {
				if (parent == descendant) {
					return true;
				}
				if (parent.contains) {
					return parent.contains(descendant);
				} else {
					return !!(descendant.compareDocumentPosition(parent) & 8);
				}
			};
			qq.toElement = (function() {
				var div = document.createElement("div");
				return function(html) {
					div.innerHTML = html;
					var element = div.firstChild;
					div.removeChild(element);
					return element;
				};
			})();
			qq.css = function(element, styles) {
				if (styles.opacity != null) {
					if (typeof element.style.opacity != "string"
							&& typeof (element.filters) != "undefined") {
						styles.filter = "alpha(opacity="
								+ Math.round(100 * styles.opacity) + ")";
					}
				}
				qq.extend(element.style, styles);
			};
			qq.hasClass = function(element, name) {
				var re = new RegExp("(^| )" + name + "( |$)");
				return re.test(element.className);
			};
			qq.addClass = function(element, name) {
				if (!qq.hasClass(element, name)) {
					element.className += " " + name;
				}
			};
			qq.removeClass = function(element, name) {
				var re = new RegExp("(^| )" + name + "( |$)");
				element.className = element.className.replace(re, " ").replace(
						/^\s+|\s+$/g, "");
			};
			qq.setText = function(element, text) {
				element.innerText = text;
				element.textContent = text;
			};
			qq.children = function(element) {
				var children = [], child = element.firstChild;
				while (child) {
					if (child.nodeType == 1) {
						children.push(child);
					}
					child = child.nextSibling;
				}
				return children;
			};
			qq.getByClass = function(element, className) {
				if (element.querySelectorAll) {
					return element.querySelectorAll("." + className);
				}
				var result = [];
				var candidates = element.getElementsByTagName("*");
				var len = candidates.length;
				for ( var i = 0; i < len; i++) {
					if (qq.hasClass(candidates[i], className)) {
						result.push(candidates[i]);
					}
				}
				return result;
			};
			qq.obj2url = function(obj, temp, prefixDone) {
				var uristrings = [], prefix = "&", add = function(nextObj, i) {
					var nextTemp = temp ? (/\[\]$/.test(temp)) ? temp : temp
							+ "[" + i + "]" : i;
					if ((nextTemp != "undefined") && (i != "undefined")) {
						uristrings
								.push((typeof nextObj === "object") ? qq
										.obj2url(nextObj, nextTemp, true)
										: (Object.prototype.toString
												.call(nextObj) === "[object Function]") ? encodeURIComponent(nextTemp)
												+ "="
												+ encodeURIComponent(nextObj())
												: encodeURIComponent(nextTemp)
														+ "="
														+ encodeURIComponent(nextObj));
					}
				};
				if (!prefixDone && temp) {
					prefix = (/\?/.test(temp)) ? (/\?$/.test(temp)) ? "" : "&"
							: "?";
					uristrings.push(temp);
					uristrings.push(qq.obj2url(obj));
				} else {
					if ((Object.prototype.toString.call(obj) === "[object Array]")
							&& (typeof obj != "undefined")) {
						for ( var i = 0, len = obj.length; i < len; ++i) {
							add(obj[i], i);
						}
					} else {
						if ((typeof obj != "undefined") && (obj !== null)
								&& (typeof obj === "object")) {
							for ( var i in obj) {
								add(obj[i], i);
							}
						} else {
							uristrings.push(encodeURIComponent(temp) + "="
									+ encodeURIComponent(obj));
						}
					}
				}
				return uristrings.join(prefix).replace(/^&/, "").replace(
						/%20/g, "+");
			};
			var qq = qq || {};
			qq.FileUploaderBasic = function(o) {
				this._options = {
					debug : false,
					action : "/server/upload",
					params : {},
					button : null,
					multiple : true,
					maxConnections : 3,
					allowedExtensions : [],
					sizeLimit : 0,
					minSizeLimit : 0,
					onSubmit : function(id, fileName) {
					},
					onProgress : function(id, fileName, loaded, total) {
					},
					onComplete : function(id, fileName, responseJSON) {
					},
					onCancel : function(id, fileName) {
					},
					messages : {
						typeError : "Sorry, we only accept 24-bit .png files.",
						sizeError : "This file is too large. Maximum file size is 600kB.",
						minSizeError : "This file is too small. Something must be wrong.",
						emptyError : "This file is empty. Please select files again without it.",
						onLeave : "The file is being uploaded. If you leave now the upload will be cancelled."
					},
					showMessage : function(message) {
						alert(message);
					}
				};
				qq.extend(this._options, o);
				this._filesInProgress = 0;
				this._handler = this._createUploadHandler();
				if (this._options.button) {
					this._button = this
							._createUploadButton(this._options.button);
				}
				this._preventLeaveInProgress();
			};
			qq.FileUploaderBasic.prototype = {
				setParams : function(params) {
					this._options.params = params;
				},
				getInProgress : function() {
					return this._filesInProgress;
				},
				_createUploadButton : function(element) {
					var self = this;
					return new qq.UploadButton({
						element : element,
						multiple : this._options.multiple
								&& qq.UploadHandlerXhr.isSupported(),
						onChange : function(input) {
							self._onInputChange(input);
						}
					});
				},
				_createUploadHandler : function() {
					var self = this, handlerClass;
					if (this._options.formOnly == true) {
						handlerClass = "UploadHandlerForm";
					} else {
						if (qq.UploadHandlerXhr.isSupported()) {
							handlerClass = "UploadHandlerXhr";
						} else {
							handlerClass = "UploadHandlerForm";
						}
					}
					var handler = new qq[handlerClass]({
						debug : this._options.debug,
						action : this._options.action,
						maxConnections : this._options.maxConnections,
						onProgress : function(id, fileName, loaded, total) {
							self._onProgress(id, fileName, loaded, total);
							self._options.onProgress(id, fileName, loaded,
									total);
						},
						onComplete : function(id, fileName, result) {
							self._onComplete(id, fileName, result);
							self._options.onComplete(id, fileName, result);
						},
						onCancel : function(id, fileName) {
							self._onCancel(id, fileName);
							self._options.onCancel(id, fileName);
						}
					});
					return handler;
				},
				_preventLeaveInProgress : function() {
					var self = this;
					qq.attach(window, "beforeunload", function(e) {
						if (!self._filesInProgress) {
							return;
						}
						var e = e || window.event;
						e.returnValue = self._options.messages.onLeave;
						return self._options.messages.onLeave;
					});
				},
				_onSubmit : function(id, fileName) {
					this._filesInProgress++;
				},
				_onProgress : function(id, fileName, loaded, total) {
				},
				_onComplete : function(id, fileName, result) {
					this._filesInProgress--;
					if (result.error) {
						this._options.showMessage(result.error);
					}
				},
				_onCancel : function(id, fileName) {
					this._filesInProgress--;
				},
				_onInputChange : function(input) {
					if (this._handler instanceof qq.UploadHandlerXhr) {
						this._uploadFileList(input.files);
					} else {
						if (this._validateFile(input)) {
							this._uploadFile(input);
						}
					}
					this._button.reset();
				},
				_uploadFileList : function(files) {
					for ( var i = 0; i < files.length; i++) {
						if (!this._validateFile(files[i])) {
							return;
						}
					}
					for ( var i = 0; i < files.length; i++) {
						this._uploadFile(files[i]);
					}
				},
				_uploadFile : function(fileContainer) {
					var id = this._handler.add(fileContainer);
					var fileName = this._handler.getName(id);
					if (this._options.onSubmit(id, fileName) !== false) {
						this._onSubmit(id, fileName);
						this._handler.upload(id, this._options.params);
					}
				},
				_validateFile : function(file) {
					var name, size;
					if (file.value) {
						name = file.value.replace(/.*(\/|\\)/, "");
					} else {
						name = file.fileName != null ? file.fileName
								: file.name;
						size = file.fileSize != null ? file.fileSize
								: file.size;
					}
					if (!this._isAllowedExtension(name)) {
						this._error("typeError", name);
						return false;
					} else {
						if (size === 0) {
							this._error("emptyError", name);
							return false;
						} else {
							if (size && this._options.sizeLimit
									&& size > this._options.sizeLimit) {
								this._error("sizeError", name);
								return false;
							} else {
								if (size && size < this._options.minSizeLimit) {
									this._error("minSizeError", name);
									return false;
								}
							}
						}
					}
					return true;
				},
				_error : function(code, fileName) {
					var message = this._options.messages[code];
					function r(name, replacement) {
						message = message.replace(name, replacement);
					}
					r("{file}", this._formatFileName(fileName));
					r("{extensions}", this._options.allowedExtensions
							.join(", "));
					r("{sizeLimit}", this._formatSize(this._options.sizeLimit));
					r("{minSizeLimit}", this
							._formatSize(this._options.minSizeLimit));
					this._options.showMessage(message);
				},
				_formatFileName : function(name) {
					if (name.length > 33) {
						name = name.slice(0, 19) + "..." + name.slice(-13);
					}
					return name;
				},
				_isAllowedExtension : function(fileName) {
					var ext = (-1 !== fileName.indexOf(".")) ? fileName
							.replace(/.*[.]/, "").toLowerCase() : "";
					var allowed = this._options.allowedExtensions;
					if (!allowed.length) {
						return true;
					}
					for ( var i = 0; i < allowed.length; i++) {
						if (allowed[i].toLowerCase() == ext) {
							return true;
						}
					}
					return false;
				},
				_formatSize : function(bytes) {
					var i = -1;
					do {
						bytes = bytes / 1024;
						i++;
					} while (bytes > 99);
					return Math.max(bytes, 0.1).toFixed(1)
							+ [ "kB", "MB", "GB", "TB", "PB", "EB" ][i];
				}
			};
			qq.FileUploader = function(o) {
				qq.FileUploaderBasic.apply(this, arguments);
				qq
						.extend(
								this._options,
								{
									element : null,
									listElement : null,
									template : '<div class="qq-uploader">'
											+ '<div class="qq-upload-drop-area"><span>Drop files here to upload</span></div>'
											+ '<div class="btn qq-upload-button">Upload image</div>'
											+ '<ul id="image_upload_list" class="qq-upload-list"></ul>'
											+ '<div id="image_upload_error" class="help-block" style="color: #b94a48;"></div>'
											+ "</div>",
									fileTemplate : "<li>"
											+ '<span class="qq-upload-file"></span>'
											+ '<span class="qq-upload-spinner"></span>'
											+ '<span class="qq-upload-size"></span>'
											+ '<a class="qq-upload-cancel" href="#">Cancel</a>'
											+ '<span class="qq-upload-failed-text">Failed</span>'
											+ "</li>",
									classes : {
										button : "qq-upload-button",
										drop : "qq-upload-drop-area",
										dropActive : "qq-upload-drop-area-active",
										list : "qq-upload-list",
										file : "qq-upload-file",
										spinner : "qq-upload-spinner",
										size : "qq-upload-size",
										cancel : "qq-upload-cancel",
										success : "qq-upload-success",
										fail : "qq-upload-fail"
									}
								});
				qq.extend(this._options, o);
				this._element = this._options.element;
				this._element.innerHTML = this._options.template;
				this._listElement = this._options.listElement
						|| this._find(this._element, "list");
				this._classes = this._options.classes;
				this._button = this._createUploadButton(this._find(
						this._element, "button"));
				this._bindCancelEvent();
				this._setupDragDrop();
			};
			qq
					.extend(qq.FileUploader.prototype,
							qq.FileUploaderBasic.prototype);
			qq.extend(qq.FileUploader.prototype, {
				_find : function(parent, type) {
					var element = qq.getByClass(parent,
							this._options.classes[type])[0];
					if (!element) {
						throw new Error("element not found " + type);
					}
					return element;
				},
				_setupDragDrop : function() {
					var self = this, dropArea = this._find(this._element,
							"drop");
					var dz = new qq.UploadDropZone({
						element : dropArea,
						onEnter : function(e) {
							qq.addClass(dropArea, self._classes.dropActive);
							e.stopPropagation();
						},
						onLeave : function(e) {
							e.stopPropagation();
						},
						onLeaveNotDescendants : function(e) {
							qq.removeClass(dropArea, self._classes.dropActive);
						},
						onDrop : function(e) {
							dropArea.style.display = "none";
							qq.removeClass(dropArea, self._classes.dropActive);
							self._uploadFileList(e.dataTransfer.files);
						}
					});
					dropArea.style.display = "none";
					qq.attach(document, "dragenter", function(e) {
						if (!dz._isValidFileDrag(e)) {
							return;
						}
						dropArea.style.display = "block";
					});
					qq.attach(document, "dragleave",
							function(e) {
								if (!dz._isValidFileDrag(e)) {
									return;
								}
								var relatedTarget = document.elementFromPoint(
										e.clientX, e.clientY);
								if (!relatedTarget
										|| relatedTarget.nodeName == "HTML") {
									dropArea.style.display = "none";
								}
							});
				},
				_onSubmit : function(id, fileName) {
					qq.FileUploaderBasic.prototype._onSubmit.apply(this,
							arguments);
					this._addToList(id, fileName);
				},
				_onProgress : function(id, fileName, loaded, total) {
					qq.FileUploaderBasic.prototype._onProgress.apply(this,
							arguments);
					var item = this._getItemByFileId(id);
					var size = this._find(item, "size");
					size.style.display = "inline";
					var text;
					if (loaded != total) {
						text = Math.round(loaded / total * 100) + "% from "
								+ this._formatSize(total);
					} else {
						text = this._formatSize(total);
					}
					qq.setText(size, text);
				},
				_onComplete : function(id, fileName, result) {
					qq.FileUploaderBasic.prototype._onComplete.apply(this,
							arguments);
					var item = this._getItemByFileId(id);
					qq.remove(this._find(item, "cancel"));
					qq.remove(this._find(item, "spinner"));
					if (result.success) {
						qq.addClass(item, this._classes.success);
					} else {
						qq.addClass(item, this._classes.fail);
					}
				},
				_addToList : function(id, fileName) {
					var item = qq.toElement(this._options.fileTemplate);
					item.qqFileId = id;
					var fileElement = this._find(item, "file");
					qq.setText(fileElement, this._formatFileName(fileName));
					this._find(item, "size").style.display = "none";
					this._listElement.appendChild(item);
				},
				_getItemByFileId : function(id) {
					var item = this._listElement.firstChild;
					while (item) {
						if (item.qqFileId == id) {
							return item;
						}
						item = item.nextSibling;
					}
				},
				_bindCancelEvent : function() {
					var self = this, list = this._listElement;
					qq.attach(list, "click", function(e) {
						e = e || window.event;
						var target = e.target || e.srcElement;
						if (qq.hasClass(target, self._classes.cancel)) {
							qq.preventDefault(e);
							var item = target.parentNode;
							self._handler.cancel(item.qqFileId);
							qq.remove(item);
						}
					});
				}
			});
			qq.UploadDropZone = function(o) {
				this._options = {
					element : null,
					onEnter : function(e) {
					},
					onLeave : function(e) {
					},
					onLeaveNotDescendants : function(e) {
					},
					onDrop : function(e) {
					}
				};
				qq.extend(this._options, o);
				this._element = this._options.element;
				this._disableDropOutside();
				this._attachEvents();
			};
			qq.UploadDropZone.prototype = {
				_disableDropOutside : function(e) {
					if (!qq.UploadDropZone.dropOutsideDisabled) {
						qq.attach(document, "dragover", function(e) {
							if (e.dataTransfer) {
								e.dataTransfer.dropEffect = "none";
								e.preventDefault();
							}
						});
						qq.UploadDropZone.dropOutsideDisabled = true;
					}
				},
				_attachEvents : function() {
					var self = this;
					qq.attach(self._element, "dragover", function(e) {
						if (!self._isValidFileDrag(e)) {
							return;
						}
						var effect = e.dataTransfer.effectAllowed;
						if (effect == "move" || effect == "linkMove") {
							e.dataTransfer.dropEffect = "move";
						} else {
							e.dataTransfer.dropEffect = "copy";
						}
						e.stopPropagation();
						e.preventDefault();
					});
					qq.attach(self._element, "dragenter", function(e) {
						if (!self._isValidFileDrag(e)) {
							return;
						}
						self._options.onEnter(e);
					});
					qq.attach(self._element, "dragleave", function(e) {
						if (!self._isValidFileDrag(e)) {
							return;
						}
						self._options.onLeave(e);
						var relatedTarget = document.elementFromPoint(
								e.clientX, e.clientY);
						if (qq.contains(this, relatedTarget)) {
							return;
						}
						self._options.onLeaveNotDescendants(e);
					});
					qq.attach(self._element, "drop", function(e) {
						if (!self._isValidFileDrag(e)) {
							return;
						}
						e.preventDefault();
						self._options.onDrop(e);
					});
				},
				_isValidFileDrag : function(e) {
					var dt = e.dataTransfer, isWebkit = navigator.userAgent
							.indexOf("AppleWebKit") > -1;
					return dt
							&& dt.effectAllowed != "none"
							&& (dt.files || (!isWebkit && dt.types.contains && dt.types
									.contains("Files")));
				}
			};
			qq.UploadButton = function(o) {
				this._options = {
					element : null,
					multiple : false,
					name : "file",
					onChange : function(input) {
					},
					hoverClass : "qq-upload-button-hover",
					focusClass : "qq-upload-button-focus"
				};
				qq.extend(this._options, o);
				this._element = this._options.element;
				qq.css(this._element, {
					position : "relative",
					overflow : "hidden",
					direction : "ltr"
				});
				this._input = this._createInput();
			};
			qq.UploadButton.prototype = {
				getInput : function() {
					return this._input;
				},
				reset : function() {
					if (this._input.parentNode) {
						qq.remove(this._input);
					}
					qq.removeClass(this._element, this._options.focusClass);
					this._input = this._createInput();
				},
				_createInput : function() {
					var input = document.createElement("input");
					if (this._options.multiple) {
						input.setAttribute("multiple", "multiple");
					}
					input.setAttribute("type", "file");
					input.setAttribute("name", this._options.name);
					qq.css(input, {
						position : "absolute",
						right : 0,
						top : 0,
						fontFamily : "Arial",
						fontSize : "118px",
						margin : 0,
						padding : 0,
						cursor : "normal",
						opacity : 0
					});
					this._element.appendChild(input);
					var self = this;
					qq.attach(input, "change", function() {
						self._options.onChange(input);
					});
					qq.attach(input, "mouseover", function() {
						qq.addClass(self._element, self._options.hoverClass);
					});
					qq.attach(input, "mouseout",
							function() {
								qq.removeClass(self._element,
										self._options.hoverClass);
							});
					qq.attach(input, "focus", function() {
						qq.addClass(self._element, self._options.focusClass);
					});
					qq.attach(input, "blur",
							function() {
								qq.removeClass(self._element,
										self._options.focusClass);
							});
					if (window.attachEvent) {
						input.setAttribute("tabIndex", "-1");
					}
					return input;
				}
			};
			qq.UploadHandlerAbstract = function(o) {
				this._options = {
					debug : false,
					action : "/upload.php",
					maxConnections : 999,
					onProgress : function(id, fileName, loaded, total) {
					},
					onComplete : function(id, fileName, response) {
					},
					onCancel : function(id, fileName) {
					}
				};
				qq.extend(this._options, o);
				this._queue = [];
				this._params = [];
			};
			qq.UploadHandlerAbstract.prototype = {
				log : function(str) {
					if (this._options.debug && window.console) {
						console.log("[uploader] " + str);
					}
				},
				add : function(file) {
				},
				upload : function(id, params) {
					var len = this._queue.push(id);
					var copy = {};
					qq.extend(copy, params);
					this._params[id] = copy;
					if (len <= this._options.maxConnections) {
						this._upload(id, this._params[id]);
					}
				},
				cancel : function(id) {
					this._cancel(id);
					this._dequeue(id);
				},
				cancelAll : function() {
					for ( var i = 0; i < this._queue.length; i++) {
						this._cancel(this._queue[i]);
					}
					this._queue = [];
				},
				getName : function(id) {
				},
				getSize : function(id) {
				},
				getQueue : function() {
					return this._queue;
				},
				_upload : function(id) {
				},
				_cancel : function(id) {
				},
				_dequeue : function(id) {
					var i = qq.indexOf(this._queue, id);
					this._queue.splice(i, 1);
					var max = this._options.maxConnections;
					if (this._queue.length >= max && i < max) {
						var nextId = this._queue[max - 1];
						this._upload(nextId, this._params[nextId]);
					}
				}
			};
			qq.UploadHandlerForm = function(o) {
				qq.UploadHandlerAbstract.apply(this, arguments);
				this._inputs = {};
			};
			qq.extend(qq.UploadHandlerForm.prototype,
					qq.UploadHandlerAbstract.prototype);
			qq
					.extend(
							qq.UploadHandlerForm.prototype,
							{
								add : function(fileInput) {
									fileInput.setAttribute("name", "qqfile");
									var id = "qq-upload-handler-iframe"
											+ qq.getUniqueId();
									this._inputs[id] = fileInput;
									if (fileInput.parentNode) {
										qq.remove(fileInput);
									}
									return id;
								},
								getName : function(id) {
									return this._inputs[id].value.replace(
											/.*(\/|\\)/, "");
								},
								_cancel : function(id) {
									this._options
											.onCancel(id, this.getName(id));
									delete this._inputs[id];
									var iframe = document.getElementById(id);
									if (iframe) {
										iframe.setAttribute("src",
												"javascript:false;");
										qq.remove(iframe);
									}
								},
								_upload : function(id, params) {
									var input = this._inputs[id];
									if (!input) {
										throw new Error(
												"file with passed id was not added, or already uploaded or cancelled");
									}
									var fileName = this.getName(id);
									var iframe = this._createIframe(id);
									var form = this._createForm(iframe, params,
											input);
									form.appendChild(input);
									var self = this;
									this._attachLoadEvent(iframe, function() {
										self.log("iframe loaded");
										var response = self
												._getIframeContentJSON(iframe);
										self._options.onComplete(id, fileName,
												response);
										self._dequeue(id);
										delete self._inputs[id];
										setTimeout(function() {
											qq.remove(iframe);
										}, 1);
									});
									form.submit();
									qq.remove(form);
									return id;
								},
								_attachLoadEvent : function(iframe, callback) {
									qq
											.attach(
													iframe,
													"load",
													function() {
														if (!iframe.parentNode) {
															return;
														}
														if (iframe.contentDocument
																&& iframe.contentDocument.body
																&& iframe.contentDocument.body.innerHTML == "false") {
															return;
														}
														callback();
													});
								},
								_getIframeContentJSON : function(iframe) {
									var doc = iframe.contentDocument ? iframe.contentDocument
											: iframe.contentWindow.document, response;
									this
											.log("converting iframe's innerHTML to JSON");
									this.log("innerHTML = "
											+ doc.body.innerHTML);
									try {
										response = eval("("
												+ doc.body.innerHTML + ")");
									} catch (err) {
										response = {};
									}
									return response;
								},
								_createIframe : function(id) {
									var iframe = qq
											.toElement('<iframe src="javascript:false;" name="'
													+ id + '" />');
									iframe.setAttribute("id", id);
									iframe.style.display = "none";
									document.body.appendChild(iframe);
									return iframe;
								},
								_createForm : function(iframe, params, input) {
									var form = qq
											.toElement('<form method="post" enctype="multipart/form-data"></form>');
									var queryString = qq.obj2url(params,
											this._options.action);
									form.setAttribute("action", queryString);
									form.setAttribute("target", iframe.name);
									form.style.display = "none";
									document.body.appendChild(form);
									return form;
								},
								_createS3Form : function(iframe, params, input,
										tid, sig, policy, success_redirect) {
								}
							});
			qq.UploadHandlerXhr = function(o) {
				qq.UploadHandlerAbstract.apply(this, arguments);
				this._files = [];
				this._xhrs = [];
				this._loaded = [];
			};
			qq.UploadHandlerXhr.isSupported = function() {
				var input = document.createElement("input");
				input.type = "file";
				return ("multiple" in input && typeof File != "undefined" && typeof (new XMLHttpRequest()).upload != "undefined");
			};
			qq.extend(qq.UploadHandlerXhr.prototype,
					qq.UploadHandlerAbstract.prototype);
			qq
					.extend(
							qq.UploadHandlerXhr.prototype,
							{
								add : function(file) {
									if (!(file instanceof File)) {
										throw new Error(
												"Passed obj in not a File (in qq.UploadHandlerXhr)");
									}
									return this._files.push(file) - 1;
								},
								getName : function(id) {
									var file = this._files[id];
									return file.fileName != null ? file.fileName
											: file.name;
								},
								getSize : function(id) {
									var file = this._files[id];
									return file.fileSize != null ? file.fileSize
											: file.size;
								},
								getLoaded : function(id) {
									return this._loaded[id] || 0;
								},
								_upload : function(id, params) {
									var file = this._files[id], name = this
											.getName(id), size = this
											.getSize(id);
									this._loaded[id] = 0;
									var xhr = this._xhrs[id] = new XMLHttpRequest();
									var self = this;
									xhr.upload.onprogress = function(e) {
										if (e.lengthComputable) {
											self._loaded[id] = e.loaded;
											self._options.onProgress(id, name,
													e.loaded, e.total);
										}
									};
									xhr.onreadystatechange = function() {
										if (xhr.readyState == 4) {
											self._onComplete(id, xhr);
										}
									};
									params = params || {};
									params["method"] = "xhr";
									var queryString = qq.obj2url(params,
											this._options.action);
									xhr.open("POST", queryString, true);
									xhr.setRequestHeader("X-Requested-With",
											"XMLHttpRequest");
									xhr.setRequestHeader("X-File-Name",
											encodeURIComponent(name));
									xhr.setRequestHeader("Content-Type",
											"application/octet-stream");
									xhr.send(file);
								},
								_onComplete : function(id, xhr) {
									if (!this._files[id]) {
										return;
									}
									var name = this.getName(id);
									var size = this.getSize(id);
									this._options.onProgress(id, name, size,
											size);
									if (xhr.status == 200) {
										this
												.log("xhr - server response received");
										this.log("responseText = "
												+ xhr.responseText);
										var response;
										try {
											response = eval("("
													+ xhr.responseText + ")");
										} catch (err) {
											response = {};
										}
										this._options.onComplete(id, name,
												response);
									} else {
										this._options.onComplete(id, name, {});
									}
									this._files[id] = null;
									this._xhrs[id] = null;
									this._dequeue(id);
								},
								_cancel : function(id) {
									this._options
											.onCancel(id, this.getName(id));
									this._files[id] = null;
									if (this._xhrs[id]) {
										this._xhrs[id].abort();
										this._xhrs[id] = null;
									}
								}
							});
		});