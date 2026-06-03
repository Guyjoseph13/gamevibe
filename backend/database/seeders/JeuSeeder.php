<?php

namespace Database\Seeders;

use App\Models\Categorie;
use App\Models\Developpeur;
use App\Models\Jeu;
use App\Models\Plateforme;
use Illuminate\Database\Seeder;

class JeuSeeder extends Seeder
{
    public function run(): void
    {
        $categories = collect([
            'Action',
            'Aventure',
            'RPG',
            'Sport',
            'Combat',
            'FPS',
            'Simulation',
            'Horreur',
            'Multijoueur',
            'Open World',
            'Stratégie',
            'Beat Them All',
            'Course',
            'Plateforme',
            'Super-héros',
            'Science-fiction',
            'Stealth',
            'Exploration',
        ])->mapWithKeys(fn ($nom) => [$nom => Categorie::firstOrCreate(['nom' => $nom])]);

        $plateformes = collect([
            'PC',
            'PlayStation 5',
            'PlayStation 4',
            'Xbox Series X',
            'Xbox One',
            'Nintendo Switch',
            'Mobile',
        ])->mapWithKeys(fn ($nom) => [$nom => Plateforme::firstOrCreate(['nom' => $nom])]);

        $jeux = [
            [
                'titre' => 'God of War Ragnarök',
                'date_sortie' => '2022-11-09',
                'developpeur' => 'Santa Monica Studio',
                'plateformes' => ['PlayStation 5', 'PlayStation 4'],
                'categories' => ['Action', 'Aventure', 'RPG'],
            ],
            [
                'titre' => '007 First Light',
                'date_sortie' => '2024-06-21',
                'developpeur' => 'IO Interactive',
                'plateformes' => ['PlayStation 5', 'Xbox Series X', 'PC'],
                'categories' => ['Action', 'FPS', 'Multijoueur'],
            ],
            [
                'titre' => 'The Witcher 3: Wild Hunt',
                'date_sortie' => '2015-05-19',
                'developpeur' => 'CD Projekt Red',
                'plateformes' => ['PC', 'PlayStation 5', 'Xbox Series X', 'Nintendo Switch'],
                'categories' => ['RPG', 'Aventure', 'Open World'],
            ],
            [
                'titre' => 'Avatar Legends: The Fighting Game',
                'date_sortie' => '2024-07-26',
                'developpeur' => 'Ubisoft',
                'plateformes' => ['PlayStation 5', 'Xbox Series X', 'PC'],
                'categories' => ['Combat', 'Multijoueur'],
            ],
            [
                'titre' => 'Black Myth: Wukong',
                'date_sortie' => '2024-08-20',
                'developpeur' => 'Game Science',
                'plateformes' => ['PC', 'PlayStation 5', 'Xbox Series X'],
                'categories' => ['Action', 'RPG', 'Aventure'],
            ],
            [
                'titre' => 'Bleach',
                'date_sortie' => '2024-06-13',
                'developpeur' => 'Nexon',
                'plateformes' => ['PC'],
                'categories' => ['Combat', 'Multijoueur'],
            ],
            [
                'titre' => 'Captain Tsubasa: Rise of New Champions',
                'date_sortie' => '2020-08-28',
                'developpeur' => 'Bandai Namco',
                'plateformes' => ['PC', 'PlayStation 5', 'PlayStation 4', 'Nintendo Switch'],
                'categories' => ['Sport', 'Simulation', 'Multijoueur'],
            ],
            [
                'titre' => 'Clair Obscur: Expedition 33',
                'date_sortie' => '2024-10-12',
                'developpeur' => 'Indie Studio',
                'plateformes' => ['PC', 'PlayStation 5'],
                'categories' => ['Aventure', 'Plateforme', 'Action'],
            ],
            [
                'titre' => 'Cyberpunk 2077',
                'date_sortie' => '2020-12-10',
                'developpeur' => 'CD Projekt Red',
                'plateformes' => ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X', 'Xbox One'],
                'categories' => ['Action', 'RPG', 'Open World'],
            ],
            [
                'titre' => 'The Dark Pictures Anthology: Directive 8020',
                'date_sortie' => '2024-10-04',
                'developpeur' => 'Supermassive Games',
                'plateformes' => ['PC', 'PlayStation 5', 'Xbox Series X'],
                'categories' => ['Horreur', 'Aventure'],
            ],
            [
                'titre' => 'Dispatch',
                'date_sortie' => '2024-03-22',
                'developpeur' => 'Crows Crows Crows',
                'plateformes' => ['PC'],
                'categories' => ['Aventure', 'Stratégie'],
            ],
            [
                'titre' => 'Dragon Ball: Sparking! ZERO',
                'date_sortie' => '2024-05-10',
                'developpeur' => 'Bandai Namco',
                'plateformes' => ['PC', 'PlayStation 5', 'Xbox Series X'],
                'categories' => ['Combat', 'Multijoueur'],
            ],
            [
                'titre' => 'Dragon Ball Xenoverse 2',
                'date_sortie' => '2016-10-25',
                'developpeur' => 'Bandai Namco',
                'plateformes' => ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X', 'Xbox One', 'Nintendo Switch'],
                'categories' => ['Combat', 'RPG', 'Multijoueur'],
            ],
            [
                'titre' => 'UFC 5',
                'date_sortie' => '2024-10-25',
                'developpeur' => 'EA',
                'plateformes' => ['PlayStation 5', 'Xbox Series X'],
                'categories' => ['Sport', 'Simulation'],
            ],
            [
                'titre' => 'EA Sports FC 26',
                'date_sortie' => '2025-09-01',
                'developpeur' => 'EA Sports',
                'plateformes' => ['PC', 'PlayStation 5', 'Xbox Series X'],
                'categories' => ['Sport', 'Simulation', 'Multijoueur'],
            ],
            [
                'titre' => 'Elden Ring',
                'date_sortie' => '2022-02-25',
                'developpeur' => 'FromSoftware',
                'plateformes' => ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X', 'Xbox One'],
                'categories' => ['Action', 'RPG', 'Open World'],
            ],
            [
                'titre' => 'Final Fantasy XVI',
                'date_sortie' => '2023-06-22',
                'developpeur' => 'Square Enix',
                'plateformes' => ['PlayStation 5', 'PC'],
                'categories' => ['RPG', 'Action', 'Aventure'],
            ],
            [
                'titre' => 'Fortnite',
                'date_sortie' => '2017-07-21',
                'developpeur' => 'Epic Games',
                'plateformes' => ['PC', 'PlayStation 5', 'Xbox Series X', 'Nintendo Switch', 'Mobile'],
                'categories' => ['Action', 'Multijoueur', 'Simulation'],
            ],
            [
                'titre' => 'Forza Horizon 6',
                'date_sortie' => '2025-09-01',
                'developpeur' => 'Playground Games',
                'plateformes' => ['PC', 'Xbox Series X'],
                'categories' => ['Course', 'Simulation'],
            ],
            [
                'titre' => 'Genshin Impact',
                'date_sortie' => '2020-09-28',
                'developpeur' => 'miHoYo',
                'plateformes' => ['PC', 'PlayStation 5', 'PlayStation 4', 'Mobile'],
                'categories' => ['RPG', 'Action', 'Aventure'],
            ],
            [
                'titre' => 'Hell Is Us',
                'date_sortie' => '2024-01-30',
                'developpeur' => 'Vuilbit',
                'plateformes' => ['PC', 'PlayStation 5', 'Xbox Series X'],
                'categories' => ['Horreur', 'Aventure'],
            ],
            [
                'titre' => 'Hitman III',
                'date_sortie' => '2021-01-20',
                'developpeur' => 'IO Interactive',
                'plateformes' => ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X', 'Xbox One'],
                'categories' => ['Action', 'Stratégie', 'Stealth'],
            ],
            [
                'titre' => 'Grand Theft Auto VI',
                'date_sortie' => '2025-10-01',
                'developpeur' => 'Rockstar Games',
                'plateformes' => ['PC', 'PlayStation 5', 'Xbox Series X'],
                'categories' => ['Action', 'Open World', 'Aventure'],
            ],
            [
                'titre' => 'Jujutsu Kaisen: Cursed Clash',
                'date_sortie' => '2024-05-10',
                'developpeur' => 'Bandai Namco',
                'plateformes' => ['PC', 'PlayStation 5', 'Xbox Series X'],
                'categories' => ['Combat', 'Multijoueur'],
            ],
            [
                'titre' => 'Mario Kart Tour / World',
                'date_sortie' => '2024-09-05',
                'developpeur' => 'Nintendo',
                'plateformes' => ['Nintendo Switch', 'Mobile'],
                'categories' => ['Course', 'Multijoueur'],
            ],
            [
                'titre' => 'Call of Duty: Black Ops 7',
                'date_sortie' => '2025-10-07',
                'developpeur' => 'Treyarch',
                'plateformes' => ['PC', 'PlayStation 5', 'Xbox Series X'],
                'categories' => ['FPS', 'Multijoueur'],
            ],
            [
                'titre' => 'Mouse: P.I. For Hire',
                'date_sortie' => '2024-11-15',
                'developpeur' => 'TinyBuild',
                'plateformes' => ['PC', 'PlayStation 5'],
                'categories' => ['Aventure', 'Action'],
            ],
            [
                'titre' => 'My Hero Academia: One\'s Justice',
                'date_sortie' => '2018-10-26',
                'developpeur' => 'Bandai Namco',
                'plateformes' => ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'],
                'categories' => ['Combat', 'Action'],
            ],
            [
                'titre' => 'Resident Evil',
                'date_sortie' => '2023-03-22',
                'developpeur' => 'Capcom',
                'plateformes' => ['PC', 'PlayStation 5', 'Xbox Series X'],
                'categories' => ['Horreur', 'Action'],
            ],
            [
                'titre' => 'Samson',
                'date_sortie' => '2024-08-12',
                'developpeur' => 'Michael Raccoon',
                'plateformes' => ['PC'],
                'categories' => ['Action', 'Plateforme'],
            ],
            [
                'titre' => 'NBA 2K26',
                'date_sortie' => '2025-09-06',
                'developpeur' => 'Visual Concepts',
                'plateformes' => ['PC', 'PlayStation 5', 'Xbox Series X'],
                'categories' => ['Sport', 'Simulation'],
            ],
            [
                'titre' => 'Marvel\'s Spider-Man 2',
                'date_sortie' => '2023-10-20',
                'developpeur' => 'Insomniac Games',
                'plateformes' => ['PlayStation 5'],
                'categories' => ['Action', 'Aventure', 'Super-héros'],
            ],
            [
                'titre' => 'Crimson Desert',
                'date_sortie' => '2024-12-17',
                'developpeur' => 'Pearl Abyss',
                'plateformes' => ['PC', 'PlayStation 5', 'Xbox Series X'],
                'categories' => ['Action', 'RPG', 'Open World'],
            ],
            [
                'titre' => 'Naruto Shippuden: Ultimate Ninja Storm 4',
                'date_sortie' => '2016-02-04',
                'developpeur' => 'CyberConnect2',
                'plateformes' => ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'],
                'categories' => ['Combat', 'Action'],
            ],
            [
                'titre' => 'Stranger Than Heaven',
                'date_sortie' => '2024-04-25',
                'developpeur' => 'Dreamhouse',
                'plateformes' => ['PC'],
                'categories' => ['Action', 'Aventure', 'Horreur'],
            ],
            [
                'titre' => 'Pragmata',
                'date_sortie' => '2024-01-17',
                'developpeur' => 'Capcom',
                'plateformes' => ['PC', 'PlayStation 5', 'Xbox Series X'],
                'categories' => ['Action', 'Aventure', 'Science-fiction'],
            ],
            [
                'titre' => 'The Last of Us Part II',
                'date_sortie' => '2020-06-19',
                'developpeur' => 'Naughty Dog',
                'plateformes' => ['PlayStation 4'],
                'categories' => ['Action', 'Aventure', 'Horreur'],
            ],
            [
                'titre' => 'The Sims 4',
                'date_sortie' => '2014-09-02',
                'developpeur' => 'Maxis',
                'plateformes' => ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X', 'Xbox One'],
                'categories' => ['Simulation'],
            ],
            [
                'titre' => 'The Legend of Zelda: Tears of the Kingdom',
                'date_sortie' => '2023-05-12',
                'developpeur' => 'Nintendo',
                'plateformes' => ['Nintendo Switch'],
                'categories' => ['Aventure', 'Action', 'Open World'],
            ],
            [
                'titre' => 'Invincible',
                'date_sortie' => '2024-10-25',
                'developpeur' => 'Skybound Games',
                'plateformes' => ['PC', 'PlayStation 5', 'Xbox Series X'],
                'categories' => ['Action', 'Super-héros'],
            ],
            [
                'titre' => 'Warframe',
                'date_sortie' => '2013-03-25',
                'developpeur' => 'Digital Extremes',
                'plateformes' => ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X', 'Xbox One', 'Nintendo Switch'],
                'categories' => ['Action', 'Multijoueur', 'FPS'],
            ],
            [
                'titre' => 'Tekken 8',
                'date_sortie' => '2024-01-26',
                'developpeur' => 'Bandai Namco',
                'plateformes' => ['PC', 'PlayStation 5', 'Xbox Series X'],
                'categories' => ['Combat', 'Multijoueur'],
            ],
            [
                'titre' => 'Marvel\'s Wolverine',
                'date_sortie' => '2024-10-25',
                'developpeur' => 'Insomniac Games',
                'plateformes' => ['PlayStation 5'],
                'categories' => ['Action', 'Aventure', 'Super-héros'],
            ],
            [
                'titre' => 'WWE 2K26',
                'date_sortie' => '2025-03-14',
                'developpeur' => 'Visual Concepts',
                'plateformes' => ['PlayStation 5', 'Xbox Series X', 'PC'],
                'categories' => ['Sport', 'Simulation'],
            ],
            [
                'titre' => 'Ghost of Yōtei',
                'date_sortie' => '2024-11-22',
                'developpeur' => 'Bend Studio',
                'plateformes' => ['PlayStation 5'],
                'categories' => ['Action', 'Aventure', 'Horreur'],
            ],
        ];

        foreach ($jeux as $jeuData) {
            $devel = Developpeur::firstOrCreate(['nom' => $jeuData['developpeur']]);

            $jeu = Jeu::create([
                'titre' => $jeuData['titre'],
                'description' => 'Description du jeu ' . $jeuData['titre'] . '.',
                'image' => 'https://via.placeholder.com/640x360.png?text=' . rawurlencode($jeuData['titre']),
                'date_sortie' => $this->normalizeDate($jeuData['date_sortie']),
                'developpeur_id' => $devel->id,
            ]);

            $jeu->plateformes()->sync(collect($jeuData['plateformes'])->map(fn ($nom) => $plateformes[$nom]->id)->all());
            $jeu->categories()->sync(collect($jeuData['categories'])->map(fn ($nom) => $categories[$nom]->id)->all());
        }
    }

    private function normalizeDate(string $date): string
    {
        if (str_contains($date, 'XX') || str_contains($date, '??')) {
            return str_replace(['XX', '??'], '01', $date);
        }

        return $date;
    }
}
