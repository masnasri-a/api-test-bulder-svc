import { test, expect } from "@playwright/test";
test.describe.configure({ mode: 'serial' });
test.describe('test endpoint campaign getSubCampaign', () => {
    const auth = process.env.AUTH!

    const expectKeyResult = ['subCampaignId', 'campaignId', 'createdByUserId', 'campaigncreatedByUserType', 'campaigncreatedByUserName', 'forBusinessUserId', 'forBusinessUserName', 'campaignTitle', 'campaignImageLinkKey', 'campaignStartTimeInMillis', 'campaignEndTimeInMillis', 'influencerId', 'influencerName', 'influencerCity', 'influencerProfileImageLinkKey', 'isInfluencerIndividual', 'isInfluencerBusiness', 'isPKP', 'socialPlatformTypeId', 'socialPlatformType', 'serviceTypeId', 'serviceType', 'serviceDescription', 'servicePrice', 'serviceMarkupPrice', 'isSubServiceSelected', 'subServiceType', 'subServicePrice', 'subServiceMarkupPrice', 'quantity', 'price', 'markupPrice', 'invoiceNumber', 'orderNumber', 'totalTax', 'totalChargeablePrice', 'isConfirmedByInfluencer', 'influencerRejectionReason', 'isConfirmedTimeInMillis', 'isContentValid', 'contentRejectionReason', 'contentUpdateTimeInMillis', 'isProofOfPostValid', 'proofOfPostRejectionReason', 'proofOfPostUpdateTimeInMillis', 'isProofOfInsightValid', 'proofOfInsightRejectionReason', 'proofOfInsightUpdateTimeInMillis', 'status', 'campaignImageLink', 'influencerProfileImageLink', 'contentFileLinks', 'proofOfPostFileLinks', 'proofOfInsightFileLinks']
    test('1 - getSubCampaign without auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/campaign/getSubCampaign?subCampaignId=474');
        expect.soft(Issues.status()).toBe(401);
    });

    test('2 - getSubCampaign with auth', async ({ request }) => {
        const Issues = await request.get('https://api.estidar.com/api/v1/campaign/getSubCampaign?subCampaignId=474', { headers: { Authorization: `Bearer ${auth}` } });
        expect.soft(Issues.ok()).toBeTruthy();
        expect.soft(Object.keys(await Issues.json())).toEqual(expectKeyResult);
    });
});
