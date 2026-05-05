import express, { Router } from 'express';
import path from 'node:path';

interface Options{
    PORT: number;
    PUBLIC_PATH: string;
    routes: Router;
}
export class Server {

    private app = express();

    private readonly port: number;
    private readonly public_path: string;

    private readonly router: Router;

    constructor(option:Options){
        this.port = option.PORT;
        this.public_path = option.PUBLIC_PATH;
        this.router = option.routes;
    }

    async start() {


        //Midelwares
        this.app.use( express.json());
        this.app.use( express.urlencoded({ extended: true })); // x-www-form-urlencoded


        //Public folder
        this.app.use(express.static(this.public_path));

        //Routes
        this.app.use(this.router);

        // this.app.use((req, res) => {
        //     res.sendFile(path.join(process.cwd(), "public", "index.html"));
        // });


        this.app.listen(this.port, () => {
            console.log(`Server running on Port ${this.port}`);

        });



    }
}