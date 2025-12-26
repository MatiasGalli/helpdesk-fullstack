# Backend Tests (HelpDesk)

## Ubicación
Los tests del backend se encuentran en el proyecto:

- `backend/HelpDesk.Tests` (xUnit)

Este proyecto valida principalmente la capa **Application**, donde se concentra la lógica de negocio y las validaciones.

---

## Requisitos previos

- .NET SDK 8.x
- Runtime de .NET 8 instalado
- Dependencias restauradas correctamente

Verificar versión instalada:
```bash
dotnet --version
```

---

## Cómo ejecutar los tests

Desde la **raíz del repositorio**:

```bash
dotnet test backend/HelpDesk.Tests/HelpDesk.Tests.csproj
```

O bien, desde la carpeta `backend/`:

```bash
cd backend
dotnet test
```

---

## Qué se está probando

Las pruebas incluidas son **unitarias** y están orientadas a validar:

- Validaciones de entrada usando **FluentValidation**
- Reglas de negocio básicas en la capa Application
- Casos como:
  - Campos requeridos
  - Valores inválidos
  - Estados y prioridades permitidas

> No se utilizan bases de datos reales ni infraestructura externa, siguiendo el principio de tests rápidos y aislados.

---

## Decisiones técnicas

- Se priorizaron **tests de lógica y validación** por sobre tests de integración debido al tiempo acotado de la prueba.
- Se evitó mockear infraestructura compleja para mantener los tests simples y fáciles de ejecutar.
- El objetivo principal es asegurar que la lógica de negocio no permita estados inválidos.

---

## Troubleshooting

### Error: "Especifique un archivo de proyecto o de solución"

Esto ocurre cuando el comando se ejecuta desde una carpeta que no contiene un `.sln` o `.csproj`.

Solución:
```bash
dotnet test backend/HelpDesk.Tests/HelpDesk.Tests.csproj
```

---

### Error: Problemas con SDK o Runtime

Verificar SDKs y runtimes instalados:
```bash
dotnet --list-sdks
dotnet --list-runtimes
```

Asegurarse de tener instalado:
- `Microsoft.NETCore.App 8.x`

---

## Resultado esperado

Al ejecutar correctamente los tests, se debe obtener un resultado similar a:

```text
Total tests: X
Passed: X
Failed: 0
```

Esto confirma que la lógica del backend funciona correctamente.
