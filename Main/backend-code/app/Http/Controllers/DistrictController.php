<?php

namespace App\Http\Controllers;

use App\Models\District;
use Exception;

class DistrictController extends Controller{


    public function getDistricts()
    {
    try{
        $districts = District::all();
        // return response()->json($districts);
        // 
        $array = array(
            "foo" => "bar",
            "bar" => "foo",
        );
        return response()->json($districts);
    } catch (Exception $e) {
            echo $e;
            return response()->json($e);
    }
        
    }
}
