import { BLUEPRINTS_101_TO_150 } from '../src/data/blueprints101to150';
import { BLUEPRINTS_151_TO_200 } from '../src/data/blueprints151to200';
import { BLUEPRINTS_201_TO_250 } from '../src/data/blueprints201to250';
import { BLUEPRINTS_251_TO_300 } from '../src/data/blueprints251to300';
import { CanonicalPraiseItem } from '../src/data/canonical300/types';
import * as fs from 'fs';
import * as path from 'path';

// Helper to sanitize quotes in strings
function esc(str: string): string {
  return str.replace(/"/g, '\\"');
}

console.log("Loaded blueprints:");
console.log("101-150:", BLUEPRINTS_101_TO_150.length);
console.log("151-200:", BLUEPRINTS_151_TO_200.length);
console.log("201-250:", BLUEPRINTS_201_TO_250.length);
console.log("251-300:", BLUEPRINTS_251_TO_300.length);
