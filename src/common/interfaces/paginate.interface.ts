export interface IPaginate {
  itemCount: number;
  /**
   * the total amount of items
   */
  totalItems?: number;
  /**
   * the amount of items that were requested per page
   */
  itemsPerPage: number;
  /**
   * the total amount of pages in this paginator
   */
  totalPages?: number;
  /**
   * the current page this paginator "points" to
   */
  currentPage: number;
}
