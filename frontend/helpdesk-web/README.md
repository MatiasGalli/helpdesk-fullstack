# HelpDesk – Sistema de Tickets (Frontend + Backend)

Sistema de mesa de ayuda (HelpDesk) desarrollado como prueba técnica.  
Incluye autenticación, gestión de tickets, filtros, edición de estado/prioridad y eliminación.

---

## Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

### Backend
- **.NET SDK 8.0**
  ```bash
  dotnet --version
  ```
- **SQLite** (incluido vía Entity Framework Core, no requiere instalación manual)

### Frontend
- **Node.js 18+**
  ```bash
  node --version
  ```
- **Angular CLI**
  ```bash
  npm install -g @angular/cli
  ```

---

## Pasos de ejecución

### 1 Backend (.NET)

Desde la carpeta `backend`:

```bash
dotnet restore
dotnet build
dotnet run --project HelpDesk.Api
```

El backend quedará disponible en:

- **API:** http://localhost:5293  
- **Swagger:** http://localhost:5293/swagger

---

### 2 Frontend (Angular)

Desde la carpeta `frontend/helpdesk-web`:

```bash
npm install
ng serve
```

El frontend estará disponible en:

- **http://localhost:4200**

---

## Usuario de prueba

Para ingresar al sistema utiliza las siguientes credenciales:

- **Usuario:** `admin`
- **Contraseña:** `admin123`

> Estas credenciales están hardcodeadas únicamente para fines de la prueba técnica.

---

## Decisiones técnicas

### Arquitectura Backend
- Arquitectura **Clean Architecture**:
  - `Domain`: entidades y enums
  - `Application`: lógica de negocio, validaciones y DTOs
  - `Infrastructure`: persistencia con Entity Framework Core (SQLite)
  - `Api`: controladores, autenticación y configuración
- **Entity Framework Core** como ORM
- **SQLite** como base de datos ligera
- **JWT** para autenticación
- **FluentValidation** para validaciones
- **Swagger** para documentación y pruebas de API

### Frontend
- **Angular (standalone components)**
- **HttpClient** para consumo de API
- Manejo de estado simple a nivel de componente
- Formularios reactivos para login y creación/edición de tickets
- Diseño intencionalmente simple, priorizando funcionalidad y claridad

### Decisiones clave
- Se priorizó **funcionalidad completa** sobre diseño visual avanzado
- El sistema implementa el flujo completo:
  - Login
  - Listado paginado de tickets
  - Filtros por estado y prioridad
  - Edición en línea de estado y prioridad
  - Vista de detalle
  - Eliminación de tickets
- El diseño puede evolucionar fácilmente sin afectar la lógica existente

---

## Funcionalidades implementadas

- Autenticación con JWT
- CRUD completo de tickets
- Filtros por estado y prioridad
- Paginación
- Edición directa de estado y prioridad
- Eliminación con confirmación
- Manejo de errores básico en frontend

---

## Testing

El proyecto incluye pruebas unitarias básicas tanto en backend como en frontend.

### Backend

```bash
dotnet test
```

### Frontend

```bash
ng test --watch=false
```

Las pruebas validan la correcta creación de componentes, servicios, guards e interceptores, asegurando que la aplicación se ejecute sin errores.

---

##  Notas finales

Este proyecto fue desarrollado con foco en:
- claridad de código
- separación de responsabilidades
- facilidad de mantenimiento
- cumplimiento estricto de los requisitos funcionales

“Opté por un diseño simple y funcional, sin frameworks de UI adicionales, priorizando claridad, mantenibilidad y foco en la lógica del sistema. El objetivo fue mejorar la experiencia visual sin agregar complejidad innecesaria al proyecto.”