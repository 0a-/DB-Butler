var both = ['client', 'server'];

Package.describe({
    name: 'arch:db-butler',
    summary: 'Highly flexiable Relational database',
    version: '1.0.0',
    git: 'https://github.com/0a-/DB-Butler'
});

Package.onUse(function(api) {
    api.versionsFrom('1.0.4.1');
    api.use('mquandalle:harmony');
    api.addFiles('lib/some_functions_that_help.js', both);
    api.addFiles('lib/db_operations.js', both);
    api.addFiles('lib/query.js', both);
    api.addFiles('lib/virtual_object.js', both);
    api.addFiles('lib/x_to_many.js', both);
    api.addFiles('lib/db_bulter.js', both);
    api.export('DB_Bulter',both);
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('arch:db-butler');
    api.addFiles('test/basic_tests.js',both);
    api.addFiles('test/advanced_tests.js',both);
});