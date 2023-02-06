import { ValidationError } from "sequelize";
import { Todos } from "../db/db.js";

export async function getTodos( req, res ) {
    const todos = await Todos.findAll();
    res.send(todos);
}

export async function postTodo(req, res, next) {
    try {
        const { value, status, deadline, priority } = req.body;
        const result = await Todos.create({value, status, deadline, priority});
        res.send(result);
    } catch (err) {
        next(err);
    }
}

// will update value of a Todo 
export async function updateTodo(req, res, next) {
    try {
        const { id } = req.params
        const { value, status, deadline, priority } = req.body
        const [rowCount, changedElements] = await Todos.update({ 
            value: value, 
            status: status, 
            deadline: deadline, 
            priority: priority
        }, { where: {id: id}, returning: true});
        res.send(changedElements)
    } catch (err) {
        next(err);
    }
}

// will delete todo
export async function deleteTodo(req, res, next) {
    try {
        const { id } = req.params
        const remove = await Todos.destroy({ where: {id: id}})
        res.send(`Deleted row ${remove}`)
    } catch (err) {
        next(err);
    }
}