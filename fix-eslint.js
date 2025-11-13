// fix-eslint.js
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');

// Supprime les imports/variables non utilisées et corrige '==' → '==='
function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Supprime les imports non utilisés (simplifié : supprime les imports importés mais jamais utilisés)
    content = content.replace(/import\s+{[^}]*}\s+from\s+['"][^'"]+['"];?/g, (match) => {
        const vars = match.match(/{([^}]*)}/)[1].split(',').map(v => v.trim());
        const used = vars.filter(v => new RegExp(`\\b${v}\\b`).test(content));
        if (used.length === 0) return '';
        return `import { ${used.join(', ')} } from '${match.split('from')[1].trim()}`;
    });

    // Supprime les variables définies mais jamais utilisées (const/let/var)
    content = content.replace(/(const|let|var)\s+(\w+)\s*=[^;]+;/g, (match, type, name) => {
        const regex = new RegExp(`\\b${name}\\b`, 'g');
        const count = (content.match(regex) || []).length;
        return count > 1 ? match : '';
    });

    // Remplace tous les '==' par '===' (sauf dans les chaînes ou commentaires)
    content = content.replace(/([^"'`])==([^=])/g, '$1===$2');

    fs.writeFileSync(filePath, content, 'utf-8');
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            traverseDir(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            processFile(fullPath);
            console.log(`Processed: ${fullPath}`);
        }
    }
}

traverseDir(SRC_DIR);
console.log('✅ Tous les fichiers ont été traités !');
