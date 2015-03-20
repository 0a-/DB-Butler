var both = ['client', 'server'];

Package.describe({
    name: 'arch:db-butler',
    summary: 'Highly flexiable Relational database',
    version: '1.0.0',
    git: 'https://github.com/0a-/DB-Butler'
});

Package.onUse(function(api) {
    api.versionsFrom('1.0.4.1');
    api.use('mquandalle:harmony@1.3.79', both);
    api.addFiles('lib/some_functions_that_help.js', both);
    api.addFiles('lib/db_operations_mutable.js', both);
    api.addFiles('lib/db_operations_readonly.js', both);
    api.addFiles('lib/query.js', both);
    api.addFiles('lib/x_to_many.next.js', both);
    api.addFiles('lib/db_butler.next.js', both);
    api.addFiles('lib/export.js', both);
    api.export('DB_Butler',both);
});

Package.onTest(function(api) {
    api.use('arch:db-butler');
    api.use('tinytest');
    api.addFiles('test/basic.js',both);
});