var livelybg = {
	'mute' : function(obj) {
		var video = document.getElementById(obj.target.dataset.livelybgMute);
		if (video.muted) {
			obj.target.classList.remove('fa-volume-off');
			obj.target.classList.add('fa-volume-up');
			video.muted = false;
		} else {
			obj.target.classList.remove('fa-volume-up');
			obj.target.classList.add('fa-volume-off');
			video.muted = true;
		}
	},
	'play' : function(obj) {
		var video = document.getElementById(obj.target.dataset.livelybgPlay);
		if (video.paused) {
			obj.target.classList.remove('fa-play');
			obj.target.classList.add('fa-pause');
			video.play();
		} else {
			obj.target.classList.remove('fa-pause');
			obj.target.classList.add('fa-play');
			video.pause();
		}
	},
	'getStart' : function(callback) {
		[].map.call(document.querySelectorAll('*[data-livelybg]'), function(obj) {
			var config = (new Function('return ' + obj.dataset.livelybg + ';'))();
			var bgVideo = document.createElement('video');
			bgVideo.src = config.src;
			bgVideo.id = (config.id ? config.id : 'livelybg');
			bgVideo.preload = (config.preload ? config.preload : false);
			bgVideo.controls = (config.controls ? config.controls : false);
			bgVideo.autoplay = (config.autoplay ? config.autoplay : false);
			bgVideo.muted = (config.muted ? config.muted : false);
			bgVideo.loop = (config.loop ? config.loop : false);
			bgVideo.style.position = (config.scroll ? 'relative' : 'fixed');
			bgVideo.style.right = '0';
			bgVideo.style.bottom = '0';
			bgVideo.style.minWidth = '100%';
			bgVideo.style.minHeight = '100%';
			bgVideo.style.width = 'auto';
			bgVideo.style.height = 'auto';
			bgVideo.style.zIndex = '-100';
			obj.appendChild(bgVideo);
		});

		[].map.call(document.querySelectorAll('*[data-livelybg-mute]'), function(obj) {
			obj.addEventListener('click', livelybg.mute);
		});

		[].map.call(document.querySelectorAll('*[data-livelybg-play]'), function(obj) {
			obj.addEventListener('click', livelybg.play);
		});
		(callback != undefined) ? callback(bgVideo) : '';
	}
};
window.addEventListener("load", function() {
	livelybg.getStart();
}, true);