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
        },
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true,
            globals: {
                react: "React",
            },
        },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: ["react"],

    plugins: [typescript({ useTsconfigDeclarationDir: true })],
};
