import phonemeData from './phoneme-config.json';

interface BasePhonemeInfo {
  sound: string;
  examples: string[];
  description: string;
}

interface PhonemeWithIPA extends BasePhonemeInfo {
  ipa: string;
}

interface BlendInfo extends BasePhonemeInfo {
  components: string[];
  ipa?: string;
}

interface PhonemeConfig {
  vowels: {
    short: { [key: string]: PhonemeWithIPA };
    long: { [key: string]: PhonemeWithIPA };
  };
  consonants: {
    stops: { [key: string]: PhonemeWithIPA };
    fricatives: { [key: string]: PhonemeWithIPA };
    nasals: { [key: string]: PhonemeWithIPA };
    approximants: { [key: string]: PhonemeWithIPA };
  };
  blends: {
    initial: { [key: string]: BlendInfo };
    final: { [key: string]: BlendInfo };
  };
  digraphs: {
    consonant: { [key: string]: PhonemeWithIPA };
    vowel: { [key: string]: PhonemeWithIPA };
  };
}

const config = phonemeData as PhonemeConfig;

export function getPhonemeSound(phoneme: string): string {
  // Search through all categories to find the phoneme
  const searchCategories = [
    [config.vowels.short, config.vowels.long],
    [config.consonants.stops, config.consonants.fricatives, config.consonants.nasals, config.consonants.approximants],
    [config.blends.initial, config.blends.final],
    [config.digraphs.consonant, config.digraphs.vowel]
  ];

  for (const categoryGroup of searchCategories) {
    for (const category of categoryGroup) {
      if (phoneme in category) {
        return category[phoneme].sound;
      }
    }
  }

  // If not found, return the phoneme itself
  return phoneme;
}

export function getPhonemeInfo(phoneme: string): BasePhonemeInfo | null {
  const searchCategories = [
    [config.vowels.short, config.vowels.long],
    [config.consonants.stops, config.consonants.fricatives, config.consonants.nasals, config.consonants.approximants],
    [config.blends.initial, config.blends.final],
    [config.digraphs.consonant, config.digraphs.vowel]
  ];

  for (const categoryGroup of searchCategories) {
    for (const category of categoryGroup) {
      if (phoneme in category) {
        return category[phoneme];
      }
    }
  }

  return null;
}

export default config;
