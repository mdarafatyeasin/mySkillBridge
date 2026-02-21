import app from "./app";
import { prisma } from "./lib/prisma";
const PORT = process.env.PORT || 4000;
async function main() {
    try {
        await prisma.$connect();
        console.log("bd connected success");
        app.listen(PORT, () => {
            console.log(`server is running on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.log("something went wrong", err);
        prisma.$disconnect();
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map