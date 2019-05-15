import { browser, by, element } from 'protractor';

export class AppPage {
    // tslint:disable-next-line
    public navigateTo(): Promise<any> {
        // tslint:disable-next-line
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    public getTitleText(): Promise<string> {
        return element(by.css('app-root h1')).getText() as Promise<string>;
    }
}
