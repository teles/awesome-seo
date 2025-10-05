import { 
  IDataLoader, 
  IClipboardService, 
  ICategoryExtractor 
} from './interfaces';
import { SearchFilter, CategoryFilter } from './filters';
import { SorterFactory } from './sorters';
import { Tool, AppState, SortBy } from './types';

export class AwesomeSEOApp {
  private state: AppState = {
    tools: [],
    searchQuery: '',
    selectedCategory: [],
    sortBy: 'name',
    loading: true
  };

  private searchFilter = new SearchFilter();
  private categoryFilter = new CategoryFilter();

  constructor(
    private readonly dataLoader: IDataLoader,
    private readonly clipboardService: IClipboardService,
    private readonly categoryExtractor: ICategoryExtractor
  ) {}

  async loadData(): Promise<void> {
    try {
      this.setState({ loading: true });
      const tools = await this.dataLoader.loadData();
      this.setState({ tools, loading: false });
    } catch (error) {
      console.error('Error loading data:', error);
      this.setState({ tools: [], loading: false });
      throw error;
    }
  }

  setSearchQuery(searchQuery: string): void {
    this.setState({ searchQuery });
  }

  setSelectedCategory(selectedCategory: string[]): void {
    this.setState({ selectedCategory });
  }

  setSortBy(sortBy: SortBy): void {
    this.setState({ sortBy });
  }

  clearFilters(): void {
    this.setState({
      searchQuery: '',
      selectedCategory: []
    });
  }

  getCategories(): string[] {
    return this.categoryExtractor.extractCategories(this.state.tools);
  }

  getFilteredTools(): Tool[] {
    if (!this.state.tools || this.state.tools.length === 0) {
      return [];
    }

    let filtered = [...this.state.tools];

    // Apply search filter
    filtered = this.searchFilter.filter(filtered, this.state.searchQuery);

    // Apply category filter
    filtered = this.categoryFilter.filter(filtered, this.state.selectedCategory);

    // Apply sorting
    const sorter = SorterFactory.createSorter(this.state.sortBy);
    filtered = sorter.sort(filtered);

    return filtered;
  }

  async copyToClipboard(text: string): Promise<void> {
    await this.clipboardService.copyToClipboard(text);
  }

  getState(): Readonly<AppState> {
    return { ...this.state };
  }

  private setState(partialState: Partial<AppState>): void {
    this.state = { ...this.state, ...partialState };
  }
}
