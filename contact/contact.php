<!doctype html>
<html lang="fr">

<head>

	<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PPGGRDF');</script>
<!-- End Google Tag Manager -->
	
	<meta charset="utf-8">
	<meta name="viewport" content= "width=device-width, user-scalable=no">
	<meta name="description" content="Mon site de contact/portfolio, ou vous pourrez retrouver mes créations et me contacter pour différents services." />
	<meta name="keywords" content="Quentin, Gautier, Portfolio, graphisme, infographie, web design, photomontage, montage, vidéo, animation, dessin, motion design, jeux vidéo, game design, level design, 3D, scénario, tshirt, product design" />
	<link rel="icon" type="image/png" href="logo.png" />
	
	<link rel="stylesheet" href="css/reset.css"/>
	<link rel="stylesheet" href="css/style.css"/>
	<link rel="stylesheet" href="css/titre.css"/>
	<link rel="stylesheet" href="css/menu.css"/>
	<link rel="stylesheet" href="css/hobby.css"/>
	<link rel="stylesheet" href="css/contact.css"/>
	
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">

	<script src="https://kit.fontawesome.com/554aedc2db.js" crossorigin="anonymous"></script>
	
	<title>Quentin Gautier - Game Designer et Infographiste - Portfolio</title>

	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-54516992-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-54516992-1');
	</script>

</head>

<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PPGGRDF"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<div class="topnav">
<img style="width: 50px; float: left; margin: 7px 10px 0px 10px" src="img/logo.png">
<a id ="QG" href="#Ancre0"><strong>QUENTIN GAUTIER - GRAPHIC & GAME DESIGNER</strong></a>
<a href="#Ancre3">CONTACT</a>
<a href="#Ancre2">RÉALISATIONS</a>
<a href="#Ancre1">PROFIL</a>
  
</div>	

<header id="Ancre0" class="section">


	
<footer id="Ancre3" class="section">

<div class="content">

	<div class="wrapper">
		
		<div class="contactTitre">Contactez moi !</div>
		
		<form method="post" class="form">
			<input required type="text" name="nom" class="name field-in font" placeholder="Votre Nom"/>
			<input required type="text" name="email" class="email field-in font" placeholder="Votre Mail"/>
			<textarea required name="message" class="message field-in font" placeholder="Votre Message"></textarea> 
			<input class="submit font" type="submit" name="submit" value="Envoyer"/>
		</form>
		<?php
    // S'il y des données de postées
    if ($_SERVER["REQUEST_METHOD"]=="POST") {
     
      // Variables concernant l'email
     
      $destinataire = "quentin.gautier0408@gmail.com"; // Adresse email du webmaster (à personnaliser)

		$headers .= "From: " . $_POST["email"] . "\r\n";
      // Pour envoyer un email HTML, l'en-tête Content-type doit être défini
      $contenu =  "Message envoyé depuis la page Contact
        Nom :" . $_POST["nom"] . "
        Email :" . $_POST["email"] . "
        Message :" . $_POST["message"] ."";
		
     
      // Envoyer l'email
      $retour = mail($destinataire, $headers, $contenu); // Fonction principale qui envoi l'email
		if($retour) {
            echo "<p>Votre message a bien été envoyé.</p>";
        }
	}
    ?>
		<div class="shadow"></div>

	</div>

<div class="footer">
<p><i class="fab fa-linkedin"></i>&nbsp;<a href="https://www.linkedin.com/in/quentin-gautier-0408/" target="_blank">LinkedIn</a>
&nbsp;&nbsp;
<i class="fab fa-instagram"></i>&nbsp;<a href="https://www.instagram.com/gautier.asakim.quentin/?hl=fr" target="_blank">instagram</a>
&nbsp;&nbsp;
<i class="fas fa-at"></i>&nbsp;<a href="mailto:quentin.gautier0408@gmail.com" target="_blank">Mail</a>
</p>
</div>

</div>
	
</footer>
	
</body>
</html>
