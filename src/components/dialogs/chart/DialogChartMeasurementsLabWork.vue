<script setup lang="ts">
import { MeasurementServInst } from '@/services/MeasurementService'
import { MeasurementFieldEnum } from '@/shared/enums'
import { chartsIcon, closeIcon } from '@/shared/icons'
import type { MeasurementType } from '@/shared/types'
import { createTimelineChartOptions } from '@/shared/utils'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
    type ChartData,
    type ChartOptions,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { colors, useDialogPluginComponent } from 'quasar'
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import { Line } from 'vue-chartjs'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LinearScale,
    PointElement,
    LineElement,
    CategoryScale,
    TimeScale,
)

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()

const showChartCholesterol: Ref<boolean> = ref(false)
const showChartHemoglobinA1C: Ref<boolean> = ref(false)

const cholesterolData: Ref<{ x: any; y: any }[]> = ref([])
const cholesterolHDLData: Ref<{ x: any; y: any }[]> = ref([])
const cholesterolLDLData: Ref<{ x: any; y: any }[]> = ref([])
const hemoglobinA1CData: Ref<{ x: any; y: any }[]> = ref([])

const chartOptionsCholesterol: ChartOptions<'line'> = createTimelineChartOptions(
    'Cholesterol',
    true,
)
const chartOptionsHemoglobinA1C: ChartOptions<'line'> = createTimelineChartOptions(
    'Hemoglobin A1C',
    false,
    true,
)

const chartDataCholesterol: ComputedRef<ChartData<'line', { x: number; y: number }[]>> = computed(
    () => {
        return {
            datasets: [
                {
                    label: 'Cholesterol',
                    data: cholesterolData.value,
                    borderColor: colors.getPaletteColor('primary'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
                {
                    label: 'Cholesterol HDL',
                    data: cholesterolHDLData.value,
                    borderColor: colors.getPaletteColor('positive'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
                {
                    label: 'Cholesterol LDL',
                    data: cholesterolLDLData.value,
                    borderColor: colors.getPaletteColor('warning'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    },
)

onMounted(async () => {
    const allCholesterol = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.CHOLESTEROL,
    )
    const allCholesterolHDL = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.CHOLESTEROL_HDL,
    )
    const allCholesterolLDL = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.CHOLESTEROL_LDL,
    )
    const allHemoglobinA1C = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.HEMOGLOBIN_A1C,
    )

    showChartCholesterol.value =
        allCholesterol.length > 0 || allCholesterolHDL.length > 0 || allCholesterolLDL.length > 0
    showChartHemoglobinA1C.value = allHemoglobinA1C.length > 0

    cholesterolData.value = allCholesterol.map((record) => ({
        x: record.createdAt,
        y: record.cholesterol,
    }))
    cholesterolHDLData.value = allCholesterolHDL.map((record) => ({
        x: record.createdAt,
        y: record.cholesterolHDL,
    }))
    cholesterolLDLData.value = allCholesterolLDL.map((record) => ({
        x: record.createdAt,
        y: record.cholesterolLDL,
    }))
    hemoglobinA1CData.value = allHemoglobinA1C.map((record) => ({
        x: record.createdAt,
        y: record.hemoglobinA1C,
    }))
})
</script>

<template>
    <q-dialog
        ref="dialogRef"
        transition-show="slide-up"
        transition-hide="slide-down"
        maximized
        @hide="onDialogHide"
    >
        <q-toolbar class="bg-info text-white toolbar-height">
            <q-icon :name="chartsIcon" size="sm" class="q-mx-sm" />
            <q-toolbar-title>Weight Module Charts</q-toolbar-title>
            <q-btn flat round :icon="closeIcon" @click="onDialogCancel" />
        </q-toolbar>

        <q-card class="q-dialog-plugin">
            <q-card-section>
                <Line
                    v-if="showChartCholesterol"
                    :options="chartOptionsCholesterol"
                    :data="chartDataCholesterol"
                    style="max-height: 500px"
                    class="q-mt-xl"
                />

                <Line
                    v-if="showChartHemoglobinA1C"
                    :options="chartOptionsHemoglobinA1C"
                    :data="chartDataCholesterol"
                    style="max-height: 500px"
                    class="q-mt-xl"
                />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<style scoped>
.toolbar-height {
    max-height: 50px;
}
.responsive-container {
    width: 100%;
    max-width: 800px;
}
</style>
