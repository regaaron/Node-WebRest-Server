import express from 'express';
import path from 'node:path';

interface Options{
    PORT: number;
    PUBLIC_PATH: string;
}
export class Server {

    private app = express();

    private readonly port: number;
    private readonly public_path: string;

    constructor(option:Options){
        this.port = option.PORT;
        this.public_path = option.PUBLIC_PATH;
    }

    async start() {

        this.app.use(express.static(this.public_path));

        // this.app.use((req, res) => {
        //     res.sendFile(path.join(process.cwd(), "public", "index.html"));
        // });
        this.app.listen(this.port, () => {
            console.log(`Server running on Port ${this.port}`);

        });



    }
}