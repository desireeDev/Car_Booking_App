<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Reservation;
use App\Entity\Car;

final class ReservationController extends AbstractController
{
    #[Route('/reservation', name: 'app_reservation')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ReservationController.php',
        ]);
    }

     #[Route('/api/reservations', name: 'create_reservation', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $car = $em->getRepository(Car::class)->find($data['car_id']);

        if (!$car) {
            return new JsonResponse(['error' => 'Voiture non trouvée'], 404);
        }

        if (!$car->isAvailable()) {
            return new JsonResponse(['error' => 'Cette voiture est déjà réservée'], 400);
        }

        $reservation = new Reservation();
        $reservation->setName($data['nom']);
        $reservation->setEmail($data['email']);
        $reservation->setStartDate(new \DateTime($data['date_depart']));
        $reservation->setEndDate(new \DateTime($data['date_arrivee']));
        $reservation->setCar($car);
        $car->setIsAvailable(false);

        $em->persist($reservation);
        $em->flush();

        return new JsonResponse(['message' => '✅ Réservation créée avec succès']);
    }
}
