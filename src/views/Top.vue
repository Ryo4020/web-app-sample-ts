<template>
  <div class="top">
    <div class="top-wrapper">
      <div class="top-title">Web App Sample</div>
      <div class="tab-wrapper">
        <TabComponent
          :list="tabList"
          :selected="selectedTab"
          @click-event="selectTab"
        />
        <LoginForm
          v-for="item in tabList"
          :key="item.id"
          v-show="selectedTab === item.id"
          :data="formData[item.id - 1]"
          :tabData="item"
          :selectedTab="selectedTab"
          @change-value="changeValue"
          @sign-up="signUp"
          @sign-in="signIn"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TabComponent from "@/components/molecules/TabComponent.vue";
import LoginForm from "@/components/organisms/LoginForm.vue";

export default defineComponent({
  name: "Top",
  components: {
    TabComponent,
    LoginForm,
  },
  data() {
    return {
      tabList: [
        {
          id: 1,
          label: "Login",
          footerPasswordResendLabel: "パスワードをお忘れの場合はこちら",
        },
        {
          id: 2,
          label: "Create Account",
        },
      ],
      formData: [
        [
          {
            id: 1,
            label: "ID",
            value: "",
            formType: "TextField",
          },
          {
            id: 2,
            label: "Password",
            value: "",
            formType: "PasswordField",
          },
        ],
        [
          {
            id: 1,
            label: "ID",
            value: "",
            formType: "TextField",
          },
          {
            id: 2,
            label: "Password",
            value: "",
            formType: "PasswordField",
          },
        ],
      ],
    };
  },
  computed: {
    selectedTab(): number {
      return (this as any).$store.state.common.selectedTab;
    },
  },
  methods: {
    changeValue(value: string, key: number, formNumber: number): void {
      (this as any).formData[formNumber - 1][key - 1].value = value;
    },
    selectTab(id: number): void {
      (this as any).$store.commit("common/setSelectedTab", id);
    },
    signUp(): void {
      (this as any).$store.dispatch("auth/signUp", {
        id: (this as any).formData[1][0].value,
        password: (this as any).formData[1][1].value,
      });
    },
    signIn(): void {
      (this as any).$store.dispatch("auth/signIn", {
        id: (this as any).formData[0][0].value,
        password: (this as any).formData[0][1].value,
      });
    },
  },
});
</script>

<style lang="scss" scopped>
.top {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &-wrapper {
    width: 400px;
    .top-title {
      font-size: 36px;
      text-align: center;
      cursor: pointer;
    }
    .tab-wrapper {
      margin-top: 8px;
    }
  }
}
</style>