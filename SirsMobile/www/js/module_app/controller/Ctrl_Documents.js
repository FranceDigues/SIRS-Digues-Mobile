angular.module('module_app.controllers.documents', [])

    .controller('cPorteDocument', function() {

        var self = this;

        self.tops = [
            { id: 1, label: 'Document 1', childCount: 4 },
            { id: 2, label: 'Document 2', childCount: 4 },
            { id: 3, label: 'Document 3', childCount: 4 },
            { id: 4, label: 'Document 4', childCount: 4 },
            { id: 5, label: 'Document 5', childCount: 4 },
            { id: 6, label: 'Document 6', childCount: 4 },
            { id: 7, label: 'Document 7', childCount: 4 },
            { id: 8, label: 'Document 8', childCount: 4 },
            { id: 9, label: 'Document 9', childCount: 4 }
        ];

        self.children = function() {
            return angular.copy(self.tops);
        };
    });