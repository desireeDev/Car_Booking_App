<?php

namespace App\Controller;

use App\Entity\Car;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CarController extends AbstractController
{
    #[Route('/api/cars', name: 'create_car', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['brand'], $data['model'], $data['licensePlate'])) {
            return new JsonResponse(['error' => 'Missing fields'], 400);
        }

        $car = new Car();
        $car->setBrand($data['brand']);
        $car->setModel($data['model']);
        $car->setLicensePlate($data['licensePlate']);

        $em->persist($car);
        $em->flush();

        return new JsonResponse(['message' => 'Car created successfully'], 201);
    }

    #[Route('/api/cars', name: 'get_cars', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
        {
            $cars = $em->getRepository(Car::class)->findAll();

            $data = [];

            foreach ($cars as $car) {
                $data[] = [
                    'id' => $car->getId(),
                    'brand' => $car->getBrand(),
                    'model' => $car->getModel(),
                    'licensePlate' => $car->getLicensePlate(),
                ];
            }

            return new JsonResponse($data);
        }
    
    #[Route('/api/cars/{id}', name: 'delete_car', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): JsonResponse
    {
        $car = $em->getRepository(Car::class)->find($id);

        if (!$car) {
            return new JsonResponse(['error' => 'Voiture non trouvée'], 404);
        }

        $em->remove($car);
        $em->flush();

        return new JsonResponse(['message' => 'Voiture supprimée'], 200);
    }

    #[Route('/api/cars/{id}', name: 'update_car', methods: ['PUT'])]
public function update(
    Request $request,
    EntityManagerInterface $entityManager,
    int $id
): JsonResponse {
    // On récupère la voiture par son ID
    $car = $entityManager->getRepository(Car::class)->find($id);

    if (!$car) {
        return new JsonResponse(['message' => 'Voiture non trouvée'], 404);
    }

    // On décode le JSON reçu
    $data = json_decode($request->getContent(), true);

    // On met à jour les champs si fournis
    if (isset($data['brand'])) {
        $car->setBrand($data['brand']);
    }

    if (isset($data['model'])) {
        $car->setModel($data['model']);
    }

    if (isset($data['licensePlate'])) {
        $car->setLicensePlate($data['licensePlate']);
    }

    if (isset($data['isAvailable'])) {
        $car->setIsAvailable($data['isAvailable']);
    }

    $entityManager->flush();

    return new JsonResponse(['message' => 'Voiture mise à jour avec succès']);
}

}
