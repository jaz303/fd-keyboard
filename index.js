module.exports = function(el, keymap) {

	var pressed 	= {},
		down 		= {},
		released	= {};

	for (var keycode in keymap) {
		var action = keymap[keycode];
		pressed[action] = down[action] = released[action] = false;
	}

	el.addEventListener('keydown', function(evt) {
		var action;
		if (evt.repeat || !(action = keymap[evt.which])) return;
	    evt.stopPropagation();
	    evt.preventDefault();
	    down[action] = true;
	    pressed[action] = true;
	});

	el.addEventListener('keyup', function(evt) {
	    var action;
	    if (evt.repeat || !(action = keymap[evt.which])) return;
	    evt.stopPropagation();
	    evt.preventDefault();
	    down[action] = false;
	    released[action] = true;
	});

	function reset() {
		for (var k in pressed) {
			pressed[k] = released[k] = false;
		}
	}

	return {
		pressed		: pressed,
		down 		: down,
		released 	: released,
		reset 		: reset
	};

}