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

const showChartBodyWeight = ref(false)
const showChartBodyFat = ref(false)

const bodyWeightData: Ref<{ x: any; y: any }[]> = ref([])
const bodyFatData: Ref<{ x: any; y: any }[]> = ref([])

const chartOptionsBodyWeight: ChartOptions<'line'> = createTimelineChartOptions('Body Weight')

const chartOptionsBodyFat: ChartOptions<'line'> = createTimelineChartOptions(
    'Body Fat',
    false,
    true,
)

const chartDataBodyWeight: ComputedRef<ChartData<'line', { x: number; y: number }[]>> = computed(
    () => {
        return {
            datasets: [
                {
                    label: '',
                    data: bodyWeightData.value,
                    borderColor: colors.getPaletteColor('primary'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    },
)

const chartDataBodyFat: ComputedRef<ChartData<'line', { x: number; y: number }[]>> = computed(
    () => {
        return {
            datasets: [
                {
                    label: '',
                    data: bodyFatData.value,
                    borderColor: colors.getPaletteColor('amber'),
                    backgroundColor: colors.getPaletteColor('white'),
                },
            ],
        }
    },
)

onMounted(async () => {
    const allBodyWeight = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.BODY_WEIGHT,
    )
    const allBodyFat = await MeasurementServInst.getRecordsByProperty<MeasurementType>(
        'field',
        MeasurementFieldEnum.BODY_FAT,
    )

    showChartBodyWeight.value = allBodyWeight.length > 0
    showChartBodyFat.value = allBodyFat.length > 0

    bodyWeightData.value = allBodyWeight.map((record) => ({
        x: record.createdAt,
        y: record.bodyWeight,
    }))
    bodyFatData.value = allBodyFat.map((record) => ({
        x: record.createdAt,
        y: record.bodyFat,
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
                    v-if="showChartBodyWeight"
                    :options="chartOptionsBodyWeight"
                    :data="chartDataBodyWeight"
                    style="max-height: 500px"
                    class="q-mt-xl"
                />

                <Line
                    v-if="showChartBodyFat"
                    :options="chartOptionsBodyFat"
                    :data="chartDataBodyFat"
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
