import { Request, Response } from "express"
import { todo } from "node:test"
import { prisma } from "../../data/postgres"


const todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy bread', createdAt: null },
    { id: 3, text: 'Buy butter', createdAt: new Date() },

] 



export class TodosController {

    //DI
    constructor() {

    }

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos)
    }

    public getTodoById = (req:Request,res:Response) =>{

        const id = +req.params.id!;
        if(isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        const todo = todos.find(todo => todo.id === id);

        if (!todo) {
            return res.status(404).json({ error: `Todo with id '${id}' not found` });
        }
        res.json(todo);
        
    }

    public createTodo = async (req:Request,res:Response) =>{
        const { text } = req.body;
        if ( !text ) return res.status(400).json({ error: 'Text property is required' });

        const todo = await prisma.todo.create({
            data: {
                text
            }
        })
       
        res.status(201).json(todo);
    }

    public updateTodo = (req:Request,res:Response) =>{
        const id = +req.params.id!;
        if(isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        const todo = todos.find(todo => todo.id === id);
        if(!todo) {
            return res.status(404).json({ error: `Todo with id '${id}' not found` });
        }

        const {text,createAt} = req.body;
        if(!text) return res.status(400).json({ error: 'Text property is required' });

        todo.text = text;
        (createAt === "null") 
        ? todo.createdAt = null 
        : todo.createdAt = new Date(createAt || todo.createdAt);

        res.json(todo);
    }

    public deleteTodo = (req:Request,res:Response) =>{
        const id = +req.params.id!;

        if(isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        const todoIndex = todos.findIndex(todo => todo.id === id);
        if(todoIndex === -1) {
            return res.status(404).json({ error: `Todo with id '${id}' not found` });
        }

        todos.splice(todoIndex, 1);
        res.json({ message: `Todo with id '${id}' deleted` });
    }
    


}
