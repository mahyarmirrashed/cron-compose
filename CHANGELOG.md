

## [1.2.1](https://github.com/mahyarmirrashed/cron-compose/compare/1.2.0...1.2.1) (2023-11-10)


### Bug Fixes

* remove version from being tag ([51e20b9](https://github.com/mahyarmirrashed/cron-compose/commit/51e20b9f0f84af803b8fa911bbee4ef7d4b1cd4f))

## [1.2.0](https://github.com/mahyarmirrashed/cron-compose/compare/1.1.0...1.2.0) (2023-11-09)


### Features

* add ability to intersect cron strings ([304b261](https://github.com/mahyarmirrashed/cron-compose/commit/304b261d3ed753e815d31ab772553cc18112ad4c))
* add chaining of human readable functions ([7dca75f](https://github.com/mahyarmirrashed/cron-compose/commit/7dca75fea269887c8c334308fd7b8e64b01895dd))
* export types needed for chainable function ([38489cd](https://github.com/mahyarmirrashed/cron-compose/commit/38489cd90bdaf7bba4991cf22a168add9f8ae514))


### Bug Fixes

* address case of wildcards in other base slot ([632b5d0](https://github.com/mahyarmirrashed/cron-compose/commit/632b5d01bb9eeb1a6cdc9fa6c20dcc623f5c5367))
* handle offset base slot cases ([c10ffec](https://github.com/mahyarmirrashed/cron-compose/commit/c10ffec64b8a54d131aeab2d6d74a3d76d720026))

## [1.1.0](https://github.com/mahyarmirrashed/cron-compose/compare/1.0.1...1.1.0) (2023-11-09)


### Features

* add ability to parse simple standard cron strings ([65ab731](https://github.com/mahyarmirrashed/cron-compose/commit/65ab7312ed7b8cf322c54345d7a37a567c9e0757))
* support multiple segments to the cron string ([8607968](https://github.com/mahyarmirrashed/cron-compose/commit/8607968e1fd1e8a0963b46ea9e36eda9ccad0e74))

## [1.0.1](https://github.com/mahyarmirrashed/cron-compose/compare/1.0.0...1.0.1) (2023-11-06)

## [1.0.0](https://github.com/mahyarmirrashed/cron-compose/compare/0.1.1...1.0.0) (2023-11-06)


### ⚠ BREAKING CHANGES

* make range methods upper bound inclusive

### Features

* make range methods upper bound inclusive ([5635ab5](https://github.com/mahyarmirrashed/cron-compose/commit/5635ab51638f1f45911adb5d92b56e2af6224a34))
* throw error if mapping is not valid ([abee6e0](https://github.com/mahyarmirrashed/cron-compose/commit/abee6e0b78be53f5fc946aa4a8d55d5d25945880))


### Bug Fixes

* assert that no conditional branching is possible when getting ([3daabbb](https://github.com/mahyarmirrashed/cron-compose/commit/3daabbb26a9cbb653d454586907036e8ed2237aa))
* consolidate offset base slot range correctly ([668fc5f](https://github.com/mahyarmirrashed/cron-compose/commit/668fc5febd4ffc4f58605e973ee797755a969e75))
* step should always be a number value not string ([d54c11d](https://github.com/mahyarmirrashed/cron-compose/commit/d54c11db331d4df86ffce2532e51360046f3741a))

## [0.1.1](https://github.com/mahyarmirrashed/cron-compose/compare/0.1.0...0.1.1) (2023-11-05)


### Performance Improvements

* do not include source in packaged output ([78629b7](https://github.com/mahyarmirrashed/cron-compose/commit/78629b76f88dc316de1082d03d092164601bd1a6))

# 0.1.0 (2023-11-05)


### Bug Fixes

* add base url ([0a9372a](https://github.com/mahyarmirrashed/cron-compose/commit/0a9372a324ded427f4c777d973c214adfcb25a29))
* add range start and end value check ([f5e568f](https://github.com/mahyarmirrashed/cron-compose/commit/f5e568fcc388b15f13955d22b4646cbc53a4e7ce))
* consider case where all values are selected ([24e3780](https://github.com/mahyarmirrashed/cron-compose/commit/24e3780c193737c10442fb2dd70ba4824c434f8b))
* default should be all enabled ([edf6698](https://github.com/mahyarmirrashed/cron-compose/commit/edf66981b4d37e1fdbafb0cf6c2dfe64147015f0))
* remove decrement on arguments ([12c055a](https://github.com/mahyarmirrashed/cron-compose/commit/12c055ab0aa082f129d4aeb30f8b87a0ea397b0b))
* select output directory for built files ([564eeed](https://github.com/mahyarmirrashed/cron-compose/commit/564eeed9cabdaa217cf0b4408c22712a18cb0ef0))


### Features

* add basic implementation of cron compose class ([1afbdeb](https://github.com/mahyarmirrashed/cron-compose/commit/1afbdeb8df81355dbef62b0154d9d7b5047c1e46))
* add basic layout of base cron slot ([796001e](https://github.com/mahyarmirrashed/cron-compose/commit/796001ed5305c217f0f3f87fb0a8544c03011166))
* add basic layout of project ([94a553c](https://github.com/mahyarmirrashed/cron-compose/commit/94a553cb2309e6f2450e61f7fd5b7f42d76dc32e))
* add bound validation on inputs ([267141e](https://github.com/mahyarmirrashed/cron-compose/commit/267141e1d8b88ce8880d8d3fb9e57b352d480f13))
* add class as default export ([6833e11](https://github.com/mahyarmirrashed/cron-compose/commit/6833e11bd4471966ecf00f463bd8702eba23d129))
* add freshness attribute ([6e97ee8](https://github.com/mahyarmirrashed/cron-compose/commit/6e97ee837251fb7daf47660d57ad1adc881b840e))
* add implementation for add and remove methods ([6c9f424](https://github.com/mahyarmirrashed/cron-compose/commit/6c9f424981db8b13d8a807d5a6c5cb347e6aa524))
* add implementation for clearing slot ([08f5c38](https://github.com/mahyarmirrashed/cron-compose/commit/08f5c38a929241cae3f1bcc95d12c9214573db28))
* add implementation for day of week slot ([0f9d0ae](https://github.com/mahyarmirrashed/cron-compose/commit/0f9d0ae6c2869ac213ba7f06c32bcc31b605606e))
* add implementation for day slot ([d2baba4](https://github.com/mahyarmirrashed/cron-compose/commit/d2baba4254749b7fca0a3bfce676d4653a3b8a09))
* add implementation for month slot ([f029a45](https://github.com/mahyarmirrashed/cron-compose/commit/f029a45a575a289752e903e2c6c8f04c2e706a6b))
* add implementation for second, minute, and hour slots ([dd97924](https://github.com/mahyarmirrashed/cron-compose/commit/dd979246b6da8075854ff0de8d98152c594bd782))
* add option to enable seconds in output cron string ([eae76b7](https://github.com/mahyarmirrashed/cron-compose/commit/eae76b761c76cd5af2ac7717ff1b460a298172ce))
* add to string method for cron composer ([c0d439e](https://github.com/mahyarmirrashed/cron-compose/commit/c0d439eb5d6a22db10327ad003c1355a7681770e))
* allow subclasses to define handled types ([6cf1c10](https://github.com/mahyarmirrashed/cron-compose/commit/6cf1c105402101001e72b9adc50787d86910279d))
* implement converting to string method ([a6863ed](https://github.com/mahyarmirrashed/cron-compose/commit/a6863ed5c39bb8164cabd79fc6e89c74f2503a00))
* make range upper bound exclusive ([4385588](https://github.com/mahyarmirrashed/cron-compose/commit/4385588c2f70d74b4a27ab2ac1fd519c2c81f27b))
* only export CronComposer and SlotType to users ([ee42895](https://github.com/mahyarmirrashed/cron-compose/commit/ee42895e83046aeae806e1cee154a7f89c49eb21))
* upgrade month slot implementation to handle strings ([95f6f96](https://github.com/mahyarmirrashed/cron-compose/commit/95f6f96bcfa9bb6019f240192f195dee0f0fff45))


### Performance Improvements

* remove redundant zero check against end value ([4a4fca1](https://github.com/mahyarmirrashed/cron-compose/commit/4a4fca13c4a734eae972b9cbc11aba12dad5de18))