<?php
namespace App\Service;

final class SessionSigner
{
    public function __construct(string $secret = '')
    {
        // placeholder
    }

    public function sign(string $value): string
    {
        return hash_hmac('sha256', $value, 'placeholder');
    }
}
