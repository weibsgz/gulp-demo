;
(function (win, doc) {
    var servicePath = "//www.xcar.com.cn"

    var api = {
        get: function (url, data, baseUrl) {
            return this.send("get", url, data, baseUrl);
        },
        post: function (url, data, baseUrl) {
            return this.send("post", url, data, baseUrl);
        },
        send: function (type, url, data, baseUrl) {
            if (!data) data = {}; //兼容IE8
            var dtd = $.Deferred();
            var baseUrl = baseUrl ? baseUrl : servicePath;
            $.ajax({
                url: baseUrl + url,
                type: type,
                data: data,
                cache: false,
                timeout: 30000

            }).then(function (data) {
                data = JSON.parse(data)
                if (data.code == 0) {
                    dtd.resolve(data);
                } else {
                    dtd.reject(data);
                }
            }, function (error) {
                console.log("请求接口失败");
                dtd.reject(error);
            });
            return dtd.promise();
        },
        //截取URL ？ 后边的内容 传入key 取得VALUE
        getUrlParams: function (str) {
            var url = window.location.href;
            url = url.split("?")[1]
            if (url) {
                var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)", "i");
                var r = url.match(reg);
                if (r != null) return unescape(r[2]);
            }
        },

    };   
    win.api = api;
    win.utils = {};
    /* 获取cookie */

    win.utils.setCookie = function (name, value, expires, path, domain, secure) {

        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += ";expires=" + expires.toGMTString();
        }
        if (typeof expires == "number") {
            var cookieTime = new Date();
            cookieTime.setTime(cookieTime.getTime() + expires * 1000);
            cookieText += ";expires=" + cookieTime;
        }
        if (path) {
            cookieText += ";path=" + path;
        }
        if (domain) {
            cookieText += ";domain=" + domain;
        }
        if (secure) {
            cookieText += ";secure";
        }
        document.cookie = cookieText;
    }

    win.utils.getCookie = function (name) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    }

  
})(window, document);