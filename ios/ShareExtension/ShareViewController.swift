//
//  ShareViewController.swift
//  ShareExtension
//
//  Created by MShineRay on 2024/12/9.
//

import UIKit
import Social
import MobileCoreServices

class ShareViewController: SLComposeServiceViewController {

    override func isContentValid() -> Bool {
        // Do validation of contentText and/or NSExtensionContext attachments here
        return true
    }

    override func didSelectPost() {
        print("didSelectPost started")
        
        if let extensionItem = extensionContext?.inputItems.first as? NSExtensionItem,
           let itemProvider = extensionItem.attachments?.first {
            print("Found attachment")
            
            let urlTypeIdentifier = kUTTypeURL as String
            let textTypeIdentifier = kUTTypePlainText as String
            
            // 先尝试获取URL
            if itemProvider.hasItemConformingToTypeIdentifier(urlTypeIdentifier) {
                itemProvider.loadItem(forTypeIdentifier: urlTypeIdentifier, options: nil) { [weak self] (url, error) in
                    if let shareURL = url as? URL {
                        self?.handleSharedURL(shareURL)
                        return
                    }
                }
            }
            // 如果没有URL，尝试获取文本
            else if itemProvider.hasItemConformingToTypeIdentifier(textTypeIdentifier) {
                itemProvider.loadItem(forTypeIdentifier: textTypeIdentifier, options: nil) { [weak self] (text, error) in
                    if let sharedText = text as? String {
                        self?.handleSharedText(sharedText)
                        return
                    }
                }
            }
        }
        
        // 不要在这里调用completeRequest，而是在处理完成后调用
    }

    override func configurationItems() -> [Any]! {
        // To add configuration options via table cells at the bottom of the sheet, return an array of SLComposeSheetConfigurationItem here.
        return []
    }
    
    func handleSharedURL(_ url: URL) {
        print("handleSharedURL: \(url)")
        let urlString = url.absoluteString
        let appURL = URL(string: "edpclient://share?url=\(urlString.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? "")")!
        print("Constructed appURL: \(appURL)")
        
        // 先完成分享扩展的请求，然后打开主应用
        self.extensionContext?.completeRequest(returningItems: [], completionHandler: { _ in
            DispatchQueue.main.async {
                var responder = self as UIResponder?
                let selector = sel_registerName("openURL:")
                while responder != nil {
                    if responder?.responds(to: selector) == true {
                        responder?.perform(selector, with: appURL)
                        break
                    }
                    responder = responder?.next
                }
            }
        })
    }
    
    func handleSharedText(_ text: String) {
        print("handleSharedText: \(text)")
        let appURL = URL(string: "edpclient://share?text=\(text.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? "")")!
        print("Constructed appURL: \(appURL)")
        
        // 先完成分享扩展的请求，然后打开主应用
        self.extensionContext?.completeRequest(returningItems: [], completionHandler: { _ in
            DispatchQueue.main.async {
                var responder = self as UIResponder?
                let selector = sel_registerName("openURL:")
                while responder != nil {
                    if responder?.responds(to: selector) == true {
                        responder?.perform(selector, with: appURL)
                        break
                    }
                    responder = responder?.next
                }
            }
        })
    }
}
