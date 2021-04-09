import { TodoItem } from "../models/TodoItem";

export class TodoRepository {

  constructor(
    private readonly todoItems = [
      {
        "todoId": "123",
        "createdAt": "2019-07-27T20:01:45.424Z",
        "name": "Buy milk",
        "dueDate": "2019-07-29T20:01:45.424Z",
        "done": false,
        "attachmentUrl": "http://example.com/image.png"
      },
      {
        "todoId": "456",
        "createdAt": "2019-07-27T20:01:45.424Z",
        "name": "Send a letter",
        "dueDate": "2019-07-29T20:01:45.424Z",
        "done": true,
        "attachmentUrl": "http://example.com/image.png"
      },
      {
        "todoId": "789",
        "createdAt": "2021-04-09T20:01:45.424Z",
        "name": "Finish the udacity assignment",
        "dueDate": "2021-04-11T23:59:59.424Z",
        "done": true,
        "attachmentUrl": "http://example.com/image.png"
      }
    ] as TodoItem[]
  ) {}

  async getAllTodos(): Promise<TodoItem[]> {
    return Promise.resolve(this.todoItems)
  }

}