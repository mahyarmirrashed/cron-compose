

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