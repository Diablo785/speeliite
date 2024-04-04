<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'db.php';

class Register extends DB {
    public function userRegister($username, $password, $email) {
        $username = $this->conn->real_escape_string($username);
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);
        $email = $this->conn->real_escape_string($email);

        // Check if username is already taken
        $checkSql = "SELECT id FROM user WHERE username=?";
        $checkStmt = $this->conn->prepare($checkSql);
        $checkStmt->bind_param("s", $username);
        $checkStmt->execute();
        $checkResult = $checkStmt->get_result();

        if ($checkResult->num_rows > 0) {
            $checkStmt->close();
            return json_encode(['success' => false, 'message' => 'Username already taken']);
        }

        // Insert new user
        $sql = "INSERT INTO user (username, password, email) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sss", $username, $passwordHash, $email);

        if ($stmt->execute()) {
            $stmt->close();
            return json_encode(['success' => true, 'message' => 'Registration successful']);
        } else {
            $stmt->close();
            return json_encode(['success' => false, 'message' => 'Registration failed']);
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $register = new Register();
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';

    try {
        echo $register->userRegister($username, $password, $email);
    } catch (Exception $e) {
        $response = ['success' => false, 'message' => 'Error during registration'];
        echo json_encode($response);
    }
}
?>
