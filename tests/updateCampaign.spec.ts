import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint campaign updateCampaign', () => {
    const auth = process.env.AUTH!
    const param = { 'campaignId': 277, 'title': 'Test Updated Campaign', 'productName': 'Name of the product - updated', 'categoryIds': [2], 'description': 'This is the description of this campaign. - updated', 'objective': 'This is the objective of this campaign. - updated', 'referenceLink': 'https://example.com/refLink', 'startTimeInMillis': 1702998120000, 'endTimeInMillis': 1703170920000 }
    const expectKeyResult = ['campaignId', 'createdByUserId', 'createdByUserType', 'createdByUserName', 'forBusinessUserId', 'forBusinessUserName', 'title', 'productName', 'campaignImageLink', 'campaignImageLinkKey', 'description', 'objective', 'referenceLink', 'startTimeInMillis', 'endTimeInMillis', 'createdTimeInMillis', 'totalPrice', 'totalTax', 'totalTaxDeduction', 'totalChargeablePriceWithTaxAndDeduction', 'invoiceNumber', 'orderNumber', 'proofOfPaymentFileLink', 'proofOfPaymentFileLinkKey', 'proofOfPaymentBankName', 'proofOfPaymentBankAccNumber', 'isProofOfPaymentValid', 'proofOfPaymentRejectionReason', 'proofOfPaymentUpdateTimeInMillis', 'status', 'rejectionReason', 'categories', 'productFileLinks', 'subCampaigns']
    test('1 - updateCampaign without auth', async ({ request }) => {
        const Issues = await request.put('https://api.estidar.com/api/v1/campaign/updateCampaign', { data: param });
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - updateCampaign with auth', async ({ request }) => {
        const Issues = await request.put('https://api.estidar.com/api/v1/campaign/updateCampaign', { data: param, headers: { Authorization: `Bearer ${auth}`, } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
