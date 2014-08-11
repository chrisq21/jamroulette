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
			console.log('Success');

			peer = new Peer({key: '8t0emwq4fan8w7b9'});
			peer.on('open', function(id) {
				$('#id').text('Your ID is '+id);
			});

			// Receive A Call
			peer.on('call', function(call) {
				alert('Getting A Call');
				// Answer the call, providing our mediaStream
			  	// call.answer(stream);

			  	// Got Data from call
				call.on('stream', function(stream) {
				// 	`stream` is the MediaStream of the remote peer.
				// Here you'd add it to an HTML video/canvas element.
				});
			});

			var audio = document.querySelector('audio');
			audio.src = window.URL.createObjectURL(stream);
			// Do something with the video here, e.g. video.play()
		},

		function(err) {
			console.log("The following error occured: " + err);
		}
	);
	
	$('#call-btn').click(function() {
		// Make A Call
		var id = $('#text').val()
		if(id == '') {
			alert('Provide An ID');
		} else {
			call = peer.call(id, stream);	
		}
		
	});

		

		

	
})