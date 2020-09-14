module.exports = {
    apps: [{
        name: "line_agent",
        script: "./index.js",
        node_args: "--max-old-space-size=512  --max-semi-space-size=64",
        instances: 4,
        exec_mode: "cluster"
    }, {
        name: "line_push",
        script: "./index_service.js",
        node_args: "--max-old-space-size=512  --max-semi-space-size=64",
        instances: 1,
        exec_mode: "cluster"
    }]
}