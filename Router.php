<?php

namespace MVC;

class Router {

    protected $rutasGET = [];
    protected $rutasPOST = [];

    public function get($url, $fn) {
        $this->rutasGET[$url] = $fn;
    }

    public function post($url, $fn) {
        $this->rutasPOST[$url] = $fn;
    }

    public function comprobarRutas() {
        $urlActual = $_SERVER['PATH_INFO'] ?? '/';
        $metodo = $_SERVER['REQUEST_METHOD'];

        if ($metodo === 'GET') {
            $fn = $this->rutasGET[$urlActual] ?? null;
        } else {
            $fn = $this->rutasPOST[$urlActual] ?? null;
        }

        if ($fn) {
            call_user_func($fn, $this);
        } else {
            echo 'Página no encontrada';
        }
    }

    public function render($datos = [], $view) {
        foreach ($datos as $key => $value) {
            $$key = $value;
        }

        ob_start();
        include __DIR__ . "/views/$view";
        $contenido = ob_get_clean();
        include __DIR__ . '/views/index.php';

    }
}