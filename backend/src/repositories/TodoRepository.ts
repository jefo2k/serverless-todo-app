import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from "../models/TodoItem"

const logger = createLogger('Todo Repository')

export class TodoRepository {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly todosIndex = process.env.TODOS_INDEX_NAME
  ) {}

  async getTodos(userId: string): Promise<TodoItem[]> {
    logger.info('Getting persisted todos from user', { userId })

    const result = await this.docClient.query({
      TableName: this.todosTable,
      IndexName: this.todosIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()

    const items = result.Items
    return items as TodoItem[]
  }

  async createTodo(todoItem: TodoItem): Promise<TodoItem> {
    logger.info('Persisting new todo', { todoId: todoItem.todoId })

    await this.docClient.put({
      TableName: this.todosTable,
      Item: todoItem
    }).promise()

    return todoItem
  }

  async updateTodo(userId: string, todoId: string, todoName: string, todoDueDate: string, todoDone: boolean): Promise<TodoItem> {
    logger.info('Updating todo', { todoId })

    const params = {
      TableName: this.todosTable,
      Key: {
        userId,
        todoId
      },
      ExpressionAttributeNames: {
        '#todoName': 'name',
      },
      ExpressionAttributeValues: {
        ':name': todoName,
        ':dueDate': todoDueDate,
        ':done': todoDone
      },
      UpdateExpression: 'SET #todoName = :name, dueDate = :dueDate, done = :done',
      ReturnValues: 'ALL_NEW'
    }

    const result = await this.docClient.update(params).promise()

    return result.Attributes as TodoItem
  }

  async deleteTodo(userId: string, todoId: string) {
    logger.info('Deteting todo', { userId, todoId })

    await this.docClient.delete({
      TableName: this.todosTable,
      Key: {
        userId,
        todoId
      }
    }).promise()
  }

}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new AWS.DynamoDB.DocumentClient()
}