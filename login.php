<?php
session_start();

require_once 'db.php';

class Login {
    private $db;

    public function __construct() {
        $this->db = new DB();
    }

    public function loginUser($username, $password) {
        $conn = $this->db->conn;

        $username = $conn->real_escape_string($username);

        $query = "SELECT id, username, password FROM users WHERE username='$username'";
        $result = $conn->query($query);

        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $dbHashedPassword = $row['password'];

            // Verify the hashed password
            if (password_verify($password, $dbHashedPassword)) {
                // Password matches, login successful
                $_SESSION['user_id'] = $row['id'];
                $_SESSION['username'] = $row['username'];
                // Return user data along with success message
                return json_encode(array("success" => true, "message" => "Login successful", "userData" => $row));
            } else {
                // Password does not match
                return json_encode(array("success" => false, "message" => "Invalid password"));
            }
        } else {
            // User not found
            return json_encode(array("success" => false, "message" => "Invalid username"));
        }
    }
}

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = new Login();

    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['username']) && isset($data['password'])) {
        $username = $data['username'];
        $password = $data['password'];

        echo $login->loginUser($username, $password);
    } else {
        http_response_code(400);
        echo json_encode(array("success" => false, "message" => "Username or password not provided"));
    }
} else {
    http_response_code(405);
    echo json_encode(array("success" => false, "message" => "Invalid request method"));
}
?>
