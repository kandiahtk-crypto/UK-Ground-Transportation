<?php
// send-quote.php

$to = "info@ukinboundgroundtransport.com";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  exit("Method not allowed");
}

function clean_one_line($v) {
  $v = trim($v ?? "");
  // Prevent header injection
  return str_replace(["\r", "\n"], " ", $v);
}

function clean_multi_line($v) {
  $v = trim($v ?? "");
  // Keep new lines but remove null bytes
  return str_replace("\0", "", $v);
}

// Honeypot anti-spam: if filled, silently accept but do nothing
$honeypot = clean_one_line($_POST["website"] ?? "");
if ($honeypot !== "") {
  header("Location: thank-you.html");
  exit;
}

// Fields (match your HTML exactly)
$company = clean_one_line($_POST["company"] ?? "");
$contact = clean_one_line($_POST["contact"] ?? "");
$email   = clean_one_line($_POST["email"] ?? "");
$phone   = clean_one_line($_POST["phone"] ?? "");

$service = clean_one_line($_POST["service"] ?? "");
$dates   = clean_one_line($_POST["dates"] ?? "");
$time    = clean_one_line($_POST["time"] ?? "");

$pickup  = clean_one_line($_POST["pickup"] ?? "");
$dropoff = clean_one_line($_POST["dropoff"] ?? "");

$pax     = clean_one_line($_POST["pax"] ?? "");
$luggage = clean_one_line($_POST["luggage"] ?? "");
$vehicle = clean_one_line($_POST["vehicle"] ?? "");

$notes   = clean_multi_line($_POST["notes"] ?? "");

// Basic validation (same "required" as your form)
if ($company === "" || $contact === "" || $email === "" || $service === "" || $dates === "" || $pickup === "" || $dropoff === "" || $pax === "") {
  http_response_code(400);
  exit("Missing required fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  exit("Invalid email address.");
}

// Subject + message
$subject = "New quote request — " . ($company ?: "UK Inbound Ground Transport");

$body = "New quote request received:\n\n"
  . "Company: {$company}\n"
  . "Contact: {$contact}\n"
  . "Email: {$email}\n"
  . "Phone/WhatsApp: {$phone}\n\n"
  . "Service type: {$service}\n"
  . "Date(s): {$dates}\n"
  . "Pickup time(s): {$time}\n\n"
  . "Pickup: {$pickup}\n"
  . "Drop-off: {$dropoff}\n\n"
  . "Passengers: {$pax}\n"
  . "Luggage: {$luggage}\n"
  . "Vehicle preference: {$vehicle}\n\n"
  . "Notes / itinerary summary:\n{$notes}\n\n"
  . "----\n"
  . "IP: " . ($_SERVER["REMOTE_ADDR"] ?? "unknown") . "\n"
  . "User-Agent: " . ($_SERVER["HTTP_USER_AGENT"] ?? "unknown") . "\n";

$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

// Important: From should be your domain (deliverability)
$headers[] = "From: UK Inbound Ground Transport <no-reply@ukinboundgroundtransport.com>";
$headers[] = "Reply-To: " . $contact . " <" . $email . ">";

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
  header("Location: thank-you.html");
  exit;
}

http_response_code(500);
echo "Mail failed to send. Your hosting server may not have PHP mail configured.";
