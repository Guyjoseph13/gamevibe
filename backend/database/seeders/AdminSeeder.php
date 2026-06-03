<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@gamevibe.com'],
            [
                'name' => 'Admin GameVibe',
                'password' => Hash::make('Admin@123456'),
                'role' => 'admin',
            ]
        );
    }
}
