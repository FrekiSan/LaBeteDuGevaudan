<?php
namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/story-video')]
final class StoryVideoController extends AbstractController
{
    #[Route('/{id}', name: 'api_story_video_show', methods: ['GET'])]
    public function show(string $id): Response
    {
        return $this->json(['id' => $id, 'status' => 'ok']);
    }
}
