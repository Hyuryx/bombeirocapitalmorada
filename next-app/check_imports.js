const fs = require('fs');
const path = require('path');

function walk(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
}

const srcDir = path.join(__dirname, 'src');
walk(srcDir, function(err, results) {
  if (err) throw err;
  
  // Get all exact file paths in lowercase
  const fileNames = results.map(f => ({
    original: f,
    lower: f.toLowerCase()
  }));

  let hasError = false;

  results.forEach(file => {
    if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Look for imports
      const importRegex = /import\s+.*?from\s+['"]([^'"]+)['"]/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        let importPath = match[1];
        
        // Only check relative imports
        if (importPath.startsWith('.')) {
          let resolvedPath = path.resolve(path.dirname(file), importPath);
          let resolvedLower = resolvedPath.toLowerCase();
          
          // Check if it exists with exact casing
          let found = false;
          let matchedLower = false;
          let actualFile = '';
          
          for (let fn of fileNames) {
            // Strip extension for comparison
            let noExtLower = fn.lower.replace(/\.[^/.]+$/, "");
            if (noExtLower === resolvedLower || fn.lower === resolvedLower) {
              matchedLower = true;
              actualFile = fn.original;
              
              let noExtOriginal = fn.original.replace(/\.[^/.]+$/, "");
              if (noExtOriginal === resolvedPath || fn.original === resolvedPath) {
                found = true;
              }
              break;
            }
          }
          
          if (matchedLower && !found) {
            console.log(`CASE MISMATCH in ${file}:`);
            console.log(`  Imported as: ${importPath}`);
            console.log(`  Actual file on disk: ${actualFile}`);
            hasError = true;
          }
        }
      }
    }
  });

  if (!hasError) {
    console.log("No case sensitivity issues found in imports.");
  }
});
