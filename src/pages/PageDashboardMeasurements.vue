<script setup lang="ts">
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
    chartsIcon,
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
            <q-item>
                <q-item-section>
                    <q-card>
                        <q-item class="q-mt-sm">
                            <q-item-section top>
                                <q-item-label class="text-h5"> Diet </q-item-label>
                            </q-item-section>

                            <q-item-section top side>
                                <div class="row">
                                    <q-btn
                                        :disable="$q.loading.isActive"
                                        class="btn-translation"
                                        flat
                                        dense
                                        round
                                        color="cyan"
                                        :icon="chartsIcon"
                                    />
                                </div>
                            </q-item-section>
                        </q-item>

                        <q-item>
                            <q-item-section>
                                <q-item-label>
                                    The Diet & Weight module tracks key nutritional and body
                                    composition metrics. These measurements provide a comprehensive
                                    overview of dietary intake and weight-related health indicators.
                                </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-card-actions>
                            <q-btn
                                :disable="$q.loading.isActive"
                                color="primary"
                                label="Access Module"
                                class="full-width"
                                :icon="dietModuleIcon"
                                @click="
                                    () =>
                                        $q.dialog({
                                            component: DialogMeasurementsDietModule,
                                        })
                                "
                            />
                        </q-card-actions>
                    </q-card>
                </q-item-section>
            </q-item>

            <q-item>
                <q-item-section>
                    <q-card>
                        <q-item class="q-mt-sm">
                            <q-item-section top>
                                <q-item-label class="text-h5"> Weight </q-item-label>
                            </q-item-section>

                            <q-item-section top side>
                                <div class="row">
                                    <q-btn
                                        :disable="$q.loading.isActive"
                                        class="btn-translation"
                                        flat
                                        dense
                                        round
                                        color="cyan"
                                        :icon="chartsIcon"
                                    />
                                </div>
                            </q-item-section>
                        </q-item>

                        <q-item>
                            <q-item-section>
                                <q-item-label>
                                    The Diet & Weight module tracks key nutritional and body
                                    composition metrics. These measurements provide a comprehensive
                                    overview of dietary intake and weight-related health indicators.
                                </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-card-actions>
                            <q-btn
                                :disable="$q.loading.isActive"
                                color="primary"
                                label="Access Module"
                                class="full-width"
                                :icon="weightModuleIcon"
                                @click="
                                    () =>
                                        $q.dialog({
                                            component: DialogMeasurementsDietModule,
                                        })
                                "
                            />
                        </q-card-actions>
                    </q-card>
                </q-item-section>
            </q-item>

            <q-item>
                <q-item-section>
                    <q-card>
                        <q-item class="q-mt-sm">
                            <q-item-section top>
                                <q-item-label class="text-h5">Health</q-item-label>
                            </q-item-section>

                            <q-item-section top side>
                                <div class="row">
                                    <q-btn
                                        :disable="$q.loading.isActive"
                                        class="btn-translation"
                                        flat
                                        dense
                                        round
                                        color="cyan"
                                        :icon="chartsIcon"
                                    />
                                </div>
                            </q-item-section>
                        </q-item>

                        <q-item>
                            <q-item-section>
                                <q-item-label>
                                    The Health module tracks vital health indicators providing
                                    essential data for monitoring overall health.
                                </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-card-actions>
                            <q-btn
                                :disable="$q.loading.isActive"
                                color="primary"
                                label="Access Module"
                                class="full-width"
                                :icon="healthModuleIcon"
                            />
                        </q-card-actions>
                    </q-card>
                </q-item-section>
            </q-item>

            <q-item>
                <q-item-section>
                    <q-card>
                        <q-item class="q-mt-sm">
                            <q-item-section top>
                                <q-item-label class="text-h5">Body</q-item-label>
                            </q-item-section>

                            <q-item-section top side>
                                <div class="row">
                                    <q-btn
                                        :disable="$q.loading.isActive"
                                        class="btn-translation"
                                        flat
                                        dense
                                        round
                                        color="cyan"
                                        :icon="chartsIcon"
                                    />
                                </div>
                            </q-item-section>
                        </q-item>

                        <q-item>
                            <q-item-section>
                                <q-item-label>
                                    The Body module tracks various physical dimension measurements
                                    which provide a detailed overview of an individual's body
                                    composition and physical attributes.
                                </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-card-actions>
                            <q-btn
                                :disable="$q.loading.isActive"
                                color="primary"
                                label="Access Module"
                                class="full-width"
                                :icon="bodyModuleIcon"
                            />
                        </q-card-actions>
                    </q-card>
                </q-item-section>
            </q-item>

            <q-item>
                <q-item-section>
                    <q-card>
                        <q-item class="q-mt-sm">
                            <q-item-section top>
                                <q-item-label class="text-h5">Lab Work</q-item-label>
                            </q-item-section>

                            <q-item-section top side>
                                <div class="row">
                                    <q-btn
                                        :disable="$q.loading.isActive"
                                        class="btn-translation"
                                        flat
                                        dense
                                        round
                                        color="cyan"
                                        :icon="chartsIcon"
                                    />
                                </div>
                            </q-item-section>
                        </q-item>

                        <q-item>
                            <q-item-section>
                                <q-item-label>
                                    The Lab Work module tracks various blood measurements. These
                                    measurements provide a detailed overview of an individual's
                                    blood health and can be used to assess cardiovascular risk and
                                    monitor conditions such as diabetes.
                                </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-card-actions>
                            <q-btn
                                :disable="$q.loading.isActive"
                                color="primary"
                                label="Access Module"
                                class="full-width"
                                :icon="labWorkModuleIcon"
                            />
                        </q-card-actions>
                    </q-card>
                </q-item-section>
            </q-item>
        </q-list>
    </PageResponsive>
</template>

<style scoped>
.btn-translation {
    transform: translateY(-12px) translateX(12px);
}
</style>
