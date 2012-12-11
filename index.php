<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="fr"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="fr"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="fr"> <![endif]-->
<!-- Consider adding a manifest.appcache: h5bp.com/d/Offline -->
<!--[if gt IE 8]><!--> <html class="no-js" lang="fr"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta name="language" content="french">
  <meta name="author" content="Nathalie Odiot">

  <!-- Use the .htaccess and remove these lines to avoid edge case issues.
       More info: h5bp.com/i/378 -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>Nathalie Odiot : Architecte d'intérieur Paris & St. Tropez</title>
  <meta name="description" content="Architecte d'intérieur Paris - Cote d'azur. Conception, Design, Décoration, Appels d'offres, et suivi de chantier">
  <meta property="og:image" content="http://www.nathalieodiot.com/img/capture.jpg"/>
  <meta property="og:title" content="Nathalie Odiot"/>
  <meta property="og:site_name" content="Architecte d'intérieur Paris & St. Tropez. Conception, Design, Décoration, Suivi de chantier, et appels d'offres d'entreprises"/>
	<?php
		include 'class/Mobile_Detect.php';
		$detect = new Mobile_Detect;
		if ($detect->isMobile()) {
    		echo '  <meta name = "viewport" content = "width=530">';
   		}
	    if($detect->isTablet()){
	    	echo '  <meta name = "viewport" content = "width=1050">';
		}
	?>
  <!-- Place favicon.ico and apple-touch-icon.png in the root directory: mathiasbynens.be/notes/touch-icons -->

  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/orbit.css">

  <!-- More ideas for your <head> here: h5bp.com/d/head-Tips -->

  <!-- All JavaScript at the bottom, except this Modernizr build.
       Modernizr enables HTML5 elements & feature detects for optimal performance.
       Create your own custom Modernizr build: www.modernizr.com/download/ -->
  <script src="/js/libs/modernizr-2.5.3.min.js"></script>
  <noscript>
	<style>
		.da-thumbs li a div {top: 0px;left: -100%;-webkit-transition: all 0.3s ease;-moz-transition: all 0.3s ease-in-out;-o-transition: all 0.3s ease-in-out;-ms-transition: all 0.3s ease-in-out;transition: all 0.3s ease-in-out;}
		.da-thumbs li a:hover div{ left: 0px;}
	</style>
  </noscript>
</head>
<body>

<div id="fb-root"></div>
  <!-- Prompt IE 6 users to install Chrome Frame. Remove this if you support IE 6.
       chromium.org/developers/how-tos/chrome-frame-getting-started -->
  <!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
<header>
	<h1><a href="/">Nathalie Odiot</a></h1>
	<h2>Architecture d'intérieurs "haute couture"</h2>
</header>

<div role="main" id="page">
<ul id="da-thumbs" class="da-thumbs">
    <li>
        <a href="architecture/style-vie-dessin.html" id="link2" class="pop">
            <img src="img/thumbs/suissa.jpg" alt="Architecture d'une villa à Ramatuelle dans le Golfe de Saint Tropez" />
            <div><span>Un style de vie, <br />un dessin</span></div>
        </a>
    </li>
    <li>
        <a href="architecture/corps-espace-architectural.html" id="link1" class="pop">
            <img src="img/thumbs/sdb.jpg" alt="Architecture d'une salle de bain design" />
            <div><span>Un corps dans l'espace architectural</span></div>
        </a>
    </li>
    <li>
        <a href="architecture/collaborations-architectes.html" id="link3" class="pop">
            <img src="img/thumbs/silencio.jpg" alt="Design et collaboration avec David Lynch" />
            <div><span>Collabo-rations d'exceptions</span></div>
        </a>
    </li>
    <li>
        <a href="architecture/design-petits-espaces.html" id="link4" class="pop">
            <img src="img/thumbs/beranger.jpg" alt="Design et décoration d'intérieur d'appartements à Paris" />
            <div><span>Travail des petits espaces</span></div>
        </a>
    </li>
    <li>
        <a href="architecture/materiaux-artisans.html" id="link5" class="pop">
            <img src="img/thumbs/details.jpg" alt="Matériaux design pour la décoration d'intérieur" />
            <div><span>Des matériaux et des artisans</span></div>
        </a>
    </li>
    <li>
        <a href="architecture/concept-realisation.html" id="link6" class="pop">
            <img src="img/thumbs/sketch.jpg" alt="Du concept, au design, à la réalisation des intérieurs" />
            <div><span>Du concept à la réalisation</span></div>
        </a>
    </li>
</ul>
<div class="fb-like" id="fblike" data-href="http://www.facebook.com/nathalie.odiot.architecte" data-send="false" data-layout="button_count" data-width="100" data-show-faces="false"></div>
</div>

<div id="overlay">&nbsp;</div>
<div id="popin">
	<a class="close" href="#"><img src="img/close.gif" alt="close" /></a>	
	<div id="inside">&nbsp;</div>
</div>


<footer>
	<div id="contacttoggle" class="actif">&nbsp;</div>
	<div id="contactcontent">
		<h2>Nathalie ODIOT</h2>
		<h3>Paris - Saint Tropez</h3>
		<p><a href="tel:+33-6-45-40-76-95" onclick="goog_report_conversion('tel:+33-6-45-40-76-95')">+33 6 45 40 76 95</a></p>
		<p><a href="mailto:contact@nathalieodiot.com">contact@nathalieodiot.com</a></p>
		<ul>
			<li id="pinterest"><a href="http://pinterest.com/nathalieodiot/" title="Pinterest" target="_blank"><span>Pinterest</span>&nbsp;</a></li>
			<li id="linkedin"><a href="http://fr.linkedin.com/pub/nathalie-odiot/23/720/a54" title="LinkedIn" target="_blank"><span>LinkedIn Profile</span>&nbsp;</a></li>
			<li id="google"><a href="http://plus.google.com/112645810473610812102?rel=author" rel="author" title="Google+" target="_blank"><span>Google + Nathalie Odiot</span>&nbsp;</a></li>
			<li id="facebook"><a href="http://www.facebook.com/nathalie.odiot.architecte" title="Facbook" target="_blank"><span>Facebook Fan Page</a></span>&nbsp;</li>
		</ul>
		<a href="https://plus.google.com/u/0/112645810473610812102?rel=author" id="author" target="_blank" rel="author"><img src="img/portrait-nathalie-odiot.jpg" alt="Portrait Nathalie Odiot" /></a>
		<!-- Begin MailChimp Signup Form -->
		<div id="mc_embed_signup">
			<form action="http://nathalieodiot.us5.list-manage.com/subscribe/post?u=eda52905a13d90e97a969203f&amp;id=a82f83215e" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
			<p>Recevez nos actualités :</p>
			<div class="mc-field-group">
				<label for="mce-EMAIL">Email :</label>
				<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
				<input type="hidden" name="FROM" value="website">
				<input type="hidden" name="TYPE" value="prospect">
			</div>
			<div id="mce-responses" class="clear">
				<div class="response" id="mce-error-response"></div>
				<div class="response" id="mce-success-response"></div>
			</div>
			<div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
			</form>
		</div>
		<!-- End mc_embed_signup-->
	</div>
</footer>

<div id="trame"></div>
  <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
	<!--<script src="js/libs/jquery-1.7.1.min.js"></script>-->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.1.min.js"><\/script>')</script>
	
  <!-- scripts concatenated and minified via build script -->
	<script src="js/plugins.js"></script>
	<script src="js/script.js"></script>
  <!-- end scripts -->
</body>
</html>