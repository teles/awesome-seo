import { IDataLoader } from '../interfaces';
import { Tool, AwesomeData } from '../types';

export class DataLoader implements IDataLoader {
  constructor(private readonly apiUrl: string = 'awesome.json') {}

  async loadData(): Promise<Tool[]> {
    try {
      const response = await fetch(this.apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: AwesomeData = await response.json();
      return data.tools || [];
    } catch (error) {
      console.error('Error loading data:', error);
      throw new Error('Failed to load data');
    }
  }
}
