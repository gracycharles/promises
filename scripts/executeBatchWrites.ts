import * as fs from 'fs';
import * as path from 'path';
import { BATCH_101_TO_150, ItemDef } from './writeAllCanonicalFiles';
import { BATCH_151_TO_200 } from './batch151defs';
import { BATCH_201_TO_250 } from './batch201defs';
import { BATCH_251_TO_300 } from './batch251defs';

function writeBatchFile(filename: string, batchVarName: string, items: ItemDef[]) {
  const lines: string[] = [];
  lines.push(`import { CanonicalPraiseItem } from './types';`);
  lines.push(``);
  lines.push(`/**`);
  lines.push(` * Canonical Biblical NKJV Data for 1000 Praises`);
  lines.push(` * Strictly restricted to what is written in the Tamil text,`);
  lines.push(` * verified against canonical NKJV scriptures.`);
  lines.push(` */`);
  lines.push(`export const ${batchVarName}: Record<number, CanonicalPraiseItem> = {`);

  items.forEach(item => {
    lines.push(`  ${item.id}: {`);
    lines.push(`    id: ${item.id},`);
    lines.push(`    tamilText: ${JSON.stringify(item.tamilText)},`);
    lines.push(`    tamilRef: ${JSON.stringify(item.tamilRef)},`);
    lines.push(`    englishRef: ${JSON.stringify(item.englishRef)},`);
    lines.push(`    praiseTitle: ${JSON.stringify(item.praiseTitle)},`);
    lines.push(`    verseText: ${JSON.stringify(item.verseText)},`);
    lines.push(`    theologicalContext: ${JSON.stringify(item.theologicalContext)}`);
    lines.push(`  },`);
  });

  lines.push(`};`);
  lines.push(``);

  const filePath = path.join(process.cwd(), 'src', 'data', 'canonical300', filename);
  fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
  console.log(`Wrote ${items.length} items to ${filePath}`);
}

writeBatchFile('batch101to150.ts', 'CANONICAL_BATCH_101_TO_150', BATCH_101_TO_150);
writeBatchFile('batch151to200.ts', 'CANONICAL_BATCH_151_TO_200', BATCH_151_TO_200);
writeBatchFile('batch201to250.ts', 'CANONICAL_BATCH_201_TO_250', BATCH_201_TO_250);
writeBatchFile('batch251to300.ts', 'CANONICAL_BATCH_251_TO_300', BATCH_251_TO_300);

console.log("All 4 canonical batches written successfully!");
