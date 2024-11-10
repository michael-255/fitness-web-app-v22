<script setup lang="ts">
import { MeasurementServInst } from '@/services/MeasurementService'
import { MeasurementFieldEnum } from '@/shared/enums'
import { chartsIcon, closeIcon } from '@/shared/icons'
import type { MeasurementType } from '@/shared/types'
import { createTimelineChartOptions, getMeasurementTimelinedRecords } from '@/shared/utils'
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

const showOneYearTemperature = ref(false)
const showAllTimeTemperature = ref(false)

const oneYearTemperatureData: Ref<{ x: any; y: any }[]> = ref([])
const allTimeTemperatureData: Ref<{ x: any; y: any }[]> = ref([])

const chartOptionsOneYearTemperature: ChartOptions<'line'> =
    createTimelineChartOptions('Temperature - Last Year')
const chartOptionsAllTimeTemperature: ChartOptions<'line'> =
    createTimelineChartOptions('Temperature - All Time')

const chartDataOneYearTemperature: ComputedRef<ChartData<'line', { x: number; y: number }[]>> =
    computed(() => {
        return {
            datasets: [
                {
                    label: '',
                    data: oneYearTemperatureData.value,
                    borderColor: colors.getPaletteColor('primary'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    })
const chartDataAllTimeTemperature: ComputedRef<ChartData<'line', { x: number; y: number }[]>> =
    computed(() => {
        return {
            datasets: [
                {
                    label: '',
                    data: allTimeTemperatureData.value,
                    borderColor: colors.getPaletteColor('primary'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    })

onMounted(async () => {
    const allTemps = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.TEMPERATURE,
    )

    const timelinedTemps = getMeasurementTimelinedRecords(allTemps, 'temperature')

    showOneYearTemperature.value = timelinedTemps.showOneYearChart
    showAllTimeTemperature.value = timelinedTemps.showAllTimeChart

    oneYearTemperatureData.value = timelinedTemps.oneYearData
    allTimeTemperatureData.value = timelinedTemps.allTimeData
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
            <q-toolbar-title>Diet Module Charts</q-toolbar-title>
            <q-btn flat round :icon="closeIcon" @click="onDialogCancel" />
        </q-toolbar>

        <q-card class="q-dialog-plugin">
            <q-card-section>
                <Line
                    v-if="showOneYearTemperature"
                    :options="chartOptionsOneYearTemperature"
                    :data="chartDataOneYearTemperature"
                    style="max-height: 500px"
                    class="q-mt-xl"
                />

                <Line
                    v-if="showAllTimeTemperature"
                    :options="chartOptionsAllTimeTemperature"
                    :data="chartDataAllTimeTemperature"
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
