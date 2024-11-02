import { timestampSchema } from '@/shared/schemas'
import type { TimestampType } from '@/shared/types'
import { z } from 'zod'

//
// Enums
//

/**
 * The only valid IDs for plans in the application.
 */
export enum PlanIdEnum {
    // Specific weekday recurring
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
    SUNDAY = 'Sunday',
    // Specific month recurring
    JANUARY = 'January',
    FEBRUARY = 'February',
    MARCH = 'March',
    APRIL = 'April',
    MAY = 'May',
    JUNE = 'June',
    JULY = 'July',
    AUGUST = 'August',
    SEPTEMBER = 'September',
    OCTOBER = 'October',
    NOVEMBER = 'November',
    DECEMBER = 'December',
    // Long term recurring
    MONTHLY = 'Monthly',
    YEARLY = 'Yearly',
}

//
// Schemas
//

export const planIdSchema = z.nativeEnum(PlanIdEnum)

export const planSchema = z.object({
    id: planIdSchema, // Instead of standard ID
    createdAt: timestampSchema,
    // TODO
})

//
// Types
//

export type PlanIdType = z.infer<typeof planIdSchema>

export type PlanType = z.infer<typeof planSchema>

interface PlanParams {
    id: PlanIdType // Instead of standard ID
    createdAt?: TimestampType
    // TODO
}

/**
 * `Plan` standalone model.
 *
 *  Represents all relevant details of a plan.
 */
export class Plan {
    id: PlanIdType // Instead of standard ID
    createdAt: TimestampType

    constructor(params: PlanParams) {
        this.id = params.id
        this.createdAt = params.createdAt ?? Date.now()
        // TODO
    }
}
