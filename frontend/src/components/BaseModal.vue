<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="flex justify-center items-center"
    contentClass="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
  >
    <span class="mr-8 text-2xl font-bold border-b-2 py-3">
      <slot name="title" />
    </span>
    <div class="flex-grow overflow-y-auto py-5">
      <slot :params="params" />
    </div>
    <div class="flex-shrink-0 gap-5 border-t-2 flex justify-center items-center pt-4">
      <BaseButton
        class="text-green-600"
        @click="$emit('confirm', close)"
      >
        Подтвердить
      </BaseButton>
      <BaseButton
        class="text-red-600"
        @click="$emit('cancel', close)"
      >
        Отмена
      </BaseButton>
    </div>
    <button
      class="absolute top-0 right-0 mt-2 mr-2 hover:text-blue-600"
      @click="close"
    >
      <i class="fa fa-times" />
    </button>
  </vue-final-modal>
</template>

  <script>
    import {BaseButton} from '@/components'
    export default {
      name: 'BaseModal',
        components: {
            BaseButton
        },
      emits: ['cancel', 'confirm']
    }
    </script>