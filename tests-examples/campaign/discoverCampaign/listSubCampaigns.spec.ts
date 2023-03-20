import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint campaign listSubCampaigns', () => {
    const auth = process.env.AUTH!

    const expectKeyResult = ['totalResults', 'pageSize', 'currentPage', 'subCampaigns']
    test('1 - listSubCampaigns without auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/campaign/listSubCampaigns?sortBy=CREATED_TIME&orderBy=DESCENDING&page=1&pageSize=10');
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - listSubCampaigns with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/campaign/listSubCampaigns?sortBy=CREATED_TIME&orderBy=DESCENDING&page=1&pageSize=10', { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
