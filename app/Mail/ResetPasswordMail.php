<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable;
    use SerializesModels;

    public string $email;
    public string $urlRestablecimientoPassword;

    /**
     * Create a new message instance.
     */
    public function __construct(string $email, string $urlRestablecimientoPassword)
    {
        $this->email = $email;
        $this->urlRestablecimientoPassword = $urlRestablecimientoPassword;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            to: $this->email,
            from: config('mail.from.address'),
            subject: 'Restablecimiento de contraseña',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.reset_password',
            with: [
                'urlRestablecimientoPassword' => $this->urlRestablecimientoPassword,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
