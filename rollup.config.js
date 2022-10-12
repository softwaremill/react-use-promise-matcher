import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
    input: `src/index.ts`,
    output: [
        {
            file: pkg.module,
            format: "es",
            sourcemap: true,
            globals: {
                react: "React",
            },
            entryFileNames: "[name].mjs",
        },
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true,
            globals: {
                react: "React",
            },
            entryFileNames: "[name].cjs",
        },
    ],
    // Indicate here external modules you don't want to include in your bundle (i.e.: 'lodash')
    external: ["react"],

    plugins: [typescript({ useTsconfigDeclarationDir: true })],
};
