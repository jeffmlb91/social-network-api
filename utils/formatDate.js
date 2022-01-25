const formatDate = require('../utils');

module.exports = {
    formatDate(date) {
        return format(date, 'MMM d, yyyy')
    }
}