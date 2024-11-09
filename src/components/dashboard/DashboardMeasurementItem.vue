<script setup lang="ts">
import { chartsIcon } from '@/shared/icons'
import { useQuasar } from 'quasar'

defineProps<{
    title: string
    description: string
    icon: string
    hasRecords: boolean
}>()

const emit = defineEmits<{
    (event: 'onCharts'): void
    (event: 'onAccessModule'): void
}>()

const $q = useQuasar()
</script>

<template>
    <q-item>
        <q-item-section>
            <q-card flat bordered>
                <q-item class="q-mt-sm">
                    <q-item-section top>
                        <q-item-label class="text-h5">{{ title }}</q-item-label>
                    </q-item-section>

                    <q-item-section top side>
                        <q-btn
                            :disable="!hasRecords || $q.loading.isActive"
                            :icon="chartsIcon"
                            class="btn-translation"
                            :color="!hasRecords || $q.loading.isActive ? 'grey' : 'cyan'"
                            flat
                            dense
                            round
                            @click="emit('onCharts')"
                        />
                    </q-item-section>
                </q-item>

                <q-item>
                    <q-item-section>
                        <q-item-label>
                            {{ description }}
                        </q-item-label>
                    </q-item-section>
                </q-item>

                <q-card-actions>
                    <q-btn
                        :disable="$q.loading.isActive"
                        :icon="icon"
                        color="primary"
                        label="Access Module"
                        class="full-width"
                        @click="emit('onAccessModule')"
                    />
                </q-card-actions>
            </q-card>
        </q-item-section>
    </q-item>
</template>

<style scoped>
.btn-translation {
    transform: translateY(-12px) translateX(12px);
}
</style>
