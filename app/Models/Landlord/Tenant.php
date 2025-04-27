<?php

namespace App\Models\Landlord;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Spatie\Multitenancy\Models\Tenant as ModelsTenant;

class Tenant extends ModelsTenant
{
    protected $table = 'tenants';
    protected $fillable = [
        'id',
        'name',
        'slug',
        'domain',
        'database',
    ];

    protected static function booted()
    {
        static::creating(function (Tenant $tenant) {
            $tenant->createDatabase();
        });
    }

    public function createDatabase()
    {
        DB::statement("CREATE DATABASE IF NOT EXISTS {$this->database}");
    }

    public function setNameAttribute($value)
    {
        $slug = Str::slug($value);


        $this->attributes['name'] = $value;
        $this->attributes['slug'] = $slug;
        $this->attributes['database'] = env('DB_TENANT_PREFIX') . '_' . time();
    }

    public function scopeIdOrSlug(Builder $query, string $identifier)
    {
        return $query->where('id', $identifier)
            ->orWhere('slug', $identifier);
    }
}
