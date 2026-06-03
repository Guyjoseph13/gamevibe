<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Avis;
use App\Models\Categorie;
use App\Models\Jeu;
use App\Models\Plateforme;
use App\Models\User;

class AdminStatsController extends Controller
{
    public function index()
    {
        return response()->json([
            'totalJeux' => Jeu::count(),
            'totalUsers' => User::count(),
            'totalAvis' => Avis::count(),
            'totalPlateformes' => Plateforme::count(),
            'totalCategories' => Categorie::count(),
        ]);
    }
}
