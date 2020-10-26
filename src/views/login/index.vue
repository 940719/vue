<template>
  <div
    class="login-container"
    v-lazy:background-image="{ src: backgroundImage }"
  >
    <div class="login-background">
      <div class="login-main">
        <div class="login-left">
          <div class="login-title">
            欢迎来到
            <span class="svg-container svg-container_icon">
              <svg-icon icon-class="icon" />
            </span>
          </div>
          <el-divider></el-divider>
          <div class="login-title">智慧厂区管理可视化平台</div>
          <div class="login-base">
            SMART FACTORY MANAGEMENT VISUALIZATION PLATFROM
          </div>
        </div>
        <el-form
          class="login-form"
          autocomplete="on"
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          label-position="left"
        >
          <h3 class="title">欢迎登录</h3>
          <el-form-item prop="username">
            <span class="svg-container svg-container_login">
              <svg-icon icon-class="icon_user" />
            </span>
            <el-input
              size="small"
              name="username"
              type="text"
              v-model="loginForm.username"
              autocomplete="on"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="icon_password"></svg-icon>
            </span>
            <el-input
              size="small"
              name="password"
              :type="pwdType"
              v-model="loginForm.password"
              placeholder="请输入密码"
            ></el-input>
            <span class="show-pwd" @click="showPwd">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item prop="code">
                <span class="svg-container">
                  <svg-icon icon-class="icon_yzm"></svg-icon>
                </span>
                <el-input
                  style="width: 157px"
                  size="small"
                  name="code"
                  type="text"
                  autocomplete="on"
                  @keyup.enter.native="login('loginForm')"
                  v-model="loginForm.code"
                  placeholder="请输入验证码"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <div class="code-container" @click="initCode()">
                  <span
                    v-for="item in codes"
                    :key="item.id"
                    :style="{
                      fontSize: item.codeFontSize,
                      color: item.codeColor,
                      transfrom: item.codeTransfrom,
                      fontFamily: item.codeFontFamily,
                    }"
                    >{{ item.codeChar }}</span
                  >
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-checkbox size="16px" v-model="checked">记住信息</el-checkbox>
          <el-form-item style="border: none">
            <el-button
              type="primary"
              style="width: 100%"
              :loading="loading"
              @click.native.prevent="login('loginForm')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { login } from "@/api/permission";
import allBackgroundImages from "@/utils/images.js";
export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("验证码不能为空"));
      } else {
        callback();
      }
    };
    return {
      checked: false, //是否记住信息
      allBackgroundImages, //背景图
      loginForm: {
        username: "admin",
        password: "123456",
        code: "",
      }, //登录信息
      codes: [], //验证码
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername,
          },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
        code: [{ required: true, trigger: "blur", validator: validateCode }],
      }, //表单验证
      loading: false,
      pwdType: "password",
    };
  },
  mounted() {
    this.initCode();
  },
  computed: {
    backgroundImage() {
      // 根据背景图数组的长度随机选择索引
      const randIndex = Math.floor(
        Math.random() * this.allBackgroundImages.length
      );
      return `${this.allBackgroundImages[randIndex]}`;
      // 获取对应的图片资源并将其设置到`background-image`属性上
    },
  },
  methods: {
    initCode() {
      this.codes = [];
      var codeChars = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      var codeFontFamilys = new Array("微软雅黑", "宋体");
      var codeFontSizes = new Array("22px", "24px", "26px");
      var codeColors = new Array(
        "rgb(134,155,12)",
        "rgb(215,101,101)",
        "rgb(92,158,245)"
      );
      var codeTransfroms = new Array(
        "rotateY(-15deg)",
        "rotateY(0deg)",
        "rotateY(15deg)",
        "rotateY(30deg)"
      );
      var codeLength = 4;
      for (var i = 0; i < codeLength; i++) {
        var code = {};
        code["id"] = i;
        code["codeChar"] =
          codeChars[Math.floor(Math.random() * codeChars.length)];
        code["codeFontSize"] =
          codeFontSizes[Math.floor(Math.random() * codeFontSizes.length)];
        code["codeColor"] =
          codeColors[Math.floor(Math.random() * codeColors.length)];
        code["codeTransfrom"] =
          codeTransfroms[Math.floor(Math.random() * codeTransfroms.length)];
        code["codeFontFamily"] =
          codeFontFamilys[Math.floor(Math.random() * codeFontFamilys.length)];
        this.codes.push(code);
      }
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    async login(formName) {
      var that = this;
      let code = "";
      that.codes.forEach((item) => {
        code += item.codeChar;
      });
      let inputCode = new RegExp(this.loginForm.code, "ig");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (code.match(inputCode)) {
            try {
              // let data = await login(this.loginForm);
              // let token = data.token;
              // this.$store.commit("LOGIN_IN", token);
              this.$router.replace("/home");
            } catch (e) {
              console.log(e);
            }
          }else{
             Message.error('验证码错误')
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #b4b4b4;
$bottom_gray: #1c775b;
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 48px;
    width: 290px;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding-right:15px ;
      color: $light_gray;
      height: 48px;
      font-size: 18px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #aaa !important;
      }
    }
  }
  .login-main {
    .el-checkbox__label {
      font-size: 16px;
      color: $light_gray;
    }
    .el-checkbox__inner {
      width: 16px;
      height: 16px;
      border-color: $light_gray;
    }
  }
  .login-left {
    .el-divider--horizontal {
      margin: 22px 0 27px 0;
    }
  }
  .el-form-item {
    border: 1px solid rgba(40, 40, 40, 0.2);
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 25px;
    .el-form-item__content {
      line-height: 26px;
    }
    .el-button--primary {
      margin-top: 40px;
      background-color: $bottom_gray;
      height: 48px;
      font-size: 16px;
      border: none;
      :hover {
        border: none;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #1c775b;
$left-bg: rgba(0, 0, 0, 0.3);
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(1, 163, 209, 0.1);
  background-size: 100% 100%;
  .login-background {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(1, 163, 209, 0.1);
    .login-main {
      z-index: 2;
      display: flex;
      .login-left {
        border-radius: 10px 0 0 10px;
        height: 612px;
        display: flex;
        background-color: $left-bg;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: center;
        padding: 0 62px;
        width: 670px;
        .login-title {
          color: #fff;
          font-size: 47px;
          font-family: "Microsoft YaHei";
          font-weight: bold;
          width: 546px;
          height: 47px;
          line-height: 48px;
          letter-spacing: 2.6px;
        }
        .login-base {
          font-size: 16px;
          height: 14px;
          letter-spacing: 1.5px;
          width: 546px;
          color: #fff;
          margin-top: 12px;
        }
      }
      .login-form {
        border-radius: 0 10px 10px 0;
        width: 530px;
        height: 612px;
        padding: 35px 98px 15px 98px;
        background-color: #fff;
      }
    }
  }

  .code-container {
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #f1f1f1;
    > span {
      padding: 6px 0;
      line-height: 35px;
      height: 48px;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 14px 12px 14px 9px;
    color: $dark_gray;
    width: 41px;
    font-size: 20px;
    &_login {
      font-size: 20px;
    }
    &_icon {
      padding: 0;
      font-size: 42px;
      line-height: 36px;
    }
  }

  .title {
    font-size: 35px;
    font-weight: bold;
    color: $light_gray;
    margin: 40px auto 60px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .fontcontainer {
    color: #889aa4;
    padding-left: 10px;
  }
}
</style>
