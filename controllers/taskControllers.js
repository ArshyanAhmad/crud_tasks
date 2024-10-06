import mongoose from "mongoose";
import { Task } from "../models/taskModel.js"

export const newTask = async (req, res) => {

    try {

        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user
        })

        res.status(201).json({
            success: true,
            user: req.user.name,
            message: "Task added successfully "
        })

    } catch (error) {
        console.log("Internal Server Error", error.message);
        res.status(400).json({
            success: false,
            message: "Error while adding a new task"
        })
    }

}

export const getMyTasks = async (req, res) => {

    try {

        const userId = req.user._id;
        const myTask = await Task.find({ user: userId });

        res.status(200).json({
            success: true,
            message: "My Tasks",
            task: myTask
        })

    }

    catch (error) {
        console.log("Internal Server Error", error.message);
        res.status(400).json({
            success: false,
            message: "Error while getting my task"
        })
    }
}

export const updateTasks = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated",
            task
        })

    } catch (error) {
        console.log("Internal Server Error", error.message);
        res.status(400).json({
            success: false,
            message: "Error while updating my task"
        })
    }

}

export const deleteTask = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        })

    }
    catch (error) {
        console.log("Internal Server Error", error.message);
        res.status(400).json({
            success: false,
            message: "Error while deleting the task"
        })
    }

}