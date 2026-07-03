class MockAxios {
  private generateMockData(url: string, method: string) {
    if (url.includes('/api/erp/fee-automation/status')) {
      return { success: true, isRunning: false };
    }
    if (url.includes('/api/erp/fee-automation/settings')) {
      return { success: true, settings: { isEnabled: false, startDay: 1, windowDays: 3 } };
    }
    if (url.includes('/api/erp/fee-automation/logs')) {
      return { success: true, logs: [] };
    }
    if (url.includes('/api/erp/classes/monthly-fees')) {
      return { success: true, fees: [] };
    }
    if (url.includes('/api/erp/classes/fees')) {
      return { success: true, fees: [] };
    }
    if (url.includes('/api/erp/classes')) {
      return { success: true, classes: [
        { className: 'Class 1' }, { className: 'Class 2' }, { className: 'Class 3' }
      ] };
    }
    if (url.includes('/api/erp/stations')) {
      return { success: true, stations: [] };
    }
    if (url.includes('/api/erp/fees/stats')) {
      return { success: true, totalCollected: 0, pendingDues: 0, collectedThisMonth: 0, pendingThisMonth: 0 };
    }
    if (url.includes('/api/erp/students') && !url.includes('/fees')) {
      return { success: true, students: [] };
    }
    if (url.includes('/fees') && url.includes('/students/')) {
      return { success: true, student: { feeStructures: [] } };
    }
    if (url.includes('/api/fees/list')) {
      return { success: true, feeStructures: [] };
    }
    return { success: true };
  }

  async get(url: string, config?: any): Promise<any> {
    return { data: this.generateMockData(url, 'GET') };
  }
  async post(url: string, data?: any, config?: any): Promise<any> {
    return { data: { success: true, message: "Mocked POST successful" } };
  }
  async put(url: string, data?: any, config?: any): Promise<any> {
    return { data: { success: true, message: "Mocked PUT successful" } };
  }
  async delete(url: string, config?: any): Promise<any> {
    return { data: { success: true, message: "Mocked DELETE successful" } };
  }
}

const axios = new MockAxios();
export default axios;
