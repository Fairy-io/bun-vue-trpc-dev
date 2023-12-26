import Github from 'github-api';
import { deploy } from './deploy';

deploy(Github, process.argv.slice(2)).catch(console.error);
