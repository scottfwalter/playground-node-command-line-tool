#!/usr/bin/env node

import meow from 'meow';
import * as readline from 'readline';
import chalk from 'chalk';
import terminalLink from 'terminal-link';

const log = console.log;

const readLineAsync = (defaultValue) => {
  const rl = readline.createInterface({
    input: process.stdin
  });

  return new Promise((resolve) => {
    rl.prompt();
    rl.on('line', (line) => {
      rl.close();
      resolve(line || defaultValue);
    });
  });
};

const cli = meow(`
	Usage
	  $ ${/[^/]*$/.exec(import.meta.url)[0]} <name>

	Options
	  --jedi, -j  Is a jedi
`, {
		autoHelp: true,
		importMeta: import.meta,
		flags: {
			jedi: {
				type: 'boolean',
				alias: 'j'
			}
		}
	}
	);

if (cli.input.length < 1) {
	cli.showHelp(2);
}

const jediName = cli.input[0];
const defaultColor = 'blue';
log(`Lightsaber Color [${defaultColor}]:`);
const lighsaberColor = await readLineAsync(defaultColor);

log(chalk.blue(jediName), chalk.yellow(`Is A Jedi ${cli.flags.jedi ? chalk.green('yes') : chalk.red('no')}`));
log('Lighsaber color: ', chalk.cyan(lighsaberColor));

const link = terminalLink('Star Wars', 'https://starwars.com');
log(link);