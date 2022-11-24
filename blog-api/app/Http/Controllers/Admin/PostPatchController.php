<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostPatchController extends Controller
{
    public function __invoke(Post $post, Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'teaser' => 'nullable',
            'body' => 'nullable',
            'published' => 'boolean',
        ]);

        $post->update($request->only(['title', 'teaser', 'body', 'published', 'slug']));
    }
}
