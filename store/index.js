import { resolveLang } from "~/utils/lang";

export const state = () => ({
  menuVisible: false,
  alternate_langs: [],
  isDropdownLoading: false,
  socialLinks: [],
  links: [
    {
      element: "nuxt-link",
      attributes: { to: "/projects" },
      title: "navbar.projects",
      dropdown: "categories",
      children: []
    },
    {
      element: "nuxt-link",
      attributes: { to: "/services" },
      title: "navbar.services",
      dropdown: "services",
      children: []
    },
    {
      element: "nuxt-link",
      attributes: { to: "/clients" },
      title: "navbar.clients"
    },
    {
      element: "nuxt-link",
      attributes: { to: "/about-us" },
      title: "navbar.about"
    },
    {
      element: "nuxt-link",
      attributes: { to: "/contact" },
      title: "navbar.contact"
    }
  ]
});

export const mutations = {
  TRIGGER_MENU(state) {
    state.menuVisible = !state.menuVisible;
  },
  CLOSE_MENU(state) {
    state.menuVisible = false;
  },
  SET_ALTERNATE_LANGS(state, payload) {
    state.alternate_langs = payload;
  },
  SET_SOCIAL_LINKS(state, payload) {
    state.socialLinks = payload;
  },
  UPDATE_MENU_LINKS(state, { services, categories }) {
    if (services) {
      const serviceIndex = state.links.findIndex(
        el => el.dropdown === "services"
      );

      state.links[serviceIndex].children = services;
    }

    if (categories) {
      const categoryIndex = state.links.findIndex(
        el => el.dropdown === "categories"
      );

      state.links[categoryIndex].children = categories;
    }
  }
};

export const actions = {
  async getSocialLinks({ commit }) {
    const locale = $nuxt.$i18n.locale;
    const lang = resolveLang(locale);

    const document = await this.$prismic.api.query(
      this.$prismic.predicates.at("document.type", "social_links"),
      { lang }
    );

    commit("SET_SOCIAL_LINKS", document.results);
  }
};
