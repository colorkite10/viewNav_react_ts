export interface Page {
  id: number;
  name: string;
  contents: string;
}

export type Pages = Page[];

export interface StoredPagesInfo {
  currentPage: Page;
  storedPreviousPages: Pages;
}
