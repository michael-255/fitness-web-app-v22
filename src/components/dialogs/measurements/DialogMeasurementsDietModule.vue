<script setup lang="ts">
import { MeasurementFieldEnum } from '@/shared/enums'
import { closeIcon, dietModuleIcon } from '@/shared/icons'
import { useSettingsStore } from '@/stores/settings'
import { useDialogPluginComponent } from 'quasar'
import MeasurementPreviousItem from './MeasurementPreviousItem.vue'

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()

const settingsStore = useSettingsStore()
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
            <q-icon :name="dietModuleIcon" size="sm" class="q-mx-sm" />
            <q-toolbar-title>Diet Module</q-toolbar-title>
            <q-btn flat round :icon="closeIcon" @click="onDialogCancel" />
        </q-toolbar>

        <q-card class="q-dialog-plugin">
            <q-card-section>
                <div class="row justify-center">
                    <div class="responsive-container">
                        <q-list padding>
                            <q-item>
                                <q-item-section>
                                    <q-item-label class="text-bold">Diet</q-item-label>

                                    <q-item-label v-if="!settingsStore.advancedMode">
                                        Update your calories and the three macronutrients below. You
                                        should only do this once a day.
                                    </q-item-label>
                                </q-item-section>
                            </q-item>

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.CALORIES"
                                previous-value="3350"
                                :previous-created-at="Date.now()"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.CARBS"
                                previous-value="123"
                                :previous-created-at="Date.now() - 10000000000"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.FAT"
                                previous-value="72"
                                :previous-created-at="Date.now() - 100000000"
                                value-suffix="grams"
                            />

                            <MeasurementPreviousItem
                                :title="MeasurementFieldEnum.PROTEIN"
                                previous-value="95"
                                :previous-created-at="Date.now() - 200000000000"
                                value-suffix="grams"
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
