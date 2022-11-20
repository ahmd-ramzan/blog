<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $credentials = $validator->validated();

        if ($validator->fails()) {
            return response()->json(['status' => 0, 'errors' => $validator->errors()]);
        }

        if (Auth::attempt($credentials)) {
            $token = $request->user()->createToken('auth');

            return response()->json(['status' => 1, 'token' => $token->plainTextToken]);
        }

        return response()->json(['status' => 0, 'message' => 'Invalid Credentials']);
    }
}
