const min = 0;
const max = 5;

var current = 0;
var openExplanation = -1;
var animationsEnabled = true;

$('.btn').click(function() {
	if(!animationsEnabled)
		return;
	
	var next = $(this).attr('id') == 'btn-next';
	if(next ? (current == max) : (current == min))
		return;

	animationsEnabled = false;
	$('#inst' + current).fadeOut(function() {
		current += (next ? 1 : -1);
		$('#inst' + current).fadeIn(function() {
			$('#step-counter').fadeOut(150, function() {
				$(this).text(current);
				$(this).fadeIn(150, function() {
					animationsEnabled = true;
				});
			});
		});
	});
});

$('.why').click(function() {
	if(!animationsEnabled)
		return;
	
	var id = $(this).attr('id').substring(3);
	var div = $('#why-expl' + id);
	var lastOpen = openExplanation;
	openExplanation = id;
	
	if(lastOpen != -1) {
		var lastOpenDiv = $('#why-expl' + lastOpen);
		if(lastOpenDiv.attr('id') == div.attr('id')) {
			closeDiv(div);
			openExplanation = -1;
			return;
		}
		
		closeDiv(lastOpenDiv, function() {
			openDiv(div);
		});
	} else openDiv(div);
});

function openDiv(div) {
	animationsEnabled = false;
	var height = div.css('height');
	div.css('height', '0px');
	div.css('display', 'inline');
	
	div.animate({ height: height }, function() {
		div.fadeIn(function() {
			animationsEnabled = true;
		});
	});
}

function closeDiv(div, func) {
	animationsEnabled = false;
	
	var height = div.css('height');
	var height = div.css('height');
	div.animate({ height: '0px' }, function() {
		div.css({
			display: 'none',
			height: height,
		});
		animationsEnabled = true;
	});
	
	if(func != null)
		func();
}