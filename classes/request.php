<?php
/**
 * Created by PhpStorm.
 * User: Юра
 * Date: 20.11.2020
 * Time: 23:37
 */

namespace classes;

class request
{
    public $path;

    public function __construct()
    {
        $this->path = require '../configs/path.php';
    }

    public function getData()
    {
        return file_get_contents($this->path);
    }
}