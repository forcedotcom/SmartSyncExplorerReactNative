//
//  FirstTest.m
//  SmartSyncExplorerReactNative
//
//  Created by Ivan Bogdanov on 12/15/16.
//  Copyright © 2016 SalesforceSamples. All rights reserved.
//

#import <UIKit/UIKit.h>

#import <XCTest/XCTest.h>
#import <RCTTest/RCTTestRunner.h>


#define RCT_TEST(name)                  \
- (void)test##name                      \
{                                       \
[_runner runTest:_cmd module:@#name]; \
}



@interface FirstTest : XCTestCase

@end

@implementation FirstTest
{
  RCTTestRunner *_runner;
}


- (void)setUp {
    [super setUp];
  _runner = RCTInitRunnerForApp(@"IntegrationTests/IntegrationTestsApp", nil);

    // Put setup code here. This method is called before the invocation of each test method in the class.
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (void)testExample {
  XCTAssertNotNil(@"A");
    // This is an example of a functional test case.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
}

- (void)testPerformanceExample {
    // This is an example of a performance test case.
    [self measureBlock:^{
        // Put the code you want to measure the time of here.
    }];
}

#pragma mark - Test harness

- (void)testTheTester_waitOneFrame
{
  [_runner runTest:_cmd
            module:@"IntegrationTestHarnessTest"
      initialProps:@{@"waitOneFrame": @YES}
configurationBlock:nil];
}

- (void)testTheTester_ExpectError
{
  [_runner runTest:_cmd
            module:@"IntegrationTestHarnessTest"
      initialProps:@{@"shouldThrow": @YES}
configurationBlock:nil
  expectErrorRegex:@"because shouldThrow"];
}


#pragma mark - JS tests

// This list should be kept in sync with IntegrationTestsApp.js
RCT_TEST(IntegrationTestHarnessTest)

@end
