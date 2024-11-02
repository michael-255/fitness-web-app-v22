import useLogger from '@/composables/useLogger'
import { ExerciseResultServInst } from '@/services/ExerciseResultService'
import { ExerciseServInst } from '@/services/ExerciseService'
import { LogServInst } from '@/services/LogService'
import { MeasurementServInst } from '@/services/MeasurementService'
import { PlanServInst } from '@/services/PlanService'
import { SettingServInst } from '@/services/SettingService'
import { WorkoutResultServInst } from '@/services/WorkoutResultService'
import { WorkoutServInst } from '@/services/WorkoutService'
import { RouteNameEnum, TableEnum } from '@/shared/enums'
import type { ServiceType } from '@/shared/types'
import { useRoute, useRouter } from 'vue-router'

export default function useRouting() {
    // Do NOT return route or router from any composable due to performance issues
    const route = useRoute()
    const router = useRouter()
    const { log } = useLogger()

    // Current table used by the route is any
    const routeTable = Array.isArray(route.params.table)
        ? route.params.table[0]
        : route.params.table

    // Service associated with the current route table if any
    let routeService: ServiceType = null!

    switch (routeTable) {
        case TableEnum.SETTINGS:
            routeService = SettingServInst
            break
        case TableEnum.LOGS:
            routeService = LogServInst
            break
        case TableEnum.PLANS:
            routeService = PlanServInst
            break
        case TableEnum.WORKOUTS:
            routeService = WorkoutServInst
            break
        case TableEnum.WORKOUT_RESULTS:
            routeService = WorkoutResultServInst
            break
        case TableEnum.EXERCISES:
            routeService = ExerciseServInst
            break
        case TableEnum.EXERCISE_RESULTS:
            routeService = ExerciseResultServInst
            break
        case TableEnum.MEASUREMENTS:
            routeService = MeasurementServInst
            break
    }

    /**
     * Go to the specified data table route.
     */
    function goToTable(table: TableEnum) {
        try {
            router.push({
                name: RouteNameEnum.TABLE,
                params: { table },
            })
        } catch (error) {
            log.error('Error accessing Table route', error as Error)
        }
    }

    /**
     * Go back if previous route state is part of the app history, otherwise go to root path.
     */
    function goBack() {
        try {
            if (router?.options?.history?.state?.back) {
                router.back()
            } else {
                router.push('/')
            }
        } catch (error) {
            log.error('Error accessing previous route', error as Error)
        }
    }

    return {
        routeTable,
        routeService,
        goToTable,
        goBack,
    }
}