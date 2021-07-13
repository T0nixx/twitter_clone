<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input
          bottom-slots
          v-model="newQweetContent"
          class="new-qweet"
          placeholder="What's happening?"
          counter
          autogrow
          maxlength="280"
        >
          <template v-slot:before>
            <q-avatar size="xl">
              <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
            </q-avatar>
          </template>
        </q-input>
      </div>
      <div class="col col-shrink">
        <q-btn
          class="q-mb-lg"
          :disable="!newQweetContent"
          no-caps
          unelevated
          rounded
          label="Qweet"
          color="primary"
        />
      </div>
    </div>

    <q-separator size="10px" color="grey-2" class="divider" />

    <q-list>
      <q-item class="q-py-md">
        <q-item-section top avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>Janet</strong
            ><span class="text-grey-7">@Janet</span></q-item-label
          >
          <q-item-label class="qweet-content text-body1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident
            aperiam soluta sit harum odit nisi similique officiis, nostrum
            consequuntur. Fugit consectetur molestiae libero eveniet nesciunt
            delectus tempora quisquam atque distinctio?
          </q-item-label>
          <div class="row justify-between q-mt-sm qweet-icons">
            <q-btn flat round icon="far fa-comment" size="sm" color="grey" />
            <q-btn flat round icon="fas fa-retweet" size="sm" color="grey" />
            <q-btn flat round icon="far fa-heart" size="sm" color="grey" />
            <q-btn flat round icon="fas fa-trash" size="sm" color="grey" />
          </div>
        </q-item-section>

        <q-item-section side top> 1 min ago </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: "PageHome",
  data() {
    return {
      newQweetContent: "",
    };
  },
};
</script>

<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.qweet-content
  white-space: pre-line
.qweet-icons
  margin-left: -5px
</style>
