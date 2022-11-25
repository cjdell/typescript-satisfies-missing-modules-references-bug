const fs = require('fs');
const typescript = require('typescript');
const { underline, bold, green } = require('console-log-colors');

const fileName = './src/index.ts';
const contents = fs.readFileSync('./src/index.ts', 'utf8');

const { compilerOptions } = JSON.parse(fs.readFileSync('./tsconfig.json'));

console.log(underline(bold('Compile output WITH satisfies keyword...')))

const { outputText: outputTextWithSatisfies } = typescript.transpileModule(contents, {
    compilerOptions,
    transformers: [],
    reportDiagnostics: true,
    fileName,
});

console.log(...highlightRequires(outputTextWithSatisfies));

console.log(underline(bold('Compile output WITHOUT satisfies keyword...')))

const contentsWithoutSatisfies = contents.replace(' satisfies z.ZodSchema<MyObject>', '');

const { outputText: outputTextWithoutSatisfies } = typescript.transpileModule(contentsWithoutSatisfies, {
    compilerOptions,
    transformers: [],
    reportDiagnostics: true,
    fileName,
});

console.log(...highlightRequires(outputTextWithoutSatisfies));

function highlightRequires(source) {
    return source.split('\n').flatMap(line => line.includes('require') ? [green(line), bold('// This is missing from above'), '\n'] : [line, '\n']);
}
