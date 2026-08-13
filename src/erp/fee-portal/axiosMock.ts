import { authFetch } from "@/services/erpApi";

class RealAxiosWrapper {
  private buildUrl(url: string, config?: any) {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000';
    let finalUrl = url.replace(serverUrl, '');
    
    if (config?.params) {
      const params = new URLSearchParams();
      for (const key in config.params) {
        if (config.params[key] !== undefined && config.params[key] !== null) {
           params.append(key, config.params[key]);
        }
      }
      const qs = params.toString();
      if (qs) {
        finalUrl += (finalUrl.includes('?') ? '&' : '?') + qs;
      }
    }
    return finalUrl;
  }

  async get(url: string, config?: any): Promise<any> {
    try {
      const res = await authFetch(this.buildUrl(url, config));
      return { data: await res.json() };
    } catch (err: any) {
      throw { response: { data: { message: err.message || "Request failed" } } };
    }
  }
  
  async post(url: string, data?: any, config?: any): Promise<any> {
    try {
      const res = await authFetch(this.buildUrl(url, config), {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return { data: await res.json() };
    } catch (err: any) {
      throw { response: { data: { message: err.message || "Request failed" } } };
    }
  }
  
  async put(url: string, data?: any, config?: any): Promise<any> {
    try {
      const res = await authFetch(this.buildUrl(url, config), {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      return { data: await res.json() };
    } catch (err: any) {
      throw { response: { data: { message: err.message || "Request failed" } } };
    }
  }
  
  async delete(url: string, config?: any): Promise<any> {
    try {
      const res = await authFetch(this.buildUrl(url, config), {
        method: 'DELETE'
      });
      return { data: await res.json() };
    } catch (err: any) {
      throw { response: { data: { message: err.message || "Request failed" } } };
    }
  }
}

const axios = new RealAxiosWrapper();
export default axios;
