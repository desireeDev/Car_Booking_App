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
}
