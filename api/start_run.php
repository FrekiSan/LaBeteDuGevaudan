<?php
require_once __DIR__.'/auth.php';
header('Content-Type: application/json');
$uid = require_auth();


// Crée un run si aucun en cours, sinon reprend
global $pdo;
$stmt = $pdo->prepare('SELECT id, current_start_at FROM game_runs WHERE user_id=? AND is_completed=0');
$stmt->execute([$uid]);
if ($r = $stmt->fetch()) {
if (!$r['current_start_at']) {
$pdo->prepare('UPDATE game_runs SET current_start_at=NOW() WHERE id=?')->execute([$r['id']]);
}
json_out(['ok'=>true, 'run_id'=>(int)$r['id']]);
} else {
$pdo->prepare('INSERT INTO game_runs(user_id, current_start_at) VALUES(?, NOW())')->execute([$uid]);
$id = (int)$pdo->lastInsertId();
json_out(['ok'=>true, 'run_id'=>$id]);
}