import { BibleTranslation, BibleVerse } from './bible-structure';

// This will attempt to load Bible data from JSON files
// Falls back to null if not available
export async function loadBibleData(version: string): Promise<BibleTranslation | null> {
  try {
    const fileName = `bible-${version.toLowerCase()}.json`;
    const response = await fetch(`/data/${fileName}`);
    if (!response.ok) {
      console.log(`Bible data for ${version} not found, using fallback verses`);
      return null;
    }
    const data = await response.json();
    return data as BibleTranslation;
  } catch (error) {
    console.error(`Error loading Bible data for ${version}:`, error);
    return null;
  }
}

// Get all verses from a specific book and chapter
export function getChapterVerses(
  bible: BibleTranslation,
  bookName: string,
  chapterNum: number
): BibleVerse[] {
  const book = bible.books.find(b => b.name === bookName);
  if (!book) return [];
  
  const chapter = book.chapters.find(c => c.chapter === chapterNum);
  if (!chapter) return [];
  
  return chapter.verses;
}

// Get a specific verse
export function getVerse(
  bible: BibleTranslation,
  bookName: string,
  chapterNum: number,
  verseNum: number
): BibleVerse | null {
  const verses = getChapterVerses(bible, bookName, chapterNum);
  return verses.find(v => v.verse === verseNum) || null;
}

// Get random verse from entire Bible
export function getRandomVerse(bible: BibleTranslation): BibleVerse | null {
  const allVerses: BibleVerse[] = [];
  
  bible.books.forEach(book => {
    book.chapters.forEach(chapter => {
      allVerses.push(...chapter.verses);
    });
  });
  
  if (allVerses.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * allVerses.length);
  return allVerses[randomIndex];
}

// Get book names for a Bible translation
export function getBookNames(bible: BibleTranslation): string[] {
  return bible.books.map(book => book.name);
}

// Get number of chapters in a book
export function getChapterCount(bible: BibleTranslation, bookName: string): number {
  const book = bible.books.find(b => b.name === bookName);
  return book?.chapters.length || 0;
}

// Get number of verses in a chapter
export function getVerseCount(
  bible: BibleTranslation,
  bookName: string,
  chapterNum: number
): number {
  const book = bible.books.find(b => b.name === bookName);
  if (!book) return 0;
  
  const chapter = book.chapters.find(c => c.chapter === chapterNum);
  return chapter?.verses.length || 0;
}
