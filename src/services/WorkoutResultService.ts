import DialogCreate from '@/components/dialogs/DialogCreate.vue'
import DialogDelete from '@/components/dialogs/DialogDelete.vue'
import DialogEdit from '@/components/dialogs/DialogEdit.vue'
import DialogInspect from '@/components/dialogs/DialogInspect.vue'
import FormItemCreatedDate from '@/components/dialogs/forms/FormItemCreatedDate.vue'
import FormItemId from '@/components/dialogs/forms/FormItemId.vue'
import FormItemNote from '@/components/dialogs/forms/FormItemNote.vue'
import FormItemParentId from '@/components/dialogs/forms/FormItemParentId.vue'
import InspectItemDate from '@/components/dialogs/inspect/InspectItemDate.vue'
import InspectItemList from '@/components/dialogs/inspect/InspectItemList.vue'
import InspectItemString from '@/components/dialogs/inspect/InspectItemString.vue'
import { WorkoutResult } from '@/models/WorkoutResult'
import { TableEnum } from '@/shared/enums'
import { databaseIcon } from '@/shared/icons'
import { workoutResultSchema } from '@/shared/schemas'
import type { IdType, ServiceType } from '@/shared/types'
import { hiddenTableColumn, tableColumn } from '@/shared/utils'
import type { QDialogOptions } from 'quasar'
import { BaseService } from './BaseService'
import { WorkoutService } from './WorkoutService'

export class WorkoutResultService extends BaseService {
    public constructor() {
        super()
    }

    labelSingular = 'Workout Result'
    labelPlural = 'Workout Results'
    displayIcon = databaseIcon
    tableIcon = databaseIcon
    modelSchema = workoutResultSchema
    parentTable = TableEnum.WORKOUTS
    table = TableEnum.WORKOUT_RESULTS
    childTable = null!
    tableColumns = [
        hiddenTableColumn('id'),
        tableColumn('id', 'Id', 'UUID'),
        tableColumn('createdAt', 'Created Date', 'DATE'),
        tableColumn('parentId', 'Parent Workout Id', 'UUID'),
        tableColumn('note', 'Note', 'TEXT'),
        tableColumn('status', 'Status', 'LIST-PRINT'),
    ]
    supportsColumnFilters = true
    supportsActivityCharts = false
    supportsCharts = false
    supportsInspect = true
    supportsCreate = true
    supportsEdit = true
    supportsDelete = true

    /**
     * Returns the parent service for this child service.
     */
    parentService(): ServiceType {
        return WorkoutService.instance()
    }

    /**
     * Returns QDialogOptions options for the inspect dialog.
     * @example $q.dialog(service.inspectDialogOptions(id))
     */
    inspectDialogOptions(id: IdType): QDialogOptions {
        return {
            component: DialogInspect,
            componentProps: {
                id,
                service: this,
                inspectComponents: [
                    { component: InspectItemString, props: { label: 'Id', recordKey: 'id' } },
                    {
                        component: InspectItemDate,
                        props: { label: 'Created Date', recordKey: 'createdAt' },
                    },
                    {
                        component: InspectItemString,
                        props: { label: 'Parent Example Id', recordKey: 'parentId' },
                    },
                    {
                        component: InspectItemString,
                        props: { label: 'Note', recordKey: 'note' },
                    },
                    {
                        component: InspectItemList,
                        props: { label: 'Status', recordKey: 'status' },
                    },
                    // TODO
                ],
            },
        }
    }

    /**
     * Returns QDialogOptions options for the create dialog.
     * @example $q.dialog(service.createDialogOptions())
     */
    createDialogOptions(parentId?: IdType): QDialogOptions {
        let record: WorkoutResult = null!

        if (parentId) {
            record = new WorkoutResult({ parentId })
        } else {
            record = new WorkoutResult({ parentId: undefined! })
        }

        return {
            component: DialogCreate,
            componentProps: {
                service: this,
                initialRecord: record,
                formComponents: [
                    { component: FormItemId },
                    { component: FormItemParentId, props: { parentService: this.parentService() } },
                    { component: FormItemCreatedDate },
                    { component: FormItemNote },
                    // TODO
                ],
            },
        }
    }

    /**
     * Returns QDialogOptions options for the edit dialog.
     * @example $q.dialog(service.editDialogOptions(id))
     */
    editDialogOptions(id: IdType): QDialogOptions {
        return {
            component: DialogEdit,
            componentProps: {
                id,
                service: this,
                formComponents: [
                    { component: FormItemId },
                    { component: FormItemParentId, props: { parentService: this.parentService() } },
                    { component: FormItemCreatedDate },
                    { component: FormItemNote },
                    // TODO
                ],
            },
        }
    }

    /**
     * Returns QDialogOptions options for the delete dialog.
     * @example $q.dialog(service.deleteDialogOptions(id))
     */
    deleteDialogOptions(id: IdType): QDialogOptions {
        return {
            component: DialogDelete,
            componentProps: {
                id,
                service: this,
                useUnlock: 'ADVANCED-MODE-CONTROLLED',
            },
        }
    }

    /**
     * Returns chart datasets for the record associated with a parent.
     * TODO: Implement for charts.
     */
    async getChartDatasets(parentId: IdType) {
        return {
            threeMonths: [],
            oneYear: [],
            allTime: [],
            hasRecords: false,
            hasRecordsBeyondThreeMonths: false,
            hasRecordsBeyondOneYear: false,
        }
    }
}

/**
 * Singleton instance exported for convenience.
 */
export const WorkoutResultServInst = WorkoutResultService.instance()
