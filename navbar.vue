<template>
  <div class="rb-navbar" :style="fixed ? `height: ${height + statusBarPlaceholderHeight}px` : ''">
    <!-- #ifdef MP-WEIXIN -->
    <div v-if="fixed && placeholder" :style="{ height: height + statusBarPlaceholderHeight + 'px' }"></div>
    <div class="navbar" :class="{ fixed }" :style="[navbarStyle]">
      <div
        class="btn-back"
        @click="$emit('back')"
        v-if="showBackButton"
        :style="{ padding: menuRect.right + 'px' }"
      >
        <img
          :src="backIcon"
          :style="{ width: iconSize + 'px', height: iconSize + 'px' }"
        />
      </div>
      <div class="box-title" :style="[titleBoxStyle]">
        <div class="title text-overflow" v-if="title" :style="{ color: color }">{{ title }}</div>
        <slot v-else></slot>
      </div>
    </div>
    <!-- #endif -->

    <!-- #ifdef MP-ALIPAY -->
    <div class="navbar" :style="[{ backgroundColor }, border && { borderBottom: `${1}px solid #F0F0F0` }]">
      <slot />
    </div>
    <!-- #endif -->
  </div>
</template>

<script>
  /* eslint-disable no-unreachable */
  import { Vue, Component, Prop } from 'vue-property-decorator';

  const DEFAULT_BACK_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAAXNSR0IArs4c6QAAAt1JREFUeAHt3LFqG0EQBmBLCiQgKWCQkHClN3Djwm0IdhNIquQB8gBuDCliY9y5cOMHcO0ieYKQwqmCG0Ma26lDQoRUuDBS0kjyDEggF3c6Sb7Z+Wdn4dCddu9m99Nyd9wNWlnx4gIu4AIu4AIu4AIu4AIu4AIu4AIu4AIusLRAs9l8UavVLur1+h0tl7T+aumDLnCAwgL7qN+FQN+PRqNT6uiD8RWLxe1Op/NVcgBFyWASsZJwOTah70n0YTqGKeA03DFwa3rwEutmgGfhjjF/SKBOx3gyvYG6ngW3UCj8K5VKH6XHCD+DM+L+J+A37Xb7Whr4wVVWOviy8ebAfS199zAZGywwAi4jQwKj4EICI+HCAaPhQgEj4sIAo+JCACPjqgdGx1UNbAFXLbAVXJXAlnDVAVvDVQVsEVcNsFVcFcCWcYMDW8cNChwDbjDgWHCDAMeEKw4cG64ocIy4YsCx4ooANxqNl4PBgBPuEl+wUs4C5y0Ee7XOEHmV3BNPCPeIOh8lLv9ouQNTjHUOlFRo5u6HSgpJ6tNjfp87MAHepHV4OBwe0GlkM60Ncp0E8OEMoOd0GvliFbk0Y/BLV/d6vZ+VSqVPyc9bKQd7SvXvqtXqN2r/O6UdXFXuwCxCaN9jRRYBjhlZDDhWZFHgGJHFgWNDDgIcE3Iw4AWQz+lu5A/vh1SCAjPUnLdwcMjBga0jqwC2jKwG2CqyKmCLyOqArSGrBLaErBbYCrJqYAvI6oHRkSGAkZFhgFGRoYARkeGA0ZAhgZGQYYFRkKGB50R+S3kXn+j58y3vJ1XggRkq40P7Z9R0rd/vf5bC5TgmgHkgGZErBHzC7aVK7rlpUgPhOJSleUx/APohKSYlIv5NqsvrezMzeAKUNpMJeJdm8NWkrcSnOWBGY+RyuXxFoBu0uUrLL5rZO91u94zrvTyiQKvV4oubFxdwARdwARdwARdwARdwARdwARfIKHAPupbgavZPCH0AAAAASUVORK5CYII=';

  @Component
  export default class Navbar extends Vue {
    @Prop({ type: String, default: '' }) title; // 标题
    @Prop({ type: String, default: '#141414' }) color; // 颜色
    @Prop({ type: String, default: '#fff' }) backgroundColor; // 背景色
    @Prop({ type: String, default: '' }) background; // 背景
    @Prop({ type: Boolean, default: false }) fixed; // 是否固定在顶部
    @Prop({ type: Boolean, default: true }) placeholder; // 固定在顶部时是否开启占位
    @Prop({ type: Boolean, default: true }) statusBarPlaceholder; // 是否留出状态栏高度
    @Prop({ type: Boolean, default: true }) border; //是否显示下边框
    @Prop({ type: Number, default: 10001 }) zIndex;
    @Prop({ type: Boolean, default: false }) showBackButton;
    @Prop({ type: String, default: DEFAULT_BACK_ICON }) backIcon; // 返回图标

    iconSize = 22;
    statusBarHeight = 20;
    platform = 'ios';
    menuRect = {
      width: 87,
      height: 32,
      right: 10
    }

    async created() {
      const { statusBarHeight, platform, screenWidth } = await uni.getSystemInfo();
      this.statusBarHeight = statusBarHeight;
      this.platform = platform;
      // #ifdef MP-WEIXIN
      this.getMenuBtnRect(statusBarHeight, screenWidth);
      // #endif
      await this.$nextTick();
      this.$emit('ready');
    }

    getMenuBtnRect(statusBarHeight, screenWidth) {
      const menuRect = uni.getMenuButtonBoundingClientRect();
      this.menuRect = {
        ...menuRect,
        top: menuRect.top > statusBarHeight ? menuRect.top - statusBarHeight : menuRect.top,
        right: menuRect.right < 20 ? menuRect.right : screenWidth - menuRect.right
      };
    }

    get statusBarPlaceholderHeight() {
      return this.statusBarPlaceholder ? this.statusBarHeight : 0;
    }

    get titleBoxStyle() {
      const { width, right } = this.menuRect;
      if (this.title) {
        return {
          paddingLeft: (this.showBackButton ? (width - this.iconSize) : (width + right * 2)) + 'px',
          paddingRight: width + right * 2 + 'px',
          lineHeight: this.height + 'px'
        };
      }
      return {
        paddingLeft: (this.showBackButton ? 0 : right * 2) + 'px',
        paddingRight: width + right * 2 + 'px',
        display: 'flex',
        alignItems: 'center'
      };
    }

    get navbarStyle() {
      const style =  {
        zIndex: this.zIndex,
        paddingTop: this.statusBarPlaceholderHeight + 'px',
        height: this.height + this.statusBarPlaceholderHeight + 'px',
        backgroundColor: this.backgroundColor
      };
      if (this.background) {
        style.background = this.background;
      }
      if (this.border) {
        style.borderBottom = '1px solid #F0F0F0';
      }
      if (this.fixed) {
        style.zIndex = this.zIndex;
      }
      return style;
    }

    get height() {
      const menuBtnDefaultVerticalPadding = this.platform.toLowerCase() === 'ios' ? 6 : 8;
      const height = this.menuRect.height + (
        this.menuRect.top ? (this.menuRect.top * 2) + 3 : menuBtnDefaultVerticalPadding * 2
      );
      // #ifdef MP-WEIXIN
      this.$emit('height', height + this.statusBarPlaceholderHeight);
      // #endif
      return height;
    }
  }
</script>

<style lang="scss">
  .rb-navbar {
    .navbar {
      position: relative;
      display: flex;
      box-sizing: border-box;
      width: 100%;

      .btn-back {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        padding: 0 15PX;
      }

      .box-title {
        flex: 1;
        box-sizing: border-box;
        overflow: hidden;

        .title {
          width: 100%;
          height: 100%;
          overflow: hidden;
          font-weight: bold;
          font-size: 16PX;
          text-align: center;
        }
      }

      &.fixed {
        position: fixed;
        top: 0;
      }
    }
  }
</style>
