// doctrine/Book.ts
import { Contradiction } from "../cases/Case";

export interface Book {
  id: number;
  title: string;
  description: string;
  chapters: string[];
  status: 'draft' | 'active' | 'superseded';
}

export interface DoctrineLibrary {
  books: Book[];
  codifications: string[];
  version: string;
  reflect(contradiction: Contradiction): void;
}
