<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Jeu;
use App\Models\Avis;
use Illuminate\Database\Seeder;

class ChargeSeeder extends Seeder
{
    public function run(): void
    {
        // 1000 utilisateurs de test
        User::factory()->count(1000)->create();

        $userIds = User::pluck('id')->all();
        $jeux    = Jeu::pluck('id')->all();

        $total = 0;
        foreach ($jeux as $jeuId) {
            // 30 avis par jeu, chacun d'un utilisateur distinct (contrainte unique user+jeu)
            $sample = collect($userIds)->shuffle()->take(30);
            foreach ($sample as $userId) {
                try {
                    Avis::factory()->create([
                        'jeu_id'  => $jeuId,
                        'user_id' => $userId,
                    ]);
                    $total++;
                } catch (\Throwable $e) {
                    // doublon user+jeu ignoré
                }
            }
        }

        $this->command->info("Charge : 1000 users, {$total} avis créés.");
    }
}
