import { describe, it, expect } from 'vitest';
import { WORD_DATA } from '../../data/phonics/wordData';
import { curriculum } from '../../data/curriculum';
import { validateTranslation } from '../../utils/translations';

describe('Word Data', () => {
  it('has entries for all curriculum words', () => {
    const missingWords: string[] = [];
    
    curriculum.forEach(level => {
      level.content.wordFamilies.forEach(family => {
        family.words.forEach(word => {
          if (!WORD_DATA[word.toLowerCase()]) {
            missingWords.push(`Level ${level.level}: ${word}`);
          }
        });
      });
    });

    expect(missingWords).toHaveLength(0,
      `Missing word data for:\n${missingWords.join('\n')}`
    );
  });

  it('has valid French translations', () => {
    const invalidTranslations: string[] = [];

    Object.entries(WORD_DATA).forEach(([word, data]) => {
      if (!validateTranslation(data.translation)) {
        invalidTranslations.push(`${word}: ${data.translation}`);
      }
    });

    expect(invalidTranslations).toHaveLength(0,
      `Invalid French translations found:\n${invalidTranslations.join('\n')}`
    );
  });

  it('has consistent phoneme structures', () => {
    const inconsistentWords: string[] = [];

    Object.entries(WORD_DATA).forEach(([word, data]) => {
      const englishPhonemes = data.phonemes.map(p => p.sound).join('');
      const frenchPhonemes = data.translationPhonemes.map(p => p.sound).join('');

      if (englishPhonemes.toLowerCase() !== word.toLowerCase()) {
        inconsistentWords.push(`${word} (English phonemes don't match word)`);
      }
      if (frenchPhonemes.toLowerCase() !== data.translation.toLowerCase()) {
        inconsistentWords.push(`${word} (French phonemes don't match translation)`);
      }
    });

    expect(inconsistentWords).toHaveLength(0,
      `Found inconsistent phoneme structures:\n${inconsistentWords.join('\n')}`
    );
  });
});