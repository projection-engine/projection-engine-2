const esbuild = require("esbuild")
const sveltePreprocess = require("svelte-preprocess")
const sveltePlugin = require("esbuild-svelte")
const {copy} = require("esbuild-plugin-copy")

const OUTPUT = "../build/src/"
const production = process.argv[2] === "prod"
const COMMON = {
    tsconfig: "tsconfig.json",
    bundle: true,
    target: ["es2022"],
    minify: production,
    sourcemap: !production,
    ignoreAnnotations: true,
    loader: {".glsl": "text", ".frag": "text", ".vert": "text", ".svg": "text"}
}

const worker = (fileName, outputFile) => ({
    ...COMMON,
    platform: "browser",
    entryPoints: [fileName],
    format: "iife",
    outfile: OUTPUT + outputFile + ".js",
    plugins: []
})

const frontend = (fileName, outputName) => ({
    ...COMMON,
    platform: "browser",
    entryPoints: ["./window" + fileName],
    format: "iife",
    outfile: OUTPUT + outputName + ".js",
    plugins: [
        sveltePlugin({
            preprocess: sveltePreprocess({typescript: {tsconfigFile: "tsconfig.json"}}),
            filterWarnings: () => false
        })
    ],
})

start().catch(console.error)

async function start() {
    const contexts = []
    contexts.push(esbuild.context({
        ...frontend("/editor/editor-window.ts", "editor-window"),
        plugins: [
            sveltePlugin({
                preprocess: sveltePreprocess({typescript: {tsconfigFile: "tsconfig.json"}}),
                filterWarnings: () => false
            }),
            copy({assets: [{from: ["./static/*"], to: ["./"]}]})]
    }))


    const resolvedContexts = await Promise.all(contexts)
    resolvedContexts.forEach((context, i) => {
        console.log("CONTEXT " + i)
        context.watch()
    })

}