<?php
/**
 * Created by PhpStorm.
 * User: Юра
 * Date: 23.11.2020
 * Time: 1:03
 */

namespace classes;
use DateTime;

class data
{
    const COLORS = ['Земля'=>'brown','Вода' => 'blue', 'Огонь' => 'orange'];

    public static function getResult($data,$type,$id)
    {
        switch ($type) {
            case 'List':
                return self::prepareList(json_decode($data,true));
                break;
            case 'Tariff':
                return self::prepareTariff(json_decode($data,true),$id);
                break;
            case 'Time':
                return self::prepareTime(json_decode($data,true),$id);
                break;
        }
    }

    private static function prepareList($data)
    {
        foreach ($data['tarifs'] as $key => $value) {
            $result[$key]['title'] = $value['title'];
            $result[$key]['speed'] = $value['speed'];
            $result[$key]['link'] = $value['link'];
            $result[$key]['free_options'] = $value['free_options'];
            $result[$key]['price'] = self::preparePrice($value['tarifs']);
            $result[$key]['color'] = self::findColor($value['title']);
        }
        return $result;
    }

    private static function prepareTariff($data,$id)
    {
        $data = $data['tarifs'][$id]['tarifs'];
        usort($data, function($a, $b){
            return ($a['ID'] - $b['ID']);
        });
        $maxPrice = $data[0]['price'] / $data[0]['pay_period'];
        foreach ($data as $key => $value){
            $result[$key] = $value;
            $result[$key]['price_month'] = $value['price'] / $value['pay_period'];
            $result[$key]['discount'] = ($maxPrice - $result[$key]['price_month']) * $value['pay_period'];
        }
        return $result;
    }

    private static function prepareTime($data,$id)
    {
        foreach ($data['tarifs'] as $key => $value)
        {
            usort($value['tarifs'], function($a, $b){
                return ($a['ID'] - $b['ID']);
            });
            foreach ($value['tarifs'] as $key2 => $value2)
            {
                if ($id == $value2['ID']) {
                    $result = $value2;
                    $result['prev_id'] = $key;
                    $result['date'] = self::getDate($value2['new_payday']);
                    $result['title'] = $value['tarifs'][0]['title'];
                    $result['price_month'] = $value2['price'] / $value2['pay_period'];
                    return $result;
                }
            }
        }
    }

    private static function getDate($date)
    {
        $now = time();
        $array = explode('+',$date);
        return date('d.m.y',$array[0]);
    }

    private static function preparePrice($value)
    {
        $maxPrice = $value[0]['price'] / $value[0]['pay_period'];
        $minPrice = $value[count($value)-1]['price'] /  $value[count($value)-1]['pay_period'];
        return $minPrice. ' - '. $maxPrice;
    }

    private static function findColor($title)
    {
        foreach (self::COLORS as $key => $value)
        {
            if (strpos($title,$key) !== false) {
                return $value;
            }
        }
    }
}