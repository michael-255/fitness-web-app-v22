import type { PlanIdType, TimestampType } from '@/shared/types'

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
