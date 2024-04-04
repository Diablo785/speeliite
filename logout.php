<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

$_SESSION = array();

session_destroy();

$response = ['success' => true, 'message' => 'Logout successful'];
echo json_encode($response);
?>
