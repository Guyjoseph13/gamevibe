<?php

return [
    'paths' => ['api/*'],

    // F3 : seules les méthodes réellement utilisées par l'API
    'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    // F3 : origines réduites au strict nécessaire (dev local + production)
    'allowed_origins' => [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:8090',
        'http://127.0.0.1',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5173',
        'https://remarkable-generosity-production.up.railway.app',
        'https://gamevibe-production-98f7.up.railway.app',
    ],

    'allowed_origins_patterns' => [],

    // F3 : en-têtes limités à ceux dont le front a besoin
    'allowed_headers' => ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],

    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
