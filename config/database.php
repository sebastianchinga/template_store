<?php

function conectarDB(): mysqli {
    $db = new mysqli('localhost', 'root', 'root', 'template_store');
    if (!$db) {
        echo 'NO HAY CONECCION';
    }

    return $db;
}