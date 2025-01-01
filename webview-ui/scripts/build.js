const { build } = require("esbuild")
const { copy } = require("esbuild-plugin-copy")
const path = require("path")

async function buildWebview() {
    try {
        await build({
            entryPoints: ["src/index.tsx"],
            bundle: true,
            outfile: "build/static/js/main.js",
            minify: true,
            sourcemap: true,
            format: "iife",
            target: ["chrome58", "firefox57", "safari11", "edge16"],
            loader: {
                ".tsx": "tsx",
                ".ts": "ts",
                ".js": "jsx",
                ".css": "css",
                ".svg": "dataurl",
                ".png": "dataurl",
                ".jpg": "dataurl",
                ".gif": "dataurl",
            },
            plugins: [
                copy({
                    resolveFrom: "cwd",
                    assets: {
                        from: ["./public/*"],
                        to: ["./build"],
                    },
                }),
            ],
        })
        console.log("Build completed successfully!")
    } catch (error) {
        console.error("Build failed:", error)
        process.exit(1)
    }
}

buildWebview() 