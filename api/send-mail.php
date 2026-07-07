<?php
/**
 * Soufia Clinic – Booking Form Email Handler
 * Sends confirmation to patient + notification to admin.
 * Requires: composer require phpmailer/phpmailer
 */

declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// ─── Load PHPMailer ────────────────────────────────────────────────────────────
// Works both in the real project (vendor one level up) and in XAMPP (vendor next to api/)
$autoload = file_exists(__DIR__ . '/../vendor/autoload.php')
    ? __DIR__ . '/../vendor/autoload.php'
    : __DIR__ . '/vendor/autoload.php';
require_once $autoload;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ─── Load .env (simple key=value parser, no external dependency) ─────────────
function loadEnv(string $path): void
{
    if (!file_exists($path)) {
        return;
    }
    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
            continue;
        }
        [$key, $value] = explode('=', $line, 2);
        $key   = trim($key);
        $value = trim(trim($value), '"\'');
        if (getenv($key) === false) {
            putenv("{$key}={$value}");
        }
    }
}
$envPath = file_exists(__DIR__ . '/../.env') ? __DIR__ . '/../.env' : __DIR__ . '/.env';
loadEnv($envPath);

// ─── SMTP Configuration ────────────────────────────────────────────────────────
$smtpHost     = getenv('SMTP_HOST')      ?: 'smtp.gmail.com';
$smtpPort     = (int)(getenv('SMTP_PORT') ?: 587);
$smtpUser     = getenv('SMTP_USER')      ?: '';
$smtpPass     = getenv('SMTP_PASS')      ?: '';
$smtpFrom     = getenv('SMTP_FROM')      ?: $smtpUser;
$smtpFromName = getenv('SMTP_FROM_NAME') ?: 'Soufia Clinic';
$adminEmails  = array_filter(array_map('trim', explode(',', getenv('ADMIN_EMAIL') ?: $smtpUser)));

if (!$smtpUser || !$smtpPass) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'SMTP not configured: missing .env with SMTP_USER/SMTP_PASS']);
    exit;
}

// ─── Parse & sanitize input ────────────────────────────────────────────────────
$raw = json_decode(file_get_contents('php://input'), true);
if (!$raw) {
    $raw = $_POST;
}

$name      = trim(strip_tags($raw['name']    ?? ''));
$email     = trim(strip_tags($raw['email']   ?? ''));
$phone     = trim(strip_tags($raw['phone']   ?? ''));
$message   = trim(strip_tags($raw['message'] ?? ''));
$bookingId = 'SOUFIA-' . strtoupper(substr(md5(uniqid()), 0, 8));
$date      = date('d F Y – H:i');

// Basic validation
$errors = [];
if (!$name)                    $errors[] = 'Name is required';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required';
if (!$phone)                   $errors[] = 'Phone is required';

if ($errors) {
    http_response_code(422);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// ─── Helper: create mailer instance ───────────────────────────────────────────
function makeMailer(string $host, int $port, string $user, string $pass, string $from, string $fromName): PHPMailer
{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = $host;
    $mail->SMTPAuth   = true;
    $mail->Username   = $user;
    $mail->Password   = $pass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $port;
    $mail->setFrom($from, $fromName);
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    return $mail;
}

// ─── Email Templates ───────────────────────────────────────────────────────────

function patientEmailTemplate(string $name, string $bookingId, string $date, string $phone, string $email, string $message): string
{
    $msgRow = $message ? "<tr><td class=\"label\">Message</td><td class=\"value\">" . nl2br(htmlspecialchars($message)) . "</td></tr>" : '';
    return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Helvetica Neue',Arial,sans-serif;background:#f4f6fb;color:#222}
  .wrap{max-width:620px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,.10)}
  .header{background:linear-gradient(135deg,#B11E76 0%,#066AAB 100%);padding:44px 40px 36px;text-align:center}
  .header img{width:56px;height:56px;margin-bottom:16px}
  .logo-text{font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.5px}
  .logo-sub{font-size:11px;color:rgba(255,255,255,.75);letter-spacing:3px;text-transform:uppercase;margin-top:4px}
  .badge{display:inline-block;background:rgba(255,255,255,.18);color:#fff;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:6px 16px;border-radius:99px;margin-top:20px}
  .body{padding:40px 40px 32px}
  .greeting{font-size:22px;font-weight:700;color:#111;margin-bottom:8px}
  .intro{font-size:15px;color:#555;line-height:1.7;margin-bottom:28px}
  .booking-card{background:#f8f9ff;border:2px solid #e8eaf6;border-radius:12px;padding:24px 28px;margin-bottom:28px}
  .booking-id{font-size:11px;font-weight:800;color:#B11E76;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px}
  .booking-number{font-size:24px;font-weight:800;color:#066AAB;letter-spacing:1px}
  table.details{width:100%;border-collapse:collapse;margin-top:20px}
  table.details td{padding:10px 0;border-bottom:1px solid #eee;font-size:14px}
  table.details td.label{color:#888;font-weight:600;width:110px}
  table.details td.value{color:#222;font-weight:500}
  table.details tr:last-child td{border-bottom:none}
  .steps{margin:28px 0}
  .steps h3{font-size:14px;font-weight:700;color:#333;margin-bottom:14px;text-transform:uppercase;letter-spacing:.5px}
  .step{display:flex;align-items:flex-start;gap:14px;margin-bottom:12px}
  .step-num{width:28px;height:28px;border-radius:50%;background:#B11E76;color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .step-text{font-size:13px;color:#555;line-height:1.6;padding-top:4px}
  .cta{text-align:center;margin:32px 0 8px}
  .cta a{display:inline-block;background:#25D366;color:#fff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;letter-spacing:.3px}
  .footer-note{font-size:12px;color:#aaa;text-align:center;margin-top:28px;padding-top:20px;border-top:1px solid #f0f0f0;line-height:1.8}
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div class="logo-text">Soufia Clinic</div>
    <div class="logo-sub">Dental Care &amp; Aesthetics · Istanbul</div>
    <div class="badge">✓ Booking Confirmed</div>
  </div>
  <div class="body">
    <div class="greeting">Hello, {$name}!</div>
    <div class="intro">
      Thank you for choosing <strong>Soufia Clinic</strong>. Your consultation request has been successfully received.
      Our team will contact you within <strong>24 hours</strong> to confirm your appointment and provide your personalised treatment plan.
    </div>
    <div class="booking-card">
      <div class="booking-id">Booking Reference</div>
      <div class="booking-number">{$bookingId}</div>
      <table class="details">
        <tr><td class="label">Patient</td><td class="value">{$name}</td></tr>
        <tr><td class="label">Email</td><td class="value">{$email}</td></tr>
        <tr><td class="label">Phone</td><td class="value">{$phone}</td></tr>
        <tr><td class="label">Date</td><td class="value">{$date}</td></tr>
        {$msgRow}
      </table>
    </div>
    <div class="steps">
      <h3>What Happens Next?</h3>
      <div class="step"><div class="step-num">1</div><div class="step-text"><strong>Our team reviews your request</strong> and prepares a personalised treatment plan for you.</div></div>
      <div class="step"><div class="step-num">2</div><div class="step-text"><strong>We contact you within 24 hours</strong> via phone or email to confirm your appointment date.</div></div>
      <div class="step"><div class="step-num">3</div><div class="step-text"><strong>Begin your smile journey</strong> — we arrange hotel, VIP transfers, and your full clinic visit itinerary.</div></div>
    </div>
    <div class="cta">
      <a href="https://wa.me/905550000000">💬 &nbsp; Chat with Us on WhatsApp</a>
    </div>
  </div>
  <div class="footer-note">
    Soufia Clinic · Istanbul, Turkey · info@soufia-clinic.com<br>
    This is an automated confirmation. Please do not reply directly to this email.
  </div>
</div>
</body>
</html>
HTML;
}

function adminEmailTemplate(string $name, string $email, string $phone, string $message, string $bookingId, string $date): string
{
    $msgRow = $message ? "<tr><td class=\"label\">Message</td><td class=\"value\">" . nl2br(htmlspecialchars($message)) . "</td></tr>" : "<tr><td class=\"label\">Message</td><td class=\"value\" style=\"color:#aaa\">—</td></tr>";
    return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Helvetica Neue',Arial,sans-serif;background:#f0f2f5;color:#222}
  .wrap{max-width:580px;margin:32px auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
  .header{background:#111;padding:28px 36px;display:flex;align-items:center;gap:16px}
  .header-dot{width:12px;height:12px;border-radius:50%;background:#B11E76;flex-shrink:0}
  .header-title{color:#fff;font-size:18px;font-weight:700}
  .header-sub{color:#888;font-size:12px;margin-top:2px}
  .alert-bar{background:#B11E76;color:#fff;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:10px 36px;display:flex;align-items:center;gap:8px}
  .body{padding:32px 36px}
  .booking-ref{font-size:11px;font-weight:800;color:#666;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px}
  .booking-id{font-size:22px;font-weight:800;color:#066AAB;margin-bottom:24px}
  table.details{width:100%;border-collapse:collapse}
  table.details td{padding:12px 0;border-bottom:1px solid #f0f0f0;font-size:14px;vertical-align:top}
  table.details td.label{color:#999;font-weight:700;width:120px;text-transform:uppercase;font-size:11px;letter-spacing:.5px;padding-top:14px}
  table.details td.value{color:#111;font-weight:500;font-size:15px}
  table.details tr:last-child td{border-bottom:none}
  .actions{margin-top:28px;display:flex;gap:12px;flex-wrap:wrap}
  .btn{display:inline-block;padding:12px 24px;border-radius:8px;font-size:13px;font-weight:700;text-decoration:none}
  .btn-wa{background:#25D366;color:#fff}
  .btn-mail{background:#066AAB;color:#fff}
  .footer{background:#f8f8f8;padding:16px 36px;font-size:11px;color:#aaa;border-top:1px solid #eee}
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div class="header-dot"></div>
    <div>
      <div class="header-title">Soufia Clinic — Admin Panel</div>
      <div class="header-sub">New Consultation Request</div>
    </div>
  </div>
  <div class="alert-bar">🔔 &nbsp; New Booking — Requires Your Attention</div>
  <div class="body">
    <div class="booking-ref">Booking Reference</div>
    <div class="booking-id">{$bookingId}</div>
    <table class="details">
      <tr><td class="label">Full Name</td><td class="value">{$name}</td></tr>
      <tr><td class="label">Email</td><td class="value"><a href="mailto:{$email}" style="color:#066AAB">{$email}</a></td></tr>
      <tr><td class="label">Phone</td><td class="value"><a href="tel:{$phone}" style="color:#066AAB">{$phone}</a></td></tr>
      <tr><td class="label">Submitted</td><td class="value">{$date}</td></tr>
      {$msgRow}
    </table>
    <div class="actions">
      <a href="https://wa.me/{$phone}" class="btn btn-wa">💬 WhatsApp Patient</a>
      <a href="mailto:{$email}" class="btn btn-mail">✉ Reply by Email</a>
    </div>
  </div>
  <div class="footer">Soufia Clinic Admin · Automated Notification · Do not forward this email.</div>
</div>
</body>
</html>
HTML;
}

// ─── Send emails ───────────────────────────────────────────────────────────────
$sent = ['patient' => false, 'admin' => false];
$errs = [];

// 1. Patient confirmation
try {
    $mail = makeMailer($smtpHost, $smtpPort, $smtpUser, $smtpPass, $smtpFrom, $smtpFromName);
    $mail->addAddress($email, $name);
    $mail->Subject = "✅ Booking Confirmed – {$bookingId} | Soufia Clinic";
    $mail->Body    = patientEmailTemplate($name, $bookingId, $date, $phone, $email, $message);
    $mail->AltBody = "Hello {$name}, your booking {$bookingId} is confirmed. We will contact you within 24 hours. – Soufia Clinic";
    $mail->send();
    $sent['patient'] = true;
} catch (Exception $e) {
    $errs[] = 'Patient email: ' . $e->getMessage();
}

// 2. Admin notification (sent to every configured admin mailbox)
try {
    $mail = makeMailer($smtpHost, $smtpPort, $smtpUser, $smtpPass, $smtpFrom, $smtpFromName);
    foreach ($adminEmails as $adminEmail) {
        $mail->addAddress($adminEmail, 'Soufia Clinic Admin');
    }
    $mail->Subject = "🔔 New Booking {$bookingId} – {$name}";
    $mail->Body    = adminEmailTemplate($name, $email, $phone, $message, $bookingId, $date);
    $mail->AltBody = "New booking from {$name} ({$email}, {$phone}). ID: {$bookingId}";
    $mail->send();
    $sent['admin'] = true;
} catch (Exception $e) {
    $errs[] = 'Admin email: ' . $e->getMessage();
}

// ─── Response ─────────────────────────────────────────────────────────────────
$allSent = $sent['patient'] && $sent['admin'];
http_response_code($allSent ? 200 : 207);
echo json_encode([
    'success'    => $allSent,
    'booking_id' => $bookingId,
    'sent'       => $sent,
    'errors'     => $errs,
]);
