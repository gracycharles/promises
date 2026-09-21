import * as fs from 'fs';
import * as path from 'path';
import { BLUEPRINTS_101_TO_150 } from '../src/data/blueprints101to150';
import { BLUEPRINTS_151_TO_200 } from '../src/data/blueprints151to200';
import { BLUEPRINTS_201_TO_250 } from '../src/data/blueprints201to250';
import { BLUEPRINTS_251_TO_300 } from '../src/data/blueprints251to300';
import { CanonicalPraiseItem } from '../src/data/canonical300/types';

// We will generate the 4 canonical batches directly matching the raw blueprints 101 to 300!
console.log("Ready to generate canonical batches 101-300");
