import { DataLoader } from '../services/DataLoader';
import { AwesomeData } from '../types';

describe('DataLoader', () => {
  let dataLoader: DataLoader;
  const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    dataLoader = new DataLoader('test-url.json');
    jest.clearAllMocks();
  });

  it('should load data successfully', async () => {
    const mockData: AwesomeData = {
      title: 'Test',
      description: 'Test description',
      lastUpdated: '2023-01-01',
      totalTools: 2,
      categories: ['Category 1'],
      tools: [
        {
          name: 'Tool 1',
          url: 'https://example.com',
          description: 'Description 1',
          category: 'Category 1'
        },
        {
          name: 'Tool 2',
          url: 'https://example2.com',
          description: 'Description 2',
          category: 'Category 1'
        }
      ]
    };

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await dataLoader.loadData();

    expect(mockFetch).toHaveBeenCalledWith('test-url.json');
    expect(result).toEqual(mockData.tools);
  });

  it('should handle HTTP errors', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    await expect(dataLoader.loadData()).rejects.toThrow('Failed to load data');
  });

  it('should handle network errors', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    await expect(dataLoader.loadData()).rejects.toThrow('Failed to load data');
  });

  it('should return empty array when tools is undefined', async () => {
    const mockData = {
      title: 'Test',
      description: 'Test description',
      lastUpdated: '2023-01-01',
      totalTools: 0,
      categories: [],
      // tools property is missing
    };

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await dataLoader.loadData();

    expect(result).toEqual([]);
  });
});
