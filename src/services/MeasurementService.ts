import DialogChartActivityMeasurements from '@/components/dialogs/chart/DialogChartActivityMeasurements.vue'
import DialogChartMeasurement from '@/components/dialogs/chart/DialogChartMeasurement.vue'
import DialogCreate from '@/components/dialogs/DialogCreate.vue'
import DialogDelete from '@/components/dialogs/DialogDelete.vue'
import DialogEdit from '@/components/dialogs/DialogEdit.vue'
import DialogInspect from '@/components/dialogs/DialogInspect.vue'
import FormItemCreatedDate from '@/components/dialogs/forms/FormItemCreatedDate.vue'
import FormItemId from '@/components/dialogs/forms/FormItemId.vue'
import FormItemMeasurementField from '@/components/dialogs/forms/FormItemMeasurementField.vue'
import FormItemNote from '@/components/dialogs/forms/FormItemNote.vue'
import InspectItemDate from '@/components/dialogs/inspect/InspectItemDate.vue'
import InspectItemString from '@/components/dialogs/inspect/InspectItemString.vue'
import { Measurement } from '@/models/Measurements'
import { MeasurementFieldEnum, TableEnum } from '@/shared/enums'
import { databaseIcon, measurementsPageIcon } from '@/shared/icons'
import { measurementSchema } from '@/shared/schemas'
import type { IdType } from '@/shared/types'
import { hiddenTableColumn, tableColumn } from '@/shared/utils'
import type { QDialogOptions } from 'quasar'
import { BaseService } from './BaseService'

export class MeasurementService extends BaseService {
    public constructor() {
        super()
    }

    labelSingular = 'Measurement'
    labelPlural = 'Measurements'
    displayIcon = measurementsPageIcon
    tableIcon = databaseIcon
    modelSchema = measurementSchema
    parentTable = null!
    table = TableEnum.MEASUREMENTS
    childTable = null!
    tableColumns = [
        hiddenTableColumn('id'),
        tableColumn('id', 'Id', 'UUID'),
        tableColumn('createdAt', 'Created Date', 'DATE'),
        tableColumn('note', 'Note', 'TEXT'),
        tableColumn('field', 'Measurement Field'),
        // Diet & Weight
        tableColumn('calories', 'Calories', 'NO_DECIMAL'),
        tableColumn('carbs', 'Carbs', 'NO_DECIMAL'),
        tableColumn('fat', 'Fat', 'NO_DECIMAL'),
        tableColumn('protein', 'Protein', 'NO_DECIMAL'),
        // Weight
        tableColumn('weight', 'Weight', 'ONE_DECIMAL'),
        tableColumn('bodyFat', 'Body Fat', 'ONE_DECIMAL'),
        // Health
        tableColumn('temperature', 'Temperature', 'ONE_DECIMAL'),
        tableColumn('bloodPressureSystolic', 'Blood Pressure Systolic', 'NO_DECIMAL'),
        tableColumn('bloodPressureDiastolic', 'Blood Pressure Diastolic', 'NO_DECIMAL'),
        tableColumn('bloodOxygen', 'Blood Oxygen', 'ONE_DECIMAL'),
        // Body
        tableColumn('neck', 'Neck', 'TWO_DECIMAL'),
        tableColumn('shoulders', 'Shoulders', 'TWO_DECIMAL'),
        tableColumn('chest', 'Chest', 'TWO_DECIMAL'),
        tableColumn('waist', 'Waist', 'TWO_DECIMAL'),
        tableColumn('leftBicep', 'Left Bicep', 'TWO_DECIMAL'),
        tableColumn('rightBicep', 'Right Bicep', 'TWO_DECIMAL'),
        tableColumn('leftForearm', 'Left Forearm', 'TWO_DECIMAL'),
        tableColumn('rightForearm', 'Right Forearm', 'TWO_DECIMAL'),
        tableColumn('leftThigh', 'Left Thigh', 'TWO_DECIMAL'),
        tableColumn('rightThigh', 'Right Thigh', 'TWO_DECIMAL'),
        tableColumn('leftCalf', 'Left Calf', 'TWO_DECIMAL'),
        tableColumn('rightCalf', 'Right Calf', 'TWO_DECIMAL'),
        // Lab Work
        tableColumn('cholesterol', 'Cholesterol', 'NO_DECIMAL'),
        tableColumn('cholesterolHDL', 'Cholesterol HDL', 'NO_DECIMAL'),
        tableColumn('cholesterolLDL', 'Cholesterol LDL', 'NO_DECIMAL'),
        tableColumn('hemoglobinA1C', 'Hemoglobin A1C', 'ONE_DECIMAL'),
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
        return { component: DialogChartActivityMeasurements }
    }

    /**
     * Returns QDialogOptions options for the chart dialog.
     * @example $q.dialog(service.chartsDialogOptions(id))
     */
    chartsDialogOptions(id: IdType): QDialogOptions {
        return {
            component: DialogChartMeasurement,
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
                        props: { label: 'Note', recordKey: 'note' },
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
    createDialogOptions(measurmentField?: MeasurementFieldEnum): QDialogOptions {
        let record: Measurement = null!

        if (measurmentField) {
            record = new Measurement({ field: measurmentField })
        } else {
            record = new Measurement({ field: undefined! })
        }

        return {
            component: DialogCreate,
            componentProps: {
                service: this,
                initialRecord: record,
                formComponents: [
                    { component: FormItemId },
                    { component: FormItemCreatedDate },
                    { component: FormItemNote },
                    { component: FormItemMeasurementField },
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
                    { component: FormItemNote },
                    { component: FormItemMeasurementField },
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
}

/**
 * Singleton instance exported for convenience.
 */
export const MeasurementServInst = MeasurementService.instance()
