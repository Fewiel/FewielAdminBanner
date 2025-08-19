const { Component, State } = Shopware;
import template from './fewiel-admin-banner.html.twig';
import './fewiel-admin-banner.scss';

Component.register('fewiel-admin-banner', {
    template,

    data() {
        return {
            bannerText: '',
            backgroundColor: '#1a1a1a',
        };
    },

    created() {
        this.loadConfig();

        this.unregisterWatcher = this.$watch(
            () => {
                const store = State.get('systemConfig');
                return store ? store.values : {};
            },
            () => {
                this.applyConfigFromState();
            },
            { deep: true }
        );
    },

    beforeDestroy() {
        if (this.unregisterWatcher) {
            this.unregisterWatcher();
        }
    },

    methods: {
        async loadConfig() {
            const systemConfigApiService = Shopware.Service('systemConfigApiService');
            try {
                const values = await systemConfigApiService.getValues('FewielAdminBanner.config');
                const store = State.get('systemConfig');
                if (store) {
                    Object.entries(values).forEach(([key, val]) => {
                        State.commit('systemConfig/setValue', { key, value: val });
                    });
                }
                this.applyConfigFromState(values);
            } catch (e) {
                this.bannerText = '';
                this.backgroundColor = '#1a1a1a';
            }
        },

        applyConfigFromState(overrideValues = null) {
            const store = State.get('systemConfig');
            const values = overrideValues || (store ? store.values : {});
            this.bannerText = values['FewielAdminBanner.config.bannerText'] || '';
            this.backgroundColor = values['FewielAdminBanner.config.backgroundColor'] || '#1a1a1a';
        },

        computedTextColor(bg) {
            if (!bg) return '#fff';
            const c = bg.charAt(0) === '#' ? bg.substring(1, 7) : bg;
            const r = parseInt(c.substring(0, 2), 16);
            const g = parseInt(c.substring(2, 4), 16);
            const b = parseInt(c.substring(4, 6), 16);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            return luminance > 0.5 ? '#000' : '#fff';
        },
    },

    computed: {
        showBanner() {
            return !!this.bannerText;
        },
        bannerStyle() {
            const color = this.computedTextColor(this.backgroundColor);
            return {
                backgroundColor: this.backgroundColor,
                color,
            };
        },
    },
});
