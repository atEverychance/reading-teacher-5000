import { describe, it, expect } from 'vitest';
import { level1 } from '../../data/curriculum/level1';
import { LEVEL1_WORDS } from '../../data/phonics/level1';
import { validateTranslation, validatePhonemes } from '../../utils/translations';

describe('Level 1 Curriculum', () => {
  it('all words have proper translations', () => {
    const missingTranslations: string[] = [];

    level1.content.wordFamilies.forEach(family => {
      family.words.forEach(word => {
        const wordData = LEVEL1_WORDS[word.toLowerCase()];
        if (!wordData?.translation) {
          missingTranslations.push(word);
        } else {
          expect(validateTranslation(wordData.translation)).toBe(true);
        }
      });
    });

    expect(missingTranslations).toHaveLength(0,
      `Found words without translations: ${missingTranslations.join(', ')}`
    );
  });

  it('all words have proper phoneme breakdowns', () => {
    const missingPhonemes: string[] = [];

    level1.content.wordFamilies.forEach(family => {
      family.words.forEach(word => {
        const wordData = LEVEL1_WORDS[word.toLowerCase()];
        if (!wordData?.phonemes || !wordData?.translationPhonemes) {
          missingPhonemes.push(word);
        }
      });
    });

    expect(missingPhonemes).toHaveLength(0,
      `Found words without phoneme breakdowns: ${missingPhonemes.join(', ')}`
    );
  });

  it('has comprehensive teaching strategies', () => {
    expect(level1.content.teachingStrategies.length).toBeGreaterThan(0);
    level1.content.wordFamilies.forEach(family => {
      expect(family.teachingStrategy).toBeDefined();
      expect(family.troubleshooting).toBeDefined();
      expect(family.troubleshooting.length).toBeGreaterThan(0);
    });
  });
});