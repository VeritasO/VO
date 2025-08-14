const fs = require('fs');
const path = require('path');

const coreDir = path.join(__dirname, 'core');
const engineFile = path.join(coreDir, 'contradictionEngine.ts');
const testFile = path.join(coreDir, 'contradictionEngine.test.ts');
const tsconfigFile = path.join(__dirname, 'tsconfig.json');

// 1. Check file existence and case
function fileExistsExact(fp) {
  if (!fs.existsSync(fp)) return false;
  const dir = path.dirname(fp);
  const real = fs.readdirSync(dir);
  return real.includes(path.basename(fp));
}

console.log(`\n[Step 1] Checking for core/contradictionEngine.ts and core/contradictionEngine.test.ts (case-sensitive):`);
let pass = true;
if (fileExistsExact(engineFile)) {
  console.log('✅ contradictionEngine.ts exists');
} else {
  console.error('❌ contradictionEngine.ts NOT FOUND in /core (case-sensitive!)');
  pass = false;
}
if (fileExistsExact(testFile)) {
  console.log('✅ contradictionEngine.test.ts exists');
} else {
  console.error('❌ contradictionEngine.test.ts NOT FOUND in /core (case-sensitive!)');
  pass = false;
}

// 2. Check import statement in test file
if (fs.existsSync(testFile)) {
  const testContent = fs.readFileSync(testFile, 'utf8');
  const relImport = /from\s+['"]\.\/contradictionEngine['"]/;
  console.log('\n[Step 2] Checking import statement in contradictionEngine.test.ts:');
  if (relImport.test(testContent)) {
    console.log('✅ Correct relative import found: from \'.\/contradictionEngine\'');
  } else {
    console.warn('⚠️ Import path NOT found or not correct (should be: from \'.\/contradictionEngine\')');
  }
}

// 3. Check/fix tsconfig.json for core include
console.log('\n[Step 3] Checking tsconfig.json for "core/**/*" include:');
if (fs.existsSync(tsconfigFile)) {
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigFile, 'utf8'));
  let changed = false;
  if (!tsconfig.include) {
    tsconfig.include = [];
    changed = true;
  }
  if (!tsconfig.include.includes('core/**/*')) {
    tsconfig.include.push('core/**/*');
    changed = true;
    console.log('🛠️  Added "core/**/*" to tsconfig.json "include"');
  } else {
    console.log('✅ "core/**/*" is present in "include"');
  }
  if (changed) {
    fs.writeFileSync(tsconfigFile, JSON.stringify(tsconfig, null, 2));
    console.log('✅ tsconfig.json updated.');
  }
} else {
  console.error('❌ tsconfig.json not found at project root.');
}

console.log('\nAll checks complete.\n');
