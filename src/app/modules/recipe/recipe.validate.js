// import { z } from 'zod'
// import { breed, label, location, category } from './cow.constant'

// // Zod validation schema
// const createCowZodSchema = z.object({
//   body: z.object({
//     name: z.string(),
//     age: z.number().positive(),
//     price: z.number().positive(),
//     location: z.enum([...location] as [string, ...string[]]),
//     breed: z.enum([...breed] as [string, ...string[]]),
//     weight: z.number(),
//     label: z.enum([...label] as [string, ...string[]]).optional(),
//     category: z.enum([...category] as [string, ...string[]]),
//     seller: z.string(),
//   }),
// })
// const updateCowZodSchema = z.object({
//   body: z.object({
//     name: z.string().optional(),
//     age: z.number().positive().optional(),
//     price: z.number().positive().optional(),
//     location: z.enum([...location] as [string, ...string[]]).optional(),
//     breed: z.enum([...breed] as [string, ...string[]]).optional(),
//     weight: z.number().optional(),
//     label: z.enum([...label] as [string, ...string[]]).optional(),
//     category: z.enum([...category] as [string, ...string[]]).optional(),
//     seller: z.string().optional(),
//   }),
// })

// export const CowValidation = {
//   createCowZodSchema,
//   updateCowZodSchema,
// }
