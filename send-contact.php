<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    exit("Forbidden");
}

// Sanitize inputs
$name    = htmlspecialchars(trim($_POST['name']));
$email   = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars(trim($_POST['subject']));
$message = htmlspecialchars(trim($_POST['message']));

// Validate
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    exit("All fields are required.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit("Invalid email address.");
}

// Email configuration
$to = "contact@oblion-e.com";
$email_subject = "[Oblion.E Contact] " . $subject;

$email_body = "
New message from Oblion.E contact form

Name: $name
Email: $email

Message:
$message
";

$headers = "From: Oblion.E <no-reply@oblion-e.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8";

// Send email
if (mail($to, $email_subject, $email_body, $headers)) {
    echo "Votre email a ete envoyee avec success";
} else {
    echo "error lors de l'envoie de mail";
}
