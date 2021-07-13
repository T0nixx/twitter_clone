<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
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
            @click="addNewQweet"
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

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item v-for="qweet in qweets" :key="qweet.id" class="qweet q-py-md">
            <q-item-section top avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Janet</strong>
                <span class="text-grey-7">
                  @Janet <br class="lt-md" />
                  &bull; {{ relativeDate(qweet.date) }}
                </span>
              </q-item-label>
              <q-item-label class="qweet-content text-body1">
                {{ qweet.content }}
              </q-item-label>
              <div class="row justify-between q-mt-sm qweet-icons">
                <q-btn
                  flat
                  round
                  icon="far fa-comment"
                  size="sm"
                  color="grey"
                />
                <q-btn
                  flat
                  round
                  icon="fas fa-retweet"
                  size="sm"
                  color="grey"
                />
                <q-btn
                  @click="toggleLiked(qweet)"
                  flat
                  round
                  :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'"
                  :color="qweet.liked ? 'pink' : 'grey'"
                  size="sm"
                />
                <q-btn
                  @click="deleteQweet(qweet)"
                  flat
                  round
                  icon="fas fa-trash"
                  size="sm"
                  color="grey"
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";
import { formatDistance } from "date-fns";

export default {
  name: "PageHome",
  data() {
    return {
      newQweetContent: "",
      qweets: [
        // {
        //   id: "id1",
        //   liked: true,
        //   content:
        //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aperiam soluta sit harum odit nisi similique officiis, nostrum consequuntur. Fugit consectetur molestiae libero eveniet nesciunt delectus tempora quisquam atque distinctio?",
        //   date: 1626151208787,
        // },
        // {
        //   id: "id2",
        //   liked: false,
        //   content:
        //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident aperiam soluta sit harum odit nisi similique officiis, nostrum consequuntur. Fugit consectetur molestiae libero eveniet nesciunt delectus tempora quisquam atque distinctio?",
        //   date: 1626151231131,
        // },
      ],
    };
  },
  methods: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    },
    addNewQweet() {
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
        liked: false,
      };
      // this.qweets.unshift(newQweet);
      db.collection("qweets")
        .add(newQweet)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      this.newQweetContent = "";
    },
    deleteQweet(qweet) {
      let idToDelete = qweet.id;
      let index = this.qweets.findIndex((qweet) => qweet.id === idToDelete);
      db.collection("qweets")
        .doc(qweet.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
      // this.qweets.splice(index, 1);
    },
    toggleLiked(qweet) {
      db.collection("qweets")
        .doc(qweet.id)
        .update({
          liked: !qweet.liked,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
  },
  mounted() {
    db.collection("qweets")
      .orderBy("date")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let qweetChange = { ...change.doc.data(), id: change.doc.id };

          if (change.type === "added") {
            console.log("New city: ", qweetChange);
            this.qweets.unshift(qweetChange);
          }
          if (change.type === "modified") {
            console.log("Modified city: ", qweetChange);
            let index = this.qweets.findIndex(
              (qweet) => qweet.id === qweetChange.id
            );
            Object.assign(this.qweets[index], qweetChange);
          }
          if (change.type === "removed") {
            console.log("Removed city: ", qweetChange);
            let index = this.qweets.findIndex(
              (qweet) => qweet.id === qweetChange.id
            );
            this.qweets.splice(index, 1);
          }
        });
      });
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
.qweet:not(:first-child)
  border-top: 1px solide rgba(0, 0, 0, 0.12)
.qweet-content
  white-space: pre-line
.qweet-icons
  margin-left: -5px
</style>
