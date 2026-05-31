<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Plateforme extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
    ];

    public function jeux(): BelongsToMany
    {
        return $this->belongsToMany(Jeu::class, 'jeu_plateforme');
    }
}
