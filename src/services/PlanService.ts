import { TableEnum } from '@/shared/enums'
import { calendarCheckIcon, databaseIcon } from '@/shared/icons'
import { planSchema } from '@/shared/schemas'
import { hiddenTableColumn, tableColumn } from '@/shared/utils'
import { BaseService } from './BaseService'

export class PlanService extends BaseService {
    public constructor() {
        super()
    }

    labelSingular = 'Plan'
    labelPlural = 'Plans'
    displayIcon = calendarCheckIcon
    tableIcon = databaseIcon
    modelSchema = planSchema
    parentTable = null!
    table = TableEnum.PLANS
    childTable = null!
    tableColumns = [
        hiddenTableColumn('id'),
        tableColumn('id', 'Id', 'UUID'),
        tableColumn('createdAt', 'Created Date', 'DATE'),
    ]
    supportsColumnFilters = false
    supportsActivityCharts = true
    supportsCharts = false
    supportsInspect = false
    supportsCreate = false
    supportsEdit = false
    supportsDelete = false
}

/**
 * Singleton instance exported for convenience.
 */
export const PlanServInst = PlanService.instance()
