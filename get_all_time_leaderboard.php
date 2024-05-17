<?php
include 'db.php';

// Check if the request is a GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $db = new DB();
    $conn = $db->conn;

    // Fetch all-time leaderboard with usernames
    $sql = "SELECT users.username, scores.score 
            FROM scores 
            JOIN users ON scores.user_id = users.id 
            ORDER BY score DESC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $allTimeLeaderboard = [];
        while($row = $result->fetch_assoc()) {
            $allTimeLeaderboard[] = $row;
        }
        echo json_encode($allTimeLeaderboard);
    } else {
        echo json_encode([]);
    }
    $conn->close();
} else {
    // Invalid request method
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
