import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PathKind, SchemaPath, SchemaPathRules, validate } from '@angular/forms/signals';
import { FileInputValue } from './file-input-value.type';
import { FileValidatorConfig } from './file-validator-config.interface';

const kilobyte = 1024;

const selectedFiles = (value: FileInputValue): readonly File[] => {
  if (value instanceof File) {
    return [value];
  }
  return value instanceof FileList ? Array.from(value) : [];
};

const exceedsMaxFileSize = (value: FileInputValue, maxFileSizeInKb: number): boolean =>
  selectedFiles(value).some(file => file.size > maxFileSizeInKb * kilobyte);

const exceedsMaxFileCount = (value: FileInputValue, limit: number): boolean =>
  selectedFiles(value).length > limit;

/** Reports `maxFileSize` when a selected file is larger than `maxFileSizeInKb`. For a reactive or template-driven control. */
export const maxFileSizeValidator = (maxFileSizeInKb: number): ValidatorFn =>
  (control: AbstractControl<FileInputValue>): ValidationErrors | null =>
    exceedsMaxFileSize(control.value, maxFileSizeInKb) ? { maxFileSize: true } : null;

/** Reports `maxFileCount` when more files are selected than `limit`. For a reactive or template-driven control. */
export const maxFileCountValidator = (limit: number): ValidatorFn =>
  (control: AbstractControl<FileInputValue>): ValidationErrors | null =>
    exceedsMaxFileCount(control.value, limit) ? { maxFileCount: true } : null;

/** The `maxFileSize` rule for a signal form's schema. */
export const maxFileSize = <TValue extends FileInputValue, TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
  maxFileSizeInKb: number,
  config?: FileValidatorConfig
): void => validate(path, context =>
    exceedsMaxFileSize(context.value(), maxFileSizeInKb) ? { kind: 'maxFileSize', message: config?.message } : null);

/** The `maxFileCount` rule for a signal form's schema. */
export const maxFileCount = <TValue extends FileInputValue, TPathKind extends PathKind = PathKind.Root>(
  path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>,
  limit: number,
  config?: FileValidatorConfig
): void => validate(path, context =>
    exceedsMaxFileCount(context.value(), limit) ? { kind: 'maxFileCount', message: config?.message } : null);
