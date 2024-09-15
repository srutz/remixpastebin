import { randomBytes } from 'crypto';
import Database from 'better-sqlite3'

//const dbPath = path.resolve(__dirname, '..', 'pastebin.db')
const db = new Database("./app/data/pastes.db")

export default db



export function generateRandomId(length: number): string {
    const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charCount = alphanumericChars.length
    let result = ''
    const randomBytesArray = randomBytes(length)
    for (let i = 0; i < length; i++) {
        const randomIndex = randomBytesArray[i] % charCount
        result += alphanumericChars[randomIndex]
    }
    return result
}