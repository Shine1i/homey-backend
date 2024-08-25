import {HttpsProxyAgent} from "https-proxy-agent";
import type {Scraper} from "../types";
import type {HomeQResult, ObjectAd} from "./types";
// import nodeFetch, { type RequestInfo, type RequestInit, Response } from "node-fetch";
// import { HttpsProxyAgent } from "https-proxy-agent";
function countDuplicates(strings: string[]): Map<string, number> {
    const countMap = new Map<string, number>();
    
    for (const str of strings) {
        if (countMap.has(str)) {
            countMap.set(str, countMap.get(str)! + 1);
        } else {
            countMap.set(str, 1);
        }
    }
    
    return countMap;
}

export class HomeQScraper implements Scraper<HomeQResult> {
    // proxies = ["104.207.56.136:3128", "104.207.44.136:3128", "104.207.52.56:3128", "104.207.36.58:3128", "104.207.55.148:3128", "104.207.53.136:3128", "104.167.28.38:3128", "104.207.53.191:3128", "104.167.26.237:3128", "104.167.26.91:3128", "104.207.35.167:3128", "104.207.38.59:3128", "104.207.58.70:3128", "104.167.31.116:3128", "104.167.26.57:3128", "104.167.28.128:3128", "104.207.45.206:3128", "104.207.42.138:3128", "104.167.24.134:3128", "104.207.34.16:3128", "104.207.58.130:3128", "104.167.24.220:3128", "104.207.39.96:3128", "104.167.25.148:3128", "104.207.43.182:3128", "104.167.30.178:3128", "104.207.34.95:3128", "104.207.51.204:3128", "104.167.26.172:3128", "104.207.43.24:3128", "104.207.63.181:3128", "104.207.51.133:3128", "104.207.37.235:3128", "104.207.39.57:3128", "104.207.62.123:3128", "104.207.45.85:3128", "104.207.43.106:3128", "104.207.39.149:3128", "104.207.42.255:3128", "104.207.51.216:3128", "104.167.24.179:3128", "104.167.30.226:3128", "104.167.28.23:3128", "104.207.45.64:3128", "104.167.26.40:3128", "104.167.27.36:3128", "104.207.43.215:3128", "104.167.29.183:3128", "104.207.61.55:3128", "104.207.63.110:3128", "104.167.27.227:3128", "104.207.48.112:3128", "104.207.56.137:3128", "104.207.37.115:3128", "104.207.61.107:3128", "104.167.24.154:3128", "104.207.32.66:3128", "104.207.45.126:3128", "104.207.58.117:3128", "104.207.52.124:3128", "104.207.52.79:3128", "104.207.52.49:3128", "104.167.31.173:3128", "104.207.55.183:3128", "104.207.42.251:3128", "104.207.32.92:3128", "104.207.40.145:3128", "104.167.29.149:3128", "104.167.27.94:3128", "104.207.39.88:3128", "104.167.29.17:3128", "104.207.61.220:3128", "104.207.37.211:3128", "104.207.47.222:3128", "104.207.62.191:3128", "104.207.46.57:3128", "104.207.41.231:3128", "104.167.28.151:3128", "104.207.33.150:3128", "104.207.54.211:3128", "104.207.50.212:3128", "104.167.30.254:3128", "104.207.59.211:3128", "104.207.51.179:3128", "104.207.38.196:3128", "104.207.56.180:3128", "104.207.37.154:3128", "104.207.55.89:3128", "104.207.36.174:3128", "104.207.46.140:3128", "104.167.29.217:3128", "104.207.48.5:3128", "104.207.57.81:3128", "104.167.31.121:3128", "104.207.63.210:3128", "104.207.63.219:3128", "104.207.56.142:3128", "104.207.56.134:3128", "104.207.42.55:3128", "104.207.48.104:3128"];
    
    // proxyUsage: Map<string, number> = new Map(this.proxies.map(proxy => [proxy, 0]));
    
    async search(): Promise<HomeQResult> {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        
        const getResponse = async (is_early_access: boolean) => {
            await delay(1000);
            return this.fetch('https://search.homeq.se/api/v3/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({is_early_access}),
            });
        }
        
        const responses = [getResponse(false)];
        const results = await Promise.all(responses);
        
        const final: HomeQResult = {
            results: [],
            total_hits: 0
        };
        for (const response of results) {
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }
            const data: HomeQResult = await response.json() as any;
            final.results.push(...data.results);
            console.log("total_hits: ", data.total_hits);
            final.total_hits += data.total_hits;
        }
        
        await delay(3500);
        
        const ids = final.results.map(result => result.references.object_ad).filter(id => id != undefined);
        const chunkedIds = this.chunkArray(ids, 50);
        
        for (const chunk of chunkedIds) {
            await Promise.all(chunk.map(async (id) => {
                const objectAd = await this.withRetry(() => this.getInfo(id as number), 3, 200);
                if (objectAd) {
                    final.results.find(result => result.references.object_ad === id)!.object_ad = objectAd;
                }
            }));
        }
        
        return final;
    }
    
    async fetch(url: URL | RequestInfo, init?: RequestInit): Promise<Response> {
        const proxySuffix = ['-country-se', '-country-us', '-country-dk', '-country-no'];
        const suffix = proxySuffix[Math.floor(Math.random() * proxySuffix.length)];
        const proxyUrl = `http://38b6vb27hs9hkk7${suffix}:w37o693rmcse0kw@rp.proxyscrape.com:6060`;
        
        
        return fetch(url, {
            ...init,
            tls: {rejectUnauthorized: false},
            proxy: proxyUrl
        });
        
    }
    
    async getInfo(id: number): Promise<ObjectAd | undefined> {
        
        
        const response = await this.fetch(`https://api.homeq.se/api/v1/object/${id}`);
        
        
        if (!response.ok) {
            console.log(`Failed to fetch data: ${response.statusText}`);
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        console.log("response: was ok");
        return await response.json() as ObjectAd;
    }
    
    chunkArray<T>(array: T[], size: number): T[][] {
        const chunkedArray: T[][] = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    }
    
    async withRetry<T>(fn: () => Promise<T>, maxAttempts: number = 3, delay: number = 1500): Promise<T | undefined> {
        let attempt = 1;
        while (attempt <= maxAttempts) {
            try {
                return await fn();
            } catch (error) {
                if (attempt === maxAttempts) throw error;
                console.log(`Attempt ${attempt} failed, retrying after ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                attempt++;
            }
        }
        return undefined;
    }
    
    // private getLeastUsedProxy(): string {
    //     let leastUsedProxy = this.proxies[0];
    //     let minUsage = this.proxyUsage.get(leastUsedProxy) || 0;
    
    //     for (const proxy of this.proxies) {
    //         const usage = this.proxyUsage.get(proxy) || 0;
    //         if (usage < minUsage) {
    //             leastUsedProxy = proxy;
    //             minUsage = usage;
    //         }
    //     }
    
    //     return leastUsedProxy;
    // }
    
    // private incrementProxyUsage(proxy: string): void {
    //     const usage = this.proxyUsage.get(proxy) || 0;
    //     this.proxyUsage.set(proxy, usage + 1);
    // }
}