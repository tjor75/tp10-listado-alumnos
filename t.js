import 'dotenv/config';
import { encontrarTodos } from './src/repositories/alumno-repository.js'

try {
    console.log(await encontrarTodos())
} catch (e) {
    console.error(e)
}