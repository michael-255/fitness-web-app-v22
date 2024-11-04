<script setup lang="ts">
import DashboardMeasurementItem from '@/components/dashboard/DashboardMeasurementItem.vue'
import DialogMeasurementsDietModule from '@/components/dialogs/measurements/DialogMeasurementsDietModule.vue'
import PageFabMenu from '@/components/page/PageFabMenu.vue'
import PageHeading from '@/components/page/PageHeading.vue'
import PageResponsive from '@/components/page/PageResponsive.vue'
import { MeasurementServInst } from '@/services/MeasurementService'
import { appName } from '@/shared/constants'
import { RouteNameEnum, TableEnum } from '@/shared/enums'
import {
    addIcon,
    bodyModuleIcon,
    dietModuleIcon,
    healthModuleIcon,
    labWorkModuleIcon,
    measurementsPageIcon,
    weightModuleIcon,
} from '@/shared/icons'
import { useMeta, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

useMeta({ title: `${appName} - Measurements Dashboard` })

const $q = useQuasar()
const router = useRouter()
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
                :hasRecords="false"
                @onCharts="() => console.log('Diet charts clicked')"
                @onAccessModule="() => $q.dialog({ component: DialogMeasurementsDietModule })"
            />

            <DashboardMeasurementItem
                title="Weight"
                description="The Weight module tracks body composition metrics. These measurements provide insight into weight-related health indicators."
                :icon="weightModuleIcon"
                :hasRecords="false"
                @onCharts="() => console.log('Weight charts clicked')"
                @onAccessModule="() => console.log('Weight module clicked')"
            />

            <DashboardMeasurementItem
                title="Health"
                description="The Health module tracks vital health indicators providing essential data for monitoring overall health."
                :icon="healthModuleIcon"
                :hasRecords="false"
                @onCharts="() => console.log('Health charts clicked')"
                @onAccessModule="() => console.log('Health module clicked')"
            />

            <DashboardMeasurementItem
                title="Body"
                description="The Body module tracks various physical dimension measurements which provide a detailed overview of an individual's body composition and physical attributes."
                :icon="bodyModuleIcon"
                :hasRecords="false"
                @onCharts="() => console.log('Body charts clicked')"
                @onAccessModule="() => console.log('Body module clicked')"
            />

            <DashboardMeasurementItem
                title="Lab Work"
                description="The Lab Work module tracks various blood measurements. These measurements provide a detailed overview of an individual's blood health and can be used to assess cardiovascular risk and monitor conditions such as diabetes."
                :icon="labWorkModuleIcon"
                :hasRecords="false"
                @onCharts="() => console.log('Lab Work charts clicked')"
                @onAccessModule="() => console.log('Lab Work module clicked')"
            />
        </q-list>
    </PageResponsive>
</template>

<style scoped>
.btn-translation {
    transform: translateY(-12px) translateX(12px);
}
</style>
