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

const showOneYearBodyWeight = ref(false)
const showAllTimeBodyWeight = ref(false)

const showOneYearBodyFat = ref(false)
const showAllTimeBodyFat = ref(false)

const oneYearBodyWeightData: Ref<{ x: any; y: any }[]> = ref([])
const allTimeBodyWeightData: Ref<{ x: any; y: any }[]> = ref([])

const oneYearBodyFatData: Ref<{ x: any; y: any }[]> = ref([])
const allTimeBodyFatData: Ref<{ x: any; y: any }[]> = ref([])

const chartOptionsOneYearBodyWeight: ChartOptions<'line'> =
    createTimelineChartOptions('Body Weight - Last Year')
const chartOptionsAllTimeBodyWeight: ChartOptions<'line'> =
    createTimelineChartOptions('Body Weight - All Time')

const chartOptionsOneYearBodyFat: ChartOptions<'line'> =
    createTimelineChartOptions('Body Fat - Last Year')
const chartOptionsAllTimeBodyFat: ChartOptions<'line'> =
    createTimelineChartOptions('Body Fat - All Time')

const chartDataOneYearBodyWeight: ComputedRef<ChartData<'line', { x: number; y: number }[]>> =
    computed(() => {
        return {
            datasets: [
                {
                    label: '',
                    data: oneYearBodyWeightData.value,
                    borderColor: colors.getPaletteColor('primary'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    })
const chartDataAllTimeBodyWeight: ComputedRef<ChartData<'line', { x: number; y: number }[]>> =
    computed(() => {
        return {
            datasets: [
                {
                    label: '',
                    data: allTimeBodyWeightData.value,
                    borderColor: colors.getPaletteColor('primary'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    })

const chartDataOneYearBodyFat: ComputedRef<ChartData<'line', { x: number; y: number }[]>> =
    computed(() => {
        return {
            datasets: [
                {
                    label: '',
                    data: oneYearBodyFatData.value,
                    borderColor: colors.getPaletteColor('amber'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    })
const chartDataAllTimeBodyFat: ComputedRef<ChartData<'line', { x: number; y: number }[]>> =
    computed(() => {
        return {
            datasets: [
                {
                    label: '',
                    data: allTimeBodyFatData.value,
                    borderColor: colors.getPaletteColor('amber'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    })

onMounted(async () => {
    const allBodyWeight = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.BODY_WEIGHT,
    )
    const allBodyFat = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.BODY_FAT,
    )

    const timelinedBodyWeight = getMeasurementTimelinedRecords(allBodyWeight, 'bodyWeight')
    const timelinedBodyFat = getMeasurementTimelinedRecords(allBodyFat, 'bodyFat')

    showOneYearBodyWeight.value = timelinedBodyWeight.showOneYearChart
    showAllTimeBodyWeight.value = timelinedBodyWeight.showAllTimeChart

    showOneYearBodyFat.value = timelinedBodyFat.showOneYearChart
    showAllTimeBodyFat.value = timelinedBodyFat.showAllTimeChart

    oneYearBodyWeightData.value = timelinedBodyWeight.oneYearData
    allTimeBodyWeightData.value = timelinedBodyWeight.allTimeData

    oneYearBodyFatData.value = timelinedBodyFat.oneYearData
    allTimeBodyFatData.value = timelinedBodyFat.allTimeData
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
                    v-if="showOneYearBodyWeight"
                    :options="chartOptionsOneYearBodyWeight"
                    :data="chartDataOneYearBodyWeight"
                    style="max-height: 500px"
                    class="q-mt-xl"
                />

                <Line
                    v-if="showOneYearBodyFat"
                    :options="chartOptionsOneYearBodyFat"
                    :data="chartDataOneYearBodyFat"
                    style="max-height: 500px"
                    class="q-mt-xl"
                />

                <Line
                    v-if="showAllTimeBodyWeight"
                    :options="chartOptionsAllTimeBodyWeight"
                    :data="chartDataAllTimeBodyWeight"
                    style="max-height: 500px"
                    class="q-mt-xl"
                />

                <Line
                    v-if="showAllTimeBodyFat"
                    :options="chartOptionsAllTimeBodyFat"
                    :data="chartDataAllTimeBodyFat"
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
