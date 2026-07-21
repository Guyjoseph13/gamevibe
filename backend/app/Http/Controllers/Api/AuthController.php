<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\Auth\UpdateProfileRequest;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->nom,
            'email' => $request->email,
            'password' => Hash::make($request->mot_de_passe),
            'role' => 'user',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inscription réussie',
            'user' => new UserResource($user),
            'token' => $token,
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->mot_de_passe, $user->password)) {
            // F16 : trace des échecs de connexion (détection de force brute)
            Log::warning('Echec de connexion', [
                'email' => $request->email,
                'ip'    => $request->ip(),
            ]);

            return response()->json(['message' => 'Email ou mot de passe incorrect'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnexion réussie']);
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        $user = $request->user();

        $user->update([
            'name' => $request->nom ?? $user->name,
            'email' => $request->email ?? $user->email,
        ]);

        return response()->json([
            'message' => 'Profil mis à jour',
            'user' => new UserResource($user),
        ]);
    }

    public function updatePassword(Request $request)
    {
        $user = $request->user();

        // BUG-05 : le front envoie current_password / password (et non ancien_/nouveau_)
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Ancien mot de passe incorrect'], 401);
        }

        // F13 : le nouveau mot de passe doit être robuste et confirmé
        $request->validate([
            'password' => ['required', 'confirmed', Password::min(8)->mixedCase()->numbers()->symbols()],
        ]);

        $user->update(['password' => Hash::make($request->password)]);

        // F15 : révoque tous les jetons existants après changement de mot de passe
        $user->tokens()->delete();

        return response()->json(['message' => 'Mot de passe mis à jour. Veuillez vous reconnecter.']);
    }

    // Supprimer son propre compte (soft delete)
    public function deleteAccount(Request $request)
    {
        $user = $request->user();

        // Révoque tous les tokens avant suppression
        $user->tokens()->delete();

        // Soft delete
        $user->delete();

        return response()->json(['message' => 'Compte supprimé avec succès']);
    }
}
