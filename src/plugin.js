const { WebPlugin } = require('@capacitor/core');

class CapacitorBadgePluginWeb extends WebPlugin {
    async setBadgeCount(count) {
        console.log('Setting badge count:', count);
    }
}

module.exports = { CapacitorBadgePluginWeb };
