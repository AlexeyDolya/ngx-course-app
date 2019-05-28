import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';

describe('Login component', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [SharedModule, FormsModule, RouterTestingModule, HttpClientModule, NoopAnimationsModule],
            providers: [provideMockStore({ initialState: {} })],
        });
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;

        spyOn(component, 'login').and.stub();
        fixture.detectChanges();
        await fixture.whenStable();
    });

    // it('should disable if fields empty', () => {
    //     const submitButton: DebugElement = fixture.debugElement.query(By.css('[type="submit"]'));
    //     submitButton.triggerEventHandler('click', null);
    //     expect(component.login).not.toHaveBeenCalled();
    // });
    it('111', async () => {
        const nameField: DebugElement = fixture.debugElement.query(By.css('input[name="username"]'));
        nameField.triggerEventHandler('input', { target: { value: 'asdasd#@' } });
        const passwordField: DebugElement = fixture.debugElement.query(By.css('input[type=password]'));
        passwordField.triggerEventHandler('input', { target: { value: 'asdasd' } });
        // nameField.nativeElement.value = 'asdasd';
        // nameField.nativeElement.dispatchEvent(new Event('input'));
        // const passwordField: DebugElement = fixture.debugElement.query(By.css('input[type=password]'));
        // passwordField.nativeElement.value = 'asdasd';
        // passwordField.nativeElement.dispatchEvent(new Event('input'));
        // const submitButton: DebugElement = fixture.debugElement.query(By.css('button[type="submit"]'));
        // submitButton.nativeElement.dispatchEvent(new Event('click'));
        // fixture.detectChanges();
        //   submitButton.triggerEventHandler('click', null);
        // console.log('@#@#@#', submitButton.nativeElement);
        // console.log('@#@#@#', submitButton.nativeElement.disabled);
        const submitButton: DebugElement = fixture.debugElement.query(By.css('button[type="submit"]'));
        expect(submitButton.nativeElement.disabled).toBeFalsy();
    });
});
