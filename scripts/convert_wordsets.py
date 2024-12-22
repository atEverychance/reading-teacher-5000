import json
import os
from pathlib import Path
import re

def clean_content(content):
    """Clean up TypeScript content by removing imports and type annotations."""
    # Remove imports
    content = re.sub(r'import.*?;', '', content)
    # Remove type annotations
    content = re.sub(r':\s*\w+(\[\])?', '', content)
    # Remove export const declarations
    content = re.sub(r'export const \w+ =\s*', '', content)
    # Remove trailing semicolon
    content = re.sub(r';\s*$', '', content)
    return content.strip()

def extract_word_families(content):
    """Extract word families from the TypeScript content."""
    families = []
    
    # Find the content object
    content_match = re.search(r'content:\s*{(.*?)},\s*assessment', content, re.DOTALL)
    if not content_match:
        return families
    
    content_str = content_match.group(1)
    
    # Find the wordFamilies array
    families_match = re.search(r'wordFamilies:\s*\[(.*?)\s*\]', content_str, re.DOTALL)
    if not families_match:
        return families
    
    families_content = families_match.group(1)
    
    # Split into individual family objects
    family_objects = re.finditer(r'{\s*(.*?)\s*}(?=\s*[,\]])', families_content, re.DOTALL)
    
    for family in family_objects:
        family_content = family.group(1)
        
        # Extract pattern
        pattern_match = re.search(r'pattern:\s*["\']([^"\']+)["\']', family_content)
        if not pattern_match:
            continue
        pattern = pattern_match.group(1)
        
        # Extract words
        words_match = re.search(r'words:\s*\[(.*?)\]', family_content, re.DOTALL)
        words = []
        if words_match:
            words_str = words_match.group(1)
            # Handle both single and double quotes
            words = re.findall(r'["\']([^"\']+)["\']', words_str)
        
        # Extract examples
        examples_match = re.search(r'examples:\s*\[(.*?)\]', family_content, re.DOTALL)
        examples = []
        if examples_match:
            examples_str = examples_match.group(1)
            # Handle both single and double quotes
            examples = re.findall(r'["\']([^"\']+)["\']', examples_str)
        
        families.append({
            "pattern": pattern,
            "words": words,
            "examples": examples
        })
    
    return families

def extract_teaching_strategies(content):
    """Extract teaching strategies from the TypeScript content."""
    strategies_match = re.search(r'teachingStrategies:\s*\[(.*?)\]', content, re.DOTALL)
    if strategies_match:
        return re.findall(r'["\']([^"\']+)["\']', strategies_match.group(1))
    return []

def extract_assessment_criteria(content):
    """Extract assessment criteria from the TypeScript content."""
    criteria_match = re.search(r'assessmentCriteria:\s*\[(.*?)\]', content, re.DOTALL)
    if criteria_match:
        criteria_str = criteria_match.group(1)
        criteria = re.findall(r'["\']([^"\']+)["\']', criteria_str)
        # Fix any split criteria
        fixed_criteria = []
        current_item = ""
        for item in criteria:
            if item.startswith("Understands magic"):
                current_item = item + "e pattern"
            elif item == " pattern" and current_item:
                continue
            else:
                if current_item:
                    fixed_criteria.append(current_item)
                    current_item = ""
                fixed_criteria.append(item)
        if current_item:
            fixed_criteria.append(current_item)
        return fixed_criteria
    return []

def extract_level_info(content):
    """Extract basic level information."""
    content_match = re.search(r'content:\s*{(.*?)},\s*assessment', content, re.DOTALL)
    if not content_match:
        return {"title": "", "description": ""}
    
    content_str = content_match.group(1)
    title_match = re.search(r'title:\s*["\']([^"\']+)["\']', content_str)
    desc_match = re.search(r'description:\s*["\']([^"\']+)["\']', content_str)
    
    title = title_match.group(1) if title_match else ""
    desc = desc_match.group(1) if desc_match else ""
    
    # Fix magic e pattern
    if "magic " in desc:
        desc = desc.replace("magic ", "magic e")
    
    return {
        "title": title,
        "description": desc
    }

def read_phonics_data(file_path):
    """Read phonics data from TypeScript file."""
    with open(file_path, 'r') as f:
        content = clean_content(f.read())
        
        # Extract the object containing phonics data
        data = {}
        word_matches = re.finditer(r'["\']([^"\']+)["\']\s*:\s*{\s*(.*?)\s*}(?=\s*[,\}])', content, re.DOTALL)
        
        for match in word_matches:
            word = match.group(1)
            word_data = match.group(2)
            
            translation_match = re.search(r'translation:\s*["\']([^"\']+)["\']', word_data)
            phonemes_match = re.search(r'phonemes:\s*\[(.*?)\]', word_data, re.DOTALL)
            trans_phonemes_match = re.search(r'translationPhonemes:\s*\[(.*?)\]', word_data, re.DOTALL)
            
            data[word] = {
                "translation": translation_match.group(1) if translation_match else "",
                "phonemes": re.findall(r'["\']([^"\']+)["\']', phonemes_match.group(1)) if phonemes_match else [],
                "translationPhonemes": re.findall(r'["\']([^"\']+)["\']', trans_phonemes_match.group(1)) if trans_phonemes_match else []
            }
        return data

def convert_wordsets():
    # Setup paths
    script_dir = Path(__file__).parent
    root_dir = script_dir.parent
    src_dir = root_dir / 'src'
    
    # Input directories
    curriculum_dir = src_dir / 'data' / 'curriculum'
    phonics_dir = src_dir / 'data' / 'phonics'
    
    # Output directory
    wordsets_dir = src_dir / 'data' / 'wordsets' / 'default'
    levels_dir = wordsets_dir / 'levels'
    
    # Create output directories
    levels_dir.mkdir(parents=True, exist_ok=True)
    
    # Process each level
    levels_data = []
    teaching_strategies = {}
    assessment_criteria = {}
    
    for i in range(1, 5):
        level_file = curriculum_dir / f'level{i}.ts'
        phonics_file = phonics_dir / f'level{i}.ts'
        
        try:
            # Read curriculum data
            with open(level_file, 'r') as f:
                curriculum_content = clean_content(f.read())
            
            # Extract level information
            level_info = extract_level_info(curriculum_content)
            level_info["id"] = i
            levels_data.append(level_info)
            
            # Extract teaching strategies and assessment criteria
            teaching_strategies[f"level{i}"] = extract_teaching_strategies(curriculum_content)
            assessment_criteria[f"level{i}"] = extract_assessment_criteria(curriculum_content)
            
            # Read phonics data
            phonics_data = read_phonics_data(phonics_file)
            
            # Create level content
            word_families = extract_word_families(curriculum_content)
            level_content = {
                "wordFamilies": [
                    {
                        "pattern": family["pattern"],
                        "words": [
                            {
                                "english": word,
                                "translation": phonics_data.get(word.lower(), {}).get("translation", ""),
                                "phonemes": phonics_data.get(word.lower(), {}).get("phonemes", []),
                                "translationPhonemes": phonics_data.get(word.lower(), {}).get("translationPhonemes", []),
                                "examples": family["examples"]
                            }
                            for word in family["words"]
                        ]
                    }
                    for family in word_families
                ]
            }
            
            # Write level file
            with open(levels_dir / f'level{i}.json', 'w') as f:
                json.dump(level_content, f, indent=2)
            print(f"Created level{i}.json")
            
        except Exception as e:
            print(f"Error processing level {i}: {e}")
            continue
    
    # Create metadata.json
    metadata = {
        "name": "Reading Teacher 5000 - Core Word Set",
        "description": "A progressive phonics-based curriculum for early readers",
        "version": "1.0.0",
        "language": "english",
        "targetAge": {
            "min": 4,
            "max": 8
        },
        "levels": levels_data
    }
    
    with open(wordsets_dir / 'metadata.json', 'w') as f:
        json.dump(metadata, f, indent=2)
    print("Created metadata.json")
    
    # Create teaching.json
    teaching = {
        "strategies": teaching_strategies,
        "assessmentCriteria": assessment_criteria
    }
    
    with open(wordsets_dir / 'teaching.json', 'w') as f:
        json.dump(teaching, f, indent=2)
    print("Created teaching.json")

if __name__ == '__main__':
    try:
        convert_wordsets()
        print("Conversion complete!")
    except Exception as e:
        print(f"Error during conversion: {e}")
