import { describe, it, expect } from 'vitest';
import { curriculum } from '../../data/curriculum';
import { WORD_DATA } from '../../data/phonics/wordData';

describe('Curriculum Word Translations', () => {
  it('all curriculum words have French translations', () => {
    const missingTranslations: Array<{word: string, level: number}> = [];
    const curriculumWords = new Set<string>();

    // Collect all words from curriculum
    curriculum.forEach(level => {
      level.content.wordFamilies.forEach(family => {
        family.words.forEach(word => {
          curriculumWords.add(word.toLowerCase());
        });
      });
    });

    // Check each curriculum word for translation
    curriculumWords.forEach(word => {
      const wordData = WORD_DATA[word];
      if (!wordData?.translation) {
        const level = curriculum.find(l => 
          l.content.wordFamilies.some(f => 
            f.words.some(w => w.toLowerCase() === word)
          )
        )?.level || 0;

        missingTranslations.push({ word, level });
      }
    });

    if (missingTranslations.length > 0) {
      console.log('\nMissing translations for curriculum words:');
      missingTranslations.forEach(({ word, level }) => {
        console.log(`Level ${level}: "${word}"`);
      });
    }

    expect(missingTranslations).toHaveLength(0, 
      `Found ${missingTranslations.length} curriculum words without translations`
    );
  });

  it('all translations have proper phoneme breakdowns', () => {
    const wordsWithMissingPhonemes: string[] = [];

    Object.entries(WORD_DATA).forEach(([word, data]) => {
      if (!data.phonemes || data.phonemes.length === 0) {
        wordsWithMissingPhonemes.push(`${word} (English phonemes)`);
      }
      if (!data.translationPhonemes || data.translationPhonemes.length === 0) {
        wordsWithMissingPhonemes.push(`${word} (French phonemes)`);
      }
    });

    expect(wordsWithMissingPhonemes).toHaveLength(0,
      `Found words with missing phoneme breakdowns:\n${wordsWithMissingPhonemes.join('\n')}`
    );
  });
});