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

const showChartTemperature = ref(false)
const showChartBloodPressure = ref(false)
const showChartBloodOxygen = ref(false)

const temperatureData: Ref<{ x: any; y: any }[]> = ref([])
const systolicBloodPressureData: Ref<{ x: any; y: any }[]> = ref([])
const diastolicBloodPressureData: Ref<{ x: any; y: any }[]> = ref([])
const bloodOxygenData: Ref<{ x: any; y: any }[]> = ref([])

const chartOptionsTemperature: ChartOptions<'line'> = createTimelineChartOptions('Temperature')
const chartOptionsBloodPressure: ChartOptions<'line'> = createTimelineChartOptions(
    'Blood Pressure',
    true,
)
const chartOptionsBloodOxygen: ChartOptions<'line'> = createTimelineChartOptions(
    'Blood Oxygen',
    false,
    true,
)

const chartDataTemperature: ComputedRef<ChartData<'line', { x: number; y: number }[]>> = computed(
    () => {
        return {
            datasets: [
                {
                    label: '',
                    data: temperatureData.value,
                    borderColor: colors.getPaletteColor('negative'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    },
)
const chartDataBloodPressure: ComputedRef<ChartData<'line', { x: number; y: number }[]>> = computed(
    () => {
        return {
            datasets: [
                {
                    label: 'Systolic',
                    data: systolicBloodPressureData.value,
                    borderColor: colors.getPaletteColor('info'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
                {
                    label: 'Diastolic',
                    data: diastolicBloodPressureData.value,
                    borderColor: colors.getPaletteColor('accent'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    },
)
const chartDataBloodOxygen: ComputedRef<ChartData<'line', { x: number; y: number }[]>> = computed(
    () => {
        return {
            datasets: [
                {
                    label: '',
                    data: bloodOxygenData.value,
                    borderColor: colors.getPaletteColor('primary'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    },
)

onMounted(async () => {
    const allTemps = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.TEMPERATURE,
    )
    const allBloodPressure = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.BLOOD_PRESSURE,
    )
    const allBloodOxygen = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.BLOOD_OXYGEN,
    )

    showChartTemperature.value = allTemps.length > 0
    showChartBloodPressure.value = allBloodPressure.length > 0
    showChartBloodOxygen.value = allBloodOxygen.length > 0

    temperatureData.value = allTemps.map((record) => ({
        x: record.createdAt,
        y: record.temperature,
    }))
    systolicBloodPressureData.value = allBloodPressure.map((record) => ({
        x: record.createdAt,
        y: record.bloodPressureSystolic,
    }))
    diastolicBloodPressureData.value = allBloodPressure.map((record) => ({
        x: record.createdAt,
        y: record.bloodPressureDiastolic,
    }))
    bloodOxygenData.value = allBloodOxygen.map((record) => ({
        x: record.createdAt,
        y: record.bloodOxygen,
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
            <q-toolbar-title>Health Module Charts</q-toolbar-title>
            <q-btn flat round :icon="closeIcon" @click="onDialogCancel" />
        </q-toolbar>

        <q-card class="q-dialog-plugin">
            <q-card-section>
                <Line
                    v-if="showChartTemperature"
                    :options="chartOptionsTemperature"
                    :data="chartDataTemperature"
                    style="max-height: 500px"
                    class="q-mt-xl"
                />

                <Line
                    v-if="showChartBloodPressure"
                    :options="chartOptionsBloodPressure"
                    :data="chartDataBloodPressure"
                    style="max-height: 500px"
                    class="q-mt-xl"
                />

                <Line
                    v-if="showChartBloodOxygen"
                    :options="chartOptionsBloodOxygen"
                    :data="chartDataBloodOxygen"
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
