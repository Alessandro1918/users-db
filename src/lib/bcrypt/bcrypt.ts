import * as bcrypt from "bcrypt"

//Hash a plaintext string (ex: a password), return a hashed string value
// export async function hashText(plainText: string) {
//   const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS))
//   const hash = await bcrypt.hash(plainText, salt)
//   return hash
// }

//Hash and compare the value of a plaintext string (ex: password) with an already hashed text (ex: hashed password stored in a db)
export async function compareHash(plainText: string, hashedText: string) {
  const isMatching = await bcrypt.compare(plainText, hashedText)
  return isMatching
}