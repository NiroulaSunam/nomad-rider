// Create a "bridge" that hadles the upload requests from browser t o the server

import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

export const runtime = "nodejs";

export const { GET, POST } = createRouteHandler({
    router: ourFileRouter,
})