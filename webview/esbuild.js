const esbuild = require("esbuild");
const sveltePreprocess = require("svelte-preprocess");
const sveltePlugin = require("esbuild-svelte");
const {copy} = require("esbuild-plugin-copy");

const production = process.argv[2] === "prod";

function frontend(fileName, outputName, withCopy = false) {
    const plugins = [
        sveltePlugin({
            preprocess: sveltePreprocess({typescript: {tsconfigFile: "tsconfig.json"}}),
            filterWarnings: () => false
        })
    ];
    if (withCopy) {
        plugins.push(copy({
            assets: [{
                from: ["./static/*"],
                to: ["./"]
            }]
        }));
    }
    return {
        tsconfig: "tsconfig.json",
        bundle: true,
        target: ["es2022"],
        minify: production,
        sourcemap: !production,
        ignoreAnnotations: true,
        loader: {
            ".glsl": "text",
            ".frag": "text",
            ".vert": "text",
            ".svg": "text"
        },
        platform: "browser",
        entryPoints: [fileName],
        format: "iife",
        outfile: "../build/src/" + outputName + ".js",
        plugins
    };
};

start().catch(console.error);

async function start() {
    (await esbuild.context(frontend("./views/view-window.ts", "view-window", true)))
        .watch(console.log)
        .catch(console.error);
    (await esbuild.context(frontend("./views/header-window.ts", "header-window")))
        .watch(console.log)
        .catch(console.error);
}
