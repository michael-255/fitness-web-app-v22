<script setup lang="ts">
import DashboardActivityItem from '@/components/dashboard/DashboardActivityItem.vue'
import DashboardEmptyMessage from '@/components/dashboard/DashboardEmptyMessage.vue'
import PageFabMenu from '@/components/page/PageFabMenu.vue'
import PageHeading from '@/components/page/PageHeading.vue'
import PageResponsive from '@/components/page/PageResponsive.vue'
import useLogger from '@/composables/useLogger'
import { WorkoutResultServInst } from '@/services/WorkoutResultService'
import { WorkoutServInst } from '@/services/WorkoutService'
import { appName } from '@/shared/constants'
import { RouteNameEnum, TableEnum } from '@/shared/enums'
import { addIcon, workoutsPageIcon } from '@/shared/icons'
import type { WorkoutType } from '@/shared/types'
import { useMeta, useQuasar } from 'quasar'
import { onUnmounted, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

useMeta({ title: `${appName} - Workouts Dashboard` })

const $q = useQuasar()
const router = useRouter()
const { log } = useLogger()

const subscriptionFinished = ref(false)
const liveRecords: Ref<WorkoutType[]> = ref([])
const subscription = WorkoutServInst.liveDashboard<WorkoutType>().subscribe({
    next: (records) => {
        liveRecords.value = records
        subscriptionFinished.value = true
    },
    error: (error) => {
        log.error(`Error loading live ${WorkoutServInst.labelPlural} data`, error as Error)
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
                    label: 'Workouts Data',
                    color: 'primary',
                    icon: WorkoutServInst.tableIcon,
                    handleClick: () =>
                        router.push({
                            name: RouteNameEnum.TABLE,
                            params: { table: TableEnum.WORKOUTS },
                        }),
                },
                {
                    label: 'Workout Results Data',
                    color: 'secondary',
                    icon: WorkoutResultServInst.tableIcon,
                    handleClick: () =>
                        router.push({
                            name: RouteNameEnum.TABLE,
                            params: { table: TableEnum.WORKOUT_RESULTS },
                        }),
                },
                {
                    label: 'Create Workout',
                    color: 'positive',
                    icon: addIcon,
                    handleClick: () => $q.dialog(WorkoutServInst.createDialogOptions()),
                },
            ]"
        />

        <PageHeading :headingIcon="workoutsPageIcon" :headingTitle="WorkoutServInst.labelPlural" />

        <q-list padding>
            <DashboardEmptyMessage
                v-if="liveRecords && liveRecords.length == 0 && subscriptionFinished"
                :title="`No Workouts Found`"
                :messages="[
                    'If this is your first time using the app, try creating a new Workout below.',
                    'Don\'t see an Workout that you created? Make sure it does not have the hidden status.',
                ]"
                buttonLabel="Create Workout"
                buttonColor="positive"
                @onEmptyAction="() => $q.dialog(WorkoutServInst.createDialogOptions())"
            />

            <DashboardActivityItem
                v-for="record in liveRecords"
                :key="record.id"
                :record="record"
                :service="WorkoutServInst"
                :childService="WorkoutResultServInst"
            />
        </q-list>
    </PageResponsive>
</template>
