import { settingIdSchema } from '@/models/Setting'
import { z } from 'zod'
import { LimitEnum, RouteNameEnum, StatusEnum, TableEnum } from './enums'

//
// Enums
//

export const tableSchema = z.nativeEnum(TableEnum)

export const routeNameSchema = z.nativeEnum(RouteNameEnum)

export const statusSchema = z.nativeEnum(StatusEnum)

//
// Common
//

export const idSchema = z.string().refine(
    (id) => {
        // Trim off prefix and check if uuid is valid
        // Does not validate if the prefix used is correct
        if (z.string().uuid().safeParse(id.substring(4)).success) {
            return true // uuid valid
        } else if (settingIdSchema.safeParse(id).success) {
            return true // setting id valid
        } else {
            return false // invalid
        }
    },
    {
        message: 'Invalid Id',
    },
)

export const timestampSchema = z.number().int()

export const textLineSchema = z.string().min(1).max(LimitEnum.MAX_TEXT_LINE).trim()

export const textAreaSchema = z.string().max(LimitEnum.MAX_TEXT_AREA).trim() // desc, notes, etc.

export const statusListSchema = z
    .nativeEnum(StatusEnum)
    .array()
    .refine(
        (status) => {
            // Check for duplicates
            // Status not used by a record type will be ignored
            return new Set(status).size === status.length
        },
        {
            message: 'Cannot have duplicate status',
        },
    )