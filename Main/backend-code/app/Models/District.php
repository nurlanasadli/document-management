<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use App\Traits\Uuids;

class District extends Model
{
    use HasFactory, SoftDeletes;
    use Notifiable, Uuids;

    protected $table = 'districts'; // Assuming your table name is 'districts'
    protected $primaryKey = 'id';
    public $timestamps = false;
    public $incrementing = true; // Assuming your primary key is not auto-incrementing
    protected $fillable = ['name', 'code'];

    protected static function boot()
    {
        parent::boot();

        // static::creating(function ($model) {
        //     $userId = Auth::parseToken()->getPayload()->get('userId');
        //     $model->createdBy = $userId;
        //     $model->modifiedBy = $userId;
        //     $model->setAttribute($model->getKeyName(), Uuid::uuid4());
        // });

        // static::updating(function ($model) {
        //     $userId = Auth::parseToken()->getPayload()->get('userId');
        //     $model->modifiedBy = $userId;
        // });

        // static::addGlobalScope('isDeleted', function ($builder) {
        //     $builder->where('isDeleted', 0);
        // });
    }
}
