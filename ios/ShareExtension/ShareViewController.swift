//
//  ShareViewController.swift
//  ShareExtension
//
//  Created by MShineRay on 2024/12/10.
//

import UIKit
import Social

class ShareViewController: SLComposeServiceViewController {

    override func isContentValid() -> Bool {
        // 验证内容
        return true
    }

    override func didSelectPost() {
        // 获取分享的内容
        if let contentText = self.contentText {
            // 将内容传递到主应用
            let userDefaults = UserDefaults(suiteName: "group.com.yourcompany.EDPClient") // 使用 App Group
            userDefaults?.set(contentText, forKey: "sharedContent")
            userDefaults?.synchronize()
        }
        
        // 完成请求
        self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
    }

    override func configurationItems() -> [Any]! {
        return []
    }
}
