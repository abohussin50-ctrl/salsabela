<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "ahm13112010@gmail.com";  // البريد الذي ستصلك عليه الرسائل
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    $subject = "New message from Salsabela Contact Form";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('✅ Message sent successfully!'); window.history.back();</script>";
    } else {
        echo "<script>alert('❌ Failed to send message. Please try again later.'); window.history.back();</script>";
    }
} else {
    header("Location: contact.html");
    exit;
}
?>
