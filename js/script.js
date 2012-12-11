		$(function() {
			$('#da-thumbs > li').hoverdir();
			if (window.location != window.parent.location) {
				$(".pop").attr("target", "_blank");
				$(".pop").attr("href", $(".pop").attr("href")+"?utm_source=Facebook&utm_medium=iFrame&utm_campaign=IFrame%2BFacebook");
			};
			hash1 = location.hash.substr(1);
			$.trackPage('UA-1580600-9');
			
			if ((hash1 != "")&&(hash1 != "/")){
				$('#inside').load(hash1+" #content", function(response, status, xhr) {
					if (status == "error") {
   						var msg = "Sorry but there was an error: ";
					    //alert(msg + xhr.status + " " + xhr.statusText);
  					}else{
  						$('#slider').orbit();
	  					$("#popin").animate({"margin-top": "50px"},300,"swing");
						$("#overlay").fadeIn();
						$.trackPageview(hash1);
						$.trackEvent('Skills', 'Click','OpenSkill');
					};
  				});
			};
		});
		// +++++++ Like Facebook ++++++++ //
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/fr_FR/all.js#xfbml=1";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		// fin du like facebook //

		function closePopIn(){
			location.href='#';
			$("#popin").animate({"margin-top": "-1100px"},300,"swing");
			$("#overlay").fadeOut();
			$("footer").animate({"width": "30px"},150,"swing");
		}

		$("#popin > .close").click(function() {closePopIn(); });
		$("#overlay").click(function() {closePopIn()});
		
		$(document).keyup(function(e){
        	if(e.keyCode == 27){
			    if ($("#popin").css('margin-top') == "50px"){
					closePopIn();
					$.trackEvent('Skills', 'Click','CloseSkill');
				}
				if ($("footer").css('width') == "300px"){
					closePopIn();
					$.trackEvent('Contact', 'Click','CloseContact');
				}
			}
        }); 

		$(".pop").click(function(e) {
			if (window.location == window.parent.location) {
				e.preventDefault();
				myurl = $(this).attr("href");
				$('#inside').load(myurl+" #content", function(response, status, xhr) {
					if (status == "error") {
   						var msg = "Sorry but there was an error: ";
					    //alert(msg + xhr.status + " " + xhr.statusText);
	  				}else{
  						$('#slider').orbit();
	  					$("#popin").animate({"margin-top": "50px"},300,"swing");
						$("#overlay").fadeIn();
						$.trackEvent('Skills', 'Click','OpenSkill');
						$.trackPageview(myurl);
					};
  				});
  				location.href='#'+myurl;
  			};
		});

		$("#contacttoggle").click(function() {
			if ($("footer").css('width') == "300px"){
				$.trackEvent('Contact', 'Click','CloseContact');
				closePopIn();}
			if ($("footer").css('width') == "30px"){
				$.trackEvent('Contact', 'Click','OpenContact');
				$("footer").animate({"width": "300px"},150,"swing");
				$("#overlay").fadeIn();}
		});
		


