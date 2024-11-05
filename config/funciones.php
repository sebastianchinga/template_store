<?php

function debuguear($codigo) {
    echo '<pre>';
    var_dump($codigo);
    echo '</pre>';
}

function s($html) {
    $s = htmlspecialchars($html);
    return $s;
}

