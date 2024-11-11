<script setup lang="ts">
import DashboardMeasurementItem from '@/components/dashboard/DashboardMeasurementItem.vue'
import DialogChartMeasurementsBody from '@/components/dialogs/chart/DialogChartMeasurementsBody.vue'
import DialogChartMeasurementsDiet from '@/components/dialogs/chart/DialogChartMeasurementsDiet.vue'
import DialogChartMeasurementsHealth from '@/components/dialogs/chart/DialogChartMeasurementsHealth.vue'
import DialogChartMeasurementsLabWork from '@/components/dialogs/chart/DialogChartMeasurementsLabWork.vue'
import DialogChartMeasurementsWeight from '@/components/dialogs/chart/DialogChartMeasurementsWeight.vue'
import DialogBodyModule from '@/components/dialogs/measurements/DialogBodyModule.vue'
import DialogDietModule from '@/components/dialogs/measurements/DialogDietModule.vue'
import DialogHealthModule from '@/components/dialogs/measurements/DialogHealthModule.vue'
import DialogLabWorkModule from '@/components/dialogs/measurements/DialogLabWorkModule.vue'
import DialogWeightModule from '@/components/dialogs/measurements/DialogWeightModule.vue'
import PageFabMenu from '@/components/page/PageFabMenu.vue'
import PageHeading from '@/components/page/PageHeading.vue'
import PageResponsive from '@/components/page/PageResponsive.vue'
import useLogger from '@/composables/useLogger'
import { MeasurementServInst } from '@/services/MeasurementService'
import { appName } from '@/shared/constants'
import { MeasurementFieldEnum, RouteNameEnum, TableEnum } from '@/shared/enums'
import {
    addIcon,
    bodyModuleIcon,
    dietModuleIcon,
    healthModuleIcon,
    labWorkModuleIcon,
    measurementsPageIcon,
    weightModuleIcon,
} from '@/shared/icons'
import type { MeasurementType } from '@/shared/types'
import { useMeta, useQuasar } from 'quasar'
import { onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

useMeta({ title: `${appName} - Measurements Dashboard` })

const $q = useQuasar()
const router = useRouter()
const { log } = useLogger()

const subscriptionFinished = ref(false)

const hasDietRecords = ref(false)
const hasWeightRecords = ref(false)
const hasHealthRecords = ref(false)
const hasBodyRecords = ref(false)
const hasLabWorkRecords = ref(false)

const dietFields = [
    MeasurementFieldEnum.CALORIES,
    MeasurementFieldEnum.CARBS,
    MeasurementFieldEnum.FAT,
    MeasurementFieldEnum.PROTEIN,
]
const weightFields = [MeasurementFieldEnum.BODY_WEIGHT, MeasurementFieldEnum.BODY_FAT]
const healthFields = [
    MeasurementFieldEnum.TEMPERATURE,
    MeasurementFieldEnum.BLOOD_PRESSURE,
    MeasurementFieldEnum.BLOOD_OXYGEN,
]
const bodyFields = [
    MeasurementFieldEnum.NECK,
    MeasurementFieldEnum.SHOULDERS,
    MeasurementFieldEnum.CHEST,
    MeasurementFieldEnum.WAIST,
    MeasurementFieldEnum.BICEPS,
    MeasurementFieldEnum.FOREARMS,
    MeasurementFieldEnum.THIGHS,
    MeasurementFieldEnum.CALVES,
]
const labWorkFields = [
    MeasurementFieldEnum.CHOLESTEROL,
    MeasurementFieldEnum.CHOLESTEROL_HDL,
    MeasurementFieldEnum.CHOLESTEROL_LDL,
    MeasurementFieldEnum.HEMOGLOBIN_A1C,
]

const subscription = MeasurementServInst.liveTable<MeasurementType>().subscribe({
    next: (records) => {
        hasDietRecords.value = records.some((record) => dietFields.includes(record.field))
        hasWeightRecords.value = records.some((record) => weightFields.includes(record.field))
        hasHealthRecords.value = records.some((record) => healthFields.includes(record.field))
        hasBodyRecords.value = records.some((record) => bodyFields.includes(record.field))
        hasLabWorkRecords.value = records.some((record) => labWorkFields.includes(record.field))
        subscriptionFinished.value = true
    },
    error: (error) => {
        log.error(`Error loading live ${MeasurementServInst.labelPlural} data`, error as Error)
        subscriptionFinished.value = true
    },
})

onUnmounted(() => {
    subscription.unsubscribe()
})
</script>

<template>
    <PageResponsive>
        <PageFabMenu
            :isLoading="$q.loading.isActive"
            :subButtons="[
                {
                    label: 'Measurements Data',
                    color: 'primary',
                    icon: MeasurementServInst.tableIcon,
                    handleClick: () =>
                        router.push({
                            name: RouteNameEnum.TABLE,
                            params: { table: TableEnum.MEASUREMENTS },
                        }),
                },
                {
                    label: 'Create Measurement',
                    color: 'positive',
                    icon: addIcon,
                    handleClick: () => $q.dialog(MeasurementServInst.createDialogOptions()),
                },
            ]"
        />

        <PageHeading
            :headingIcon="measurementsPageIcon"
            :headingTitle="MeasurementServInst.labelPlural"
        />

        <q-list padding>
            <DashboardMeasurementItem
                title="Diet"
                description="The Diet module tracks key nutritional information. These measurements can be used to assess nutritional adequacy and monitor dietary patterns."
                :icon="dietModuleIcon"
                :hasRecords="hasDietRecords"
                @onCharts="() => $q.dialog({ component: DialogChartMeasurementsDiet })"
                @onAccessModule="() => $q.dialog({ component: DialogDietModule })"
            />

            <DashboardMeasurementItem
                title="Weight"
                description="The Weight module tracks body composition metrics. These measurements provide insight into weight-related health indicators."
                :icon="weightModuleIcon"
                :hasRecords="hasWeightRecords"
                @onCharts="() => $q.dialog({ component: DialogChartMeasurementsWeight })"
                @onAccessModule="() => $q.dialog({ component: DialogWeightModule })"
            />

            <DashboardMeasurementItem
                title="Health"
                description="The Health module tracks vital health indicators providing essential data for monitoring overall health."
                :icon="healthModuleIcon"
                :hasRecords="hasHealthRecords"
                @onCharts="() => $q.dialog({ component: DialogChartMeasurementsHealth })"
                @onAccessModule="() => $q.dialog({ component: DialogHealthModule })"
            />

            <DashboardMeasurementItem
                title="Body"
                description="The Body module tracks various physical dimension measurements which provide a detailed overview of an individual's body composition and physical attributes."
                :icon="bodyModuleIcon"
                :hasRecords="hasBodyRecords"
                @onCharts="() => $q.dialog({ component: DialogChartMeasurementsBody })"
                @onAccessModule="() => $q.dialog({ component: DialogBodyModule })"
            />

            <DashboardMeasurementItem
                title="Lab Work"
                description="The Lab Work module tracks various blood measurements. These measurements provide a detailed overview of an individual's blood health and can be used to assess cardiovascular risk and monitor conditions such as diabetes."
                :icon="labWorkModuleIcon"
                :hasRecords="hasLabWorkRecords"
                @onCharts="() => $q.dialog({ component: DialogChartMeasurementsLabWork })"
                @onAccessModule="() => $q.dialog({ component: DialogLabWorkModule })"
            />
        </q-list>
    </PageResponsive>
</template>

<style scoped>
.btn-translation {
    transform: translateY(-12px) translateX(12px);
}
</style>
