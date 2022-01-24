function getURLVar(key) {
	var value = [];

	var query = String(document.location).split('?');

	if (query[1]) {
		var part = query[1].split('&');

		for (i = 0; i < part.length; i++) {
			var data = part[i].split('=');

			if (data[0] && data[1]) {
				value[data[0]] = data[1];
			}
		}

		if (value[key]) {
			return value[key];
		} else {
			return '';
		}
	}
}

$(document).ready(function() {
	// Highlight any found errors
	$('.text-danger').each(function() {
		var element = $(this).parent().parent();

		if (element.hasClass('form-group')) {
			element.addClass('has-error');
		}
	});

	// Currency
	$('#form-currency .currency-select').on('click', function(e) {
		e.preventDefault();

		$('#form-currency input[name=\'code\']').val($(this).attr('name'));

		$('#form-currency').submit();
	});

	// Language
	$('#form-language .language-select').on('click', function(e) {
		e.preventDefault();

		$('#form-language input[name=\'code\']').val($(this).attr('name'));

		$('#form-language').submit();
	});

		/* common Search 
	$('#search input[name=\'search\']').parent().find('button').on('click', function() {
		var url = $('base').attr('href') + 'index.php?route=product/search';

		var value = $('header #search input[name=\'search\']').val();

		if (value) {
			url += '&search=' + encodeURIComponent(value);
		}

		location = url;
	});

	$('#search input[name=\'search\']').on('keydown', function(e) {
		if (e.keyCode == 13) {
			$('header #search input[name=\'search\']').parent().find('button').trigger('click');
		}
	});*/

    // advance search
 
    $('#search input[name=\'search\']').parent().find('button').on('click', function() {
		  var url = $('base').attr('href') + 'index.php?route=product/search';
		  
		  var searchvalue = $('header input[name=\'search\']').prop('value');
		  
		  if (searchvalue) {
		    url += '&search=' + encodeURIComponent(searchvalue);
		  }

		  var category_id = $('#header select[name=\'category_id\']').prop('value');
		  
		  if (category_id > 0) {
		    url += '&category_id=' + encodeURIComponent(category_id);
		  }

		  var sub_category = $('#header input[name=\'sub_category\']:checked').prop('value');
		  
		  if (sub_category) {
		    url += '&sub_category=true';
		  }
		  
		  location = url;

		});

		$('#header input[name=\'search\']').bind('keydown', function(e) {
		  if (e.keyCode == 13) {
		    $('header #search input[name=\'search\']').parent().find('button').trigger('click');

		  }
		});

		$('select[name=\'category_id\']').on('change', function() {
		  if (this.value == '0') {
		    $('input[name=\'sub_category\']').prop('disabled', true);
		  } else {
		    $('input[name=\'sub_category\']').prop('disabled', false);
		  }
		});

		$('select[name=\'category_id\']').trigger('change');


	// Menu
	$('#menu .dropdown-menu').each(function() {
		var menu = $('#menu').offset();
		var dropdown = $(this).parent().offset();

		var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());

		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 10) + 'px');
		}
	});

	// Product List
	$('#list-view').click(function() {
		$('#content .product-grid > .clearfix').remove();

		$('#content .row > .product-grid').attr('class', 'product-layout product-list col-xs-12');
		$('#grid-view').removeClass('active');
		$('#list-view').addClass('active');

		localStorage.setItem('display', 'list');
	});

	// Product Grid
	$('#grid-view').click(function() {
		// What a shame bootstrap does not take into account dynamically loaded columns
		var cols = $('#column-right, #column-left').length;

		if (cols == 2) {
			$('#content .product-list').attr('class', 'product-layout product-grid col-xl-6 col-lg-6 col-md-4 col-sm-12 col-xs-12');
		} else if (cols == 1) {
			$('#content .product-list').attr('class', 'product-layout product-grid col-xl-3 col-lg-4 col-md-4 col-sm-4 col-xs-6');
		} else {
			$('#content .product-list').attr('class', 'product-layout product-grid col-xl-3 col-lg-4 col-md-3 col-sm-4 col-xs-6');
		}

		$('#list-view').removeClass('active');
		$('#grid-view').addClass('active');

		localStorage.setItem('display', 'grid');
	});

	if (localStorage.getItem('display') == 'list') {
		$('#list-view').trigger('click');
		$('#list-view').addClass('active');
	} else {
		$('#grid-view').trigger('click');
		$('#grid-view').addClass('active');
	}

	// Checkout
	$(document).on('keydown', '#collapse-checkout-option input[name=\'email\'], #collapse-checkout-option input[name=\'password\']', function(e) {
		if (e.keyCode == 13) {
			$('#collapse-checkout-option #button-login').trigger('click');
		}
	});

	// tooltips on hover
	$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});

	// Makes tooltips work on ajax generated content
	$(document).ajaxStop(function() {
		$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
	}); 
});

// Cart add remove functions
var cart = {
	'add': function(product_id, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/add',
			type: 'post',
			data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			success: function(json) {
				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
				     $.notify({
				     	message: json['success'],
				     	target: '_blank'
				     },{
				     	// settings
				     	element: 'body',
				     	position: null,
				     	type: "info",
				     	allow_dismiss: true,
				     	newest_on_top: false,
				     	placement: {
				     		from: "top",
				     		align: "center"
				     	},
				     	offset: 0,
				     	spacing: 10,
				     	z_index: 2031,
				     	delay: 5000,
				     	timer: 1000,
				     	url_target: '_blank',
				     	mouse_over: null,
				     	animate: {
				     		enter: 'animated fadeInDown'
				     		//exit: 'animated fadeOutUp'
				     	},
				     	onShow: null,
				     	onShown: null,
				     	onClose: null,
				     	onClosed: null,
				     	icon_type: 'class',
				     	template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-success" role="alert">' +
				     		'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">&nbsp;&times;</button>' +
				     		'<span data-notify="message"><i class="fa fa-check-circle"></i>&nbsp; {2}</span>' +
				     		'<div class="progress" data-notify="progressbar">' +
				     			'<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
				     		'</div>' +
				     		'<a href="{3}" target="{4}" data-notify="url"></a>' +
				     	'</div>' 
				     });

					$('#cart > ul').load('index.php?route=common/cart/info ul li');
						   $('#cart > button').html('<span id="cart-title">' + json['headingtitle'] + '</span>' + '<span id="cart-total">' + json['total'] + '</span>');
						
				}
			}
		});
	},
	'update': function(key, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/edit',
			type: 'post',
			data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			success: function(json) {
				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info cart_prod');
                            $('#cart > button').html('<span id="cart-title">' + json['headingtitle'] + '</span>' + '<span id="cart-total">' + json['total'] + '</span>');
				}
			}
		});
	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			success: function(json) {
				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
                            $('#cart > button').html('<span id="cart-title">' + json['headingtitle'] + '</span>' + '<span id="cart-total">' + json['total'] + '</span>');
				}
			}
		});
	}
}

var voucher = {
	'add': function() {

	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				$('#cart-total').html(json['total']);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
		
	                $('#cart > button').html('<span id="cart-title">' + json['headingtitle'] + '</span>' + '<span id="cart-total">' + json['total'] + '</span>');
				}
			}
		});
	}
}

var wishlist = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=account/wishlist/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				if (json['success']) {
					$.notify({
						message: json['success'],
						target: '_blank'
					},{
						// settings
						element: 'body',
						position: null,
						type: "info",
						allow_dismiss: true,
						newest_on_top: false,
						placement: {
							from: "top",
							align: "center"
						},
						offset: 0,
						spacing: 10,
						z_index: 2031,
						delay: 5000,
						timer: 1000,
						url_target: '_blank',
						mouse_over: null,
						animate: {
							enter: 'animated fadeInDown',
							exit: 'animated fadeOutUp'
						},
						onShow: null,
						onShown: null,
						onClose: null,
						onClosed: null,
						icon_type: 'class',
						template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-success" role="alert">' +
							'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">&nbsp;&times;</button>' +
							'<span data-notify="message"><i class="fa fa-check-circle"></i>&nbsp; {2}</span>' +
							'<div class="progress" data-notify="progressbar">' +
								'<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
							'</div>' +
							'<a href="{3}" target="{4}" data-notify="url"></a>' +
						'</div>' 
					});
				}

				if (json['info']) {
					$.notify({
						message: json['info'],
						target: '_blank'
					},{
						// settings
						element: 'body',
						position: null,
						type: "info",
						allow_dismiss: true,
						newest_on_top: false,
						placement: {
							from: "top",
							align: "center"
						},
						offset: 0,
						spacing: 10,
						z_index: 2031,
						delay: 5000,
						timer: 1000,
						url_target: '_blank',
						mouse_over: null,
						animate: {
							enter: 'animated fadeInDown',
							exit: 'animated fadeOutUp'
						},
						onShow: null,
						onShown: null,
						onClose: null,
						onClosed: null,
						icon_type: 'class',
						template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-info" role="alert">' +
							'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">&nbsp;&times;</button>' +
							'<span data-notify="message"><i class="fa fa-info"></i>&nbsp; {2}</span>' +
							'<div class="progress" data-notify="progressbar">' +
								'<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
							'</div>' +
							'<a href="{3}" target="{4}" data-notify="url"></a>' +
						'</div>' 
					});
				}

				$('#wishlist-total').html(json['total']);

 
			}
		});
	},
	'remove': function() {

	}
}

var compare = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=product/compare/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				if (json['success']) {
					$.notify({
						message: json['success'],
						target: '_blank'
					},{
						// settings
						element: 'body',
						position: null,
						type: "info",
						allow_dismiss: true,
						newest_on_top: false,
						placement: {
							from: "top",
							align: "center"
						},
						offset: 0,
						spacing: 10,
						z_index: 2031,
						delay: 5000,
						timer: 1000,
						url_target: '_blank',
						mouse_over: null,
						animate: {
							enter: 'animated fadeInDown',
							exit: 'animated fadeOutUp'
						},
						onShow: null,
						onShown: null,
						onClose: null,
						onClosed: null,
						icon_type: 'class',
						template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-success" role="alert">' +
							'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">&nbsp;&times;</button>' +
							'<span data-notify="message"><i class="fa fa-check-circle"></i>&nbsp; {2}</span>' +
							'<div class="progress" data-notify="progressbar">' +
								'<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
							'</div>' +
							'<a href="{3}" target="{4}" data-notify="url"></a>' +
						'</div>' 
					});

					$('#compare-total').html(json['total']);
				}
			}
		});
	},
	'remove': function() {

	}
}

/* Agree to Terms */
$(document).delegate('.agree', 'click', function(e) {
	e.preventDefault();

	$('#modal-agree').remove();

	var element = this;

	$.ajax({
		url: $(element).attr('href'),
		type: 'get',
		dataType: 'html',
		success: function(data) {
			html  = '<div id="modal-agree" class="modal">';
			html += '  <div class="modal-dialog">';
			html += '    <div class="modal-content">';
			html += '      <div class="modal-header">';
			html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
			html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
			html += '      </div>';
			html += '      <div class="modal-body">' + data + '</div>';
			html += '    </div>';
			html += '  </div>';
			html += '</div>';

			$('body').append(html);

			$('#modal-agree').modal('show');
		}
	});
});

// Autocomplete */
(function($) {
	$.fn.autocomplete = function(option) {
		return this.each(function() {
			this.timer = null;
			this.items = new Array();

			$.extend(this, option);

			$(this).attr('autocomplete', 'off');

			// Focus
			$(this).on('focus', function() {
				this.request();
			});

			// Blur
			$(this).on('blur', function() {
				setTimeout(function(object) {
					object.hide();
				}, 200, this);
			});

			// Keydown
			$(this).on('keydown', function(event) {
				switch(event.keyCode) {
					case 27: // escape
						this.hide();
						break;
					default:
						this.request();
						break;
				}
			});

			// Click
			this.click = function(event) {
				event.preventDefault();

				value = $(event.target).parent().attr('data-value');

				if (value && this.items[value]) {
					this.select(this.items[value]);
				}
			}

			// Show
			this.show = function() {
				var pos = $(this).position();

				$(this).siblings('ul.dropdown-menu').css({
					top: pos.top + $(this).outerHeight(),
					left: pos.left
				});

				$(this).siblings('ul.dropdown-menu').show();
			}

			// Hide
			this.hide = function() {
				$(this).siblings('ul.dropdown-menu').hide();
			}

			// Request
			this.request = function() {
				clearTimeout(this.timer);

				this.timer = setTimeout(function(object) {
					object.source($(object).val(), $.proxy(object.response, object));
				}, 200, this);
			}

			// Response
			this.response = function(json) {
				html = '';

				if (json.length) {
					for (i = 0; i < json.length; i++) {
						this.items[json[i]['value']] = json[i];
					}

					for (i = 0; i < json.length; i++) {
						if (!json[i]['category']) {
							html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
						}
					}

					// Get all the ones with a categories
					var category = new Array();

					for (i = 0; i < json.length; i++) {
						if (json[i]['category']) {
							if (!category[json[i]['category']]) {
								category[json[i]['category']] = new Array();
								category[json[i]['category']]['name'] = json[i]['category'];
								category[json[i]['category']]['item'] = new Array();
							}

							category[json[i]['category']]['item'].push(json[i]);
						}
					}

					for (i in category) {
						html += '<li class="dropdown-header">' + category[i]['name'] + '</li>';

						for (j = 0; j < category[i]['item'].length; j++) {
							html += '<li data-value="' + category[i]['item'][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[i]['item'][j]['label'] + '</a></li>';
						}
					}
				}

				if (html) {
					this.show();
				} else {
					this.hide();
				}

				$(this).siblings('ul.dropdown-menu').html(html);
			}

			$(this).after('<ul class="dropdown-menu"></ul>');
			$(this).siblings('ul.dropdown-menu').delegate('a', 'click', $.proxy(this.click, this));

		});
	}
})(window.jQuery);

! function(t) {
    var o = {
        init: function(o) {
            var e = {
                offset: !0,
                bgfixed: !0,
                invert: !0
            };
            return this.each(function() {
                function n() {
                    p = s.data("source-url"), g = parseFloat(s.data("source-width")), h = parseFloat(s.data("source-height")), s.css({
                        "background-image": "url(" + p + ")"
                    }), r()
                }

                function r() {
                    u.on("scroll", function() {
                        e.offset && i()
                    }).trigger("scroll"), u.on("resize", function() {
                        s.css({}), e.offset && l()
                    }).trigger("resize")
                }

                function i() {
                    c()
                }

                function l() {
                    c()
                }

                function c() {
                    var t, o, n, r;
                    f = s.outerHeight(), windowHeight = u.height(), a = s.offset().top, t = d.scrollTop(), o = t + windowHeight, n = t - f, o > a && a > n && (r = o - n, pixelScrolled = t - (a - windowHeight), percentScrolled = pixelScrolled / r, e.invert ? (deltaTopScrollVal = 100 * percentScrolled, s.css({
                        "background-position": "50% " + deltaTopScrollVal + "%"
                    })) : (deltaTopScrollVal = 100 * (1 - percentScrolled), s.css({
                        "background-position": "50% " + deltaTopScrollVal + "%"
                    })))
                }
                o && t.extend(e, o); {
                    var a, s = t(this),
                        u = t(window),
                        d = t(document),
                        f = 0,
                        p = "",
                        g = "",
                        h = "";
                    Boolean(navigator.userAgent.match(/MSIE ([8]+)\./))
                }
                n()
            })
        },
        destroy: function() {},
        reposition: function() {},
        update: function() {}
    };
    t.fn.sitManParallax = function(e) {
        return o[e] ? o[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error("Method with name " + e + " is not exist for jQuery") : o.init.apply(this, arguments)
    }
}(jQuery);

(function(a) {
	a.extend(a.fn, {
		swapClass: function(e, d) {
			var c = this.filter("." + e);
			this.filter("." + d).removeClass(d).addClass(e);
			c.removeClass(e).addClass(d);
			return this
		},
		replaceClass: function(d, c) {
			return this.filter("." + d).removeClass(d).addClass(c).end()
		},
		hoverClass: function(c) {
			c = c || "hover";
			return this.hover(function() {
				a(this).addClass(c)
			}, function() {
				a(this).removeClass(c)
			})
		},
		heightToggle: function(c, d) {
			c ? this.animate({
				height: "toggle"
			}, c, d) : this.each(function() {
				jQuery(this)[jQuery(this).is(":hidden") ? "show" : "hide"]();
				if(d) {
					d.apply(this, arguments)
				}
			})
		},
		heightHide: function(c, d) {
			if(c) {
				this.animate({
					height: "hide"
				}, c, d)
			} else {
				this.hide();
				if(d) {
					this.each(d)
				}
			}
		},
		prepareBranches: function(c) {
			if(!c.prerendered) {
				this.filter(":last-child:not(ul)").addClass(b.last);
				this.filter((c.collapsed ? "" : "." + b.closed) + ":not(." + b.open + ")").find(">ul").hide()
			}
			return this.filter(":has(>ul)")
		},
		applyClasses: function(c, d) {
			this.filter(":has(>ul):not(:has(>a))").find(">span").click(function(e) {
				d.apply(a(this).next())
			}).add(a("a", this)).hoverClass();
			if(!c.prerendered) {
				this.filter(":has(>ul:hidden)").addClass(b.expandable).replaceClass(b.last, b.lastExpandable);
				this.not(":has(>ul:hidden)").addClass(b.collapsable).replaceClass(b.last, b.lastCollapsable);
				this.prepend('<div class="' + b.hitarea + '"/>').find("div." + b.hitarea).each(function() {
					var e = "";
					a.each(a(this).parent().attr("class").split(" "), function() {
						e += this + "-hitarea "
					});
					a(this).addClass(e)
				})
			}
			this.find("div." + b.hitarea).click(d)
		},
		treeview: function(d) {
			d = a.extend({
				cookieId: "treeview"
			}, d);
			if(d.add) {
				return this.trigger("add", [d.add])
			}
			if(d.toggle) {
				var i = d.toggle;
				d.toggle = function() {
					return i.apply(a(this).parent()[0], arguments)
				}
			}

			function c(l, n) {
				function m(o) {
					return function() {
						f.apply(a("div." + b.hitarea, l).filter(function() {
							return o ? a(this).parent("." + o).length : true
						}));
						return false
					}
				}
				a("a:eq(0)", n).click(m(b.collapsable));
				a("a:eq(1)", n).click(m(b.expandable));
				a("a:eq(2)", n).click(m())
			}

			function f() {
				a(this).parent().find(">.hitarea").swapClass(b.collapsableHitarea, b.expandableHitarea).swapClass(b.lastCollapsableHitarea, b.lastExpandableHitarea).end().swapClass(b.collapsable, b.expandable).swapClass(b.lastCollapsable, b.lastExpandable).find(">ul").heightToggle(d.animated, d.toggle);
				if(d.unique) {
					a(this).parent().siblings().find(">.hitarea").replaceClass(b.collapsableHitarea, b.expandableHitarea).replaceClass(b.lastCollapsableHitarea, b.lastExpandableHitarea).end().replaceClass(b.collapsable, b.expandable).replaceClass(b.lastCollapsable, b.lastExpandable).find(">ul").heightHide(d.animated, d.toggle)
				}
			}

			function k() {
				function m(n) {
					return n ? 1 : 0
				}
				var l = [];
				j.each(function(n, o) {
					l[n] = a(o).is(":has(>ul:visible)") ? 1 : 0
				});
				a.cookie(d.cookieId, l.join(""))
			}

			function e() {
				var l = a.cookie(d.cookieId);
				if(l) {
					var m = l.split("");
					j.each(function(n, o) {
						a(o).find(">ul")[parseInt(m[n]) ? "show" : "hide"]()
					})
				}
			}
			this.addClass("treeview");
			var j = this.find("li").prepareBranches(d);
			switch(d.persist) {
				case "cookie":
					var h = d.toggle;
					d.toggle = function() {
						k();
						if(h) {
							h.apply(this, arguments)
						}
					};
					e();
					break;
				case "location":
					var g = this.find("a").filter(function() {
						return this.href.toLowerCase() == location.href.toLowerCase()
					});
					if(g.length) {
						g.addClass("selected").parents("ul, li").add(g.next()).show()
					}
					break
			}
			j.applyClasses(d, f);
			if(d.control) {
				c(this, d.control);
				a(d.control).show()
			}
			return this.bind("add", function(m, l) {
				a(l).prev().removeClass(b.last).removeClass(b.lastCollapsable).removeClass(b.lastExpandable).find(">.hitarea").removeClass(b.lastCollapsableHitarea).removeClass(b.lastExpandableHitarea);
				a(l).find("li").andSelf().prepareBranches(d).applyClasses(d, f)
			})
		}
	});
	var b = a.fn.treeview.classes = {
		open: "open",
		closed: "closed",
		expandable: "expandable",
		expandableHitarea: "expandable-hitarea",
		lastExpandableHitarea: "lastExpandable-hitarea",
		collapsable: "collapsable",
		collapsableHitarea: "collapsable-hitarea",
		lastCollapsableHitarea: "lastCollapsable-hitarea",
		lastCollapsable: "lastCollapsable",
		lastExpandable: "lastExpandable",
		last: "last",
		hitarea: "hitarea"
	};
	a.fn.Treeview = a.fn.treeview
})(jQuery);

$.fn.tabs = function() {
	var selector = this;
	
	this.each(function() {
		var obj = $(this); 
		
		$(obj.attr('href')).hide();
		
		obj.click(function() {
			$(selector).removeClass('selected');
			
			$(this).addClass('selected');
			
			$($(this).attr('href')).fadeIn();
			
			$(selector).not(this).each(function(i, element) {
				$($(element).attr('href')).hide();
			});
			productListAutoSet();
			return false;
		});
	});

	$(this).show();
	
	$(this).first().click();
	
};
