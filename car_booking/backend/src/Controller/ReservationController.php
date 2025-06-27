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

        return new JsonResponse(['message' => 'Réservation créée avec succès']);
    }

     #[Route('/api/reservations', name: 'get_reservations', methods: ['GET'])]
    public function getAll(EntityManagerInterface $em): JsonResponse
    {
        $reservations = $em->getRepository(Reservation::class)->findAll();

        $data = [];
        foreach ($reservations as $reservation) {
            $car = $reservation->getCar();
            $data[] = [
                'id' => $reservation->getId(),
                'name' => $reservation->getName(),
                'email' => $reservation->getEmail(),
                'startDate' => $reservation->getStartDate()->format('Y-m-d'),
                'endDate' => $reservation->getEndDate()->format('Y-m-d'),
                'car' => [
                    'id' => $car->getId(),
                    'brand' => $car->getBrand(),
                    'model' => $car->getModel(),
                    'licensePlate' => $car->getLicensePlate(),
                ]
            ];
        }

        return $this->json($data);
    }

    #[Route('/api/reservations/{id}', name: 'delete_reservation', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): JsonResponse
    {
        $reservation = $em->getRepository(Reservation::class)->find($id);

        if (!$reservation) {
            return $this->json(['error' => 'Réservation non trouvée'], 404);
        }

        // On rend la voiture de nouveau disponible
        $car = $reservation->getCar();
        $car->setIsAvailable(true);

        $em->remove($reservation);
        $em->flush();

        return $this->json(['message' => '✅ Réservation annulée avec succès']);
    }
}
