<?php
// api/logout.php
require_once __DIR__.'/db.php'; // pour récupérer la config de session si besoin
header('Content-Type: application/json');

// Démarre la session si pas déjà
if (session_status() !== PHP_SESSION_ACTIVE) {
  @session_start();
}

// Vide la session
$_SESSION = [];

// Efface le cookie de session (nom défini dans env.php → EGSESSID)
$cookieName = session_name();
if (isset($_COOKIE[$cookieName])) {
  // Signature compatible PHP 7/8
  setcookie($cookieName, '', time() - 3600, '/');
}

// Détruit la session serveur
@session_destroy();

// Réponse OK
echo json_encode(['ok' => true]);
