import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
  ],
  
  afterBody: [
  Component.Graph(),
  Component.Comments({
    provider: 'giscus',
    options: {
      // from data-repo
      repo: "AulysV/biblio",
      // from data-repo-id
      repoId: "R_kgDOMdgVTg",
      // from data-category
      category: 'Announcements',
      // from data-category-id
      categoryId: "DIC_kwDOMdgVTs4ChdMq",
    }
  }),

  ],
  footer: Component.Footer({
    links: {
      GitHub : "https://github.com/AulysV?tab=repositories",
      Site : "https://www.aulysv.fr/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {

  beforeBody: [
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.Backlinks(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.RecentNotes()),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {

  beforeBody: [
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.Backlinks(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  // Remove the 'afterBody' property
  right: [
    Component.DesktopOnly(Component.RecentNotes()),
  ],
}
