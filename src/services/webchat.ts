import axios from 'axios';

type WebchatConfig = {
  enabled?: boolean;
  sdkUrl?: string;
  sdkVersion?: string;
  botId?: string;
  title?: string;
};

const envConfig: WebchatConfig = {
  enabled: true,
  sdkUrl:
    'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.19/libs/cn/index.js',
  botId: '7577623761709596706',
  title: 'LogicFlow答疑助手',
};

async function getChatJwtToken(uid: string): Promise<string> {
  try {
    const { data: resData } = await axios.get('/agent/getToken', {
      params: { uid },
      timeout: 5000,
    });
    if (!resData || !resData.jwtToken) return '';
    return resData.jwtToken;
  } catch {
    return uid;
  }
}

export function getWebchatConfig(): WebchatConfig {
  // const winCfg = (window as any).__WEBCHAT_CONFIG__ || {};
  return envConfig;
}

function loadSdk(url: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = url;
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => reject(new Error('sdk_load_error'));
    document.head.appendChild(s);
  });
}

async function tryLoadWithFallback(url: string): Promise<void> {
  try {
    await loadSdk(url);
  } catch (e) {
    const retryUrl = url.includes('?')
      ? `${url}&t=${Date.now()}`
      : `${url}?t=${Date.now()}`;
    await loadSdk(retryUrl);
  }
}

export async function setupWebChat(): Promise<any | null> {
  const key = 'logicflow_site_uuid';
  const getUUID = () => {
    const uuid = localStorage.getItem(key);
    if (uuid) return uuid;
    const gen =
      globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function'
        ? globalThis.crypto.randomUUID()
        : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (item) => {
            const random = (Math.random() * 16) | 0;
            const value = item === 'x' ? random : (random & 0x3) | 0x8;
            return value.toString(16);
          });
    localStorage.setItem(key, gen);
    return gen;
  };
  // Oauth 配置
  const cfg = getWebchatConfig();
  if (
    !cfg.enabled &&
    !cfg.botId &&
    (typeof localStorage === 'undefined' ||
      localStorage.getItem('webchat_enabled') !== 'true')
  )
    return null;
  await tryLoadWithFallback(String(cfg.sdkUrl));
  const sdk = (window as any).CozeWebSDK;
  if (!sdk) return null;
  const loadedVersion = String(sdk.version || '');
  const expected = String(cfg.sdkVersion || '');
  if (expected && loadedVersion && loadedVersion !== expected) return null;
  const uid = getUUID();
  const jwtToken = await getChatJwtToken(uid);
  if (!jwtToken) return null;
  localStorage.setItem(key, uid);
  const initConfig = {
    config: {
      type: 'bot',
      bot_id: cfg.botId,
      isIframe: false,
      botInfo: {
        parameters: {
          uid: uid,
        },
      },
    },
    componentProps: { title: cfg.title },
    userInfo: {
      id: uid,
      url: 'https://s3-gz01.didistatic.com/ese-feedback/LogicFlow/LF-Agent-user-emoji.png', // 用户头像URL
      nickname: `用户 ${uid}`,
    },
    auth: {
      type: 'token',
      token: jwtToken,
      onRefreshToken: async () => await getChatJwtToken(uid),
    },
    ui: {
      // 基础UI配置：应用图标、布局类型、语言及层级
      base: {
        icon: 'https://s3-gz01.didistatic.com/ese-feedback/LogicFlow/LF-Agent-Icon.png', // 应用图标URL
        layout: (function () {
          const ua = navigator.userAgent || '';
          const isMobileUA =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              ua,
            );
          const isSmall =
            typeof window !== 'undefined' && window.innerWidth <= 768;
          return isMobileUA || isSmall ? 'mobile' : 'pc';
        })(),
        lang: 'zh-CN', // 系统语言：'en'英文，'zh-CN'中文
        zIndex: 1000, // 聊天框层级
      },
      // 控制标题栏及关闭按钮显示
      header: {
        isShow: true, // 是否显示顶部标题栏
        isNeedClose: true, // 是否显示关闭按钮
      },
      // 控制右下角悬浮球显示
      asstBtn: {
        isNeed: true, // 展示悬浮球
      },
      // 底部文案配置（修复：补充linkvars和footer的闭合括号+逗号）
      footer: {
        isShow: true, // 是否显示底部版权模块
        expressionText: '注意清缓存会导致历史会话信息消失，请谨慎操作', // 底部显示的文本信息
      }, // 修复：补充footer的闭合括号
      // 会话列表配置：控制会话列表显示
      conversations: {
        isNeed: false, // 是否需要显示会话列表
      },
      // 聊天框核心配置
      chatBot: {
        title: 'LogicFlow 小助手', // 聊天框标题
        uploadable: false, // 是否支持文件上传
        width: 500, // PC端聊天框宽度（单位：px）
        isNeedAudio: false, // 是否支持语音功能
        isNeedFunctionCallMessage: true, // 是否显示工具调用消息
        isNeedAddNewConversation: true, // 是否支持新建会话
        isNeedQuote: false, // 是否支持消息引用
        // 消息评价
        feedback: {
          isNeedFeedback: true, // 是否开启消息评价
          feedbackPanel: {
            title: '方便的话请告诉我们回答还存在哪些问题', // 反馈卡片顶部的引导文本，用于解释反馈目的
            placeholder: '请填写具体的问题', // 反馈输入框提示文字
            tags: [
              // 反馈标签选项
              {
                label: '回复信息错误', // 标签文本
                isNeedDetail: true, // 是否需要详细说明
              },
              {
                label: '回复信息不足以解决我的问题', // 标签文本
                isNeedDetail: true, // 是否需要详细说明
              },
            ],
          },
        },
      },
    },
  };
  console.log('initConfig', initConfig);
  const client = new sdk.WebChatClient(initConfig);
  return client;
}

export default { setupWebChat, getWebchatConfig };
