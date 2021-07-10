export const state = () => ({
  menuVisible: false,
  alternate_langs: [],
  isDropdownLoading: false,
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
