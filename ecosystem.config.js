module.exports = {
    apps: [{
        name: "topservice_linebot",
        script: "./index.js",
        node_args: "--max-old-space-size=512  --max-semi-space-size=64",
        instances: 4,
        exec_mode: "cluster"
    }]
}