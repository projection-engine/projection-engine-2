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
        minify: false,
        sourcemap: true,
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
}

esbuild.context(frontend("./views/view-window.ts", "view-window", true))
    .then(c => {
        console.log("BUILDING DONE FOR VIEW WINDOW");
        c.watch()
            .then(() => console.log("VIEW WINDOW OK"))
            .catch(() => console.error("VIEW WINDOW ERROR"));
    })
    .catch(() => console.error("VIEW WINDOW ERROR"));

esbuild.context(frontend("./views/header-window.ts", "header-window"))
    .then(async c => {
        console.log("BUILDING DONE FOR HEADER WINDOW");
        c.watch()
            .then(() => console.log("HEADER WINDOW OK"))
            .catch(() => console.error("HEADER WINDOW ERROR"));
    })
    .catch(() => console.error("HEADER WINDOW ERROR"));
