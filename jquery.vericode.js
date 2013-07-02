/**
 * jQuery plugin: vericode
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @version 0.0.1
 */

(function($) {
	
	function Vericode($el, options) {
		this.$el = $el;
		this.options = options;
		this.$text = $('<span></span>');
		this.$input = $('<input type="text" maxlength="' + options.length + '"/>');
		this.$el.append(this.$text).append(this.$input);
		this.$text.css({
			'font-size': options.size + 'px',
			'cursor': 'pointer'
		});
		this.$input.css({
			'width': this.options.length * 10 + 'px',
			'margin-left': '5px'
		});
		this.events();
	}
	
	Vericode.prototype = {
		constructor : Vericode,
		
		events: function() {
			var that = this;
			this.$text.click(function() {
				that.init();
			});
		},
		
		init: function() {
			var rand = Math.random,
				number = [],
				color = [],
				bgcolor = [],
				i, c;
			for (i = 0; i < this.options.length; i++) {
				number.push(~~(rand() * 10));
			}
			for (i = 0; i < 3; i++) {
				c = ~~(rand() * 123);
				color.push(c);
				bgcolor.push(255 - c);
			}
			this.$text.text(number.join(''))
				.css({
					'color': 'rgb(' + color.join(',') + ')',
					'background-color': 'rgb(' + bgcolor.join(',') + ')'
				});
			if (this.options.focus) {
				this.$input.focus();
			}
		},
		
		reset: function() {
			this.init();
			this.$input.val('');
			if (this.options.focus) {
				this.$input.focus();
			}
		},
		
		test: function() {
			return this.$text.text() === $.trim(this.$input.val());
		}
	};
	
	$.fn.vericode = function() {
		var option = arguments[0], 
			args = arguments,

			value, 
			allowedMethods = ['reset', 'test'];

		this.each(function() {
			var $this = $(this), 
				data = $this.data('vericode'), 
				options = $.extend({}, $.fn.vericode.defaults, typeof option === 'object' && option);

			if (!data) {
				data = new Vericode($this, options);
				$this.data('vericode', data);
			}

			if (typeof option === 'string') {
				if ($.inArray(option, allowedMethods) < 0) {
					throw "Unknown method: " + option;
				}
				value = data[option](args[1]);
			} else {
				data.init();
			}
		});

		return typeof(value) !== 'undefined' ? value : this;
	};
	
	$.fn.vericode.defaults = {
		size: 16,
		length: 4,
		focus: false
	};
	
})(jQuery);
