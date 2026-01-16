import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
  host: {
    '(keydown)': 'onKeyDown($event)',
    '(paste)': 'onPaste($event)',
    '(input)': 'onInput($event)'
  }
})
export class NumberOnlyDirective {
  private regex: RegExp = /^[0-9]*\.?[0-9]*$/;
  private specialKeys: string[] = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'];

  constructor(private el: ElementRef<HTMLInputElement>) {}

  onKeyDown(event: KeyboardEvent): void {
    // Allow: special keys (Backspace, Delete, Tab, Escape, Enter, arrows)
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if ((event.ctrlKey || event.metaKey) && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())) {
      return;
    }

    // Ensure that it is a number and stop the keypress
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);

    if (next && !this.regex.test(next)) {
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    
    // Clean the pasted text to only allow numbers and one decimal point
    const cleaned = pastedText.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = cleaned.split('.');
    const sanitized = parts.length > 2 
      ? parts[0] + '.' + parts.slice(1).join('')
      : cleaned;
    
    // Get current cursor position
    const input = this.el.nativeElement;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const currentValue = input.value;
    
    // Insert sanitized text at cursor position
    const newValue = currentValue.substring(0, start) + sanitized + currentValue.substring(end);
    
    // Validate the final value
    if (this.regex.test(newValue)) {
      input.value = newValue;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      
      // Set cursor position after the inserted text
      const newCursorPos = start + sanitized.length;
      input.setSelectionRange(newCursorPos, newCursorPos);
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    
    // Remove any invalid characters that might have been inserted
    if (!this.regex.test(value)) {
      // Find the last valid position
      let validValue = '';
      for (let i = 0; i < value.length; i++) {
        const testValue = validValue + value[i];
        if (this.regex.test(testValue)) {
          validValue = testValue;
        } else {
          break;
        }
      }
      
      // Ensure only one decimal point
      const parts = validValue.split('.');
      const sanitized = parts.length > 2 
        ? parts[0] + '.' + parts.slice(1).join('')
        : validValue;
      
      input.value = sanitized;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}

