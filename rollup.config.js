// import resolve from "rollup-plugin-node-resolve";
import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import json from "rollup-plugin-json";
// import react from "react";
// import reactDom from "react-dom";
// import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const libraryName = "react-use-promise-matcher";

export default {
    input: `src/${libraryName}.ts`,
    output: [
        {
            file: pkg.main,
            format: "es",
            sourcemap: true,
            globals: {
                react: "React",
            },
        },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: ["react"],

    plugins: [
        // resolve({
        //     // the fields to scan in a package.json to determine the entry point
        //     // if this list contains "browser", overrides specified in "pkg.browser"
        //     // will be used
        //     mainFields: ["module", "main"], // Default: ['module', 'main']

        //     // not all files you want to resolve are .js files
        //     extensions: [".ts", ".tsx"], // Default: [ '.mjs', '.js', '.json', '.node' ]

        //     // Lock the module search in this path (like a chroot). Module defined
        //     // outside this path will be marked as external
        //     jail: "./src/", // Default: '/'

        //     // Set to an array of strings and/or regexps to lock the module search
        //     // to modules that match at least one entry. Modules not matching any
        //     // entry will be marked as external
        //     // only: ["some_module", /^@some_scope\/.*$/], // Default: null

        //     // If true, inspect resolved files to check that they are
        //     // ES2015 modules
        //     modulesOnly: true, // Default: false

        //     // Force resolving for these modules to root's node_modules that helps
        //     // to prevent bundling the same package multiple times if package is
        //     // imported from dependencies.
        //     dedupe: ["react", "react-dom"], // Default: []

        //     // Any additional options that should be passed through
        //     // to node-resolve
        //     customResolveOptions: {
        //         moduleDirectory: "js_modules",
        //     },
        // }),
        // Allow json resolution
        json(),
        // Compile TypeScript files
        typescript({ useTsconfigDeclarationDir: true }),

        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        // resolve(),

        // Resolve source maps to the original source
        sourceMaps(),
    ],
};
