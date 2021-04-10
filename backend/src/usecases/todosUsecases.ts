import { TodoItem } from '../models/TodoItem'
import { TodoRepository } from '../repositories/TodoRepository'

import * as uuid from 'uuid'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
import { getUserId } from '../lambda/utils';

const todoRepository = new TodoRepository()

export async function getTodos(): Promise<TodoItem[]> {
  return await todoRepository.getTodos()
}

export async function createTodo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {
  const todoId: string = uuid.v4()

  return await todoRepository.createTodo({
    todoId,
    userId,
    name: createTodoRequest.name,
    createdAt: new Date().toISOString(),
    dueDate: createTodoRequest.dueDate,
    done: false
  })
}

export async function updateTodo(userId: string, todoId: string, updateTodoRequest: UpdateTodoRequest): Promise<TodoItem> {
  return await todoRepository.updateTodo(
    userId,
    todoId,
    updateTodoRequest.name,
    updateTodoRequest.dueDate,
    updateTodoRequest.done
  )
}

export async function deleteTodo(userId: string, todoId: string) {
  return await todoRepository.deleteTodo(userId, todoId)
}