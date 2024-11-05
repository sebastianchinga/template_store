<?php

use Controllers\HomeController;
use MVC\Router;

require __DIR__ . '/../config/app.php';

$router = new Router;

$router->get('/', [HomeController::class, 'index']);

$router->comprobarRutas();