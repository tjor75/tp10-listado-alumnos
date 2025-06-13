import 'dotenv/config';
import { encontrarTodos } from './src/repositories/alumno-repository.js'

console.log(await encontrarTodos())