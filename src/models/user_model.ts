import mongoose from "mongoose";

interface TodoI {
  title: string;
  description: string;
}

interface TodoDocument extends mongoose.Document {
  title: string;
  description: string;
}

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: false,
  },
});

interface TodoModelInterface extends mongoose.Model<TodoDocument> {
  set(x: TodoI): TodoDocument;
}

TodoSchema.statics.set = (x: TodoI) => {
  return new Todo();
};
const Todo = mongoose.model<TodoDocument, TodoModelInterface>(
  "Todo",
  TodoSchema
);

Todo.set({
  title: "some title",
  description: "some description",
});

export { Todo };
