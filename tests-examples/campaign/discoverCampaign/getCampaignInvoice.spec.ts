import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint campaign getCampaignInvoice', () => {
    const auth = process.env.AUTH!

    const expectKeyResult = ['campaignId', 'invoiceNumber', 'orderNumber', 'paymentTimeInMillis', 'campaignTitle', 'totalPrice', 'totalTax', 'totalTaxDeduction', 'totalChargeablePriceWithTaxAndDeduction', 'idPaid', 'lastUpdatedTimeInMillis', 'businessUserName', 'businessPartnerName', 'paymentMethod', 'subCampaigns']
    test('1 - getCampaignInvoice without auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/campaign/getCampaignInvoice?campaignId=372');
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - getCampaignInvoice with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/campaign/getCampaignInvoice?campaignId=372', { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
