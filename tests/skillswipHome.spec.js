const { test, expect } = require('../fixtures/baseTest');
const data = require('../utils/testData');
const { expectToast } = require('../utils/toastHelper');
const { allure } = require('allure-playwright');

test.describe('Home Page Functionality', () => {

    test('TC01 - Home Page @smoke', async ({ page, homePage }) => {
        await allure.description('Verify home page loads correctly and has expected elements');
        
        await page.goto('/');
        await homePage.verifyHomePage();
    });

});