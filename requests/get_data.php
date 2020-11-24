<?php
/**
 * Created by PhpStorm.
 * User: Юра
 * Date: 22.11.2020
 * Time: 17:19
 */

use classes\request;
use classes\data;

require '../classes/request.php';
require '../classes/data.php';

$request = new request();
$data = $request->getData();
$id = $_POST['id'];
$type = $_POST['type'];

$data = data::getResult($data,$type,$id);
echo json_encode($data);