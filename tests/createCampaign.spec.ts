import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint campaign createCampaign', () => {
    const auth = process.env.AUTH!
    const param = { 'title': 'Test Campaign Nasri', 'productName': 'Test Product', 'categoryIds': ['9'], 'campaignImageLinkKey': 'Logo-lf1gn6o2.png', 'productFileLinkKeys': ['Logo-lf1gnnty.png'], 'description': 'Desc', 'objective': 'obj', 'referenceLink': 'ice.id', 'startTimeInMillis': 1696877325000, 'endTimeInMillis': 1697136525000 }
    const expectKeyResult = ['campaignId', 'createdByUserId', 'createdByUserType', 'createdByUserName', 'forBusinessUserId', 'forBusinessUserName', 'title', 'productName', 'campaignImageLink', 'campaignImageLinkKey', 'description', 'objective', 'referenceLink', 'startTimeInMillis', 'endTimeInMillis', 'createdTimeInMillis', 'totalPrice', 'totalTax', 'totalTaxDeduction', 'totalChargeablePriceWithTaxAndDeduction', 'invoiceNumber', 'orderNumber', 'proofOfPaymentFileLink', 'proofOfPaymentFileLinkKey', 'proofOfPaymentBankName', 'proofOfPaymentBankAccNumber', 'isProofOfPaymentValid', 'proofOfPaymentRejectionReason', 'proofOfPaymentUpdateTimeInMillis', 'status', 'rejectionReason', 'categories', 'productFileLinks', 'subCampaigns']
    test('1 - createCampaign without auth', async ({ request }) => {
        const Issues = await request.post('https://api.estidar.com/api/v1/campaign/createCampaign', { data: param });
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - createCampaign with auth', async ({ request }) => {
        const Issues = await request.post('https://api.estidar.com/api/v1/campaign/createCampaign', { data: param, headers: { Authorization: `Bearer ${auth}`, } });
        expect.soft(Issues.ok()).toBeTruthy();
        const jsonFile = await Issues.json()
        expect.soft(Object.keys(jsonFile)).toEqual(expectKeyResult);
        const campaignId = jsonFile.campaignId
        console.log(campaignId);
    });
});
