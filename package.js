var both = ['client', 'server'];

Package.describe({
    name: 'arch:db-butler',
    summary: 'Highly flexiable Relational database',
    version: '1.0.0',
    git: 'https://github.com/0a-/DB-Butler'
});

Package.onUse(function(api) {
    api.versionsFrom('1.0.5');
    api.use('mquandalle:harmony@1.3.79', both);
    api.use('mongo', both);
    api.addFiles('lib/someFunctionsThatHelp.next.js', both);
    api.addFiles('lib/DBOperations/readonlyOperations.js', both);
    api.addFiles('lib/DBOperations/mutableOperations.next.js', both);
    api.addFiles('lib/query.next.js', both);
    api.addFiles('lib/butlerObjects/ODM.next.js', both);
    api.addFiles('lib/butlerObjects/butlerCursor.next.js', both);
    api.addFiles('lib/butlerObjects/butlerDocument.next.js', both);
    api.addFiles('lib/butlerObjects/butlerCollection.next.js', both);
    api.addFiles('lib/butlerObjects/make.js', both);
    api.addFiles('lib/DBButler.next.js', both);
    api.addFiles('final.js', both);
    api.export('DBButler',both);
});

Package.onTest(function(api) {
    api.use('arch:db-butler');
    api.use('tinytest');
    api.addFiles('test/init.js',both);
    api.addFiles('test/basicDBOperations.js',both);
    api.addFiles('test/basicDBOperations2.js',both);
});
