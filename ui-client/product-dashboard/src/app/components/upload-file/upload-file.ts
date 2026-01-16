import { CommonModule } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upload-file',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './upload-file.html',
  styleUrl: './upload-file.scss',
})
export class UploadFile {
  fileURL = input<string | null>();
  fileSelected = output<File | null>();
  removeFile = output<string>();
  previewUrl = signal<string | ArrayBuffer | null>(null);
  url = computed(() => this.previewUrl() || this.fileURL() || null);
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      return;
    }

    this.fileSelected.emit(file);

    const reader = new FileReader();
    reader.onload = () => (this.previewUrl.set(reader.result));
    reader.readAsDataURL(file);
  }

  trigger(event: Event, fileInput: HTMLInputElement) {
    event.preventDefault();
    fileInput.click();
  }
  remove() {
    this.previewUrl.set(null);
    this.removeFile.emit('');
  }
}
