import { TodoItem } from '../models/TodoItem'
import { TodoRepository } from '../repositories/TodoRepository'

import * as uuid from 'uuid'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';

const todoRepository = new TodoRepository()

export async function getTodos(): Promise<TodoItem[]> {
  return await todoRepository.getTodos()
}

export async function createTodo(createTodoRequest: CreateTodoRequest): Promise<TodoItem> {
  const itemId: string = uuid.v4()
  const userId = "123456" // TODO get from authenticated user

  return await todoRepository.createTodo({
    todoId: itemId,
    userId: userId,
    name: createTodoRequest.name,
    createdAt: new Date().toISOString(),
    dueDate: createTodoRequest.dueDate,
    done: false
  })
}

export async function updateTodo(todoId: string, updateTodoRequest: UpdateTodoRequest): Promise<TodoItem> {
  const userId = "123456" // TODO get from authenticated user
  return await todoRepository.updateTodo(
    userId,
    todoId,
    updateTodoRequest.name,
    updateTodoRequest.dueDate,
    updateTodoRequest.done
  )
}