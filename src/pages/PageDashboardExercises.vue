<script setup lang="ts">
import DashboardActivityItem from '@/components/dashboard/DashboardActivityItem.vue'
import DashboardEmptyMessage from '@/components/dashboard/DashboardEmptyMessage.vue'
import PageFabMenu from '@/components/page/PageFabMenu.vue'
import PageHeading from '@/components/page/PageHeading.vue'
import PageResponsive from '@/components/page/PageResponsive.vue'
import useLogger from '@/composables/useLogger'
import { ExerciseResultServInst } from '@/services/ExerciseResultService'
import { ExerciseServInst } from '@/services/ExerciseService'
import { appName } from '@/shared/constants'
import { RouteNameEnum, TableEnum } from '@/shared/enums'
import { addIcon, exercisesPageIcon } from '@/shared/icons'
import type { ExerciseType } from '@/shared/types'
import { useMeta, useQuasar } from 'quasar'
import { onUnmounted, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

useMeta({ title: `${appName} - Exercises Dashboard` })

const $q = useQuasar()
const router = useRouter()
const { log } = useLogger()

const subscriptionFinished = ref(false)
const liveRecords: Ref<ExerciseType[]> = ref([])
const subscription = ExerciseServInst.liveDashboard<ExerciseType>().subscribe({
    next: (records) => {
        liveRecords.value = records
        subscriptionFinished.value = true
    },
    error: (error) => {
        log.error(`Error loading live ${ExerciseServInst.labelPlural} data`, error as Error)
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
                    label: 'Exercises Data',
                    color: 'primary',
                    icon: ExerciseServInst.tableIcon,
                    handleClick: () =>
                        router.push({
                            name: RouteNameEnum.TABLE,
                            params: { table: TableEnum.EXERCISES },
                        }),
                },
                {
                    label: 'Exercise Results Data',
                    color: 'primary',
                    icon: ExerciseResultServInst.tableIcon,
                    handleClick: () =>
                        router.push({
                            name: RouteNameEnum.TABLE,
                            params: { table: TableEnum.EXERCISE_RESULTS },
                        }),
                },
                {
                    label: 'Create Exercise',
                    color: 'positive',
                    icon: addIcon,
                    handleClick: () => $q.dialog(ExerciseServInst.createDialogOptions()),
                },
            ]"
        />

        <PageHeading
            :headingIcon="exercisesPageIcon"
            :headingTitle="ExerciseServInst.labelPlural"
        />

        <q-list padding>
            <DashboardEmptyMessage
                v-if="liveRecords && liveRecords.length == 0 && subscriptionFinished"
                :title="`No Exercises Found`"
                :messages="[
                    'If this is your first time using the app, try creating a new Exercise below.',
                    'Don\'t see an Exercise that you created? Make sure it does not have the hidden status.',
                ]"
                buttonLabel="Create Exercise"
                buttonColor="positive"
                @onEmptyAction="() => $q.dialog(ExerciseServInst.createDialogOptions())"
            />

            <DashboardActivityItem
                v-for="record in liveRecords"
                :key="record.id"
                :record="record"
                :service="ExerciseServInst"
                :childService="ExerciseResultServInst"
            />
        </q-list>
    </PageResponsive>
</template>
