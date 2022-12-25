const esbuild = require('esbuild')
const sveltePreprocess = require('svelte-preprocess')
const sveltePlugin = require('esbuild-svelte')
const {copy} = require('esbuild-plugin-copy')


const production = process.argv[2] === 'prod'
let watch = false
if (process.argv[2] === 'watch')
    watch = {
        onRebuild(error) {
            if (error) console.error((new Date()).toDateString() + ' FAILED: ', error.getMessage())
            else console.log((new Date()).toLocaleTimeString() + ' SUCCEEDED')
        }
    }

const worker = (fileName, output) => ({
    tsconfig: "tsconfig.json",
    treeShaking: true,
    platform: "browser",
    entryPoints: [fileName],
    bundle: true,
    watch,
    format: 'iife',
    target: 'es6',
    minify: production,
    sourcemap: false,
    outfile: output,
    plugins: []
})

const electron = {
    tsconfig: "tsconfig.json",
    treeShaking: true,
    platform: "node",
    entryPoints: ['./backend/index.ts'],
    bundle: true,
    watch,
    format: 'cjs',
    minify: production,
    external: ["electron", "sharp"],
    sourcemap: false,
    outfile: './build/index.js',
    plugins: [
        copy({
            assets: [
                {
                    from: [
                        './engine-core/assets-to-copy/*'
                    ],
                    to: ['./']
                },
                {
                    from: [
                        './assets-to-copy/*'
                    ],
                    to: ['./']
                }
            ]
        })
    ]
}

const workers = [
    worker("engine-core/workers/entity-worker.ts", "build/entity-worker.js"),
    worker("engine-core/workers/camera-worker.ts", "build/camera-worker.js"),
    worker("engine-core/workers/terrain-worker.ts", "build/terrain-worker.js"),
    worker("engine-core/workers/image-worker.ts", "build/image-worker.js"),
]

workers.forEach((worker, i) => {
    esbuild.build(worker)
        .then(() => console.log("SUCCESS - WORKER - " + i))
        .catch((err) => console.error(err))
})

esbuild.build(electron)
    .then(() => console.log("SUCCESS - BACKEND"))
    .catch((err) => console.error(err))


esbuild.build({
        tsconfig: "tsconfig.json",
        treeShaking: true,
        platform: "browser",
        entryPoints: ['./frontend/index.ts'],
        bundle: true,
        watch,
        format: 'iife',
        target: 'es6',
        minify: production,
        sourcemap: false,
        outfile: './build/frontend.js',

        plugins: [
            sveltePlugin({
                preprocess: sveltePreprocess({typescript: {tsconfigFile: "tsconfig.json"}}),
                filterWarnings: () => false
            })
        ],
        loader: {".glsl": "text", ".frag": "text", ".vert": "text"}
    }
)
    .then(() => console.log("SUCCESS - FRONTEND"))
    .catch((err) => console.error(err))
