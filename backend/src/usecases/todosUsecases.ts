import { TodoItem } from '../models/TodoItem'
import { TodoRepository } from '../repositories/TodoRepository'
import * as uuid from 'uuid'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const todoRepository = new TodoRepository()

export async function getTodos(userId: string): Promise<TodoItem[]> {
  return await todoRepository.getTodos(userId)
}

export async function createTodo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {
  const todoId: string = uuid.v4()

  return await todoRepository.createTodo({
    todoId,
    userId,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: createTodoRequest.done || false,
    createdAt: createTodoRequest.createdAt || new Date().toISOString(),
    attachmentUrl: createTodoRequest.attachmentUrl || ''
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

export async function uploadTodoFile(userId: string, todoId: string, attachmentUrl: string): Promise<TodoItem> {
  return await todoRepository.updateTodoAttachmentUrl(userId, todoId, attachmentUrl)
}