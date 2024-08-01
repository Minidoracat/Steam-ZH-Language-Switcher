// ==UserScript==
// @name         Steam 繁體中文轉簡體中文
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  自動將 Steam 頁面從繁體中文轉換為簡體中文，並提供選項讓使用者選擇是否開啟自動跳轉。此插件由 Minidoracat 開發，用於解決繁體中文系統在瀏覽 Steam 商店時遇到的語言問題。更多信息請參閱作者的 Discord。
// @description:zh-CN 自动将 Steam 页面从繁体中文转换为简体中文，并提供选项让用户选择是否开启自动跳转。此插件由 Minidoracat 开发，用于解决繁体中文系统在浏览 Steam 商店时遇到的语言问题。更多信息请参阅作者的 Discord。
// @author       Minidoracat
// @match        *://store.steampowered.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @homepageURL  https://github.com/Minidoracat/Steam-ZH-Language-Switcher
// @supportURL   https://discord.gg/Gur2V67
// ==/UserScript==

(function() {
    'use strict';

    const discordUrl = 'https://discord.gg/Gur2V67';

    // 在右上角工具欄附近增加一個切換語言的按鈕
    function addSwitchButton() {
        let buttonContainer = document.createElement('div');
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.top = '10px';
        buttonContainer.style.right = '10px';
        buttonContainer.style.zIndex = '9999';

        let switchButton = document.createElement('button');
        switchButton.style.backgroundColor = '#1b2838'; // 深藍色背景
        switchButton.style.color = '#c6d4df'; // 淺灰色文字
        switchButton.style.border = '1px solid #4a90e2'; // 藍色邊框
        switchButton.style.padding = '10px';
        switchButton.style.cursor = 'pointer';
        switchButton.style.fontSize = '14px';
        switchButton.style.fontWeight = 'bold';
        switchButton.style.borderRadius = '5px'; // 圓角邊框

        let url = new URL(window.location.href);
        if (url.searchParams.get('l') === 'schinese') {
            switchButton.innerHTML = '切換到繁體中文';
            switchButton.onclick = function() {
                url.searchParams.set('l', 'tchinese');
                window.location.href = url.href;
            };
        } else {
            switchButton.innerHTML = '切換到簡體中文';
            switchButton.onclick = function() {
                url.searchParams.set('l', 'schinese');
                window.location.href = url.href;
            };
        }

        buttonContainer.appendChild(switchButton);
        document.body.appendChild(buttonContainer);
    }

    addSwitchButton();

    // 註冊選單命令
    GM_registerMenuCommand('切換到簡體中文', switchToSimplifiedChinese);
    GM_registerMenuCommand('開啟自動跳轉到簡體中文', enableAutoSwitch, 'a');
    GM_registerMenuCommand('關閉自動跳轉到簡體中文', disableAutoSwitch, 'b');
    GM_registerMenuCommand('加入作者 Discord', joinDiscord);

    // 檢查是否開啟自動跳轉
    if (GM_getValue('autoSwitchToChinese', false)) {
        autoSwitch();
    }

    function switchToSimplifiedChinese() {
        let url = new URL(window.location.href);
        url.searchParams.set('l', 'schinese');
        window.location.href = url.href;
    }

    function enableAutoSwitch() {
        GM_setValue('autoSwitchToChinese', true);
        autoSwitch();
        alert('自動跳轉到簡體中文已啟用');
    }

    function disableAutoSwitch() {
        GM_setValue('autoSwitchToChinese', false);
        alert('自動跳轉到簡體中文已停用');
    }

    function autoSwitch() {
        let url = new URL(window.location.href);
        if (url.searchParams.get('l') !== 'schinese') {
            url.searchParams.set('l', 'schinese');
            window.location.href = url.href;
        }
    }

    function joinDiscord() {
        window.open(discordUrl, '_blank');
    }
})();
