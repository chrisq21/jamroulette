$(document).ready(function() {
	navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

	var stream = {};
	var pear = {};
	var call = {};

	navigator.getUserMedia(
		{audio: true},

		// successCallback
		function(_stream) {
			stream = _stream;
			peer = new Peer({key: '8t0emwq4fan8w7b9'});
			peer.on('open', function(id) {
				$('#id').text('Your ID is '+id);
			});

			// Receive A Call
			peer.on('call', function(call) {
				// Answer the call, providing our mediaStream
			  	call.answer(stream);

			  	// Got Data from call
				call.on('stream', handleStream);
			});

			var audio = document.querySelector('audio');
			audio.src = window.URL.createObjectURL(stream);
		},

		function(err) {
			console.log("The following error occured: " + err);
		}
	);
	
	// Make A Call
	$('#call-btn').click(function() {
		var id = $('#text').val()
		if(id == '') {
			alert('Provide An ID');
		} else {
			call = peer.call(id, stream);	
			$('#connection').text('Calling...');
			call.on('stream', handleStream);
		}
	});

	handleStream = function(peer_stream) {
		$('#connection').text('Connected To Peer');
		var peer_audio = $('#peer-audio');
		peer_audio.attr('src', URL.createObjectURL(peer_stream));
		peer_audio.get(0).play();
	}

	$('#chord-form').submit(function(form) {
		var song = $(form.target)[0][0].value; 
		var chorus = $(form.target)[0][1].value;
		var verse = $(form.target)[0][2].value;
		var html = '<h3>'+ song + '</h3>';
		html += '<h4>Chorus: '+chorus+ '</h4>';
		html += '<h4>Verse: '+verse+ '</h4>';
		$('#song-info').append(html);
		return false;
	})
	
})