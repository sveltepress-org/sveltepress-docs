import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import rehypeRaw from "rehype-raw";

const rehypeRawOptions = {
  passThrough: [
    "mdxjsEsm",
    "mdxJsxTextElement",
    "mdxJsxFlowElement",
    "mdxFlowExpression",
  ],
};

const config: Config = {
  title: "SveltePress",
  tagline: "Supercharge Svelte with SveltePress",
  favicon: "img/lemon.png",

  // Set the production url of your site here
  url: "https://sveltepress.org",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/docs",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "sveltepress-org", // Usually your GitHub org/user name.
  projectName: "sveltepress", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/sveltepress-org/sveltepress-docs",
          rehypePlugins: [[rehypeRaw, rehypeRawOptions]],
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
    [
      "docusaurus-preset-shiki-twoslash",
      {
        themes: ["github-light", "github-dark"],
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
    },
    // Replace with your project's social card
    image: "img/social-card.png",
    navbar: {
      title: "SveltePress",
      logo: {
        alt: "SveltePress Logo",
        src: "img/lemon.png",
        href: "https://sveltepress.org",
        target: "_self",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "right",
          label: "Docs",
        },
        {
          href: "https://sveltepress.org/signin",
          label: "Sign in",
          position: "right",
          target: "_self",
        },
        {
          href: "https://sveltepress.org/signin",
          label: "Get started",
          position: "right",
          target: "_self",
        },
        // {
        //   href: "https://github.com/sveltepress-org/sveltepress",
        //   label: "GitHub",
        //   position: "right",
        // },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "/docs",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/sveltepress",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/sveltepress",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/TrySveltePress",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/sveltepress-org/sveltepress",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SveltePress`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
