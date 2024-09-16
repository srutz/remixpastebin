import { randomBytes } from 'crypto';
import Database from 'better-sqlite3'

console.log("init with env", process.env)
const dbfile = process.env.DBFILE || "./app/data/pastes.db"
const db = new Database(dbfile)

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