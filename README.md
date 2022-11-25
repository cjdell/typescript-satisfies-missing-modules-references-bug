# Demostrating the issue of using the TypeScript 4.9 "satisfies" keyword with programmatic compile

## Running

    yarn
    yarn compile

You will see the issue of missing module imports when using the `satisfies` keyword. Removing this keyword results in the modules being imported as one would expect.

I encountered this issue whilst using the `ts-loader` plugin with the WebPack project. This repo simulates an approximation of the way `ts-loader` invokes the TypeScript compiler. Related discussion:

https://github.com/TypeStrong/ts-loader/issues/1511

## Workaround

Inserting the missing dependency import names as bare evaluations forces the bundler to include the modules at runtime. See the top of `src/index.ts`.

Also, simply removing the `satisfies` keyword works as shown the `compile.js` script.
