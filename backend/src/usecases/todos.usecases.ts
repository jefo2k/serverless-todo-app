import { TodoItem } from '../models/TodoItem'
import { TodoRepository } from '../repositories/TodoRepository'

const todoRepository = new TodoRepository()

export async function getAllTodos(): Promise<TodoItem[]> {
  return await todoRepository.getAllTodos()
}