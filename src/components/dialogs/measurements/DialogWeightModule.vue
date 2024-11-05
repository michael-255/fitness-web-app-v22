<script setup lang="ts">
import { MeasurementFieldEnum } from '@/shared/enums'
import { closeIcon, weightModuleIcon } from '@/shared/icons'
import { formatNumber } from '@/shared/utils'
import { useDialogPluginComponent } from 'quasar'
import MeasurementPreviousItem from './MeasurementPreviousItem.vue'

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()
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
            <q-icon :name="weightModuleIcon" size="sm" class="q-mx-sm" />
            <q-toolbar-title>Weight Module</q-toolbar-title>
            <q-btn flat round :icon="closeIcon" @click="onDialogCancel" />
        </q-toolbar>

        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="row justify-center">
                    <div class="responsive-container">
                        <q-list padding>
                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.BODY_WEIGHT"
                                :previous-value="formatNumber(175)"
                                :previous-created-at="Date.now()"
                                value-suffix="lbs"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.BODY_FAT"
                                :previous-value="formatNumber(19.78, 1)"
                                :previous-created-at="Date.now() - 10000000000"
                                value-suffix="%"
                            />
                        </q-list>

                        <div class="q-mt-xl" />
                    </div>
                </div>
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
