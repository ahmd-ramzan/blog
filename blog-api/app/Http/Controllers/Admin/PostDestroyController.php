<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostDestroyController extends Controller
{
    public function __invoke(Post $post)
    {
        $post->delete();

        return response()->json(['status' => 1]);
    }
}
