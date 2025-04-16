import fastify from "fastify";
import { Visualizer } from "../core/index.js";
import defaultConfig from "../.config/defaultConfig.js";
import cors from "@fastify/cors";
import logger from "../.config/logger.js";
import { getCurrentConfig } from "../.config/cached-config/cachedConfig.js";
import { parseBoolean, parseArray } from "./functions.js";

const app = fastify();

await app.register(cors, {
    origin: "http://localhost:3000",
    credentials: true
});

app.get("/api/tree", (req, reply) => {
    const query = req.query;

    const config = {
        ...defaultConfig,
        pth: query.pth || process.cwd(),
        showHidden: parseBoolean(query.showHidden, defaultConfig.showHidden),
        showLastModified: parseBoolean(
            query.showLastModified,
            defaultConfig.showLastModified
        ),
        showSize: parseBoolean(query.showSize, defaultConfig.showSize),
        showExtention: parseBoolean(
            query.showExtention,
            defaultConfig.showExtention
        ),
        maxDepth: parseInt(query.maxDepth, defaultConfig.maxDepth),
        showContentFile: parseBoolean(
            query.showContentFile,
            defaultConfig.showContentFile
        ),
        fileTypes: parseArray(query.fileTypes),
        skipDirs: parseArray(query.skipDirs)
    };

    logger.info("📁 Tree request config");

    try {
        const visualizer = new Visualizer(config);
        const tree = visualizer.generateTree();
        reply.status(200).send(tree);
    } catch (error) {
        logger.error("❌ Error generating tree:", error);
        reply.status(500).send({ error: error.message });
    }
});

app.get("/api/config", (req, reply) => {
    reply.status(200).send(getCurrentConfig());
});

app.listen({ port: 21520 }, (err, address) => {
    if (err) {
        logger.error("🚨 Error starting server:", err);
        process.exit(1);
    }
    logger.info(`🚀 Server listening on ${address}`);
});
