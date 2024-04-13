//
//  BridgingModule.m
//  BoilerReactNativeApplication
//
//  Created by Lam Wun Yin on 13/4/2024.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(CameraModule, NSObject)
RCT_EXTERN_METHOD(start: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
@end
