import DialogChartActivityExercises from '@/components/dialogs/chart/DialogChartActivityExercises.vue'
import DialogChartExercise from '@/components/dialogs/chart/DialogChartExercise.vue'
import DialogCreate from '@/components/dialogs/DialogCreate.vue'
import DialogDelete from '@/components/dialogs/DialogDelete.vue'
import DialogEdit from '@/components/dialogs/DialogEdit.vue'
import DialogInspect from '@/components/dialogs/DialogInspect.vue'
import DialogToggleFavorite from '@/components/dialogs/DialogToggleFavorite.vue'
import FormItemCreatedDate from '@/components/dialogs/forms/FormItemCreatedDate.vue'
import FormItemDescription from '@/components/dialogs/forms/FormItemDescription.vue'
import FormItemId from '@/components/dialogs/forms/FormItemId.vue'
import FormItemName from '@/components/dialogs/forms/FormItemName.vue'
import FormItemStatus from '@/components/dialogs/forms/FormItemStatus.vue'
import InspectItemDate from '@/components/dialogs/inspect/InspectItemDate.vue'
import InspectItemList from '@/components/dialogs/inspect/InspectItemList.vue'
import InspectItemObject from '@/components/dialogs/inspect/InspectItemObject.vue'
import InspectItemString from '@/components/dialogs/inspect/InspectItemString.vue'
import { Exercise, exerciseSchema } from '@/models/Exercise'
import { TableEnum } from '@/shared/enums'
import { databaseIcon, exercisesPageIcon } from '@/shared/icons'
import type { IdType } from '@/shared/types'
import { hiddenTableColumn, tableColumn } from '@/shared/utils'
import type { QDialogOptions } from 'quasar'
import { BaseService } from './BaseService'

export class ExerciseService extends BaseService {
    public constructor() {
        super()
    }

    labelSingular = 'Exercise'
    labelPlural = 'Exercises'
    displayIcon = exercisesPageIcon
    tableIcon = databaseIcon
    modelSchema = exerciseSchema
    parentTable = null!
    table = TableEnum.EXERCISES
    childTable = TableEnum.EXERCISE_RESULTS
    tableColumns = [
        hiddenTableColumn('id'),
        tableColumn('id', 'Id', 'UUID'),
        tableColumn('createdAt', 'Created Date', 'DATE'),
        tableColumn('name', 'Name', 'TEXT'),
        tableColumn('desc', 'Description', 'TEXT'),
        tableColumn('status', 'Status', 'LIST-PRINT'),
        tableColumn('lastChild', 'Last Exercise Result', 'JSON'),
        tableColumn('inputs', 'Exercise Inputs'),
        tableColumn('initialSetCount', 'Initial Set Count'),
        tableColumn('restTimer', 'Rest Timer Settings', 'JSON'),
        tableColumn('tabataTimer', 'Tabata Timer Settings', 'JSON'),
    ]
    supportsColumnFilters = true
    supportsActivityCharts = true
    supportsCharts = true
    supportsInspect = true
    supportsCreate = true
    supportsEdit = true
    supportsDelete = true

    /**
     * Returns QDialogOptions options for the chart dialog.
     * @example $q.dialog(service.activityChartsDialogOptions(id))
     */
    activityChartsDialogOptions(): QDialogOptions {
        return { component: DialogChartActivityExercises }
    }

    /**
     * Returns QDialogOptions options for the chart dialog.
     * @example $q.dialog(service.chartsDialogOptions(id))
     */
    chartsDialogOptions(id: IdType): QDialogOptions {
        return {
            component: DialogChartExercise,
            componentProps: {
                id,
                service: this,
            },
        }
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
                        props: { label: 'Name', recordKey: 'name' },
                    },
                    {
                        component: InspectItemString,
                        props: { label: 'Description', recordKey: 'desc' },
                    },
                    {
                        component: InspectItemList,
                        props: { label: 'Status', recordKey: 'status' },
                    },
                    {
                        component: InspectItemObject,
                        props: { label: 'Last Exercise Result', recordKey: 'lastChild' },
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
    createDialogOptions(): QDialogOptions {
        return {
            component: DialogCreate,
            componentProps: {
                service: this,
                initialRecord: new Exercise({}),
                formComponents: [
                    { component: FormItemId },
                    { component: FormItemCreatedDate },
                    { component: FormItemName },
                    { component: FormItemDescription },
                    { component: FormItemStatus },
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
                    { component: FormItemCreatedDate },
                    { component: FormItemName },
                    { component: FormItemDescription },
                    { component: FormItemStatus },
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
     * Returns QDialogOptions for the toggle favorite dialog.
     * @example $q.dialog(service.toggleFavoriteDialogOptions(id))
     */
    toggleFavoriteDialogOptions(id: IdType): QDialogOptions {
        return {
            component: DialogToggleFavorite,
            componentProps: {
                id,
                service: this,
            },
        }
    }
}

/**
 * Singleton instance exported for convenience.
 */
export const ExerciseServInst = ExerciseService.instance()
