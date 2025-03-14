import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';
import { Book } from '@/interfaces/Book';

export async function GET(request: NextRequest) {
  // Endpoint para obtener los libros del json. futuramente puede cambiar a implementar un fetch desde una base de datos.
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('search');
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = 20;

  const filePath = path.join(process.cwd(), 'data/books.json');
  
  try {
    const jsonData = await fs.readFile(filePath, 'utf8');
    const books: Book[] = JSON.parse(jsonData);

    let filteredBooks = books;

    if (searchTerm && searchTerm.trim() !== '') {
      filteredBooks = filteredBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const offset = (page - 1) * limit;
    const paginatedBooks = filteredBooks.slice(offset, offset + limit);
    const totalPages = Math.ceil(filteredBooks.length / limit);
    // Regresar los libros y el total de las páginas o particiones disponibles.
    // El books debe de seguir la estructura de Book interface.
    return new Response(JSON.stringify({
      books: paginatedBooks,
      totalPages,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(`Error reading the json file: ${error.message}`, {
        status: 500,
      });
    }
    return new Response(`Unknown error occurred reading the json file`, {
      status: 500,
    });
  }
}