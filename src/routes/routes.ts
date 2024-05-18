import { Router, Request, Response } from "express";
import { Todo } from "../models/user_model";

export const router = Router();

router.post("/add", async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    // Create a new instance of the Todo model
    const todo = new Todo({
      title,
      description,
    });

    // Save the new todo to the database
    await todo.save();

    // Return the saved todo in the response
    return res.status(201).json({
      data: todo,
    });
  } catch (error: any) {
    // Specify the type of 'error' as 'any'
    // Handle errors
    return res.status(400).json({ message: error.message });
  }
});

// request get
router.get("/", async (req: Request, res: Response) => {
  try {
    const dataItem = await Todo.find({});
    res.status(200).json({
      data: dataItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//request delete
router.delete("/delete", async (req: Request, res: Response) => {
  const filter = {
    title: req.body.title,
  };
  const dataItem = await Todo.deleteOne(filter)
    .then((data) =>
      res.json({
        data: data,
      })
    )
    .catch((error) => {
      return res.send(error);
    });
});

//update request
router.put("/update", async (req: Request, res: Response) => {
  const filter = {
    title: req.body.title,
  };

  const updatedData = {
    description: req.body.description,
  };
  const dataItem = await Todo.updateOne(filter, updatedData, {
    new: true,
  })
    .then((data) =>
      res.json({
        data: data,
      })
    )
    .catch((error) => {
      return res.send(error);
    });
});
