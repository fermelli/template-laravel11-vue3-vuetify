
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Restablecer contraseña</title>
    <style type="text/css">
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
        }
        
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .email-header {
            background-color: #121B22;
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        
        .email-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 500;
        }
        
        .email-body {
            padding: 30px;
        }
        
        .email-body p {
            margin-bottom: 20px;
            font-size: 16px;
        }
        
        .reset-button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #128C7E;
            color: white !important;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            margin: 20px 0;
            text-align: center;
        }
        
        .email-footer {
            background-color: #f1f1f1;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666666;
            border-top: 1px solid #e1e1e1;
        }
        
        .email-footer p {
            margin: 5px 0;
        }
        
        @media screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Restablecimiento de contraseña</h1>
        </div>
        
        <div class="email-body">
            <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
            <p>Haz clic en el siguiente botón para crear una nueva contraseña:</p>
            
            <a href="{{ $urlRestablecimientoPassword }}" class="reset-button">Restablecer contraseña</a>
            
            <p>Si no solicitaste este cambio, puedes ignorar este correo con toda seguridad.</p>
            <p>El enlace de restablecimiento expirará en {{ config('auth.passwords.users.expire') }} minutos.</p>
        </div>
        
        <div class="email-footer">
            <p>&copy; {{ date('Y') }} {{ env('APP_NAME') }} | Todos los derechos reservados.</p>
            <p>Este es un correo automático, por favor no respondas.</p>
            <p>
                <small>
                    Si tienes alguna pregunta, contáctanos en 
                    <a href="mailto:{{ env('MAIL_FROM_ADDRESS') }}" style="color: #3498db;">{{ env('MAIL_FROM_ADDRESS') }}</a>.
                </small>
            </p>
        </div>
    </div>
</body>
</html>