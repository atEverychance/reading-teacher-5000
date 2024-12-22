"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("node:fs");
var path = require("node:path");
var node_url_1 = require("node:url");
var node_path_1 = require("node:path");
var __filename = (0, node_url_1.fileURLToPath)(import.meta.url);
var __dirname = (0, node_path_1.dirname)(__filename);
function convertWordsets() {
    var srcDir = path.join(__dirname, '../src');
    var curriculumDir = path.join(srcDir, 'data/curriculum');
    var phonicsDir = path.join(srcDir, 'data/phonics');
    var wordSetsDir = path.join(srcDir, 'data/wordsets/default');
    var levelsDir = path.join(wordSetsDir, 'levels');
    // Create output directories
    if (!fs.existsSync(wordSetsDir)) {
        fs.mkdirSync(wordSetsDir, { recursive: true });
    }
    if (!fs.existsSync(levelsDir)) {
        fs.mkdirSync(levelsDir, { recursive: true });
    }
    // Process each level
    var levelsData = [];
    var teachingStrategies = {};
    var assessmentCriteria = {};
    var _loop_1 = function (i) {
        try {
            // Import curriculum data
            var curriculumPath = path.join(curriculumDir, "level".concat(i, ".ts"));
            var phonicsPath = path.join(phonicsDir, "level".concat(i, ".ts"));
            // Read and evaluate curriculum file
            var curriculumContent = fs.readFileSync(curriculumPath, 'utf-8');
            var curriculumMatch = curriculumContent.match(/export const level\d+ = ({[\s\S]*});?\s*$/);
            if (!curriculumMatch) {
                throw new Error("Could not find exported object in ".concat(curriculumPath));
            }
            var curriculumData = eval("(".concat(curriculumMatch[1], ")"));
            // Read and evaluate phonics file
            var phonicsContent = fs.readFileSync(phonicsPath, 'utf-8');
            var phonicsMatch = phonicsContent.match(/export const level\d+ = ({[\s\S]*});?\s*$/);
            if (!phonicsMatch) {
                throw new Error("Could not find exported object in ".concat(phonicsPath));
            }
            var phonicsData_1 = eval("(".concat(phonicsMatch[1], ")"));
            // Extract level information
            levelsData.push({
                id: i,
                title: curriculumData.content.title,
                description: curriculumData.content.description.replace('magic ', 'magic e')
            });
            // Extract teaching strategies and assessment criteria
            teachingStrategies["level".concat(i)] = curriculumData.content.teachingStrategies;
            assessmentCriteria["level".concat(i)] = curriculumData.assessmentCriteria.map(function (criterion) {
                return criterion.startsWith('Understands magic ') ? criterion.replace('magic ', 'magic e') : criterion;
            });
            // Create level content
            var levelContent = {
                wordFamilies: curriculumData.content.wordFamilies.map(function (family) { return ({
                    pattern: family.pattern,
                    words: family.words.map(function (word) {
                        var _a, _b, _c;
                        return ({
                            english: word,
                            translation: ((_a = phonicsData_1[word.toLowerCase()]) === null || _a === void 0 ? void 0 : _a.translation) || '',
                            phonemes: ((_b = phonicsData_1[word.toLowerCase()]) === null || _b === void 0 ? void 0 : _b.phonemes) || [],
                            translationPhonemes: ((_c = phonicsData_1[word.toLowerCase()]) === null || _c === void 0 ? void 0 : _c.translationPhonemes) || [],
                            examples: family.examples
                        });
                    })
                }); })
            };
            // Write level file
            fs.writeFileSync(path.join(levelsDir, "level".concat(i, ".json")), JSON.stringify(levelContent, null, 2));
            console.log("Created level".concat(i, ".json"));
        }
        catch (error) {
            console.error("Error processing level ".concat(i, ":"), error);
            return "continue";
        }
    };
    for (var i = 1; i <= 4; i++) {
        _loop_1(i);
    }
    // Create metadata.json
    var metadata = {
        name: "Reading Teacher 5000 - Core Word Set",
        description: "A progressive phonics-based curriculum for early readers",
        version: "1.0.0",
        language: "english",
        targetAge: {
            min: 4,
            max: 8
        },
        levels: levelsData
    };
    fs.writeFileSync(path.join(wordSetsDir, 'metadata.json'), JSON.stringify(metadata, null, 2));
    console.log('Created metadata.json');
    // Create teaching.json
    var teaching = {
        strategies: teachingStrategies,
        assessmentCriteria: assessmentCriteria
    };
    fs.writeFileSync(path.join(wordSetsDir, 'teaching.json'), JSON.stringify(teaching, null, 2));
    console.log('Created teaching.json');
}
if (import.meta.url === "file://".concat(process.argv[1])) {
    try {
        convertWordsets();
        console.log('Conversion complete!');
    }
    catch (error) {
        console.error('Error during conversion:', error);
    }
}
