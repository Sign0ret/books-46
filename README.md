## Delivery 1 web equipo 46.
Este es nuestro entregable con una interfaz sencilla que mediante un endpoint obtiene los libros estáticos de un json.

## Miembros del equipo 46.
- Carlos Iván Armenta Naranjo | A01643070
- Jorge Javier Blásquez Gonzalez | A01637706 
- Adolfo Hernández Signoret | A01637184
- Arturo Ramos Martínez | A01643269
- Moisés Adrián Cortés Ramos | A01642492
- Bryan Ithan Landín Lara | A01636271


## Verlo deployeado en internet
1. Visitar https://books-46.vercel.app/

## Como ejecutarlo localmente
1. Clonar el repositorio:
```
git clone https://github.com/Sign0ret/books-46.git
```
2. Instalar las dependencias utilizando pnpm.
```
pnpm install
```
3. Ejecutar en modo producción.
```
pnpm run start
```
4. Visitar http://localhost:3000

## Puntos que cubrimos.
- Datos estáticos en /data/books.json (utilizamos Perplexity para no tener qe hacerlos todos manuales y poder usar datos realisticos)
- Interface del libro en /src/interfaces/Book.ts que utilizamos para no tener errores en typescript.
- Ruta de endpoint GET en /src/app/api/books/route.ts con fetch por búsqueda o por paginación también.
- Layout con metadata en /src/app/layout.tsx
- Página principal / con uso de useEffect, useState y useCallback en /src/app/page.tsx y fetches con paginación.
- Componente de barra de búsqueda en /src/components/SearchComponent.tsx con uso de debounce para hacer búsquedas cuando termina de escribir la persona.
- Componente de grid de libros en /src/components/GridComponent.tsx con uso de paginación para no hacer fetches gigantes sino particionados.

## Link a nuestro video explicando las partes del proyecto:
- https://www.canva.com/design/DAGhqVeNUN8/2-uuafTqQKV34zDdzxEmeQ/watch?utm_content=DAGhqVeNUN8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1dd6be5149