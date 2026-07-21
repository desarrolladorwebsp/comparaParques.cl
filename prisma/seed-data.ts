import type { Prisma } from '../src/generated/prisma/client';

/** Snapshot de respaldo para reseeding. Fuente de verdad: Neon DB. */
export const SEED_PARKS: Prisma.ParkCreateInput[] = [
  {
    "id": "1",
    "slug": "parque-del-recuerdo",
    "name": "Parque del Recuerdo",
    "type": "Parque Privado",
    "status": "Activo",
    "region": "RM",
    "commune": "Huechuraba",
    "address": "Av. El Salto 5000, Huechuraba",
    "lat": -33.3721,
    "lng": -70.6478,
    "description": "Un entorno de parque sereno, con amplias áreas verdes y senderos pensados para el recuerdo en calma. Ideal para familias que buscan un espacio contemporáneo, cuidado y cercano a Santiago.",
    "logoUrl": "/logos/parque-recuerdo.svg",
    "imageUrl": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=640&q=70",
    "mainImage": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80"
    ],
    "videoUrl": "https://www.youtube.com/embed/ScMzIvxBSi4",
    "features": [
      "Áreas verdes cuidadas",
      "Estacionamiento privado",
      "Seguridad 24/7",
      "Crematorio propio",
      "Criptas familiares",
      "Áreas verdes sustentables"
    ],
    "plans": [
      {
        "id": "parcela-2",
        "name": "Parcela Familiar 2 Capas",
        "capacity": "Hasta 4 sepulturas",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 623000,
        "description": "Terreno familiar en entorno de parque, ideal para planificar con anticipación.",
        "maintenanceNote": ""
      },
      {
        "id": "cripta-mem",
        "name": "Cripta Memorial",
        "capacity": "Hasta 6 sepulturas",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 943000,
        "description": "Construcción memorial con diseño sobrio y áreas verdes cercanas.",
        "maintenanceNote": ""
      },
      {
        "id": "parcela-urg",
        "name": "Parcela en urgencia",
        "capacity": "Hasta 4 sepulturas",
        "modality": "Urgencia",
        "needType": "urgencia",
        "priceFrom": 890000,
        "description": "Solución inmediata cuando la familia necesita resolver con claridad y apoyo.",
        "maintenanceNote": ""
      }
    ],
    "maintenanceCosts": {
      "type": "Mixta",
      "summary": "Te explicamos con transparencia qué cubre la mantención y qué queda fuera, para que tu familia decida con tranquilidad.",
      "includes": [
        "Mantención de áreas verdes y caminos",
        "Aseo de espacios comunes",
        "Seguridad perimetral",
        "Opción de mantención perpetua según plan"
      ],
      "annualEstimate": 31150
    },
    "accessNotes": "Acceso principal por Av. El Salto 5000, Huechuraba. Estacionamiento habilitado para visitas familiares.",
    "transitNotes": "Consulta recorridos de transporte público cercanos según tu comuna de origen. Te ayudamos a evaluar la accesibilidad real para tu familia.",
    "rating": 4.6,
    "minPrice": 890000,
    "assignedExecutiveIds": [],
    "partnerSellerIds": []
  },
  {
    "id": "10",
    "slug": "crematorio-parque-paz",
    "name": "Crematorio Parque Paz",
    "type": "Crematorio",
    "status": "Activo",
    "region": "RM",
    "commune": "La Florida",
    "address": "Av. Vicuña Mackenna 9800, La Florida",
    "lat": -33.5224,
    "lng": -70.5881,
    "description": "Servicio de cremación en La Florida, con ceremonias sobrias y orientación transparente en cada paso.",
    "logoUrl": "/logos/el-prado.svg",
    "imageUrl": "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=640&q=70",
    "mainImage": "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80"
    ],
    "videoUrl": "https://www.youtube.com/embed/ScMzIvxBSi4",
    "features": [
      "Áreas verdes cuidadas",
      "Estacionamiento privado",
      "Seguridad 24/7",
      "Crematorio propio",
      "Sala de ceremonias íntima"
    ],
    "plans": [
      {
        "id": "crem-basico",
        "name": "Servicio de Cremación",
        "capacity": "1 ánfora",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 392000,
        "description": "Incluye acompañamiento ceremonial y entrega de ánfora estándar.",
        "maintenanceNote": ""
      },
      {
        "id": "crem-urg",
        "name": "Cremación inmediata",
        "capacity": "1 ánfora",
        "modality": "Urgencia",
        "needType": "urgencia",
        "priceFrom": 560000,
        "description": "Gestión prioritaria cuando la familia necesita una respuesta rápida y clara.",
        "maintenanceNote": ""
      },
      {
        "id": "nicho-cen",
        "name": "Nicho cenizario familiar",
        "capacity": "Hasta 4 ánforas",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 572000,
        "description": "Espacio sereno para reunir a la familia en un mismo lugar de recuerdo.",
        "maintenanceNote": ""
      }
    ],
    "maintenanceCosts": {
      "type": "Anual",
      "summary": "La mantención del espacio cenizario se informa de forma clara y por adelantado, para que no aparezcan sorpresas después.",
      "includes": [
        "Cuidado del nicho o columbario",
        "Aseo de áreas comunes",
        "Acceso familiar en horarios habilitados"
      ],
      "annualEstimate": 45000
    },
    "accessNotes": "Acceso principal por Av. Vicuña Mackenna 9800, La Florida. Estacionamiento habilitado para visitas familiares.",
    "transitNotes": "Consulta recorridos de transporte público cercanos según tu comuna de origen. Te ayudamos a evaluar la accesibilidad real para tu familia.",
    "rating": 4.5,
    "minPrice": 560000,
    "assignedExecutiveIds": [],
    "partnerSellerIds": []
  },
  {
    "id": "2",
    "slug": "parques-sendero",
    "name": "Parques Sendero",
    "type": "Parque Privado",
    "status": "Activo",
    "region": "RM",
    "commune": "Puente Alto",
    "address": "Camino El Alba 1200, Puente Alto",
    "lat": -33.5684,
    "lng": -70.5582,
    "description": "Un parque memorial con recorridos naturales y rincones íntimos. Su diseño prioriza la quietud y la posibilidad de acompañar a los seres queridos sin aglomeraciones.",
    "logoUrl": "/logos/sendero.svg",
    "imageUrl": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=640&q=70",
    "mainImage": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80"
    ],
    "videoUrl": "https://www.youtube.com/embed/ScMzIvxBSi4",
    "features": [
      "Áreas verdes cuidadas",
      "Estacionamiento privado",
      "Seguridad 24/7",
      "Crematorio propio",
      "Criptas familiares",
      "Áreas verdes sustentables"
    ],
    "plans": [
      {
        "id": "parcela-2",
        "name": "Parcela Familiar 2 Capas",
        "capacity": "Hasta 4 sepulturas",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 525000,
        "description": "Terreno familiar en entorno de parque, ideal para planificar con anticipación.",
        "maintenanceNote": ""
      },
      {
        "id": "cripta-mem",
        "name": "Cripta Memorial",
        "capacity": "Hasta 6 sepulturas",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 845000,
        "description": "Construcción memorial con diseño sobrio y áreas verdes cercanas.",
        "maintenanceNote": ""
      },
      {
        "id": "parcela-urg",
        "name": "Parcela en urgencia",
        "capacity": "Hasta 4 sepulturas",
        "modality": "Urgencia",
        "needType": "urgencia",
        "priceFrom": 750000,
        "description": "Solución inmediata cuando la familia necesita resolver con claridad y apoyo.",
        "maintenanceNote": ""
      }
    ],
    "maintenanceCosts": {
      "type": "Mixta",
      "summary": "Te explicamos con transparencia qué cubre la mantención y qué queda fuera, para que tu familia decida con tranquilidad.",
      "includes": [
        "Mantención de áreas verdes y caminos",
        "Aseo de espacios comunes",
        "Seguridad perimetral",
        "Opción de mantención perpetua según plan"
      ],
      "annualEstimate": 26250
    },
    "accessNotes": "Acceso principal por Camino El Alba 1200, Puente Alto. Estacionamiento habilitado para visitas familiares.",
    "transitNotes": "Consulta recorridos de transporte público cercanos según tu comuna de origen. Te ayudamos a evaluar la accesibilidad real para tu familia.",
    "rating": 4.4,
    "minPrice": 750000,
    "assignedExecutiveIds": [],
    "partnerSellerIds": []
  },
  {
    "id": "3",
    "slug": "cementerio-metropolitano",
    "name": "Cementerio Metropolitano",
    "type": "Cementerio Tradicional",
    "status": "Activo",
    "region": "RM",
    "commune": "Recoleta",
    "address": "Av. Recoleta 3200, Recoleta",
    "lat": -33.4108,
    "lng": -70.6402,
    "description": "Un cementerio de tradición en Recoleta, con historia, accesibilidad urbana y opciones claras para distintas necesidades familiares.",
    "logoUrl": "/logos/metropolitano.svg",
    "imageUrl": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=640&q=70",
    "mainImage": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80"
    ],
    "videoUrl": "https://www.youtube.com/embed/ScMzIvxBSi4",
    "features": [
      "Áreas verdes cuidadas",
      "Estacionamiento privado",
      "Seguridad 24/7",
      "Criptas familiares",
      "Capilla o salón ceremonial"
    ],
    "plans": [
      {
        "id": "nicho",
        "name": "Nicho individual",
        "capacity": "1 sepultura",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 294000,
        "description": "Opción accesible con mantención clara y ubicación definida.",
        "maintenanceNote": ""
      },
      {
        "id": "cripta",
        "name": "Cripta familiar",
        "capacity": "Hasta 4 sepulturas",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 544000,
        "description": "Espacio compartido para la familia, con mayor permanencia y cercanía.",
        "maintenanceNote": ""
      },
      {
        "id": "nicho-urg",
        "name": "Nicho en urgencia",
        "capacity": "1 sepultura",
        "modality": "Urgencia",
        "needType": "urgencia",
        "priceFrom": 420000,
        "description": "Disponibilidad inmediata con acompañamiento administrativo guiado.",
        "maintenanceNote": ""
      }
    ],
    "maintenanceCosts": {
      "type": "Anual",
      "summary": "Te explicamos con transparencia qué cubre la mantención y qué queda fuera, para que tu familia decida con tranquilidad.",
      "includes": [
        "Mantención de áreas verdes y caminos",
        "Aseo de espacios comunes",
        "Seguridad perimetral",
        "Gestión administrativa básica del contrato"
      ],
      "annualEstimate": 14700
    },
    "accessNotes": "Acceso principal por Av. Recoleta 3200, Recoleta. Estacionamiento habilitado para visitas familiares.",
    "transitNotes": "Consulta recorridos de transporte público cercanos según tu comuna de origen. Te ayudamos a evaluar la accesibilidad real para tu familia.",
    "rating": 4.1,
    "minPrice": 420000,
    "assignedExecutiveIds": [],
    "partnerSellerIds": []
  },
  {
    "id": "4",
    "slug": "nuestros-parques",
    "name": "Nuestros Parques",
    "type": "Parque Privado",
    "status": "Activo",
    "region": "RM",
    "commune": "Maipú",
    "address": "Camino a Melipilla 9800, Maipú",
    "lat": -33.5089,
    "lng": -70.7661,
    "description": "Espacio de parque en el sector poniente, con ambientes abiertos y una propuesta pensada para planificar con anticipación o resolver con acompañamiento.",
    "logoUrl": "/logos/nuestros-parques.svg",
    "imageUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=640&q=70",
    "mainImage": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80"
    ],
    "videoUrl": "https://www.youtube.com/embed/ScMzIvxBSi4",
    "features": [
      "Áreas verdes cuidadas",
      "Estacionamiento privado",
      "Seguridad 24/7",
      "Crematorio propio",
      "Criptas familiares",
      "Áreas verdes sustentables"
    ],
    "plans": [
      {
        "id": "parcela-2",
        "name": "Parcela Familiar 2 Capas",
        "capacity": "Hasta 4 sepulturas",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 574000,
        "description": "Terreno familiar en entorno de parque, ideal para planificar con anticipación.",
        "maintenanceNote": ""
      },
      {
        "id": "cripta-mem",
        "name": "Cripta Memorial",
        "capacity": "Hasta 6 sepulturas",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 894000,
        "description": "Construcción memorial con diseño sobrio y áreas verdes cercanas.",
        "maintenanceNote": ""
      },
      {
        "id": "parcela-urg",
        "name": "Parcela en urgencia",
        "capacity": "Hasta 4 sepulturas",
        "modality": "Urgencia",
        "needType": "urgencia",
        "priceFrom": 820000,
        "description": "Solución inmediata cuando la familia necesita resolver con claridad y apoyo.",
        "maintenanceNote": ""
      }
    ],
    "maintenanceCosts": {
      "type": "Mixta",
      "summary": "Te explicamos con transparencia qué cubre la mantención y qué queda fuera, para que tu familia decida con tranquilidad.",
      "includes": [
        "Mantención de áreas verdes y caminos",
        "Aseo de espacios comunes",
        "Seguridad perimetral",
        "Opción de mantención perpetua según plan"
      ],
      "annualEstimate": 28700
    },
    "accessNotes": "Acceso principal por Camino a Melipilla 9800, Maipú. Estacionamiento habilitado para visitas familiares.",
    "transitNotes": "Consulta recorridos de transporte público cercanos según tu comuna de origen. Te ayudamos a evaluar la accesibilidad real para tu familia.",
    "rating": 4.5,
    "minPrice": 820000,
    "assignedExecutiveIds": [],
    "partnerSellerIds": []
  },
  {
    "id": "5",
    "slug": "cementerio-general",
    "name": "Cementerio General",
    "type": "Cementerio Tradicional",
    "status": "Activo",
    "region": "RM",
    "commune": "Recoleta",
    "address": "Av. Profesor Zañartu 951, Recoleta",
    "lat": -33.4145,
    "lng": -70.6489,
    "description": "Uno de los cementerios más emblemáticos de Chile. Combina historia, patrimonio y alternativas accesibles para distintas realidades familiares.",
    "logoUrl": "/logos/cementerio-general.svg",
    "imageUrl": "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=640&q=70",
    "mainImage": "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80"
    ],
    "videoUrl": "https://www.youtube.com/embed/ScMzIvxBSi4",
    "features": [
      "Áreas verdes cuidadas",
      "Estacionamiento privado",
      "Seguridad 24/7",
      "Criptas familiares",
      "Capilla o salón ceremonial"
    ],
    "plans": [
      {
        "id": "nicho",
        "name": "Nicho individual",
        "capacity": "1 sepultura",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 266000,
        "description": "Opción accesible con mantención clara y ubicación definida.",
        "maintenanceNote": ""
      },
      {
        "id": "cripta",
        "name": "Cripta familiar",
        "capacity": "Hasta 4 sepulturas",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 516000,
        "description": "Espacio compartido para la familia, con mayor permanencia y cercanía.",
        "maintenanceNote": ""
      },
      {
        "id": "nicho-urg",
        "name": "Nicho en urgencia",
        "capacity": "1 sepultura",
        "modality": "Urgencia",
        "needType": "urgencia",
        "priceFrom": 380000,
        "description": "Disponibilidad inmediata con acompañamiento administrativo guiado.",
        "maintenanceNote": ""
      }
    ],
    "maintenanceCosts": {
      "type": "Anual",
      "summary": "Te explicamos con transparencia qué cubre la mantención y qué queda fuera, para que tu familia decida con tranquilidad.",
      "includes": [
        "Mantención de áreas verdes y caminos",
        "Aseo de espacios comunes",
        "Seguridad perimetral",
        "Gestión administrativa básica del contrato"
      ],
      "annualEstimate": 13300
    },
    "accessNotes": "Acceso principal por Av. Profesor Zañartu 951, Recoleta. Estacionamiento habilitado para visitas familiares.",
    "transitNotes": "Consulta recorridos de transporte público cercanos según tu comuna de origen. Te ayudamos a evaluar la accesibilidad real para tu familia.",
    "rating": 4.3,
    "minPrice": 380000,
    "assignedExecutiveIds": [],
    "partnerSellerIds": []
  },
  {
    "id": "6",
    "slug": "parque-el-prado",
    "name": "Parque El Prado",
    "type": "Parque Privado",
    "status": "Activo",
    "region": "RM",
    "commune": "San Bernardo",
    "address": "Camino Padre Hurtado 2100, San Bernardo",
    "lat": -33.5921,
    "lng": -70.7012,
    "description": "Parque memorial en el sur de Santiago, con áreas verdes amplias y una atmósfera pensada para el encuentro familiar en paz.",
    "logoUrl": "/logos/el-prado.svg",
    "imageUrl": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=640&q=70",
    "mainImage": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80"
    ],
    "videoUrl": "https://www.youtube.com/embed/ScMzIvxBSi4",
    "features": [
      "Áreas verdes cuidadas",
      "Estacionamiento privado",
      "Seguridad 24/7",
      "Crematorio propio",
      "Criptas familiares",
      "Áreas verdes sustentables"
    ],
    "plans": [
      {
        "id": "parcela-2",
        "name": "Parcela Familiar 2 Capas",
        "capacity": "Hasta 4 sepulturas",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 483000,
        "description": "Terreno familiar en entorno de parque, ideal para planificar con anticipación.",
        "maintenanceNote": ""
      },
      {
        "id": "cripta-mem",
        "name": "Cripta Memorial",
        "capacity": "Hasta 6 sepulturas",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 803000,
        "description": "Construcción memorial con diseño sobrio y áreas verdes cercanas.",
        "maintenanceNote": ""
      },
      {
        "id": "parcela-urg",
        "name": "Parcela en urgencia",
        "capacity": "Hasta 4 sepulturas",
        "modality": "Urgencia",
        "needType": "urgencia",
        "priceFrom": 690000,
        "description": "Solución inmediata cuando la familia necesita resolver con claridad y apoyo.",
        "maintenanceNote": ""
      }
    ],
    "maintenanceCosts": {
      "type": "Mixta",
      "summary": "Te explicamos con transparencia qué cubre la mantención y qué queda fuera, para que tu familia decida con tranquilidad.",
      "includes": [
        "Mantención de áreas verdes y caminos",
        "Aseo de espacios comunes",
        "Seguridad perimetral",
        "Opción de mantención perpetua según plan"
      ],
      "annualEstimate": 24150
    },
    "accessNotes": "Acceso principal por Camino Padre Hurtado 2100, San Bernardo. Estacionamiento habilitado para visitas familiares.",
    "transitNotes": "Consulta recorridos de transporte público cercanos según tu comuna de origen. Te ayudamos a evaluar la accesibilidad real para tu familia.",
    "rating": 4.2,
    "minPrice": 690000,
    "assignedExecutiveIds": [],
    "partnerSellerIds": []
  },
  {
    "id": "7",
    "slug": "parque-los-olivos",
    "name": "Parque Los Olivos",
    "type": "Parque Privado",
    "status": "Activo",
    "region": "Valparaíso",
    "commune": "Viña del Mar",
    "address": "Camino Internacional 450, Viña del Mar",
    "lat": -33.0153,
    "lng": -71.5012,
    "description": "Ubicado en la zona de Viña del Mar, ofrece un entorno luminoso y cuidado, ideal para familias de la región de Valparaíso.",
    "logoUrl": "/logos/los-olivos.svg",
    "imageUrl": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=640&q=70",
    "mainImage": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80"
    ],
    "videoUrl": "https://www.youtube.com/embed/ScMzIvxBSi4",
    "features": [
      "Áreas verdes cuidadas",
      "Estacionamiento privado",
      "Seguridad 24/7",
      "Crematorio propio",
      "Criptas familiares",
      "Áreas verdes sustentables"
    ],
    "plans": [
      {
        "id": "parcela-2",
        "name": "Parcela Familiar 2 Capas",
        "capacity": "Hasta 4 sepulturas",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 665000,
        "description": "Terreno familiar en entorno de parque, ideal para planificar con anticipación.",
        "maintenanceNote": ""
      },
      {
        "id": "cripta-mem",
        "name": "Cripta Memorial",
        "capacity": "Hasta 6 sepulturas",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 985000,
        "description": "Construcción memorial con diseño sobrio y áreas verdes cercanas.",
        "maintenanceNote": ""
      },
      {
        "id": "parcela-urg",
        "name": "Parcela en urgencia",
        "capacity": "Hasta 4 sepulturas",
        "modality": "Urgencia",
        "needType": "urgencia",
        "priceFrom": 950000,
        "description": "Solución inmediata cuando la familia necesita resolver con claridad y apoyo.",
        "maintenanceNote": ""
      }
    ],
    "maintenanceCosts": {
      "type": "Mixta",
      "summary": "Te explicamos con transparencia qué cubre la mantención y qué queda fuera, para que tu familia decida con tranquilidad.",
      "includes": [
        "Mantención de áreas verdes y caminos",
        "Aseo de espacios comunes",
        "Seguridad perimetral",
        "Opción de mantención perpetua según plan"
      ],
      "annualEstimate": 33250
    },
    "accessNotes": "Acceso principal por Camino Internacional 450, Viña del Mar. Estacionamiento habilitado para visitas familiares.",
    "transitNotes": "Consulta recorridos de transporte público cercanos según tu comuna de origen. Te ayudamos a evaluar la accesibilidad real para tu familia.",
    "rating": 4.7,
    "minPrice": 950000,
    "assignedExecutiveIds": [],
    "partnerSellerIds": []
  },
  {
    "id": "8",
    "slug": "crematorio-santiago-norte",
    "name": "Crematorio Santiago Norte",
    "type": "Crematorio",
    "status": "Activo",
    "region": "RM",
    "commune": "Quilicura",
    "address": "Av. Lo Marcoleta 1500, Quilicura",
    "lat": -33.3612,
    "lng": -70.7284,
    "description": "Centro de cremación con salas íntimas y procesos claros, orientado a acompañar con dignidad y sin burocracia confusa.",
    "logoUrl": "/logos/memorial.svg",
    "imageUrl": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=640&q=70",
    "mainImage": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80"
    ],
    "videoUrl": "https://www.youtube.com/embed/ScMzIvxBSi4",
    "features": [
      "Áreas verdes cuidadas",
      "Estacionamiento privado",
      "Seguridad 24/7",
      "Crematorio propio",
      "Sala de ceremonias íntima"
    ],
    "plans": [
      {
        "id": "crem-basico",
        "name": "Servicio de Cremación",
        "capacity": "1 ánfora",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 364000,
        "description": "Incluye acompañamiento ceremonial y entrega de ánfora estándar.",
        "maintenanceNote": ""
      },
      {
        "id": "crem-urg",
        "name": "Cremación inmediata",
        "capacity": "1 ánfora",
        "modality": "Urgencia",
        "needType": "urgencia",
        "priceFrom": 520000,
        "description": "Gestión prioritaria cuando la familia necesita una respuesta rápida y clara.",
        "maintenanceNote": ""
      },
      {
        "id": "nicho-cen",
        "name": "Nicho cenizario familiar",
        "capacity": "Hasta 4 ánforas",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 544000,
        "description": "Espacio sereno para reunir a la familia en un mismo lugar de recuerdo.",
        "maintenanceNote": ""
      }
    ],
    "maintenanceCosts": {
      "type": "Anual",
      "summary": "La mantención del espacio cenizario se informa de forma clara y por adelantado, para que no aparezcan sorpresas después.",
      "includes": [
        "Cuidado del nicho o columbario",
        "Aseo de áreas comunes",
        "Acceso familiar en horarios habilitados"
      ],
      "annualEstimate": 45000
    },
    "accessNotes": "Acceso principal por Av. Lo Marcoleta 1500, Quilicura. Estacionamiento habilitado para visitas familiares.",
    "transitNotes": "Consulta recorridos de transporte público cercanos según tu comuna de origen. Te ayudamos a evaluar la accesibilidad real para tu familia.",
    "rating": 4.4,
    "minPrice": 520000,
    "assignedExecutiveIds": [],
    "partnerSellerIds": []
  },
  {
    "id": "9",
    "slug": "camposanto-memorial",
    "name": "Camposanto Memorial",
    "type": "Cementerio Tradicional",
    "status": "Activo",
    "region": "Biobío",
    "commune": "Concepción",
    "address": "Av. Collao 980, Concepción",
    "lat": -36.8201,
    "lng": -73.0444,
    "description": "Camposanto en Concepción con tradición local y opciones de sepultura pensadas para la realidad del Biobío.",
    "logoUrl": "/logos/memorial.svg",
    "imageUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=640&q=70",
    "mainImage": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80"
    ],
    "videoUrl": "https://www.youtube.com/embed/ScMzIvxBSi4",
    "features": [
      "Áreas verdes cuidadas",
      "Estacionamiento privado",
      "Seguridad 24/7",
      "Criptas familiares",
      "Capilla o salón ceremonial"
    ],
    "plans": [
      {
        "id": "nicho",
        "name": "Nicho individual",
        "capacity": "1 sepultura",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 287000,
        "description": "Opción accesible con mantención clara y ubicación definida.",
        "maintenanceNote": ""
      },
      {
        "id": "cripta",
        "name": "Cripta familiar",
        "capacity": "Hasta 4 sepulturas",
        "modality": "Prevención",
        "needType": "prevencion",
        "priceFrom": 537000,
        "description": "Espacio compartido para la familia, con mayor permanencia y cercanía.",
        "maintenanceNote": ""
      },
      {
        "id": "nicho-urg",
        "name": "Nicho en urgencia",
        "capacity": "1 sepultura",
        "modality": "Urgencia",
        "needType": "urgencia",
        "priceFrom": 410000,
        "description": "Disponibilidad inmediata con acompañamiento administrativo guiado.",
        "maintenanceNote": ""
      }
    ],
    "maintenanceCosts": {
      "type": "Anual",
      "summary": "Te explicamos con transparencia qué cubre la mantención y qué queda fuera, para que tu familia decida con tranquilidad.",
      "includes": [
        "Mantención de áreas verdes y caminos",
        "Aseo de espacios comunes",
        "Seguridad perimetral",
        "Gestión administrativa básica del contrato"
      ],
      "annualEstimate": 14350
    },
    "accessNotes": "Acceso principal por Av. Collao 980, Concepción. Estacionamiento habilitado para visitas familiares.",
    "transitNotes": "Consulta recorridos de transporte público cercanos según tu comuna de origen. Te ayudamos a evaluar la accesibilidad real para tu familia.",
    "rating": 4,
    "minPrice": 410000,
    "assignedExecutiveIds": [],
    "partnerSellerIds": []
  }
] as Prisma.ParkCreateInput[];
