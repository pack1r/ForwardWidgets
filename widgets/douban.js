// 豆瓣片单组件
WidgetMetadata = {
  id: "douban",
  title: "豆瓣",
  modules: [
    {
      title: "片单",
      requiresWebView: false,
      functionName: "loadCardItems",
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "input",
          description: "豆瓣片单地址",
          placeholders: [
            {
              title: "豆瓣 Top 250",
              value: "https://m.douban.com/subject_collection/movie_top250",
            },
            {
              title: "一周电影口碑榜",
              value:
                "https://m.douban.com/subject_collection/movie_weekly_best",
            },
            {
              title: "华语口碑剧集榜",
              value:
                "https://m.douban.com/subject_collection/tv_chinese_best_weekly",
            },
            {
              title: "全球口碑剧集榜",
              value:
                "https://m.douban.com/subject_collection/tv_global_best_weekly",
            },
            {
              title: "国内综艺口碑榜",
              value:
                "https://m.douban.com/subject_collection/show_chinese_best_weekly",
            },
            {
              title: "全球综艺口碑榜",
              value:
                "https://m.douban.com/subject_collection/show_global_best_weekly",
            },
            {
              title: "第97届奥斯卡",
              value:
                "https://m.douban.com/subject_collection/EC7I7ZDRA?type=rank",
            },
          ],
        },
        {
          name: "start",
          title: "开始",
          type: "count",
        },
        {
          name: "limit",
          title: "每页数量",
          type: "constant",
          value: "20",
        },
      ],
    },
    {
      title: "实时剧集榜",
      requiresWebView: false,
      functionName: "loadItemsFromApi",
      params: [
        {
          name: "start",
          title: "开始",
          type: "count",
        },
        {
          name: "limit",
          title: "每页数量",
          type: "constant",
          value: "20",
        },
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          value:
            "https://m.douban.com/rexxar/api/v2/subject_collection/tv_real_time_hotest/items",
        },
        {
          name: "type",
          title: "类型",
          type: "constant",
          value: "tv",
        },
      ],
    },
    {
      title: "实时电影榜",
      requiresWebView: false,
      functionName: "loadItemsFromApi",
      params: [
        {
          name: "start",
          title: "开始",
          type: "count",
        },
        {
          name: "limit",
          title: "每页数量",
          type: "constant",
          value: "20",
        },
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          value:
            "https://m.douban.com/rexxar/api/v2/subject_collection/movie_real_time_hotest/items",
        },
        {
          name: "type",
          title: "类型",
          type: "constant",
          value: "movie",
        },
      ],
    },
    {
      title: "电影推荐",
      requiresWebView: false,
      functionName: "loadRecommendMovies",
      params: [
        {
          name: "category",
          title: "分类",
          type: "enumeration",
          enumOptions: [
            {
              title: "全部",
              value: "all",
            },
            {
              title: "热门电影",
              value: "热门",
            },
            {
              title: "最新电影",
              value: "最新",
            },
            {
              title: "豆瓣高分",
              value: "豆瓣高分",
            },
            {
              title: "冷门佳片",
              value: "冷门佳片",
            },
          ],
        },
        {
          name: "type",
          title: "类型",
          type: "enumeration",
          belongTo: {
            paramName: "category",
            value: ["热门", "最新", "豆瓣高分", "冷门佳片"],
          },
          enumOptions: [
            {
              title: "全部",
              value: "全部",
            },
            {
              title: "华语",
              value: "华语",
            },
            {
              title: "欧美",
              value: "欧美",
            },
            {
              title: "韩国",
              value: "韩国",
            },
            {
              title: "日本",
              value: "日本",
            },
          ],
        },
        {
          name: "start",
          title: "开始",
          type: "count",
        },
        {
          name: "limit",
          title: "每页数量",
          type: "constant",
          value: "20",
        },
      ],
    },
    {
      title: "剧集推荐",
      requiresWebView: false,
      functionName: "loadRecommendShows",
      params: [
        {
          name: "category",
          title: "分类",
          type: "enumeration",
          enumOptions: [
            {
              title: "全部",
              value: "all",
            },
            {
              title: "热门剧集",
              value: "tv",
            },
            {
              title: "热门综艺",
              value: "show",
            },
          ],
        },
        {
          name: "type",
          title: "类型",
          type: "enumeration",
          belongTo: {
            paramName: "category",
            value: ["tv"],
          },
          enumOptions: [
            {
              title: "综合",
              value: "tv",
            },
            {
              title: "国产剧",
              value: "tv_domestic",
            },
            {
              title: "欧美剧",
              value: "tv_american",
            },
            {
              title: "日剧",
              value: "tv_japanese",
            },
            {
              title: "韩剧",
              value: "tv_korean",
            },
            {
              title: "动画",
              value: "tv_animation",
            },
            {
              title: "纪录片",
              value: "tv_documentary",
            },
          ],
        },
        {
          name: "type",
          title: "类型",
          type: "enumeration",
          belongTo: {
            paramName: "category",
            value: ["show"],
          },
          enumOptions: [
            {
              title: "综合",
              value: "show",
            },
            {
              title: "国内",
              value: "show_domestic",
            },
            {
              title: "国外",
              value: "show_foreign",
            },
          ],
        },
        {
          name: "start",
          title: "开始",
          type: "count",
        },
        {
          name: "limit",
          title: "每页数量",
          type: "constant",
          value: "20",
        },
      ],
    },
  ],
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "解析豆瓣片单，获取视频信息",
  author: "pack1r",
  site: "https://github.com/pack1r/ForwardWidgets"
};
// 解析豆瓣片单
async function loadCardItems(params = {}) {
  try {
    console.log("开始解析豆瓣片单...");
    console.log("参数:", params);
    // 获取片单 URL
    const url = params.url;
    if (!url) {
      console.error("缺少片单 URL");
      throw new Error("缺少片单 URL");
    }
    // 验证 URL 格式
    if (url.includes("douban.com/doulist/")) {
      return loadDefaultList(params);
    } else if (url.includes("douban.com/subject_collection/")) {
      return loadSubjectCollection(params);
    }
  } catch (error) {
    console.error("解析豆瓣片单失败:", error);
    throw error;
  }
}

async function loadDefaultList(params = {}) {
  const url = params.url;
  // 提取片单 ID
  const listId = url.match(/doulist\/(\d+)/)?.[1];
  console.debug("片单 ID:", listId);
  if (!listId) {
    console.error("无法获取片单 ID");
    throw new Error("无法获取片单 ID");
  }

  const start = params.start || 0;
  const limit = params.limit || 20;
  //        // 构建片单页面 URL
  const pageUrl = `https://www.douban.com/doulist/${listId}/?start=${start}&limit=${limit}`;

  console.log("请求片单页面:", pageUrl);
  // 发送请求获取片单页面
  const response = await Widget.http.get(pageUrl, {
    headers: {
      Referer: `https://movie.douban.com/explore`,
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });

  if (!response || !response.data) {
    throw new Error("获取片单数据失败");
  }

  console.log("片单页面数据长度:", response.data.length);
  console.log("开始解析");

  // 解析 HTML 得到文档 ID
  const docId = Widget.dom.parse(response.data);
  if (docId < 0) {
    throw new Error("解析 HTML 失败");
  }
  console.log("解析成功:", docId);

  //        // 获取所有视频项，得到元素ID数组
  const videoElementIds = Widget.dom.select(docId, ".doulist-item .title a");

  console.log("items:", videoElementIds);

  let doubanIds = [];
  for (const itemId of videoElementIds) {
    const link = await Widget.dom.attr(itemId, "href");
    const id = link.match(/subject\/(\d+)/)?.[1];
    if (id) {
      doubanIds.push({ id: id, type: "douban" });
    }
  }

  return doubanIds;
}

async function loadItemsFromApi(params = {}) {
  const url = params.url;
  console.log("请求 API 页面:", url);
  const listId = params.url.match(/subject_collection\/(\w+)/)?.[1];
  const response = await Widget.http.get(url, {
    headers: {
      Referer: `https://m.douban.com/subject_collection/${listId}/`,
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });

  console.log("请求结果:", response.data);
  if (response.data && response.data.subject_collection_items) {
    const items = response.data.subject_collection_items;
    const doubanIds = items.map((item) => ({
      id: item.id,
      type: "douban",
    }));
    return doubanIds;
  }
  return [];
}

async function loadSubjectCollection(params = {}) {
  const listId = params.url.match(/subject_collection\/(\w+)/)?.[1];
  console.debug("合集 ID:", listId);
  if (!listId) {
    console.error("无法获取合集 ID");
    throw new Error("无法获取合集 ID");
  }

  const start = params.start || 0;
  const limit = params.limit || 20;
  let pageUrl = `https://m.douban.com/rexxar/api/v2/subject_collection/${listId}/items?start=${start}&count=${limit}&updated_at&items_only=1&type_tag&for_mobile=1`;
  if (params.type) {
    pageUrl += `&type=${params.type}`;
  }
  params.url = pageUrl;
  return await loadItemsFromApi(params);
}

async function loadRecommendMovies(params = {}) {
  return await loadRecommendItems(params, "movie");
}

async function loadRecommendShows(params = {}) {
  return await loadRecommendItems(params, "tv");
}

async function loadRecommendItems(params = {}, type = "movie") {
  const start = params.start || 0;
  const limit = params.limit || 20;
  const category = params.category || "";
  const categoryType = params.type || "";
  let url = `https://m.douban.com/rexxar/api/v2/subject/recent_hot/${type}?start=${start}&limit=${limit}&category=${category}&type=${categoryType}`;
  if (category == "all") {
    url = `https://m.douban.com/rexxar/api/v2/${type}/recommend?refresh=0&start=${start}&count=${limit}&selected_categories=%7B%7D&uncollect=false&score_range=0,10&tags=`;
  }
  const response = await Widget.http.get(url, {
    headers: {
      Referer: `https://movie.douban.com/${type}`,
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });

  console.log("请求结果:", response.data);
  if (response.data && response.data.items) {
    const items = response.data.items;
    const doubanIds = items.filter((item) => item.id != null).map((item) => ({
      id: item.id,
      type: "douban",
    }));
    return doubanIds;
  }
  return [];
}
