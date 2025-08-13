<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON input
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if (!$data || !isset($data['email']) || !isset($data['recipient_email'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Email and recipient email are required']);
        exit;
    }
    
    $user_email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $recipient_email = filter_var($data['recipient_email'], FILTER_SANITIZE_EMAIL);
    
    if (!filter_var($user_email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format']);
        exit;
    }
    
    if (!filter_var($recipient_email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid recipient email format']);
        exit;
    }
    
    // Email content
    $subject = 'New Email Subscription from Coming Soon Page';
    $message = "A new user has subscribed for notifications:\n\n";
    $message .= "Email: " . $user_email . "\n";
    $message .= "Timestamp: " . date('Y-m-d H:i:s') . "\n";
    $message .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    // Email headers
    $headers = array(
        'From: noreply@comingsoon.app',
        'Reply-To: noreply@comingsoon.app',
        'X-Mailer: PHP/' . phpversion()
    );
    
    // Send email
    if (mail($recipient_email, $subject, $message, implode("\r\n", $headers))) {
        echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send email']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>