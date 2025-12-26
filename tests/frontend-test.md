# Frontend Tests (HelpDesk Web)

## Ubicación
Los tests del frontend se encuentran junto al código de la aplicación, utilizando archivos `*.spec.ts` en:

- `frontend/helpdesk-web/src/app/**`

El proyecto utiliza **Angular con componentes standalone** y TestBed para pruebas unitarias.

---

## Requisitos previos

- Node.js 18 o superior
- Angular CLI instalado
- Dependencias del proyecto instaladas

Verificar versiones:
```bash
node --version
ng version
```

Instalar dependencias:
```bash
cd frontend/helpdesk-web
npm install
```

---

## Cómo ejecutar los tests

Desde la carpeta del frontend:

```bash
cd frontend/helpdesk-web
ng test --watch=false
```

Este comando ejecuta todas las pruebas una sola vez (modo CI).

---

## Qué se está probando

Las pruebas incluidas validan:

- Creación de componentes principales:
  - Login
  - Listado de tickets
  - Detalle de ticket
  - Creación de ticket
  - Navbar
- Servicios principales (AuthService, TicketsService)
- Guards e interceptores de autenticación

> Las pruebas están orientadas a verificar que los componentes y servicios se inicialicen correctamente y que la inyección de dependencias funcione sin errores.

---

## Decisiones técnicas

- Se implementaron **tests unitarios básicos (smoke tests)** para asegurar estabilidad general del frontend.
- No se incluyeron pruebas e2e para mantener el alcance acorde al tiempo de la prueba técnica.
- Se priorizó asegurar que el routing, guards e interceptores no rompan el arranque de la aplicación.

---

## Troubleshooting

### Error: "No provider found for ActivatedRoute"

Este error puede aparecer en tests de componentes que usan `routerLink` o `ActivatedRoute`.

Solución aplicada:
- Uso de `provideRouter([])` en los archivos `.spec.ts` para simular el router.

---

## Resultado esperado

Al ejecutar correctamente los tests, se debe obtener un resultado similar a:

```text
Total tests: X
Passed: X
Failed: 0
```

Esto confirma que el frontend se encuentra estable y correctamente configurado.