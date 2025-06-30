<?php

namespace App\Repositories\Implementation;

use App\Models\District;
use App\Repositories\Implementation\BaseRepository;


//use Your Model

/**
 * Class ScreenRepository.
 */
class DistrictRepository extends BaseRepository
{
      /**
     * @var Model
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param Model $modelj
     */
    public static function model()
    {
        return District::class;
    }

}
