<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'db.php';

class Login extends DB {
    public function userLogin($username, $password) {
        $username = $this->conn->real_escape_string($username);

        $sql = "SELECT * FROM user WHERE username=?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $username);

        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $dbHashedPassword = $row['password'];

            // Update this line to use password_verify directly
            if (password_verify($password, $dbHashedPassword)) {
                $_SESSION['user_id'] = $row['id'];
                $_SESSION['username'] = $row['username'];
                $_SESSION['email'] = $row['email'];
                
                $response = [
                    'success' => true,
                    'message' => 'Login successful',
                    'id' => $row['id'],
                    'username' => $row['username'],
                    'email' => $row['email'],
                    'sessionId' => session_id(),
                ];
            } else {
                $response = ['success' => false, 'message' => 'Invalid password'];
            }
        } else {
            $response = ['success' => false, 'message' => 'Invalid username or password'];
        }

        $stmt->close();

        error_log(print_r($_SESSION, true));

        return json_encode($response);
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = new Login();
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    try {
        echo $login->userLogin($username, $password);
    } catch (Exception $e) {
        $response = ['success' => false, 'message' => 'Error during login: ' . $e->getMessage()];
        echo json_encode($response);
    }
}
?>
